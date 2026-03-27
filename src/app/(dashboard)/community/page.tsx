"use client";

import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Eye, Pin, CheckCircle2, Plus, Search, Award, Share2, Flag, Bookmark, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const posts = [
  { id: "1", title: "How to integrate AI agents with the marketplace?", author: "Alex K.", avatar: "AK", replies: 12, views: 234, likes: 45, isPinned: true, isSolved: true, category: "Help", time: "2h ago", content: "I'm trying to connect my custom AI agent to the marketplace API. Has anyone done this before? I need guidance on authentication and rate limits." },
  { id: "2", title: "RFC: New plugin architecture proposal", author: "Maria R.", avatar: "MR", replies: 28, views: 567, likes: 89, isPinned: true, isSolved: false, category: "RFC", time: "1d ago", content: "I'd like to propose a new plugin system that allows third-party developers to extend NEXUS OS functionality. Here's the detailed architecture..." },
  { id: "3", title: "Show HN: Built a portfolio with NEXUS OS builder", author: "Jake M.", avatar: "JM", replies: 8, views: 156, likes: 34, isPinned: false, isSolved: false, category: "Show & Tell", time: "3h ago", content: "Check out this portfolio site I built using the NEXUS OS page builder. Took me only 2 hours from start to finish!" },
  { id: "4", title: "Best practices for Web3 DAO governance?", author: "Sarah L.", avatar: "SL", replies: 15, views: 312, likes: 52, isPinned: false, isSolved: true, category: "Discussion", time: "5h ago", content: "Our team is setting up a DAO for community governance. What are the best practices for proposal creation and voting mechanisms?" },
  { id: "5", title: "Bug: Knowledge graph crashes on large datasets", author: "Dev P.", avatar: "DP", replies: 6, views: 89, likes: 12, isPinned: false, isSolved: false, category: "Bug Report", time: "12h ago", content: "When loading more than 500 nodes, the knowledge graph visualization crashes. Browser console shows a memory allocation error." },
  { id: "6", title: "Tutorial: Setting up CI/CD with NEXUS DevOps", author: "John D.", avatar: "JD", replies: 19, views: 445, likes: 78, isPinned: false, isSolved: false, category: "Tutorial", time: "1d ago", content: "Step-by-step guide on configuring your CI/CD pipeline using the built-in DevOps tools in NEXUS OS." },
  { id: "7", title: "Monthly Community Call - March 2025 Recap", author: "Lisa W.", avatar: "LW", replies: 32, views: 890, likes: 120, isPinned: false, isSolved: false, category: "Announcement", time: "2d ago", content: "Thanks everyone for joining the March community call! Here's a summary of what we discussed and upcoming milestones." },
];

const topContributors = [
  { name: "Alex K.", avatar: "AK", posts: 45, solved: 23, reputation: 1250, badge: "Expert" },
  { name: "Maria R.", avatar: "MR", posts: 38, solved: 18, reputation: 1100, badge: "Expert" },
  { name: "Dev P.", avatar: "DP", posts: 32, solved: 15, reputation: 950, badge: "Pro" },
  { name: "Sarah L.", avatar: "SL", posts: 28, solved: 12, reputation: 800, badge: "Pro" },
  { name: "Jake M.", avatar: "JM", posts: 22, solved: 8, reputation: 650, badge: "Rising Star" },
];

const categoryList = ["Help", "Discussion", "RFC", "Show & Tell", "Bug Report", "Tutorial", "Announcement"];

export default function CommunityPage() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Connect, discuss, and build with the NEXUS OS community</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>Start a new discussion in the community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2"><Label>Title</Label><Input placeholder="What's on your mind?" /></div>
              <div className="space-y-2"><Label>Category</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categoryList.map((c) => <SelectItem key={c} value={c.toLowerCase().replace(/[& ]/g, "-")}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Content</Label><Textarea placeholder="Share your thoughts, questions, or ideas..." className="min-h-[150px]" /></div>
              <div className="space-y-2"><Label>Tags (optional)</Label><Input placeholder="react, ai, web3" /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setCreateOpen(false)}>Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Members</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12,450</div><p className="text-xs text-green-500">+234 this week</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Discussions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Solved Questions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-500">2,145</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Posts This Week</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
      </div>

      <Tabs defaultValue="latest">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search discussions..." className="pl-9" />
                </div>
              </div>

              {selectedPost ? (
                <div className="space-y-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>&larr; Back to discussions</Button>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{selectedPost.avatar}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {selectedPost.isPinned && <Pin className="h-4 w-4 text-amber-500" />}
                            {selectedPost.isSolved && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                            <h2 className="text-lg font-semibold">{selectedPost.title}</h2>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>{selectedPost.author}</span>
                            <span>&middot;</span>
                            <span>{selectedPost.time}</span>
                            <Badge variant="outline" className="text-xs">{selectedPost.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{selectedPost.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm"><ThumbsUp className="mr-1 h-4 w-4" />{selectedPost.likes}</Button>
                        <Button variant="ghost" size="sm"><Bookmark className="mr-1 h-4 w-4" /> Save</Button>
                        <Button variant="ghost" size="sm"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
                        <Button variant="ghost" size="sm"><Flag className="mr-1 h-4 w-4" /> Report</Button>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="font-medium">{selectedPost.replies} Replies</h3>
                        {[
                          { user: "Dev P.", avatar: "DP", text: "Great question! I've done this before. You need to use the OAuth2 flow with the marketplace API.", time: "1h ago", likes: 8 },
                          { user: "Sarah L.", avatar: "SL", text: "I wrote a tutorial about this last week. Check it out in the tutorials section!", time: "45min ago", likes: 5 },
                        ].map((reply, i) => (
                          <div key={i} className="flex items-start gap-3 pl-4 border-l-2 border-muted">
                            <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{reply.avatar}</AvatarFallback></Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{reply.user}</span>
                                <span className="text-xs text-muted-foreground">{reply.time}</span>
                              </div>
                              <p className="text-sm mt-1">{reply.text}</p>
                              <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs"><ThumbsUp className="mr-1 h-3 w-3" />{reply.likes}</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Input placeholder="Write a reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1" />
                        <Button variant="gradient" size="icon"><Send className="h-4 w-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedPost(post)}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.avatar}</AvatarFallback></Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {post.isPinned && <Pin className="h-3 w-3 text-amber-500 shrink-0" />}
                            {post.isSolved && <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />}
                            <h3 className="font-medium text-sm truncate">{post.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{post.author} &middot; {post.time}</p>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Categories</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {categoryList.map((cat) => (
                    <div key={cat} className="flex items-center justify-between text-sm hover:bg-muted/50 rounded p-1.5 cursor-pointer">
                      <span>{cat}</span>
                      <Badge variant="secondary" className="text-xs">{posts.filter(p => p.category === cat).length}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Trending Tags</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {["AI", "Web3", "React", "TypeScript", "DevOps", "GraphQL", "DAO", "NFT", "Marketplace", "CI/CD"].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-4 space-y-3">
          {[...posts].sort((a, b) => b.likes - a.likes).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedPost(post)}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.avatar}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {post.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                    {post.isSolved && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.author} &middot; {post.time}</p>
                </div>
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-amber-500 font-medium"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unanswered" className="mt-4 space-y-3">
          {posts.filter(p => !p.isSolved).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all cursor-pointer border-amber-500/20" onClick={() => setSelectedPost(post)}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{post.avatar}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm truncate">{post.title}</h3>
                    <Badge variant="warning" className="text-xs">Needs Answer</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.author} &middot; {post.time}</p>
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

        <TabsContent value="contributors" className="mt-4 space-y-3">
          {topContributors.map((contributor, i) => (
            <Card key={contributor.name} className="hover:shadow-md transition-all">
              <CardContent className="flex items-center gap-4 p-4">
                <span className={`text-lg font-bold w-8 text-center ${i < 3 ? "text-amber-500" : "text-muted-foreground"}`}>#{i + 1}</span>
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{contributor.avatar}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{contributor.name}</h3>
                    <Badge variant={contributor.badge === "Expert" ? "info" : contributor.badge === "Pro" ? "success" : "secondary"} className="text-xs">{contributor.badge}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{contributor.posts} posts</span>
                    <span>{contributor.solved} solved</span>
                    <span className="flex items-center gap-1"><Award className="h-3 w-3" />{contributor.reputation} rep</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
