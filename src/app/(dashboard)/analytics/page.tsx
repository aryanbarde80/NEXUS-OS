"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const metrics = [
  { name: "Total Users", value: "12,450", change: "+12.5%", up: true, icon: Users },
  { name: "Page Views", value: "48,290", change: "+8.2%", up: true, icon: Eye },
  { name: "Conversion Rate", value: "3.2%", change: "-0.4%", up: false, icon: TrendingUp },
  { name: "Revenue", value: "$24,500", change: "+18.7%", up: true, icon: BarChart3 },
];

const overviewData = [
  { month: "Jan", users: 4200, views: 24000, revenue: 12400 },
  { month: "Feb", users: 5100, views: 28000, revenue: 14800 },
  { month: "Mar", users: 6300, views: 32000, revenue: 16200 },
  { month: "Apr", users: 7800, views: 38000, revenue: 18900 },
  { month: "May", users: 9200, views: 42000, revenue: 21500 },
  { month: "Jun", users: 10800, views: 45000, revenue: 22800 },
  { month: "Jul", users: 12450, views: 48290, revenue: 24500 },
];

const engagementData = [
  { day: "Mon", sessions: 2400, avgDuration: 4.2, bounceRate: 32 },
  { day: "Tue", sessions: 2800, avgDuration: 4.5, bounceRate: 28 },
  { day: "Wed", sessions: 3200, avgDuration: 5.1, bounceRate: 25 },
  { day: "Thu", sessions: 2900, avgDuration: 4.8, bounceRate: 30 },
  { day: "Fri", sessions: 3500, avgDuration: 5.3, bounceRate: 22 },
  { day: "Sat", sessions: 1800, avgDuration: 6.2, bounceRate: 18 },
  { day: "Sun", sessions: 1500, avgDuration: 5.8, bounceRate: 20 },
];

const revenueData = [
  { month: "Jan", subscriptions: 8200, marketplace: 3100, services: 1100 },
  { month: "Feb", subscriptions: 9400, marketplace: 3800, services: 1600 },
  { month: "Mar", subscriptions: 10200, marketplace: 4200, services: 1800 },
  { month: "Apr", subscriptions: 11800, marketplace: 4900, services: 2200 },
  { month: "May", subscriptions: 13500, marketplace: 5600, services: 2400 },
  { month: "Jun", subscriptions: 14200, marketplace: 5800, services: 2800 },
  { month: "Jul", subscriptions: 15400, marketplace: 6200, services: 2900 },
];

const aiUsageData = [
  { name: "Content Generation", value: 35, color: "#8b5cf6" },
  { name: "Code Assistant", value: 25, color: "#06b6d4" },
  { name: "Research Agent", value: 20, color: "#10b981" },
  { name: "SEO Optimizer", value: 12, color: "#f59e0b" },
  { name: "Other", value: 8, color: "#ec4899" },
];

const aiCreditData = [
  { week: "W1", credits: 320, cost: 16 },
  { week: "W2", credits: 480, cost: 24 },
  { week: "W3", credits: 410, cost: 20.5 },
  { week: "W4", credits: 560, cost: 28 },
  { week: "W5", credits: 620, cost: 31 },
  { week: "W6", credits: 510, cost: 25.5 },
  { week: "W7", credits: 690, cost: 34.5 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track performance and gain insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs mt-1 ${metric.up ? "text-green-500" : "text-red-500"}`}>
                  {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {metric.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="ai">AI Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Growth Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
                  <Legend />
                  <Area type="monotone" dataKey="users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUsers)" name="Users" />
                  <Area type="monotone" dataKey="views" stroke="#06b6d4" fillOpacity={1} fill="url(#colorViews)" name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Daily Sessions</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
                    <Bar dataKey="sessions" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Avg. Session Duration (min)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
                    <Line type="monotone" dataKey="avgDuration" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} name="Duration (min)" />
                    <Line type="monotone" dataKey="bounceRate" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} name="Bounce Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Revenue Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]} />
                  <Legend />
                  <Bar dataKey="subscriptions" stackId="a" fill="#8b5cf6" name="Subscriptions" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="marketplace" stackId="a" fill="#06b6d4" name="Marketplace" />
                  <Bar dataKey="services" stackId="a" fill="#10b981" name="Services" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-500" /> AI Usage by Type</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={aiUsageData} cx="50%" cy="50%" innerRadius={60} outerRadius={110} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                      {aiUsageData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Weekly AI Credits & Cost</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={aiCreditData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="week" stroke="#888" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#888" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} tickFormatter={(v) => `$${v}`} />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="credits" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Credits Used" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} name="Cost ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
