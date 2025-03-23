
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formDropdowns, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
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
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

   useEffect(() => {
      const storedUser = localStorage.getItem("userId");
      if (storedUser) {
        setFormData((prev) => ({ ...prev, userId: storedUser })); // Assuming `user.id` holds the ID
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
    
    setFormData({
      company: "",
      role:"",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      stipend: "",
      offerLetter: null as File | null,
      studentId: 0,})
    setStartDate(undefined)
    setEndDate(undefined)

    // Validate required fields
    const requiredFields = ["company", "role", "location","startDate","endDate","stipend",];
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
      dataToSubmit.append("company", formData.company);
      dataToSubmit.append("role", formData.role);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("startDate", formData.startDate);
      dataToSubmit.append("endDate", formData.endDate);
      dataToSubmit.append("stipend", formData.stipend);
      dataToSubmit.append("studentId", storedUser);
      
      if (formData.offerLetter) {
        dataToSubmit.append("offerLetter", formData.offerLetter);
      }

      const result = await submitForm("internships", dataToSubmit);
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
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
            <Label htmlFor="company" className="required-field">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role" className="required-field">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter your role/position"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="required-field">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter internship location"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stipend" className="required-field">Stipend (if any)</Label>
            <Input
              id="stipend"
              name="stipend"
              value={formData.stipend}
              onChange={handleInputChange}
              placeholder="Enter stipend amount"
            />
          </div>
        </div>
        
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
                    setFormData(prev => ({ 
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
                    setFormData(prev => ({ 
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
        
        <div className="space-y-2">
          <Label htmlFor="offerLetter">Offer Letter (PDF)</Label>
          <Input
            id="offerLetter"
            name="offerLetter"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Upload your internship offer letter
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter details about your responsibilities and experience"
            rows={4}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/internships")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
