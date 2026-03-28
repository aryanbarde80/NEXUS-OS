"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Globe,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createDomainResult } from "@/lib/mock-data";
import { useAIStore, useAppStore } from "@/lib/store";

export default function DomainsPage() {
  const [query, setQuery] = useState("nexus workspace");
  const domainResults = useAIStore((state) => state.domainResults);
  const addDomainResult = useAIStore((state) => state.addDomainResult);
  const addNotification = useAppStore((state) => state.addNotification);

  const activeResult = domainResults[0];
  const recentResults = useMemo(() => domainResults.slice(0, 5), [domainResults]);

  function handleSearch() {
    const result = createDomainResult(query);
    addDomainResult(result);
    addNotification({
      id: `notif-domain-${Date.now()}`,
      userId: "user-1",
      type: "system",
      title: "Domain idea analyzed",
      content: `${result.domain} scored ${result.aiAnalysis.viabilityScore}/100 in the workspace validator.`,
      metadata: { domain: result.domain },
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/domains",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Domain & Idea Validator</h1>
        <p className="text-muted-foreground">Generate naming options, score viability, and keep the research in shared app state.</p>
      </div>

      <Card className="border-violet-500/20 bg-gradient-to-r from-violet-600/10 via-background to-cyan-500/10">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-12 pl-9 text-base"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Describe a product, brand, or workflow idea"
              />
            </div>
            <Button variant="gradient" size="lg" className="h-12 px-8" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Validate
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeResult && (
        <Tabs defaultValue="results">
          <TabsList>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="history">Search History</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="space-y-4 lg:col-span-3">
                {activeResult.suggestions.map((suggestion) => (
                  <Card key={suggestion.domain}>
                    <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-3">
                        {suggestion.available ? (
                          <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                        ) : (
                          <XCircle className="mt-1 h-5 w-5 text-rose-400" />
                        )}
                        <div>
                          <p className="font-medium">{suggestion.domain}</p>
                          <p className="text-xs text-muted-foreground">
                            {suggestion.available ? "Available to register" : "Already taken in this simulation"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-28">
                          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>SEO</span>
                            <span>{suggestion.seoScore}</span>
                          </div>
                          <Progress value={suggestion.seoScore} className="h-2" />
                        </div>
                        {suggestion.available && suggestion.price ? (
                          <Badge variant="success">${suggestion.price}/yr</Badge>
                        ) : (
                          <Badge variant="secondary">Taken</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-violet-400" />
                      Viability Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-end gap-3">
                      <span className="text-5xl font-bold gradient-text">{activeResult.aiAnalysis.viabilityScore}</span>
                      <span className="pb-2 text-sm text-muted-foreground">/100</span>
                    </div>
                    <Progress value={activeResult.aiAnalysis.viabilityScore} className="h-3" />
                    <p className="text-sm text-muted-foreground">{activeResult.aiAnalysis.marketGap}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-cyan-400" />
                      Positioning Prompt
                    </CardTitle>
                    <CardDescription>Use this when you turn the idea into landing page copy.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Position <span className="font-medium text-foreground">{activeResult.domain}</span> as a focused workflow tool, not a generic all-in-one platform.
                    </p>
                    <p>Lead with one outcome, one persona, and one proof point before expanding the story.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeResult.aiAnalysis.recommendations.map((recommendation) => (
                    <div key={recommendation} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm">
                      {recommendation}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-400" />
                    Risk Watchouts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeResult.aiAnalysis.risks.map((risk) => (
                    <div key={risk} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm">
                      {risk}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Competitor framing</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {activeResult.aiAnalysis.competitors.map((competitor) => (
                    <Badge key={competitor} variant="outline">
                      {competitor}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-3">
              {recentResults.map((result) => (
                <Card key={`${result.domain}-${result.checkedAt}`}>
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="font-medium">{result.domain}</p>
                      <p className="text-xs text-muted-foreground">{new Date(result.checkedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={result.available ? "success" : "secondary"}>
                        {result.available ? "Available" : "Taken"}
                      </Badge>
                      <Badge variant="outline">{result.aiAnalysis.viabilityScore}/100</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
