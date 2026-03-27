"use client";

import React from "react";
import { Plus, Bot, Play, Pause, Settings, Activity, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agents = [
  { id: "1", name: "ResearchBot", type: "researcher", status: "active", lastRun: "2 min ago", runs: 145, tokensUsed: 24500, cost: 12.50, description: "Analyzes competitors and market trends daily" },
  { id: "2", name: "ContentWriter", type: "content_writer", status: "active", lastRun: "15 min ago", runs: 89, tokensUsed: 180000, cost: 45.00, description: "Generates blog posts and social media content" },
  { id: "3", name: "SEO Monitor", type: "seo_optimizer", status: "paused", lastRun: "2 hours ago", runs: 230, tokensUsed: 45000, cost: 8.75, description: "Tracks keyword rankings and backlinks" },
  { id: "4", name: "Support Agent", type: "customer_support", status: "active", lastRun: "just now", runs: 1205, tokensUsed: 350000, cost: 87.50, description: "Handles customer inquiries and FAQs" },
  { id: "5", name: "Code Reviewer", type: "code_buddy", status: "active", lastRun: "30 min ago", runs: 67, tokensUsed: 120000, cost: 30.00, description: "Reviews PRs and suggests improvements" },
];

const agentTypeColors: Record<string, string> = {
  researcher: "from-blue-600 to-cyan-500",
  content_writer: "from-violet-600 to-purple-500",
  seo_optimizer: "from-green-600 to-emerald-500",
  customer_support: "from-orange-600 to-amber-500",
  code_buddy: "from-pink-600 to-rose-500",
};

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">Create and manage your autonomous AI agents</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Create Agent</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Agents</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{agents.filter(a => a.status === "active").length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Runs Today</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,736</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Cost (MTD)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$183.75</div></CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-all">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${agentTypeColors[agent.type] || "from-gray-600 to-gray-500"} flex items-center justify-center shrink-0`}>
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{agent.name}</h3>
                  <Badge variant={agent.status === "active" ? "success" : "warning"}>{agent.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Activity className="h-3 w-3" />{agent.runs} runs</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{agent.lastRun}</span>
                  <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{(agent.tokensUsed / 1000).toFixed(0)}K tokens</span>
                  <span className="font-medium text-foreground">${agent.cost.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">{agent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                <Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
