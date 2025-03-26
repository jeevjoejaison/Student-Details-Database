
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Grip } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Option form schema
const optionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
});

type OptionFormValues = z.infer<typeof optionFormSchema>;

export default function AdminDropdowns() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("event-types");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form handling
  const form = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  // Mock dropdown data
  const dropdownCategories = [
    {
      id: "event-types",
      name: "Event Types",
      description: "Types of events that students can add",
      options: [
        { id: "1", name: "Cultural Event", value: "cultural" },
        { id: "2", name: "Technical Event", value: "technical" },
        { id: "3", name: "Sports Event", value: "sports" },
        { id: "4", name: "Society/Club Membership", value: "club" },
        { id: "5", name: "Internship", value: "internship" },
        { id: "6", name: "Placement", value: "placement" },
        { id: "7", name: "Research Paper", value: "research" },
      ],
    },
    {
      id: "departments",
      name: "Departments",
      description: "Academic departments in the institution",
      options: [
        { id: "1", name: "Computer Science", value: "cs" },
        { id: "2", name: "Electronics", value: "ec" },
        { id: "3", name: "Electrical", value: "ee" },
        { id: "4", name: "Mechanical", value: "me" },
        { id: "5", name: "Civil", value: "ce" },
      ],
    },
    {
      id: "categories",
      name: "Event Categories",
      description: "Categories for different types of events",
      options: [
        { id: "1", name: "Music", value: "music" },
        { id: "2", name: "Dance", value: "dance" },
        { id: "3", name: "Coding", value: "coding" },
        { id: "4", name: "Robotics", value: "robotics" },
        { id: "5", name: "Cricket", value: "cricket" },
        { id: "6", name: "Football", value: "football" },
      ],
    },
    {
      id: "roles",
      name: "User Roles",
      description: "Roles assigned to users in the system",
      options: [
        { id: "1", name: "Student", value: "student" },
        { id: "2", name: "Faculty", value: "faculty" },
        { id: "3", name: "Administrator", value: "admin" },
      ],
    },
  ];

  // Get active dropdown category
  const activeCategoryData = dropdownCategories.find(
    (category) => category.id === activeTab
  );

  // Handle add option
  const handleAddOption = () => {
    setIsEditing(false);
    form.reset({
      name: "",
      value: "",
    });
    setIsAddDialogOpen(true);
  };

  // Handle edit option
  const handleEditOption = (option: any) => {
    setIsEditing(true);
    setSelectedItem(option);
    form.reset({
      name: option.name,
      value: option.value,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (option: any) => {
    setSelectedItem(option);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: OptionFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const actionText = isEditing ? "updated" : "added";
      toast({
        title: `Option ${actionText}`,
        description: `"${data.name}" has been ${actionText} successfully`,
      });
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
    }, 1000);
  };

  // Handle delete option
  const handleDeleteOption = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Option deleted",
        description: `"${selectedItem.name}" has been deleted successfully`,
      });
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }, 1000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Dropdown Customization</h1>
          <p className="text-muted-foreground mt-1">
            Manage dropdown options used throughout the application
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <motion.div variants={item}>
            <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-4">
              {dropdownCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {dropdownCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div variants={item} className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <Button onClick={handleAddOption} className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Option</span>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <CustomCard>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Display Name</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.options.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell>
                            <Grip className="h-4 w-4 text-muted-foreground" />
                          </TableCell>
                          <TableCell className="font-medium">
                            {option.name}
                          </TableCell>
                          <TableCell>
                            <code className="rounded bg-muted px-1 py-0.5 text-sm">
                              {option.value}
                            </code>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditOption(option)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(option)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CustomCard>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Add/Edit Option Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Option" : "Add New Option"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? `Update option in ${activeCategoryData?.name}`
                : `Add a new option to ${activeCategoryData?.name}`}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter display name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter value (used in code)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Save Changes"
                    : "Add Option"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Option</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this option? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <p>
                <span className="font-medium">Name:</span> {selectedItem.name}
              </p>
              <p>
                <span className="font-medium">Value:</span>{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-sm">
                  {selectedItem.value}
                </code>
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteOption}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete Option"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
