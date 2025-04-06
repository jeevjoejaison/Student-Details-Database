import { useState, useEffect } from "react";
import { Clock, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCard from "@/components/DashboardCard";
import axios from "axios"; 

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [studentCount, setStudentCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);

  const facultyId = 110; // Change this based on logged-in faculty

  // Fetch counts from the backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Replace with your actual API endpoints
        const studentResponse = await axios.get(`http://localhost:8080/api/faculty/students/count/${facultyId}`);
        const pendingResponse = await axios.get(`http://localhost:8080/api/faculty/pending-activities/count/${facultyId}`);
        const verifiedResponse = await axios.get(`http://localhost:8080/api/faculty/verified-activities/count/${facultyId}`);

        setStudentCount(studentResponse.data);
        setPendingCount(pendingResponse.data);
        setVerifiedCount(verifiedResponse.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // Handlers retained from the first code
  const handleViewStudents = () => {
    navigate("/faculty/students");
  };

  const handleViewPending = () => {
    navigate("/faculty/requests");
  };

  const handleViewVerified = () => {
    navigate("/faculty/verified");
  };
  
  return (
    <div className="flex flex-col min-h-screen mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      {/* Dashboard Header */}
      <DashboardHeader />

      <div className="flex flex-col space-y-8 mt-8">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h1 className="text-sm font-medium text-muted-foreground">
              FACULTY DASHBOARD
            </h1>
          </div>

          {/* Auth-based greeting retained from the first code */}
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.name}
          </h2>
          <p className="text-muted-foreground">
            Manage student submissions and verification requests
          </p>
        </div>

        {/* Dashboard Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-slide-in-bottom"
          style={{ animationDelay: "100ms" }}
        >
          {/* View Assigned Students */}
          <DashboardCard
            icon={<Users className="h-5 w-5" />}
            title="Students"
            count={studentCount}
            onClick={handleViewStudents}
          />

          {/* View Pending Requests */}
          <DashboardCard
            icon={<Clock className="h-5 w-5" />}
            title="Pending Verifications"
            count={pendingCount}
            onClick={handleViewPending}
            highlight={true}
          />

          {/* View Verified Submissions */}
          <DashboardCard
            icon={<CheckCircle className="h-5 w-5" />}
            title="Verified Submissions"
            count={verifiedCount}
            onClick={handleViewVerified}
          />
        </div>
      </div>
    </div>
  );
}