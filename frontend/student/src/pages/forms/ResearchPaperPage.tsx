import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResearchPaperForm from "@/components/forms/ResearchPaperForm"
import { CustomCard } from "@/components/ui/CustomCard";
import { PlusCircle } from "lucide-react";

const ResearchPaperPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  
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
            <CustomCard className="flex flex-col items-center justify-center py-10">
              <div className="text-center space-y-3">
                <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-medium">No research papers added yet</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  When you add research papers, they will appear here. Add your first research paper to get started.
                </p>
                <Button 
                  onClick={() => setActiveTab("add")}
                  className="mt-2"
                >
                  Add Research Paper
                </Button>
              </div>
            </CustomCard>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ResearchPaperPage;
