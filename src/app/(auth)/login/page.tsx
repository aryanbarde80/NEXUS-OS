"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, GitBranch, Globe, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative z-10 w-full max-w-md mx-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <span className="text-lg font-bold text-white">N</span>
          </div>
          <span className="text-2xl font-bold gradient-text">NEXUS OS</span>
        </div>
        <p className="text-muted-foreground">Welcome back to your digital empire</p>
      </div>
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="h-11"><GitBranch className="h-5 w-5" /></Button>
                        <Button variant="outline" className="h-11"><Globe className="h-5 w-5" /></Button>
            <Button variant="outline" className="h-11"><Wallet className="h-5 w-5" /></Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><Separator /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@nexus.app" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full" variant="gradient" size="lg" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
