"use client";

import React, { useState } from "react";
import { Search, Globe, TrendingUp, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const searchResults = [
  { domain: "nexusplatform.io", available: true, price: 12.99, seoScore: 85 },
  { domain: "nexusplatform.com", available: false, price: null, seoScore: 92 },
  { domain: "nexusplatform.app", available: true, price: 14.99, seoScore: 78 },
  { domain: "nexusplatform.dev", available: true, price: 12.99, seoScore: 80 },
  { domain: "nexusplatform.co", available: false, price: null, seoScore: 88 },
  { domain: "getnexus.io", available: true, price: 9.99, seoScore: 72 },
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
};

export default function DomainsPage() {
  const [query, setQuery] = useState("nexusplatform");
  const [searched, setSearched] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Domain & Idea Validator</h1>
        <p className="text-muted-foreground">Check domain availability and validate your business ideas with AI</p>
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
        </CardContent>
      </Card>

      {searched && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold">Domain Results</h2>
            {searchResults.map((result) => (
              <Card key={result.domain} className="hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex items-center gap-2 flex-1">
                    {result.available ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                    <div>
                      <p className="font-medium">{result.domain}</p>
                      <p className="text-xs text-muted-foreground">SEO Score: {result.seoScore}/100</p>
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
            <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-500" /> AI Analysis</h2>
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
                <div>
                  <h4 className="text-sm font-medium mb-2">Competitors</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {aiAnalysis.competitors.map((c) => (<Badge key={c} variant="outline">{c}</Badge>))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-1.5">
                    {aiAnalysis.recommendations.map((r, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <TrendingUp className="h-3 w-3 mt-0.5 text-green-500 shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
