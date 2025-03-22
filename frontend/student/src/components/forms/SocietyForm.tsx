import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formDropdowns, submitForm, validateRequiredFields } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";

export const SocietyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    membershipType: "",
    description: "",
    proof: null as File | null,
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  
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
      setFormData((prev) => ({ ...prev, proof: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      category: "",
      name: "",
      membershipType: "",
      description: "",
      proof: null as File | null,
    })
    const requiredFields = ["category", "name", "membershipType"];
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

      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.userId) {
        throw new Error("User not found. Please log in again.");
      }

      const dataToSubmit = new FormData();
      dataToSubmit.append("category", formData.category);
      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("membershipType", formData.membershipType);
      dataToSubmit.append("description", formData.description);
      dataToSubmit.append("studentId", user.userId);
      if (formData.proof) {
        dataToSubmit.append("proof", formData.proof);
      }

      const result = await submitForm("societies-clubs", dataToSubmit);

      if (result.success) {
        toast({ title: "Success", description: result.message });
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
                {formDropdowns.societyCategory.map((category) => (
                  <SelectItem key={category} value={category} className="text-purple-900">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-purple-900">Society/Club Name<span className="text-red-500">*</span></Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter society/club name" className="border-purple-300 focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipType" className="text-purple-900">Membership Type<span className="text-red-500">*</span></Label>
          <Select onValueChange={(value) => handleSelectChange("membershipType", value)} value={formData.membershipType}>
            <SelectTrigger className="border-purple-300 focus:border-purple-500">
              <SelectValue placeholder="Select membership type" />
            </SelectTrigger>
            <SelectContent>
              {formDropdowns.membershipType.map((type) => (
                <SelectItem key={type} value={type} className="text-purple-900">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-purple-900">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter additional details" className="border-purple-300 focus:border-purple-500" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="proof" className="text-purple-900">Proof (optional)</Label>
          <Input id="proof" name="proof" type="file" onChange={handleFileChange} className="cursor-pointer border-purple-300 focus:border-purple-500" />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/societies")} className="border-purple-300 text-purple-900 hover:bg-purple-50">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};