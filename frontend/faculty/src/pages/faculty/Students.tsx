import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import * as XLSX from 'xlsx';


const FacultyStudents = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]); // Initially empty
  const [filteredData, setFilteredData] = useState([]);

  const facultyId = 1; // Change this based on logged-in faculty
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/faculty/students/${facultyId}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // Filter students based on search query
  useEffect(() => {
    setFilteredData(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, students]);

  // Download students data as CSV
  /*const downloadStudentsData = () => {
    const headers = ["Name", "Roll Number", "Section"];
    const csvContent = [
      headers.join(","),
      ...students.map((student) =>
        [student.name, student.rollNo, student.section].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "students_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };*/

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate current date for filename
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    XLSX.writeFile(workbook, `Student_Directory_${dateString}.xlsx`);
  };

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Assigned Students</h1>
      </motion.div>
      <p className="text-muted-foreground mt-1 ml-10">View and manage students assigned to you</p>

      {/* Search and Export */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 mt-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search students..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Button onClick={exportToExcel} variant="outline" className="shrink-0 gap-1">
          <Download className="h-4 w-4" />
          <span>Export to Excel</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((student) => (
                <tr key={student.userId}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.rollNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={classNames("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", {
                      "bg-blue-100 text-blue-800": student.section === "CS03",
                      "bg-green-100 text-green-800": student.section === "CS04",
                    })}>
                      {student.section}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-6">
        <button 
          onClick={() => navigate('/faculty')}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
      </div>
    </PageContainer>
  );
};

export default FacultyStudents;
