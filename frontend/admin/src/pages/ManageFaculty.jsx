import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  UserMinus, 
  AlertTriangle,
  Upload
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as facultyApi from '@/api/facultyApi';

const ManageFaculty = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showBulkDeactivateDialog, setShowBulkDeactivateDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [bulkError, setBulkError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const data = await facultyApi.fetchFaculties(department);
      setFacultyList(data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to fetch faculties.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartmentsList = async () => {
    try {
      const data = await facultyApi.fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch departments.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFaculties();
    fetchDepartmentsList();
  }, [department]);

  const filteredFaculty = facultyList.filter(faculty => {
    return faculty.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeactivateClick = (faculty) => {
    setSelectedFaculty(faculty);
    setShowDeactivateDialog(true);
  };

  const handleDeactivateConfirm = async () => {
    try {
      await facultyApi.deactivateFaculty(selectedFaculty.id);
      
      setFacultyList(prevList => 
        prevList.map(faculty => 
          faculty.id === selectedFaculty.id 
            ? { ...faculty, status: faculty.status === 'active' ? 'inactive' : 'active' } 
            : faculty
        )
      );
      
      toast({
        title: `Account ${selectedFaculty.status === 'active' ? 'Deactivated' : 'Activated'}`,
        description: `${selectedFaculty.name}'s account has been ${selectedFaculty.status === 'active' ? 'deactivated' : 'activated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to update faculty status",
        variant: "destructive",
      });
    } finally {
      setShowDeactivateDialog(false);
    }
  };

  const handleBulkDeactivate = async () => {
    if (!excelFile) {
      toast({
        title: "Error",
        description: "Please select an Excel file first",
        variant: "destructive",
      });
      return;
    }

    setIsBulkProcessing(true);
    setBulkError(null);
    
    try {
      const result = await facultyApi.bulkDeactivateFaculties(excelFile);
      
      if (result.errorEmails && result.errorEmails.length > 0) {
        setBulkError({
          message: `Deactivated ${result.successCount} faculties. Failed for ${result.errorEmails.length} emails.`,
          errorEmails: result.errorEmails
        });
      } else {
        toast({
          title: "Success",
          description: result.message || `Successfully deactivated ${result.successCount} faculties`,
        });
        setShowBulkDeactivateDialog(false);
        setExcelFile(null);
      }

      fetchFaculties();
    } catch (error) {
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to process bulk deactivation",
        variant: "destructive",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setExcelFile(file);
        setBulkError(null);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
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
            Manage Faculty
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-xl input-focus"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-end gap-2">
              <Button 
                onClick={() => setShowBulkDeactivateDialog(true)} 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Bulk Deactivate
              </Button>
              <Button 
                onClick={fetchFaculties} 
                variant="outline" 
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Refresh List
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-accent/5 text-left">
                  <th className="px-4 py-3 rounded-l-lg">Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((faculty) => (
                    <tr key={faculty.id} className="hover:bg-accent/5 transition-colors">
                      <td className="px-4 py-3">{faculty.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          faculty.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {faculty.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={faculty.status === 'active' ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleDeactivateClick(faculty)}
                            className="rounded-lg"
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            {faculty.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-muted-foreground">
                      {isLoading ? 'Loading...' : 'No faculty members found matching the search criteria.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Dialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {selectedFaculty?.status === 'active' 
                ? 'Deactivate Account' 
                : 'Activate Account'}
            </DialogTitle>
            <DialogDescription>
              {selectedFaculty?.status === 'active'
                ? 'This will deactivate the faculty account. They will no longer be able to log in.'
                : 'This will activate the faculty account. They will be able to log in again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeactivateDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={selectedFaculty?.status === 'active' ? "destructive" : "default"}
              onClick={handleDeactivateConfirm}
            >
              {selectedFaculty?.status === 'active' 
                ? 'Deactivate' 
                : 'Activate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkDeactivateDialog} onOpenChange={setShowBulkDeactivateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bulk Deactivation</DialogTitle>
            <DialogDescription>
              Upload an Excel file containing faculty emails to deactivate multiple accounts at once.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="excelFile">Excel File</Label>
              <Input
                id="excelFile"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mt-1"
              />
             
            </div>

            {bulkError && (
              <div className="text-destructive mt-2">
                <p>{bulkError.message}</p>
                {bulkError.errorEmails && bulkError.errorEmails.length > 0 && (
                  <p className="text-sm">Failed emails: {bulkError.errorEmails.join(', ')}</p>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowBulkDeactivateDialog(false);
                setExcelFile(null);
                setBulkError(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleBulkDeactivate}
              disabled={!excelFile || isBulkProcessing}
            >
              {isBulkProcessing ? 'Processing...' : 'Bulk Deactivate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageFaculty;