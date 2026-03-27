"use client";

import React from "react";
import { Plus, Search, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const nodes = [
  { id: "1", label: "NEXUS OS", type: "project", connections: 12 },
  { id: "2", label: "React", type: "technology", connections: 8 },
  { id: "3", label: "AI/ML", type: "technology", connections: 6 },
  { id: "4", label: "Web3", type: "technology", connections: 4 },
  { id: "5", label: "Marketing", type: "document", connections: 5 },
  { id: "6", label: "John Doe", type: "user", connections: 7 },
];

const typeColors: Record<string, string> = {
  project: "bg-violet-500", technology: "bg-cyan-500", user: "bg-green-500",
  document: "bg-amber-500", domain: "bg-blue-500", task: "bg-pink-500",
};

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Graph</h1>
          <p className="text-muted-foreground">Visualize connections between projects, people, and ideas</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add Node</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="h-[600px] relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search nodes..." className="pl-9 w-64 bg-background/80 backdrop-blur" />
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur"><ZoomIn className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur"><ZoomOut className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur"><Maximize2 className="h-4 w-4" /></Button>
            </div>
            <CardContent className="h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold animate-pulse">N</div>
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = (i * 60 * Math.PI) / 180;
                      const x = Math.cos(angle) * 150;
                      const y = Math.sin(angle) * 150;
                      return (
                        <div key={i} className="absolute" style={{ left: `calc(50% + ${x}px - 20px)`, top: `calc(50% + ${y}px - 20px)` }}>
                          <div className={`h-10 w-10 rounded-full ${typeColors[nodes[i]?.type || "project"]} flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:scale-125 transition-transform`}>
                            {nodes[i]?.label?.[0]}
                          </div>
                          <p className="text-xs text-center mt-1 text-muted-foreground">{nodes[i]?.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Node Types</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${color}`} />
                  <span className="text-sm capitalize">{type}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Recent Nodes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${typeColors[node.type]}`} />
                    <span>{node.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{node.connections}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
