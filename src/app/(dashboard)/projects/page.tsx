"use client";

import React, { useState } from "react";
import {
  Plus, Search, LayoutGrid, List, Filter, FolderKanban, MoreVertical,
  Users, Calendar, CheckSquare, ArrowUpRight, Star, Archive,
  Trash2, Copy, Edit, Eye, GitBranch, Zap, Target, BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const projects = [
  { id: "1", name: "E-Commerce Platform", description: "Full-stack e-commerce solution with AI recommendations engine, payment processing, and inventory management", status: "active", progress: 72, tasks: 45, completedTasks: 32, members: 5, dueDate: "2025-04-15", tags: ["React", "Node.js", "AI"], priority: "high", sprint: "Sprint 4", budget: 15000, spent: 10800 },
  { id: "2", name: "Mobile App Redesign", description: "Complete UI/UX overhaul for iOS and Android apps with modern design system", status: "active", progress: 45, tasks: 28, completedTasks: 13, members: 3, dueDate: "2025-05-01", tags: ["React Native", "Figma"], priority: "medium", sprint: "Sprint 2", budget: 8000, spent: 3600 },
  { id: "3", name: "AI Chatbot Integration", description: "LangChain-powered chatbot for customer support with multi-language capabilities", status: "active", progress: 89, tasks: 15, completedTasks: 13, members: 2, dueDate: "2025-03-30", tags: ["LangChain", "GPT-4"], priority: "critical", sprint: "Sprint 6", budget: 12000, spent: 10680 },
  { id: "4", name: "Marketing Dashboard", description: "Real-time analytics dashboard for marketing team with campaign tracking", status: "paused", progress: 30, tasks: 20, completedTasks: 6, members: 4, dueDate: "2025-06-15", tags: ["Next.js", "D3.js"], priority: "low", sprint: "Sprint 1", budget: 6000, spent: 1800 },
  { id: "5", name: "Blockchain Voting", description: "Decentralized voting system for DAO governance with smart contract auditing", status: "active", progress: 15, tasks: 35, completedTasks: 5, members: 6, dueDate: "2025-07-01", tags: ["Solidity", "Web3"], priority: "high", sprint: "Sprint 1", budget: 20000, spent: 3000 },
  { id: "6", name: "Content CMS", description: "Headless CMS with AI content generation and multi-tenant support", status: "archived", progress: 100, tasks: 50, completedTasks: 50, members: 3, dueDate: "2025-02-28", tags: ["GraphQL", "AI"], priority: "medium", sprint: "Completed", budget: 10000, spent: 10000 },
  { id: "7", name: "DevOps Pipeline", description: "CI/CD automation with Docker, Kubernetes orchestration, and monitoring", status: "active", progress: 55, tasks: 22, completedTasks: 12, members: 2, dueDate: "2025-05-20", tags: ["Docker", "K8s", "GitHub Actions"], priority: "high", sprint: "Sprint 3", budget: 5000, spent: 2750 },
  { id: "8", name: "API Gateway", description: "GraphQL Federation gateway with rate limiting, caching, and auth middleware", status: "active", progress: 68, tasks: 18, completedTasks: 12, members: 3, dueDate: "2025-04-10", tags: ["GraphQL", "Node.js"], priority: "critical", sprint: "Sprint 5", budget: 7000, spent: 4760 },
];

const sprints = [
  { id: "s1", name: "Sprint 6", goal: "Complete chatbot MVP and deploy to staging", startDate: "Mar 18", endDate: "Mar 31", status: "active", tasks: 15, completed: 13, points: 42, velocity: 38 },
  { id: "s2", name: "Sprint 5", goal: "API Gateway core features and performance testing", startDate: "Mar 4", endDate: "Mar 17", status: "completed", tasks: 18, completed: 18, points: 55, velocity: 55 },
  { id: "s3", name: "Sprint 4", goal: "E-commerce payment integration and checkout flow", startDate: "Feb 18", endDate: "Mar 3", status: "completed", tasks: 20, completed: 20, points: 48, velocity: 48 },
];

const teamMembers = [
  { initials: "JD", name: "John Doe", role: "Lead Developer", projects: 4, tasks: 12 },
  { initials: "AK", name: "Alex Kim", role: "Backend Engineer", projects: 3, tasks: 8 },
  { initials: "MR", name: "Maria Rodriguez", role: "Frontend Developer", projects: 3, tasks: 10 },
  { initials: "SK", name: "Sarah Kim", role: "DevOps Engineer", projects: 2, tasks: 6 },
  { initials: "LM", name: "Liam Murphy", role: "UI/UX Designer", projects: 2, tasks: 5 },
  { initials: "DP", name: "Dev Patel", role: "Full Stack Dev", projects: 3, tasks: 9 },
];

const priorityColors: Record<string, string> = {
  critical: "text-red-500 bg-red-500/10 border-red-500/20",
  high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  low: "text-blue-500 bg-blue-500/10 border-blue-500/20",
};

const templates = [
  { name: "SaaS Starter", desc: "Full-stack SaaS with auth, billing, and dashboard", tasks: 45 },
  { name: "E-Commerce", desc: "Online store with cart, payments, and inventory", tasks: 60 },
  { name: "Mobile App", desc: "React Native app with backend API", tasks: 35 },
  { name: "Landing Page", desc: "Marketing landing page with analytics", tasks: 15 },
  { name: "API Service", desc: "REST/GraphQL API with documentation", tasks: 25 },
  { name: "Blank Project", desc: "Start from scratch", tasks: 0 },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = statusFilter === "all" ? projects : projects.filter(p => p.status === statusFilter);
  const totalTasks = projects.reduce((s, p) => s + p.tasks, 0);
  const completedTasks = projects.reduce((s, p) => s + p.completedTasks, 0);
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new project from scratch or use a template</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="blank" className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blank">Blank Project</TabsTrigger>
                <TabsTrigger value="template">From Template</TabsTrigger>
              </TabsList>
              <TabsContent value="blank" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Project Name</Label><Input placeholder="My Awesome Project" /></div>
                  <div className="space-y-2"><Label>Visibility</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select visibility" /></SelectTrigger>
                      <SelectContent><SelectItem value="public">Public</SelectItem><SelectItem value="private">Private</SelectItem><SelectItem value="team">Team Only</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe your project..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Due Date</Label><Input type="date" /></div>
                  <div className="space-y-2"><Label>Priority</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                      <SelectContent><SelectItem value="critical">Critical</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Tags (comma separated)</Label><Input placeholder="React, TypeScript, AI" /></div>
              </TabsContent>
              <TabsContent value="template" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((t) => (
                    <Card key={t.name} className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{t.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                        {t.tasks > 0 && <Badge variant="secondary" className="mt-2 text-xs">{t.tasks} tasks</Badge>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setCreateOpen(false)}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle><FolderKanban className="h-4 w-4 text-violet-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{projects.length}</div><p className="text-xs text-muted-foreground">{projects.filter(p => p.status === "active").length} active</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Task Completion</CardTitle><CheckSquare className="h-4 w-4 text-cyan-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div><Progress value={(completedTasks / totalTasks) * 100} className="h-1.5 mt-2" /></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle><Users className="h-4 w-4 text-green-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{teamMembers.length}</div><p className="text-xs text-muted-foreground">across {projects.length} projects</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Budget Used</CardTitle><BarChart3 className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">${(totalSpent / 1000).toFixed(1)}k</div><p className="text-xs text-muted-foreground">of ${(totalBudget / 1000).toFixed(1)}k total</p></CardContent></Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")}><LayoutGrid className="h-4 w-4" /></Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
            </div>
          </div>

          {selectedProject ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)}>&larr; Back to projects</Button>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div><CardTitle className="text-xl">{selectedProject.name}</CardTitle><CardDescription className="mt-1">{selectedProject.description}</CardDescription></div>
                        <div className="flex gap-2">
                          <Badge variant={selectedProject.status === "active" ? "success" : selectedProject.status === "paused" ? "warning" : "secondary"}>{selectedProject.status}</Badge>
                          <Badge variant="outline" className={priorityColors[selectedProject.priority]}>{selectedProject.priority}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div><div className="text-2xl font-bold">{selectedProject.completedTasks}/{selectedProject.tasks}</div><p className="text-xs text-muted-foreground">Tasks</p></div>
                        <div><div className="text-2xl font-bold">{selectedProject.progress}%</div><p className="text-xs text-muted-foreground">Progress</p></div>
                        <div><div className="text-2xl font-bold">{selectedProject.members}</div><p className="text-xs text-muted-foreground">Members</p></div>
                        <div><div className="text-lg font-bold">{selectedProject.sprint}</div><p className="text-xs text-muted-foreground">Current Sprint</p></div>
                      </div>
                      <Progress value={selectedProject.progress} className="h-3" />
                      <div className="flex gap-2 flex-wrap">{selectedProject.tags.map((tag) => (<Badge key={tag} variant="outline">{tag}</Badge>))}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Task Breakdown</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { label: "Backlog", count: 3, color: "bg-gray-500" },
                          { label: "To Do", count: Math.max(0, selectedProject.tasks - selectedProject.completedTasks - 5), color: "bg-blue-500" },
                          { label: "In Progress", count: 3, color: "bg-yellow-500" },
                          { label: "In Review", count: 2, color: "bg-purple-500" },
                          { label: "Done", count: selectedProject.completedTasks, color: "bg-green-500" },
                        ].map((s) => (
                          <div key={s.label} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${s.color}`} />
                            <span className="text-sm w-24">{s.label}</span>
                            <Progress value={(s.count / selectedProject.tasks) * 100} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground w-8 text-right">{s.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { action: "completed task", detail: "Implement payment webhook handler", user: "JD", time: "2h ago" },
                          { action: "created PR", detail: "feat: add product recommendation engine", user: "AK", time: "4h ago" },
                          { action: "commented on", detail: "Database migration strategy", user: "MR", time: "6h ago" },
                          { action: "moved to review", detail: "User authentication refactor", user: "JD", time: "1d ago" },
                          { action: "assigned to", detail: "Performance optimization", user: "SK", time: "1d ago" },
                        ].map((a, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <Avatar className="h-6 w-6"><AvatarFallback className="text-xs bg-primary/10 text-primary">{a.user}</AvatarFallback></Avatar>
                            <span className="text-muted-foreground">{a.action}</span>
                            <span className="font-medium truncate flex-1">{a.detail}</span>
                            <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Due Date</span><span>{selectedProject.dueDate}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Priority</span><Badge variant="outline" className={priorityColors[selectedProject.priority]}>{selectedProject.priority}</Badge></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Budget</span><span>${selectedProject.budget.toLocaleString()}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Spent</span><span>${selectedProject.spent.toLocaleString()}</span></div>
                      <Progress value={(selectedProject.spent / selectedProject.budget) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Team Members</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {teamMembers.slice(0, selectedProject.members).map((m) => (
                        <div key={m.initials} className="flex items-center gap-2">
                          <Avatar className="h-7 w-7"><AvatarFallback className="text-xs bg-primary/10 text-primary">{m.initials}</AvatarFallback></Avatar>
                          <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{m.name}</p><p className="text-xs text-muted-foreground">{m.role}</p></div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-2"><Plus className="mr-1 h-3 w-3" /> Add Member</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start"><GitBranch className="mr-2 h-4 w-4" /> View Repository</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><Zap className="mr-2 h-4 w-4" /> Run AI Analysis</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><Target className="mr-2 h-4 w-4" /> Set Milestones</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start"><BarChart3 className="mr-2 h-4 w-4" /> View Analytics</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className={view === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
              {filtered.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-all cursor-pointer group" onClick={() => setSelectedProject(project)}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{project.name}</CardTitle>
                      <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem><Star className="mr-2 h-4 w-4" /> Favorite</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Archive className="mr-2 h-4 w-4" /> Archive</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><FolderKanban className="h-3 w-3" />{project.completedTasks}/{project.tasks} tasks</div>
                      <div className="flex items-center gap-1"><Users className="h-3 w-3" />{project.members}</div>
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{project.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant={project.status === "active" ? "success" : project.status === "paused" ? "warning" : "secondary"}>{project.status}</Badge>
                      <Badge variant="outline" className={priorityColors[project.priority] + " text-xs"}>{project.priority}</Badge>
                      {project.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex -space-x-1">
                        {teamMembers.slice(0, Math.min(project.members, 3)).map((m) => (
                          <Avatar key={m.initials} className="h-5 w-5 border border-background"><AvatarFallback className="text-[8px] bg-primary/10 text-primary">{m.initials}</AvatarFallback></Avatar>
                        ))}
                        {project.members > 3 && <span className="ml-1 text-muted-foreground">+{project.members - 3}</span>}
                      </div>
                      <span className="text-muted-foreground">{project.sprint}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sprints" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sprint Management</h2>
            <Button variant="gradient" size="sm"><Plus className="mr-2 h-4 w-4" /> New Sprint</Button>
          </div>
          {sprints.map((sprint) => (
            <Card key={sprint.id} className="hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{sprint.name}</h3>
                    <Badge variant={sprint.status === "active" ? "success" : "secondary"}>{sprint.status}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{sprint.startDate} - {sprint.endDate}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{sprint.goal}</p>
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center"><div className="text-lg font-bold">{sprint.completed}/{sprint.tasks}</div><p className="text-xs text-muted-foreground">Tasks</p></div>
                  <div className="text-center"><div className="text-lg font-bold">{sprint.points}</div><p className="text-xs text-muted-foreground">Story Points</p></div>
                  <div className="text-center"><div className="text-lg font-bold">{sprint.velocity}</div><p className="text-xs text-muted-foreground">Velocity</p></div>
                  <div className="text-center"><div className="text-lg font-bold">{Math.round((sprint.completed / sprint.tasks) * 100)}%</div><p className="text-xs text-muted-foreground">Complete</p></div>
                </div>
                <Progress value={(sprint.completed / sprint.tasks) * 100} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <Button variant="gradient" size="sm"><Plus className="mr-2 h-4 w-4" /> Invite Member</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.initials} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <Avatar className="h-12 w-12"><AvatarFallback className="bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-primary font-semibold">{member.initials}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><FolderKanban className="h-3 w-3" />{member.projects} projects</span>
                      <span className="flex items-center gap-1"><CheckSquare className="h-3 w-3" />{member.tasks} tasks</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"><ArrowUpRight className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
