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
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({ ...prev, userId: user.id })); // Assuming user.id holds the ID
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

    const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.userId) {
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
      dataToSubmit.append("studentId", user.userId);
      if (formData.offerLetter) {
        dataToSubmit.append("offerLetter", formData.offerLetter);
      }

      const result = await submitForm("placements", dataToSubmit);

      if (result.success) {
        toast({ title: "Success", description: result.message });
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
            <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Enter company name" className="border-purple-300 focus:border-purple-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-purple-900">Role<span className="text-red-500">*</span></Label>
            <Input id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter job role" className="border-purple-300 focus:border-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-purple-900">Location<span className="text-red-500">*</span></Label>
            <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter job location" className="border-purple-300 focus:border-purple-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiringMode" className="text-purple-900">Hiring Mode<span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => handleSelectChange("hiringMode", value)} value={formData.hiringMode}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select hiring mode" />
              </SelectTrigger>
              <SelectContent>
                {formDropdowns.hiringMode.map((mode) => (
                  <SelectItem key={mode} value={mode} className="text-purple-900">
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="joiningDate" className="text-purple-900">Joining Date<span className="text-red-500">*</span></Label>
            <Input id="joiningDate" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleInputChange} className="border-purple-300 focus:border-purple-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctc" className="text-purple-900">CTC (in LPA)<span className="text-red-500">*</span></Label>
            <Input id="ctc" name="ctc" type="number" value={formData.ctc} onChange={handleInputChange} placeholder="Enter CTC" className="border-purple-300 focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-purple-900">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter additional details" className="border-purple-300 focus:border-purple-500" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offerLetter" className="text-purple-900">Offer Letter (optional)</Label>
          <Input id="offerLetter" name="offerLetter" type="file" onChange={handleFileChange} className="cursor-pointer border-purple-300 focus:border-purple-500" />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/placements")} className="border-purple-300 text-purple-900 hover:bg-purple-50">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};