"use client";

import React, { useState } from "react";
import { Sparkles, Pen, Bot, Brain, Wand2, FileText, Copy, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const blogPosts = [
  { title: "Top 10 AI Trends for SaaS in 2025", status: "published", seoScore: 92, views: 1240, date: "2025-03-25" },
  { title: "How to Build a No-Code Marketplace", status: "draft", seoScore: 78, views: 0, date: "2025-03-26" },
  { title: "Web3 for Beginners: A Complete Guide", status: "scheduled", seoScore: 85, views: 0, date: "2025-03-28" },
];

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
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

      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
              <CardDescription>Describe what you want to create and let AI do the work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Write a comprehensive blog post about the future of AI in project management..." className="min-h-[120px]" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline">GPT-4</Badge>
                  <Badge variant="outline">Blog Post</Badge>
                  <Badge variant="outline">~2000 words</Badge>
                </div>
                <Button variant="gradient"><Sparkles className="mr-2 h-4 w-4" /> Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="mt-4">
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">SEO Score: {post.seoScore} | Views: {post.views} | {post.date}</p>
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

        <TabsContent value="history" className="mt-4">
          <Card className="p-8 text-center text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Your AI generation history will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
