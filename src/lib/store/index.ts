import { create } from "zustand";
import { persist } from "zustand/middleware";
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
import {
  seedAgents,
  seedBlogPosts,
  seedDomainResults,
  seedForumPosts,
  seedNotifications,
  seedProjects,
  seedUser,
} from "@/lib/mock-data";

function recalcProject(project: Project): Project {
  const completedTasks = project.tasks.filter((task) => task.status === "done").length;
  return {
    ...project,
    metadata: {
      ...project.metadata,
      totalTasks: project.tasks.length,
      completedTasks,
      totalMembers: project.members.length,
      lastActivity: new Date().toISOString(),
    },
    updatedAt: new Date().toISOString(),
  };
}

interface AppStore {
  isBootstrapped: boolean;
  user: User | null;
  projects: Project[];
  currentProjectId: string | null;
  notifications: Notification[];
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  initializeData: () => void;
  setUser: (user: User | null) => void;
  updateUser: (updater: (user: User) => User) => void;
  addProject: (project: Project) => void;
  setCurrentProject: (projectId: string | null) => void;
  updateTask: (task: Task) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isBootstrapped: false,
      user: null,
      projects: [],
      currentProjectId: null,
      notifications: [],
      sidebarOpen: true,
      theme: "dark",
      initializeData: () =>
        set((state) => {
          if (state.isBootstrapped) {
            return state;
          }

          return {
            isBootstrapped: true,
            user: state.user ?? seedUser,
            projects: state.projects.length ? state.projects : seedProjects,
            currentProjectId: state.currentProjectId ?? seedProjects[0]?.id ?? null,
            notifications: state.notifications.length ? state.notifications : seedNotifications,
            theme: state.theme ?? seedUser.settings.theme,
          };
        }),
      setUser: (user) => set({ user }),
      updateUser: (updater) =>
        set((state) => ({
          user: state.user ? updater(state.user) : state.user,
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [recalcProject(project), ...state.projects],
          currentProjectId: project.id,
        })),
      setCurrentProject: (projectId) => set({ currentProjectId: projectId }),
      updateTask: (task) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === task.projectId
              ? recalcProject({
                  ...project,
                  tasks: project.tasks.some((current) => current.id === task.id)
                    ? project.tasks.map((current) => (current.id === task.id ? task : current))
                    : [...project.tasks, task],
                })
              : project,
          ),
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
        })),
      clearNotifications: () => set({ notifications: [] }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "nexus-app-store",
      partialize: (state) => ({
        isBootstrapped: state.isBootstrapped,
        user: state.user,
        projects: state.projects,
        currentProjectId: state.currentProjectId,
        notifications: state.notifications,
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
      }),
    },
  ),
);

interface AIStore {
  isBootstrapped: boolean;
  agents: Agent[];
  blogPosts: BlogPost[];
  domainResults: DomainCheckResult[];
  isGenerating: boolean;
  initializeData: () => void;
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: BlogPost) => void;
  setDomainResults: (results: DomainCheckResult[]) => void;
  addDomainResult: (result: DomainCheckResult) => void;
  setIsGenerating: (generating: boolean) => void;
}

export const useAIStore = create<AIStore>()(
  persist(
    (set) => ({
      isBootstrapped: false,
      agents: [],
      blogPosts: [],
      domainResults: [],
      isGenerating: false,
      initializeData: () =>
        set((state) => {
          if (state.isBootstrapped) {
            return state;
          }

          return {
            isBootstrapped: true,
            agents: state.agents.length ? state.agents : seedAgents,
            blogPosts: state.blogPosts.length ? state.blogPosts : seedBlogPosts,
            domainResults: state.domainResults.length ? state.domainResults : seedDomainResults,
          };
        }),
      setAgents: (agents) => set({ agents }),
      addAgent: (agent) =>
        set((state) => ({ agents: [agent, ...state.agents] })),
      setBlogPosts: (posts) => set({ blogPosts: posts }),
      addBlogPost: (post) =>
        set((state) => ({ blogPosts: [post, ...state.blogPosts] })),
      setDomainResults: (results) => set({ domainResults: results }),
      addDomainResult: (result) =>
        set((state) => ({
          domainResults: [result, ...state.domainResults.filter((item) => item.domain !== result.domain)],
        })),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
    }),
    {
      name: "nexus-ai-store",
      partialize: (state) => ({
        isBootstrapped: state.isBootstrapped,
        agents: state.agents,
        blogPosts: state.blogPosts,
        domainResults: state.domainResults,
      }),
    },
  ),
);

interface CommunityStore {
  isBootstrapped: boolean;
  posts: ForumPost[];
  achievements: Achievement[];
  initializeData: () => void;
  setPosts: (posts: ForumPost[]) => void;
  addPost: (post: ForumPost) => void;
  setAchievements: (achievements: Achievement[]) => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set) => ({
      isBootstrapped: false,
      posts: [],
      achievements: [],
      initializeData: () =>
        set((state) => {
          if (state.isBootstrapped) {
            return state;
          }

          return {
            isBootstrapped: true,
            posts: state.posts.length ? state.posts : seedForumPosts,
            achievements: state.achievements.length ? state.achievements : seedUser.achievements,
          };
        }),
      setPosts: (posts) => set({ posts }),
      addPost: (post) =>
        set((state) => ({ posts: [post, ...state.posts] })),
      setAchievements: (achievements) => set({ achievements }),
    }),
    {
      name: "nexus-community-store",
      partialize: (state) => ({
        isBootstrapped: state.isBootstrapped,
        posts: state.posts,
        achievements: state.achievements,
      }),
    },
  ),
);
