"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowUpRight,
  Bot,
  CheckSquare,
  Clock3,
  FolderKanban,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAIStore, useAppStore } from "@/lib/store";

export default function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const projects = useAppStore((state) => state.projects);
  const notifications = useAppStore((state) => state.notifications);
  const agents = useAIStore((state) => state.agents);
  const blogPosts = useAIStore((state) => state.blogPosts);
  const domainResults = useAIStore((state) => state.domainResults);

  const metrics = useMemo(() => {
    const tasks = projects.flatMap((project) => project.tasks);
    const completed = tasks.filter((task) => task.status === "done").length;
    const activeProjects = projects.filter((project) => project.status === "active").length;

    return {
      activeProjects,
      completed,
      totalTasks: tasks.length,
      publishedPosts: blogPosts.filter((post) => post.status === "published").length,
      unreadNotifications: notifications.filter((notification) => !notification.read).length,
    };
  }, [blogPosts, notifications, projects]);

  const chartData = projects.map((project) => ({
    name: project.name.replace("NEXUS OS ", "").slice(0, 12),
    completed: project.metadata.completedTasks,
    open: Math.max(0, project.metadata.totalTasks - project.metadata.completedTasks),
  }));

  const recentProjects = projects.slice(0, 3);
  const recentSignals = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-violet-600/15 via-background to-cyan-500/10 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-300">
              MVP Command Center
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, <span className="gradient-text">{user?.profile.name ?? "Creator"}</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Your workspace now runs on shared product state: projects, AI drafts, domain checks,
                and notifications all feed the same operating layer.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" asChild>
              <Link href="/projects">New Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/ai">Generate Draft</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Active Projects", value: metrics.activeProjects, icon: FolderKanban, tone: "text-violet-400" },
          { label: "Tasks Closed", value: metrics.completed, icon: CheckSquare, tone: "text-cyan-400" },
          { label: "Published Posts", value: metrics.publishedPosts, icon: Sparkles, tone: "text-emerald-400" },
          { label: "Unread Alerts", value: metrics.unreadNotifications, icon: TrendingUp, tone: "text-amber-400" },
          { label: "Running Agents", value: agents.filter((agent) => agent.status === "active").length, icon: Bot, tone: "text-rose-400" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
                <Icon className={`h-4 w-4 ${item.tone}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.label === "Unread Alerts" ? "Needs your attention today" : "Synced from workspace state"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Execution Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="completedTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="openTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Area type="monotone" dataKey="completed" stroke="#8b5cf6" fill="url(#completedTasks)" />
                <Area type="monotone" dataKey="open" stroke="#06b6d4" fill="url(#openTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSignals.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${notification.read ? "bg-muted" : "bg-violet-500"}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.content}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  <Clock3 className="mr-1 inline h-3 w-3" />
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Priority Projects</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                View all <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="space-y-2 rounded-2xl border border-border/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant={project.status === "active" ? "success" : "secondary"}>{project.status}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={(project.metadata.completedTasks / Math.max(project.metadata.totalTasks, 1)) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {project.metadata.completedTasks}/{project.metadata.totalTasks}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cross-Module Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Project execution",
                value: Math.round((metrics.completed / Math.max(metrics.totalTasks, 1)) * 100),
                icon: FolderKanban,
              },
              {
                label: "AI content readiness",
                value: Math.round(
                  (blogPosts.filter((post) => post.status !== "draft").length / Math.max(blogPosts.length, 1)) * 100,
                ),
                icon: Sparkles,
              },
              {
                label: "Domain validation coverage",
                value: Math.min(100, domainResults.length * 28),
                icon: Globe,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-violet-400" />
                      {item.label}
                    </span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
