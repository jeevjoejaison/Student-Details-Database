
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileUp } from 'lucide-react';

const CSVUploader = ({ title, description, onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Check file extension
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    if (fileExt !== 'csv' && fileExt !== 'xlsx' && fileExt !== 'xls') {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV or Excel file (.csv, .xlsx, or .xls)",
        variant: "destructive",
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `File "${file.name}" has been processed.`,
      });
      
      if (onUploadComplete) {
        onUploadComplete(file);
      }
      
      setFile(null);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-8 opacity-0 animate-fade-in animation-delay-100">
      <h2 className="text-xl font-medium mb-6">{title || 'Bulk Create Accounts'}</h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload CSV/Excel File</Label>
          <div className="border-2 border-dashed border-accent/20 rounded-xl p-8 text-center hover:border-accent/40 transition-colors">
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <Label 
              htmlFor="file-upload" 
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Upload className="h-10 w-10 text-accent/50" />
              <span className="text-lg font-medium text-accent">
                {file ? file.name : 'Select CSV or Excel File'}
              </span>
              <p className="text-sm text-muted-foreground">
                {file 
                  ? `${(file.size / 1024).toFixed(2)} KB` 
                  : description || 'Upload .csv, .xlsx or .xls file with account details'}
              </p>
            </Label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-xl gap-2"
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            <>
              <FileUp className="h-4 w-4" />
              Upload and Create Accounts
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CSVUploader;
