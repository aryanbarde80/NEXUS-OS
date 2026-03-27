"use client";

import React from "react";
import { MessageSquare, ThumbsUp, Eye, Pin, CheckCircle2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const posts = [
  { id: "1", title: "How to integrate AI agents with the marketplace?", author: "Alex K.", replies: 12, views: 234, likes: 45, isPinned: true, isSolved: true, category: "Help", time: "2h ago" },
  { id: "2", title: "RFC: New plugin architecture proposal", author: "Maria R.", replies: 28, views: 567, likes: 89, isPinned: true, isSolved: false, category: "RFC", time: "1d ago" },
  { id: "3", title: "Show HN: Built a portfolio with NEXUS OS builder", author: "Jake M.", replies: 8, views: 156, likes: 34, isPinned: false, isSolved: false, category: "Show & Tell", time: "3h ago" },
  { id: "4", title: "Best practices for Web3 DAO governance?", author: "Sarah L.", replies: 15, views: 312, likes: 52, isPinned: false, isSolved: true, category: "Discussion", time: "5h ago" },
  { id: "5", title: "Bug: Knowledge graph crashes on large datasets", author: "Dev P.", replies: 6, views: 89, likes: 12, isPinned: false, isSolved: false, category: "Bug Report", time: "12h ago" },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Connect, discuss, and build with the NEXUS OS community</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Post</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Members</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12,450</div><p className="text-xs text-green-500">+234 this week</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Discussions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Solved Questions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2,145</div></CardContent></Card>
      </div>

      <Tabs defaultValue="latest">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>
        <TabsContent value="latest" className="mt-4 space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.author.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {post.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                    {post.isSolved && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.author} - {post.time}</p>
                </div>
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="popular" className="mt-4 space-y-3">
          {[...posts].sort((a, b) => b.likes - a.likes).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.author.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {post.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                    {post.isSolved && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.author} - {post.time}</p>
                </div>
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-medium"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="unanswered" className="mt-4 space-y-3">
          {posts.filter(p => !p.isSolved).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer border-amber-500/20">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.author.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm truncate">{post.title}</h3>
                    <Badge variant="warning" className="text-xs">Needs Answer</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.author} - {post.time}</p>
                </div>
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
