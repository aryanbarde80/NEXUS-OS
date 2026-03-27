"use client";

import React, { useState } from "react";
import { Trophy, Star, Target, Flame, Award, Crown, Zap, BookOpen, Shield, Rocket, Heart, Code, Globe, Medal, ChevronRight, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const achievements = [
  { name: "First Project", desc: "Create your first project", icon: Star, unlocked: true, xp: 100, date: "Jan 15, 2025" },
  { name: "Task Master", desc: "Complete 100 tasks", icon: Target, unlocked: true, xp: 500, date: "Feb 20, 2025" },
  { name: "Content Creator", desc: "Publish 10 blog posts", icon: Flame, unlocked: false, progress: 60, xp: 300, current: 6, total: 10 },
  { name: "Community Hero", desc: "Help 50 community members", icon: Award, unlocked: false, progress: 35, xp: 750, current: 18, total: 50 },
  { name: "Marketplace Maven", desc: "Make 10 marketplace sales", icon: Crown, unlocked: false, progress: 20, xp: 1000, current: 2, total: 10 },
  { name: "Code Wizard", desc: "Review 25 pull requests", icon: Zap, unlocked: true, xp: 250, date: "Mar 10, 2025" },
  { name: "Open Source Champion", desc: "Contribute to 5 open source projects", icon: Globe, unlocked: false, progress: 40, xp: 600, current: 2, total: 5 },
  { name: "Bug Hunter", desc: "Report and fix 20 bugs", icon: Shield, unlocked: false, progress: 75, xp: 400, current: 15, total: 20 },
  { name: "Mentorship Master", desc: "Mentor 5 new developers", icon: Heart, unlocked: true, xp: 800, date: "Mar 5, 2025" },
  { name: "Full Stack Hero", desc: "Complete projects in 5 different languages", icon: Code, unlocked: false, progress: 80, xp: 500, current: 4, total: 5 },
];

const leaderboard = [
  { rank: 1, name: "Alex K.", xp: 15200, level: 16, badge: "gold", streak: 45 },
  { rank: 2, name: "Maria R.", xp: 12800, level: 13, badge: "gold", streak: 32 },
  { rank: 3, name: "Jake M.", xp: 11500, level: 12, badge: "silver", streak: 28 },
  { rank: 4, name: "Sarah L.", xp: 9800, level: 10, badge: "silver", streak: 21 },
  { rank: 5, name: "Dev P.", xp: 8200, level: 9, badge: "bronze", streak: 15 },
  { rank: 6, name: "John D.", xp: 7500, level: 8, badge: "bronze", streak: 12 },
  { rank: 7, name: "Lisa W.", xp: 6800, level: 7, badge: "bronze", streak: 10 },
  { rank: 8, name: "You", xp: 4200, level: 8, badge: "bronze", streak: 7 },
];

const skillTrees = [
  {
    name: "Frontend Mastery", icon: Code, color: "from-blue-600 to-cyan-500", totalSkills: 12, unlockedSkills: 8,
    skills: [
      { name: "HTML/CSS Basics", unlocked: true, level: 3 },
      { name: "JavaScript ES6+", unlocked: true, level: 3 },
      { name: "React Components", unlocked: true, level: 2 },
      { name: "State Management", unlocked: true, level: 2 },
      { name: "Next.js", unlocked: true, level: 1 },
      { name: "Performance Optimization", unlocked: false, level: 0 },
    ],
  },
  {
    name: "Backend Engineering", icon: Shield, color: "from-green-600 to-emerald-500", totalSkills: 10, unlockedSkills: 5,
    skills: [
      { name: "Node.js Fundamentals", unlocked: true, level: 3 },
      { name: "REST API Design", unlocked: true, level: 2 },
      { name: "Database Design", unlocked: true, level: 2 },
      { name: "GraphQL", unlocked: true, level: 1 },
      { name: "Microservices", unlocked: false, level: 0 },
      { name: "System Design", unlocked: false, level: 0 },
    ],
  },
  {
    name: "AI & Machine Learning", icon: Rocket, color: "from-violet-600 to-purple-500", totalSkills: 8, unlockedSkills: 3,
    skills: [
      { name: "Prompt Engineering", unlocked: true, level: 2 },
      { name: "LangChain Basics", unlocked: true, level: 1 },
      { name: "AI Agents", unlocked: true, level: 1 },
      { name: "Fine-Tuning Models", unlocked: false, level: 0 },
      { name: "RAG Architecture", unlocked: false, level: 0 },
    ],
  },
  {
    name: "Web3 & Blockchain", icon: Globe, color: "from-orange-600 to-amber-500", totalSkills: 8, unlockedSkills: 2,
    skills: [
      { name: "Blockchain Basics", unlocked: true, level: 2 },
      { name: "Smart Contracts", unlocked: true, level: 1 },
      { name: "DeFi Protocols", unlocked: false, level: 0 },
      { name: "NFT Development", unlocked: false, level: 0 },
      { name: "DAO Governance", unlocked: false, level: 0 },
    ],
  },
];

const certifications = [
  { name: "NEXUS Frontend Developer", status: "earned", date: "Feb 2025", level: "Intermediate" },
  { name: "AI Agent Builder", status: "earned", date: "Mar 2025", level: "Beginner" },
  { name: "Full Stack Engineer", status: "in_progress", progress: 65, level: "Advanced" },
  { name: "Web3 Developer", status: "locked", progress: 0, level: "Intermediate" },
];

export default function GamificationPage() {
  const [selectedTree, setSelectedTree] = useState<typeof skillTrees[0] | null>(null);

  const totalXP = 4200;
  const currentLevel = 8;
  const xpToNext = 5000;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gamification</h1>
        <p className="text-muted-foreground">Level up your skills and earn rewards</p>
      </div>

      <Card className="bg-gradient-to-r from-violet-600/10 to-cyan-500/10 border-violet-500/20">
        <CardContent className="flex items-center gap-6 p-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">{currentLevel}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Level {currentLevel} - Digital Architect</h2>
            <p className="text-sm text-muted-foreground mb-2">{totalXP.toLocaleString()} / {xpToNext.toLocaleString()} XP to next level</p>
            <Progress value={(totalXP / xpToNext) * 100} className="h-3" />
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-500" /> 7 day streak</span>
              <span className="flex items-center gap-1"><Trophy className="h-3 w-3 text-amber-500" /> {achievements.filter(a => a.unlocked).length} achievements</span>
              <span className="flex items-center gap-1"><Medal className="h-3 w-3 text-violet-500" /> {certifications.filter(c => c.status === "earned").length} certifications</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl font-bold gradient-text">{totalXP.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skill Trees</TabsTrigger>
          <TabsTrigger value="quests">Quests</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <Card key={ach.name} className={`${ach.unlocked ? "" : "opacity-70"} hover:shadow-md transition-all`}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`h-10 w-10 rounded-lg ${ach.unlocked ? "bg-gradient-to-r from-violet-600 to-cyan-500" : "bg-muted"} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-5 w-5 ${ach.unlocked ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{ach.name}</h3>
                        {ach.unlocked && <Badge variant="success" className="text-xs">Unlocked</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{ach.desc}</p>
                      {!ach.unlocked && ach.progress !== undefined && (
                        <div className="mt-1">
                          <Progress value={ach.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-0.5">{ach.current}/{ach.total}</p>
                        </div>
                      )}
                      {ach.unlocked && ach.date && <p className="text-xs text-muted-foreground">{ach.date}</p>}
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">+{ach.xp} XP</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-4 space-y-4">
          {selectedTree ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedTree(null)}>&larr; Back to skill trees</Button>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${selectedTree.color} flex items-center justify-center`}>
                      <selectedTree.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{selectedTree.name}</CardTitle>
                      <CardDescription>{selectedTree.unlockedSkills}/{selectedTree.totalSkills} skills unlocked</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={(selectedTree.unlockedSkills / selectedTree.totalSkills) * 100} className="h-2 mb-4" />
                  <div className="space-y-3">
                    {selectedTree.skills.map((skill) => (
                      <div key={skill.name} className={`flex items-center gap-3 p-3 rounded-lg ${skill.unlocked ? "bg-muted/50" : "bg-muted/20 opacity-60"}`}>
                        {skill.unlocked ? <Zap className="h-4 w-4 text-amber-500 shrink-0" /> : <Lock className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{skill.name}</p>
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3].map((l) => (
                              <div key={l} className={`w-4 h-1.5 rounded-full ${l <= skill.level ? "bg-amber-500" : "bg-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <Badge variant={skill.unlocked ? "success" : "secondary"} className="text-xs">
                          {skill.unlocked ? `Level ${skill.level}` : "Locked"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {skillTrees.map((tree) => {
                const Icon = tree.icon;
                return (
                  <Card key={tree.name} className="hover:shadow-md transition-all cursor-pointer group" onClick={() => setSelectedTree(tree)}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${tree.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{tree.name}</h3>
                          <p className="text-xs text-muted-foreground">{tree.unlockedSkills}/{tree.totalSkills} skills unlocked</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <Progress value={(tree.unlockedSkills / tree.totalSkills) * 100} className="h-2" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="quests" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Active Quests</h2>
              {[
                { name: "Weekly Sprint", desc: "Complete 20 tasks this week", progress: 65, reward: 200, deadline: "3 days left", type: "weekly" },
                { name: "Content Marathon", desc: "Generate 5 AI blog posts", progress: 40, reward: 150, deadline: "5 days left", type: "weekly" },
                { name: "Community Builder", desc: "Answer 10 community questions", progress: 80, reward: 300, deadline: "2 days left", type: "weekly" },
                { name: "Code Review Hero", desc: "Review 5 pull requests", progress: 60, reward: 250, deadline: "4 days left", type: "weekly" },
              ].map((quest) => (
                <Card key={quest.name} className="hover:shadow-md transition-all">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{quest.name}</h3>
                        <Badge variant="outline" className="text-xs">{quest.type}</Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">+{quest.reward} XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{quest.desc}</p>
                    <Progress value={quest.progress} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{quest.progress}% complete</span>
                      <span>{quest.deadline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Daily Challenges</h2>
              {[
                { name: "First Commit", desc: "Push a commit to any project", reward: 25, done: true },
                { name: "Help Someone", desc: "Answer a community question", reward: 30, done: true },
                { name: "AI Explorer", desc: "Use an AI tool in the studio", reward: 20, done: false },
                { name: "Review Code", desc: "Review a pull request", reward: 35, done: false },
                { name: "Knowledge Share", desc: "Add to the knowledge graph", reward: 25, done: false },
              ].map((challenge) => (
                <Card key={challenge.name} className={`hover:shadow-md transition-all ${challenge.done ? "border-green-500/20" : ""}`}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${challenge.done ? "bg-green-500" : "bg-muted"}`}>
                      {challenge.done ? <Star className="h-4 w-4 text-white" /> : <Target className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{challenge.name}</h3>
                      <p className="text-xs text-muted-foreground">{challenge.desc}</p>
                    </div>
                    <Badge variant={challenge.done ? "success" : "outline"} className="text-xs">
                      {challenge.done ? "Done" : `+${challenge.reward} XP`}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center gap-3 p-4 border-b last:border-0 hover:bg-accent/50 transition-colors ${entry.name === "You" ? "bg-primary/5" : ""}`}>
                  <span className={`text-lg font-bold w-8 text-center ${entry.rank <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>#{entry.rank}</span>
                  <Avatar className="h-10 w-10"><AvatarFallback className={`text-sm ${entry.name === "You" ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-primary font-bold" : "bg-primary/10 text-primary"}`}>{entry.name === "You" ? "ME" : entry.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${entry.name === "You" ? "text-primary" : ""}`}>{entry.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Level {entry.level}</span>
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-500" />{entry.streak} day streak</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{entry.xp.toLocaleString()} XP</p>
                    <Badge variant={entry.badge === "gold" ? "warning" : entry.badge === "silver" ? "secondary" : "outline"} className="text-xs capitalize">{entry.badge}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <Card key={cert.name} className={`hover:shadow-md transition-all ${cert.status === "locked" ? "opacity-60" : ""}`}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cert.status === "earned" ? "bg-gradient-to-r from-amber-500 to-orange-500" : cert.status === "in_progress" ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20" : "bg-muted"}`}>
                      {cert.status === "earned" ? <Award className="h-6 w-6 text-white" /> : cert.status === "in_progress" ? <BookOpen className="h-6 w-6 text-violet-500" /> : <Lock className="h-6 w-6 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.level}</p>
                    </div>
                    <Badge variant={cert.status === "earned" ? "success" : cert.status === "in_progress" ? "info" : "secondary"} className="capitalize">{cert.status.replace("_", " ")}</Badge>
                  </div>
                  {cert.status === "earned" && <p className="text-xs text-muted-foreground">Earned: {cert.date}</p>}
                  {cert.status === "in_progress" && cert.progress !== undefined && (
                    <div>
                      <Progress value={cert.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{cert.progress}% complete</p>
                    </div>
                  )}
                  {cert.status !== "locked" && <Button variant="outline" size="sm" className="w-full">{cert.status === "earned" ? "View Certificate" : "Continue Learning"}</Button>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
