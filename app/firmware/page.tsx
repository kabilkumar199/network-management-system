"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Download, Upload, CheckCircle, AlertTriangle, Clock, Star, FileText } from "lucide-react"

export default function FirmwarePage() {
  const [selectedFirmware, setSelectedFirmware] = useState<string | null>(null)

  const firmwareImages = [
    {
      id: "fw-001",
      name: "Cisco IOS XE 17.3.04a",
      version: "17.3.04a",
      vendor: "Cisco",
      deviceType: "Router",
      size: "847 MB",
      releaseDate: "2024-01-10",
      compatibility: ["ISR4000", "ASR1000", "CSR1000V"],
      status: "stable",
      downloads: 1247,
      rating: 4.8,
      description: "Latest stable release with security enhancements",
    },
    {
      id: "fw-002",
      name: "Juniper Junos 22.4R3",
      version: "22.4R3",
      vendor: "Juniper",
      deviceType: "Switch",
      size: "623 MB",
      releaseDate: "2024-01-08",
      compatibility: ["EX4300", "EX4600", "QFX5100"],
      status: "stable",
      downloads: 892,
      rating: 4.6,
      description: "Enhanced Layer 2/3 switching capabilities",
    },
    {
      id: "fw-003",
      name: "Aruba ArubaOS 8.11.2.1",
      version: "8.11.2.1",
      vendor: "Aruba",
      deviceType: "Wireless",
      size: "234 MB",
      releaseDate: "2024-01-12",
      compatibility: ["7000", "7200", "7200XM"],
      status: "beta",
      downloads: 156,
      rating: 4.2,
      description: "Beta release with WiFi 6E support",
    },
    {
      id: "fw-004",
      name: "Fortinet FortiOS 7.4.2",
      version: "7.4.2",
      vendor: "Fortinet",
      deviceType: "Firewall",
      size: "445 MB",
      releaseDate: "2024-01-05",
      compatibility: ["FortiGate-100F", "FortiGate-200F", "FortiGate-400F"],
      status: "stable",
      downloads: 2341,
      rating: 4.9,
      description: "Critical security updates and performance improvements",
    },
  ]

  const deployments = [
    {
      id: "deploy-001",
      device: "Core-Router-01",
      deviceIp: "192.168.1.1",
      firmware: "Cisco IOS XE 17.3.04a",
      status: "completed",
      progress: 100,
      startTime: "2024-01-15 10:30:00",
      duration: "12m 45s",
    },
    {
      id: "deploy-002",
      device: "Distribution-SW-02",
      deviceIp: "192.168.1.12",
      firmware: "Juniper Junos 22.4R3",
      status: "in-progress",
      progress: 67,
      startTime: "2024-01-15 11:15:00",
      duration: "8m 23s",
    },
    {
      id: "deploy-003",
      device: "Access-SW-08",
      deviceIp: "192.168.1.28",
      firmware: "Cisco IOS XE 17.3.04a",
      status: "failed",
      progress: 45,
      startTime: "2024-01-15 09:45:00",
      duration: "5m 12s",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      stable: "bg-green-500/10 text-green-500 border-green-500/20",
      beta: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      deprecated: "bg-red-500/10 text-red-500 border-red-500/20",
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return variants[status as keyof typeof variants] || variants.stable
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Firmware Management" subtitle="Manage device firmware images and deployments" />

        <div className="flex-1 p-6 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Images</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Deployments</p>
                    <p className="text-2xl font-bold text-blue-500">3</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold text-green-500">94.7%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                    <p className="text-2xl font-bold">12.4 GB</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Firmware Catalog */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Firmware Catalog</CardTitle>
                      <CardDescription>Available firmware images and versions</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Firmware Image</DialogTitle>
                          <DialogDescription>Upload a new firmware image to the catalog</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="firmware-file">Firmware File</Label>
                            <Input id="firmware-file" type="file" accept=".bin,.img,.tar" />
                          </div>
                          <div>
                            <Label htmlFor="firmware-name">Image Name</Label>
                            <Input id="firmware-name" placeholder="Enter firmware name" />
                          </div>
                          <div>
                            <Label htmlFor="firmware-version">Version</Label>
                            <Input id="firmware-version" placeholder="e.g., 17.3.04a" />
                          </div>
                          <div>
                            <Label htmlFor="firmware-vendor">Vendor</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vendor" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cisco">Cisco</SelectItem>
                                <SelectItem value="juniper">Juniper</SelectItem>
                                <SelectItem value="aruba">Aruba</SelectItem>
                                <SelectItem value="fortinet">Fortinet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Upload</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input placeholder="Search firmware..." className="flex-1" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="stable">Stable</SelectItem>
                          <SelectItem value="beta">Beta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      {firmwareImages.map((firmware) => (
                        <div key={firmware.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{firmware.name}</h4>
                                <Badge className={getStatusBadge(firmware.status)}>{firmware.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{firmware.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{firmware.vendor}</span>
                                <span>{firmware.deviceType}</span>
                                <span>{firmware.size}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{firmware.rating}</span>
                                </div>
                                <span>{firmware.downloads} downloads</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm">Deploy</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Deployments */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Deployments</CardTitle>
                  <CardDescription>Current firmware deployment operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deployments.map((deployment) => (
                      <div key={deployment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{deployment.device}</h4>
                            <p className="text-sm text-muted-foreground">{deployment.deviceIp}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(deployment.status)}
                            <Badge className={getStatusBadge(deployment.status)}>{deployment.status}</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Firmware: {deployment.firmware}</span>
                            <span>{deployment.progress}%</span>
                          </div>
                          <Progress value={deployment.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Started: {deployment.startTime}</span>
                            <span>Duration: {deployment.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
