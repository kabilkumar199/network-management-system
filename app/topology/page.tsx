"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, Router, Server, Wifi, Search, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react"

export default function TopologyPage() {
  const [viewMode, setViewMode] = useState("physical")
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  const devices = [
    { id: "core-01", name: "Core Router 01", type: "router", status: "online", x: 400, y: 100 },
    { id: "core-02", name: "Core Router 02", type: "router", status: "online", x: 600, y: 100 },
    { id: "dist-01", name: "Distribution Switch 01", type: "switch", status: "online", x: 300, y: 250 },
    { id: "dist-02", name: "Distribution Switch 02", type: "switch", status: "online", x: 500, y: 250 },
    { id: "dist-03", name: "Distribution Switch 03", type: "switch", status: "online", x: 700, y: 250 },
    { id: "access-01", name: "Access Switch 01", type: "switch", status: "online", x: 200, y: 400 },
    { id: "access-02", name: "Access Switch 02", type: "switch", status: "warning", x: 400, y: 400 },
    { id: "access-03", name: "Access Switch 03", type: "switch", status: "online", x: 600, y: 400 },
    { id: "access-04", name: "Access Switch 04", type: "switch", status: "online", x: 800, y: 400 },
    { id: "wifi-01", name: "WiFi Controller", type: "wireless", status: "online", x: 500, y: 550 },
  ]

  const connections = [
    { from: "core-01", to: "core-02" },
    { from: "core-01", to: "dist-01" },
    { from: "core-01", to: "dist-02" },
    { from: "core-02", to: "dist-02" },
    { from: "core-02", to: "dist-03" },
    { from: "dist-01", to: "access-01" },
    { from: "dist-01", to: "access-02" },
    { from: "dist-02", to: "access-02" },
    { from: "dist-02", to: "access-03" },
    { from: "dist-03", to: "access-03" },
    { from: "dist-03", to: "access-04" },
    { from: "access-02", to: "wifi-01" },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "router":
        return Router
      case "switch":
        return Network
      case "wireless":
        return Wifi
      default:
        return Server
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Network Topology" subtitle="Visual representation of network infrastructure" />

        <div className="flex-1 p-6 overflow-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search devices..." className="pl-10 w-64" />
              </div>

              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Topology</SelectItem>
                  <SelectItem value="logical">Logical Topology</SelectItem>
                  <SelectItem value="layer2">Layer 2 Topology</SelectItem>
                  <SelectItem value="layer3">Layer 3 Topology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4 mr-2" />
                Zoom In
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4 mr-2" />
                Zoom Out
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Topology Canvas */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Network Topology Map</CardTitle>
                  <CardDescription>Interactive network diagram showing device connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-muted/20 rounded-lg" style={{ height: "600px" }}>
                    <svg className="w-full h-full">
                      {/* Connections */}
                      {connections.map((conn, index) => {
                        const fromDevice = devices.find((d) => d.id === conn.from)
                        const toDevice = devices.find((d) => d.id === conn.to)
                        if (!fromDevice || !toDevice) return null

                        return (
                          <line
                            key={index}
                            x1={fromDevice.x}
                            y1={fromDevice.y}
                            x2={toDevice.x}
                            y2={toDevice.y}
                            stroke="hsl(var(--border))"
                            strokeWidth="2"
                            className="opacity-60"
                          />
                        )
                      })}

                      {/* Devices */}
                      {devices.map((device) => {
                        const Icon = getDeviceIcon(device.type)
                        return (
                          <g key={device.id}>
                            <circle
                              cx={device.x}
                              cy={device.y}
                              r="25"
                              fill="hsl(var(--card))"
                              stroke="hsl(var(--border))"
                              strokeWidth="2"
                              className={`cursor-pointer ${selectedDevice === device.id ? "stroke-primary stroke-4" : ""}`}
                              onClick={() => setSelectedDevice(device.id)}
                            />
                            <foreignObject
                              x={device.x - 12}
                              y={device.y - 12}
                              width="24"
                              height="24"
                              className="pointer-events-none"
                            >
                              <Icon className="h-6 w-6 text-foreground" />
                            </foreignObject>
                            <circle
                              cx={device.x + 20}
                              cy={device.y - 20}
                              r="4"
                              className={getStatusColor(device.status)}
                            />
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDevice ? (
                    <div className="space-y-4">
                      {(() => {
                        const device = devices.find((d) => d.id === selectedDevice)
                        if (!device) return null
                        const Icon = getDeviceIcon(device.type)
                        return (
                          <>
                            <div className="flex items-center gap-3">
                              <Icon className="h-8 w-8 text-primary" />
                              <div>
                                <h3 className="font-semibold">{device.name}</h3>
                                <p className="text-sm text-muted-foreground capitalize">{device.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`} />
                              <span className="text-sm capitalize">{device.status}</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>IP Address:</span>
                                <span>192.168.1.{Math.floor(Math.random() * 254) + 1}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>MAC Address:</span>
                                <span>00:1B:44:11:3A:B7</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Uptime:</span>
                                <span>15d 4h 23m</span>
                              </div>
                            </div>
                            <Button
                              className="w-full"
                              onClick={() => (window.location.href = `/inventory/${selectedDevice}`)}
                            >
                              View Details
                            </Button>
                          </>
                        )
                      })()}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Click on a device to view details</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Router className="h-4 w-4" />
                    <span className="text-sm">Router</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    <span className="text-sm">Switch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm">Wireless</span>
                  </div>
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm">Critical</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
