import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

export function generateId(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 15);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-green-500",
    completed: "bg-blue-500",
    done: "bg-blue-500",
    in_progress: "bg-yellow-500",
    in_review: "bg-purple-500",
    todo: "bg-gray-500",
    backlog: "bg-gray-400",
    cancelled: "bg-red-500",
    paused: "bg-orange-500",
    archived: "bg-gray-600",
    draft: "bg-gray-400",
    published: "bg-green-500",
    scheduled: "bg-blue-400",
  };
  return colors[status] || "bg-gray-500";
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    critical: "text-red-600 bg-red-50 border-red-200",
    high: "text-orange-600 bg-orange-50 border-orange-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    low: "text-blue-600 bg-blue-50 border-blue-200",
    none: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return colors[priority] || "text-gray-600 bg-gray-50 border-gray-200";
}

export const XP_PER_LEVEL = 1000;

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function calculateLevelProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}

export const XP_ACTIONS: Record<string, number> = {
  create_project: 100,
  complete_task: 50,
  publish_blog: 200,
  help_community: 150,
  refer_friend: 500,
  marketplace_sale: 300,
  code_review: 75,
  bug_report: 100,
};
