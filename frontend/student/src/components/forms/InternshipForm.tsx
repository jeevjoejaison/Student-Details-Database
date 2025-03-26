import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formDropdowns, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const InternshipForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    stipend: "",
    description: "",
    offerLetter: null as File | null,
    studentId: 0,
    name: "",
    type: "",
    rollNumber: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const rollNumber = localStorage.getItem("rollNumber");
    const type = "Internship";
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, offerLetter: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ["company", "role", "location", "startDate", "endDate", "stipend"];
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
      const storedUser = localStorage.getItem("userId");
      if (!storedUser) throw new Error("User not found. Please log in again.");

      const dataToSubmit = new FormData();
      dataToSubmit.append("company", formData.company);
      dataToSubmit.append("role", formData.role);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("startDate", formData.startDate);
      dataToSubmit.append("endDate", formData.endDate);
      dataToSubmit.append("stipend", formData.stipend);
      dataToSubmit.append("studentId", storedUser);
      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("type", formData.type);
      dataToSubmit.append("rollNumber", formData.rollNumber);
      
      if (formData.offerLetter) {
        dataToSubmit.append("offerLetter", formData.offerLetter);
      }

      const result = await submitForm("internships", dataToSubmit);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Uploaded successfully",
        });
        setFormData({
          company: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          stipend: "",
          description: "",
          offerLetter: null,
          studentId: 0,
          name: "",
          type: "",
          rollNumber: ""
        });
        const fileInput = document.getElementById("offerLetter") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        setStartDate(undefined);
        setEndDate(undefined);
        navigate("/internships");
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
            <Label htmlFor="company" className="text-purple-900">
              Company<span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="role" className="text-purple-900">
              Role<span className="text-red-500">*</span>
            </Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter your role/position"
              className="border-purple-300 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-purple-900">
              Location<span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter internship location"
              className="border-purple-300 focus:border-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stipend" className="text-purple-900">
              Stipend (if any)<span className="text-red-500">*</span>
            </Label>
            <Input
              id="stipend"
              name="stipend"
              type="number"
              value={formData.stipend}
              onChange={handleInputChange}
              placeholder="Enter stipend amount"
              className="border-purple-300 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-purple-900">
              Start Date<span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-purple-300 hover:bg-purple-50",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                  {startDate ? format(startDate, "PPP") : <span>Select start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-purple-300">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setFormData(prev => ({ 
                      ...prev, 
                      startDate: date ? format(date, "yyyy-MM-dd") : "" 
                    }));
                  }}
                  initialFocus
                  className="border-0"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-purple-900">
              End Date<span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-purple-300 hover:bg-purple-50",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                  {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-purple-300">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setFormData(prev => ({ 
                      ...prev, 
                      endDate: date ? format(date, "yyyy-MM-dd") : "" 
                    }));
                  }}
                  initialFocus
                  className="border-0"
                />
              </PopoverContent>
            </Popover>
          </div>
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
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-purple-900">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter details about your responsibilities and experience"
            className="border-purple-300 focus:border-purple-500"
            rows={4}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
          className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 hover:text-green-700 bg-white"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};