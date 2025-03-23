import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formDropdowns, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const TechnicalEventForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    date: "",
    awards: "",
    description: "",
    category: "",
    proof: null as File | null,
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
     
      setFormData((prev) => ({ ...prev, userId: storedUser })); // Assuming user.id holds the ID
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, proof: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["eventName", "location", "date", "category"];
    const validation = validateRequiredFields(formData, requiredFields);

    if (!validation.valid) {
      toast({
        title: "Missing required fields",
        description: `Please fill out all required fields: ${validation.missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {

      const storedUser = localStorage.getItem("userId");
  
      if (!storedUser) {
        throw new Error("User not found. Please log in again.");
      }

      const dataToSubmit = new FormData();
      dataToSubmit.append("eventName", formData.eventName);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("date", formData.date);
      dataToSubmit.append("awards", formData.awards);
      dataToSubmit.append("description", formData.description);
      dataToSubmit.append("category", formData.category);
      dataToSubmit.append("studentId", storedUser);
      if (formData.proof) {
        dataToSubmit.append("proof", formData.proof);
      }

      const result = await submitForm("technical-events", dataToSubmit);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        navigate("/technical-events");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to submit form",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="eventName" className="text-purple-900">Event Name<span className="text-red-500">*</span></Label>
            <Input id="eventName" name="eventName" value={formData.eventName} onChange={handleInputChange} placeholder="Enter event name" className="border-purple-300 focus:border-purple-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-purple-900">Location<span className="text-red-500">*</span></Label>
            <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter event location" className="border-purple-300 focus:border-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-purple-900">Date<span className="text-red-500">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal border-purple-300 hover:bg-purple-50", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setFormData((prev) => ({ ...prev, date: date ? format(date, "yyyy-MM-dd") : "" }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-purple-900">Category<span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {formDropdowns.categories.filter(cat => 
                  ["Technical", "Quiz", "Debate", "Other"].includes(cat)
                ).map((category) => (
                  <SelectItem key={category} value={category} className="text-purple-900">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="award" className="text-purple-900">Award</Label>
            <Select onValueChange={(value) => handleSelectChange("awards", value)} value={formData.awards}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select an award" />
              </SelectTrigger>
              <SelectContent>
                {formDropdowns.awards.map((award) => (
                  <SelectItem key={award} value={award} className="text-purple-900">
                    {award}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof" className="text-purple-900">Proof (optional)</Label>
            <Input id="proof" name="proof" type="file" onChange={handleFileChange} className="cursor-pointer border-purple-300 focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-purple-900">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter additional details" className="border-purple-300 focus:border-purple-500" />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/technical-events")} className="border-purple-300 text-purple-900 hover:bg-purple-50">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};