"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, Upload, Pause, Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ConfigurationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDevice, setSelectedDevice] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showDeviceSelector, setShowDeviceSelector] = useState(false)
  const [selectedDeviceConfig, setSelectedDeviceConfig] = useState<any>(null)
  const [deviceFilters, setDeviceFilters] = useState({
    type: "all",
    name: "",
    ip: "",
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const deviceIp = urlParams.get("deviceIp")
    const deviceName = urlParams.get("deviceName")
    const deviceType = urlParams.get("deviceType")

    if (deviceIp && deviceName && deviceType) {
      // Direct access with device info - show config immediately
      setSelectedDeviceConfig({
        ip: deviceIp,
        name: deviceName,
        type: deviceType,
      })
    } else if (window.location.pathname === "/config" && !deviceIp) {
      // Direct access without device info - show device selector popup
      setShowDeviceSelector(true)
    }
  }, [])

  // Mock device data for selector
  const availableDevices = [
    { id: "dev-001", name: "Core-Router-01", type: "Router", ip: "192.168.1.1" },
    { id: "dev-002", name: "Switch-Floor-03", type: "Switch", ip: "192.168.1.15" },
    { id: "dev-003", name: "AP-Office-12", type: "Access Point", ip: "192.168.2.45" },
    { id: "dev-004", name: "Firewall-DMZ", type: "Firewall", ip: "192.168.0.1" },
    { id: "dev-005", name: "Switch-Backup", type: "Switch", ip: "192.168.1.25" },
  ]

  // Filter devices based on filters
  const filteredDevicesForSelector = availableDevices.filter((device) => {
    const matchesType = deviceFilters.type === "all" || device.type === deviceFilters.type
    const matchesName = !deviceFilters.name || device.name.toLowerCase().includes(deviceFilters.name.toLowerCase())
    const matchesIp = !deviceFilters.ip || device.ip.includes(deviceFilters.ip)
    return matchesType && matchesName && matchesIp
  })

  const handleDeviceSelect = (device: any) => {
    setSelectedDeviceConfig(device)
    setShowDeviceSelector(false)
  }

  // Mock configuration data
  const deviceConfig = selectedDeviceConfig
    ? `
! Configuration for ${selectedDeviceConfig.name} (${selectedDeviceConfig.ip})
! Generated on ${new Date().toLocaleString()}
!
version 15.1
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
!
hostname ${selectedDeviceConfig.name}
!
boot-start-marker
boot-end-marker
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
!
no aaa new-model
ethernet lmi ce
!
ip source-route
ip cef
!
interface GigabitEthernet0/0
 ip address ${selectedDeviceConfig.ip} 255.255.255.0
 duplex auto
 speed auto
 media-type rj45
!
interface GigabitEthernet0/1
 no ip address
 shutdown
 duplex auto
 speed auto
 media-type rj45
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
control-plane
!
banner exec ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part,   *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by      *
* Cisco in writing.                                                      *
**************************************************************************^C
banner incoming ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part,   *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by      *
* Cisco in writing.                                                      *
**************************************************************************^C
banner login ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part,   *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by      *
* Cisco in writing.                                                      *
**************************************************************************^C
!
line con 0
line aux 0
line vty 0 4
 login
 transport input none
!
no scheduler allocate
!
end
`
    : ""

  // Mock data for configuration backups
  const configBackups = [
    {
      id: 1,
      device: "Router-01",
      deviceType: "Router",
      location: "Data Center A",
      lastBackup: "2024-01-15 14:30:00",
      status: "Success",
      size: "2.4 MB",
      version: "v1.2.3",
      changes: 3,
    },
    {
      id: 2,
      device: "Switch-Core-01",
      deviceType: "Switch",
      location: "Data Center A",
      lastBackup: "2024-01-15 14:25:00",
      status: "Success",
      size: "1.8 MB",
      version: "v2.1.0",
      changes: 0,
    },
    {
      id: 3,
      device: "Firewall-01",
      deviceType: "Firewall",
      location: "DMZ",
      lastBackup: "2024-01-15 14:20:00",
      status: "Failed",
      size: "0 MB",
      version: "v3.0.1",
      changes: 5,
    },
  ]

  // Mock data for scheduled jobs
  const scheduledJobs = [
    {
      id: 1,
      name: "Daily Config Backup",
      schedule: "Daily at 2:00 AM",
      devices: 45,
      lastRun: "2024-01-15 02:00:00",
      nextRun: "2024-01-16 02:00:00",
      status: "Active",
      success: 44,
      failed: 1,
    },
    {
      id: 2,
      name: "Weekly Full Backup",
      schedule: "Weekly on Sunday at 1:00 AM",
      devices: 45,
      lastRun: "2024-01-14 01:00:00",
      nextRun: "2024-01-21 01:00:00",
      status: "Active",
      success: 45,
      failed: 0,
    },
    {
      id: 3,
      name: "Critical Device Backup",
      schedule: "Every 4 hours",
      devices: 8,
      lastRun: "2024-01-15 12:00:00",
      nextRun: "2024-01-15 16:00:00",
      status: "Paused",
      success: 8,
      failed: 0,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "Paused":
        return <Pause className="h-4 w-4 text-yellow-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Success: "bg-green-500/20 text-green-400 border-green-500/30",
      Active: "bg-green-500/20 text-green-400 border-green-500/30",
      Failed: "bg-red-500/20 text-red-400 border-red-500/30",
      Paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    }
    return variants[status as keyof typeof variants] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const filteredBackups = configBackups.filter((backup) => {
    const matchesSearch =
      backup.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backup.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backup.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDevice = !selectedDevice || backup.deviceType === selectedDevice
    const matchesStatus = !selectedStatus || backup.status === selectedStatus
    return matchesSearch && matchesDevice && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Configuration Management"
          subtitle={
            selectedDeviceConfig
              ? `Device: ${selectedDeviceConfig.name} (${selectedDeviceConfig.ip})`
              : "Manage device configurations, backups, and scheduled jobs"
          }
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Device Selector Dialog */}
          <Dialog open={showDeviceSelector} onOpenChange={setShowDeviceSelector}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Select Device for Configuration</DialogTitle>
                <DialogDescription>Choose a device to view and manage its configuration</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filter-type">Device Type</Label>
                    <Select
                      value={deviceFilters.type}
                      onValueChange={(value) => setDeviceFilters({ ...deviceFilters, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Router">Router</SelectItem>
                        <SelectItem value="Switch">Switch</SelectItem>
                        <SelectItem value="Access Point">Access Point</SelectItem>
                        <SelectItem value="Firewall">Firewall</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filter-name">Device Name</Label>
                    <Input
                      id="filter-name"
                      placeholder="Filter by name"
                      value={deviceFilters.name}
                      onChange={(e) => setDeviceFilters({ ...deviceFilters, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="filter-ip">IP Address</Label>
                    <Input
                      id="filter-ip"
                      placeholder="Filter by IP"
                      value={deviceFilters.ip}
                      onChange={(e) => setDeviceFilters({ ...deviceFilters, ip: e.target.value })}
                    />
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto border rounded-lg">
                  {filteredDevicesForSelector.map((device) => (
                    <div
                      key={device.id}
                      className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onClick={() => handleDeviceSelect(device)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {device.type} - {device.ip}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {selectedDeviceConfig ? (
            // Show device configuration
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => setShowDeviceSelector(true)}>
                    Change Device
                  </Button>
                  <Badge variant="outline">{selectedDeviceConfig.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Config
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Config
                  </Button>
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Apply Changes
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Device Configuration</CardTitle>
                  <CardDescription>Current running configuration for {selectedDeviceConfig.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea value={deviceConfig} readOnly className="font-mono text-sm min-h-[500px] bg-muted" />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Show configuration management overview
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Backups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-green-500 mt-1">+23 today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">97.8%</div>
                    <p className="text-xs text-green-500 mt-1">+0.2% this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground mt-1">2 scheduled today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.4 GB</div>
                    <p className="text-xs text-yellow-500 mt-1">78% of quota</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Configuration Management</CardTitle>
                  <CardDescription>Select a device to view and manage its configuration</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Device Selected</h3>
                  <p className="text-muted-foreground mb-4">Choose a device to view its configuration</p>
                  <Button onClick={() => setShowDeviceSelector(true)}>Select Device</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
