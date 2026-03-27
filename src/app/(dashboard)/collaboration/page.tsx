"use client";

import React from "react";
import { FileText, Paintbrush, Code, Video, MessageSquare, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const tools = [
  { name: "Collaborative Docs", icon: FileText, desc: "Real-time document editing with Yjs CRDT", color: "from-blue-600 to-cyan-500", active: 3 },
  { name: "Whiteboard", icon: Paintbrush, desc: "Infinite canvas for brainstorming", color: "from-violet-600 to-purple-500", active: 1 },
  { name: "Code Playground", icon: Code, desc: "VS Code in browser with live collaboration", color: "from-green-600 to-emerald-500", active: 2 },
  { name: "Video Calls", icon: Video, desc: "WebRTC video with screen sharing", color: "from-orange-600 to-amber-500", active: 0 },
  { name: "Discussions", icon: MessageSquare, desc: "Threaded discussions on any entity", color: "from-pink-600 to-rose-500", active: 5 },
];

const rooms = [
  { name: "Product Roadmap Q2", type: "document", participants: ["JD", "AK", "MR"], lastActive: "2 min ago" },
  { name: "Architecture Diagram", type: "whiteboard", participants: ["JD", "AK"], lastActive: "1 hour ago" },
  { name: "API Integration", type: "code", participants: ["MR", "SK"], lastActive: "30 min ago" },
  { name: "Design Review", type: "document", participants: ["JD", "LM", "AK", "MR"], lastActive: "15 min ago" },
];

export default function CollaborationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
          <p className="text-muted-foreground">Real-time collaborative tools for your team</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Room</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.name} className="cursor-pointer hover:shadow-md transition-all group">
              <CardContent className="pt-6 text-center space-y-3">
                <div className={`mx-auto h-12 w-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium text-sm">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
                {tool.active > 0 && <Badge variant="success">{tool.active} active</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Active Rooms</h2>
        <div className="space-y-3">
          {rooms.map((room) => (
            <Card key={room.name} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  {room.type === "document" && <FileText className="h-5 w-5" />}
                  {room.type === "whiteboard" && <Paintbrush className="h-5 w-5" />}
                  {room.type === "code" && <Code className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{room.name}</h3>
                  <p className="text-xs text-muted-foreground">{room.type} - Last active {room.lastActive}</p>
                </div>
                <div className="flex -space-x-2">
                  {room.participants.map((p) => (
                    <Avatar key={p} className="h-7 w-7 border-2 border-background">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{p}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button size="sm">Join</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
