"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="relative z-10 w-full max-w-md mx-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <span className="text-lg font-bold text-white">N</span>
          </div>
          <span className="text-2xl font-bold gradient-text">NEXUS OS</span>
        </div>
      </div>
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>Enter your email to receive a reset link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="hello@nexus.app" /></div>
          <Button className="w-full" variant="gradient" size="lg"><Mail className="mr-2 h-4 w-4" /> Send Reset Link</Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
