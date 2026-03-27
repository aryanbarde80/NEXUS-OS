"use client";

import React from "react";
import { Trophy, Star, Target, Flame, Award, Crown, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const achievements = [
  { name: "First Project", desc: "Create your first project", icon: Star, unlocked: true, xp: 100 },
  { name: "Task Master", desc: "Complete 100 tasks", icon: Target, unlocked: true, xp: 500 },
  { name: "Content Creator", desc: "Publish 10 blog posts", icon: Flame, unlocked: false, progress: 60, xp: 300 },
  { name: "Community Hero", desc: "Help 50 community members", icon: Award, unlocked: false, progress: 35, xp: 750 },
  { name: "Marketplace Maven", desc: "Make 10 marketplace sales", icon: Crown, unlocked: false, progress: 20, xp: 1000 },
  { name: "Code Wizard", desc: "Review 25 pull requests", icon: Zap, unlocked: true, xp: 250 },
];

const leaderboard = [
  { rank: 1, name: "Alex K.", xp: 15200, level: 16, badge: "gold" },
  { rank: 2, name: "Maria R.", xp: 12800, level: 13, badge: "gold" },
  { rank: 3, name: "Jake M.", xp: 11500, level: 12, badge: "silver" },
  { rank: 4, name: "Sarah L.", xp: 9800, level: 10, badge: "silver" },
  { rank: 5, name: "Dev P.", xp: 8200, level: 9, badge: "bronze" },
];

export default function GamificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gamification</h1>
        <p className="text-muted-foreground">Level up your skills and earn rewards</p>
      </div>

      <Card className="bg-gradient-to-r from-violet-600/10 to-cyan-500/10 border-violet-500/20">
        <CardContent className="flex items-center gap-6 p-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">8</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Level 8 - Digital Architect</h2>
            <p className="text-sm text-muted-foreground mb-2">4,200 / 5,000 XP to next level</p>
            <Progress value={84} className="h-3" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">4,200</div>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <Card key={ach.name} className={`${ach.unlocked ? "" : "opacity-70"} hover:shadow-md transition-all`}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`h-10 w-10 rounded-lg ${ach.unlocked ? "bg-gradient-to-r from-violet-600 to-cyan-500" : "bg-muted"} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${ach.unlocked ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{ach.name}</h3>
                        {ach.unlocked && <Badge variant="success" className="text-xs">Unlocked</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{ach.desc}</p>
                      {!ach.unlocked && ach.progress !== undefined && <Progress value={ach.progress} className="h-1 mt-1" />}
                    </div>
                    <Badge variant="outline" className="text-xs">+{ach.xp} XP</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-500" /> Leaderboard</h2>
          <Card>
            <CardContent className="p-0">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3 p-4 border-b last:border-0 hover:bg-accent/50 transition-colors">
                  <span className={`text-lg font-bold w-8 ${entry.rank <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>#{entry.rank}</span>
                  <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{entry.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{entry.xp.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <h2 className="text-lg font-semibold flex items-center gap-2 mt-4"><Target className="h-5 w-5 text-cyan-500" /> Active Quests</h2>
          <div className="space-y-3">
            {[
              { name: "Weekly Sprint", desc: "Complete 20 tasks this week", progress: 65, reward: 200, deadline: "3 days left" },
              { name: "Content Marathon", desc: "Generate 5 AI blog posts", progress: 40, reward: 150, deadline: "5 days left" },
              { name: "Community Builder", desc: "Answer 10 community questions", progress: 80, reward: 300, deadline: "2 days left" },
            ].map((quest) => (
              <Card key={quest.name} className="hover:shadow-md transition-all">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{quest.name}</h3>
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
        </div>
      </div>
    </div>
  );
}
