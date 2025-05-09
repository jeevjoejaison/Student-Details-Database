import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchDropdownOptions, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";

export const SocietyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    societyOrClubname: "",
    membershipType: "",
    description: "",
    proof: null as File | null,
    name: "",
    type: "",
    rollNumber: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [membershipType, setMembershipType] = useState([]);
  
  useEffect(() => {
    fetchDropdownOptions("Society Club Form", "category").then(setCategories);
    fetchDropdownOptions("Society Club Form", "Membership Type").then(setMembershipType);
  }, []);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const rollNumber = localStorage.getItem("rollNumber");
    const type = "Society";
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
      setFormData((prev) => ({ ...prev, proof: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ["category", "societyOrClubname", "membershipType"];
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
      if (!storedUser) {
        throw new Error("User not found. Please log in again.");
      }

      const dataToSubmit = new FormData();
      dataToSubmit.append("category", formData.category);
      dataToSubmit.append("societyOrClubname", formData.societyOrClubname);
      dataToSubmit.append("membershipType", formData.membershipType);
      dataToSubmit.append("description", formData.description);
      dataToSubmit.append("studentId", storedUser);
      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("type", formData.type);
      dataToSubmit.append("rollNumber", formData.rollNumber);
      
      if (formData.proof) {
        dataToSubmit.append("proof", formData.proof);
      }

      const result = await submitForm("societies-clubs", dataToSubmit);

      if (result.success) {
        toast({ title: "Success", description: "Uploaded successfully" });
        setFormData({
          category: "",
          societyOrClubname: "",
          membershipType: "",
          description: "",
          proof: null,
          name: "",
          type: "",
          rollNumber: ""
        });
        const fileInput = document.getElementById("proof") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        navigate("/society");
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
            <Label htmlFor="category" className="text-purple-900">Category<span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.optionValue} className="text-purple-900">
                    {category.optionValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="societyOrClubname" className="text-purple-900">Society/Club Name<span className="text-red-500">*</span></Label>
            <Input 
              id="societyOrClubname" 
              name="societyOrClubname" 
              value={formData.societyOrClubname} 
              onChange={handleInputChange} 
              placeholder="Enter society/club name" 
              className="border-purple-300 focus:border-purple-500" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipType" className="text-purple-900">Membership Type<span className="text-red-500">*</span></Label>
          <Select onValueChange={(value) => handleSelectChange("membershipType", value)} value={formData.membershipType}>
            <SelectTrigger className="border-purple-300 focus:border-purple-500">
              <SelectValue placeholder="Select membership type" />
            </SelectTrigger>
            <SelectContent>
              {membershipType.map((type) => (
                <SelectItem key={type.id} value={type.optionValue} className="text-purple-900">
                  {type.optionValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="proof" className="text-purple-900">Proof (optional)</Label>
          <Input 
            id="proof" 
            name="proof" 
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
    </form>
  );
};