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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Shield, AlertTriangle, Lock, Eye, UserX, FileText, TrendingUp, TrendingDown } from "lucide-react"

// Mock security data
const securityEvents = [
  {
    id: "SEC-001",
    type: "Intrusion Attempt",
    severity: "high",
    source: "203.0.113.45",
    target: "192.168.1.100",
    timestamp: "2024-01-15 10:45:30",
    status: "blocked",
    description: "Multiple failed SSH login attempts",
  },
  {
    id: "SEC-002",
    type: "Malware Detection",
    severity: "critical",
    source: "192.168.2.15",
    target: "External",
    timestamp: "2024-01-15 09:22:15",
    status: "quarantined",
    description: "Trojan.Generic detected in network traffic",
  },
  {
    id: "SEC-003",
    type: "Policy Violation",
    severity: "medium",
    source: "192.168.1.45",
    target: "social-media.com",
    timestamp: "2024-01-15 08:15:42",
    status: "logged",
    description: "Access to blocked website category",
  },
  {
    id: "SEC-004",
    type: "Unauthorized Access",
    severity: "high",
    source: "192.168.3.22",
    target: "192.168.1.1",
    timestamp: "2024-01-15 07:33:18",
    status: "investigating",
    description: "Admin access from unauthorized location",
  },
]

const vulnerabilities = [
  {
    id: "CVE-2024-0001",
    device: "Core-Router-01",
    severity: "critical",
    score: 9.8,
    description: "Remote code execution vulnerability in web interface",
    status: "open",
    published: "2024-01-10",
  },
  {
    id: "CVE-2024-0002",
    device: "Switch-Floor-03",
    severity: "high",
    score: 7.5,
    description: "Authentication bypass in SNMP service",
    status: "patched",
    published: "2024-01-08",
  },
  {
    id: "CVE-2024-0003",
    device: "Firewall-DMZ",
    severity: "medium",
    score: 5.4,
    description: "Information disclosure in logging system",
    status: "mitigated",
    published: "2024-01-05",
  },
]

export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("All Severities")
  const [statusFilter, setStatusFilter] = useState("All Status")

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      medium: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      low: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    }
    return variants[severity as keyof typeof variants] || variants.medium
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      blocked: "bg-destructive/10 text-destructive border-destructive/20",
      quarantined: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      investigating: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      logged: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      open: "bg-destructive/10 text-destructive border-destructive/20",
      patched: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      mitigated: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    }
    return variants[status as keyof typeof variants] || variants.logged
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Security Monitoring" subtitle="Network security events, threats, and vulnerability management" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Security Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Security Score</p>
                      <p className="text-2xl font-bold text-chart-1">87%</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +3% this week
                      </div>
                    </div>
                    <Shield className="h-8 w-8 text-chart-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Threats Blocked</p>
                      <p className="text-2xl font-bold">1,247</p>
                      <div className="flex items-center text-xs text-chart-2">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -12% from yesterday
                      </div>
                    </div>
                    <UserX className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Vulnerabilities</p>
                      <p className="text-2xl font-bold text-destructive">3</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1" />1 critical
                      </div>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Compliance</p>
                      <p className="text-2xl font-bold text-chart-1">94%</p>
                      <div className="flex items-center text-xs text-chart-1">
                        <Lock className="h-3 w-3 mr-1" />
                        ISO 27001
                      </div>
                    </div>
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Tabs */}
            <Tabs defaultValue="events" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="events">Security Events</TabsTrigger>
                <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="policies">Security Policies</TabsTrigger>
              </TabsList>

              {/* Security Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Security Events</CardTitle>
                        <CardDescription>Real-time security events and threat detection</CardDescription>
                      </div>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Monitor
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search events by type, source, or description..."
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
                          <SelectItem value="All Severities">All Severities</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Status">All Status</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                          <SelectItem value="quarantined">Quarantined</SelectItem>
                          <SelectItem value="investigating">Investigating</SelectItem>
                          <SelectItem value="logged">Logged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-md border border-border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Timestamp</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {securityEvents.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell className="font-mono text-sm">{event.id}</TableCell>
                              <TableCell>{event.type}</TableCell>
                              <TableCell>
                                <Badge className={getSeverityBadge(event.severity)}>{event.severity}</Badge>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{event.source}</TableCell>
                              <TableCell className="font-mono text-sm">{event.target}</TableCell>
                              <TableCell>
                                <Badge className={getStatusBadge(event.status)}>{event.status}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{event.timestamp}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vulnerabilities Tab */}
              <TabsContent value="vulnerabilities" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Vulnerability Management</CardTitle>
                    <CardDescription>Known vulnerabilities and patch status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>CVE ID</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>CVSS Score</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vulnerabilities.map((vuln) => (
                            <TableRow key={vuln.id}>
                              <TableCell className="font-mono text-sm">{vuln.id}</TableCell>
                              <TableCell>{vuln.device}</TableCell>
                              <TableCell>
                                <Badge className={getSeverityBadge(vuln.severity)}>{vuln.severity}</Badge>
                              </TableCell>
                              <TableCell className="font-bold">{vuln.score}</TableCell>
                              <TableCell className="max-w-xs truncate">{vuln.description}</TableCell>
                              <TableCell>
                                <Badge className={getStatusBadge(vuln.status)}>{vuln.status}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{vuln.published}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Compliance Status</CardTitle>
                      <CardDescription>Current compliance with security standards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>ISO 27001</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>SOC 2 Type II</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>NIST Cybersecurity Framework</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>PCI DSS</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Security Controls</CardTitle>
                      <CardDescription>Implementation status of security controls</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Access Control</span>
                        <Badge className={getStatusBadge("patched")}>Implemented</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Encryption at Rest</span>
                        <Badge className={getStatusBadge("patched")}>Implemented</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Network Segmentation</span>
                        <Badge className={getStatusBadge("mitigated")}>Partial</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Incident Response</span>
                        <Badge className={getStatusBadge("patched")}>Implemented</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Vulnerability Management</span>
                        <Badge className={getStatusBadge("open")}>In Progress</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Security Policies Tab */}
              <TabsContent value="policies" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Security Policies</CardTitle>
                    <CardDescription>Active security policies and enforcement status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Password Policy</h4>
                          <p className="text-sm text-muted-foreground">
                            Minimum 12 characters, complexity requirements
                          </p>
                        </div>
                        <Badge className={getStatusBadge("patched")}>Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Network Access Control</h4>
                          <p className="text-sm text-muted-foreground">Role-based access with MFA requirement</p>
                        </div>
                        <Badge className={getStatusBadge("patched")}>Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Data Loss Prevention</h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor and prevent sensitive data exfiltration
                          </p>
                        </div>
                        <Badge className={getStatusBadge("mitigated")}>Partial</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Incident Response</h4>
                          <p className="text-sm text-muted-foreground">Automated response to security incidents</p>
                        </div>
                        <Badge className={getStatusBadge("patched")}>Active</Badge>
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
