"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Download,
  Upload,
  Zap,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Settings,
  MoreHorizontal,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  FileText,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

export default function ProvisioningPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeSection, setActiveSection] = useState("lifecycle");

  const sidebarItems = [
    { id: "lifecycle", label: "Device Lifecycle", icon: Activity },
    { id: "firmware", label: "Firmware Catalog", icon: Package },
    { id: "templates", label: "Config Templates", icon: FileText },
    { id: "jobs", label: "Provisioning Jobs", icon: Calendar },
    // { id: "reports", label: "Reports", icon: BarChart3 },
    // { id: "settings", label: "Settings", icon: Settings },
  ];

  const deviceLifecycle = [
    {
      id: 1,
      device: "Router-05",
      type: "Router",
      model: "Cisco ISR 4331",
      status: "Provisioning",
      stage: "Configuration Upload",
      progress: 75,
      startTime: "2024-01-15 14:30:00",
      estimatedCompletion: "2024-01-15 15:00:00",
      assignedTo: "John Smith",
    },
    {
      id: 2,
      device: "Switch-15",
      type: "Switch",
      model: "Cisco Catalyst 9300",
      status: "Ready",
      stage: "Awaiting Deployment",
      progress: 100,
      startTime: "2024-01-15 13:00:00",
      estimatedCompletion: "2024-01-15 13:45:00",
      assignedTo: "Sarah Johnson",
    },
    {
      id: 3,
      device: "Firewall-03",
      type: "Firewall",
      model: "Fortinet FortiGate 100F",
      status: "Failed",
      stage: "Firmware Update",
      progress: 45,
      startTime: "2024-01-15 12:00:00",
      estimatedCompletion: "2024-01-15 12:30:00",
      assignedTo: "Mike Wilson",
    },
  ];

  const firmwareCatalog = [
    {
      id: 1,
      name: "Cisco IOS XE 17.3.04a",
      vendor: "Cisco",
      deviceTypes: ["Router", "Switch"],
      version: "17.3.04a",
      releaseDate: "2024-01-10",
      size: "512 MB",
      status: "Stable",
      compatibility: 95,
      downloads: 1247,
      description:
        "Latest stable release with security patches and performance improvements",
    },
    {
      id: 2,
      name: "FortiOS 7.4.2",
      vendor: "Fortinet",
      deviceTypes: ["Firewall"],
      version: "7.4.2",
      releaseDate: "2024-01-08",
      size: "256 MB",
      status: "Beta",
      compatibility: 87,
      downloads: 423,
      description:
        "Beta release with new security features and enhanced threat detection",
    },
    {
      id: 3,
      name: "Junos OS 22.4R3",
      vendor: "Juniper",
      deviceTypes: ["Router", "Switch"],
      version: "22.4R3",
      releaseDate: "2024-01-05",
      size: "384 MB",
      status: "Stable",
      compatibility: 92,
      downloads: 856,
      description: "Stable release with improved MPLS and BGP functionality",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready":
      case "Stable":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "Provisioning":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "Beta":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Ready: "bg-green-500/20 text-green-400 border-green-500/30",
      Stable: "bg-green-500/20 text-green-400 border-green-500/30",
      Provisioning: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Failed: "bg-red-500/20 text-red-400 border-red-500/30",
      Beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return (
      variants[status as keyof typeof variants] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Router":
        return <Wifi className="h-4 w-4" />;
      case "Switch":
        return <Cpu className="h-4 w-4" />;
      case "Firewall":
        return <HardDrive className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-full">
  {/* Sidebar removed: now handled by layout */}

      <div className="w-64 bg-card border-r border-border p-4 space-y-2">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Provisioning
        </h2>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Provisioning & Lifecycle
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage device provisioning, lifecycle, and firmware catalog
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Provisioning
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Start Device Provisioning
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Begin the provisioning process for a new device
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deviceName" className="text-foreground">
                      Device Name
                    </Label>
                    <Input
                      id="deviceName"
                      placeholder="Enter device name"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deviceType" className="text-foreground">
                      Device Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="router">Router</SelectItem>
                        <SelectItem value="switch">Switch</SelectItem>
                        <SelectItem value="firewall">Firewall</SelectItem>
                        <SelectItem value="access-point">
                          Access Point
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="template" className="text-foreground">
                      Configuration Template
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="standard">
                          Standard Configuration
                        </SelectItem>
                        <SelectItem value="secure">High Security</SelectItem>
                        <SelectItem value="performance">
                          Performance Optimized
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignee" className="text-foreground">
                      Assign To
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                      Start Provisioning
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:bg-accent bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Firmware
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Provisioning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-primary mt-1">3 in progress</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">94.2%</div>
              <p className="text-xs text-green-500 mt-1">+1.2% this month</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Firmware Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground mt-1">5 vendors</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24m</div>
              <p className="text-xs text-green-500 mt-1">-3m improvement</p>
            </CardContent>
          </Card>
        </div>

        {activeSection === "lifecycle" && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search devices, models, or assignees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-input border-border text-foreground"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-48 bg-input border-border text-foreground">
                      <SelectValue placeholder="Device Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Router">Routers</SelectItem>
                      <SelectItem value="Switch">Switches</SelectItem>
                      <SelectItem value="Firewall">Firewalls</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full sm:w-48 bg-input border-border text-foreground">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Provisioning">Provisioning</SelectItem>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Device Lifecycle Management
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Track device provisioning progress and lifecycle stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceLifecycle.map((device) => (
                    <div
                      key={device.id}
                      className="border border-border rounded-lg p-4 hover:bg-accent/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {device.device}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {device.model}
                            </p>
                          </div>
                          <Badge className={getStatusBadge(device.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(device.status)}
                              {device.status}
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Current Stage:
                          </span>
                          <div className="text-foreground">{device.stage}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Assigned To:
                          </span>
                          <div className="text-foreground">
                            {device.assignedTo}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Est. Completion:
                          </span>
                          <div className="text-foreground">
                            {device.estimatedCompletion}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-foreground">
                            {device.progress}%
                          </span>
                        </div>
                        <Progress value={device.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "firmware" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Firmware & Image Catalog
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage firmware images and software versions for network devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {firmwareCatalog.map((firmware) => (
                  <div
                    key={firmware.id}
                    className="border border-border rounded-lg p-4 hover:bg-accent/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">
                            {firmware.name}
                          </h3>
                          <Badge className={getStatusBadge(firmware.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(firmware.status)}
                              {firmware.status}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {firmware.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Vendor:
                            </span>
                            <div className="text-foreground">
                              {firmware.vendor}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Version:
                            </span>
                            <div className="text-foreground">
                              {firmware.version}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Release Date:
                            </span>
                            <div className="text-foreground">
                              {firmware.releaseDate}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Size:</span>
                            <div className="text-foreground">
                              {firmware.size}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Compatibility:
                            </span>
                            <div className="flex items-center gap-1">
                              <Progress
                                value={firmware.compatibility}
                                className="h-2 w-16"
                              />
                              <span className="text-foreground">
                                {firmware.compatibility}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                              {firmware.downloads} downloads
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {firmware.deviceTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="border-border text-muted-foreground"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                        >
                          <Zap className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "templates" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Configuration Templates
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage reusable configuration templates for device provisioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Configuration templates management coming soon</p>
                <p className="text-sm mt-2">
                  Create and manage reusable device configuration templates
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "jobs" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Provisioning Jobs
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage scheduled provisioning jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Provisioning jobs management coming soon</p>
                <p className="text-sm mt-2">
                  Schedule and track automated provisioning tasks
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "reports" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Provisioning Reports
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Analytics and reports for provisioning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Provisioning reports coming soon</p>
                <p className="text-sm mt-2">
                  Detailed analytics and performance metrics
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "settings" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Provisioning Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure provisioning system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Provisioning settings coming soon</p>
                <p className="text-sm mt-2">
                  Configure system defaults and automation rules
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
