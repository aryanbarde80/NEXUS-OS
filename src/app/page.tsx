"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  FolderKanban,
  Bot,
  Store,
  Network,
  Shield,
  Coins,
  Users,
  Globe,
  BarChart3,
  Trophy,
  Pen,
  ArrowRight,
  Check,
  Star,
  Zap,
  Code,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { name: "Smart Project Management", desc: "Kanban boards, sprints, Gantt charts, and AI-powered task distribution", icon: FolderKanban, color: "from-violet-600 to-purple-500" },
  { name: "AI Studio & Autoblogger", desc: "Generate content, analyze data, and automate with GPT-4, Claude, and Llama", icon: Sparkles, color: "from-cyan-600 to-blue-500" },
  { name: "AI Agent Runtime", desc: "Create and deploy autonomous agents for research, SEO, support, and more", icon: Bot, color: "from-green-600 to-emerald-500" },
  { name: "Digital Marketplace", desc: "Buy and sell prompts, templates, code, domains, and digital assets", icon: Store, color: "from-orange-600 to-amber-500" },
  { name: "Knowledge Graph", desc: "Interactive visualization of connections between projects, people, and ideas", icon: Network, color: "from-pink-600 to-rose-500" },
  { name: "Web3 & DAO Toolkit", desc: "Token management, NFT minting, voting, and decentralized governance", icon: Coins, color: "from-indigo-600 to-violet-500" },
  { name: "Collaboration Suite", desc: "Real-time docs, whiteboard, code playground, and video calls with CRDT", icon: Users, color: "from-teal-600 to-cyan-500" },
  { name: "Domain & Idea Validator", desc: "Check domain availability and validate business ideas with AI analysis", icon: Globe, color: "from-blue-600 to-indigo-500" },
  { name: "Encrypted Vault", desc: "AES-256-GCM encrypted storage with zero-knowledge architecture", icon: Shield, color: "from-red-600 to-pink-500" },
  { name: "Analytics Dashboard", desc: "Business intelligence with custom dashboards and performance tracking", icon: BarChart3, color: "from-amber-600 to-yellow-500" },
  { name: "Gamification Engine", desc: "XP system, achievements, leaderboards, skill trees, and quests", icon: Trophy, color: "from-yellow-600 to-orange-500" },
  { name: "Community Forum", desc: "Discussions, Q&A, knowledge sharing with AI-powered moderation", icon: Pen, color: "from-emerald-600 to-green-500" },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started",
    features: ["1 project", "Basic AI (100 credits/mo)", "Community support", "5 vault items", "Basic analytics"],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For serious creators and freelancers",
    features: ["Unlimited projects", "Advanced AI (5,000 credits/mo)", "Priority support", "Unlimited vault", "Full analytics", "AI agents (5)", "Marketplace access", "Custom domains"],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    desc: "For teams and growing businesses",
    features: ["Everything in Pro", "Team management (up to 25)", "Advanced analytics & BI", "AI agents (25)", "API access", "SSO integration", "Priority support"],
    cta: "Start Business Trial",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/month",
    desc: "For large organizations",
    features: ["Everything in Business", "Unlimited team members", "White-label option", "SLA guarantee (99.9%)", "Compliance (SOC2, GDPR)", "Dedicated support", "Custom AI models", "On-premise option"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const stats = [
  { label: "Open Source", value: "100%" },
  { label: "Core Modules", value: "15+" },
  { label: "Microservices", value: "45+" },
  { label: "Community", value: "Growing" },
];

const techStack = [
  "Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Zustand",
  "Recharts", "Radix UI", "Framer Motion", "GraphQL", "PostgreSQL",
  "Redis", "Neo4j", "LangChain", "Ethers.js", "Docker", "Kubernetes",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="text-lg font-bold gradient-text">NEXUS OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#tech" className="hover:text-foreground transition-colors">Tech Stack</a>
            <a href="https://github.com/aryanbarde80/NEXUS-OS" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Code className="h-4 w-4" /> GitHub
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link href="/login">Sign In</Link></Button>
            <Button variant="gradient" asChild><Link href="/dashboard">Open Workspace <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
            <Zap className="mr-1 h-3 w-3" /> 100% Open Source &middot; AGPL License
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Ultimate
            <span className="block gradient-text">Digital Creation</span>
            Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Project management, AI orchestration, marketplace, Web3 governance, and real-time collaboration — all in one open-source platform. Built for creators, entrepreneurs, and developers.
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/dashboard"><Sparkles className="mr-2 h-5 w-5" /> Open Workspace</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="https://github.com/aryanbarde80/NEXUS-OS" target="_blank" rel="noopener noreferrer">
                <Star className="mr-2 h-5 w-5" /> Star on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Build</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ideation to launch and beyond — NEXUS OS provides every tool you need to create, manage, and scale your digital ventures.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.name} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6 space-y-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-lg text-muted-foreground">Enterprise-grade technology stack for maximum performance and scalability</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">Start free, scale as you grow. No hidden fees.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={`relative flex flex-col ${tier.highlighted ? "border-violet-500 shadow-lg shadow-violet-500/10 scale-105" : ""}`}>
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-to-r from-violet-600 to-cyan-500 border-0">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tier.desc}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={tier.highlighted ? "gradient" : "outline"} className="w-full" asChild>
                  <Link href="/dashboard">{tier.cta} <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your <span className="gradient-text">Digital Empire</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators, developers, and entrepreneurs already using NEXUS OS.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/dashboard"><Sparkles className="mr-2 h-5 w-5" /> Open Workspace</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="https://github.com/aryanbarde80/NEXUS-OS" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">N</span>
                </div>
                <span className="text-lg font-bold gradient-text">NEXUS OS</span>
              </div>
              <p className="text-sm text-muted-foreground">The open-source digital creation ecosystem. Built with love by the community.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Login</Link></li>
                <li><Link href="/register" className="hover:text-foreground transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/aryanbarde80/NEXUS-OS" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contributing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">License (AGPL-3.0)</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 NEXUS OS. Open source under AGPL-3.0 license.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
