"use client";

import React, { useState } from "react";
import { Bell, CheckSquare, Sparkles, Store, Trophy, Users, Check, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: "1", type: "task_assigned", title: "New task assigned", content: "You have been assigned to \"Implement payment gateway\"", time: "2 min ago", read: false, icon: CheckSquare, color: "text-blue-500" },
  { id: "2", type: "agent_completed", title: "Agent completed run", content: "ResearchBot found 3 new competitor insights", time: "15 min ago", read: false, icon: Sparkles, color: "text-violet-500" },
  { id: "3", type: "marketplace_sale", title: "New marketplace sale!", content: "Someone purchased your React Dashboard Template for $49", time: "1 hour ago", read: false, icon: Store, color: "text-green-500" },
  { id: "4", type: "achievement_unlocked", title: "Achievement unlocked!", content: "You earned \"Task Master\" - Complete 100 tasks", time: "3 hours ago", read: true, icon: Trophy, color: "text-amber-500" },
  { id: "5", type: "project_invite", title: "Project invitation", content: "Maria R. invited you to collaborate on \"AI Dashboard\"", time: "5 hours ago", read: true, icon: Users, color: "text-cyan-500" },
  { id: "6", type: "comment_added", title: "New comment", content: "Alex K. commented on your task \"API Integration\"", time: "1 day ago", read: true, icon: Bell, color: "text-pink-500" },
];

const filterTypes = ["All", "Tasks", "AI", "Marketplace", "Achievements", "Social"];
const typeMapping: Record<string, string[]> = {
  All: [],
  Tasks: ["task_assigned"],
  AI: ["agent_completed"],
  Marketplace: ["marketplace_sale"],
  Achievements: ["achievement_unlocked"],
  Social: ["project_invite", "comment_added"],
};

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? notifications : notifications.filter(n => typeMapping[activeFilter]?.includes(n.type));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your projects and activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Check className="mr-2 h-4 w-4" /> Mark all read</Button>
          <Button variant="outline" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Clear all</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filterTypes.map((f) => (
          <Button key={f} variant={activeFilter === f ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(f)}>
            {f}
            {f === "All" && unreadCount > 0 && <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 flex items-center justify-center text-[10px]">{unreadCount}</Badge>}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((notif) => {
          const Icon = notif.icon;
          return (
            <Card key={notif.id} className={`hover:shadow-md transition-all cursor-pointer ${!notif.read ? "border-primary/20 bg-primary/5" : ""}`}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`mt-1 ${notif.color}`}><Icon className="h-5 w-5" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{notif.title}</h3>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No notifications in this category</p>
          </Card>
        )}
      </div>
    </div>
  );
}
