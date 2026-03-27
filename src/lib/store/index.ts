import { create } from "zustand";
import type {
  User,
  Project,
  Task,
  Notification,
  Agent,
  MarketplaceListing,
  BlogPost,
  DomainCheckResult,
  ForumPost,
  Achievement,
} from "@/types";

// --- App Store ---
interface AppStore {
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  notifications: Notification[];
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";

  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  setCurrentProject: (project: Project | null) => void;
  updateTask: (task: Task) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  projects: [],
  currentProject: null,
  notifications: [],
  sidebarOpen: true,
  theme: "dark",

  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  setCurrentProject: (project) => set({ currentProject: project }),
  updateTask: (task) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === task.projectId
          ? { ...p, tasks: p.tasks.map((t) => (t.id === task.id ? task : t)) }
          : p
      ),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));

// --- Marketplace Store ---
interface MarketplaceStore {
  listings: MarketplaceListing[];
  selectedCategory: string | null;
  searchQuery: string;
  setListings: (listings: MarketplaceListing[]) => void;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  listings: [],
  selectedCategory: null,
  searchQuery: "",
  setListings: (listings) => set({ listings }),
  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// --- AI Store ---
interface AIStore {
  agents: Agent[];
  blogPosts: BlogPost[];
  domainResults: DomainCheckResult[];
  isGenerating: boolean;
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: BlogPost) => void;
  setDomainResults: (results: DomainCheckResult[]) => void;
  setIsGenerating: (generating: boolean) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  agents: [],
  blogPosts: [],
  domainResults: [],
  isGenerating: false,
  setAgents: (agents) => set({ agents }),
  addAgent: (agent) =>
    set((state) => ({ agents: [...state.agents, agent] })),
  setBlogPosts: (posts) => set({ blogPosts: posts }),
  addBlogPost: (post) =>
    set((state) => ({ blogPosts: [post, ...state.blogPosts] })),
  setDomainResults: (results) => set({ domainResults: results }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
}));

// --- Community Store ---
interface CommunityStore {
  posts: ForumPost[];
  achievements: Achievement[];
  setPosts: (posts: ForumPost[]) => void;
  addPost: (post: ForumPost) => void;
  setAchievements: (achievements: Achievement[]) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  posts: [],
  achievements: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => ({ posts: [post, ...state.posts] })),
  setAchievements: (achievements) => set({ achievements }),
}));
