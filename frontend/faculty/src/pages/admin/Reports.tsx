
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
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
  TrendingUp,
  ListFilter,
  Users,
  School,
  BookOpen,
  Globe,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminReports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [reportType, setReportType] = useState("activity");
  const [reportFormat, setReportFormat] = useState("excel");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for overview reports
  const userDistributionData = [
    { name: "Students", value: 420 },
    { name: "Faculty", value: 85 },
    { name: "Admins", value: 15 },
  ];

  const submissionStatusData = [
    { name: "Approved", value: 356 },
    { name: "Pending", value: 145 },
    { name: "Rejected", value: 58 },
  ];

  const monthlyActivityData = [
    { month: "Jan", students: 120, faculty: 65 },
    { month: "Feb", students: 145, faculty: 70 },
    { month: "Mar", students: 180, faculty: 75 },
    { month: "Apr", students: 210, faculty: 80 },
    { month: "May", students: 250, faculty: 85 },
    { month: "Jun", students: 280, faculty: 90 },
    { month: "Jul", students: 310, faculty: 85 },
    { month: "Aug", students: 330, faculty: 82 },
    { month: "Sep", students: 350, faculty: 88 },
    { month: "Oct", students: 375, faculty: 92 },
    { month: "Nov", students: 410, faculty: 95 },
    { month: "Dec", students: 420, faculty: 85 },
  ];

  // Mock data for event distribution
  const eventDistributionData = [
    { name: "Cultural", value: 120 },
    { name: "Technical", value: 150 },
    { name: "Sports", value: 100 },
    { name: "Club", value: 80 },
    { name: "Internship", value: 135 },
    { name: "Placement", value: 95 },
    { name: "Research", value: 65 },
  ];

  // Mock data for department distribution
  const departmentDistributionData = [
    { name: "Computer Science", value: 180 },
    { name: "Electronics", value: 150 },
    { name: "Electrical", value: 120 },
    { name: "Mechanical", value: 110 },
    { name: "Civil", value: 90 },
  ];

  // Mock data for recent reports
  const recentReports = [
    {
      id: "1",
      name: "System Activity Report - October 2023",
      date: "2023-10-25",
      type: "activity",
      format: "excel",
    },
    {
      id: "2",
      name: "User Statistics - Q3 2023",
      date: "2023-10-15",
      type: "users",
      format: "pdf",
    },
    {
      id: "3",
      name: "Submission Analytics - September 2023",
      date: "2023-10-01",
      type: "submissions",
      format: "excel",
    },
    {
      id: "4",
      name: "Department Performance Report",
      date: "2023-09-15",
      type: "departments",
      format: "pdf",
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
          reportType === "activity"
            ? "System Activity"
            : reportType === "users"
            ? "User Statistics"
            : reportType === "submissions"
            ? "Submission Analytics"
            : "Department Performance"
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
          <h1 className="text-3xl font-bold tracking-tight">System Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download comprehensive system reports
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <motion.div variants={item}>
            <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Detailed Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Generate Reports</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div variants={container} className="grid gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <CustomCard className="h-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">User Distribution</h2>
                    <p className="text-sm text-muted-foreground">
                      Breakdown of system users by role
                    </p>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {userDistributionData.map((entry, index) => (
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
                  </div>
                </CustomCard>
              </motion.div>

              <motion.div variants={item}>
                <CustomCard className="h-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Submission Status</h2>
                    <p className="text-sm text-muted-foreground">
                      Current status of all submissions in the system
                    </p>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={submissionStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {submissionStatusData.map((entry, index) => (
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
                  </div>
                </CustomCard>
              </motion.div>

              <motion.div variants={item} className="md:col-span-2">
                <CustomCard>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Monthly Activity</h2>
                    <p className="text-sm text-muted-foreground">
                      System activity trends over the past year
                    </p>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyActivityData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="students"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="faculty"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CustomCard>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div variants={container} className="grid gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <CustomCard className="h-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Event Distribution</h2>
                    <p className="text-sm text-muted-foreground">
                      Breakdown of submissions by event type
                    </p>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={eventDistributionData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 50,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CustomCard>
              </motion.div>

              <motion.div variants={item}>
                <CustomCard className="h-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Department Distribution</h2>
                    <p className="text-sm text-muted-foreground">
                      Breakdown of submissions by department
                    </p>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={departmentDistributionData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 50,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CustomCard>
              </motion.div>

              <motion.div variants={item} className="md:col-span-2">
                <CustomCard>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Key Metrics</h2>
                    <p className="text-sm text-muted-foreground">
                      Important system metrics and statistics
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Total Users</span>
                      </div>
                      <p className="mt-3 text-2xl font-bold">520</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↑ 12%</span> from last month
                      </p>
                    </div>
                    
                    <div className="rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium">Submissions</span>
                      </div>
                      <p className="mt-3 text-2xl font-bold">2,156</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↑ 8%</span> from last month
                      </p>
                    </div>
                    
                    <div className="rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <School className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">Departments</span>
                      </div>
                      <p className="mt-3 text-2xl font-bold">15</p>
                      <p className="text-xs text-muted-foreground">
                        <span>No change</span> from last month
                      </p>
                    </div>
                    
                    <div className="rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium">Event Types</span>
                      </div>
                      <p className="mt-3 text-2xl font-bold">7</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↑ 1</span> from last month
                      </p>
                    </div>
                  </div>
                </CustomCard>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Generate Reports Tab */}
          <TabsContent value="generate">
            <motion.div variants={container} className="grid gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <CustomCard className="h-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Generate Report</h2>
                    <p className="text-sm text-muted-foreground">
                      Select parameters to generate a custom report
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
                          <SelectItem value="activity">
                            <div className="flex items-center">
                              <TrendingUp className="mr-2 h-4 w-4" />
                              <span>System Activity Report</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="users">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>User Statistics Report</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="submissions">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Submission Analytics Report</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="departments">
                            <div className="flex items-center">
                              <Globe className="mr-2 h-4 w-4" />
                              <span>Department Performance Report</span>
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
                    
                    <div>
                      <label className="text-sm font-medium">Additional Filters</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="mt-1">
                          <div className="flex items-center">
                            <ListFilter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select filter" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Data</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                          <SelectItem value="faculty">Faculty Only</SelectItem>
                          <SelectItem value="approved">Approved Items Only</SelectItem>
                          <SelectItem value="pending">Pending Items Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Report Format</label>
                      <Select
                        value={reportFormat}
                        onValueChange={setReportFormat}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="csv">CSV File</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <span>Download Template</span>
                      </Button>
                    </div>
                  </div>
                </CustomCard>
              </motion.div>

              <motion.div variants={item}>
                <CustomCard className="h-full">
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
                              Generated on {report.date} • {report.format.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 mt-2 border-t">
                    <Button variant="link" className="px-0">
                      View all reports
                    </Button>
                  </div>
                </CustomCard>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageContainer>
  );
}
