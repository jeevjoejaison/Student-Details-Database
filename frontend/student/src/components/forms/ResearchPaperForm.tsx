
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
import { submitForm } from "@/utils/formUtils";
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

  // Fetch studentId from localStorage
  const studentId = localStorage.getItem("userId");

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
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("paperType", paperType);
    formData.append("studentId", studentId || ""); // Add studentId from localStorage
  
    const data = paperType === "Journal" ? journalData : conferenceData;
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  
    try {
      const endpoint = paperType === "Journal" ? "journal-papers" : "conference-papers";
      // Assuming submitForm is imported from utils
      // If it's not implemented, you'll need to create this function
      const result = await submitForm(endpoint,formData)
  
      if (result.success) {
        toast({ title: "Success", description: result.message });
        navigate("/research-papers");
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error?.message || "Submission failed", 
        variant: "destructive" 
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
    setSearchQuery(item.journalName || item.conferenceName);
    setShowDropdown(false); // Hide dropdown when an item is selected
  };
  
  

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    setShowDropdown(true); // Show dropdown on search
  
    if (paperType === "Journal") {
      const response = await axios.get(`http://localhost:8080/journal-papers/search?query=${value}`);
      setSearchResults(response.data);
    } else {
      const response = await axios.get(`http://localhost:8080/conference-papers/search?query=${value}`);
      setSearchResults(response.data);
    }
  };
  
  

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Submit Research Paper</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField label="Type of Research Paper">
            <Select onValueChange={setPaperType} value={paperType}>
              <SelectTrigger className="w-full">
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
                <FormField label="Journal Name">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        name="journalName"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required
                        className="w-full pr-10" // Ensure space for search icon
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
                            {item.journalName || item.conferenceName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>
                <FormField label="Title">
                  <Input 
                    name="title" 
                    value={journalData.title} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Author">
                  <Input 
                    name="author" 
                    value={journalData.author} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Publisher">
                  <Input 
                    name="publisher" 
                    value={journalData.publisher} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="ISSN">
                  <Input 
                    name="issn" 
                    value={journalData.issn} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Impact Factor">
                  <Input 
                    name="impactFactor" 
                    value={journalData.impactFactor} 
                    onChange={handleNumberInput} 
                    type="text"
                    inputMode="decimal"
                    className="w-full"
                  />
                </FormField>

                <FormField label="Year">
                  <Select onValueChange={handleYearChange} value={journalData.year}>
                    <SelectTrigger className="w-full">
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
                  <Input 
                    name="volume" 
                    value={journalData.volume} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="numeric"
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Issue">
                  <Input 
                    name="issue" 
                    value={journalData.issue} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="numeric"
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Page Numbers">
                  <Input 
                    name="pageNumbers" 
                    value={journalData.pageNumbers} 
                    onChange={handleInputChange} 
                    className="w-full"
                    placeholder="e.g., 123-145"
                  />
                </FormField>

                <FormField label="DOI">
                  <Input 
                    name="doi" 
                    value={journalData.doi} 
                    onChange={handleInputChange} 
                    className="w-full"
                  />
                </FormField>

                <FormField label="URL">
                  <Input 
                    name="url" 
                    value={journalData.url} 
                    onChange={handleInputChange} 
                    className="w-full"
                    type="url"
                    placeholder="https://"
                  />
                </FormField>
              </div>

              <FormField label="Abstract">
                <Textarea 
                  name="abstractText" 
                  value={journalData.abstractText} 
                  onChange={handleInputChange} 
                  required 
                  className="min-h-[120px] w-full"
                />
              </FormField>

              <FormField label="Description">
                <Textarea 
                  name="description" 
                  value={journalData.description} 
                  onChange={handleInputChange} 
                  className="min-h-[120px] w-full"
                />
              </FormField>
            </>
          )}

          {paperType === "Conference" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Conference Name">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        name="conferenceName"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required
                        className="w-full pr-10"
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
                            {item.journalName || item.conferenceName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                <FormField label="Title">
                  <Input 
                    name="title" 
                    value={conferenceData.title} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Author">
                  <Input 
                    name="author" 
                    value={conferenceData.author} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Location">
                  <Input 
                    name="location" 
                    value={conferenceData.location} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Organizer">
                  <Input 
                    name="organizer" 
                    value={conferenceData.organizer} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full"
                  />
                </FormField>

                <FormField label="Acceptance Rate (%)">
                  <Input 
                    name="acceptanceRate" 
                    value={conferenceData.acceptanceRate} 
                    onChange={handleNumberInput}
                    type="text"
                    inputMode="decimal"
                    className="w-full"
                  />
                </FormField>

                <FormField label="Year">
                  <Select onValueChange={handleYearChange} value={conferenceData.year}>
                    <SelectTrigger className="w-full">
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </FormField>

                <FormField label="End Date">
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
                    className="w-full"
                  />
                </FormField>

                <FormField label="URL">
                  <Input 
                    name="url" 
                    value={conferenceData.url} 
                    onChange={handleInputChange} 
                    className="w-full"
                    type="url"
                    placeholder="https://"
                  />
                </FormField>
              </div>

              <FormField label="Abstract">
                <Textarea 
                  name="abstractText" 
                  value={conferenceData.abstractText} 
                  onChange={handleInputChange} 
                  required 
                  className="min-h-[120px] w-full"
                />
              </FormField>

              <FormField label="Description">
                <Textarea 
                  name="description" 
                  value={conferenceData.description} 
                  onChange={handleInputChange} 
                  className="min-h-[120px] w-full"
                />
              </FormField>
            </>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="px-6"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResearchPaperForm;
