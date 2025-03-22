import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocietyForm } from "@/components/forms/SocietyForm";
import { CustomCard } from "@/components/ui/CustomCard";
import { PlusCircle, Trash2, Download } from "lucide-react";
import { fetchFormData, handleDownloadProof } from "@/utils/formUtils";

const SocietyPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [societies, setSocieties] = useState([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (activeTab === "view" && user?.userId) {
      fetchFormData("societies-clubs", user.userId).then(setSocieties);
    }
    console.log(societies)
  }, [activeTab, user?.userId]);

  const handleDelete = async (eventType: string, activityId: any) => {
    try {
      await axios.delete(`http://localhost:8080/${eventType}/delete`, {
        params: { activityId } // Pass activityId as a query parameter
      });
      setSocieties(societies.filter(society => society.activityId !== activityId));
    } catch (error) {
      console.error(`Error deleting ${eventType} entry:`, error);
    }
  };


  return (
    <MainLayout title="Societies & Clubs" showBackButton>
      <div className="space-y-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-purple-900">Societies & Clubs</h2>
            <p className="text-purple-600">Manage your society and club memberships</p>
          </div>
        </div>

        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-1">
            <TabsTrigger value="add" className="text-white hover:bg-purple-600 data-[state=active]:bg-white data-[state=active]:text-purple-900 rounded-md">Add New</TabsTrigger>
            <TabsTrigger value="view" className="text-white hover:bg-blue-600 data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md">View All</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="pt-4">
            <CustomCard className="bg-white border border-purple-200 p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Add Society/Club</h3>
              <SocietyForm />
            </CustomCard>
          </TabsContent>

          <TabsContent value="view" className="pt-4">
            {societies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {societies.map(society => (
                  <CustomCard key={society.activityId} className="p-6 bg-white border border-purple-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-purple-900">{society.name}</h3>
                    <p className="text-sm text-purple-700 mb-2">{society.description}</p>
                    <p className="text-sm text-purple-800 font-medium">Category: {society.category}</p>
                    <p className="text-sm text-purple-600">Membership Type: {society.membershipType}</p>
                    <div className="flex gap-2 mt-4">
                      {society.proof && (
                        <Button 
                          onClick={() => handleDownloadProof(society.proof, society.name)} 
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md shadow-md">
                          <Download className="h-4 w-4" /> Download Proof
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDelete("societies-clubs", society.activityId)} 
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md shadow-md">
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
                  <h3 className="text-lg font-medium text-purple-900">No societies or clubs added yet</h3>
                  <p className="text-sm text-purple-700 max-w-md mx-auto">
                    Add your first society or club membership to get started.
                  </p>
                  <Button 
                    onClick={() => setActiveTab("add")} 
                    className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md">
                    Add Society/Club
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

export default SocietyPage;