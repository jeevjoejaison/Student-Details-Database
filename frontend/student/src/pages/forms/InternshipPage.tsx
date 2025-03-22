import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternshipForm } from "@/components/forms/InternshipForm";
import { CustomCard } from "@/components/ui/CustomCard";
import { PlusCircle, Trash2, Download } from "lucide-react";
import { fetchFormData, handleDownloadProof } from "@/utils/formUtils";

const InternshipPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [internships, setInternships] = useState([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (activeTab === "view" && user?.userId) {
      fetchFormData("internships", user.userId).then(setInternships);
    }
  }, [activeTab, user?.userId]);

  const handleDelete = async (eventType: string, activityId: any) => {
    try {
      await axios.delete(`http://localhost:8080/${eventType}/delete`, {
        params: { activityId }
      });
      setInternships(internships.filter(event => event.activityId !== activityId));
    } catch (error) {
      console.error(`Error deleting ${eventType} event:`, error);
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    return dateString ? format(new Date(dateString), "MMM dd, yyyy") : "Unknown date";
  };

  return (
    <MainLayout title="Internships" showBackButton>
      <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Internships</h2>
            <p className="text-gray-600">Manage your internship experiences</p>
          </div>
        </div>

        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-200 rounded-lg">
            <TabsTrigger value="add">Add New</TabsTrigger>
            <TabsTrigger value="view">View All</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="pt-4">
            <CustomCard className="bg-white border border-gray-300 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Internship</h3>
              <InternshipForm />
            </CustomCard>
          </TabsContent>

          <TabsContent value="view" className="pt-4">
            {internships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map(event => (
                  <CustomCard key={event.activityId} className="p-6 bg-white border border-gray-300 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900">Company: {event.companyName || ""}</h3>
                    <p className="text-sm text-gray-700 mb-2">Description: {event.description || ""}</p>
                    <p className="text-sm text-gray-800 font-medium">Role: {event.role || ""}</p>
                    <p className="text-sm text-gray-800">Location: {event.location || ""}</p>
                    <p className="text-sm text-gray-600">Start Date: {formatDate(event.startDate)}</p>
                    <p className="text-sm text-gray-600">End Date: {formatDate(event.endDate)}</p>
                    <p className="text-sm text-gray-600">Stipend: {event.stipend || ""}</p>
                    <div className="flex gap-2 mt-4">
                      {event.offerLetter && (
                        <Button 
                          onClick={() => handleDownloadProof(event.offerLetter, event.companyName)} 
                          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md">
                          <Download className="h-4 w-4" /> Download Offer Letter
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDelete("internships", event.activityId)} 
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md">
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CustomCard>
                ))}
              </div>
            ) : (
              <CustomCard className="flex flex-col items-center justify-center py-10 bg-white border border-gray-300 shadow-md rounded-lg">
                <div className="text-center space-y-3">
                  <PlusCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">No internships added yet</h3>
                  <p className="text-sm text-gray-700 max-w-md mx-auto">
                    When you add internships, they will appear here. Add your first internship to get started.
                  </p>
                  <Button onClick={() => setActiveTab("add")} className="mt-2 bg-gray-800 hover:bg-gray-900 text-white">
                    Add Internship
                  </Button>
                </div>
              </CustomCard>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InternshipPage;