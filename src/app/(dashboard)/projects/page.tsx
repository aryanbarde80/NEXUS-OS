"use client";

import React, { useState } from "react";
import { Plus, Search, LayoutGrid, List, Filter, FolderKanban, MoreVertical, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  { id: "1", name: "E-Commerce Platform", description: "Full-stack e-commerce solution with AI recommendations", status: "active", progress: 72, tasks: 45, members: 5, dueDate: "2025-04-15", tags: ["React", "Node.js", "AI"] },
  { id: "2", name: "Mobile App Redesign", description: "Complete UI/UX overhaul for iOS and Android apps", status: "active", progress: 45, tasks: 28, members: 3, dueDate: "2025-05-01", tags: ["React Native", "Figma"] },
  { id: "3", name: "AI Chatbot Integration", description: "LangChain-powered chatbot for customer support", status: "active", progress: 89, tasks: 15, members: 2, dueDate: "2025-03-30", tags: ["LangChain", "GPT-4"] },
  { id: "4", name: "Marketing Dashboard", description: "Real-time analytics dashboard for marketing team", status: "paused", progress: 30, tasks: 20, members: 4, dueDate: "2025-06-15", tags: ["Next.js", "D3.js"] },
  { id: "5", name: "Blockchain Voting", description: "Decentralized voting system for DAO governance", status: "active", progress: 15, tasks: 35, members: 6, dueDate: "2025-07-01", tags: ["Solidity", "Web3"] },
  { id: "6", name: "Content CMS", description: "Headless CMS with AI content generation", status: "archived", progress: 100, tasks: 50, members: 3, dueDate: "2025-02-28", tags: ["GraphQL", "AI"] },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        <div className="flex border rounded-md">
          <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className={view === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Progress value={project.progress} className="h-2 flex-1" />
                <span className="text-xs font-medium">{project.progress}%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><FolderKanban className="h-3 w-3" />{project.tasks} tasks</div>
                <div className="flex items-center gap-1"><Users className="h-3 w-3" />{project.members} members</div>
                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{project.dueDate}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant={project.status === "active" ? "success" : project.status === "paused" ? "warning" : "secondary"}>{project.status}</Badge>
                {project.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
