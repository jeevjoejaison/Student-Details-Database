
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarIcon,
  Download,
  FileText,
  PieChart as PieChartIcon,
  BarChart2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function FacultyReports() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reportType, setReportType] = useState("verification");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for verification status chart
  const verificationData = [
    { name: "Approved", value: 65 },
    { name: "Rejected", value: 15 },
    { name: "Pending", value: 20 },
  ];

  // Mock data for submissions by type chart
  const submissionsByTypeData = [
    { name: "Cultural", count: 25 },
    { name: "Technical", count: 30 },
    { name: "Sports", count: 15 },
    { name: "Club", count: 10 },
    { name: "Internship", count: 18 },
    { name: "Placement", count: 12 },
    { name: "Research", count: 5 },
  ];

  // Mock data for recent reports
  const recentReports = [
    {
      id: "1",
      name: "Monthly Verification Summary",
      date: "2023-10-01",
      type: "verification",
    },
    {
      id: "2",
      name: "Student Activity Report Q3",
      date: "2023-09-15",
      type: "activity",
    },
    {
      id: "3",
      name: "Technical Events Summary",
      date: "2023-09-01",
      type: "category",
    },
  ];

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088fe",
    "#00c49f",
    "#ffbb28",
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: `${
          reportType === "verification"
            ? "Verification Status"
            : reportType === "activity"
            ? "Student Activity"
            : "Submissions by Category"
        } report has been generated successfully`,
      });
      setIsGenerating(false);
    }, 1500);
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
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Generate Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and download reports of student activities and verifications
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2"
      >
        <motion.div variants={item}>
          <CustomCard className="h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Report Parameters</h2>
              <p className="text-sm text-muted-foreground">
                Customize your report by selecting parameters
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Report Type</label>
                <Select
                  value={reportType}
                  onValueChange={setReportType}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verification">
                      <div className="flex items-center">
                        <PieChartIcon className="mr-2 h-4 w-4" />
                        <span>Verification Status Report</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="activity">
                      <div className="flex items-center">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span>Student Activity Report</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="category">
                      <div className="flex items-center">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span>Submissions by Category</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Select date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange as any}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 gap-1"
                  disabled={isGenerating}
                >
                  <Download className="h-4 w-4" />
                  <span>Download as Excel</span>
                </Button>
              </div>
            </div>
          </CustomCard>
        </motion.div>

        <motion.div variants={item}>
          <CustomCard className="h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Report Preview</h2>
              <p className="text-sm text-muted-foreground">
                {reportType === "verification"
                  ? "Verification status distribution"
                  : reportType === "activity"
                  ? "Student activity over time"
                  : "Submissions by category"}
              </p>
            </div>
            
            <div className="h-64">
              {reportType === "verification" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={verificationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {verificationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      reportType === "activity"
                        ? submissionsByTypeData.slice(0, 4) // First 4 for activity
                        : submissionsByTypeData // All for category
                    }
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CustomCard>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2">
          <CustomCard>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Recent Reports</h2>
              <p className="text-sm text-muted-foreground">
                Previously generated reports
              </p>
            </div>
            
            <div className="divide-y">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Generated on {report.date}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              ))}
            </div>
          </CustomCard>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
