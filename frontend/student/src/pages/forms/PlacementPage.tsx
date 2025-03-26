import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlacementForm } from "@/components/forms/PlacementForm";
import { CustomCard } from "@/components/ui/CustomCard";
import { PlusCircle, Trash2, Download } from "lucide-react";
import { fetchFormData, handleDownloadProof } from "@/utils/formUtils";

const PlacementPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [placements, setPlacements] = useState([]);
  const storedUser = localStorage.getItem("userId");

  useEffect(() => {
    if (activeTab === "view" && storedUser) {
      fetchFormData("placements", storedUser).then(setPlacements);
    }
  }, [activeTab, storedUser]);

  const handleDelete = async (eventType: string, activityId: any) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this placement record?");
      if (!isConfirmed) return;
      
      await axios.delete(`http://localhost:8080/${eventType}/delete`, {
        params: { activityId }
      });
      setPlacements(placements.filter(placement => placement.activityId !== activityId));
    } catch (error) {
      console.error(`Error deleting ${eventType} entry:`, error);
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    return dateString ? format(new Date(dateString), "MMM dd, yyyy") : "Unknown date";
  };

  return (
    <MainLayout title="Placements" showBackButton>
      <div className="space-y-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-purple-900">Placements</h2>
            <p className="text-purple-600">Manage your placement records</p>
          </div>
        </div>

        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-1 border border-purple-200 shadow-sm">
            <TabsTrigger 
              value="add" 
              className="text-purple-800 hover:bg-purple-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
            >
              Add New
            </TabsTrigger>
            <TabsTrigger 
              value="view" 
              className="text-purple-800 hover:bg-purple-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
            >
              View All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="pt-4">
            <CustomCard className="bg-white border border-purple-200 p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Add Placement</h3>
              <PlacementForm />
            </CustomCard>
          </TabsContent>

          <TabsContent value="view" className="pt-4">
            {placements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placements.map(placement => (
                  <CustomCard key={placement.activityId} className="p-6 bg-white border border-purple-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-purple-900">{placement.company}</h3>
                    <p className="text-sm text-purple-700 mb-2">{placement.role}</p>
                    <p className="text-sm text-purple-800 font-medium">Location: {placement.location}</p>
                    <p className="text-sm text-purple-600">Hiring Mode: {placement.hiringMode}</p>
                    <p className="text-sm text-purple-600">Joining Date: {formatDate(placement.joiningDate)}</p>
                    <p className="text-sm text-purple-600">CTC: {placement.ctc} LPA</p>
                    {/* Show Comment if available */}
                    {placement.comments && (
                      <div className="mt-3 p-3 bg-gray-100 rounded-md">
                        <h4 className="text-sm font-semibold text-purple-800">Comment:</h4>
                        <p className="text-sm text-purple-700">{placement.comments}</p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      {placement.offerLetter && (
                        <Button 
                          onClick={() => handleDownloadProof(placement.offerLetter, placement.company)} 
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md shadow-md"
                        >
                          <Download className="h-4 w-4" /> Download Offer Letter
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDelete("placements", placement.activityId)} 
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md shadow-md"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CustomCard>
                ))}
              </div>
            ) : (
              <CustomCard className="flex flex-col items-center justify-center py-10 bg-white border border-purple-200 shadow-lg rounded-lg">
                <div className="text-center space-y-3">
                  <PlusCircle className="mx-auto h-12 w-12 text-purple-400" />
                  <h3 className="text-lg font-medium text-purple-900">No placements added yet</h3>
                  <p className="text-sm text-purple-700 max-w-md mx-auto">
                    Add your first placement record to get started.
                  </p>
                  <Button 
                    onClick={() => setActiveTab("add")} 
                    className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md"
                  >
                    Add Placement
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

export default PlacementPage;