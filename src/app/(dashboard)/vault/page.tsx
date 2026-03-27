"use client";

import React from "react";
import { Shield, Key, FileText, Lock, Plus, Search, Eye, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const vaultItems = [
  { id: "1", name: "AWS Production Keys", type: "api_key", lastAccessed: "2 hours ago", sharedWith: 2 },
  { id: "2", name: "Database Credentials", type: "password", lastAccessed: "1 day ago", sharedWith: 1 },
  { id: "3", name: "SSL Certificate", type: "certificate", lastAccessed: "1 week ago", sharedWith: 0 },
  { id: "4", name: "Stripe API Key", type: "api_key", lastAccessed: "3 hours ago", sharedWith: 3 },
  { id: "5", name: "Project Notes", type: "note", lastAccessed: "just now", sharedWith: 5 },
  { id: "6", name: "SSH Key - Production", type: "api_key", lastAccessed: "2 days ago", sharedWith: 1 },
];

const typeIcons: Record<string, typeof Key> = { api_key: Key, password: Lock, certificate: Shield, note: FileText };

export default function VaultPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Encrypted Vault</h1>
          <p className="text-muted-foreground">Secure storage for sensitive data with end-to-end encryption</p>
        </div>
        <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add Secret</Button>
      </div>

      <Card className="bg-gradient-to-r from-violet-600/5 to-cyan-500/5 border-violet-500/20">
        <CardContent className="flex items-center gap-4 p-4">
          <Shield className="h-8 w-8 text-green-500" />
          <div>
            <p className="font-medium">Vault is secured</p>
            <p className="text-xs text-muted-foreground">AES-256-GCM encryption with X25519 key exchange</p>
          </div>
          <Badge variant="success" className="ml-auto">Protected</Badge>
        </CardContent>
      </Card>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search secrets..." className="pl-9" />
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{vaultItems.length}</div><p className="text-xs text-muted-foreground">Total Secrets</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{vaultItems.filter(i => i.type === "api_key").length}</div><p className="text-xs text-muted-foreground">API Keys</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{vaultItems.filter(i => i.sharedWith > 0).length}</div><p className="text-xs text-muted-foreground">Shared Items</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-green-500">256-bit</div><p className="text-xs text-muted-foreground">Encryption</p></CardContent></Card>
      </div>

      <div className="space-y-3">
        {vaultItems.map((item) => {
          const Icon = typeIcons[item.type] || Key;
          return (
            <Card key={item.id} className="hover:shadow-md transition-all">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">Last accessed: {item.lastAccessed} | Shared with: {item.sharedWith}</p>
                </div>
                <Badge variant="outline">{item.type.replace("_", " ")}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
