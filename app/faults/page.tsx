"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/src/components/ui/data-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  AlertTriangle,
  AlertCircle,
  XCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Eye,
  MessageSquare,
  UserCheck,
  Filter,
} from "lucide-react"

// Mock fault data
const mockFaults = [
  {
    id: "FLT-001",
    severity: "critical",
    status: "open",
    device: "Core-Router-01",
    description: "Interface GigabitEthernet0/0/2 is down",
    timestamp: "2024-01-15 10:15:30",
    category: "Interface",
    assignee: "John Smith",
    duration: "2h 15m",
  },
  {
    id: "FLT-002",
    severity: "warning",
    status: "acknowledged",
    device: "Switch-Floor-03",
    description: "High CPU utilization detected (85%)",
    timestamp: "2024-01-15 09:45:12",
    category: "Performance",
    assignee: "Sarah Johnson",
    duration: "2h 45m",
  },
  {
    id: "FLT-003",
    severity: "minor",
    status: "resolved",
    device: "AP-Office-12",
    description: "SNMP timeout - device not responding",
    timestamp: "2024-01-15 08:30:45",
    category: "Connectivity",
    assignee: "Mike Wilson",
    duration: "45m",
  },
  {
    id: "FLT-004",
    severity: "major",
    status: "open",
    device: "Firewall-DMZ",
    description: "Memory usage above threshold (92%)",
    timestamp: "2024-01-15 07:22:18",
    category: "Performance",
    assignee: "Lisa Chen",
    duration: "5h 8m",
  },
  {
    id: "FLT-005",
    severity: "warning",
    status: "in-progress",
    device: "Switch-Backup",
    description: "Power supply redundancy lost",
    timestamp: "2024-01-14 16:45:00",
    category: "Hardware",
    assignee: "Tom Brown",
    duration: "17h 45m",
  },
]

const severityTypes = ["All Severities", "critical", "major", "minor", "warning"]
const statusTypes = ["All Status", "open", "acknowledged", "in-progress", "resolved"]
const categoryTypes = ["All Categories", "Interface", "Performance", "Connectivity", "Hardware", "Security"]

export default function FaultsPage() {
  const [faults, setFaults] = useState(mockFaults)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("All Severities")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")

  // Filter faults based on search and filters
  const filteredFaults = faults.filter((fault) => {
    const matchesSearch =
      fault.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fault.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fault.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "All Severities" || fault.severity === severityFilter
    const matchesStatus = statusFilter === "All Status" || fault.status === statusFilter
    const matchesCategory = categoryFilter === "All Categories" || fault.category === categoryFilter

    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory
  })

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      major: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      minor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    }
    return variants[severity as keyof typeof variants] || variants.minor
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "bg-destructive/10 text-destructive border-destructive/20",
      acknowledged: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      "in-progress": "bg-chart-2/10 text-chart-2 border-chart-2/20",
      resolved: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    }
    return variants[status as keyof typeof variants] || variants.open
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "major":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "minor":
        return <AlertTriangle className="h-4 w-4 text-chart-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const faultCounts = {
    total: faults.length,
    critical: faults.filter((f) => f.severity === "critical").length,
    major: faults.filter((f) => f.severity === "major").length,
    open: faults.filter((f) => f.status === "open").length,
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Fault Management" subtitle="Monitor and manage network faults and alerts" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Faults</p>
                      <p className="text-2xl font-bold">{faultCounts.total}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Critical</p>
                      <p className="text-2xl font-bold text-destructive">{faultCounts.critical}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Major</p>
                      <p className="text-2xl font-bold text-orange-500">{faultCounts.major}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Open</p>
                      <p className="text-2xl font-bold text-chart-4">{faultCounts.open}</p>
                    </div>
                    <Clock className="h-8 w-8 text-chart-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fault Management */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Faults</CardTitle>
                    <CardDescription>Monitor and manage network faults and alerts</CardDescription>
                  </div>
                  <Button size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search faults by device, description, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {severityTypes.map((severity) => (
                        <SelectItem key={severity} value={severity}>
                          {severity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusTypes.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryTypes.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <DataTable
                  columns={[
                    { header: "Fault ID", cell: (f: any) => <span className="font-mono text-sm">{f.id}</span> },
                    {
                      header: "Severity",
                      cell: (f: any) => (
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(f.severity)}
                          <Badge className={getSeverityBadge(f.severity)}>{f.severity}</Badge>
                        </div>
                      ),
                    },
                    { header: "Device", cell: (f: any) => <span className="font-medium">{f.device}</span> },
                    { header: "Description", cell: (f: any) => <span className="max-w-xs truncate block">{f.description}</span> },
                    { header: "Status", cell: (f: any) => <Badge className={getStatusBadge(f.status)}>{f.status}</Badge> },
                    { header: "Duration", cell: (f: any) => <span className="font-mono text-sm">{f.duration}</span> },
                    { header: "Assignee", cell: (f: any) => f.assignee },
                    {
                      header: "Actions",
                      cell: () => (
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Add Comment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assign to Me
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ),
                      className: "text-right",
                    },
                  ]}
                  data={filteredFaults}
                  emptyMessage="No faults found matching your criteria."
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
