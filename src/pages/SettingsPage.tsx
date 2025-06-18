import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import ControlSidebar from '@/components/layout/ControlSidebar';
import GlassmorphicPanel from '@/components/GlassmorphicPanel';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming Avatar is a shadcn component

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { User, Palette, Bell, ShieldCheck, KeyRound, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from "sonner";

// Zod schema for Profile Form
const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters.").max(20, "Username must be at most 20 characters."),
  email: z.string().email("Invalid email address."),
  fullName: z.string().optional(),
  avatarUrl: z.string().url("Invalid URL for avatar.").optional().or(z.literal('')),
  bio: z.string().max(200, "Bio must be at most 200 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "CurrentUserName",
      email: "user@example.com",
      fullName: "User Full Name",
      avatarUrl: "https://github.com/shadcn.png", // Placeholder avatar
      bio: "Passionate stock trader and enthusiast.",
    },
    mode: "onChange",
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile data submitted:", data);
    toast.success("Profile Updated", { description: "Your profile information has been saved." });
  };
  
  // State for Preferences
  const [theme, setTheme] = useState("dark");
  const [defaultGraphType, setDefaultGraphType] = useState("trend-line");
  const [dataRefreshRate, setDataRefreshRate] = useState("5s");

  // State for Notifications
  const [emailPriceAlerts, setEmailPriceAlerts] = useState(true);
  const [pushMarketNews, setPushMarketNews] = useState(false);
  const [notificationSound, setNotificationSound] = useState(true);

  // State for Security (conceptual)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveAllSettings = () => {
    // In a real app, you'd gather all states and form data
    // For now, just call the profile form submit if it's valid
    profileForm.handleSubmit(onProfileSubmit)(); 
    // And log other states
    console.log("Preferences:", { theme, defaultGraphType, dataRefreshRate });
    console.log("Notifications:", { emailPriceAlerts, pushMarketNews, notificationSound });
    console.log("Security conceptual state:", { twoFactorEnabled });
    toast.info("All Settings Saved (Conceptual)", { description: "All your settings have been processed." });
  };
  
  const handlePasswordChange = () => {
    if (newPassword && newPassword === confirmNewPassword) {
        console.log("Password change requested for user.");
        toast.success("Password Change Initiated", { description: "If a user with this email exists, a password reset link will be sent (simulated)." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    } else {
        toast.error("Password Mismatch", { description: "New passwords do not match or are empty." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <MainHeader />
      <div className="flex flex-1 overflow-hidden pt-16"> {/* pt-16 for fixed MainHeader height */}
        <ControlSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Settings
                </h1>
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
                    onClick={handleSaveAllSettings}
                >
                    <Save className="mr-2 h-5 w-5" />
                    Save All Settings
                </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 md:gap-2 mb-6 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                <TabsTrigger value="profile" className="py-2 text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-300 data-[state=active]:shadow-md rounded-md transition-all">
                  <User className="mr-2 h-4 w-4 inline-block" />Profile
                </TabsTrigger>
                <TabsTrigger value="preferences" className="py-2 text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-300 data-[state=active]:shadow-md rounded-md transition-all">
                  <Palette className="mr-2 h-4 w-4 inline-block" />Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications" className="py-2 text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-300 data-[state=active]:shadow-md rounded-md transition-all">
                  <Bell className="mr-2 h-4 w-4 inline-block" />Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="py-2 text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-300 data-[state=active]:shadow-md rounded-md transition-all">
                  <ShieldCheck className="mr-2 h-4 w-4 inline-block" />Security
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <GlassmorphicPanel className="p-6 md:p-8">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl text-sky-300 flex items-center"><User className="mr-3 h-6 w-6" />Account Profile</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">Manage your personal information and how you appear on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                          <div className="flex items-center space-x-6 mb-8">
                            <Avatar className="h-24 w-24 border-2 border-cyan-500">
                              <AvatarImage src={profileForm.watch("avatarUrl")} alt={profileForm.watch("username")} />
                              <AvatarFallback className="bg-slate-700 text-cyan-300 text-3xl">
                                {profileForm.watch("username")?.substring(0,2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <FormField
                                control={profileForm.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                    <FormLabel className="text-slate-300">Avatar URL</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input placeholder="https://example.com/avatar.png" {...field} className="bg-slate-800 border-slate-700 pl-10 focus:ring-cyan-500 focus:border-cyan-500" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-300">Username</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your unique username" {...field} className="bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-300">Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="your@email.com" {...field} className="bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={profileForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300">Full Name (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} className="bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300">Bio (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Tell us a little about yourself" {...field} className="bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500 min-h-[100px]" />
                                </FormControl>
                                <FormDescription className="text-slate-500">Max 200 characters.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           {/* Hidden submit for the main save button */}
                           <button type="submit" className="hidden">Submit Profile</button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </GlassmorphicPanel>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <GlassmorphicPanel className="p-6 md:p-8">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl text-sky-300 flex items-center"><Palette className="mr-3 h-6 w-6" />Dashboard Preferences</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">Customize your dashboard appearance and behavior.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme-select" className="text-slate-300">Theme</Label>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger id="theme-select" className="w-full md:w-[280px] bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600 text-slate-200">
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graph-type-select" className="text-slate-300">Default Graph Type</Label>
                         <Select value={defaultGraphType} onValueChange={setDefaultGraphType}>
                          <SelectTrigger id="graph-type-select" className="w-full md:w-[280px] bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select graph type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600 text-slate-200">
                            <SelectItem value="trend-line">Trend Line</SelectItem>
                            <SelectItem value="candlestick">Candlestick</SelectItem>
                            <SelectItem value="3d-bar-chart">3D Bar Chart</SelectItem>
                            <SelectItem value="dynamic-heatmap">Dynamic Heatmap</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refresh-rate-select" className="text-slate-300">Data Refresh Rate</Label>
                        <Select value={dataRefreshRate} onValueChange={setDataRefreshRate}>
                          <SelectTrigger id="refresh-rate-select" className="w-full md:w-[280px] bg-slate-800 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select refresh rate" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600 text-slate-200">
                            <SelectItem value="real-time">Real-time (WS)</SelectItem>
                            <SelectItem value="5s">Every 5 Seconds</SelectItem>
                            <SelectItem value="15s">Every 15 Seconds</SelectItem>
                            <SelectItem value="manual">Manual Refresh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </GlassmorphicPanel>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <GlassmorphicPanel className="p-6 md:p-8">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl text-sky-300 flex items-center"><Bell className="mr-3 h-6 w-6" />Notification Settings</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">Manage how you receive alerts and updates.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/70">
                            <div>
                                <Label htmlFor="email-alerts" className="text-slate-200 font-medium">Email Notifications for Price Alerts</Label>
                                <p className="text-xs text-slate-400">Receive emails when your set price targets are hit.</p>
                            </div>
                            <Switch id="email-alerts" checked={emailPriceAlerts} onCheckedChange={setEmailPriceAlerts} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/70">
                            <div>
                                <Label htmlFor="push-news" className="text-slate-200 font-medium">Push Notifications for Market News</Label>
                                <p className="text-xs text-slate-400">Get real-time push notifications for breaking market news.</p>
                            </div>
                            <Switch id="push-news" checked={pushMarketNews} onCheckedChange={setPushMarketNews} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/70">
                           <div>
                                <Label htmlFor="notification-sound" className="text-slate-200 font-medium">Notification Sounds</Label>
                                <p className="text-xs text-slate-400">Enable sounds for incoming notifications.</p>
                            </div>
                            <Switch id="notification-sound" checked={notificationSound} onCheckedChange={setNotificationSound} />
                        </div>
                    </CardContent>
                  </Card>
                </GlassmorphicPanel>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <GlassmorphicPanel className="p-6 md:p-8">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl text-sky-300 flex items-center"><ShieldCheck className="mr-3 h-6 w-6" />Security Settings</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">Manage your account security, password, and API keys.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        {/* Change Password Section */}
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/70">
                            <h3 className="text-lg font-semibold text-slate-200 mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-slate-700/80 border-slate-600 focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                                <div>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-slate-700/80 border-slate-600 focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                                <div>
                                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                                    <Input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="bg-slate-700/80 border-slate-600 focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                                <Button onClick={handlePasswordChange} className="bg-purple-600 hover:bg-purple-700 text-white">Change Password</Button>
                            </div>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/70">
                            <div>
                                <Label htmlFor="2fa-switch" className="text-slate-200 font-medium">Two-Factor Authentication (2FA)</Label>
                                <p className="text-xs text-slate-400">Enhance your account security with 2FA.</p>
                            </div>
                            <Switch id="2fa-switch" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                        </div>
                        
                        {/* API Keys Section */}
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/70">
                            <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center"><KeyRound className="mr-2 h-5 w-5 text-yellow-400"/> API Key Management</h3>
                            <p className="text-sm text-slate-400 mb-4">Manage API keys for third-party integrations (if applicable).</p>
                            <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300">
                                Manage API Keys
                            </Button>
                             <p className="text-xs text-slate-500 mt-3">No API keys configured.</p>
                        </div>
                    </CardContent>
                  </Card>
                </GlassmorphicPanel>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MainFooter />
    </div>
  );
};

export default SettingsPage;