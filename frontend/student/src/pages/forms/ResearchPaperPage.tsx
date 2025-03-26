import { useState, useEffect } from "react";
import axios from "axios";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResearchPaperForm from "@/components/forms/ResearchPaperForm";
import { CustomCard } from "@/components/ui/CustomCard";
import { Trash2, PlusCircle } from "lucide-react";

const ResearchPaperPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [researchPapers, setResearchPapers] = useState([]);
  const storedUser = localStorage.getItem("userId");

  useEffect(() => {
    if (activeTab === "view" && storedUser) {
      fetchResearchPapers(storedUser);
    }
  }, [activeTab, storedUser]);

  const fetchResearchPapers = async (studentId: string) => {
    try {
      const [conferenceRes, journalRes] = await Promise.all([
        axios.get(`http://localhost:8080/conference-papers/get-all?studentId=${studentId}`),
        axios.get(`http://localhost:8080/journal-papers/get-all?studentId=${studentId}`)
      ]);

      const formattedConference = conferenceRes.data.map(paper => ({ ...paper, type: "Conference" }));
      const formattedJournal = journalRes.data.map(paper => ({ ...paper, type: "Journal" }));

      setResearchPapers([...formattedConference, ...formattedJournal]);
    } catch (error) {
      console.error("Error fetching research papers:", error);
    }
  };

  const handleDelete = async (paperType: string, activityId: number) => {
    try {
      const endpoint = paperType === "Journal" ? "journal-papers" : "conference-papers";
      await axios.delete(`http://localhost:8080/${endpoint}/delete?activityId=${activityId}`);
      setResearchPapers(researchPapers.filter(paper => paper.activityId !== activityId));
    } catch (error) {
      console.error(`Error deleting ${paperType} paper:`, error);
    }
  };

  return (
    <MainLayout title="Research Papers" showBackButton>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Research Papers</h2>
            <p className="text-muted-foreground">
              Manage your published research papers and conference proceedings
            </p>
          </div>
        </div>

        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="add">Add New</TabsTrigger>
            <TabsTrigger value="view">View All</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="pt-4">
            <CustomCard>
              <h3 className="text-lg font-medium mb-4">Add Research Paper</h3>
              <ResearchPaperForm />
            </CustomCard>
          </TabsContent>

          <TabsContent value="view" className="pt-4">
            {researchPapers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchPapers.map(paper => (
                  <CustomCard key={paper.activityId} className="p-6 bg-white border shadow-lg rounded-lg">
                    <h3 className="text-xl font-semibold">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {paper.type === "Journal" ? `Journal: ${paper.journalName}` : `Conference: ${paper.conferenceName}`}
                    </p>
                    <p className="text-sm text-muted-foreground">Author: {paper.author}</p>
                    <p className="text-sm text-muted-foreground">Year: {paper.year}</p>
                    {paper.doi && <p className="text-sm text-muted-foreground">DOI: {paper.doi}</p>}
                    {paper.url && (
                      <a 
                      href={paper.url.startsWith("http") ? paper.url : `https://${paper.url}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Paper
                    </a>
                    
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={() => handleDelete(paper.type, paper.activityId)} 
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md shadow-md">
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CustomCard>
                ))}
              </div>
            ) : (
              <CustomCard className="flex flex-col items-center justify-center py-10">
                <div className="text-center space-y-3">
                  <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium">No research papers added yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    When you add research papers, they will appear here. Add your first research paper to get started.
                  </p>
                  <Button onClick={() => setActiveTab("add")} className="mt-2">
                    Add Research Paper
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

export default ResearchPaperPage;
