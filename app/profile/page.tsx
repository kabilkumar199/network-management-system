"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Key, Activity } from "lucide-react";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    username: "admin",
    email: "admin@company.com",
    fullName: "System Administrator",
    phone: "+1 (555) 123-4567",
    location: "Data Center A",
    role: "Administrator",
    department: "IT Operations",
    bio: "Network infrastructure specialist with 10+ years of experience managing enterprise networks.",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    desktopNotifications: true,
    weeklyReports: true,
    maintenanceAlerts: true,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "admin";
    const role = localStorage.getItem("userRole") || "admin";
    setUserInfo((prev) => ({
      ...prev,
      username: storedUsername,
      role: role === "admin" ? "Administrator" : "Operator",
    }));
  }, []);

  const handleSaveProfile = () => {
    // Save profile logic here
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    // Change password logic here
    alert("Password change functionality would be implemented here");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{userInfo.fullName}</h2>
                    <p className="text-muted-foreground">
                      {userInfo.role} • {userInfo.department}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last login: Today at 9:30 AM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-500">
                      Account Verified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={userInfo.username}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={userInfo.fullName}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={userInfo.department}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              department: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={userInfo.bio}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, bio: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Key className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-muted-foreground">
                              Last changed 30 days ago
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Activity className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Active Sessions</h4>
                            <p className="text-sm text-muted-foreground">
                              Manage your active login sessions
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">View Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts via email
                          </p>
                        </div>
                        <Switch
                          checked={notifications.emailAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              emailAlerts: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive critical alerts via SMS
                          </p>
                        </div>
                        <Switch
                          checked={notifications.smsAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              smsAlerts: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Desktop Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications in browser
                          </p>
                        </div>
                        <Switch
                          checked={notifications.desktopNotifications}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              desktopNotifications: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly network summary reports
                          </p>
                        </div>
                        <Switch
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              weeklyReports: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about scheduled maintenance
                          </p>
                        </div>
                        <Switch
                          checked={notifications.maintenanceAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              maintenanceAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <Button>Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent actions and system interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Logged in",
                          time: "2 minutes ago",
                          details: "From 192.168.1.100",
                        },
                        {
                          action: "Viewed device details",
                          time: "15 minutes ago",
                          details: "Core-Router-01",
                        },
                        {
                          action: "Downloaded configuration",
                          time: "1 hour ago",
                          details: "Switch-Floor-03",
                        },
                        {
                          action: "Updated user profile",
                          time: "2 hours ago",
                          details: "Changed contact information",
                        },
                        {
                          action: "Created backup job",
                          time: "1 day ago",
                          details: "Daily Config Backup",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                        >
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.details}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
