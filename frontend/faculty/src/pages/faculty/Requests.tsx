import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Clock, Eye, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { handleDownloadProof } from "../../utils/formUtils";

// Define color scheme for category
const categoryColors = {
  'Technical Event': 'bg-green-100 text-green-700',
  'Internship': 'bg-blue-100 text-blue-700',
  'Research Paper': 'bg-purple-100 text-purple-700',
};

const FacultyRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [comment, setComment] = useState("");

  const faId = 1; // Change this based on logged-in faculty

  // Fetch pending requests from the backend
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/faculty/pending-activities/${faId}`); // Replace {faId} with actual faculty ID
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    fetchPendingRequests();
  }, []);

  // Filter requests based on search query
  const formattedRequests = pendingRequests.map(
    (request) => ({
      activityId: request.activityId,
      studentName: request.name || "N/A", 
      rollNumber: request.rollNumber,
      title: request.eventName,
      category: request.type,
      submittedOn: request.date,
      awards: request.awards || "None",
      location: request.location,
      proof: request.proof || "N/A",
      details: request.details || {
        eventName: request.eventName,
        location: request.location,
        date: request.date,
        awards: request.awards || "None",
        proof: request.proof || "N/A",
      },
    }));

  // Filter requests based on search query
  const filteredRequests = formattedRequests.filter(
    (request) =>
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle view request details
  const handleViewRequest = (request) => {
    setSelectedRequest({
      ...request,
      details: request.details || {}, // Ensure details is always an object
    });
    
    setViewDialogOpen(true);
  };

  // Handle approve/reject action
  const handleAction = (request, action) => {
    setSelectedRequest({
      ...request,
      details: request.details || {}, // Ensure details is always an object
    });
    
    setActionType(action);
    setActionDialogOpen(true);
  };

  // Submit the action (approve/reject)
  const submitAction = async () => {
    if (!selectedRequest || !actionType) return;

    try {
      if (actionType === "approve") {
        await axios.put(
          `http://localhost:8080/api/faculty/approve-activity/${selectedRequest.activityId}`,
          { comments: comment }, // ✅ Send data in request body instead of params
          { headers: { "Content-Type": "application/json" } } // ✅ Set JSON headers
        );      
      } 
      else {
        await axios.delete(
          `http://localhost:8080/api/faculty/reject-activity/${selectedRequest.activityId}`,
          {
              data: { comments: comment }, // ✅ Sending reason in request body
              headers: { "Content-Type": "application/json" }
          }
        );
      }

      // Remove the selected request from the pending list
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request.activityId !== selectedRequest.activityId)
      );

      toast({
        title: actionType === "approve" ? "Request Approved" : "Request Rejected",
        description: `You have ${actionType}d the request from ${selectedRequest.studentName}.`,
      });
    } catch (error) {
      console.error("Error submitting action:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      setActionDialogOpen(false);
      setComment("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h1 className="text-sm font-medium text-muted-foreground">
              FACULTY DASHBOARD
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight flex items-center">
              Pending Verifications
              <span className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {pendingRequests.length}
              </span>
            </h2>
            <div className="hidden sm:flex items-center p-1.5 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Clock className="h-4 w-4 mr-2" />
              <span>Awaiting your response</span>
            </div>
          </div>
        </div>
      
        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CustomCard>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Submitted On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <TableRow key={request.activityId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.studentName}</div>
                            <div className="text-sm text-muted-foreground">{request.rollNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.category}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.submittedOn}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleAction(request, "approve")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleAction(request, "reject")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No pending requests found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Request Details</DialogTitle>
                  <DialogDescription>
                    View the detailed information submitted by the student.
                  </DialogDescription>
                </DialogHeader>

                {selectedRequest && (
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Student</h3>
                        <p>{selectedRequest.studentName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Roll Number</h3>
                        <p>{selectedRequest.rollNumber}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                        <p>{selectedRequest.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                        <p>{selectedRequest.category}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Submitted On</h3>
                        <p>{selectedRequest.submittedOn}</p>
                      </div>
                    </div>
                  {selectedRequest && selectedRequest.details ? (
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Submission Details</h3>
                      
                      {Object.entries(selectedRequest.details).map(([key, value]) => {
                        if (key === "proof") {
                          return (
                            <div key={key} className="mt-4">
                              <h3 className="text-sm font-medium text-muted-foreground">Proof Document</h3>
                              <Button 
                                onClick={() => handleDownloadProof(selectedRequest.proof, selectedRequest.eventName)}
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Document
                              </Button>
                            </div>
                          );
                        } else {
                          return (
                            <div key={key} className="mt-2">
                              <h3 className="text-sm font-medium text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                              <p>{value as string}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No details available.</p>
                  )}

                  </div>
                )}

                <DialogFooter className="mt-6">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => {
                        setViewDialogOpen(false);
                        handleAction(selectedRequest, "approve");
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => {
                        setViewDialogOpen(false);
                        handleAction(selectedRequest, "reject");
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Approve/Reject Dialog */}
            <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {actionType === "approve" ? "Approve Request" : "Reject Request"}
                  </DialogTitle>
                  <DialogDescription>
                    {actionType === "approve"
                      ? "Add an optional comment for approving this request."
                      : "Please provide a reason for rejecting this request."}
                  </DialogDescription>
                </DialogHeader>

                {selectedRequest && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Request</h3>
                      <p className="text-sm">{selectedRequest.title} - {selectedRequest.studentName}</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="comment" className="text-sm font-medium">
                        {actionType === "approve" ? "Comment (Optional)" : "Reason for Rejection"}
                      </label>
                      <Textarea
                        id="comment"
                        placeholder={
                          actionType === "approve"
                            ? "Add any comments for the student..."
                            : "Provide a reason for rejection..."
                        }
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                        required={actionType === "reject"}
                      />
                    </div>
                  </div>
                )}

                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActionDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant={actionType === "approve" ? "default" : "destructive"}
                    onClick={submitAction}
                    disabled={actionType === "reject" && !comment.trim()}
                  >
                    {actionType === "approve" ? "Approve" : "Reject"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CustomCard>
        </motion.div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to="/faculty"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyRequests;