"use client";

import { useEffect, useState } from "react";
import { Bell, CreditCard, Palette, Shield, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";

export default function SettingsPage() {
  const user = useAppStore((state) => state.user);
  const updateUser = useAppStore((state) => state.updateUser);
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const [profileForm, setProfileForm] = useState({
    name: user?.profile.name ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    bio: user?.profile.bio ?? "",
    website: user?.profile.website ?? "",
  });

  useEffect(() => {
    setProfileForm({
      name: user?.profile.name ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      bio: user?.profile.bio ?? "",
      website: user?.profile.website ?? "",
    });
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage the actual persisted workspace profile and preferences.</p>
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
              <CardTitle>Profile</CardTitle>
              <CardDescription>Changes here update the shared workspace identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={profileForm.username} onChange={(event) => setProfileForm((current) => ({ ...current, username: event.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={profileForm.bio} onChange={(event) => setProfileForm((current) => ({ ...current, bio: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={profileForm.website} onChange={(event) => setProfileForm((current) => ({ ...current, website: event.target.value }))} />
              </div>
              <Button
                variant="gradient"
                onClick={() =>
                  updateUser((current) => ({
                    ...current,
                    username: profileForm.username,
                    email: profileForm.email,
                    profile: {
                      ...current.profile,
                      name: profileForm.name,
                      bio: profileForm.bio,
                      website: profileForm.website,
                    },
                  }))
                }
              >
                Save profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email alerts", key: "email" as const },
                { label: "Push alerts", key: "push" as const },
                { label: "SMS alerts", key: "sms" as const },
                { label: "In-app alerts", key: "inApp" as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <Switch
                    checked={user.settings.notifications[item.key]}
                    onCheckedChange={(checked) =>
                      updateUser((current) => ({
                        ...current,
                        settings: {
                          ...current.settings,
                          notifications: {
                            ...current.settings.notifications,
                            [item.key]: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
                <div>
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">Persisted in your workspace profile for MVP demos.</p>
                </div>
                <Switch
                  checked={user.settings.twoFactorEnabled}
                  onCheckedChange={(checked) =>
                    updateUser((current) => ({
                      ...current,
                      settings: {
                        ...current.settings,
                        twoFactorEnabled: checked,
                      },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Static plan details for the MVP shell.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
                <div>
                  <p className="font-medium">Prototyping Plan</p>
                  <p className="text-sm text-muted-foreground">Includes unlimited local projects and AI workspace demos.</p>
                </div>
                <Badge variant="outline">Internal</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Light", value: "light" as const },
                  { label: "Dark", value: "dark" as const },
                  { label: "System", value: "system" as const },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={theme === option.value ? "secondary" : "outline"}
                    onClick={() => setTheme(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
