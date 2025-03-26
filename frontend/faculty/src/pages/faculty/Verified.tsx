
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, ArrowLeft, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

export default function FacultyVerified() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "approved" | "rejected">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [verifiedSubmissions, setVerifiedSubmissions] = useState<VerifiedSubmission[]>([]);

  const facultyId = 1; 

  type VerifiedSubmission = {
    id: string;
    student: string;
    studentId: string;
    type: string;
    title: string;
    submittedOn: string;
    status: "approved" | "rejected";
    verifiedOn: string;
    rejectionReason?: string;
  };

  useEffect(() => {
    const fetchVerifiedActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/faculty/verified-activities/${facultyId}`);
        
        // Map response to match the existing table format
        const formattedData = response.data.map((activity) => ({
          id: activity.activityId.toString(),
          student: activity.studentName || "Unknown",
          studentId: activity.studentId.toString(),
          type: activity.category || "General",
          title: activity.eventName || "Untitled",
          submittedOn: activity.date || "N/A",
          status: activity.approved ? "approved" : "rejected",
          verifiedOn: activity.verifiedOn || "N/A",
          rejectionReason: activity.comments || "-",
        }));

        setVerifiedSubmissions(formattedData);
      } catch (error) {
        console.error("Error fetching verified activities:", error);
      }
    };

    fetchVerifiedActivities();
  }, [facultyId]);

  // Filter submissions based on filter and search term
  const filteredSubmissions = verifiedSubmissions.filter((submission) => {
    const matchesFilter =
      filter === "all" || submission.status === filter;
    const matchesSearch =
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const [filteredData, setFilteredData] = useState<VerifiedSubmission[]>(verifiedSubmissions);

  // Export to Excel
  const ExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
    // Generate current date for filename
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
  
    XLSX.writeFile(workbook, `Verified_Requests_${dateString}.xlsx`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Verified Submissions
          </h1>
        </motion.div>
          <p className="text-muted-foreground mt-1">
            View all approved and rejected verification requests
          </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by student name, ID or submission title..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as any)}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="gap-1"
              onClick={ExportToExcel}
              >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <CustomCard>
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified On</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="font-medium">{submission.student}</div>
                          <div className="text-sm text-muted-foreground">
                            {submission.studentId}
                          </div>
                        </TableCell>
                        <TableCell>{submission.type}</TableCell>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>{submission.submittedOn}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              submission.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {submission.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </div>
                        </TableCell>
                        <TableCell>{submission.verifiedOn}</TableCell>
                        <TableCell>
                          {submission.rejectionReason || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center"
                      >
                        No matching records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CustomCard>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
