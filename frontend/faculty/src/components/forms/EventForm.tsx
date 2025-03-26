
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define a base schema interface with optional fields
interface BaseFormValues {
  eventName?: string;
  location?: string;
  awards?: string;
  category?: string;
  description?: string;
  participationType?: string;
  name?: string;
  membershipType?: string;
  company?: string;
  role?: string;
  stipend?: string;
  core?: string;
  hiringMode?: string;
  ctc?: string;
  type?: string;
  title?: string;
  journalName?: string;
  volume?: string;
  issue?: string;
  pageNumbers?: string;
  publisher?: string;
  issn?: string;
  conferenceName?: string;
  conferenceLocation?: string;
  organizer?: string;
  proceedingsPublisher?: string;
  isbn?: string;
}

export default function EventForm() {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form schemas based on event type
  const culturalSchema = z.object({
    eventName: z.string().min(1, "Event name is required"),
    location: z.string().min(1, "Location is required"),
    awards: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
  });

  const technicalSchema = z.object({
    eventName: z.string().min(1, "Event name is required"),
    location: z.string().min(1, "Location is required"),
    awards: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
  });

  const sportsSchema = z.object({
    eventName: z.string().min(1, "Event name is required"),
    location: z.string().min(1, "Location is required"),
    participationType: z.string().min(1, "Participation type is required"),
    awards: z.string().optional(),
    description: z.string().optional(),
  });

  const clubSchema = z.object({
    category: z.string().min(1, "Category is required"),
    name: z.string().min(1, "Name is required"),
    membershipType: z.string().min(1, "Membership type is required"),
    description: z.string().optional(),
  });

  const internshipSchema = z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().min(1, "Location is required"),
    stipend: z.string().optional(),
    description: z.string().optional(),
  });

  const placementSchema = z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().min(1, "Location is required"),
    core: z.string().optional(),
    hiringMode: z.string().min(1, "Hiring mode is required"),
    ctc: z.string().optional(),
    description: z.string().optional(),
  });

  const researchSchema = z.object({
    type: z.string().min(1, "Research type is required"),
    title: z.string().min(1, "Title is required"),
    // For Journal
    journalName: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pageNumbers: z.string().optional(),
    publisher: z.string().optional(),
    issn: z.string().optional(),
    // For Conference
    conferenceName: z.string().optional(),
    conferenceDate: z.string().optional(),
    conferenceLocation: z.string().optional(),
    organizer: z.string().optional(),
    proceedingsPublisher: z.string().optional(),
    isbn: z.string().optional(),
    description: z.string().optional(),
  });

  // Determine which schema to use based on event type
  let schema;
  switch (eventType) {
    case "cultural":
      schema = culturalSchema;
      break;
    case "technical":
      schema = technicalSchema;
      break;
    case "sports":
      schema = sportsSchema;
      break;
    case "club":
      schema = clubSchema;
      break;
    case "internship":
      schema = internshipSchema;
      break;
    case "placement":
      schema = placementSchema;
      break;
    case "research":
      schema = researchSchema;
      break;
    default:
      schema = culturalSchema;
  }

  // Initialize form with the selected schema
  const form = useForm<BaseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // Get title based on event type
  const getTitle = () => {
    switch (eventType) {
      case "cultural":
        return "Add Cultural Event";
      case "technical":
        return "Add Technical Event";
      case "sports":
        return "Add Sports Event";
      case "club":
        return "Add Society/Club Membership";
      case "internship":
        return "Add Internship";
      case "placement":
        return "Add Placement";
      case "research":
        return "Add Research Paper";
      default:
        return "Add Event";
    }
  };

  // Mock data for dropdowns
  const awards = ["First Prize", "Second Prize", "Third Prize", "Participation"];
  const categories = {
    cultural: ["Music", "Dance", "Drama", "Art", "Photography", "Other"],
    technical: ["Coding", "Robotics", "Design", "Debate", "Quiz", "Other"],
    sports: ["Cricket", "Football", "Basketball", "Athletics", "Chess", "Other"],
    club: ["Technical", "Cultural", "Sports", "Social", "Academic", "Other"],
  };
  const participationTypes = ["Individual", "Team", "College Representation"];
  const membershipTypes = ["Member", "Executive", "President", "Vice President", "Secretary", "Treasurer"];
  const coreOptions = ["Yes", "No"];
  const hiringModes = ["On Campus", "Off Campus", "Pool Campus", "Referral", "Other"];
  const researchTypes = ["Journal Article", "Conference Paper"];

  // Handle form submission
  const onSubmit = (data: BaseFormValues) => {
    setIsSubmitting(true);
    
    // Add date to the data
    const submissionData = {
      ...data,
      date: date ? format(date, "yyyy-MM-dd") : "",
    };
    
    console.log("Form submitted:", submissionData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your submission has been sent for verification.",
      });
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{getTitle()}</h1>
        </motion.div>
        <p className="text-muted-foreground mt-1 ml-10">
          Fill in the details to add a new entry
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CustomCard>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {(eventType === "cultural" || eventType === "technical" || eventType === "sports") && (
                <>
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <FormLabel>Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
              
              {eventType === "sports" && (
                <FormField
                  control={form.control}
                  name="participationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participation Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select participation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {participationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {(eventType === "cultural" || eventType === "technical" || eventType === "sports") && (
                <FormField
                  control={form.control}
                  name="awards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Awards</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select award" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {awards.map((award) => (
                            <SelectItem key={award} value={award}>
                              {award}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {(eventType === "cultural" || eventType === "technical") && (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories[eventType as keyof typeof categories]?.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {eventType === "club" && (
                <>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.club.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Society/Club Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="membershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select membership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {membershipTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {(eventType === "internship" || eventType === "placement") && (
                <>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter role" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {eventType === "internship" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-3">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="stipend"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stipend</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter stipend amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {eventType === "placement" && (
                <>
                  <FormField
                    control={form.control}
                    name="hiringMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hiring Mode *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hiring mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hiringModes.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="core"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Core</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select core option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {coreOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <FormLabel>Joining Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="ctc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTC</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter CTC amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {eventType === "research" && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paper Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter paper title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select research type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {researchTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("type") === "Journal Article" && (
                    <>
                      <FormField
                        control={form.control}
                        name="journalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Journal Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter journal name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="volume"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Volume *</FormLabel>
                              <FormControl>
                                <Input placeholder="Volume" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="issue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Issue *</FormLabel>
                              <FormControl>
                                <Input placeholder="Issue" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pageNumbers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Numbers *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 123-145" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="publisher"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Publisher *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter publisher name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="issn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ISSN *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ISSN" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {form.watch("type") === "Conference Paper" && (
                    <>
                      <FormField
                        control={form.control}
                        name="conferenceName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conference Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter conference name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <FormLabel>Conference Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="conferenceLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conference Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter organizer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="proceedingsPublisher"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proceedings Publisher *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter publisher" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ISBN *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ISBN" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter additional details"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CustomCard>
      </motion.div>
    </PageContainer>
  );
}
