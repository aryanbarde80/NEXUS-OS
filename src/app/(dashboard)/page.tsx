"use client";

import React from "react";
import {
  FolderKanban, CheckSquare, TrendingUp, Users, Sparkles,
  ArrowUpRight, Clock, Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  { name: "Active Projects", value: "12", change: "+2", icon: FolderKanban, color: "text-violet-500" },
  { name: "Tasks Completed", value: "148", change: "+23", icon: CheckSquare, color: "text-cyan-500" },
  { name: "Team Members", value: "8", change: "+1", icon: Users, color: "text-green-500" },
  { name: "AI Credits", value: "2,450", change: "-120", icon: Sparkles, color: "text-amber-500" },
];

const recentProjects = [
  { name: "E-Commerce Platform", status: "active", progress: 72, tasks: 45, completed: 32 },
  { name: "Mobile App Redesign", status: "active", progress: 45, tasks: 28, completed: 13 },
  { name: "AI Chatbot Integration", status: "active", progress: 89, tasks: 15, completed: 13 },
  { name: "Marketing Dashboard", status: "paused", progress: 30, tasks: 20, completed: 6 },
];

const recentActivity = [
  { action: "Completed task", detail: "Update user authentication flow", time: "2m ago", type: "task" },
  { action: "AI generated", detail: "Blog post: Top 10 SaaS Trends", time: "15m ago", type: "ai" },
  { action: "New listing", detail: "React Dashboard Template", time: "1h ago", type: "marketplace" },
  { action: "Domain checked", detail: "nexusplatform.io - Available", time: "2h ago", type: "domain" },
  { action: "Achievement unlocked", detail: "First 100 tasks completed", time: "3h ago", type: "achievement" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, <span className="gradient-text">Creator</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening across your digital empire.
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Sparkles className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>{" "}from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Active Projects</CardTitle>
            <Button variant="ghost" size="sm">View all <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.name} className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{project.name}</p>
                    <Badge variant={project.status === "active" ? "success" : "warning"}>{project.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-10">{project.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.completed}/{project.tasks} tasks</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1">
                  {activity.type === "task" && <CheckSquare className="h-4 w-4 text-green-500" />}
                  {activity.type === "ai" && <Sparkles className="h-4 w-4 text-violet-500" />}
                  {activity.type === "marketplace" && <TrendingUp className="h-4 w-4 text-cyan-500" />}
                  {activity.type === "domain" && <Star className="h-4 w-4 text-amber-500" />}
                  {activity.type === "achievement" && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />{activity.time}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Check Domain", color: "from-blue-600 to-cyan-500" },
              { label: "Generate Blog", color: "from-violet-600 to-purple-500" },
              { label: "Create Agent", color: "from-green-600 to-emerald-500" },
              { label: "List on Market", color: "from-orange-600 to-amber-500" },
            ].map((action) => (
              <Button key={action.label} variant="outline" className="h-20 flex flex-col gap-2 hover:shadow-md transition-all">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-bold">{action.label[0]}</span>
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
