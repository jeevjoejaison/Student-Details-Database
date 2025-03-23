import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { submitForm } from "@/utils/formUtils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const ResearchPaperForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paperType, setPaperType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const [journalData, setJournalData] = useState({
    title: "", name: "", publisher: "", ISSN: "", impactFactor: "", year: "", volume: "", issue: "", pageNumbers: "", doi: "", url: ""
  });
  
  const [conferenceData, setConferenceData] = useState({
    title: "", name: "", year: "", location: "", organizer: "", acceptanceRate: "", startDate: "", endDate: "", doi: "", url: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    paperType === "Journal"
      ? setJournalData((prev) => ({ ...prev, [name]: value }))
      : setConferenceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("paperType", paperType);
    const data = paperType === "Journal" ? journalData : conferenceData;
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    try {
      const result = await submitForm("conference-papers", formData);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        navigate("/research-papers");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({ title: "Error", description: error.message || "Submission failed", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Label className="font-semibold">Type of Research Paper</Label>
      <Select onValueChange={setPaperType} value={paperType}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Journal">Journal Article</SelectItem>
          <SelectItem value="Conference">Conference Paper</SelectItem>
        </SelectContent>
      </Select>

      {paperType === "Journal" && (
        <>
          <Label>Title</Label>
          <Input name="title" value={journalData.title} onChange={handleInputChange} />

          <Label>Name</Label>
          <Input name="name" value={journalData.name} onChange={handleInputChange} />

          <Label>Publisher</Label>
          <Input name="publisher" value={journalData.publisher} onChange={handleInputChange} />

          <Label>ISSN</Label>
          <Input name="ISSN" value={journalData.ISSN} onChange={handleInputChange} />

          <Label>Impact Factor</Label>
          <Input name="impactFactor" value={journalData.impactFactor} onChange={handleInputChange} />

          <Label>Year</Label>
          <Input name="year" value={journalData.year} onChange={handleInputChange} />

          <Label>Volume</Label>
          <Input name="volume" value={journalData.volume} onChange={handleInputChange} />

          <Label>Issue</Label>
          <Input name="issue" value={journalData.issue} onChange={handleInputChange} />

          <Label>Page Numbers</Label>
          <Input name="pageNumbers" value={journalData.pageNumbers} onChange={handleInputChange} />

          <Label>DOI</Label>
          <Input name="doi" value={journalData.doi} onChange={handleInputChange} />

          <Label>URL</Label>
          <Input name="url" value={journalData.url} onChange={handleInputChange} />
        </>
      )}

      {paperType === "Conference" && (
        <>
          <Label>Title</Label>
          <Input name="title" value={conferenceData.title} onChange={handleInputChange} />

          <Label>Name</Label>
          <Input name="name" value={conferenceData.name} onChange={handleInputChange} />

          <Label>Year</Label>
          <Input name="year" value={conferenceData.year} onChange={handleInputChange} />

          <Label>Location</Label>
          <Input name="location" value={conferenceData.location} onChange={handleInputChange} />

          <Label>Organizer</Label>
          <Input name="organizer" value={conferenceData.organizer} onChange={handleInputChange} />

          <Label>Acceptance Rate</Label>
          <Input name="acceptanceRate" value={conferenceData.acceptanceRate} onChange={handleInputChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="required-field">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Select start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setConferenceData(prev => ({ 
                      ...prev, 
                      startDate: date ? format(date, "yyyy-MM-dd") : "" 
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate" className="required-field">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setConferenceData(prev => ({ 
                      ...prev, 
                      endDate: date ? format(date, "yyyy-MM-dd") : "" 
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

          <Label>DOI</Label>
          <Input name="doi" value={conferenceData.doi} onChange={handleInputChange} />

          <Label>URL</Label>
          <Input name="url" value={conferenceData.url} onChange={handleInputChange} />
        </>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/research-papers")}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
      </div>
    </form>
  );
};

export default ResearchPaperForm;