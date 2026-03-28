"use client";

import { useEffect } from "react";
import { useAIStore, useAppStore, useCommunityStore } from "@/lib/store";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
  const initializeAppData = useAppStore((state) => state.initializeData);
  const initializeAIData = useAIStore((state) => state.initializeData);
  const initializeCommunityData = useCommunityStore((state) => state.initializeData);
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    initializeAppData();
    initializeAIData();
    initializeCommunityData();
  }, [initializeAIData, initializeAppData, initializeCommunityData]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme !== "light");
  }, [theme]);

  return <>{children}</>;
}
