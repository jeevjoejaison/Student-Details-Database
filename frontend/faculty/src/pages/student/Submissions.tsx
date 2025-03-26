
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft,
  Award,
  Briefcase,
  Building,
  FileText,
  Laptop,
  Music,
  Search,
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function StudentSubmissions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock submissions data
  const submissions = [
    {
      id: "1",
      title: "College Annual Fest",
      category: "cultural",
      date: "2023-05-15",
      status: "approved",
      icon: <Music className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "Hackathon 2023",
      category: "technical",
      date: "2023-06-22",
      status: "pending",
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Inter-College Basketball Tournament",
      category: "sports",
      date: "2023-07-10",
      status: "rejected",
      icon: <Award className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Technical Club Membership",
      category: "club",
      date: "2023-08-05",
      status: "approved",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Summer Internship at Tech Corp",
      category: "internship",
      date: "2023-05-01",
      status: "approved",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      id: "6",
      title: "Job Offer from Software Inc",
      category: "placement",
      date: "2023-09-15",
      status: "pending",
      icon: <Building className="h-4 w-4" />,
    },
    {
      id: "7",
      title: "Research on AI Applications",
      category: "research",
      date: "2023-04-20",
      status: "approved",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case "cultural":
        return "Cultural Event";
      case "technical":
        return "Technical Event";
      case "sports":
        return "Sports Event";
      case "club":
        return "Society/Club";
      case "internship":
        return "Internship";
      case "placement":
        return "Placement";
      case "research":
        return "Research Paper";
      default:
        return category;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter submissions based on search query, category, and status
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "all" || submission.category === categoryFilter) &&
      (statusFilter === "all" || submission.status === statusFilter)
  );

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
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
        </motion.div>
        <p className="text-muted-foreground mt-1 ml-10">
          View all your submitted achievements
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CustomCard>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search submissions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cultural">Cultural Events</SelectItem>
                  <SelectItem value="technical">Technical Events</SelectItem>
                  <SelectItem value="sports">Sports Events</SelectItem>
                  <SelectItem value="club">Society/Club</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="placement">Placements</SelectItem>
                  <SelectItem value="research">Research Papers</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {submission.icon}
                          </div>
                          <span className="font-medium">{submission.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryName(submission.category)}</TableCell>
                      <TableCell className="hidden md:table-cell">{submission.date}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/submission/${submission.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No submissions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CustomCard>
      </motion.div>
    </PageContainer>
  );
}
