"use client";

import React, { useState } from "react";
import { Sparkles, Pen, Bot, Brain, Wand2, FileText, Copy, Download, Search, Plus, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const blogPosts = [
  { title: "Top 10 AI Trends for SaaS in 2025", status: "published", seoScore: 92, views: 1240, date: "2025-03-25", readTime: "8 min", keywords: ["AI", "SaaS", "Trends"], wordCount: 2450 },
  { title: "How to Build a No-Code Marketplace", status: "draft", seoScore: 78, views: 0, date: "2025-03-26", readTime: "12 min", keywords: ["No-Code", "Marketplace"], wordCount: 3200 },
  { title: "Web3 for Beginners: A Complete Guide", status: "scheduled", seoScore: 85, views: 0, date: "2025-03-28", readTime: "15 min", keywords: ["Web3", "Blockchain", "Crypto"], wordCount: 4100 },
  { title: "The Future of Remote Work Tools", status: "published", seoScore: 88, views: 890, date: "2025-03-20", readTime: "6 min", keywords: ["Remote Work", "Tools"], wordCount: 1800 },
  { title: "AI-Powered Customer Support Best Practices", status: "published", seoScore: 94, views: 2100, date: "2025-03-18", readTime: "10 min", keywords: ["AI", "Support", "Chatbot"], wordCount: 2800 },
  { title: "GraphQL vs REST: 2025 Comparison", status: "draft", seoScore: 72, views: 0, date: "2025-03-27", readTime: "7 min", keywords: ["GraphQL", "REST", "API"], wordCount: 2100 },
];

const contentCalendar = [
  { date: "Mar 28", title: "Web3 for Beginners", type: "Blog Post", status: "scheduled" },
  { date: "Mar 30", title: "Monthly Newsletter", type: "Email", status: "draft" },
  { date: "Apr 1", title: "Product Update v2.5", type: "Announcement", status: "planned" },
  { date: "Apr 3", title: "Developer Spotlight: React Patterns", type: "Blog Post", status: "planned" },
  { date: "Apr 5", title: "Community Roundup", type: "Social Media", status: "planned" },
  { date: "Apr 8", title: "AI Integration Tutorial", type: "Tutorial", status: "planned" },
];

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt4");

  const publishedPosts = blogPosts.filter(p => p.status === "published");
  const totalViews = publishedPosts.reduce((s, p) => s + p.views, 0);
  const avgSeo = Math.round(blogPosts.reduce((s, p) => s + p.seoScore, 0) / blogPosts.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Studio</h1>
        <p className="text-muted-foreground">Create content, analyze data, and automate with AI</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { name: "Content Writer", icon: Pen, desc: "Generate blog posts & articles", color: "from-violet-600 to-purple-500" },
          { name: "Code Assistant", icon: Bot, desc: "Write & review code", color: "from-cyan-600 to-blue-500" },
          { name: "Research Agent", icon: Brain, desc: "Analyze markets & competitors", color: "from-green-600 to-emerald-500" },
          { name: "SEO Optimizer", icon: Wand2, desc: "Optimize content for search", color: "from-orange-600 to-amber-500" },
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.name} className="cursor-pointer hover:shadow-md transition-all group">
              <CardContent className="pt-6 text-center space-y-3">
                <div className={`mx-auto h-12 w-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Published Posts</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{publishedPosts.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Views</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalViews.toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avg SEO Score</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-500">{avgSeo}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Drafts</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{blogPosts.filter(p => p.status === "draft").length}</div></CardContent></Card>
      </div>

      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="seo">SEO Dashboard</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
              <CardDescription>Describe what you want to create and let AI do the work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Write a comprehensive blog post about the future of AI in project management..." className="min-h-[120px]" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4</SelectItem>
                      <SelectItem value="gpt4turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="claude3">Claude 3</SelectItem>
                      <SelectItem value="gemini">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="blog">
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social Post</SelectItem>
                      <SelectItem value="docs">Documentation</SelectItem>
                      <SelectItem value="ad">Ad Copy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="outline">~2000 words</Badge>
                </div>
                <Button variant="gradient"><Sparkles className="mr-2 h-4 w-4" /> Generate</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-violet-500" /> Generated Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/50 p-6 min-h-[200px]">
                <p className="text-sm text-muted-foreground italic">Your generated content will appear here. Enter a prompt above and click Generate to get started.</p>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-muted rounded w-full animate-pulse" />
                  <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-4/6 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-full animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" disabled><Copy className="mr-2 h-3 w-3" /> Copy</Button>
                <Button variant="outline" size="sm" disabled><Download className="mr-2 h-3 w-3" /> Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-9" />
            </div>
            <Button variant="gradient" size="sm"><Plus className="mr-2 h-4 w-4" /> New Post</Button>
          </div>
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>SEO: {post.seoScore}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      <span>{post.wordCount} words</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex gap-1.5 mt-1.5">
                      {post.keywords.map((kw) => <Badge key={kw} variant="outline" className="text-xs">{kw}</Badge>)}
                    </div>
                  </div>
                  <Badge variant={post.status === "published" ? "success" : post.status === "scheduled" ? "info" : "secondary"}>
                    {post.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Content Calendar</h2>
            <Button variant="gradient" size="sm"><Plus className="mr-2 h-4 w-4" /> Schedule Content</Button>
          </div>
          <div className="space-y-3">
            {contentCalendar.map((item) => (
              <Card key={item.title} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-semibold">{item.date}</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      <Badge variant={item.status === "scheduled" ? "info" : item.status === "draft" ? "secondary" : "outline"} className="text-xs">{item.status}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">SEO Score Distribution</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {blogPosts.map((post) => (
                  <div key={post.title} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate flex-1 mr-2">{post.title}</span>
                      <span className={`font-medium ${post.seoScore >= 90 ? "text-green-500" : post.seoScore >= 80 ? "text-yellow-500" : "text-red-500"}`}>{post.seoScore}</span>
                    </div>
                    <Progress value={post.seoScore} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">SEO Recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tip: "Add more internal links to 'No-Code Marketplace' post", priority: "high" },
                  { tip: "Optimize meta descriptions for all draft posts", priority: "medium" },
                  { tip: "Add alt text to images in 'Web3 Guide'", priority: "high" },
                  { tip: "Improve keyword density in 'GraphQL vs REST'", priority: "medium" },
                  { tip: "Add schema markup to published posts", priority: "low" },
                ].map((rec) => (
                  <div key={rec.tip} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${rec.priority === "high" ? "bg-red-500" : rec.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"}`} />
                    <p className="text-sm">{rec.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="space-y-3">
            {[
              { prompt: "Write a blog post about AI trends in 2025", model: "GPT-4", type: "Blog Post", tokens: 2450, date: "Mar 25, 2025", status: "completed" },
              { prompt: "Generate product descriptions for marketplace listings", model: "Claude", type: "Marketing", tokens: 1200, date: "Mar 24, 2025", status: "completed" },
              { prompt: "Analyze competitor websites and summarize key features", model: "GPT-4", type: "Research", tokens: 3100, date: "Mar 23, 2025", status: "completed" },
              { prompt: "Create SEO-optimized meta descriptions for 10 pages", model: "GPT-4", type: "SEO", tokens: 850, date: "Mar 22, 2025", status: "completed" },
              { prompt: "Draft an email newsletter about Web3 governance", model: "Claude", type: "Email", tokens: 1800, date: "Mar 21, 2025", status: "completed" },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="h-5 w-5 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.prompt}</p>
                    <p className="text-xs text-muted-foreground">{item.date} &middot; {item.tokens} tokens</p>
                  </div>
                  <Badge variant="outline">{item.model}</Badge>
                  <Badge variant="secondary">{item.type}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
