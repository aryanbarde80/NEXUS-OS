"use client";

import React, { useState } from "react";
import { Plus, Filter, Search, GripVertical, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const columns = [
  { id: "backlog", title: "Backlog", color: "bg-gray-500" },
  { id: "todo", title: "To Do", color: "bg-blue-500" },
  { id: "in_progress", title: "In Progress", color: "bg-yellow-500" },
  { id: "in_review", title: "In Review", color: "bg-purple-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

const tasks = [
  { id: "1", title: "Design landing page wireframes", status: "in_progress", priority: "high", assignee: "JD", comments: 3, dueDate: "Mar 28" },
  { id: "2", title: "Implement user authentication API", status: "todo", priority: "critical", assignee: "AK", comments: 5, dueDate: "Mar 25" },
  { id: "3", title: "Write unit tests for payment module", status: "in_review", priority: "medium", assignee: "MR", comments: 2, dueDate: "Mar 30" },
  { id: "4", title: "Set up CI/CD pipeline", status: "done", priority: "high", assignee: "JD", comments: 1, dueDate: "Mar 20" },
  { id: "5", title: "Database schema optimization", status: "backlog", priority: "low", assignee: "AK", comments: 0, dueDate: "Apr 5" },
  { id: "6", title: "Integrate Stripe payments", status: "in_progress", priority: "critical", assignee: "MR", comments: 7, dueDate: "Mar 27" },
  { id: "7", title: "Mobile responsive fixes", status: "todo", priority: "medium", assignee: "JD", comments: 2, dueDate: "Apr 1" },
  { id: "8", title: "API rate limiting implementation", status: "backlog", priority: "high", assignee: "AK", comments: 0, dueDate: "Apr 10" },
];

const priorityColors: Record<string, string> = {
  critical: "text-red-500 bg-red-500/10 border-red-500/20",
  high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  low: "text-blue-500 bg-blue-500/10 border-blue-500/20",
};

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("board");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage tasks across all projects</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Task</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-9" />
        </div>
        <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="mt-4">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnTasks = tasks.filter((t) => t.status === column.id);
              return (
                <div key={column.id} className="min-w-[280px] flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${column.color}`} />
                    <h3 className="text-sm font-medium">{column.title}</h3>
                    <Badge variant="secondary" className="ml-auto">{columnTasks.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {columnTasks.map((task) => (
                      <Card key={task.id} className="cursor-pointer hover:shadow-md transition-all group">
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <GripVertical className="h-4 w-4 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-sm font-medium flex-1">{task.title}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className={priorityColors[task.priority]}>{task.priority}</Badge>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{task.comments}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{task.dueDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">{task.assignee}</AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="ghost" className="w-full border-dashed border" size="sm">
                      <Plus className="mr-1 h-3 w-3" /> Add task
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
                    <input type="checkbox" className="rounded" defaultChecked={task.status === "done"} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                    </div>
                    <Badge variant="outline" className={priorityColors[task.priority]}>{task.priority}</Badge>
                    <Badge variant="secondary">{task.status.replace("_", " ")}</Badge>
                    <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">{task.assignee}</AvatarFallback></Avatar>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <div className="grid grid-cols-[200px_1fr] gap-4 text-xs text-muted-foreground border-b pb-2 mb-2">
                  <span className="font-medium">Task</span>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Mar 20", "Mar 22", "Mar 24", "Mar 26", "Mar 28", "Mar 30", "Apr 1"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </div>
                {tasks.map((task) => {
                  const startCol = Math.max(0, Math.min(6, ["backlog", "todo", "in_progress", "in_review", "done"].indexOf(task.status)));
                  const width = task.status === "done" ? 7 - startCol : Math.max(1, 3 - startCol + 1);
                  return (
                    <div key={task.id} className="grid grid-cols-[200px_1fr] gap-4 items-center py-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <Badge variant="outline" className={`${priorityColors[task.priority]} shrink-0 text-[10px]`}>{task.priority[0].toUpperCase()}</Badge>
                        <span className="text-sm truncate">{task.title}</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 h-7">
                        <div
                          className={`rounded-md ${task.status === "done" ? "bg-green-500/30 border border-green-500/50" : task.priority === "critical" ? "bg-red-500/30 border border-red-500/50" : "bg-violet-500/30 border border-violet-500/50"}`}
                          style={{ gridColumn: `${startCol + 1} / span ${Math.min(width, 7 - startCol)}` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
