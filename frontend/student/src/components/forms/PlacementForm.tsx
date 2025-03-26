import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchDropdownOptions, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

export const PlacementForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    hiringMode: "",
    joiningDate: "",
    ctc: "",
    description: "",
    offerLetter: null as File | null,
    name: "",
    type: "",
    rollNumber: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const [hiringMode, setHiringMode] = useState([]);

  useEffect(() => {
    fetchDropdownOptions("Placement Form", "Hiring Mode").then(setHiringMode);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const rollNumber = localStorage.getItem("rollNumber");
    const type = "Placement";
    if (storedUser) {
      setFormData((prev) => ({ 
        ...prev, 
        userId: storedUser, 
        name: name || "", 
        type: type, 
        rollNumber: rollNumber || "" 
      }));
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
      setFormData((prev) => ({ ...prev, offerLetter: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("userId");
    if (!storedUser) {
      throw new Error("User not found. Please log in again.");
    }

    const requiredFields = ["company", "role", "location", "hiringMode", "joiningDate", "ctc"];
    const validation = validateRequiredFields(formData, requiredFields);

    if (!validation.valid) {
      toast({
        title: "Missing required fields",
        description: `Please fill out all required fields: ${validation.missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) return;
    setIsSubmitting(true);

    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append("company", formData.company);
      dataToSubmit.append("role", formData.role);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("hiringMode", formData.hiringMode);
      dataToSubmit.append("joiningDate", formData.joiningDate);
      dataToSubmit.append("ctc", formData.ctc);
      dataToSubmit.append("description", formData.description);
      dataToSubmit.append("studentId", storedUser);
      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("type", formData.type);
      dataToSubmit.append("rollNumber", formData.rollNumber);
      
      if (formData.offerLetter) {
        dataToSubmit.append("offerLetter", formData.offerLetter);
      }

      const result = await submitForm("placements", dataToSubmit);

      if (result.success) {
        toast({ title: "Success", description: "Uploaded successfully" });
        setFormData({
          company: "",
          role: "",
          location: "",
          hiringMode: "",
          joiningDate: "",
          ctc: "",
          description: "",
          offerLetter: null,
          name: "",
          type: "",
          rollNumber: ""
        });
        const fileInput = document.getElementById("offerLetter") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        navigate("/placements");
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
            <Label htmlFor="company" className="text-purple-900">Company Name<span className="text-red-500">*</span></Label>
            <Input 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleInputChange} 
              placeholder="Enter company name" 
              className="border-purple-300 focus:border-purple-500" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-purple-900">Role<span className="text-red-500">*</span></Label>
            <Input 
              id="role" 
              name="role" 
              value={formData.role} 
              onChange={handleInputChange} 
              placeholder="Enter job role" 
              className="border-purple-300 focus:border-purple-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-purple-900">Location<span className="text-red-500">*</span></Label>
            <Input 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange} 
              placeholder="Enter job location" 
              className="border-purple-300 focus:border-purple-500" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiringMode" className="text-purple-900">Hiring Mode<span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => handleSelectChange("hiringMode", value)} value={formData.hiringMode}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select hiring mode" />
              </SelectTrigger>
              <SelectContent>
                {hiringMode.map((mode) => (
                  <SelectItem key={mode.id} value={mode.optionValue} className="text-purple-900">
                    {mode.optionValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="joiningDate" className="text-purple-900">Joining Date<span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-purple-300 hover:bg-purple-50",
                  !formData.joiningDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                {formData.joiningDate ? format(new Date(formData.joiningDate), "PPP") : <span>Select joining date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-purple-300 bg-white shadow-md">
              <Calendar
                mode="single"
                selected={formData.joiningDate ? new Date(formData.joiningDate) : undefined}
                onSelect={(date) => {
                  setFormData(prev => ({
                    ...prev,
                    joiningDate: date ? format(date, "yyyy-MM-dd") : ""
                  }));
                }}
                initialFocus
                className="border-0"
              />
            </PopoverContent>
          </Popover>
        </div>

          <div className="space-y-2">
            <Label htmlFor="ctc" className="text-purple-900">CTC (in LPA)<span className="text-red-500">*</span></Label>
            <Input 
              id="ctc" 
              name="ctc" 
              type="number" 
              value={formData.ctc} 
              onChange={handleInputChange} 
              placeholder="Enter CTC" 
              className="border-purple-300 focus:border-purple-500" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-purple-900">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Enter additional details" 
            className="border-purple-300 focus:border-purple-500" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offerLetter" className="text-purple-900">Offer Letter (optional)</Label>
          <Input 
            id="offerLetter" 
            name="offerLetter" 
            type="file" 
            onChange={handleFileChange} 
            className="cursor-pointer border-purple-300 focus:border-purple-500" 
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/dashboard")} 
          className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 bg-white"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
      </div>
    </form>
  );
};