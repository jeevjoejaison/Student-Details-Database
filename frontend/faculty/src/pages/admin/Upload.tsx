
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileSpreadsheet,
  Upload as UploadIcon,
  HelpCircle,
  Loader2,
  AlertTriangle,
  RotateCw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminUpload() {
  const { toast } = useToast();
  const [dataType, setDataType] = useState("users");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "validating" | "success" | "error"
  >("idle");
  const [validationResults, setValidationResults] = useState<any[]>([]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a CSV file",
        });
        return;
      }
      setSelectedFile(file);
      setUploadState("idle");
      setValidationResults([]);
    }
  };

  // Handle template download
  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: `CSV template for ${dataType} has been downloaded`,
    });
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a CSV file to upload",
      });
      return;
    }

    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate file upload with progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(uploadInterval);
          setUploadState("validating");
          setTimeout(() => {
            // Mock validation
            if (Math.random() > 0.3) {
              setUploadState("success");
              setValidationResults([
                { row: 2, status: "success", message: "Record created successfully" },
                { row: 3, status: "success", message: "Record created successfully" },
                { row: 4, status: "success", message: "Record created successfully" },
                { row: 5, status: "warning", message: "Duplicate email, record skipped" },
                { row: 6, status: "success", message: "Record created successfully" },
                { row: 7, status: "success", message: "Record created successfully" },
                { row: 8, status: "error", message: "Invalid email format" },
                { row: 9, status: "success", message: "Record created successfully" },
              ]);
              toast({
                title: "Upload Successful",
                description: "Your data has been processed with some notifications",
              });
            } else {
              setUploadState("error");
              toast({
                variant: "destructive",
                title: "Upload Failed",
                description: "There was an error processing your file",
              });
            }
          }, 1500);
        }
        return newProgress;
      });
    }, 300);
  };

  // Handle reset upload
  const handleReset = () => {
    setSelectedFile(null);
    setUploadState("idle");
    setUploadProgress(0);
    setValidationResults([]);
  };

  // Get template sample based on data type
  const getTemplateSample = () => {
    switch (dataType) {
      case "users":
        return "name,email,role,department\nJohn Doe,john@example.com,student,Computer Science";
      case "events":
        return "student_id,event_type,title,date,location\nS12345,cultural,Annual Dance,2023-10-15,Auditorium";
      case "departments":
        return "name,code,faculty_head\nComputer Science,CS,Dr. Smith";
      default:
        return "";
    }
  };

  // Get data type label
  const getDataTypeLabel = () => {
    switch (dataType) {
      case "users":
        return "Users (Students, Faculty)";
      case "events":
        return "Student Events/Activities";
      case "departments":
        return "Departments and Programs";
      default:
        return "";
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Bulk Upload</h1>
          <p className="text-muted-foreground mt-1">
            Import users and data using CSV files
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
              <h2 className="text-xl font-semibold">Upload Data</h2>
              <p className="text-sm text-muted-foreground">
                Select the type of data you want to upload and provide a CSV file
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Data Type</label>
                <Select
                  value={dataType}
                  onValueChange={setDataType}
                  disabled={uploadState === "uploading" || uploadState === "validating"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Users (Students, Faculty)</SelectItem>
                    <SelectItem value="events">Student Events/Activities</SelectItem>
                    <SelectItem value="departments">Departments and Programs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload File</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    selectedFile ? "border-primary/50" : "border-muted"
                  }`}
                >
                  {selectedFile ? (
                    <div className="space-y-2">
                      <FileSpreadsheet className="h-10 w-10 mx-auto text-primary" />
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileChange({ target: { files: null } } as any)}
                        disabled={uploadState === "uploading" || uploadState === "validating"}
                      >
                        Choose Another File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <UploadIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your CSV file here, or click to browse
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <label>
                          Browse Files
                          <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedFile && (
                <div className="space-y-4">
                  {uploadState === "uploading" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                  
                  {uploadState === "validating" && (
                    <div className="flex items-center justify-center space-x-2 py-2 text-amber-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Validating your data...</span>
                    </div>
                  )}
                  
                  {uploadState === "success" && (
                    <div className="flex items-center justify-center space-x-2 py-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Upload successful</span>
                    </div>
                  )}
                  
                  {uploadState === "error" && (
                    <div className="flex items-center justify-center space-x-2 py-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Upload failed</span>
                    </div>
                  )}
                  
                  <div className="pt-2 flex flex-col xs:flex-row gap-2 justify-end">
                    {uploadState !== "uploading" && uploadState !== "validating" && (
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="w-full xs:w-auto"
                      >
                        {uploadState === "idle" ? "Cancel" : "Reset"}
                      </Button>
                    )}
                    
                    {uploadState === "idle" && (
                      <Button
                        onClick={handleUpload}
                        className="w-full xs:w-auto gap-1"
                      >
                        <UploadIcon className="h-4 w-4" />
                        <span>Upload</span>
                      </Button>
                    )}
                    
                    {(uploadState === "success" || uploadState === "error") && (
                      <Button
                        onClick={handleUpload}
                        className="w-full xs:w-auto gap-1"
                      >
                        <RotateCw className="h-4 w-4" />
                        <span>Try Again</span>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CustomCard>
        </motion.div>

        <motion.div variants={item}>
          <CustomCard className="h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Template Instructions</h2>
              <p className="text-sm text-muted-foreground">
                Download a template and follow the format for {getDataTypeLabel()}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-md text-blue-600">
                <HelpCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Make sure your CSV file follows the template format exactly. 
                  The first row should contain column headers.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Sample Format</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-1"
                    onClick={handleDownloadTemplate}
                  >
                    <Download className="h-3 w-3" />
                    <span>Download Template</span>
                  </Button>
                </div>
                <pre className="p-3 bg-muted rounded-md text-xs overflow-x-auto">
                  {getTemplateSample()}
                </pre>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Required Fields</h3>
                <ul className="space-y-1 text-sm">
                  {dataType === "users" && (
                    <>
                      <li>• name - Full name of the user</li>
                      <li>• email - Valid email address (must be unique)</li>
                      <li>• role - Either "student", "faculty", or "admin"</li>
                      <li>• department - Department name</li>
                    </>
                  )}
                  {dataType === "events" && (
                    <>
                      <li>• student_id - Student ID</li>
                      <li>• event_type - Type of event (cultural, technical, etc.)</li>
                      <li>• title - Title of the event</li>
                      <li>• date - Date in YYYY-MM-DD format</li>
                      <li>• location - Location of the event</li>
                    </>
                  )}
                  {dataType === "departments" && (
                    <>
                      <li>• name - Department name</li>
                      <li>• code - Department code</li>
                      <li>• faculty_head - Name of faculty head</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CustomCard>
        </motion.div>

        {validationResults.length > 0 && (
          <motion.div
            variants={item}
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CustomCard>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Validation Results</h2>
                <p className="text-sm text-muted-foreground">
                  {validationResults.filter((r) => r.status === "success").length} records processed successfully
                </p>
              </div>
              
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validationResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.row}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {result.status === "success" ? (
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            ) : result.status === "warning" ? (
                              <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                            )}
                            <span
                              className={
                                result.status === "success"
                                  ? "text-green-600"
                                  : result.status === "warning"
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }
                            >
                              {result.status === "success"
                                ? "Success"
                                : result.status === "warning"
                                ? "Warning"
                                : "Error"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{result.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CustomCard>
          </motion.div>
        )}
      </motion.div>
    </PageContainer>
  );
}
