
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Save,
  Mail,
  Bell,
  Shield,
  Database,
  RefreshCw,
  Globe,
  FileText,
  Laptop,
  Clock,
} from "lucide-react";

// General settings schema
const generalSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name is required"),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  logoUrl: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  academicYear: z.string().min(1, "Academic year is required"),
});

// Notification settings schema
const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  verificationEmails: z.boolean(),
  reminderEmails: z.boolean(),
  bulkEmails: z.boolean(),
  systemUpdates: z.boolean(),
});

// Security settings schema
const securitySettingsSchema = z.object({
  passwordMinLength: z.string().min(1, "Required"),
  sessionTimeout: z.string().min(1, "Required"),
  requireMfa: z.boolean(),
  ipRestriction: z.boolean(),
  maxLoginAttempts: z.string().min(1, "Required"),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;

export default function AdminSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General settings form
  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "Student Management System",
      siteDescription: "A comprehensive system for managing student activities and verifications",
      contactEmail: "admin@example.com",
      logoUrl: "/logo.png",
      timezone: "UTC+5:30",
      academicYear: "2023-2024",
    },
  });

  // Notification settings form
  const notificationForm = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      verificationEmails: true,
      reminderEmails: true,
      bulkEmails: false,
      systemUpdates: true,
    },
  });

  // Security settings form
  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordMinLength: "8",
      sessionTimeout: "60",
      requireMfa: false,
      ipRestriction: false,
      maxLoginAttempts: "5",
    },
  });

  // Handle general settings submission
  const onGeneralSubmit = (data: GeneralSettingsValues) => {
    setIsSubmitting(true);
    console.log("General settings:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "General settings have been updated successfully",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle notification settings submission
  const onNotificationSubmit = (data: NotificationSettingsValues) => {
    setIsSubmitting(true);
    console.log("Notification settings:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Notification settings have been updated successfully",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle security settings submission
  const onSecuritySubmit = (data: SecuritySettingsValues) => {
    setIsSubmitting(true);
    console.log("Security settings:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Security settings have been updated successfully",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Reset system data - purge cache
  const handlePurgeCache = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Cache Purged",
        description: "System cache has been cleared successfully",
      });
      setIsSubmitting(false);
    }, 2000);
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
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure application parameters and settings
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
            <TabsList className="mb-4 grid grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">System</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* General Settings */}
          <TabsContent value="general">
            <motion.div variants={item}>
              <CustomCard>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">General Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure basic application settings
                  </p>
                </div>
                
                <Form {...generalForm}>
                  <form
                    onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={generalForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="logoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Timezone *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                                <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
                                <SelectItem value="UTC-8">UTC-8 (San Francisco)</SelectItem>
                                <SelectItem value="UTC+1">UTC+1 (Paris)</SelectItem>
                                <SelectItem value="UTC+5:30">UTC+5:30 (New Delhi)</SelectItem>
                                <SelectItem value="UTC+8">UTC+8 (Singapore)</SelectItem>
                                <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="academicYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Academic Year *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select academic year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2022-2023">2022-2023</SelectItem>
                                <SelectItem value="2023-2024">2023-2024</SelectItem>
                                <SelectItem value="2024-2025">2024-2025</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="siteDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Site Description</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="gap-1"
                        disabled={isSubmitting}
                      >
                        <Save className="h-4 w-4" />
                        <span>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </CustomCard>
            </motion.div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <motion.div variants={item}>
              <CustomCard>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure email and notification preferences
                  </p>
                </div>
                
                <Form {...notificationForm}>
                  <form
                    onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center p-4 rounded-md bg-muted">
                        <Mail className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Email Notification Settings</h3>
                      </div>
                      
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Email Notifications</FormLabel>
                              <FormDescription>
                                Enable or disable all email notifications
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <Separator />
                      
                      <FormField
                        control={notificationForm.control}
                        name="verificationEmails"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Verification Emails</FormLabel>
                              <FormDescription>
                                Send emails when a verification is requested or processed
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch("emailNotifications")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="reminderEmails"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Reminder Emails</FormLabel>
                              <FormDescription>
                                Send reminder emails for pending actions
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch("emailNotifications")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="bulkEmails"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Bulk Emails</FormLabel>
                              <FormDescription>
                                Allow administrators to send bulk emails to users
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch("emailNotifications")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="systemUpdates"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>System Updates</FormLabel>
                              <FormDescription>
                                Send notifications about system updates and maintenance
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch("emailNotifications")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="gap-1"
                        disabled={isSubmitting}
                      >
                        <Save className="h-4 w-4" />
                        <span>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </CustomCard>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <motion.div variants={item}>
              <CustomCard>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure security and access control settings
                  </p>
                </div>
                
                <Form {...securityForm}>
                  <form
                    onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center p-4 rounded-md bg-muted">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Authentication Settings</h3>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={securityForm.control}
                          name="passwordMinLength"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Password Length *</FormLabel>
                              <FormControl>
                                <Input type="number" min="6" max="20" {...field} />
                              </FormControl>
                              <FormDescription>
                                Minimum characters required for passwords
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="maxLoginAttempts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Login Attempts *</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" max="10" {...field} />
                              </FormControl>
                              <FormDescription>
                                Maximum failed login attempts before lockout
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={securityForm.control}
                        name="requireMfa"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Require MFA</FormLabel>
                              <FormDescription>
                                Require multi-factor authentication for all users
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center p-4 rounded-md bg-muted mt-6">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Session Settings</h3>
                      </div>
                      
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes) *</FormLabel>
                            <FormControl>
                              <Input type="number" min="5" max="1440" {...field} />
                            </FormControl>
                            <FormDescription>
                              Time in minutes before an inactive session expires
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="ipRestriction"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>IP Restriction</FormLabel>
                              <FormDescription>
                                Restrict access based on IP addresses
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="gap-1"
                        disabled={isSubmitting}
                      >
                        <Save className="h-4 w-4" />
                        <span>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </CustomCard>
            </motion.div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <motion.div variants={item}>
              <CustomCard>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">System Maintenance</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage database and system operations
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 rounded-md bg-muted">
                      <Database className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Database Operations</h3>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center mb-2">
                          <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-medium">Purge Cache</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Clear system cache to refresh data and resolve performance issues.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handlePurgeCache}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Clear Cache"}
                        </Button>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center mb-2">
                          <FileText className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-medium">Download System Logs</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Download system logs for troubleshooting and auditing purposes.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          Download Logs
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 rounded-md bg-muted mt-6">
                      <Laptop className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">System Information</h3>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="grid gap-2">
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Version</span>
                          <span className="text-sm">1.0.5</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Last Updated</span>
                          <span className="text-sm">October 25, 2023</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Database Size</span>
                          <span className="text-sm">542 MB</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Total Users</span>
                          <span className="text-sm">543</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Total Submissions</span>
                          <span className="text-sm">2,156</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomCard>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageContainer>
  );
}
