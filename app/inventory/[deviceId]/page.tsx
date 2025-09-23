"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  ArrowLeft,
  Server,
  Wifi,
  Router,
  Shield,
  Cpu,
  MemoryStick,
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle,
  Edit,
  RefreshCw,
} from "lucide-react"

// Mock device data
const mockDevice = {
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
  serialNumber: "FXS2048Q2T1",
  macAddress: "00:1B:44:11:3A:B7",
  vendor: "Cisco Systems",
  ports: 48,
  description: "Core router for primary data center connectivity",
  managementIP: "192.168.100.1",
  snmpCommunity: "public",
}

// Mock performance data
const performanceData = [
  { time: "00:00", cpu: 35, memory: 42, bandwidth: 28, temperature: 45 },
  { time: "04:00", cpu: 28, memory: 38, bandwidth: 32, temperature: 43 },
  { time: "08:00", cpu: 65, memory: 58, bandwidth: 45, temperature: 52 },
  { time: "12:00", cpu: 72, memory: 65, bandwidth: 52, temperature: 55 },
  { time: "16:00", cpu: 78, memory: 72, bandwidth: 58, temperature: 58 },
  { time: "20:00", cpu: 55, memory: 48, bandwidth: 42, temperature: 48 },
  { time: "24:00", cpu: 35, memory: 42, bandwidth: 28, temperature: 45 },
]

// Mock interface data
const interfaceData = [
  {
    name: "GigabitEthernet0/0/0",
    status: "up",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "2.4 GB",
    outOctets: "1.8 GB",
    inErrors: 0,
    outErrors: 0,
  },
  {
    name: "GigabitEthernet0/0/1",
    status: "up",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "1.2 GB",
    outOctets: "0.9 GB",
    inErrors: 0,
    outErrors: 0,
  },
  {
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },{
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },{
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },{
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },{
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },{
    name: "GigabitEthernet0/0/2",
    status: "down",
    speed: "1000 Mbps",
    duplex: "Full",
    mtu: 1500,
    inOctets: "0 B",
    outOctets: "0 B",
    inErrors: 0,
    outErrors: 0,
  },
]

// Mock configuration data
const configData = `
! Cisco IOS Configuration
version 17.3
service timestamps debug datetime msec
service timestamps log datetime msec
service password-encryption
!
hostname Core-Router-01
!
boot-start-marker
boot-end-marker
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
!
no aaa new-model
!
ip domain name company.local
ip name-server 8.8.8.8
ip name-server 8.8.4.4
!
interface GigabitEthernet0/0/0
 description WAN Connection
 ip address 203.0.113.1 255.255.255.252
 duplex auto
 speed auto
!
interface GigabitEthernet0/0/1
 description LAN Connection
 ip address 192.168.1.1 255.255.255.0
 duplex auto
 speed auto
!
router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 203.0.113.0 0.0.0.3 area 0
!
line con 0
line aux 0
line vty 0 4
 password 7 0822455D0A16
 login
!
end
`

export default function DeviceDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    const variants = {
      online: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      warning: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      offline: "bg-muted text-muted-foreground border-border",
      up: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      down: "bg-destructive/10 text-destructive border-destructive/20",
    }
    return variants[status as keyof typeof variants] || variants.offline
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Router":
        return <Router className="h-6 w-6" />
      case "Switch":
        return <Server className="h-6 w-6" />
      case "Access Point":
        return <Wifi className="h-6 w-6" />
      case "Firewall":
        return <Shield className="h-6 w-6" />
      default:
        return <Server className="h-6 w-6" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={mockDevice.name} subtitle={`${mockDevice.model} • ${mockDevice.ip} • ${mockDevice.location}`} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Back Button and Device Header */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inventory
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Device
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Device Summary Card */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-muted/50 rounded-lg">{getDeviceIcon(mockDevice.type)}</div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{mockDevice.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">Model: {mockDevice.model}</p>
                        <p className="text-muted-foreground">Serial: {mockDevice.serialNumber}</p>
                        <p className="text-muted-foreground">Vendor: {mockDevice.vendor}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusBadge(mockDevice.status)}>{mockDevice.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">Uptime: {mockDevice.uptime}</p>
                        <p className="text-muted-foreground">Last Seen: {mockDevice.lastSeen}</p>
                        <p className="text-muted-foreground">Firmware: {mockDevice.firmware}</p>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">IP Address: {mockDevice.ip}</p>
                        <p className="text-muted-foreground">MAC: {mockDevice.macAddress}</p>
                        <p className="text-muted-foreground">Location: {mockDevice.location}</p>
                        <p className="text-muted-foreground">Ports: {mockDevice.ports}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Information */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>System Information</CardTitle>
                      <CardDescription>Device specifications and hardware details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Device Type</p>
                          <p className="font-medium">{mockDevice.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Model</p>
                          <p className="font-medium">{mockDevice.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Serial Number</p>
                          <p className="font-medium font-mono text-sm">{mockDevice.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">MAC Address</p>
                          <p className="font-medium font-mono text-sm">{mockDevice.macAddress}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Firmware Version</p>
                          <p className="font-medium">{mockDevice.firmware}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Management IP</p>
                          <p className="font-medium font-mono text-sm">{mockDevice.managementIP}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Status */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Current Status</CardTitle>
                      <CardDescription>Real-time device health and performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-chart-1" />
                            <span>CPU Usage</span>
                          </div>
                          <span className="font-medium">34%</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <MemoryStick className="h-4 w-4 text-chart-2" />
                            <span>Memory Usage</span>
                          </div>
                          <span className="font-medium">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-chart-4" />
                            <span>Temperature</span>
                          </div>
                          <span className="font-medium">45°C</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-chart-3" />
                            <span>Power Usage</span>
                          </div>
                          <span className="font-medium">180W</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Events */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Latest device events and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-chart-1/10 rounded-full">
                          <CheckCircle className="h-3 w-3 text-chart-1" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Interface GigabitEthernet0/0/1 came up</p>
                          <p className="text-xs text-muted-foreground">2024-01-15 10:25:30</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-chart-4/10 rounded-full">
                          <AlertTriangle className="h-3 w-3 text-chart-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">High CPU utilization detected &gt; 80%</p>
                          <p className="text-xs text-muted-foreground">2024-01-15 09:45:12</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-chart-1/10 rounded-full">
                          <CheckCircle className="h-3 w-3 text-chart-1" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Configuration backup completed</p>
                          <p className="text-xs text-muted-foreground">2024-01-15 08:00:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Historical performance data over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="cpu" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                        <Line
                          type="monotone"
                          dataKey="memory"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="bandwidth"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="hsl(var(--chart-4))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1" />
                        <span className="text-sm text-muted-foreground">CPU (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2" />
                        <span className="text-sm text-muted-foreground">Memory (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-3" />
                        <span className="text-sm text-muted-foreground">Bandwidth (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-4" />
                        <span className="text-sm text-muted-foreground">Temperature (°C)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interfaces Tab */}
              <TabsContent value="interfaces" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Network Interfaces</CardTitle>
                    <CardDescription>Status and statistics for all network interfaces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Interface</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Speed</TableHead>
                            <TableHead>Duplex</TableHead>
                            <TableHead>MTU</TableHead>
                            <TableHead>In Octets</TableHead>
                            <TableHead>Out Octets</TableHead>
                            <TableHead>Errors</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {interfaceData.map((iface, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-mono text-sm">{iface.name}</TableCell>
                              <TableCell>
                                <Badge className={getStatusBadge(iface.status)}>{iface.status}</Badge>
                              </TableCell>
                              <TableCell>{iface.speed}</TableCell>
                              <TableCell>{iface.duplex}</TableCell>
                              <TableCell>{iface.mtu}</TableCell>
                              <TableCell>{iface.inOctets}</TableCell>
                              <TableCell>{iface.outOctets}</TableCell>
                              <TableCell>
                                {iface.inErrors + iface.outErrors === 0 ? (
                                  <span className="text-chart-1">None</span>
                                ) : (
                                  <span className="text-destructive">{iface.inErrors + iface.outErrors}</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Configuration Tab */}
              <TabsContent value="configuration" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Device Configuration</CardTitle>
                    <CardDescription>Current running configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">{configData}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Monitoring Tab */}
              <TabsContent value="monitoring" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>SNMP Monitoring</CardTitle>
                      <CardDescription>SNMP configuration and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">SNMP Version</p>
                          <p className="font-medium">v2c</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Community</p>
                          <p className="font-medium font-mono text-sm">{mockDevice.snmpCommunity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Port</p>
                          <p className="font-medium">161</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className={getStatusBadge("online")}>Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Monitoring Alerts</CardTitle>
                      <CardDescription>Active monitoring rules and thresholds</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">CPU Usage &gt; 80%</span>
                          <Badge className={getStatusBadge("online")}>Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Memory Usage &gt; 90%</span>
                          <Badge className={getStatusBadge("online")}>Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Interface Down</span>
                          <Badge className={getStatusBadge("online")}>Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Temperature &gt; 70°C</span>
                          <Badge className={getStatusBadge("online")}>Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Logs Tab */}
              <TabsContent value="logs" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>Recent system and application logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm space-y-1">
                      <div className="text-chart-1">
                        Jan 15 10:30:00 Core-Router-01 %LINK-3-UPDOWN: Interface GigabitEthernet0/0/1, changed state to
                        up
                      </div>
                      <div className="text-chart-4">
                        Jan 15 09:45:12 Core-Router-01 %SYS-4-CPU_HOG: Task is hogging the CPU, CPU usage: 78%
                      </div>
                      <div className="text-chart-1">
                        Jan 15 08:00:00 Core-Router-01 %SYS-5-CONFIG_I: Configured from console by admin
                      </div>
                      <div className="text-muted-foreground">
                        Jan 15 07:30:15 Core-Router-01 %OSPF-5-ADJCHG: Process 1, Nbr 192.168.1.2 on
                        GigabitEthernet0/0/1 from LOADING to FULL
                      </div>
                      <div className="text-muted-foreground">
                        Jan 15 06:15:30 Core-Router-01 %SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.100.10
                        started
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
