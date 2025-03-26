import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as XLSX from 'xlsx';
import { 
  ChevronLeft, 
  Search, 
  Filter,
  Upload,
  AlertTriangle,
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

const ManageStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNumberPrefix, setRollNumberPrefix] = useState('');
  const [showBulkDeactivateDialog, setShowBulkDeactivateDialog] = useState(false);
  const [studentsList, setStudentsList] = useState([
    // Sample data to prevent blank page
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'B21CS001',
      section: 'A',
      department: 'Computer Science'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: 'B21EE002',
      section: 'B',
      department: 'Electrical'
    }
  ]);
  const [excelFile, setExcelFile] = useState(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  const departments = ['Computer Science', 'Electrical', 'Electronics'];
  const rollNumberPrefixes = ['B21', 'B22', 'B23', 'B24'];

  const filteredStudents = studentsList.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = department === '' || student.department === department;
    const matchesRollNumberPrefix = rollNumberPrefix === '' || student.rollNumber.startsWith(rollNumberPrefix);
    
    return matchesSearch && matchesDepartment && matchesRollNumberPrefix;
  });

   const exportToExcel = () => {
      // Extract only the fields you need: name, email, and department from facultyList
      const filteredData = studentsList.map(student => ({
        name: student.name,
        rollNumber:student.rollNumber,
        email: student.email,
        department: student.department,
        section: student.section,

      }));
    
      // Create a worksheet from the filtered data
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
    
      // Create a new workbook and append the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
    
      // Generate current date for the filename
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
    
      // Write the workbook to an Excel file
      XLSX.writeFile(workbook, `Student_Directory_${dateString}.xlsx`);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Bulk deactivation completed successfully",
      });

      setShowBulkDeactivateDialog(false);
      setExcelFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process bulk deactivation",
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
                onClick={exportToExcel} 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export to Excel
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
                  <th className="px-4 py-3 rounded-r-lg">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-accent/5 transition-colors">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.rollNumber}</td>
                    <td className="px-4 py-3">{student.section}</td>
                    <td className="px-4 py-3">{student.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
    </div>
  );
};

export default ManageStudents;