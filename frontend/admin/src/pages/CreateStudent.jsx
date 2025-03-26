import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';
import CSVUploader from '@/components/CSVUploader';

const CreateStudent = () => {
  const navigate = useNavigate();

  const handleBulkUploadComplete = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:8080/students/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const result = await response.json();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <main className="container mx-auto px-4 pt-10 pb-16">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="gap-2 mb-4 hover:bg-accent/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-display font-medium mb-2">
            Create Student Accounts
          </h1>
        </div>

        <div className="grid grid-cols-1">
          {/* Bulk Account Creation with CSV Uploader */}
          <CSVUploader 
            title=" "
            description=" "
            onUploadComplete={handleBulkUploadComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateStudent;