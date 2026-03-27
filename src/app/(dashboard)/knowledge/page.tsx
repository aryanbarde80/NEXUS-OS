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
              <svg viewBox="0 0 600 500" className="w-full h-full">
                {/* Connection lines */}
                {[1, 2, 3, 4, 5].map((i) => {
                  const angle = ((i - 1) * 72 * Math.PI) / 180;
                  const x = 300 + Math.cos(angle) * 160;
                  const y = 250 + Math.sin(angle) * 160;
                  return <line key={`line-${i}`} x1="300" y1="250" x2={x} y2={y} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1.5} />;
                })}
                {/* Cross connections */}
                {[[1, 3], [2, 4], [3, 5], [1, 5]].map(([a, b], idx) => {
                  const a1 = ((a - 1) * 72 * Math.PI) / 180;
                  const b1 = ((b - 1) * 72 * Math.PI) / 180;
                  return <line key={`cross-${idx}`} x1={300 + Math.cos(a1) * 160} y1={250 + Math.sin(a1) * 160} x2={300 + Math.cos(b1) * 160} y2={250 + Math.sin(b1) * 160} stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} strokeDasharray="4 4" />;
                })}
                {/* Center node */}
                <circle cx="300" cy="250" r="35" fill="url(#centerGrad)" className="animate-pulse" />
                <text x="300" y="256" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">N</text>
                <text x="300" y="300" textAnchor="middle" fill="currentColor" fontSize="11" opacity={0.6}>NEXUS OS</text>
                {/* Satellite nodes */}
                {nodes.slice(1).map((node, i) => {
                  const angle = (i * 72 * Math.PI) / 180;
                  const x = 300 + Math.cos(angle) * 160;
                  const y = 250 + Math.sin(angle) * 160;
                  const colors: Record<string, string> = { technology: "#06b6d4", user: "#10b981", document: "#f59e0b", domain: "#3b82f6", task: "#ec4899" };
                  return (
                    <g key={node.id} className="cursor-pointer">
                      <circle cx={x} cy={y} r="22" fill={colors[node.type] || "#8b5cf6"} opacity={0.8} />
                      <text x={x} y={y + 1} textAnchor="middle" fill="white" fontSize="11" fontWeight="600" dominantBaseline="middle">{node.label[0]}</text>
                      <text x={x} y={y + 38} textAnchor="middle" fill="currentColor" fontSize="10" opacity={0.6}>{node.label}</text>
                      <text x={x} y={y + 50} textAnchor="middle" fill="currentColor" fontSize="9" opacity={0.4}>{node.connections} connections</text>
                    </g>
                  );
                })}
                <defs>
                  <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
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
