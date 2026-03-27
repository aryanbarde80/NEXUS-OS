"use client";

import React from "react";
import { ImageIcon, Wallet, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const proposals = [
  { id: "1", title: "Add Solana wallet support", status: "active", votesFor: 2450, votesAgainst: 380, endDate: "Mar 30", type: "feature_request" },
  { id: "2", title: "Allocate 10K NEXUS for bug bounty", status: "active", votesFor: 1800, votesAgainst: 200, endDate: "Apr 2", type: "budget_allocation" },
  { id: "3", title: "Elect new core maintainer", status: "passed", votesFor: 3200, votesAgainst: 150, endDate: "Mar 25", type: "maintainer_election" },
];

const nfts = [
  { name: "Contributor Badge #001", price: 0.1, currency: "ETH" },
  { name: "Early Adopter NFT", price: 0.05, currency: "ETH" },
  { name: "Hackathon Winner 2025", price: 0.25, currency: "ETH" },
];

export default function Web3Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Web3 & DAO</h1>
          <p className="text-muted-foreground">Manage governance, tokens, and NFTs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</Button>
          <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Proposal</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">NEXUS Balance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5,280</div><p className="text-xs text-muted-foreground">~$1,056 USD</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Voting Power</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5,380</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Proposals</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">NFTs Owned</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">7</div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold">DAO Proposals</h2>
          {proposals.map((p) => {
            const total = p.votesFor + p.votesAgainst;
            const pct = Math.round((p.votesFor / total) * 100);
            return (
              <Card key={p.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{p.title}</h3>
                    <Badge variant={p.status === "active" ? "success" : "secondary"}>{p.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-green-500">For: {p.votesFor}</span><span className="text-red-500">Against: {p.votesAgainst}</span></div>
                    <Progress value={pct} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="outline">{p.type.replace("_", " ")}</Badge>
                    <span>Ends: {p.endDate}</span>
                  </div>
                  {p.status === "active" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-green-500 border-green-500/30">Vote For</Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-500 border-red-500/30">Vote Against</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">NFT Collection</h2>
          {nfts.map((nft) => (
            <Card key={nft.name} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="h-32 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 flex items-center justify-center mb-3">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-sm">{nft.name}</h3>
                <p className="text-sm font-bold mt-1">{nft.price} {nft.currency}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
