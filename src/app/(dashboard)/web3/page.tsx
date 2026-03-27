"use client";

import React, { useState } from "react";
import { ImageIcon, Wallet, Plus, ArrowUpRight, ArrowDownRight, Coins, Users, BarChart3, Send, RefreshCw, ExternalLink, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const proposals = [
  { id: "1", title: "Add Solana wallet support", description: "Integrate Phantom wallet and support SOL token transactions within the platform", status: "active", votesFor: 2450, votesAgainst: 380, endDate: "Mar 30", type: "feature_request", author: "Alex K.", created: "Mar 20" },
  { id: "2", title: "Allocate 10K NEXUS for bug bounty", description: "Create a dedicated bug bounty program to incentivize security researchers", status: "active", votesFor: 1800, votesAgainst: 200, endDate: "Apr 2", type: "budget_allocation", author: "Maria R.", created: "Mar 22" },
  { id: "3", title: "Elect new core maintainer", description: "Vote on adding Dev Patel as a core maintainer for the Web3 module", status: "passed", votesFor: 3200, votesAgainst: 150, endDate: "Mar 25", type: "maintainer_election", author: "John D.", created: "Mar 15" },
  { id: "4", title: "Implement multi-sig treasury", description: "Require 3-of-5 signatures for treasury transactions over 1000 NEXUS", status: "active", votesFor: 1200, votesAgainst: 450, endDate: "Apr 5", type: "governance", author: "Sarah L.", created: "Mar 24" },
  { id: "5", title: "Launch staking rewards program", description: "Implement a staking mechanism with 8% APY for NEXUS token holders", status: "draft", votesFor: 0, votesAgainst: 0, endDate: "Apr 10", type: "feature_request", author: "Dev P.", created: "Mar 26" },
];

const nfts = [
  { name: "Contributor Badge #001", price: 0.1, currency: "ETH", rarity: "Common", owner: "You", image: "from-violet-600 to-cyan-500" },
  { name: "Early Adopter NFT", price: 0.05, currency: "ETH", rarity: "Rare", owner: "You", image: "from-pink-600 to-rose-500" },
  { name: "Hackathon Winner 2025", price: 0.25, currency: "ETH", rarity: "Legendary", owner: "You", image: "from-amber-600 to-orange-500" },
  { name: "Bug Hunter Badge", price: 0.08, currency: "ETH", rarity: "Epic", owner: "You", image: "from-green-600 to-emerald-500" },
  { name: "Community Leader", price: 0.15, currency: "ETH", rarity: "Rare", owner: "You", image: "from-blue-600 to-indigo-500" },
  { name: "First Commit NFT", price: 0.03, currency: "ETH", rarity: "Common", owner: "You", image: "from-red-600 to-pink-500" },
];

const transactions = [
  { type: "received", amount: 500, token: "NEXUS", from: "Staking Rewards", date: "2h ago", hash: "0x1a2b...3c4d" },
  { type: "sent", amount: 100, token: "NEXUS", from: "Bug Bounty Pool", date: "1d ago", hash: "0x5e6f...7g8h" },
  { type: "received", amount: 1200, token: "NEXUS", from: "Marketplace Sale", date: "2d ago", hash: "0x9i0j...1k2l" },
  { type: "sent", amount: 50, token: "NEXUS", from: "Gas Fee", date: "3d ago", hash: "0x3m4n...5o6p" },
  { type: "received", amount: 200, token: "NEXUS", from: "Community Reward", date: "5d ago", hash: "0x7q8r...9s0t" },
];

export default function Web3Page() {
  const [proposalOpen, setProposalOpen] = useState(false);
  const [mintOpen, setMintOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Web3 & DAO</h1>
          <p className="text-muted-foreground">Manage governance, tokens, and NFTs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Wallet className="mr-2 h-4 w-4" /> 0x1a2b...3c4d</Button>
          <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Proposal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Proposal</DialogTitle>
                <DialogDescription>Submit a new governance proposal for community voting</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2"><Label>Title</Label><Input placeholder="Proposal title" /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe your proposal in detail..." className="min-h-[100px]" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Type</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="budget">Budget Allocation</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="election">Election</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Voting Period</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setProposalOpen(false)}>Cancel</Button>
                <Button variant="gradient" onClick={() => setProposalOpen(false)}>Submit Proposal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-violet-500/20"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">NEXUS Balance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold gradient-text">5,280</div><p className="text-xs text-muted-foreground">~$1,056 USD</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Voting Power</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5,380</div><p className="text-xs text-green-500 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />+100 delegated</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Proposals</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{proposals.filter(p => p.status === "active").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">NFTs Owned</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{nfts.length}</div><p className="text-xs text-muted-foreground">~{nfts.reduce((s, n) => s + n.price, 0).toFixed(2)} ETH</p></CardContent></Card>
      </div>

      <Tabs defaultValue="governance">
        <TabsList>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFT Collection</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>

        <TabsContent value="governance" className="mt-4 space-y-4">
          {proposals.map((p) => {
            const total = p.votesFor + p.votesAgainst;
            const pct = total > 0 ? Math.round((p.votesFor / total) * 100) : 0;
            return (
              <Card key={p.id} className="hover:shadow-md transition-all">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{p.title}</h3>
                      <Badge variant={p.status === "active" ? "success" : p.status === "passed" ? "info" : "secondary"}>{p.status}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">{p.type.replace("_", " ")}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">Ends: {p.endDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  {total > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-green-500">For: {p.votesFor.toLocaleString()}</span><span className="text-red-500">Against: {p.votesAgainst.toLocaleString()}</span></div>
                      <Progress value={pct} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">{pct}% approval &middot; {total.toLocaleString()} total votes</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-5 w-5"><AvatarFallback className="text-[8px] bg-primary/10 text-primary">{p.author.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                      <span>{p.author}</span>
                      <span>&middot;</span>
                      <span>{p.created}</span>
                    </div>
                    {p.status === "active" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-green-500 border-green-500/30 hover:bg-green-500/10">Vote For</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-500/30 hover:bg-red-500/10">Vote Against</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="tokens" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Wallet</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-600/10 to-cyan-500/10">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-3xl font-bold">5,280 NEXUS</p>
                      <p className="text-sm text-muted-foreground">~$1,056.00 USD</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4" /> Send</Button>
                      <Button variant="gradient" size="sm"><ArrowUpRight className="mr-2 h-4 w-4" /> Stake</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-muted/50"><p className="text-lg font-bold">100</p><p className="text-xs text-muted-foreground">Staked</p></div>
                    <div className="p-3 rounded-lg bg-muted/50"><p className="text-lg font-bold text-green-500">8%</p><p className="text-xs text-muted-foreground">APY</p></div>
                    <div className="p-3 rounded-lg bg-muted/50"><p className="text-lg font-bold">$0.20</p><p className="text-xs text-muted-foreground">Price</p></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Transaction History</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.type === "received" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                        {tx.type === "received" ? <ArrowDownRight className="h-4 w-4 text-green-500" /> : <ArrowUpRight className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{tx.from}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${tx.type === "received" ? "text-green-500" : "text-red-500"}`}>{tx.type === "received" ? "+" : "-"}{tx.amount} {tx.token}</p>
                        <p className="text-xs text-muted-foreground font-mono">{tx.hash}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Token Info</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Symbol</span><span className="font-mono">NEXUS</span></div>
                  <Separator />
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Price</span><span className="text-green-500 flex items-center gap-1">$0.20 <ArrowUpRight className="h-3 w-3" /></span></div>
                  <Separator />
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Market Cap</span><span>$2.4M</span></div>
                  <Separator />
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Supply</span><span>12M</span></div>
                  <Separator />
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Holders</span><span>4,500</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start"><Coins className="mr-2 h-4 w-4" /> Buy NEXUS</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start"><RefreshCw className="mr-2 h-4 w-4" /> Swap Tokens</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start"><Users className="mr-2 h-4 w-4" /> Delegate Votes</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start"><ExternalLink className="mr-2 h-4 w-4" /> View on Explorer</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your NFT Collection</h2>
            <Dialog open={mintOpen} onOpenChange={setMintOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient" size="sm"><Plus className="mr-2 h-4 w-4" /> Mint NFT</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mint New NFT</DialogTitle>
                  <DialogDescription>Create a new NFT on the NEXUS chain</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div className="space-y-2"><Label>Name</Label><Input placeholder="NFT Name" /></div>
                  <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe your NFT..." /></div>
                  <div className="space-y-2"><Label>Upload Artwork</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Rarity</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="common">Common</SelectItem>
                          <SelectItem value="rare">Rare</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="legendary">Legendary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Price (ETH)</Label><Input type="number" placeholder="0.1" /></div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setMintOpen(false)}>Cancel</Button>
                  <Button variant="gradient" onClick={() => setMintOpen(false)}>Mint NFT</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nfts.map((nft) => (
              <Card key={nft.name} className="hover:shadow-md transition-all cursor-pointer group overflow-hidden">
                <div className={`h-40 bg-gradient-to-r ${nft.image} flex items-center justify-center`}>
                  <ImageIcon className="h-12 w-12 text-white/30 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{nft.name}</h3>
                    <Badge variant={nft.rarity === "Legendary" ? "warning" : nft.rarity === "Epic" ? "info" : nft.rarity === "Rare" ? "success" : "secondary"} className="text-xs">{nft.rarity}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold">{nft.price} {nft.currency}</span>
                    <Button variant="outline" size="sm">Transfer</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="treasury" className="mt-4 space-y-4">
          <Card className="border-violet-500/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Treasury</p>
                  <p className="text-3xl font-bold gradient-text">125,000 NEXUS</p>
                  <p className="text-sm text-muted-foreground">~$25,000 USD</p>
                </div>
                <Button variant="outline"><BarChart3 className="mr-2 h-4 w-4" /> View Analytics</Button>
              </div>
              <Separator />
              <div className="space-y-3">
                {[
                  { name: "Development Fund", amount: 60000, pct: 48, color: "bg-violet-500" },
                  { name: "Marketing Fund", amount: 30000, pct: 24, color: "bg-cyan-500" },
                  { name: "Bug Bounty", amount: 20000, pct: 16, color: "bg-green-500" },
                  { name: "Community Rewards", amount: 15000, pct: 12, color: "bg-amber-500" },
                ].map((fund) => (
                  <div key={fund.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${fund.color}`} />{fund.name}</span>
                      <span className="font-medium">{fund.amount.toLocaleString()} NEXUS ({fund.pct}%)</span>
                    </div>
                    <Progress value={fund.pct} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Governance Analytics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><div className="text-2xl font-bold">{proposals.length}</div><p className="text-xs text-muted-foreground">Total Proposals</p></div>
                <div><div className="text-2xl font-bold text-green-500">{proposals.filter(p => p.status === "passed").length}</div><p className="text-xs text-muted-foreground">Passed</p></div>
                <div><div className="text-2xl font-bold">{proposals.filter(p => p.status === "active").length}</div><p className="text-xs text-muted-foreground">Active</p></div>
                <div><div className="text-2xl font-bold">78%</div><p className="text-xs text-muted-foreground">Avg Turnout</p></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
