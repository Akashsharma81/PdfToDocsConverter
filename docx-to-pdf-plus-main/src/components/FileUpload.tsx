import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[]; // e.g. ['.pdf', '.doc', '.docx']
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes,
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  // ✅ Map extensions to correct MIME types
  const mimeMap: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };

  const accept = acceptedTypes.reduce((acc, ext) => {
    const mime = mimeMap[ext.toLowerCase()];
    if (mime) {
      acc[mime] = [ext];
    }
    return acc;
  }, {} as Record<string, string[]>);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <File className="w-8 h-8 text-red-500" />;
    }
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-smooth',
            'bg-gradient-upload hover:bg-gradient-upload/80',
            isDragActive
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-primary/30 hover:border-primary/50'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          {isDragActive ? (
            <p className="text-lg font-medium text-primary">Drop your file here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drag & drop your file here
              </p>
              <p className="text-muted-foreground mb-4">or click to browse</p>
              <Button variant="upload" size="lg">
                Choose File
              </Button>
          <p className="text-sm text-muted-foreground mt-4 break-all whitespace-normal">
            Supported: {acceptedTypes.join(', ')} • Max size:{' '}
            {Math.round(maxSize / 1024 / 1024)}Mb
          </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-card rounded-xl p-2 sm:p-5 md:p-6 lg:p-6 shadow-medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getFileIcon(uploadedFile.name)}
              <div>
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {fileRejections.length > 0 && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">
            File rejected: {fileRejections[0].errors[0].message}
          </p>
        </div>
      )}
    </div>
  );
};
