// Utility to aggregate device type/NOS distribution from topologyNodes
const getTypeDistribution = (nodes: typeof topologyNodes) => {
  const typeMap: Record<string, { name: string; value: number; color: string }> = {};
  const typeColors = [
    '#1f77b4', // Router
    '#ff7f0e', // Switch
    '#2ca02c', // Firewall
    '#d62728', // Access Point
    '#9467bd', // Other
  ];
  let colorIdx = 0;
  nodes.forEach((node) => {
    const type = node.type.charAt(0).toUpperCase() + node.type.slice(1);
    if (!typeMap[type]) {
      typeMap[type] = {
        name: type,
        value: 0,
        color: typeColors[colorIdx % typeColors.length],
      };
      colorIdx++;
    }
    typeMap[type].value++;
  });
  return Object.values(typeMap);
};
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Server,
  Wifi,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Network,
  Database,
  Cpu,
  HardDrive,
  Eye,
} from "lucide-react";
import { useState } from "react";

// Mock data for charts
const networkTrafficData = [
  { time: "00:00", inbound: 45, outbound: 32 },
  { time: "04:00", inbound: 52, outbound: 38 },
  { time: "08:00", inbound: 78, outbound: 65 },
  { time: "12:00", inbound: 85, outbound: 72 },
  { time: "16:00", inbound: 92, outbound: 78 },
  { time: "20:00", inbound: 68, outbound: 55 },
  { time: "24:00", inbound: 45, outbound: 32 },
];

const deviceStatusData = [
  { name: "Online", value: 156, color: "#10b981" },
  { name: "Warning", value: 12, color: "#f59e0b" },
  { name: "Critical", value: 3, color: "#ef4444" },
  { name: "Offline", value: 8, color: "#6b7280" },
];

const performanceData = [
  { time: "00:00", cpu: 35, memory: 42, bandwidth: 28 },
  { time: "04:00", cpu: 28, memory: 38, bandwidth: 32 },
  { time: "08:00", cpu: 65, memory: 58, bandwidth: 45 },
  { time: "12:00", cpu: 72, memory: 65, bandwidth: 52 },
  { time: "16:00", cpu: 78, memory: 72, bandwidth: 58 },
  { time: "20:00", cpu: 55, memory: 48, bandwidth: 42 },
  { time: "24:00", cpu: 35, memory: 42, bandwidth: 28 },
];

const vendorStatsData = [
  {
    vendor: "Cisco",
    online: 89,
    warning: 5,
    critical: 1,
    offline: 3,
    total: 98,
    color: "#1f77b4",
  },
  {
    vendor: "Juniper",
    online: 34,
    warning: 3,
    critical: 1,
    offline: 2,
    total: 40,
    color: "#ff7f0e",
  },
  {
    vendor: "Exaware",
    online: 23,
    warning: 2,
    critical: 1,
    offline: 1,
    total: 27,
    color: "#2ca02c",
  },
  {
    vendor: "Palo Alto",
    online: 10,
    warning: 2,
    critical: 0,
    offline: 2,
    total: 14,
    color: "#d62728",
  },
];

const topologyNodes = [
  {
    id: 1,
    name: "Core-Router-01",
    vendor: "Cisco",
    type: "router",
    status: "online",
    x: 50,
    y: 30,
    model: "ASR 9000",
  },
  {
    id: 2,
    name: "Core-Switch-01",
    vendor: "Juniper",
    type: "switch",
    status: "online",
    x: 30,
    y: 60,
    model: "EX4650",
  },
  {
    id: 3,
    name: "Core-Switch-02",
    vendor: "Cisco",
    type: "switch",
    status: "warning",
    x: 70,
    y: 60,
    model: "Catalyst 9300",
  },
  {
    id: 4,
    name: "Edge-Router-01",
    vendor: "Exaware",
    type: "router",
    status: "online",
    x: 20,
    y: 80,
    model: "EXA-5000",
  },
  {
    id: 5,
    name: "Firewall-01",
    vendor: "Palo Alto",
    type: "firewall",
    status: "online",
    x: 80,
    y: 80,
    model: "PA-3220",
  },
  {
    id: 6,
    name: "Access-Switch-01",
    vendor: "Cisco",
    type: "switch",
    status: "critical",
    x: 10,
    y: 90,
    model: "Catalyst 2960",
  },
  {
    id: 7,
    name: "Access-Switch-02",
    vendor: "Juniper",
    type: "switch",
    status: "offline",
    x: 90,
    y: 90,
    model: "EX2300",
  },
];

const getVendorIcon = (vendor: string) => {
  const icons: { [key: string]: string } = {
    Cisco: "🔵",
    Juniper: "🟠",
    Exaware: "🟢",
    "Palo Alto": "🔴",
  };
  return icons[vendor] || "⚪";
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    online: "#10b981",
    warning: "#f59e0b",
    critical: "#ef4444",
    offline: "#6b7280",
  };
  return colors[status] || "#6b7280";
};

export default function DashboardPage() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleVendorDrillDown = (vendor: string) => {
    window.location.href = `/inventory?vendor=${vendor}`;
  };

  const handleNodeClick = (node: any) => {
    window.location.href = `/devices/${node.id}`;
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Network Dashboard"
          subtitle="Real-time network infrastructure monitoring and management"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Overview (like System Resources) */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>
                    Key network metrics at a glance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-chart-1" />
                        <span>Total Devices</span>
                      </div>
                      <span className="font-medium">179</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center text-xs text-muted-foreground pl-6">
                      <TrendingUp className="h-3 w-3 mr-1 text-chart-1" />
                      +2.5% from last month
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-chart-2" />
                        <span>Network Health</span>
                      </div>
                      <span className="font-medium text-chart-1">98.7%</span>
                    </div>
                    <Progress value={99} className="h-2" />
                    <div className="flex items-center text-xs text-muted-foreground pl-6">
                      <CheckCircle className="h-3 w-3 mr-1 text-chart-1" />
                      Excellent performance
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span>Active Alerts</span>
                      </div>
                      <span className="font-medium text-destructive">15</span>
                    </div>
                    <Progress value={15} className="h-2 bg-destructive/20" />
                    <div className="flex items-center text-xs text-muted-foreground pl-6">
                      <TrendingDown className="h-3 w-3 mr-1 text-chart-1" />
                      -12% from yesterday
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-chart-3" />
                        <span>Bandwidth Usage</span>
                      </div>
                      <span className="font-medium">2.4 Gbps</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center text-xs text-muted-foreground pl-6">
                      <TrendingUp className="h-3 w-3 mr-1 text-chart-2" />
                      Peak: 3.2 Gbps
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vendor Statistics */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Device Status by Vendor</CardTitle>
                  <CardDescription>
                    Device health aggregated by vendor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendorStatsData.map((vendor) => (
                      <div key={vendor.vendor} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getVendorIcon(vendor.vendor)}
                            </span>
                            <span className="font-medium">{vendor.vendor}</span>
                            <Badge variant="outline" className="text-xs">
                              {vendor.total} devices
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVendorDrillDown(vendor.vendor)}
                            className="h-6 px-2"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                        <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                          <div
                            className="bg-green-500"
                            style={{
                              width: `${(vendor.online / vendor.total) * 100}%`,
                            }}
                          />
                          <div
                            className="bg-yellow-500"
                            style={{
                              width: `${
                                (vendor.warning / vendor.total) * 100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${
                                (vendor.critical / vendor.total) * 100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-gray-500"
                            style={{
                              width: `${
                                (vendor.offline / vendor.total) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Online: {vendor.online}</span>
                          <span>Warning: {vendor.warning}</span>
                          <span>Critical: {vendor.critical}</span>
                          <span>Offline: {vendor.offline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>


              {/* Device Status & NOS Distribution Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Status Chart */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Device Status Distribution</CardTitle>
                    <CardDescription>
                      Current status of all network devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={deviceStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {deviceStatusData.map((entry, index) => (
                              <Cell key={`cell-status-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {deviceStatusData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.name}
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Device NOS/Type Distribution Chart */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Device NOS Distribution</CardTitle>
                    <CardDescription>
                      Distribution of device types (NOS)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={getTypeDistribution(topologyNodes)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {getTypeDistribution(topologyNodes).map((entry, index) => (
                              <Cell key={`cell-type-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {getTypeDistribution(topologyNodes).map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.name}
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest network events and changes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-destructive/10 rounded-full">
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        High CPU usage detected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        🔵 Cisco Router-Core-01 • 2 min ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-chart-1/10 rounded-full">
                      <CheckCircle className="h-3 w-3 text-chart-1" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        Backup completed successfully
                      </p>
                      <p className="text-xs text-muted-foreground">
                        🟠 Juniper Switch-Floor-03 • 15 min ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-chart-2/10 rounded-full">
                      <Network className="h-3 w-3 text-chart-2" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        New device discovered
                      </p>
                      <p className="text-xs text-muted-foreground">
                        🟢 Exaware AP-Office-12 • 1 hour ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-chart-4/10 rounded-full">
                      <HardDrive className="h-3 w-3 text-chart-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        Firmware update available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        🔴 Palo Alto devices • 2 hours ago
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common network management tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                  >
                    <Server className="h-5 w-5" />
                    <span className="text-sm">Add Device</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                  >
                    <Database className="h-5 w-5" />
                    <span className="text-sm">Backup Config</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                  >
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">Security Scan</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                  >
                    <Activity className="h-5 w-5" />
                    <span className="text-sm">Performance Test</span>
                  </Button>
                </CardContent>
              </Card>

              {/* System Resources */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>System Resources</CardTitle>
                  <CardDescription>
                    Current utilization of management server
                  </CardDescription>
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
                        <Database className="h-4 w-4 text-chart-2" />
                        <span>Memory Usage</span>
                      </div>
                      <span className="font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-chart-3" />
                        <span>Disk Usage</span>
                      </div>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        System Uptime
                      </span>
                      <span className="font-medium">127 days, 14:32:18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
