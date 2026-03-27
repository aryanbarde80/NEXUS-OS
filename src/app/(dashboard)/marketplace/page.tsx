"use client";

import React, { useState } from "react";
import { Search, Filter, Star, Download, ShoppingCart, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


const categories = ["All", "Prompts", "Templates", "Code", "Domains", "Services", "Assets", "Courses"];
const sortOptions = ["Popular", "Newest", "Price: Low", "Price: High"];

const listings = [
  { id: "1", title: "AI-Powered SaaS Dashboard Template", category: "templates", price: 49, rating: 4.8, reviews: 124, downloads: 1580, seller: "DesignPro", thumbnail: "gradient-1", tags: ["React", "Tailwind", "AI"] },
  { id: "2", title: "Ultimate ChatGPT Prompt Collection", category: "prompts", price: 19, rating: 4.9, reviews: 256, downloads: 3200, seller: "PromptMaster", thumbnail: "gradient-2", tags: ["GPT-4", "Business", "Marketing"] },
  { id: "3", title: "E-Commerce Micro-SaaS Starter Kit", category: "code", price: 99, rating: 4.7, reviews: 89, downloads: 450, seller: "CodeCraft", thumbnail: "gradient-3", tags: ["Next.js", "Stripe", "Prisma"] },
  { id: "4", title: "nexushub.io Domain", category: "domains", price: 2500, rating: 0, reviews: 0, downloads: 0, seller: "DomainKing", thumbnail: "gradient-4", tags: ["Premium", ".io"] },
  { id: "5", title: "Full-Stack Web Dev Course", category: "courses", price: 79, rating: 4.6, reviews: 342, downloads: 890, seller: "TechEdu", thumbnail: "gradient-5", tags: ["React", "Node.js", "MongoDB"] },
  { id: "6", title: "Social Media Marketing Bot", category: "code", price: 39, rating: 4.5, reviews: 67, downloads: 230, seller: "AutomateX", thumbnail: "gradient-6", tags: ["Python", "Twitter", "LinkedIn"] },
];

const gradients = [
  "from-violet-600 to-cyan-500", "from-pink-600 to-rose-500", "from-green-600 to-emerald-500",
  "from-orange-600 to-amber-500", "from-blue-600 to-indigo-500", "from-red-600 to-pink-500",
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filtered = selectedCategory === "All" ? listings : listings.filter(l => l.category === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell digital assets, templates, and services</p>
        </div>
        <Button variant="gradient"><Tag className="mr-2 h-4 w-4" /> Sell Something</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search marketplace..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-2">
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{listings.length}</div><p className="text-xs text-muted-foreground">Total Listings</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">$2,786</div><p className="text-xs text-muted-foreground">Total Volume</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">6,350</div><p className="text-xs text-muted-foreground">Downloads</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">4.7</div><p className="text-xs text-muted-foreground">Avg Rating</p></CardContent></Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {sortOptions.map((s) => (
            <Button key={s} variant="ghost" size="sm" className="text-xs">{s}</Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing, i) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
            <div className={`h-40 bg-gradient-to-r ${gradients[i % gradients.length]} flex items-center justify-center`}>
              <span className="text-4xl font-bold text-white/20">{listing.title[0]}</span>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{listing.title}</h3>
                <p className="text-xs text-muted-foreground">by {listing.seller}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {listing.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {listing.rating > 0 && (
                    <span className="flex items-center text-sm"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />{listing.rating} ({listing.reviews})</span>
                  )}
                  {listing.downloads > 0 && (
                    <span className="flex items-center text-xs text-muted-foreground"><Download className="h-3 w-3 mr-1" />{listing.downloads}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${listing.price}</span>
                  <Button size="sm" variant="gradient"><ShoppingCart className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
