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
  Upload,
  Download
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
import * as studentApi from '@/api/studentApi';

const ManageStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNumberPrefix, setRollNumberPrefix] = useState('');
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showBulkDeactivateDialog, setShowBulkDeactivateDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async (department, rollNumberPrefix) => {
    setIsLoading(true);
    try {
      const data = await studentApi.fetchStudents(department, rollNumberPrefix);
      setStudentsList(data);
      console.log(studentsList)
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to fetch students. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(department, rollNumberPrefix);
  }, [department, rollNumberPrefix]);

  const handleFetchStudents = () => {
    fetchStudents(department, rollNumberPrefix);
  };

  const filteredStudents = studentsList.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = department === '' || student.department === department;
    const matchesRollNumberPrefix = rollNumberPrefix === '' || student.rollNumber.startsWith(rollNumberPrefix);
    
    return matchesSearch && matchesDepartment && matchesRollNumberPrefix;
  });

  const departments = ['Computer Science', 'Electrical', 'Electronics'];
  const rollNumberPrefixes = ['B21', 'B22', 'B23', 'B24'];

  const handleDeactivateClick = (student) => {
    setSelectedStudent(student);
    setShowDeactivateDialog(true);
  };

  const handleDeactivateConfirm = async () => {
    try {
      await studentApi.deactivateStudent(selectedStudent.email);
      
      setStudentsList(prevList => 
        prevList.map(student => 
          student.id === selectedStudent.id 
            ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' } 
            : student
        )
      );
      
      toast({
        title: `Account ${selectedStudent.status === 'active' ? 'Deactivated' : 'Activated'}`,
        description: `${selectedStudent.name}'s account has been ${selectedStudent.status === 'active' ? 'deactivated' : 'activated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to update student status",
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
    
    try {
      await studentApi.bulkDeactivateStudents(excelFile);
      
      toast({
        title: "Success",
        description: "Bulk deactivation completed successfully",
      });

      // Refresh the student list
      fetchStudents(department, rollNumberPrefix);
      setShowBulkDeactivateDialog(false);
      setExcelFile(null);
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
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const blob = await studentApi.downloadTemplate();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'student_deactivation_template.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "Failed to download template",
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
            Manage Students
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-xl input-focus"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/5 space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
                >
                  <option value="">None</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="w-full md:w-1/5 space-y-2">
              <Label htmlFor="rollNumberPrefix">Roll Number Prefix</Label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="rollNumberPrefix"
                  value={rollNumberPrefix}
                  onChange={(e) => setRollNumberPrefix(e.target.value)}
                  className="w-full pl-9 rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
                >
                  <option value="">None</option>
                  {rollNumberPrefixes.map((prefix, index) => (
                    <option key={index} value={prefix}>{prefix}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-end gap-2">
              <Button 
                onClick={() => setShowBulkDeactivateDialog(true)}
                variant="outline" 
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Bulk Deactivate
              </Button>
              
              <Button 
                onClick={handleFetchStudents} 
                variant="outline" 
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Fetch Students
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-accent/5 text-left">
                  <th className="px-4 py-3 rounded-l-lg">Name</th>
                  <th className="px-4 py-3">Roll Number</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-accent/5 transition-colors">
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{student.rollNumber}</td>
                      <td className="px-4 py-3">{student.section}</td>
                      <td className="px-4 py-3">{student.department}</td>
                      <td className="px-4 py-3">{student.acitve}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={student.status === 'active' ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleDeactivateClick(student)}
                            className="rounded-lg"
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            {student.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">
                      No students found matching the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Bulk Deactivate Dialog */}
      <Dialog open={showBulkDeactivateDialog} onOpenChange={setShowBulkDeactivateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Bulk Student Deactivation
            </DialogTitle>
            <DialogDescription>
              Upload an Excel file containing student emails to deactivate multiple accounts at once.
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
            
            
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowBulkDeactivateDialog(false);
                setExcelFile(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleBulkDeactivate}
              disabled={!excelFile || isBulkProcessing}
            >
              {isBulkProcessing ? 'Processing...' : 'Deactivate Students'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Single Deactivate Dialog */}
      <Dialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {selectedStudent?.status === 'active' 
                ? 'Deactivate Account' 
                : 'Activate Account'}
            </DialogTitle>
            <DialogDescription>
              {selectedStudent?.status === 'active'
                ? 'This will deactivate the student account. They will no longer be able to log in.'
                : 'This will activate the student account. They will be able to log in again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeactivateDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={selectedStudent?.status === 'active' ? "destructive" : "default"}
              onClick={handleDeactivateConfirm}
            >
              {selectedStudent?.status === 'active'
                ? 'Deactivate'
                : 'Activate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageStudents;