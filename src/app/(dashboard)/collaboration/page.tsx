"use client";

import React, { useState } from "react";
import { Users, Video, MessageSquare, FileText, Code, Paintbrush, Plus, Mic, MonitorUp, Phone, Settings, Maximize2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const rooms = [
  { id: "1", name: "Frontend Sprint Review", type: "video", participants: 5, maxParticipants: 10, status: "live", duration: "45:12", host: "JD" },
  { id: "2", name: "Design System Workshop", type: "whiteboard", participants: 3, maxParticipants: 8, status: "live", duration: "1:22:05", host: "LM" },
  { id: "3", name: "API Architecture Discussion", type: "document", participants: 4, maxParticipants: 6, status: "live", duration: "28:30", host: "AK" },
  { id: "4", name: "Code Pair Programming", type: "code", participants: 2, maxParticipants: 4, status: "live", duration: "15:45", host: "DP" },
];

const chatMessages = [
  { user: "JD", message: "Has anyone reviewed the new PR for payment integration?", time: "10:30 AM" },
  { user: "MR", message: "Yes, I left some comments. The error handling needs work.", time: "10:32 AM" },
  { user: "AK", message: "I'll fix those issues this afternoon. Also, the API rate limiter is ready for review.", time: "10:35 AM" },
  { user: "SK", message: "The staging deploy pipeline is now green. Ready for testing.", time: "10:38 AM" },
  { user: "LM", message: "New mockups for the settings page are in Figma. Please take a look!", time: "10:42 AM" },
  { user: "DP", message: "Just merged the websocket changes. Real-time updates should work now.", time: "10:45 AM" },
];

const toolTypes = [
  { name: "Video Call", icon: Video, desc: "HD video conferencing with screen share", color: "from-blue-600 to-cyan-500", features: ["Screen sharing", "Recording", "Virtual backgrounds", "Breakout rooms"] },
  { name: "Whiteboard", icon: Paintbrush, desc: "Collaborative drawing and brainstorming", color: "from-violet-600 to-purple-500", features: ["Infinite canvas", "Sticky notes", "Shapes & arrows", "Templates"] },
  { name: "Document Editor", icon: FileText, desc: "Real-time collaborative document editing", color: "from-green-600 to-emerald-500", features: ["Rich text editing", "Comments", "Version history", "Export to PDF"] },
  { name: "Code Playground", icon: Code, desc: "Pair programming with live execution", color: "from-orange-600 to-amber-500", features: ["Syntax highlighting", "Live execution", "Multiple languages", "Shared terminal"] },
];

export default function CollaborationPage() {
  const [activeRoom, setActiveRoom] = useState<typeof rooms[0] | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
          <p className="text-muted-foreground">Real-time collaboration tools for your team</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Create Room</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {toolTypes.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.name} className="cursor-pointer hover:shadow-md transition-all group">
              <CardContent className="pt-6 text-center space-y-3">
                <div className={`mx-auto h-12 w-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="rooms">
        <TabsList>
          <TabsTrigger value="rooms">Active Rooms</TabsTrigger>
          <TabsTrigger value="chat">Team Chat</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="mt-4 space-y-4">
          {activeRoom ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveRoom(null)}>&larr; Back to rooms</Button>
              <Card>
                <CardContent className="p-0">
                  <div className="bg-gray-900 rounded-t-lg aspect-video flex items-center justify-center relative">
                    <div className="text-center">
                      <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">{activeRoom.name}</p>
                      <p className="text-gray-500 text-sm mt-1">{activeRoom.participants} participants &middot; {activeRoom.duration}</p>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"><Mic className="h-4 w-4 text-white" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"><Video className="h-4 w-4 text-white" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"><MonitorUp className="h-4 w-4 text-white" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"><MessageSquare className="h-4 w-4 text-white" /></Button>
                      <Button variant="destructive" size="icon" className="rounded-full"><Phone className="h-4 w-4" /></Button>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 h-8 w-8"><Settings className="h-3 w-3 text-white" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 h-8 w-8"><Maximize2 className="h-3 w-3 text-white" /></Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{activeRoom.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Host: {activeRoom.host}</span>
                      <span>{activeRoom.participants}/{activeRoom.maxParticipants} participants</span>
                      <Badge variant="success">{activeRoom.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {rooms.map((room) => (
                <Card key={room.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setActiveRoom(room)}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                          {room.type === "video" && <Video className="h-5 w-5 text-violet-500" />}
                          {room.type === "whiteboard" && <Paintbrush className="h-5 w-5 text-violet-500" />}
                          {room.type === "document" && <FileText className="h-5 w-5 text-violet-500" />}
                          {room.type === "code" && <Code className="h-5 w-5 text-violet-500" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{room.name}</h3>
                          <p className="text-xs text-muted-foreground capitalize">{room.type} room &middot; {room.duration}</p>
                        </div>
                      </div>
                      <Badge variant="success" className="animate-pulse">{room.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{room.participants}/{room.maxParticipants}</span>
                      </div>
                      <Button variant="gradient" size="sm">Join Room</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team Chat</CardTitle>
              <CardDescription>General discussion channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{msg.user}</AvatarFallback></Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm mt-1">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                <Button variant="gradient" size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {toolTypes.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.name} className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {tool.features.map((f) => (
                        <div key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">Launch {tool.name}</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
