// ============================================
// NEXUS OS - Core Type Definitions
// ============================================

// --- User & Auth Types ---
export interface User {
  id: string;
  email: string;
  username: string;
  walletAddresses: string[];
  profile: UserProfile;
  settings: UserSettings;
  roles: Role[];
  createdAt: string;
  lastActive: string;
  reputation: number;
  tokenBalance: number;
  xp: number;
  level: number;
  achievements: Achievement[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
  website: string;
  socialLinks: SocialLinks;
  skills: string[];
  location: string;
}

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  discord?: string;
  website?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  twoFactorEnabled: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  digest: 'daily' | 'weekly' | 'none';
}

export interface PrivacySettings {
  profilePublic: boolean;
  showEmail: boolean;
  showActivity: boolean;
}

export type Role = 'admin' | 'user' | 'moderator' | 'contributor' | 'enterprise';

// --- Project Types ---
export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  settings: ProjectSettings;
  metadata: ProjectMetadata;
  tasks: Task[];
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  visibility: 'public' | 'private' | 'team';
}

export type ProjectStatus = 'active' | 'archived' | 'deleted' | 'paused';

export interface ProjectSettings {
  defaultView: 'kanban' | 'list' | 'timeline' | 'calendar';
  sprintsEnabled: boolean;
  estimationType: 'story_points' | 'hours' | 'tshirt';
  workflow: WorkflowStage[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface ProjectMetadata {
  totalTasks: number;
  completedTasks: number;
  totalMembers: number;
  lastActivity: string;
}

export interface ProjectMember {
  userId: string;
  user?: User;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: string;
}

// --- Task Types ---
export interface Task {
  id: string;
  projectId: string;
  assigneeId?: string;
  assignee?: User;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  storyPoints?: number;
  dueDate?: string;
  parentId?: string;
  dependencies: string[];
  labels: string[];
  comments: Comment[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  sprintId?: string;
  order: number;
}

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled';
export type Priority = 'critical' | 'high' | 'medium' | 'low' | 'none';

export interface Comment {
  id: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  userId: string;
  count: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

// --- Sprint Types ---
export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  tasks: string[];
}

// --- Domain Types ---
export interface DomainCheckResult {
  domain: string;
  available: boolean;
  price?: number;
  currency?: string;
  suggestions: DomainSuggestion[];
  aiAnalysis: AIAnalysis;
  checkedAt: string;
}

export interface DomainSuggestion {
  domain: string;
  available: boolean;
  price?: number;
  seoScore: number;
}

export interface AIAnalysis {
  viabilityScore: number;
  marketGap: string;
  competitors: string[];
  recommendations: string[];
  risks: string[];
  monetizationPotential: string;
}

// --- Marketplace Types ---
export interface MarketplaceListing {
  id: string;
  sellerId: string;
  seller?: User;
  title: string;
  description: string;
  category: ListingCategory;
  price: number;
  currency: 'USD' | 'USDC' | 'NEXUS';
  files: ListingFile[];
  status: 'draft' | 'active' | 'sold' | 'suspended';
  reviews: Review[];
  rating: number;
  downloads: number;
  createdAt: string;
  tags: string[];
  thumbnail: string;
}

export type ListingCategory =
  | 'prompts'
  | 'templates'
  | 'code'
  | 'domains'
  | 'services'
  | 'assets'
  | 'courses';

export interface ListingFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Review {
  id: string;
  userId: string;
  user?: User;
  rating: number;
  content: string;
  createdAt: string;
}

export interface EscrowTransaction {
  id: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: 'USD' | 'USDC' | 'NEXUS';
  status: 'pending' | 'funded' | 'released' | 'disputed';
  deadline: string;
  arbitratorId?: string;
}

// --- AI Agent Types ---
export interface Agent {
  id: string;
  ownerId: string;
  name: string;
  type: AgentType;
  description: string;
  configuration: AgentConfig;
  schedule?: AgentSchedule;
  lastRun?: string;
  status: 'active' | 'paused' | 'error';
  runs: AgentRun[];
}

export type AgentType =
  | 'researcher'
  | 'social_media'
  | 'code_buddy'
  | 'negotiator'
  | 'seo_optimizer'
  | 'data_analyst'
  | 'customer_support'
  | 'content_writer';

export interface AgentConfig {
  model: string;
  tools: string[];
  triggers: string[];
  permissions: string[];
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export interface AgentSchedule {
  type: 'cron' | 'interval' | 'event';
  expression: string;
  timezone: string;
}

export interface AgentRun {
  id: string;
  agentId: string;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed';
  output?: string;
  tokensUsed: number;
  cost: number;
}

// --- Blog/Content Types ---
export interface BlogPost {
  id: string;
  authorId: string;
  author?: User;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  seoScore: number;
  tags: string[];
  category: string;
  thumbnail: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  readingTime: number;
}

// --- Knowledge Graph Types ---
export interface GraphNode {
  id: string;
  type: 'project' | 'user' | 'task' | 'document' | 'domain' | 'technology';
  label: string;
  properties: Record<string, unknown>;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label: string;
  weight: number;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// --- Notification Types ---
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export type NotificationType =
  | 'task_assigned'
  | 'task_completed'
  | 'comment_added'
  | 'project_invite'
  | 'marketplace_sale'
  | 'agent_completed'
  | 'achievement_unlocked'
  | 'system';

// --- Analytics Types ---
export interface AnalyticsData {
  period: string;
  metrics: AnalyticsMetric[];
  charts: ChartData[];
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface ChartData {
  name: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: DataPoint[];
}

export interface DataPoint {
  label: string;
  value: number;
  [key: string]: string | number;
}

// --- Web3/DAO Types ---
export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  type: ProposalType;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  votesFor: number;
  votesAgainst: number;
  startDate: string;
  endDate: string;
  executionData?: string;
}

export type ProposalType =
  | 'feature_request'
  | 'budget_allocation'
  | 'maintainer_election'
  | 'license_change';

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  owner: string;
  items: NFTItem[];
  floorPrice: number;
  totalVolume: number;
}

export interface NFTItem {
  id: string;
  tokenId: string;
  name: string;
  image: string;
  attributes: Record<string, string>;
  price?: number;
  owner: string;
}

// --- Gamification Types ---
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xpReward: number;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  level: number;
  achievements: number;
  contributions: number;
}

// --- Vault Types ---
export interface VaultItem {
  id: string;
  name: string;
  type: 'password' | 'api_key' | 'note' | 'file' | 'certificate';
  encryptedData: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  lastAccessed?: string;
  sharedWith: string[];
}

// --- Community Types ---
export interface ForumPost {
  id: string;
  authorId: string;
  author?: User;
  title: string;
  content: string;
  category: string;
  tags: string[];
  replies: ForumReply[];
  views: number;
  likes: number;
  isPinned: boolean;
  isSolved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  authorId: string;
  author?: User;
  content: string;
  likes: number;
  isAccepted: boolean;
  createdAt: string;
}

// --- Collaboration Types ---
export interface CollaborationRoom {
  id: string;
  name: string;
  type: 'document' | 'whiteboard' | 'code' | 'video';
  participants: string[];
  createdAt: string;
  isActive: boolean;
}

// --- Carbon Tracking Types ---
export interface CarbonFootprint {
  serverEmissions: number;
  networkEmissions: number;
  userDeviceEmissions: number;
  total: number;
  recommendations: CarbonRecommendation[];
}

export interface CarbonRecommendation {
  action: string;
  impact: 'high' | 'medium' | 'low';
  savings: number;
}

// --- Event Types ---
export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: string;
  properties: Record<string, unknown>;
  createdAt: string;
}
