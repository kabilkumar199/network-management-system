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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
// Import device data from JSON
import deviceData from "@/lib/mockDevices.json";

const deviceTypes = [
  "All Types",
  "Router",
  "Switch",
  "Access Point",
  "Firewall",
  "Server",
];
const statusTypes = ["All Status", "online", "warning", "critical", "offline"];
const locations = [
  "All Locations",
  "Data Center A",
  "Data Center B",
  "Floor 3",
  "Office Wing",
  "DMZ",
];

export default function InventoryPage() {
  const [devices, setDevices] = useState(deviceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    model: "",
    ip: "",
    location: "",
  });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 10;

  // Filter devices based on search and filters
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "All Types" || device.type === typeFilter;
    const matchesStatus =
      statusFilter === "All Status" || device.status === statusFilter;
    const matchesLocation =
      locationFilter === "All Locations" || device.location === locationFilter;
    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * devicesPerPage,
    currentPage * devicesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Match summary color codes for status badges
  const getStatusBadge = (status: string) => {
    const variants = {
      online: "bg-green-50 text-green-700 border border-green-200",
      warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      offline: "bg-gray-50 text-gray-700 border border-gray-200",
    };
    return variants[status as keyof typeof variants] || variants.offline;
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Router":
        return <Router className="h-4 w-4" />;
      case "Switch":
        return <Server className="h-4 w-4" />;
      case "Access Point":
        return <Wifi className="h-4 w-4" />;
      case "Firewall":
        return <Shield className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const handleAddDevice = () => {
    const device = {
      id: `dev-${String(devices.length + 1).padStart(3, "0")}`,
      ...newDevice,
      status: "online",
      uptime: "0d 0h 0m",
      lastSeen: new Date().toISOString().slice(0, 19).replace("T", " "),
      firmware: "Unknown",
      ports: 24,
    };
    setDevices([...devices, device]);
    setNewDevice({ name: "", type: "", model: "", ip: "", location: "" });
    setIsAddDeviceOpen(false);
  };

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Compact Summary Info Bars */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
                <Server className="h-6 w-6 text-blue-500 mr-3" />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs text-blue-700 font-medium leading-tight truncate">
                    Total Devices
                  </span>
                  <span className="text-lg font-bold text-blue-900 leading-tight truncate">
                    {devices.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
                <div className="h-6 w-6 rounded-full bg-chart-1/10 flex items-center justify-center mr-3">
                  <div className="h-3 w-3 rounded-full bg-chart-1" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs text-green-700 font-medium leading-tight truncate">
                    Online
                  </span>
                  <span className="text-lg font-bold text-green-900 leading-tight truncate">
                    {devices.filter((d) => d.status === "online").length}
                  </span>
                </div>
              </div>
              <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
                <div className="h-6 w-6 rounded-full bg-chart-4/10 flex items-center justify-center mr-3">
                  <div className="h-3 w-3 rounded-full bg-chart-4" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs text-yellow-700 font-medium leading-tight truncate">
                    Warnings
                  </span>
                  <span className="text-lg font-bold text-yellow-900 leading-tight truncate">
                    {devices.filter((d) => d.status === "warning").length}
                  </span>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 h-14 flex-1 min-w-0">
                <div className="h-6 w-6 rounded-full bg-muted/10 flex items-center justify-center mr-3">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs text-gray-700 font-medium leading-tight truncate">
                    Offline
                  </span>
                  <span className="text-lg font-bold text-gray-900 leading-tight truncate">
                    {devices.filter((d) => d.status === "offline").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Device Management</CardTitle>
                    <CardDescription>
                      Search, filter, and manage network devices
                    </CardDescription>
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
                    <Dialog
                      open={isAddDeviceOpen}
                      onOpenChange={setIsAddDeviceOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Device
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Device</DialogTitle>
                          <DialogDescription>
                            Enter the details for the new network device.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={newDevice.name}
                              onChange={(e) =>
                                setNewDevice({
                                  ...newDevice,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={newDevice.type}
                              onValueChange={(value) =>
                                setNewDevice({ ...newDevice, type: value })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Router">Router</SelectItem>
                                <SelectItem value="Switch">Switch</SelectItem>
                                <SelectItem value="Access Point">
                                  Access Point
                                </SelectItem>
                                <SelectItem value="Firewall">
                                  Firewall
                                </SelectItem>
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
                              onChange={(e) =>
                                setNewDevice({
                                  ...newDevice,
                                  model: e.target.value,
                                })
                              }
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
                              onChange={(e) =>
                                setNewDevice({
                                  ...newDevice,
                                  ip: e.target.value,
                                })
                              }
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
                              onChange={(e) =>
                                setNewDevice({
                                  ...newDevice,
                                  location: e.target.value,
                                })
                              }
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
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
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
                      {paginatedDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted/50 rounded-lg">
                                {getDeviceIcon(device.type)}
                              </div>
                              <div>
                                <div className="font-medium">{device.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {device.model}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{device.type}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {device.ip}
                          </TableCell>
                          <TableCell>{device.location}</TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadge(device.status)}
                              style={{
                                textTransform: "capitalize",
                                fontWeight: 500,
                              }}
                            >
                              {device.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {device.uptime}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {device.lastSeen}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    (window.location.href = `/inventory/${device.id}`)
                                  }
                                >
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
                    <p className="text-muted-foreground">
                      No devices found matching your criteria.
                    </p>
                  </div>
                )}
                {/* Pagination Controls */}
                {filteredDevices.length > devicesPerPage && (
                  <div className="flex justify-center items-center gap-2 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
