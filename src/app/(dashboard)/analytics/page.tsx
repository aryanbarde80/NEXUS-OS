"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const metrics = [
  { name: "Total Users", value: "12,450", change: "+12.5%", up: true, icon: Users },
  { name: "Page Views", value: "48,290", change: "+8.2%", up: true, icon: Eye },
  { name: "Conversion Rate", value: "3.2%", change: "-0.4%", up: false, icon: TrendingUp },
  { name: "Revenue", value: "$24,500", change: "+18.7%", up: true, icon: BarChart3 },
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
          <Card className="h-[400px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Analytics Dashboard</p>
              <p className="text-sm">Charts powered by Recharts - Connect your data source</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="mt-4"><Card className="h-[400px] flex items-center justify-center text-muted-foreground"><p>Engagement analytics</p></Card></TabsContent>
        <TabsContent value="revenue" className="mt-4"><Card className="h-[400px] flex items-center justify-center text-muted-foreground"><p>Revenue analytics</p></Card></TabsContent>
        <TabsContent value="ai" className="mt-4"><Card className="h-[400px] flex items-center justify-center text-muted-foreground"><p>AI usage analytics</p></Card></TabsContent>
      </Tabs>
    </div>
  );
}
