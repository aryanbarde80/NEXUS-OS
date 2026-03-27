"use client";

import React, { useState } from "react";
import { Shield, Plus, Lock, Eye, EyeOff, Copy, Trash2, Key, FileKey, Globe, Database, Search, MoreVertical, RefreshCw, Share2, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const secrets = [
  { id: "1", name: "OPENAI_API_KEY", type: "api_key", category: "AI Services", lastAccessed: "2 hours ago", createdAt: "Jan 15, 2025", shared: 3, status: "active", strength: "strong" },
  { id: "2", name: "STRIPE_SECRET_KEY", type: "api_key", category: "Payments", lastAccessed: "1 hour ago", createdAt: "Feb 1, 2025", shared: 2, status: "active", strength: "strong" },
  { id: "3", name: "DATABASE_URL", type: "connection_string", category: "Database", lastAccessed: "just now", createdAt: "Dec 10, 2024", shared: 4, status: "active", strength: "strong" },
  { id: "4", name: "AWS_ACCESS_KEY", type: "credential", category: "Cloud", lastAccessed: "3 days ago", createdAt: "Nov 5, 2024", shared: 2, status: "active", strength: "medium" },
  { id: "5", name: "GITHUB_TOKEN", type: "token", category: "Development", lastAccessed: "30 min ago", createdAt: "Mar 1, 2025", shared: 5, status: "active", strength: "strong" },
  { id: "6", name: "SMTP_PASSWORD", type: "password", category: "Email", lastAccessed: "1 week ago", createdAt: "Jan 20, 2025", shared: 1, status: "expiring", strength: "weak" },
  { id: "7", name: "JWT_SECRET", type: "secret", category: "Authentication", lastAccessed: "5 min ago", createdAt: "Dec 1, 2024", shared: 3, status: "active", strength: "strong" },
  { id: "8", name: "REDIS_URL", type: "connection_string", category: "Cache", lastAccessed: "10 min ago", createdAt: "Feb 15, 2025", shared: 2, status: "active", strength: "strong" },
];

const auditLog = [
  { action: "accessed", secret: "OPENAI_API_KEY", user: "John Doe", timestamp: "2 hours ago", ip: "192.168.1.100" },
  { action: "rotated", secret: "STRIPE_SECRET_KEY", user: "Alex Kim", timestamp: "1 day ago", ip: "10.0.0.50" },
  { action: "created", secret: "GITHUB_TOKEN", user: "Maria Rodriguez", timestamp: "3 days ago", ip: "172.16.0.25" },
  { action: "shared", secret: "DATABASE_URL", user: "Sarah Kim", timestamp: "5 days ago", ip: "192.168.1.105" },
  { action: "revoked", secret: "OLD_API_KEY", user: "Dev Patel", timestamp: "1 week ago", ip: "10.0.0.75" },
];

const typeIcons: Record<string, React.ElementType> = {
  api_key: Key,
  connection_string: Database,
  credential: Globe,
  token: FileKey,
  password: Lock,
  secret: Shield,
};

export default function VaultPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = secrets.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Encrypted Vault</h1>
          <p className="text-muted-foreground">Securely store and manage your secrets and credentials</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add Secret</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Secret</DialogTitle>
              <DialogDescription>Store a new secret in the encrypted vault</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2"><Label>Secret Name</Label><Input placeholder="e.g., API_KEY_PROD" /></div>
              <div className="space-y-2"><Label>Value</Label><Textarea placeholder="Enter secret value..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="token">Token</SelectItem>
                      <SelectItem value="connection_string">Connection String</SelectItem>
                      <SelectItem value="credential">Credential</SelectItem>
                      <SelectItem value="secret">Secret</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Category</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai">AI Services</SelectItem>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="dev">Development</SelectItem>
                      <SelectItem value="auth">Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Notes (optional)</Label><Input placeholder="Additional context..." /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setCreateOpen(false)}><Lock className="mr-2 h-4 w-4" /> Store Secret</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Secrets</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{secrets.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-500">{secrets.filter(s => s.status === "active").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Expiring Soon</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-amber-500">{secrets.filter(s => s.status === "expiring").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Team Members</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">6</div></CardContent></Card>
      </div>

      <Tabs defaultValue="secrets">
        <TabsList>
          <TabsTrigger value="secrets">Secrets</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="secrets" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search secrets..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((secret) => {
              const Icon = typeIcons[secret.type] || Shield;
              return (
                <Card key={secret.id} className="hover:shadow-md transition-all">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-violet-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-mono text-sm font-semibold">{secret.name}</h3>
                        <Badge variant={secret.status === "active" ? "success" : "warning"}>{secret.status}</Badge>
                        {secret.strength === "weak" && <Badge variant="destructive" className="text-xs"><AlertTriangle className="mr-1 h-3 w-3" /> Weak</Badge>}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{secret.category}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {secret.lastAccessed}</span>
                        <span className="flex items-center gap-1"><Share2 className="h-3 w-3" /> Shared with {secret.shared}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-muted rounded px-2 py-1">
                        <span className="font-mono text-xs">{showValues[secret.id] ? "sk-proj-abc123...xyz789" : "****************************"}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowValues(v => ({ ...v, [secret.id]: !v[secret.id] }))}>{showValues[secret.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}</Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="h-4 w-4" /></Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" /> Rotate</DropdownMenuItem>
                          <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Revoke</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-4 space-y-3">
          {auditLog.map((log, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${log.action === "revoked" ? "bg-red-500" : log.action === "created" ? "bg-green-500" : "bg-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{log.user}</span>
                    <span className="text-muted-foreground"> {log.action} </span>
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{log.secret}</span>
                  </p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{log.timestamp}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
