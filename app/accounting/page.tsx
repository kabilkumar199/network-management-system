"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Search, Download, Calendar, TrendingUp, Users, Activity, HardDrive } from "lucide-react"

// Mock usage data
const bandwidthUsageData = [
  { date: "2024-01-01", usage: 2.4, cost: 120 },
  { date: "2024-01-02", usage: 2.8, cost: 140 },
  { date: "2024-01-03", usage: 3.2, cost: 160 },
  { date: "2024-01-04", usage: 2.9, cost: 145 },
  { date: "2024-01-05", usage: 3.5, cost: 175 },
  { date: "2024-01-06", usage: 3.1, cost: 155 },
  { date: "2024-01-07", usage: 2.7, cost: 135 },
]

const departmentUsageData = [
  { name: "Engineering", usage: 45, cost: 2250, color: "#3b82f6" },
  { name: "Sales", usage: 28, cost: 1400, color: "#10b981" },
  { name: "Marketing", usage: 15, cost: 750, color: "#f59e0b" },
  { name: "HR", usage: 8, cost: 400, color: "#8b5cf6" },
  { name: "Finance", usage: 4, cost: 200, color: "#ef4444" },
]

const userActivityData = [
  {
    user: "john.smith@company.com",
    department: "Engineering",
    sessions: 45,
    duration: "8h 32m",
    bandwidth: "2.4 GB",
    lastActive: "2024-01-15 10:30:00",
  },
  {
    user: "sarah.johnson@company.com",
    department: "Sales",
    sessions: 32,
    duration: "6h 15m",
    bandwidth: "1.8 GB",
    lastActive: "2024-01-15 10:25:00",
  },
  {
    user: "mike.wilson@company.com",
    department: "Marketing",
    sessions: 28,
    duration: "7h 45m",
    bandwidth: "1.2 GB",
    lastActive: "2024-01-15 10:20:00",
  },
  {
    user: "lisa.chen@company.com",
    department: "Engineering",
    sessions: 38,
    duration: "8h 10m",
    bandwidth: "3.1 GB",
    lastActive: "2024-01-15 10:15:00",
  },
]

export default function AccountingPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")

  const filteredUsers = userActivityData.filter((user) => {
    const matchesSearch = user.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "All Departments" || user.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Network Accounting" subtitle="Usage tracking, billing, and resource consumption analytics" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Usage</p>
                      <p className="text-2xl font-bold">21.6 TB</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% this month
                      </div>
                    </div>
                    <HardDrive className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">247</p>
                      <div className="flex items-center text-xs text-chart-2">
                        <Users className="h-3 w-3 mr-1" />
                        89% of total users
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="text-2xl font-bold">1,847</p>
                      <div className="flex items-center text-xs text-chart-3">
                        <Activity className="h-3 w-3 mr-1" />
                        Avg: 7.5 per user
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
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="text-2xl font-bold">$8,450</p>
                      <div className="flex items-center text-xs text-chart-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        This month
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
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
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Accounting Tabs */}
            <Tabs defaultValue="usage" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
                <TabsTrigger value="departments">Department Breakdown</TabsTrigger>
                <TabsTrigger value="users">User Activity</TabsTrigger>
                <TabsTrigger value="billing">Billing & Costs</TabsTrigger>
              </TabsList>

              {/* Usage Analytics Tab */}
              <TabsContent value="usage" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Bandwidth Usage Trends</CardTitle>
                    <CardDescription>Daily bandwidth consumption and associated costs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={bandwidthUsageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="usage"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Department Breakdown Tab */}
              <TabsContent value="departments" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Usage by Department</CardTitle>
                      <CardDescription>Bandwidth consumption across departments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={departmentUsageData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="usage"
                          >
                            {departmentUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {departmentUsageData.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-muted-foreground">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">{item.usage}%</span>
                              <span className="text-xs text-muted-foreground ml-2">${item.cost}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Department Costs</CardTitle>
                      <CardDescription>Monthly cost breakdown by department</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={departmentUsageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="cost" fill="hsl(var(--chart-1))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* User Activity Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>User Activity Report</CardTitle>
                        <CardDescription>Individual user network usage and session data</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users by email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Departments">All Departments</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-md border border-border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Sessions</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Bandwidth</TableHead>
                            <TableHead>Last Active</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{user.user}</TableCell>
                              <TableCell>{user.department}</TableCell>
                              <TableCell>{user.sessions}</TableCell>
                              <TableCell className="font-mono text-sm">{user.duration}</TableCell>
                              <TableCell className="font-mono text-sm">{user.bandwidth}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing & Costs Tab */}
              <TabsContent value="billing" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Cost Analysis</CardTitle>
                      <CardDescription>Daily cost trends and projections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bandwidthUsageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="cost"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Billing Summary</CardTitle>
                      <CardDescription>Current month billing information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Base Service Fee</span>
                        <span className="font-medium">$2,500.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bandwidth Usage</span>
                        <span className="font-medium">$4,850.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Additional Services</span>
                        <span className="font-medium">$1,100.00</span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Total (Current Month)</span>
                          <span className="text-lg font-bold">$8,450.00</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Projected monthly total: $9,200.00</p>
                        <p>Based on current usage trends</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
