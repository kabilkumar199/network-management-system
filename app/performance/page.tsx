"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Activity, Network, HardDrive, Zap, TrendingUp, TrendingDown } from "lucide-react"

// Mock performance data
const networkTrafficData = [
  { time: "00:00", inbound: 45, outbound: 32, total: 77 },
  { time: "04:00", inbound: 52, outbound: 38, total: 90 },
  { time: "08:00", inbound: 78, outbound: 65, total: 143 },
  { time: "12:00", inbound: 85, outbound: 72, total: 157 },
  { time: "16:00", inbound: 92, outbound: 78, total: 170 },
  { time: "20:00", inbound: 68, outbound: 55, total: 123 },
  { time: "24:00", inbound: 45, outbound: 32, total: 77 },
]

const devicePerformanceData = [
  { device: "Core-Router-01", cpu: 34, memory: 67, bandwidth: 45 },
  { device: "Switch-Floor-03", cpu: 28, memory: 52, bandwidth: 38 },
  { device: "AP-Office-12", cpu: 15, memory: 34, bandwidth: 22 },
  { device: "Firewall-DMZ", cpu: 42, memory: 78, bandwidth: 56 },
  { device: "Switch-Backup", cpu: 8, memory: 25, bandwidth: 12 },
]

const bandwidthUtilizationData = [
  { name: "Core Network", value: 65, color: "#3b82f6" },
  { name: "Access Layer", value: 45, color: "#10b981" },
  { name: "DMZ", value: 78, color: "#f59e0b" },
  { name: "Guest Network", value: 23, color: "#8b5cf6" },
]

const responseTimeData = [
  { time: "00:00", ping: 1.2, http: 45, dns: 8 },
  { time: "04:00", ping: 1.1, http: 42, dns: 7 },
  { time: "08:00", ping: 1.8, http: 68, dns: 12 },
  { time: "12:00", ping: 2.1, http: 78, dns: 15 },
  { time: "16:00", ping: 1.9, http: 72, dns: 13 },
  { time: "20:00", ping: 1.4, http: 52, dns: 9 },
  { time: "24:00", ping: 1.2, http: 45, dns: 8 },
]

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Performance Monitoring" subtitle="Real-time network performance metrics and analytics" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Network Utilization</p>
                      <p className="text-2xl font-bold">67%</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5% from yesterday
                      </div>
                    </div>
                    <Network className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold">1.4ms</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -0.2ms from yesterday
                      </div>
                    </div>
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Throughput</p>
                      <p className="text-2xl font-bold">2.4 Gbps</p>
                      <div className="flex items-center text-xs text-chart-2">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Peak: 3.2 Gbps
                      </div>
                    </div>
                    <Zap className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Packet Loss</p>
                      <p className="text-2xl font-bold">0.02%</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        Excellent quality
                      </div>
                    </div>
                    <HardDrive className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="cpu">CPU Usage</SelectItem>
                    <SelectItem value="memory">Memory Usage</SelectItem>
                    <SelectItem value="bandwidth">Bandwidth</SelectItem>
                    <SelectItem value="latency">Latency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">Export Report</Button>
            </div>

            {/* Performance Tabs */}
            <Tabs defaultValue="network" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="network">Network Traffic</TabsTrigger>
                <TabsTrigger value="devices">Device Performance</TabsTrigger>
                <TabsTrigger value="bandwidth">Bandwidth Analysis</TabsTrigger>
                <TabsTrigger value="latency">Response Times</TabsTrigger>
              </TabsList>

              {/* Network Traffic Tab */}
              <TabsContent value="network" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Network Traffic Overview</CardTitle>
                    <CardDescription>Inbound and outbound traffic patterns over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={networkTrafficData}>
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
                        <Area
                          type="monotone"
                          dataKey="inbound"
                          stackId="1"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="outbound"
                          stackId="1"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Device Performance Tab */}
              <TabsContent value="devices" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Device Performance Comparison</CardTitle>
                    <CardDescription>CPU, memory, and bandwidth utilization by device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={devicePerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="device" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="cpu" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="memory" fill="hsl(var(--chart-2))" />
                        <Bar dataKey="bandwidth" fill="hsl(var(--chart-3))" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1" />
                        <span className="text-sm text-muted-foreground">CPU Usage (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2" />
                        <span className="text-sm text-muted-foreground">Memory Usage (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-3" />
                        <span className="text-sm text-muted-foreground">Bandwidth Usage (%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bandwidth Analysis Tab */}
              <TabsContent value="bandwidth" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Bandwidth Utilization by Segment</CardTitle>
                      <CardDescription>Current bandwidth usage across network segments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={bandwidthUtilizationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {bandwidthUtilizationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {bandwidthUtilizationData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-muted-foreground">{item.name}</span>
                            <span className="text-sm font-medium ml-auto">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Top Bandwidth Consumers</CardTitle>
                      <CardDescription>Devices consuming the most bandwidth</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-chart-1" />
                            <span className="text-sm">Core-Router-01</span>
                          </div>
                          <span className="text-sm font-medium">1.2 Gbps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-chart-2" />
                            <span className="text-sm">Firewall-DMZ</span>
                          </div>
                          <span className="text-sm font-medium">850 Mbps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-chart-3" />
                            <span className="text-sm">Switch-Floor-03</span>
                          </div>
                          <span className="text-sm font-medium">420 Mbps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-chart-4" />
                            <span className="text-sm">AP-Office-12</span>
                          </div>
                          <span className="text-sm font-medium">180 Mbps</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Response Times Tab */}
              <TabsContent value="latency" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                    <CardDescription>Network latency and response time metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={responseTimeData}>
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
                        <Line type="monotone" dataKey="ping" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="http" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="dns" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1" />
                        <span className="text-sm text-muted-foreground">Ping (ms)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2" />
                        <span className="text-sm text-muted-foreground">HTTP (ms)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-3" />
                        <span className="text-sm text-muted-foreground">DNS (ms)</span>
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
