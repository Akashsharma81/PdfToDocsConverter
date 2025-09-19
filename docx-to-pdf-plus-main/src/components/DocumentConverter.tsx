
import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { ConversionProgress } from './ConversionProgress';
import  ConversionHistory  from './ConversionHistory';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RefreshCw, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';
//add
import { ConversionRecord } from '@/types';


interface DocumentConverterProps {
  historyRef: React.RefObject<HTMLDivElement>; // yahi ref pass karenge
}

export const DocumentConverter: React.FC<DocumentConverterProps> = ({ historyRef }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionStatus, setConversionStatus] = useState<'idle' | 'uploading' | 'converting' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<{ name: string; url: string } | null>(null);
  const [conversionHistory, setConversionHistory] = useState<ConversionRecord[]>([]);
  const [activeTab, setActiveTab] = useState('pdf-to-doc');
  const { toast } = useToast();

  const docTypes = {
    'pdf-to-doc': {
      title: 'PDF to DOC',
      subtitle: 'Convert PDF files to editable Word documents',
      accept: ['.pdf', 'application/pdf'],
      outputType: 'docx'
    },
    'doc-to-pdf': {
      title: 'DOC to PDF',
      subtitle: 'Convert Word documents to PDF format',
      accept: ['.doc', '.docx', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      outputType: 'pdf'
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConversionStatus('idle');
    setConvertedFile(null);
  };

  const convertFile = async () => {
    if (!selectedFile) return;

    setConversionStatus('uploading');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('toType', docTypes[activeTab].outputType);

    try {
      // Simulate progress for UX
      for (let i = 0; i <= 50; i += 10) {
        setProgress(i);
        await new Promise(res => setTimeout(res, 100));
      }

      const response = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Conversion failed');

      const blob = await response.blob();
      const convertedFileName = selectedFile.name.replace(/\.[^/.]+$/, `.${docTypes[activeTab].outputType}`);

      setConvertedFile({
        name: convertedFileName,
        url: URL.createObjectURL(blob),
      });

      const newRecord: ConversionRecord = {
        id: Date.now().toString(),
        _id: Date.now().toString(),
        originalName: selectedFile.name,
        convertedName: convertedFileName,
        fromType: selectedFile.type,
        toType: docTypes[activeTab].outputType,
        timestamp: new Date(),
        downloadUrl: URL.createObjectURL(blob),
      };

      setConversionHistory(prev => [newRecord, ...prev.slice(0, 4)]);
      setConversionStatus('completed');

      toast({
        title: "Conversion completed!",
        description: `${selectedFile.name} has been converted successfully.`,
      });
    } catch (err) {
      console.error(err);
      setConversionStatus('error');
      toast({
        title: "Conversion failed",
        description: "Please try again.",
      });
    }
  };

  const handleDownload = (record?: ConversionRecord) => {
    if (!record && !convertedFile) return;

    const link = document.createElement('a');
    link.href = record?.downloadUrl || convertedFile?.url || '';
    link.download = record?.convertedName || convertedFile?.name || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your converted file is being downloaded.",
    });
  };

  const resetConversion = () => {
    setSelectedFile(null);
    setConversionStatus('idle');
    setProgress(0);
    setConvertedFile(null);
  };

   const scrollToHistory = () => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 rounded-md m-4"
   style={{
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)'
    }}>
    
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto ">
          <TabsTrigger value="pdf-to-doc">PDF to DOC</TabsTrigger>
          <TabsTrigger value="doc-to-pdf">DOC to PDF</TabsTrigger>
        </TabsList>

        {Object.keys(docTypes).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            <Card className="p-8 bg-gradient-card shadow-medium">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {docTypes[tab].title}
                </h2>
                <p className="text-muted-foreground">{docTypes[tab].subtitle}</p>
              </div>

              <FileUpload
                onFileSelect={handleFileSelect}
                acceptedTypes={docTypes[tab].accept}
                maxSize={50 * 1024 * 1024} // 50MB
              />

              {selectedFile && conversionStatus === 'idle' && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={convertFile}
                    variant="hero"
                    size="lg"
                    className="px-8"
                  >
                    Convert to {docTypes[tab].outputType.toUpperCase()}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </Card>

            {conversionStatus !== 'idle' && (
              <ConversionProgress
                status={conversionStatus}
                progress={progress}
                fileName={selectedFile?.name}
                errorMessage="Something went wrong during conversion. Please try again."
              />
            )}

            {convertedFile && conversionStatus === 'completed' && (
              <Card className="p-6 bg-gradient-card shadow-medium">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Conversion Complete!
                    </h3>
                    <p className="text-muted-foreground">{convertedFile.name}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      onClick={() => handleDownload()}
                      variant="success"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={resetConversion}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Convert Another
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* <ConversionHistory
              history={conversionHistory}
              onDownload={handleDownload}
            /> */}
              <div ref={historyRef}>
        <ConversionHistory
          history={conversionHistory}
          onDownload={handleDownload}
        />
      </div>

             {/* <div ref={historyRef}>
        <ConversionHistory history={[]} onDownload={() => {}} />
      </div> */}
            {/* <ConversionHistory onDownload={handleDownload} /> */}

          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
