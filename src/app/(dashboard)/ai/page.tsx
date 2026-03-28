"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  Eye,
  FileText,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createGeneratedPost } from "@/lib/mock-data";
import { useAIStore, useAppStore } from "@/lib/store";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-5.4");
  const [search, setSearch] = useState("");
  const blogPosts = useAIStore((state) => state.blogPosts);
  const addBlogPost = useAIStore((state) => state.addBlogPost);
  const isGenerating = useAIStore((state) => state.isGenerating);
  const setIsGenerating = useAIStore((state) => state.setIsGenerating);
  const addNotification = useAppStore((state) => state.addNotification);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const haystack = `${post.title} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [blogPosts, search]);

  const publishedPosts = blogPosts.filter((post) => post.status === "published");
  const avgSeo = Math.round(blogPosts.reduce((sum, post) => sum + post.seoScore, 0) / Math.max(blogPosts.length, 1));
  const latestDraft = blogPosts[0];

  function handleGenerate() {
    setIsGenerating(true);
    const newPost = createGeneratedPost(prompt);
    addBlogPost(newPost);
    addNotification({
      id: `notif-ai-${Date.now()}`,
      userId: "user-1",
      type: "agent_completed",
      title: "AI draft generated",
      content: `${newPost.title} is ready in the content queue using ${selectedModel}.`,
      metadata: { postId: newPost.id, model: selectedModel },
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/ai",
    });
    setPrompt("");
    setIsGenerating(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Studio</h1>
        <p className="text-muted-foreground">Generate content that lands directly in the workspace instead of a disconnected placeholder UI.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total drafts", value: blogPosts.length },
          { label: "Published posts", value: publishedPosts.length },
          { label: "Average SEO", value: `${avgSeo}%` },
          { label: "Generating", value: isGenerating ? "Yes" : "No" },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="library">Draft Library</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Draft Generator</CardTitle>
              <CardDescription>Turn an idea into a structured draft and keep it in the shared content queue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[160px]"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Write a launch post explaining how NEXUS OS connects projects, AI output, and domain research."
              />
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-5.4">GPT-5.4</SelectItem>
                      <SelectItem value="gpt-5.4-mini">GPT-5.4 Mini</SelectItem>
                      <SelectItem value="claude-3.7">Claude 3.7</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="outline">Workspace draft mode</Badge>
                </div>
                <Button variant="gradient" onClick={handleGenerate} disabled={!prompt.trim() || isGenerating}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Draft"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                Latest Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestDraft ? (
                <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/20 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{latestDraft.title}</p>
                      <p className="text-xs text-muted-foreground">{latestDraft.excerpt}</p>
                    </div>
                    <Badge variant={latestDraft.status === "published" ? "success" : "secondary"}>{latestDraft.status}</Badge>
                  </div>
                  <div className="whitespace-pre-wrap text-sm text-muted-foreground">{latestDraft.content}</div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Generate your first draft to populate the workspace library.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search drafts" />
            </div>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> New brief
            </Button>
          </div>

          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
                  <div className="flex items-start gap-3 lg:flex-1">
                    <FileText className="mt-1 h-5 w-5 text-violet-400" />
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.excerpt}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                    <span>SEO {post.seoScore}</span>
                    <Badge variant={post.status === "published" ? "success" : post.status === "scheduled" ? "info" : "secondary"}>
                      {post.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO and publishing health</CardTitle>
              <CardDescription>Quick read on how strong the current library is.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{post.title}</span>
                    <span>{post.seoScore}%</span>
                  </div>
                  <Progress value={post.seoScore} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
