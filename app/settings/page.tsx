"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Shield, Network, Save } from "lucide-react"

export default function SettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    systemName: "Network Management System",
    timezone: "UTC",
    language: "English",
    sessionTimeout: "30",
    maxLoginAttempts: "3",
    enableAuditLog: true,
    enableAutoBackup: true,
    backupRetention: "30",
  })

  const [networkSettings, setNetworkSettings] = useState({
    snmpCommunity: "public",
    snmpTimeout: "5",
    snmpRetries: "3",
    discoveryInterval: "60",
    enableSNMPv3: false,
    enableNetflow: true,
    syslogServer: "192.168.1.100",
    ntpServer: "pool.ntp.org",
  })

  const [alertSettings, setAlertSettings] = useState({
    enableEmailAlerts: true,
    smtpServer: "smtp.company.com",
    smtpPort: "587",
    smtpUsername: "nms@company.com",
    enableSMSAlerts: false,
    smsProvider: "",
    criticalThreshold: "90",
    warningThreshold: "75",
  })

  const handleSaveSettings = (category: string) => {
    alert(`${category} settings saved successfully!`)
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar removed: now handled by layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="System Settings" subtitle="Configure system preferences and network parameters" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Tabs defaultValue="system" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                    <CardDescription>Configure basic system parameters and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="systemName">System Name</Label>
                        <Input
                          id="systemName"
                          value={systemSettings.systemName}
                          onChange={(e) => setSystemSettings({ ...systemSettings, systemName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={systemSettings.timezone}
                          onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="EST">Eastern Time</SelectItem>
                            <SelectItem value="PST">Pacific Time</SelectItem>
                            <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={systemSettings.language}
                          onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Audit Logging</Label>
                          <p className="text-sm text-muted-foreground">Log all user actions and system events</p>
                        </div>
                        <Switch
                          checked={systemSettings.enableAuditLog}
                          onCheckedChange={(checked) =>
                            setSystemSettings({ ...systemSettings, enableAuditLog: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Auto Backup</Label>
                          <p className="text-sm text-muted-foreground">Automatically backup configurations</p>
                        </div>
                        <Switch
                          checked={systemSettings.enableAutoBackup}
                          onCheckedChange={(checked) =>
                            setSystemSettings({ ...systemSettings, enableAutoBackup: checked })
                          }
                        />
                      </div>
                    </div>

                    <Button onClick={() => handleSaveSettings("System")} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save System Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      Network Configuration
                    </CardTitle>
                    <CardDescription>Configure SNMP, discovery, and network monitoring settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="snmpCommunity">SNMP Community String</Label>
                        <Input
                          id="snmpCommunity"
                          value={networkSettings.snmpCommunity}
                          onChange={(e) => setNetworkSettings({ ...networkSettings, snmpCommunity: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="snmpTimeout">SNMP Timeout (seconds)</Label>
                        <Input
                          id="snmpTimeout"
                          type="number"
                          value={networkSettings.snmpTimeout}
                          onChange={(e) => setNetworkSettings({ ...networkSettings, snmpTimeout: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="discoveryInterval">Discovery Interval (minutes)</Label>
                        <Input
                          id="discoveryInterval"
                          type="number"
                          value={networkSettings.discoveryInterval}
                          onChange={(e) =>
                            setNetworkSettings({ ...networkSettings, discoveryInterval: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="syslogServer">Syslog Server</Label>
                        <Input
                          id="syslogServer"
                          value={networkSettings.syslogServer}
                          onChange={(e) => setNetworkSettings({ ...networkSettings, syslogServer: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ntpServer">NTP Server</Label>
                      <Input
                        id="ntpServer"
                        value={networkSettings.ntpServer}
                        onChange={(e) => setNetworkSettings({ ...networkSettings, ntpServer: e.target.value })}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable SNMPv3</Label>
                          <p className="text-sm text-muted-foreground">Use SNMPv3 for enhanced security</p>
                        </div>
                        <Switch
                          checked={networkSettings.enableSNMPv3}
                          onCheckedChange={(checked) =>
                            setNetworkSettings({ ...networkSettings, enableSNMPv3: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable NetFlow</Label>
                          <p className="text-sm text-muted-foreground">Collect network flow data</p>
                        </div>
                        <Switch
                          checked={networkSettings.enableNetflow}
                          onCheckedChange={(checked) =>
                            setNetworkSettings({ ...networkSettings, enableNetflow: checked })
                          }
                        />
                      </div>
                    </div>

                    <Button onClick={() => handleSaveSettings("Network")} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Network Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Alert Configuration
                    </CardTitle>
                    <CardDescription>Configure email, SMS, and threshold-based alerting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Email Alerts</Label>
                          <p className="text-sm text-muted-foreground">Send alerts via email</p>
                        </div>
                        <Switch
                          checked={alertSettings.enableEmailAlerts}
                          onCheckedChange={(checked) =>
                            setAlertSettings({ ...alertSettings, enableEmailAlerts: checked })
                          }
                        />
                      </div>
                    </div>

                    {alertSettings.enableEmailAlerts && (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="smtpServer">SMTP Server</Label>
                            <Input
                              id="smtpServer"
                              value={alertSettings.smtpServer}
                              onChange={(e) => setAlertSettings({ ...alertSettings, smtpServer: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="smtpPort">SMTP Port</Label>
                            <Input
                              id="smtpPort"
                              value={alertSettings.smtpPort}
                              onChange={(e) => setAlertSettings({ ...alertSettings, smtpPort: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="smtpUsername">SMTP Username</Label>
                          <Input
                            id="smtpUsername"
                            value={alertSettings.smtpUsername}
                            onChange={(e) => setAlertSettings({ ...alertSettings, smtpUsername: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="criticalThreshold">Critical Threshold (%)</Label>
                        <Input
                          id="criticalThreshold"
                          type="number"
                          value={alertSettings.criticalThreshold}
                          onChange={(e) => setAlertSettings({ ...alertSettings, criticalThreshold: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="warningThreshold">Warning Threshold (%)</Label>
                        <Input
                          id="warningThreshold"
                          type="number"
                          value={alertSettings.warningThreshold}
                          onChange={(e) => setAlertSettings({ ...alertSettings, warningThreshold: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button onClick={() => handleSaveSettings("Alert")} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Alert Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Configure security policies and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={systemSettings.maxLoginAttempts}
                          onChange={(e) => setSystemSettings({ ...systemSettings, maxLoginAttempts: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="passwordPolicy">Password Policy</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Security</SelectItem>
                            <SelectItem value="medium">Medium Security</SelectItem>
                            <SelectItem value="high">High Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Enforce 2FA for all users</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable IP Whitelisting</Label>
                          <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable SSL/TLS</Label>
                          <p className="text-sm text-muted-foreground">Force HTTPS connections</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                      <Textarea id="allowedIPs" placeholder="Enter IP addresses or ranges, one per line" rows={4} />
                    </div>

                    <Button onClick={() => handleSaveSettings("Security")} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Security Settings
                    </Button>
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
