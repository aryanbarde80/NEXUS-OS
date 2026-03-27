"use client";

import React, { useState } from "react";
import { Search, Globe, TrendingUp, CheckCircle2, XCircle, Sparkles, AlertTriangle, ShieldCheck, BarChart3, History, Lightbulb, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const searchResults = [
  { domain: "nexusplatform.io", available: true, price: 12.99, seoScore: 85, tld: ".io" },
  { domain: "nexusplatform.com", available: false, price: null, seoScore: 92, tld: ".com" },
  { domain: "nexusplatform.app", available: true, price: 14.99, seoScore: 78, tld: ".app" },
  { domain: "nexusplatform.dev", available: true, price: 12.99, seoScore: 80, tld: ".dev" },
  { domain: "nexusplatform.co", available: false, price: null, seoScore: 88, tld: ".co" },
  { domain: "getnexus.io", available: true, price: 9.99, seoScore: 72, tld: ".io" },
  { domain: "nexushq.app", available: true, price: 11.99, seoScore: 76, tld: ".app" },
  { domain: "nexusplatform.xyz", available: true, price: 1.99, seoScore: 55, tld: ".xyz" },
];

const aiAnalysis = {
  viabilityScore: 82,
  marketGap: "Strong opportunity in the open-source digital workspace market. Few competitors offer AI + Web3 + project management in a unified platform.",
  competitors: ["Notion", "Linear", "Vercel", "Replit"],
  recommendations: [
    "Focus on developer-first features",
    "Leverage open-source community for growth",
    "Differentiate with AI-native workflows",
    "Build marketplace early for network effects",
  ],
  risks: [
    "Market saturation in project management tools",
    "High customer acquisition cost in enterprise segment",
    "Web3 adoption still niche for mainstream users",
  ],
  monetizationPotential: "High - SaaS subscription + marketplace fees + enterprise licensing",
};

const brandSuggestions = [
  { name: "NexusForge", available: true, score: 88 },
  { name: "NexusLab", available: true, score: 82 },
  { name: "NexusHub", available: false, score: 90 },
  { name: "NexusCraft", available: true, score: 79 },
  { name: "NexusWorks", available: true, score: 85 },
  { name: "NexusFlow", available: true, score: 84 },
];

const recentSearches = [
  { domain: "myproject.com", date: "2 hours ago", available: false },
  { domain: "aiworkspace.io", date: "1 day ago", available: true },
  { domain: "devforge.app", date: "3 days ago", available: true },
  { domain: "codemarket.dev", date: "5 days ago", available: false },
];

const trademarkResults = [
  { name: "Nexus Platform", status: "clear", region: "US", risk: "low" },
  { name: "Nexus Platform", status: "clear", region: "EU", risk: "low" },
  { name: "Nexus", status: "conflict", region: "US", risk: "high" },
  { name: "Nexus OS", status: "clear", region: "US", risk: "medium" },
];

export default function DomainsPage() {
  const [query, setQuery] = useState("nexusplatform");
  const [searched, setSearched] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Domain & Idea Validator</h1>
        <p className="text-muted-foreground">Check domain availability, validate business ideas with AI, and discover brand names</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Enter domain name or business idea..." className="pl-9 h-12 text-lg" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Button variant="gradient" size="lg" className="h-12 px-8" onClick={() => setSearched(true)}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Popular TLDs:</span>
            {[".com", ".io", ".app", ".dev", ".co", ".ai"].map((tld) => (
              <Badge key={tld} variant="outline" className="cursor-pointer hover:bg-accent text-xs">{tld}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {searched && (
        <Tabs defaultValue="domains">
          <TabsList>
            <TabsTrigger value="domains">Domain Results</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="brand">Brand Generator</TabsTrigger>
            <TabsTrigger value="trademark">Trademark Check</TabsTrigger>
            <TabsTrigger value="history">Search History</TabsTrigger>
          </TabsList>

          <TabsContent value="domains" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Domain Results</h2>
                  <Badge variant="secondary">{searchResults.filter(r => r.available).length} available</Badge>
                </div>
                {searchResults.map((result) => (
                  <Card key={result.domain} className="hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex items-center gap-2 flex-1">
                        {result.available ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                        <div>
                          <p className="font-medium">{result.domain}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">SEO: {result.seoScore}/100</span>
                            <Badge variant="outline" className="text-[10px]">{result.tld}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={result.seoScore} className="w-20 h-2" />
                        {result.available ? (
                          <>
                            <span className="text-sm font-bold text-green-500">${result.price}/yr</span>
                            <Button size="sm" variant="gradient">Register</Button>
                          </>
                        ) : (
                          <Badge variant="destructive">Taken</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-500" /> Quick Analysis</h2>
                <Card className="border-violet-500/20">
                  <CardHeader>
                    <CardTitle className="text-base">Viability Score</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-4xl font-bold gradient-text">{aiAnalysis.viabilityScore}</div>
                      <div className="text-sm text-muted-foreground">/100</div>
                      <Progress value={aiAnalysis.viabilityScore} className="flex-1 h-3" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Market Analysis</h4>
                      <p className="text-xs text-muted-foreground">{aiAnalysis.marketGap}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-1">Monetization</h4>
                      <p className="text-xs text-muted-foreground">{aiAnalysis.monetizationPotential}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Competitors</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {aiAnalysis.competitors.map((c) => (<Badge key={c} variant="outline">{c}</Badge>))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /> Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiAnalysis.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                      <p className="text-sm">{r}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-500" /> Potential Risks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiAnalysis.risks.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                      <p className="text-sm">{r}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-violet-500" /> Market Size Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {[
                      { value: "$15.4B", label: "Total Addressable Market" },
                      { value: "$3.2B", label: "Serviceable Market" },
                      { value: "$500M", label: "Obtainable Market" },
                      { value: "23%", label: "CAGR Growth Rate" },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold gradient-text">{item.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="brand" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-amber-500" /> AI Brand Suggestions</CardTitle>
                  <CardDescription>AI-generated brand names based on your query</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {brandSuggestions.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between p-3 rounded-lg border hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        {brand.available ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                        <div>
                          <p className="font-medium">{brand.name}</p>
                          <p className="text-xs text-muted-foreground">Brand Score: {brand.score}/100</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={brand.score} className="w-16 h-1.5" />
                        {brand.available && <Button size="sm" variant="outline">Check Domain</Button>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Brand Criteria</CardTitle>
                  <CardDescription>AI evaluates names based on these factors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Memorability", value: 85, desc: "How easy to remember" },
                    { label: "Uniqueness", value: 78, desc: "Distinctiveness in market" },
                    { label: "Pronounceability", value: 92, desc: "Easy to say and spell" },
                    { label: "Domain Availability", value: 65, desc: "Available across TLDs" },
                    { label: "Social Media Handles", value: 70, desc: "Available on platforms" },
                    { label: "SEO Potential", value: 80, desc: "Search engine friendliness" },
                  ].map((criteria) => (
                    <div key={criteria.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{criteria.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{criteria.desc}</span>
                        </div>
                        <span className="font-medium">{criteria.value}%</span>
                      </div>
                      <Progress value={criteria.value} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trademark" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-blue-500" /> Trademark Conflict Detection</CardTitle>
                <CardDescription>Scan for potential trademark conflicts across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trademarkResults.map((tm, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        {tm.status === "clear" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-red-500" />}
                        <div>
                          <p className="font-medium">{tm.name}</p>
                          <p className="text-xs text-muted-foreground">Region: {tm.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={tm.risk === "low" ? "success" : tm.risk === "medium" ? "warning" : "destructive"}>
                          {tm.risk} risk
                        </Badge>
                        <Badge variant={tm.status === "clear" ? "success" : "destructive"}>
                          {tm.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSearches.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{s.domain}</p>
                          <p className="text-xs text-muted-foreground">{s.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={s.available ? "success" : "destructive"}>{s.available ? "Available" : "Taken"}</Badge>
                        <Button size="sm" variant="ghost"><ExternalLink className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
