"use client";

import React from "react";
import { User, Bell, Shield, CreditCard, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="mr-2 h-4 w-4" /> Billing</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" /> Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Nexus User" /></div>
                <div className="space-y-2"><Label>Username</Label><Input defaultValue="nexususer" /></div>
              </div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="user@nexus.app" type="email" /></div>
              <div className="space-y-2"><Label>Bio</Label><Input defaultValue="Building the future with NEXUS OS" /></div>
              <div className="space-y-2"><Label>Website</Label><Input defaultValue="https://nexus.app" /></div>
              <Separator />
              <Button variant="gradient">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email notifications", desc: "Receive email updates" },
                { label: "Push notifications", desc: "Browser push notifications" },
                { label: "Task assignments", desc: "When tasks are assigned to you" },
                { label: "Project updates", desc: "Updates on projects you follow" },
                { label: "Marketplace", desc: "Sales and purchase notifications" },
                { label: "AI agent alerts", desc: "When agents complete runs" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security to your account</p></div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Change Password</p><p className="text-xs text-muted-foreground">Update your password</p></div>
                <Button variant="outline">Change</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Connected Wallets</p><p className="text-xs text-muted-foreground">Manage Web3 wallet connections</p></div>
                <Button variant="outline">Manage</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-red-500">Delete Account</p><p className="text-xs text-muted-foreground">Permanently delete your account</p></div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your plan and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-gradient-to-r from-violet-600/5 to-cyan-500/5">
                <div className="flex items-center justify-between">
                  <div><h3 className="font-semibold">Free Plan</h3><p className="text-xs text-muted-foreground">1 project, basic AI, community support</p></div>
                  <Button variant="gradient">Upgrade to Pro</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how NEXUS OS looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Theme</p><p className="text-xs text-muted-foreground">Choose between light and dark mode</p></div>
                <div className="flex border rounded-md">
                  <Button variant="secondary" size="sm">Light</Button>
                  <Button variant="ghost" size="sm">Dark</Button>
                  <Button variant="ghost" size="sm">System</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Accent Color</p><p className="text-xs text-muted-foreground">Primary color used across the interface</p></div>
                <div className="flex gap-2">
                  {["bg-violet-500", "bg-blue-500", "bg-green-500", "bg-rose-500", "bg-amber-500"].map((c) => (
                    <button key={c} className={`h-6 w-6 rounded-full ${c} ${c === "bg-violet-500" ? "ring-2 ring-offset-2 ring-violet-500" : ""}`} />
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Compact Mode</p><p className="text-xs text-muted-foreground">Reduce spacing for denser layouts</p></div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Animations</p><p className="text-xs text-muted-foreground">Enable interface animations and transitions</p></div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
