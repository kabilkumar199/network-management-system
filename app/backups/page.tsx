"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Database,
  Download,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function BackupsPage() {
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null)

  const backups = [
    {
      id: "backup-001",
      device: "Core-Router-01",
      deviceIp: "192.168.1.1",
      type: "Configuration",
      status: "completed",
      size: "2.4 MB",
      created: "2024-01-15 14:30:00",
      duration: "45s",
      version: "v1.2.3",
    },
    {
      id: "backup-002",
      device: "Distribution-SW-01",
      deviceIp: "192.168.1.10",
      type: "Full System",
      status: "completed",
      size: "15.7 MB",
      created: "2024-01-15 14:25:00",
      duration: "2m 15s",
      version: "v2.1.0",
    },
    {
      id: "backup-003",
      device: "Access-SW-05",
      deviceIp: "192.168.1.25",
      type: "Configuration",
      status: "failed",
      size: "-",
      created: "2024-01-15 14:20:00",
      duration: "30s",
      version: "-",
    },
    {
      id: "backup-004",
      device: "WiFi-Controller-01",
      deviceIp: "192.168.1.50",
      type: "Configuration",
      status: "running",
      size: "-",
      created: "2024-01-15 14:35:00",
      duration: "1m 20s",
      version: "-",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
      running: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      scheduled: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    }
    return variants[status as keyof typeof variants] || variants.scheduled
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Configuration Backups" subtitle="Manage device configuration backups and restore points" />

        <div className="flex-1 p-6 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Backups</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Database className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold text-green-500">98.2%</p>
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
                    <p className="text-2xl font-bold">2.4 GB</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                    <p className="text-2xl font-bold">2m ago</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Input placeholder="Search backups..." className="w-64" />
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Backups</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    New Backup
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Backup</DialogTitle>
                    <DialogDescription>Configure a new backup job for selected devices</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="backup-name">Backup Name</Label>
                      <Input id="backup-name" placeholder="Enter backup name" />
                    </div>
                    <div>
                      <Label htmlFor="backup-type">Backup Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select backup type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="config">Configuration Only</SelectItem>
                          <SelectItem value="full">Full System Backup</SelectItem>
                          <SelectItem value="incremental">Incremental Backup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="devices">Target Devices</Label>
                      <Textarea id="devices" placeholder="Select devices or device groups" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Start Backup</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>

          {/* Backups Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Backups</CardTitle>
              <CardDescription>Latest backup operations and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{backup.device}</div>
                          <div className="text-sm text-muted-foreground">{backup.deviceIp}</div>
                        </div>
                      </TableCell>
                      <TableCell>{backup.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(backup.status)}
                          <Badge className={getStatusBadge(backup.status)}>{backup.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell className="text-sm">{backup.created}</TableCell>
                      <TableCell>{backup.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {backup.status === "completed" && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {backup.status === "running" && (
                            <Button variant="ghost" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {backup.status === "failed" && (
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
