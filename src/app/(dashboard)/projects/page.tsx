"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  FolderKanban,
  LayoutGrid,
  List,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { defaultWorkflow } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import type { Project } from "@/types";

type ProjectForm = {
  name: string;
  description: string;
  visibility: Project["visibility"];
  tags: string;
};

const initialForm: ProjectForm = {
  name: "",
  description: "",
  visibility: "private",
  tags: "",
};

export default function ProjectsPage() {
  const projects = useAppStore((state) => state.projects);
  const addProject = useAppStore((state) => state.addProject);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id ?? null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(initialForm);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const text = `${project.name} ${project.description} ${project.tags.join(" ")}`.toLowerCase();
      const matchesQuery = text.includes(query.trim().toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [projects, query, statusFilter]);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0] ?? null;
  const totalTasks = projects.reduce((sum, project) => sum + project.metadata.totalTasks, 0);
  const totalCompleted = projects.reduce((sum, project) => sum + project.metadata.completedTasks, 0);

  function createProject() {
    const name = form.name.trim();
    if (!name) {
      return;
    }

    const projectId = `project-${Date.now()}`;
    const now = new Date().toISOString();

    addProject({
      id: projectId,
      ownerId: "user-1",
      name,
      description: form.description.trim() || "New workspace initiative created from the project planner.",
      status: "active",
      settings: {
        defaultView: "kanban",
        sprintsEnabled: true,
        estimationType: "story_points",
        workflow: defaultWorkflow,
      },
      metadata: {
        totalTasks: 0,
        completedTasks: 0,
        totalMembers: 1,
        lastActivity: now,
      },
      tasks: [],
      members: [{ userId: "user-1", role: "owner", joinedAt: now }],
      createdAt: now,
      updatedAt: now,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      visibility: form.visibility,
    });

    setSelectedProjectId(projectId);
    setForm(initialForm);
    setCreateOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Track execution across your workspace instead of isolated mock modules.</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Name</Label>
                <Input
                  id="project-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Creator onboarding revamp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="What outcome does this project own?"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select
                    value={form.visibility}
                    onValueChange={(value: Project["visibility"]) => setForm((current) => ({ ...current, visibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-tags">Tags</Label>
                  <Input
                    id="project-tags"
                    value={form.tags}
                    onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                    placeholder="AI, Launch, Growth"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={createProject}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Portfolio Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length} projects</div>
            <Progress value={(totalCompleted / Math.max(totalTasks, 1)) * 100} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground">{totalTasks - totalCompleted} tasks still open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Workstreams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((project) => project.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Connected to the shared dashboard and notifications feed</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Project["status"] | "all")}>
          <SelectTrigger className="w-full lg:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex rounded-md border">
          <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className={view === "grid" ? "grid gap-4 md:grid-cols-2 xl:col-span-3" : "space-y-4 xl:col-span-3"}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-all hover:border-violet-500/50 hover:shadow-lg ${
                selectedProject?.id === project.id ? "border-violet-500/60 bg-violet-500/5" : ""
              }`}
              onClick={() => setSelectedProjectId(project.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Badge variant={project.status === "active" ? "success" : project.status === "paused" ? "warning" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Progress value={(project.metadata.completedTasks / Math.max(project.metadata.totalTasks, 1)) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {project.metadata.completedTasks}/{project.metadata.totalTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FolderKanban className="h-3 w-3" />
                    {project.metadata.totalTasks} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.members.length} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="xl:col-span-2">
          {selectedProject ? (
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>{selectedProject.name}</CardTitle>
                    <CardDescription>{selectedProject.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{selectedProject.visibility}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="text-xl font-bold">{selectedProject.metadata.totalTasks}</div>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="text-xl font-bold">{selectedProject.metadata.completedTasks}</div>
                    <p className="text-xs text-muted-foreground">Done</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="text-xl font-bold">{selectedProject.members.length}</div>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Task breakdown</h3>
                  {["backlog", "todo", "in_progress", "in_review", "done"].map((status) => {
                    const count = selectedProject.tasks.filter((task) => task.status === status).length;
                    const label = status.replace("_", " ");
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{label}</span>
                          <span>{count}</span>
                        </div>
                        <Progress value={(count / Math.max(selectedProject.tasks.length, 1)) * 100} className="h-2" />
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Live task list</h3>
                  {selectedProject.tasks.length ? (
                    selectedProject.tasks.map((task) => (
                      <div key={task.id} className="rounded-2xl border border-border/60 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge variant="outline">{task.priority}</Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Status: {task.status.replace("_", " ")}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">This project has no tasks yet. Create the project and start from a clean slate.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">No projects match the current filters.</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
