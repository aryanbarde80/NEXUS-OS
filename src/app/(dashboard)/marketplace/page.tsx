"use client";

import React, { useState } from "react";
import { Search, Filter, Star, Download, ShoppingCart, Tag, Heart, Package, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const categories = ["All", "Prompts", "Templates", "Code", "Domains", "Services", "Assets", "Courses"];

const listings = [
  { id: "1", title: "AI-Powered SaaS Dashboard Template", category: "templates", price: 49, rating: 4.8, reviews: 124, downloads: 1580, seller: "DesignPro", tags: ["React", "Tailwind", "AI"], description: "A complete SaaS dashboard template with AI-powered analytics, dark mode, and 50+ components." },
  { id: "2", title: "Ultimate ChatGPT Prompt Collection", category: "prompts", price: 19, rating: 4.9, reviews: 256, downloads: 3200, seller: "PromptMaster", tags: ["GPT-4", "Business", "Marketing"], description: "500+ curated prompts for business, marketing, development, and creative writing." },
  { id: "3", title: "E-Commerce Micro-SaaS Starter Kit", category: "code", price: 99, rating: 4.7, reviews: 89, downloads: 450, seller: "CodeCraft", tags: ["Next.js", "Stripe", "Prisma"], description: "Full-stack e-commerce starter with payments, auth, and admin dashboard." },
  { id: "4", title: "nexushub.io Domain", category: "domains", price: 2500, rating: 0, reviews: 0, downloads: 0, seller: "DomainKing", tags: ["Premium", ".io"], description: "Premium .io domain perfect for tech startups and SaaS products." },
  { id: "5", title: "Full-Stack Web Dev Course", category: "courses", price: 79, rating: 4.6, reviews: 342, downloads: 890, seller: "TechEdu", tags: ["React", "Node.js", "MongoDB"], description: "40+ hours of video content covering modern full-stack web development." },
  { id: "6", title: "Social Media Marketing Bot", category: "code", price: 39, rating: 4.5, reviews: 67, downloads: 230, seller: "AutomateX", tags: ["Python", "Twitter", "LinkedIn"], description: "Automated social media posting and engagement tool with AI captions." },
  { id: "7", title: "UI Component Library Pro", category: "templates", price: 69, rating: 4.8, reviews: 198, downloads: 1200, seller: "UILabs", tags: ["React", "shadcn", "Animations"], description: "200+ premium UI components with animations and accessibility built-in." },
  { id: "8", title: "AI Image Generation Prompts Pack", category: "prompts", price: 29, rating: 4.7, reviews: 156, downloads: 2100, seller: "ArtificialArt", tags: ["Midjourney", "DALL-E", "Stable Diffusion"], description: "1000+ image generation prompts organized by style and subject." },
];

const gradients = [
  "from-violet-600 to-cyan-500", "from-pink-600 to-rose-500", "from-green-600 to-emerald-500",
  "from-orange-600 to-amber-500", "from-blue-600 to-indigo-500", "from-red-600 to-pink-500",
  "from-cyan-600 to-teal-500", "from-purple-600 to-violet-500",
];

const sellerStats = {
  totalSales: 342, revenue: 12450, avgRating: 4.7, activeListings: 8,
  recentSales: [
    { item: "SaaS Dashboard Template", buyer: "JD", amount: 49, date: "2h ago" },
    { item: "ChatGPT Prompts", buyer: "MR", amount: 19, date: "5h ago" },
    { item: "E-Commerce Starter", buyer: "AK", amount: 99, date: "1d ago" },
    { item: "UI Component Library", buyer: "SK", amount: 69, date: "2d ago" },
  ],
};

const reviewsData = [
  { user: "John D.", rating: 5, comment: "Incredible template! Saved me weeks of work. The AI components are top-notch.", date: "Mar 25", item: "SaaS Dashboard Template" },
  { user: "Maria R.", rating: 5, comment: "Best prompt collection I've purchased. Very well organized and practical.", date: "Mar 24", item: "ChatGPT Prompts" },
  { user: "Alex K.", rating: 4, comment: "Great starter kit. Wish it had more payment provider options.", date: "Mar 23", item: "E-Commerce Starter" },
  { user: "Sarah L.", rating: 5, comment: "The course content is incredibly thorough. Highly recommend for beginners.", date: "Mar 22", item: "Web Dev Course" },
  { user: "Dev P.", rating: 4, comment: "Good bot but documentation could be better. Works well once set up.", date: "Mar 20", item: "Marketing Bot" },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedListing, setSelectedListing] = useState<typeof listings[0] | null>(null);
  const [sellOpen, setSellOpen] = useState(false);

  const filtered = selectedCategory === "All" ? listings : listings.filter(l => l.category === selectedCategory.toLowerCase());
  const totalVolume = listings.reduce((s, l) => s + l.price * l.downloads, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell digital assets, templates, and services</p>
        </div>
        <Dialog open={sellOpen} onOpenChange={setSellOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient"><Tag className="mr-2 h-4 w-4" /> Sell Something</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Listing</DialogTitle>
              <DialogDescription>List your digital product on the marketplace</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2"><Label>Title</Label><Input placeholder="My Awesome Product" /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe your product..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Price (USD)</Label><Input type="number" placeholder="49" /></div>
                <div className="space-y-2"><Label>Category</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== "All").map((c) => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Tags (comma separated)</Label><Input placeholder="React, TypeScript, AI" /></div>
              <div className="space-y-2"><Label>Upload Files</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSellOpen(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setSellOpen(false)}>List Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Listings</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{listings.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Volume</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${(totalVolume / 1000).toFixed(0)}k+</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Downloads</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{listings.reduce((s, l) => s + l.downloads, 0).toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avg Rating</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold flex items-center gap-1"><Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />4.7</div></CardContent></Card>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search marketplace..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => { setSelectedCategory(cat); setSelectedListing(null); }}>
                {cat}
              </Button>
            ))}
          </div>

          {selectedListing ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedListing(null)}>&larr; Back to listings</Button>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <div className={`h-48 bg-gradient-to-r ${gradients[parseInt(selectedListing.id) % gradients.length]} rounded-t-lg flex items-center justify-center`}>
                      <span className="text-6xl font-bold text-white/20">{selectedListing.title[0]}</span>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold">{selectedListing.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1">by {selectedListing.seller}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${selectedListing.price}</div>
                          {selectedListing.rating > 0 && (
                            <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />{selectedListing.rating} ({selectedListing.reviews})</div>
                          )}
                        </div>
                      </div>
                      <p className="mt-4 text-sm">{selectedListing.description}</p>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {selectedListing.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button variant="gradient" className="flex-1"><ShoppingCart className="mr-2 h-4 w-4" /> Buy Now - ${selectedListing.price}</Button>
                        <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Reviews</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {reviewsData.slice(0, 3).map((review, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{review.user.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{review.user}</span>
                              <div className="flex">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />)}</div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm mt-1">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Category</span><Badge variant="outline" className="capitalize">{selectedListing.category}</Badge></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Downloads</span><span>{selectedListing.downloads.toLocaleString()}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Reviews</span><span>{selectedListing.reviews}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Seller</span><span className="font-medium">{selectedListing.seller}</span></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Escrow Protection</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-green-500" /> Buyer protection included</div>
                      <p className="text-xs text-muted-foreground">Your purchase is protected by our escrow system. Funds are released to the seller only after you confirm receipt.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing, i) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group" onClick={() => setSelectedListing(listing)}>
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
                        {listing.rating > 0 && <span className="flex items-center text-sm"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />{listing.rating} ({listing.reviews})</span>}
                        {listing.downloads > 0 && <span className="flex items-center text-xs text-muted-foreground"><Download className="h-3 w-3 mr-1" />{listing.downloads}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${listing.price}</span>
                        <Button size="sm" variant="gradient" onClick={(e) => e.stopPropagation()}><ShoppingCart className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="seller" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Sales</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{sellerStats.totalSales}</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-500">${sellerStats.revenue.toLocaleString()}</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avg Rating</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold flex items-center gap-1"><Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />{sellerStats.avgRating}</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Listings</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{sellerStats.activeListings}</div></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Sales</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sellerStats.recentSales.map((sale, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{sale.buyer}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{sale.item}</p>
                      <p className="text-xs text-muted-foreground">{sale.date}</p>
                    </div>
                    <span className="font-semibold text-green-500">+${sale.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 space-y-3">
          {reviewsData.map((review, i) => (
            <Card key={i} className="hover:shadow-md transition-all">
              <CardContent className="flex items-start gap-4 p-4">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{review.user.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{review.user}</span>
                    <div className="flex">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="h-3 w-3 text-yellow-500 fill-yellow-500" />)}</div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm mt-1">{review.comment}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{review.item}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
