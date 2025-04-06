
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { submitForm, validateRequiredFields } from "@/utils/formUtils";
import axios from "axios";

// Generate year options from 1950 to current year
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year.toString());
  }
  return years;
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="font-medium">{label}</Label>
    {children}
  </div>
);

const ResearchPaperForm = () => {
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paperType, setPaperType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [journalData, setJournalData] = useState({
    title: "", author: "", journalName: "", publisher: "", issn: "", impactFactor: "", year: "", 
    volume: "", issue: "", pageNumbers: "", doi: "", url: "", abstractText: "", description: ""
  });
  
  const [conferenceData, setConferenceData] = useState({
    title: "", author: "", conferenceName: "", location: "", organizer: "", acceptanceRate: "", 
    startDate: "", endDate: "", doi: "", url: "", abstractText: "", description: "", year: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    
    paperType === "Journal"
      ? setJournalData((prev) => ({ ...prev, [name]: value }))
      : setConferenceData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle number inputs to allow only valid numbers
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    paperType === "Journal"
      ? setJournalData((prev) => ({ ...prev, [name]: numericValue }))
      : setConferenceData((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleYearChange = (value: string) => {
    paperType === "Journal"
      ? setJournalData((prev) => ({ ...prev, year: value }))
      : setConferenceData((prev) => ({ ...prev, year: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("enetered")
    e.preventDefault();
    setIsSubmitting(true);
    console.log("1")
    const studentId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const rollNumber = localStorage.getItem("rollNumber");
    const type = "Research Paper";
  
    const formData = new FormData();
    formData.append("paperType", paperType);
    if (studentId) formData.append("studentId", studentId);
    if (name) formData.append("name", name);
    if (rollNumber) formData.append("rollNumber", rollNumber);
    formData.append("type", type);
  
    // Select the correct data object
    const data = paperType === "Journal"
      ? journalData
      : { 
          ...conferenceData, 
          startDate: startDate ? format(startDate, "yyyy-MM-dd") : "", 
          endDate: endDate ? format(endDate, "yyyy-MM-dd") : "" 
        };
  
    // Define required fields based on paper type
    const requiredFields = paperType === "Journal"
      ? ["title", "author", "journalName", "publisher", "issn", "year", "volume", "issue", "abstractText"]
      : ["title", "author", "conferenceName", "location", "organizer", "startDate", "endDate", "abstractText"];
  
    // Validate required fields
    const missingFields = requiredFields.filter(field => {
      const value = data[field];
      return value === undefined || value === null || (typeof value === "string" && !value.trim());
    });
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill out all required fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) return;
    // Append only non-null values to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });
    
    try {
      const endpoint = paperType === "Journal" ? "journal-papers" : "conference-papers";
      const result = await submitForm(endpoint, formData);
  
      if (result.success) {
        toast({ title: "Success", description: "Uploaded Successfully" });
        navigate("/research-papers");
      
        // Reset the form fields after successful submission
        if (paperType === "Journal") {
          setJournalData({
            title: "", author: "", journalName: "", publisher: "", issn: "", impactFactor: "", 
            year: "", volume: "", issue: "", pageNumbers: "", doi: "", url: "", 
            abstractText: "", description: ""
          });
          
        } else {
          setConferenceData({
            title: "", author: "", conferenceName: "", location: "", organizer: "", 
            acceptanceRate: "", startDate: "", endDate: "", doi: "", url: "", 
            abstractText: "", description: "", year: ""
          });
          setStartDate(undefined)
          setEndDate(undefined)
        }
      }
      else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Submission failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const handleSelectItem = (item: any) => {
    if (paperType === "Journal") {
      setJournalData(item);
    } else {
      setConferenceData(item);
      setStartDate(item.startDate);
      setEndDate(item.endDate);
    }
    setSearchQuery(item.title);
    setShowDropdown(false); // Hide dropdown when an item is selected
  };
  
  

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    setShowDropdown(true); // Show dropdown on search
  
    if (paperType === "Journal") {
      setJournalData((prev) => ({ ...prev, title: value })); // Correct spread syntax
      const response = await axios.get(`http://localhost:8080/journal-papers/search?query=${value}`);
      setSearchResults(response.data);
    } else {
      setConferenceData((prev) => ({ ...prev, title: value })); // Ensure conference name updates
      const response = await axios.get(`http://localhost:8080/conference-papers/search?query=${value}`);
      setSearchResults(response.data);
    }
  };
  
  

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Submit Research Paper</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <FormField label="Type of Research Paper">
            <Select onValueChange={setPaperType} value={paperType}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500" >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Journal">Journal Article</SelectItem>
                <SelectItem value="Conference">Conference Paper</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {paperType === "Journal" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Title">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required
                        className="border-purple-300 focus:border-purple-500" 
                        
                      />
                      <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {showDropdown && searchResults.length > 0 && (
                      <div ref={dropdownRef} className="absolute bg-white border border-gray-200 shadow-lg mt-1 w-full max-h-40 overflow-y-auto z-10">
                        {searchResults.map((item, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectItem(item)}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>
                <FormField label="Journal Name">
                <span className="text-red-500">*</span>
                  <Input 
                    name="journalName" 
                    value={journalData.journalName} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Author">
                <span className="text-red-500">*</span>
                  <Input 
                    name="author" 
                    value={journalData.author} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Publisher">
                <span className="text-red-500">*</span>
                  <Input 
                    name="publisher" 
                    value={journalData.publisher} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                  
                </FormField>

                <FormField label="ISSN">
                <span className="text-red-500">*</span>
                  <Input 
                    name="issn" 
                    value={journalData.issn} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Impact Factor">
                  <Input 
                    name="impactFactor" 
                    value={journalData.impactFactor} 
                    onChange={handleNumberInput} 
                    type="text"
                    inputMode="decimal"
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Year">
                <span className="text-red-500">*</span>
                  <Select onValueChange={handleYearChange} value={journalData.year} name="year">
                    <SelectTrigger className="border-purple-300 focus:border-purple-500" >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYearOptions().map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Volume">
                <span className="text-red-500">*</span>
                  <Input 
                    name="volume" 
                    value={journalData.volume} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="numeric"
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Issue">
                <span className="text-red-500">*</span>
                  <Input 
                    name="issue" 
                    value={journalData.issue} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="numeric"
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Page Numbers">
                  <Input 
                    name="pageNumbers" 
                    value={journalData.pageNumbers} 
                    onChange={handleInputChange} 
                    className="border-purple-300 focus:border-purple-500" 
                    placeholder="e.g., 123-145"
                  />
                </FormField>

                <FormField label="DOI">
                  <Input 
                    name="doi" 
                    value={journalData.doi} 
                    onChange={handleInputChange} 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="URL">
                  <Input 
                    name="url" 
                    value={journalData.url} 
                    onChange={handleInputChange} 
                    className="border-purple-300 focus:border-purple-500" 
                    type="url"
                    placeholder="https://"
                  />
                </FormField>
              </div>

              <FormField label="Abstract">
              <span className="text-red-500">*</span>
                <Textarea 
                  name="abstractText" 
                  value={journalData.abstractText} 
                  onChange={handleInputChange} 
                  required 
                  className="min-h-[120px] border-purple-300 focus:border-purple-500"
                />
              </FormField>

              <FormField label="Description">
                <Textarea 
                  name="description" 
                  value={journalData.description} 
                  onChange={handleInputChange} 
                  className="min-h-[120px] border-purple-300 focus:border-purple-500"
                />
              </FormField>
            </>
          )}

          {paperType === "Conference" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Title">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required
                        className="border-purple-300 focus:border-purple-500 pr-10"
                      />
                      <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400 " />
                    </div>
                    {showDropdown && searchResults.length > 0 && (
                      <div ref={dropdownRef} className="absolute bg-white border border-gray-200 shadow-lg mt-1 w-full max-h-40 overflow-y-auto z-10">
                        {searchResults.map((item, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectItem(item)}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                <FormField label="Conference Name">
                <span className="text-red-500">*</span>
                  <Input 
                    name="conferenceName" 
                    value={conferenceData.conferenceName} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Author">
                <span className="text-red-500">*</span>
                  <Input 
                    name="author" 
                    value={conferenceData.author} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Location">
                <span className="text-red-500">*</span>
                  <Input 
                    name="location" 
                    value={conferenceData.location} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Organizer">
                <span className="text-red-500">*</span>
                  <Input 
                    name="organizer" 
                    value={conferenceData.organizer} 
                    onChange={handleInputChange} 
                    required 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Acceptance Rate (%)">
                  <Input 
                    name="acceptanceRate" 
                    value={conferenceData.acceptanceRate} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="decimal"
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="Year">
                <span className="text-red-500">*</span>
                  <Select onValueChange={handleYearChange} value={conferenceData.year} name="year">
                    <SelectTrigger className="border-purple-300 focus:border-purple-500" >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYearOptions().map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <div></div>

                <FormField label="Start Date">
                <span className="text-red-500">*</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "border-purple-300 focus:border-purple-500  justify-start text-left font-normal",
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </FormField>

                <FormField label="End Date">
                <span className="text-red-500">*</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "border-purple-300 focus:border-purple-500 justify-start text-left font-normal",
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </FormField>

                <FormField label="DOI">
                  <Input 
                    name="doi" 
                    value={conferenceData.doi} 
                    onChange={handleInputChange} 
                    className="border-purple-300 focus:border-purple-500" 
                  />
                </FormField>

                <FormField label="URL">
                  <Input 
                    name="url" 
                    value={conferenceData.url} 
                    onChange={handleInputChange} 
                    className="border-purple-300 focus:border-purple-500" 
                    type="url"
                    placeholder="https://"
                  />
                </FormField>
              </div>

              <FormField label="Abstract">
              <span className="text-red-500">*</span>
                <Textarea 
                  name="abstractText" 
                  value={conferenceData.abstractText} 
                  onChange={handleInputChange} 
                  required 
                  className="min-h-[120px] border-purple-300 focus:border-purple-500"
                />
              </FormField>

              <FormField label="Description">
                <Textarea 
                  name="description" 
                  value={conferenceData.description} 
                  onChange={handleInputChange} 
                  className="min-h-[120px] border-purple-300 focus:border-purple-500"
                />
              </FormField>
            </>
          )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/")}
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
      </div>
        </form>
    </div>
  );
};

export default ResearchPaperForm;
