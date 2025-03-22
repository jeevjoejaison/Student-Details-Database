import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { formDropdowns, submitForm, validateRequiredFields } from "@/utils/formUtils";

const ResearchPaperForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paperType, setPaperType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    journalName: "",
    volume: "",
    issue: "",
    pageNumbers: "",
    publisher: "",
    issn: "",
    conferenceName: "",
    conferenceDate: "",
    location: "",
    organizer: "",
    proceedingsPublisher: "",
    isbn: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = paperType === "Journal" ? ["title", "journalName", "volume", "issue", "pageNumbers", "publisher", "issn"] : ["title", "conferenceName", "conferenceDate", "location", "organizer", "proceedingsPublisher", "isbn"];
    
    const validation = validateRequiredFields(formData, requiredFields);
    if (!validation.valid) {
      toast({
        title: "Missing required fields",
        description: `Please fill out: ${validation.missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitForm("Research Paper", formData);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="required-field">Paper Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter paper title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="required-field">Type of Research Paper</Label>
          <Select onValueChange={setPaperType} value={paperType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Journal">Journal Article</SelectItem>
              <SelectItem value="Conference">Conference Paper</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paperType === "Journal" && (
          <>
            <Label htmlFor="journalName" className="required-field">Journal Name</Label>
            <Input id="journalName" name="journalName" value={formData.journalName} onChange={handleInputChange} />
            <Label htmlFor="volume" className="required-field">Volume</Label>
            <Input id="volume" name="volume" value={formData.volume} onChange={handleInputChange} />
            <Label htmlFor="issue" className="required-field">Issue</Label>
            <Input id="issue" name="issue" value={formData.issue} onChange={handleInputChange} />
            <Label htmlFor="pageNumbers" className="required-field">Page Numbers</Label>
            <Input id="pageNumbers" name="pageNumbers" value={formData.pageNumbers} onChange={handleInputChange} />
            <Label htmlFor="publisher" className="required-field">Publisher</Label>
            <Input id="publisher" name="publisher" value={formData.publisher} onChange={handleInputChange} />
            <Label htmlFor="issn" className="required-field">ISSN</Label>
            <Input id="issn" name="issn" value={formData.issn} onChange={handleInputChange} />
          </>
        )}

        {paperType === "Conference" && (
          <>
            <Label htmlFor="conferenceName" className="required-field">Conference Name</Label>
            <Input id="conferenceName" name="conferenceName" value={formData.conferenceName} onChange={handleInputChange} />
            <Label htmlFor="conferenceDate" className="required-field">Conference Date</Label>
            <Input id="conferenceDate" name="conferenceDate" value={formData.conferenceDate} onChange={handleInputChange} />
            <Label htmlFor="location" className="required-field">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
            <Label htmlFor="organizer" className="required-field">Organizer</Label>
            <Input id="organizer" name="organizer" value={formData.organizer} onChange={handleInputChange} />
            <Label htmlFor="proceedingsPublisher" className="required-field">Proceedings Publisher</Label>
            <Input id="proceedingsPublisher" name="proceedingsPublisher" value={formData.proceedingsPublisher} onChange={handleInputChange} />
            <Label htmlFor="isbn" className="required-field">ISBN</Label>
            <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleInputChange} />
          </>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/research-papers")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ResearchPaperForm;



