"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import backups from "@/lib/mockBackups.json";
export default function BackupsPage() {
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
      running: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      scheduled: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
    return variants[status as keyof typeof variants] || variants.scheduled;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          {/* Inventory-style summary info bars */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Total Backups */}
            <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
              <Database className="h-6 w-6 text-blue-500 mr-3" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xs text-blue-700 font-medium leading-tight truncate">
                  Total Backups
                </span>
                <span className="text-lg font-bold text-blue-900 leading-tight truncate">
                  {backups.length}
                </span>
              </div>
            </div>
            {/* Completed */}
            <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xs text-green-700 font-medium leading-tight truncate">
                  Completed
                </span>
                <span className="text-lg font-bold text-green-900 leading-tight truncate">
                  {backups.filter((b) => b.status === "completed").length}
                </span>
              </div>
            </div>
            {/* Failed */}
            <div className="flex items-center bg-red-50 border border-red-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
              <XCircle className="h-6 w-6 text-red-500 mr-3" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xs text-red-700 font-medium leading-tight truncate">
                  Failed
                </span>
                <span className="text-lg font-bold text-red-900 leading-tight truncate">
                  {backups.filter((b) => b.status === "failed").length}
                </span>
              </div>
            </div>
            {/* Running */}
            <div className="flex items-center bg-blue-100 border border-blue-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xs text-blue-700 font-medium leading-tight truncate">
                  Running
                </span>
                <span className="text-lg font-bold text-blue-900 leading-tight truncate">
                  {backups.filter((b) => b.status === "running").length}
                </span>
              </div>
            </div>
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
                    <DialogDescription>
                      Configure a new backup job for selected devices
                    </DialogDescription>
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
                          <SelectItem value="config">
                            Configuration Only
                          </SelectItem>
                          <SelectItem value="full">
                            Full System Backup
                          </SelectItem>
                          <SelectItem value="incremental">
                            Incremental Backup
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="devices">Target Devices</Label>
                      <Textarea
                        id="devices"
                        placeholder="Select devices or device groups"
                      />
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
              <CardDescription>
                Latest backup operations and their status
              </CardDescription>
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
                          <div className="text-sm text-muted-foreground">
                            {backup.deviceIp}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{backup.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(backup.status)}
                          <Badge className={getStatusBadge(backup.status)}>
                            {backup.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell className="text-sm">
                        {backup.created}
                      </TableCell>
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
  );
}
