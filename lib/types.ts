// ─── Chat ───────────────────────────────────────────────────────────────────
export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  intent?: "schedule" | "resources" | "deadline" | "general" | "plan";
}

export interface ConversationSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

// ─── Schedule ────────────────────────────────────────────────────────────────
export type EventType = "lecture" | "td" | "tp" | "exam" | "deadline" | "seminar";

export interface ScheduleEvent {
  id: string;
  title: string;
  module: string;
  type: EventType;
  date: string;         // ISO date string YYYY-MM-DD
  startTime: string;   // HH:MM
  endTime: string;     // HH:MM
  room?: string;
  professor?: string;
  color: string;
}

export type WeekDay = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

// ─── Modules / Curriculum ────────────────────────────────────────────────────
export type Semester = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export interface Module {
  id: string;
  code: string;
  name: string;
  nameAr?: string;
  credits: number;
  coefficient: number;
  semester: Semester;
  category: "fundamental" | "methodological" | "discovery" | "transversal";
  professor?: string;
  progress: number;      // 0–100
  grade?: number;
  color: string;
}

// ─── Study Plan ───────────────────────────────────────────────────────────────
export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface StudyTask {
  id: string;
  moduleId: string;
  moduleName: string;
  moduleColor: string;
  title: string;
  description?: string;
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
}

export interface StudyBlock {
  id: string;
  taskId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

// ─── Resources ───────────────────────────────────────────────────────────────
export type ResourceType = "pdf" | "video" | "link" | "exercise" | "past-exam" | "book";

export interface Resource {
  id: string;
  moduleId: string;
  moduleName: string;
  title: string;
  type: ResourceType;
  url?: string;
  description?: string;
  source: string;
  rating?: number;
  tags: string[];
  savedAt?: Date;
  aiSuggested?: boolean;
}

// ─── User ─────────────────────────────────────────────────────────────────────
// lib/types.ts (add these fields to StudentProfile)
export interface StudentProfile {
  name: string;
  studentId: string;
  university: string;
  department: string;
  year: number;
  semester: Semester;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────
export interface N8NWebhookPayload {
  sessionId: string;
  message: string;
  studentId: string;
  context: {
    currentModules: string[];
    upcomingDeadlines: string[];
    activeScreen: string;
  };
}

export interface N8NWebhookResponse {
  reply: string;
  intent?: string;
  data?: {
    events?: ScheduleEvent[];
    tasks?: StudyTask[];
    resources?: Resource[];
  };
  suggestedActions?: Array<{
    label: string;
    action: string;
    payload?: Record<string, unknown>;
  }>;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export type NavSection = "chat" | "schedule" | "planner" | "resources" | "modules";
