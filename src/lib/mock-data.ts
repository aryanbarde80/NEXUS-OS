import type {
  Achievement,
  Agent,
  BlogPost,
  DomainCheckResult,
  ForumPost,
  Notification,
  Project,
  Task,
  User,
} from "@/types";

const now = "2026-03-28T10:00:00.000Z";

export const defaultWorkflow = [
  { id: "backlog", name: "Backlog", color: "#64748b", order: 0 },
  { id: "todo", name: "To Do", color: "#0ea5e9", order: 1 },
  { id: "in_progress", name: "In Progress", color: "#f59e0b", order: 2 },
  { id: "in_review", name: "In Review", color: "#8b5cf6", order: 3 },
  { id: "done", name: "Done", color: "#22c55e", order: 4 },
];

const achievements: Achievement[] = [
  {
    id: "achv-task-master",
    name: "Task Master",
    description: "Complete 100 tracked tasks across the workspace.",
    icon: "check",
    category: "productivity",
    xpReward: 500,
    unlockedAt: "2026-03-23T09:00:00.000Z",
    progress: 100,
    target: 100,
  },
  {
    id: "achv-launchpad",
    name: "Launchpad",
    description: "Ship the first live customer-facing release.",
    icon: "rocket",
    category: "shipping",
    xpReward: 350,
    progress: 1,
    target: 1,
  },
];

export const seedUser: User = {
  id: "user-1",
  email: "aryan@nexus.app",
  username: "aryan",
  walletAddresses: ["0x8E0f...94C1"],
  profile: {
    name: "Aryan Barde",
    avatar: "",
    bio: "Building a creator operating system with AI-native workflows.",
    website: "https://nexus.app",
    socialLinks: {
      github: "aryanbarde80",
      twitter: "NexusOS",
      website: "https://nexus.app",
    },
    skills: ["Product strategy", "Frontend systems", "AI tooling"],
    location: "Pune, India",
  },
  settings: {
    theme: "dark",
    language: "en",
    notifications: {
      email: true,
      push: true,
      sms: false,
      inApp: true,
      digest: "daily",
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showActivity: true,
    },
    twoFactorEnabled: false,
  },
  roles: ["admin"],
  createdAt: "2026-01-12T08:00:00.000Z",
  lastActive: now,
  reputation: 1480,
  tokenBalance: 2240,
  xp: 4820,
  level: 12,
  achievements,
};

function buildTasks(projectId: string, items: Array<Partial<Task> & Pick<Task, "id" | "title" | "status" | "priority">>): Task[] {
  return items.map((item, index) => ({
    projectId,
    description: item.description ?? `${item.title} execution detail`,
    dependencies: item.dependencies ?? [],
    labels: item.labels ?? [],
    comments: item.comments ?? [],
    attachments: item.attachments ?? [],
    createdAt: item.createdAt ?? now,
    updatedAt: item.updatedAt ?? now,
    order: item.order ?? index,
    ...item,
  }));
}

const projectTasks: Record<string, Task[]> = {
  "project-1": buildTasks("project-1", [
    { id: "task-1", title: "Finalize onboarding flow", status: "done", priority: "high", completedAt: "2026-03-27T13:00:00.000Z" },
    { id: "task-2", title: "Ship dashboard KPI cards", status: "done", priority: "medium", completedAt: "2026-03-27T16:30:00.000Z" },
    { id: "task-3", title: "Wire domain search state", status: "in_progress", priority: "critical", dueDate: "2026-03-29T12:00:00.000Z" },
    { id: "task-4", title: "Persist generated AI drafts", status: "todo", priority: "high", dueDate: "2026-03-30T12:00:00.000Z" },
    { id: "task-5", title: "Launch internal alpha checklist", status: "backlog", priority: "medium" },
  ]),
  "project-2": buildTasks("project-2", [
    { id: "task-6", title: "Map project metrics to analytics", status: "in_review", priority: "high" },
    { id: "task-7", title: "Define content templates", status: "done", priority: "medium", completedAt: "2026-03-26T11:00:00.000Z" },
    { id: "task-8", title: "Create launch narrative", status: "todo", priority: "medium" },
    { id: "task-9", title: "Coordinate waitlist email", status: "todo", priority: "low" },
  ]),
  "project-3": buildTasks("project-3", [
    { id: "task-10", title: "Review escrow fee logic", status: "done", priority: "high" },
    { id: "task-11", title: "Add listing detail CTA", status: "in_progress", priority: "medium" },
    { id: "task-12", title: "Draft seller onboarding docs", status: "backlog", priority: "low" },
  ]),
};

function buildProject(
  id: string,
  name: string,
  description: string,
  status: Project["status"],
  tags: string[],
  visibility: Project["visibility"],
  members: Array<{ userId: string; role: "owner" | "admin" | "member" | "viewer" }>,
) : Project {
  const tasks = projectTasks[id] ?? [];
  const completedTasks = tasks.filter((task) => task.status === "done").length;

  return {
    id,
    ownerId: "user-1",
    name,
    description,
    status,
    settings: {
      defaultView: "kanban",
      sprintsEnabled: true,
      estimationType: "story_points",
      workflow: defaultWorkflow,
    },
    metadata: {
      totalTasks: tasks.length,
      completedTasks,
      totalMembers: members.length,
      lastActivity: now,
    },
    tasks,
    members: members.map((member) => ({
      ...member,
      joinedAt: "2026-02-01T08:00:00.000Z",
    })),
    createdAt: "2026-02-01T08:00:00.000Z",
    updatedAt: now,
    tags,
    visibility,
  };
}

export const seedProjects: Project[] = [
  buildProject(
    "project-1",
    "NEXUS OS Core Workspace",
    "Primary MVP workspace covering dashboard, projects, domains, AI studio, and notifications.",
    "active",
    ["Next.js", "Zustand", "MVP"],
    "private",
    [
      { userId: "user-1", role: "owner" },
      { userId: "user-2", role: "member" },
      { userId: "user-3", role: "viewer" },
    ],
  ),
  buildProject(
    "project-2",
    "Launch Content Engine",
    "Create GTM messaging, launch assets, and AI-assisted writing workflows for product rollout.",
    "active",
    ["Content", "SEO", "Growth"],
    "team",
    [
      { userId: "user-1", role: "owner" },
      { userId: "user-4", role: "member" },
    ],
  ),
  buildProject(
    "project-3",
    "Marketplace Pilot",
    "Validate digital asset listings, escrow flows, and trust signals before public release.",
    "paused",
    ["Marketplace", "Payments", "Trust"],
    "team",
    [
      { userId: "user-1", role: "owner" },
      { userId: "user-5", role: "member" },
    ],
  ),
];

export const seedNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "task_completed",
    title: "Dashboard metrics shipped",
    content: "The KPI cards and weekly activity chart are now live in the workspace shell.",
    metadata: { projectId: "project-1" },
    read: false,
    createdAt: "2026-03-28T07:10:00.000Z",
    actionUrl: "/dashboard",
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "task_assigned",
    title: "Domain generator needs review",
    content: "Review the new domain suggestion scoring before the MVP demo.",
    metadata: { projectId: "project-1", taskId: "task-3" },
    read: false,
    createdAt: "2026-03-28T06:45:00.000Z",
    actionUrl: "/domains",
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "agent_completed",
    title: "Content sprint run finished",
    content: "Launch Content Agent prepared two draft posts and refreshed the editorial queue.",
    metadata: { projectId: "project-2" },
    read: false,
    createdAt: "2026-03-27T17:20:00.000Z",
    actionUrl: "/ai",
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "achievement_unlocked",
    title: "Achievement unlocked",
    content: "You reached Level 12 after closing the alpha sprint.",
    metadata: {},
    read: true,
    createdAt: "2026-03-27T10:00:00.000Z",
  },
];

export const seedBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    authorId: "user-1",
    title: "How We Are Turning NEXUS OS Into a Creator Workspace MVP",
    content: "A practical breakdown of the core modules, local-first UX, and why shared state matters.",
    excerpt: "A practical breakdown of the core modules and the MVP decisions behind them.",
    slug: "nexus-os-workspace-mvp",
    status: "published",
    seoScore: 91,
    tags: ["MVP", "Product", "Engineering"],
    category: "Product",
    thumbnail: "",
    publishedAt: "2026-03-26T10:00:00.000Z",
    createdAt: "2026-03-26T09:00:00.000Z",
    updatedAt: "2026-03-26T10:00:00.000Z",
    views: 1840,
    likes: 126,
    readingTime: 7,
  },
  {
    id: "post-2",
    authorId: "user-1",
    title: "Designing an AI Studio That Ships Drafts Faster",
    content: "Use structured prompts, reusable outlines, and a publish queue to make AI writing operational.",
    excerpt: "Structured prompts and publish queues make AI writing operational.",
    slug: "ai-studio-operational-drafts",
    status: "draft",
    seoScore: 84,
    tags: ["AI", "Writing", "Workflow"],
    category: "AI",
    thumbnail: "",
    createdAt: "2026-03-27T11:00:00.000Z",
    updatedAt: "2026-03-27T15:00:00.000Z",
    views: 0,
    likes: 0,
    readingTime: 6,
  },
];

export const seedAgents: Agent[] = [
  {
    id: "agent-1",
    ownerId: "user-1",
    name: "Launch Content Agent",
    type: "content_writer",
    description: "Produces launch blog drafts, announcements, and social copy from the roadmap.",
    configuration: {
      model: "gpt-5.4",
      tools: ["editorial-calendar", "seo-checklist"],
      triggers: ["manual", "schedule"],
      permissions: ["write:drafts"],
      temperature: 0.7,
      maxTokens: 3200,
      systemPrompt: "Write concise launch-ready content anchored in current product state.",
    },
    schedule: {
      type: "interval",
      expression: "every 24h",
      timezone: "Asia/Calcutta",
    },
    lastRun: "2026-03-27T17:10:00.000Z",
    status: "active",
    runs: [
      {
        id: "agent-run-1",
        agentId: "agent-1",
        startedAt: "2026-03-27T17:00:00.000Z",
        completedAt: "2026-03-27T17:10:00.000Z",
        status: "completed",
        output: "Prepared 2 launch drafts and refreshed the keyword plan.",
        tokensUsed: 1820,
        cost: 0.94,
      },
    ],
  },
];

export const seedDomainResults: DomainCheckResult[] = [
  {
    domain: "nexusflow.app",
    available: true,
    price: 14.99,
    currency: "USD",
    suggestions: [
      { domain: "nexusflow.app", available: true, price: 14.99, seoScore: 85 },
      { domain: "nexusflow.io", available: false, seoScore: 90 },
      { domain: "getnexusflow.com", available: true, price: 11.99, seoScore: 78 },
    ],
    aiAnalysis: {
      viabilityScore: 84,
      marketGap: "Clear positioning for an AI-first workspace with operational automation and digital product workflows.",
      competitors: ["Notion", "Linear", "ClickUp", "Replit"],
      recommendations: [
        "Lead with creator workflow outcomes rather than feature count.",
        "Show AI output tied to projects, not generic chat.",
        "Use domain search as an early ideation funnel.",
      ],
      risks: [
        "Workspace tooling is crowded, so the product narrative has to stay narrow.",
        "Too many modules can dilute the first-time user journey.",
      ],
      monetizationPotential: "Strong SaaS upside with paid AI usage and premium collaboration features.",
    },
    checkedAt: "2026-03-27T12:00:00.000Z",
  },
];

export const seedForumPosts: ForumPost[] = [
  {
    id: "forum-1",
    authorId: "user-1",
    title: "What should the first public NEXUS OS release include?",
    content: "The current proposal is dashboard, projects, domain validator, AI studio, and notifications as the first coherent release.",
    category: "Roadmap",
    tags: ["release", "mvp"],
    replies: [],
    views: 92,
    likes: 18,
    isPinned: true,
    isSolved: false,
    createdAt: "2026-03-25T09:00:00.000Z",
    updatedAt: "2026-03-26T09:00:00.000Z",
  },
];

export function scoreIdea(query: string) {
  const normalized = query.trim().toLowerCase();
  const signal =
    (normalized.length * 7) +
    (normalized.includes("ai") ? 12 : 0) +
    (normalized.includes("flow") ? 8 : 0) +
    (normalized.includes("hub") ? 4 : 0);

  return Math.max(58, Math.min(94, signal % 97));
}

export function createDomainResult(query: string): DomainCheckResult {
  const base = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "") || "nexus";
  const viabilityScore = scoreIdea(base);

  return {
    domain: `${base}.app`,
    available: base.length % 2 === 0,
    price: 12.99,
    currency: "USD",
    suggestions: [
      { domain: `${base}.app`, available: base.length % 2 === 0, price: 12.99, seoScore: viabilityScore },
      { domain: `${base}.io`, available: base.length % 3 !== 0, price: 29.99, seoScore: Math.min(96, viabilityScore + 6) },
      { domain: `get${base}.com`, available: true, price: 9.99, seoScore: Math.max(61, viabilityScore - 8) },
      { domain: `${base}hq.dev`, available: true, price: 8.99, seoScore: Math.max(55, viabilityScore - 10) },
    ],
    aiAnalysis: {
      viabilityScore,
      marketGap: `${query} has room if positioned around specific workflow outcomes and a clear buyer persona.`,
      competitors: ["Notion", "Framer", "Zapier", "Canva"],
      recommendations: [
        "Validate with a narrow ICP before broad platform messaging.",
        "Use creator stories and workflow examples to make the concept concrete.",
        "Pair naming with an SEO-safe content angle from day one.",
      ],
      risks: [
        "Generic branding can make acquisition more expensive.",
        "Broad product language can reduce conversion if the landing page is not specific.",
      ],
      monetizationPotential: "Good potential via subscriptions, template packs, and AI-assisted premium workflows.",
    },
    checkedAt: new Date().toISOString(),
  };
}

export function createGeneratedPost(prompt: string): BlogPost {
  const topic = prompt.trim() || "Untitled Workspace Draft";
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `post-${slug || "draft"}-${Date.now()}`,
    authorId: "user-1",
    title: topic,
    content: [
      `## Why this matters`,
      `${topic} matters because NEXUS OS is strongest when product workflows, AI output, and execution tracking all connect in one surface.`,
      `## Suggested angle`,
      `Lead with a concrete user problem, show the workflow before the feature list, and finish with a measurable outcome.`,
      `## Draft CTA`,
      `Invite readers to try the MVP workspace and give feedback on the part that saved the most time.`,
    ].join("\n\n"),
    excerpt: `AI-generated draft for ${topic}.`,
    slug: slug || `draft-${Date.now()}`,
    status: "draft",
    seoScore: Math.max(70, Math.min(96, scoreIdea(topic))),
    tags: ["AI Generated", "NEXUS OS"],
    category: "Drafts",
    thumbnail: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    readingTime: 5,
  };
}
