"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
  Plus,
  MoreHorizontal,
  Server,
  Wifi,
  Router,
  Shield,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Settings,
} from "lucide-react"

// Mock device data
const mockDevices = [
  {
    id: "dev-001",
    name: "Core-Router-01",
    type: "Router",
    model: "Cisco ASR 9000",
    ip: "192.168.1.1",
    location: "Data Center A",
    status: "online",
    uptime: "127d 14h 32m",
    lastSeen: "2024-01-15 10:30:00",
    firmware: "17.3.04a",
    ports: 48,
  },
  {
    id: "dev-002",
    name: "Switch-Floor-03",
    type: "Switch",
    model: "Juniper EX4300",
    ip: "192.168.1.15",
    location: "Floor 3",
    status: "online",
    uptime: "89d 6h 15m",
    lastSeen: "2024-01-15 10:29:45",
    firmware: "18.4R3-S8",
    ports: 24,
  },
  {
    id: "dev-003",
    name: "AP-Office-12",
    type: "Access Point",
    model: "Aruba AP-515",
    ip: "192.168.2.45",
    location: "Office Wing",
    status: "warning",
    uptime: "45d 12h 8m",
    lastSeen: "2024-01-15 10:25:12",
    firmware: "8.10.0.5",
    ports: 2,
  },
  {
    id: "dev-004",
    name: "Firewall-DMZ",
    type: "Firewall",
    model: "Palo Alto PA-3220",
    ip: "192.168.0.1",
    location: "DMZ",
    status: "online",
    uptime: "156d 3h 45m",
    lastSeen: "2024-01-15 10:30:00",
    firmware: "10.2.4-h4",
    ports: 16,
  },
  {
    id: "dev-005",
    name: "Switch-Backup",
    type: "Switch",
    model: "Cisco Catalyst 9300",
    ip: "192.168.1.25",
    location: "Data Center B",
    status: "offline",
    uptime: "0d 0h 0m",
    lastSeen: "2024-01-14 15:22:30",
    firmware: "16.12.08",
    ports: 48,
  },
]

const deviceTypes = ["All Types", "Router", "Switch", "Access Point", "Firewall", "Server"]
const statusTypes = ["All Status", "online", "warning", "critical", "offline"]
const locations = ["All Locations", "Data Center A", "Data Center B", "Floor 3", "Office Wing", "DMZ"]

export default function InventoryPage() {
  const [devices, setDevices] = useState(mockDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    model: "",
    ip: "",
    location: "",
  })

  // Filter devices based on search and filters
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All Types" || device.type === typeFilter
    const matchesStatus = statusFilter === "All Status" || device.status === statusFilter
    const matchesLocation = locationFilter === "All Locations" || device.location === locationFilter

    return matchesSearch && matchesType && matchesStatus && matchesLocation
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      online: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      warning: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      offline: "bg-muted text-muted-foreground border-border",
    }
    return variants[status as keyof typeof variants] || variants.offline
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Router":
        return <Router className="h-4 w-4" />
      case "Switch":
        return <Server className="h-4 w-4" />
      case "Access Point":
        return <Wifi className="h-4 w-4" />
      case "Firewall":
        return <Shield className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  const handleAddDevice = () => {
    const device = {
      id: `dev-${String(devices.length + 1).padStart(3, "0")}`,
      ...newDevice,
      status: "online",
      uptime: "0d 0h 0m",
      lastSeen: new Date().toISOString().slice(0, 19).replace("T", " "),
      firmware: "Unknown",
      ports: 24,
    }
    setDevices([...devices, device])
    setNewDevice({ name: "", type: "", model: "", ip: "", location: "" })
    setIsAddDeviceOpen(false)
  }

  return (
    <div className="flex min-h-dvh bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Device Inventory" subtitle="Manage and monitor all network devices" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Devices</p>
                      <p className="text-2xl font-bold">{devices.length}</p>
                    </div>
                    <Server className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Online</p>
                      <p className="text-2xl font-bold text-chart-1">
                        {devices.filter((d) => d.status === "online").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-chart-1/10 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-chart-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                      <p className="text-2xl font-bold text-chart-4">
                        {devices.filter((d) => d.status === "warning").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-chart-4/10 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-chart-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Offline</p>
                      <p className="text-2xl font-bold text-muted-foreground">
                        {devices.filter((d) => d.status === "offline").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-muted/10 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Actions */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Device Management</CardTitle>
                    <CardDescription>Search, filter, and manage network devices</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Device
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Device</DialogTitle>
                          <DialogDescription>Enter the details for the new network device.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={newDevice.name}
                              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={newDevice.type}
                              onValueChange={(value) => setNewDevice({ ...newDevice, type: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Router">Router</SelectItem>
                                <SelectItem value="Switch">Switch</SelectItem>
                                <SelectItem value="Access Point">Access Point</SelectItem>
                                <SelectItem value="Firewall">Firewall</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">
                              Model
                            </Label>
                            <Input
                              id="model"
                              value={newDevice.model}
                              onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ip" className="text-right">
                              IP Address
                            </Label>
                            <Input
                              id="ip"
                              value={newDevice.ip}
                              onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <Input
                              id="location"
                              value={newDevice.location}
                              onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleAddDevice}>
                            Add Device
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search devices by name, IP, or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Device Table */}
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Uptime</TableHead>
                        <TableHead>Last Seen</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted/50 rounded-lg">{getDeviceIcon(device.type)}</div>
                              <div>
                                <div className="font-medium">{device.name}</div>
                                <div className="text-sm text-muted-foreground">{device.model}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{device.type}</TableCell>
                          <TableCell className="font-mono text-sm">{device.ip}</TableCell>
                          <TableCell>{device.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(device.status)}>{device.status}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{device.uptime}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{device.lastSeen}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => (window.location.href = `/inventory/${device.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Device
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    (window.location.href = `/config?deviceIp=${device.ip}&deviceName=${device.name}&deviceType=${device.type}`)
                                  }
                                >
                                  <Settings className="mr-2 h-4 w-4" />
                                  Configuration
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Device
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredDevices.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No devices found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
