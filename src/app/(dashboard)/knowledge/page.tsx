"use client";

import React, { useState } from "react";
import { Brain, Search, Plus, Zap, FileText, Eye, BookOpen, Globe, Database, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const nodes = [
  { id: 1, label: "React", x: 400, y: 200, size: 50, color: "#61dafb", connections: [2, 3, 5, 8], category: "Framework", docs: 45, articles: 120 },
  { id: 2, label: "TypeScript", x: 250, y: 120, size: 45, color: "#3178c6", connections: [1, 4, 6], category: "Language", docs: 38, articles: 95 },
  { id: 3, label: "Next.js", x: 550, y: 150, size: 42, color: "#ffffff", connections: [1, 7], category: "Framework", docs: 32, articles: 78 },
  { id: 4, label: "Node.js", x: 150, y: 280, size: 40, color: "#339933", connections: [2, 6, 9], category: "Runtime", docs: 50, articles: 150 },
  { id: 5, label: "GraphQL", x: 500, y: 320, size: 35, color: "#e535ab", connections: [1, 7, 9], category: "API", docs: 22, articles: 60 },
  { id: 6, label: "PostgreSQL", x: 100, y: 400, size: 38, color: "#336791", connections: [2, 4], category: "Database", docs: 40, articles: 85 },
  { id: 7, label: "Tailwind", x: 650, y: 280, size: 35, color: "#06b6d4", connections: [3, 5], category: "Styling", docs: 28, articles: 70 },
  { id: 8, label: "Zustand", x: 350, y: 380, size: 30, color: "#764abc", connections: [1], category: "State", docs: 15, articles: 35 },
  { id: 9, label: "Docker", x: 280, y: 450, size: 35, color: "#2496ed", connections: [4, 5], category: "DevOps", docs: 30, articles: 90 },
  { id: 10, label: "AI/ML", x: 550, y: 430, size: 42, color: "#ff6f61", connections: [1, 4], category: "AI", docs: 55, articles: 200 },
];

const knowledgeItems = [
  { title: "React Server Components Deep Dive", type: "article", category: "React", author: "JD", date: "Mar 25, 2025", views: 234, tags: ["RSC", "Next.js", "Performance"] },
  { title: "TypeScript 5.5 New Features", type: "documentation", category: "TypeScript", author: "AK", date: "Mar 24, 2025", views: 189, tags: ["TypeScript", "Types", "Generics"] },
  { title: "GraphQL Federation Architecture", type: "guide", category: "GraphQL", author: "MR", date: "Mar 23, 2025", views: 156, tags: ["GraphQL", "Microservices", "Federation"] },
  { title: "Docker Multi-Stage Build Optimization", type: "tutorial", category: "Docker", author: "SK", date: "Mar 22, 2025", views: 312, tags: ["Docker", "CI/CD", "Optimization"] },
  { title: "AI-Powered Code Review Patterns", type: "research", category: "AI/ML", author: "DP", date: "Mar 21, 2025", views: 445, tags: ["AI", "Code Review", "Automation"] },
  { title: "PostgreSQL Performance Tuning Guide", type: "guide", category: "PostgreSQL", author: "AK", date: "Mar 20, 2025", views: 278, tags: ["Database", "Performance", "SQL"] },
];

export default function KnowledgePage() {
  const [selectedNode, setSelectedNode] = useState<typeof nodes[0] | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Graph</h1>
          <p className="text-muted-foreground">Explore and manage your team&apos;s knowledge base</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add Knowledge</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Topics</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{nodes.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Articles</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{knowledgeItems.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Views</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{knowledgeItems.reduce((s, k) => s + k.views, 0).toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Contributors</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5</div></CardContent></Card>
      </div>

      <Tabs defaultValue="graph">
        <TabsList>
          <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
          <TabsTrigger value="articles">Articles & Docs</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="graph" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <svg viewBox="0 0 800 550" className="w-full h-auto bg-background rounded-lg">
                    <defs>
                      <radialGradient id="glow">
                        <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                      </radialGradient>
                    </defs>
                    {nodes.map((node) =>
                      node.connections.map((targetId) => {
                        const target = nodes.find((n) => n.id === targetId);
                        if (!target) return null;
                        return (<line key={`${node.id}-${targetId}`} x1={node.x} y1={node.y} x2={target.x} y2={target.y} stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" />);
                      })
                    )}
                    {nodes.map((node) => (
                      <g key={node.id} className="cursor-pointer" onClick={() => setSelectedNode(node)}>
                        <circle cx={node.x} cy={node.y} r={node.size * 0.7} fill="url(#glow)" />
                        <circle cx={node.x} cy={node.y} r={node.size * 0.4} fill={node.color} opacity="0.8" stroke={selectedNode?.id === node.id ? "#fff" : "transparent"} strokeWidth="2" />
                        <text x={node.x} y={node.y + node.size * 0.4 + 18} textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500">{node.label}</text>
                      </g>
                    ))}
                  </svg>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              {selectedNode ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: selectedNode.color + "20" }}>
                        <Brain className="h-5 w-5" style={{ color: selectedNode.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{selectedNode.label}</CardTitle>
                        <CardDescription>{selectedNode.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Documentation</span><span>{selectedNode.docs} pages</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Articles</span><span>{selectedNode.articles}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Connections</span><span>{selectedNode.connections.length} topics</span></div>
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Connected To:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.connections.map((id) => {
                          const n = nodes.find(n => n.id === id);
                          return n ? <Badge key={id} variant="outline" className="text-xs">{n.label}</Badge> : null;
                        })}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2"><BookOpen className="mr-2 h-4 w-4" /> Browse Documentation</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Click on a node to view details</p>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardHeader><CardTitle className="text-base">Categories</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {Array.from(new Set(nodes.map(n => n.category))).map((cat) => (
                    <div key={cat} className="flex items-center justify-between text-sm">
                      <span>{cat}</span>
                      <Badge variant="secondary" className="text-xs">{nodes.filter(n => n.category === cat).length}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9" />
            </div>
          </div>
          <div className="space-y-3">
            {knowledgeItems.map((item) => (
              <Card key={item.title} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                    {item.type === "article" && <FileText className="h-5 w-5 text-violet-500" />}
                    {item.type === "documentation" && <BookOpen className="h-5 w-5 text-blue-500" />}
                    {item.type === "guide" && <Lightbulb className="h-5 w-5 text-amber-500" />}
                    {item.type === "tutorial" && <Globe className="h-5 w-5 text-green-500" />}
                    {item.type === "research" && <TrendingUp className="h-5 w-5 text-pink-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {item.tags.map((tag) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize text-xs">{item.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Knowledge Gap: WebSocket Architecture", desc: "Your team has limited documentation on real-time communication patterns. Consider creating guides.", priority: "high", icon: Zap },
              { title: "Trending Topic: AI Integration", desc: "AI/ML content has 3x more views than average. Your team is actively learning about AI patterns.", priority: "info", icon: TrendingUp },
              { title: "Stale Content: Docker Basics", desc: "5 Docker articles haven't been updated in 90+ days. Review for accuracy.", priority: "medium", icon: Database },
              { title: "Popular: React Server Components", desc: "RSC documentation is the most accessed resource this month with 234 views.", priority: "info", icon: BookOpen },
            ].map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.title} className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-violet-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{insight.title}</h3>
                          <Badge variant={insight.priority === "high" ? "destructive" : insight.priority === "medium" ? "warning" : "info"} className="text-xs">{insight.priority}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{insight.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
