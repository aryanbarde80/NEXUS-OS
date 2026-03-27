"use client";

import React, { useState } from "react";
import { Plus, Bot, Play, Pause, Settings, Activity, Clock, Zap, Search, MoreVertical, Trash2, Copy, Eye, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const agents = [
  { id: "1", name: "ResearchBot", type: "researcher", status: "active", lastRun: "2 min ago", runs: 145, tokensUsed: 24500, cost: 12.50, description: "Analyzes competitors and market trends daily", successRate: 94, avgTime: "45s", model: "GPT-4", schedule: "Every 6h" },
  { id: "2", name: "ContentWriter", type: "content_writer", status: "active", lastRun: "15 min ago", runs: 89, tokensUsed: 180000, cost: 45.00, description: "Generates blog posts and social media content", successRate: 87, avgTime: "2m 30s", model: "Claude 3", schedule: "Daily" },
  { id: "3", name: "SEO Monitor", type: "seo_optimizer", status: "paused", lastRun: "2 hours ago", runs: 230, tokensUsed: 45000, cost: 8.75, description: "Tracks keyword rankings and backlinks", successRate: 99, avgTime: "15s", model: "GPT-4", schedule: "Every 1h" },
  { id: "4", name: "Support Agent", type: "customer_support", status: "active", lastRun: "just now", runs: 1205, tokensUsed: 350000, cost: 87.50, description: "Handles customer inquiries and FAQs", successRate: 91, avgTime: "8s", model: "GPT-4 Turbo", schedule: "Real-time" },
  { id: "5", name: "Code Reviewer", type: "code_buddy", status: "active", lastRun: "30 min ago", runs: 67, tokensUsed: 120000, cost: 30.00, description: "Reviews PRs and suggests improvements", successRate: 96, avgTime: "1m 15s", model: "Claude 3", schedule: "On PR" },
  { id: "6", name: "Data Analyst", type: "analyst", status: "active", lastRun: "1 hour ago", runs: 312, tokensUsed: 95000, cost: 23.75, description: "Processes analytics data and generates reports", successRate: 98, avgTime: "30s", model: "GPT-4", schedule: "Every 4h" },
];

const agentTypeColors: Record<string, string> = {
  researcher: "from-blue-600 to-cyan-500",
  content_writer: "from-violet-600 to-purple-500",
  seo_optimizer: "from-green-600 to-emerald-500",
  customer_support: "from-orange-600 to-amber-500",
  code_buddy: "from-pink-600 to-rose-500",
  analyst: "from-indigo-600 to-blue-500",
};

const runLogs = [
  { id: "r1", agent: "Support Agent", status: "success", input: "Customer asked about pricing plans", output: "Provided detailed comparison of Free, Pro, and Enterprise plans", tokens: 450, duration: "6s", timestamp: "2 min ago" },
  { id: "r2", agent: "ResearchBot", status: "success", input: "Analyze competitor: Notion", output: "Generated 15-page competitive analysis report", tokens: 2800, duration: "45s", timestamp: "5 min ago" },
  { id: "r3", agent: "Code Reviewer", status: "success", input: "PR #142: Add payment integration", output: "Found 3 issues: SQL injection risk, missing error handling, unused import", tokens: 1200, duration: "1m 10s", timestamp: "30 min ago" },
  { id: "r4", agent: "ContentWriter", status: "error", input: "Write blog post about AI trends", output: "Rate limit exceeded. Retrying in 60s...", tokens: 0, duration: "2s", timestamp: "45 min ago" },
  { id: "r5", agent: "Data Analyst", status: "success", input: "Weekly user engagement report", output: "Report generated: DAU up 12%, retention improved by 3%", tokens: 800, duration: "25s", timestamp: "1 hour ago" },
];

export default function AgentsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);

  const totalCost = agents.reduce((s, a) => s + a.cost, 0);
  const totalRuns = agents.reduce((s, a) => s + a.runs, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">Create and manage your autonomous AI agents</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Create Agent</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription>Configure an autonomous AI agent for your workflow</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2"><Label>Agent Name</Label><Input placeholder="e.g., MyResearchBot" /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What should this agent do?" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="researcher">Researcher</SelectItem>
                      <SelectItem value="content_writer">Content Writer</SelectItem>
                      <SelectItem value="seo_optimizer">SEO Optimizer</SelectItem>
                      <SelectItem value="customer_support">Customer Support</SelectItem>
                      <SelectItem value="code_buddy">Code Buddy</SelectItem>
                      <SelectItem value="analyst">Data Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>AI Model</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4</SelectItem>
                      <SelectItem value="gpt4turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="claude3">Claude 3</SelectItem>
                      <SelectItem value="gemini">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Schedule</Label>
                <Select><SelectTrigger><SelectValue placeholder="How often should it run?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time (on trigger)</SelectItem>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>System Prompt</Label><Textarea placeholder="Instructions for the agent..." className="min-h-[100px]" /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setCreateOpen(false)}>Create Agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Agents</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{agents.filter(a => a.status === "active").length}<span className="text-sm font-normal text-muted-foreground">/{agents.length}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Runs Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalRuns.toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avg Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-500">{Math.round(agents.reduce((s, a) => s + a.successRate, 0) / agents.length)}%</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Cost (MTD)</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${totalCost.toFixed(2)}</div></CardContent></Card>
      </div>

      <Tabs defaultValue="agents">
        <TabsList>
          <TabsTrigger value="agents">All Agents</TabsTrigger>
          <TabsTrigger value="logs">Run Logs</TabsTrigger>
          <TabsTrigger value="marketplace">Agent Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search agents..." className="pl-9" />
            </div>
          </div>

          {selectedAgent ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedAgent(null)}>&larr; Back to agents</Button>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${agentTypeColors[selectedAgent.type] || "from-gray-600 to-gray-500"} flex items-center justify-center`}>
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle>{selectedAgent.name}</CardTitle>
                          <CardDescription>{selectedAgent.description}</CardDescription>
                        </div>
                        <Badge variant={selectedAgent.status === "active" ? "success" : "warning"}>{selectedAgent.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div><div className="text-2xl font-bold">{selectedAgent.runs}</div><p className="text-xs text-muted-foreground">Total Runs</p></div>
                        <div><div className="text-2xl font-bold text-green-500">{selectedAgent.successRate}%</div><p className="text-xs text-muted-foreground">Success Rate</p></div>
                        <div><div className="text-2xl font-bold">{selectedAgent.avgTime}</div><p className="text-xs text-muted-foreground">Avg Time</p></div>
                        <div><div className="text-2xl font-bold">${selectedAgent.cost.toFixed(2)}</div><p className="text-xs text-muted-foreground">Total Cost</p></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Recent Runs</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {runLogs.filter(l => l.agent === selectedAgent.name).map((log) => (
                          <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <div className={`w-2 h-2 rounded-full mt-2 ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{log.input}</p>
                              <p className="text-xs text-muted-foreground mt-1">{log.output}</p>
                              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                                <span>{log.tokens} tokens</span>
                                <span>{log.duration}</span>
                                <span>{log.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {runLogs.filter(l => l.agent === selectedAgent.name).length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">No recent runs for this agent</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader><CardTitle className="text-base">Configuration</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Model</span><Badge variant="outline">{selectedAgent.model}</Badge></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Schedule</span><span>{selectedAgent.schedule}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type</span><span className="capitalize">{selectedAgent.type.replace("_", " ")}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tokens Used</span><span>{(selectedAgent.tokensUsed / 1000).toFixed(0)}K</span></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start"><Play className="mr-2 h-4 w-4" /> Run Now</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><Settings className="mr-2 h-4 w-4" /> Edit Config</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><Eye className="mr-2 h-4 w-4" /> View Logs</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><RefreshCw className="mr-2 h-4 w-4" /> Reset Agent</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedAgent(agent)}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${agentTypeColors[agent.type] || "from-gray-600 to-gray-500"} flex items-center justify-center shrink-0`}>
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{agent.name}</h3>
                        <Badge variant={agent.status === "active" ? "success" : "warning"}>{agent.status}</Badge>
                        <Badge variant="outline" className="text-xs">{agent.model}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Activity className="h-3 w-3" />{agent.runs} runs</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{agent.lastRun}</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{(agent.tokensUsed / 1000).toFixed(0)}K tokens</span>
                        <span className="flex items-center gap-1 text-green-500">{agent.successRate}% success</span>
                        <span className="font-medium text-foreground">${agent.cost.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={(e) => e.stopPropagation()}>{agent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Configure</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="logs" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Run History</h2>
            <Button variant="outline" size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
          </div>
          {runLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{log.agent}</span>
                      <Badge variant={log.status === "success" ? "success" : "destructive"} className="text-xs">{log.status}</Badge>
                    </div>
                    <p className="text-sm mt-1"><span className="text-muted-foreground">Input:</span> {log.input}</p>
                    <p className="text-sm mt-1"><span className="text-muted-foreground">Output:</span> {log.output}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{log.tokens} tokens</span>
                      <span>{log.duration}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="marketplace" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Email Responder", desc: "Auto-respond to customer emails with context-aware replies", installs: 1250, rating: 4.8, category: "Support" },
              { name: "Social Media Manager", desc: "Schedule and create social posts across platforms", installs: 890, rating: 4.6, category: "Marketing" },
              { name: "Bug Triager", desc: "Automatically categorize and prioritize incoming bug reports", installs: 650, rating: 4.7, category: "Development" },
              { name: "Meeting Summarizer", desc: "Transcribe and summarize meetings with action items", installs: 2100, rating: 4.9, category: "Productivity" },
              { name: "Translation Agent", desc: "Real-time translation for docs and communications", installs: 780, rating: 4.5, category: "Communication" },
              { name: "Security Scanner", desc: "Continuous security audit of your codebase", installs: 420, rating: 4.8, category: "Security" },
            ].map((agent) => (
              <Card key={agent.name} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-violet-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{agent.desc}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{agent.installs.toLocaleString()} installs</span>
                    <span>&#9733; {agent.rating}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Install Agent</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
