
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft, Send } from 'lucide-react';
import CSVUploader from '@/components/CSVUploader';



const CreateStudent = () => {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState('');

  const handleSingleAccount = (e) => {
    e.preventDefault();
    if (!rollNumber || rollNumber.trim() === '') {
      toast({
        title: "Invalid Roll Number",
        description: "Please enter a valid roll number",
        variant: "destructive",
      });
      return;
    }
    
    // Mock API call
    toast({
      title: "Account Creation Initiated",
      description: `Student account for roll number ${rollNumber} is being created.`,
    });
    
    // Reset form
    setRollNumber('');
  };

  const handleBulkUploadComplete = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:8080/students/upload', {
        method: 'POST',
        body: formData,
        // headers are not needed when using FormData, fetch sets them automatically
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const result = await response.json();
      toast({
        title: "Bulk Upload Successful",
        description: result.message || "Student accounts created successfully.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Bulk Upload Failed",
        description: error.message || "Failed to upload CSV file.",
        variant: "destructive",
      });
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
            Create Student Account
          </h1>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Single Account Creation */}
          <div className="glass-panel rounded-3xl p-8 opacity-0 animate-fade-in">
            <h2 className="text-xl font-medium mb-6">Create Individual Account</h2>
            
            <form onSubmit={handleSingleAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="Enter student roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="rounded-xl input-focus"
                />
              </div>
              
              <Button type="submit" className="w-full rounded-xl gap-2">
                <Send className="h-4 w-4" />
                Create Account
              </Button>
            </form>
          </div>

          {/* Bulk Account Creation with CSV Uploader */}
          <CSVUploader 
            title="Create Student Accounts"
            description=" "
            onUploadComplete={handleBulkUploadComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateStudent;
