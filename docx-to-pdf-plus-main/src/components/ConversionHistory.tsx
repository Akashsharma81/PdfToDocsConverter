
import React, { useEffect, useState } from "react";
import { Download, FileText, File, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ConversionRecord } from "@/types";

interface ConversionHistoryProps {
  history: ConversionRecord[];
  onDownload: (record?: ConversionRecord) => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history: initialHistory, onDownload }) => {
  const [historyData, setHistoryData] = useState<ConversionRecord[]>(initialHistory);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then(res => res.json())
      .then(data => setHistoryData(data))
      .catch(err => console.error(err));
  }, []);

  if (historyData.length === 0) {
    return (
      <div className="bg-gradient-card rounded-xl p-8 shadow-soft text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No conversion history yet</p>
      </div>
    );
  }

  const getFileIcon = (type: string) =>
    type.toLowerCase().includes("pdf") ? (
      <File className="w-5 h-5 text-red-500" />
    ) : (
      <FileText className="w-5 h-5 text-blue-500" />
    );

  return (
    <div className="bg-gradient-card rounded-xl p-6 shadow-medium">
      <h3 className="text-xl font-bold text-center underline mb-4 tracking-wide text-foreground">Recent Conversions</h3>
      <div className="space-y-3">
        {historyData.map(record => (
          <div
            key={record._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-background rounded-lg border border-border hover:shadow-soft transition-smooth"
          >
            <div className="flex items-center space-x-3">
              {getFileIcon(record.toType)}
              <div>
                <p className="font-medium text-foreground">
                  {record.convertedName.length > 20
                    ? record.convertedName.slice(0, 20) + "..."
                    : record.convertedName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {record.fromType.length > 20
                    ? record.fromType.toLowerCase().slice(0, 20) + "..."
                    : record.fromType.toLowerCase()} → {record.toType.toUpperCase()} •{" "}
                  {formatDistanceToNow(new Date(record.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(record)}
              className="text-primary border-gray-200 border hover:text-primary"
              aria-label={`Download ${record.convertedName}`}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionHistory;
