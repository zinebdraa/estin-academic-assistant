import type {
  Module, ScheduleEvent, StudyTask, Resource, ConversationSession, StudentProfile,
} from "./types";

// ─── Student ─────────────────────────────────────────────────────────────────
export const mockStudent: StudentProfile = {
  name: "Amira Bensalem",
  studentId: "2024-CS-0182",
  university: "ESTIN",
  department: "Computer Science & IT",
  year: 2,
  semester: "S3",
  
};

// ─── Modules (ESTIN L2 S3 approximate) ───────────────────────────────────────
export const mockModules: Module[] = [
  {
    id: "m1", code: "INF301", name: "Algorithms & Data Structures II",
    credits: 6, coefficient: 3, semester: "S3",
    category: "fundamental", professor: "Dr. Khelil Nassim",
    progress: 68, grade: 14.5, color: "#5a8c52",
  },
  {
    id: "m2", code: "INF302", name: "Object-Oriented Programming",
    credits: 6, coefficient: 3, semester: "S3",
    category: "fundamental", professor: "Dr. Merzougui Faiza",
    progress: 82, grade: 15.25, color: "#3878c7",
  },
  {
    id: "m3", code: "INF303", name: "Computer Architecture",
    credits: 5, coefficient: 2, semester: "S3",
    category: "fundamental", professor: "Mr. Benali Hichem",
    progress: 45, color: "#c73838",
  },
  {
    id: "m4", code: "MAT301", name: "Discrete Mathematics",
    credits: 5, coefficient: 3, semester: "S3",
    category: "fundamental", professor: "Dr. Zeraoulia Elhadj",
    progress: 55, grade: 12.0, color: "#c9972a",
  },
  {
    id: "m5", code: "INF304", name: "Operating Systems",
    credits: 4, coefficient: 2, semester: "S3",
    category: "fundamental", professor: "Dr. Boukhalfa Kamel",
    progress: 30, color: "#8b5cf6",
  },
  {
    id: "m6", code: "INF305", name: "Database Systems",
    credits: 4, coefficient: 2, semester: "S3",
    category: "fundamental", professor: "Dr. Guerroudj Mahfoud",
    progress: 72, grade: 16.0, color: "#e85c5c",
  },
  {
    id: "m7", code: "ANG301", name: "Technical English III",
    credits: 2, coefficient: 1, semester: "S3",
    category: "transversal", professor: "Ms. Berber Lynda",
    progress: 90, grade: 17.5, color: "#059669",
  },
];

// ─── Schedule Events ──────────────────────────────────────────────────────────
const today = new Date();
const fmt = (d: Date) => d.toISOString().split("T")[0];
const offset = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return fmt(d);
};

export const mockEvents: ScheduleEvent[] = [
  // Today
  { id: "e1", title: "Algorithms Lecture", module: "INF301", type: "lecture",
    date: fmt(today), startTime: "08:00", endTime: "09:30", room: "Amphi A", professor: "Dr. Khelil", color: "#5a8c52" },
  { id: "e2", title: "OOP Lab Session", module: "INF302", type: "tp",
    date: fmt(today), startTime: "10:00", endTime: "12:00", room: "Salle TP 2", professor: "Dr. Merzougui", color: "#3878c7" },
  { id: "e3", title: "Discrete Math TD", module: "MAT301", type: "td",
    date: fmt(today), startTime: "14:00", endTime: "15:30", room: "Salle 14", professor: "Dr. Zeraoulia", color: "#c9972a" },

  // Tomorrow
  { id: "e4", title: "Operating Systems Lecture", module: "INF304", type: "lecture",
    date: offset(1), startTime: "08:00", endTime: "09:30", room: "Amphi B", professor: "Dr. Boukhalfa", color: "#8b5cf6" },
  { id: "e5", title: "Database TD", module: "INF305", type: "td",
    date: offset(1), startTime: "11:00", endTime: "12:30", room: "Salle 08", professor: "Dr. Guerroudj", color: "#e85c5c" },

  // +2 days
  { id: "e6", title: "Computer Architecture TP", module: "INF303", type: "tp",
    date: offset(2), startTime: "10:00", endTime: "12:00", room: "Salle TP 1", color: "#c73838" },
  { id: "e7", title: "Algorithms Midterm Exam", module: "INF301", type: "exam",
    date: offset(2), startTime: "14:00", endTime: "16:00", room: "Amphi A", professor: "Dr. Khelil", color: "#5a8c52" },

  // +3 days
  { id: "e8", title: "OOP Project Deadline", module: "INF302", type: "deadline",
    date: offset(3), startTime: "23:59", endTime: "23:59", color: "#3878c7" },
  { id: "e9", title: "Technical English Seminar", module: "ANG301", type: "seminar",
    date: offset(3), startTime: "09:00", endTime: "10:30", room: "Salle 03", professor: "Ms. Berber", color: "#059669" },

  // +6 days
  { id: "e10", title: "Database Midterm Exam", module: "INF305", type: "exam",
    date: offset(6), startTime: "10:00", endTime: "12:00", room: "Amphi C", color: "#e85c5c" },
  { id: "e11", title: "Discrete Math TD", module: "MAT301", type: "td",
    date: offset(6), startTime: "14:00", endTime: "15:30", room: "Salle 14", color: "#c9972a" },

  // +9 days
  { id: "e12", title: "OS Project Submission", module: "INF304", type: "deadline",
    date: offset(9), startTime: "23:59", endTime: "23:59", color: "#8b5cf6" },
];

// ─── Study Tasks ─────────────────────────────────────────────────────────────
export const mockTasks: StudyTask[] = [
  {
    id: "t1", moduleId: "m1", moduleName: "Algorithms & DS II",
    moduleColor: "#5a8c52", title: "Revise sorting algorithms (QuickSort, MergeSort)",
    description: "Focus on time complexity proofs and in-place variants",
    dueDate: offset(2), estimatedHours: 3, loggedHours: 1.5,
    status: "in-progress", priority: "urgent", tags: ["exam-prep", "theory"],
  },
  {
    id: "t2", moduleId: "m2", moduleName: "OOP",
    moduleColor: "#3878c7", title: "Complete UML class diagrams for project",
    dueDate: offset(3), estimatedHours: 4, loggedHours: 0,
    status: "todo", priority: "high", tags: ["project", "design"],
  },
  {
    id: "t3", moduleId: "m6", moduleName: "Database Systems",
    moduleColor: "#e85c5c", title: "Practice normalization exercises (3NF, BCNF)",
    description: "Chapters 10–12 from Guerroudj's notes",
    dueDate: offset(6), estimatedHours: 2.5, loggedHours: 0.5,
    status: "todo", priority: "high", tags: ["exam-prep"],
  },
  {
    id: "t4", moduleId: "m4", moduleName: "Discrete Mathematics",
    moduleColor: "#c9972a", title: "Graph theory problem set #4",
    dueDate: offset(4), estimatedHours: 2, loggedHours: 2,
    status: "done", priority: "medium", tags: ["homework"],
  },
  {
    id: "t5", moduleId: "m5", moduleName: "Operating Systems",
    moduleColor: "#8b5cf6", title: "Implement Round Robin scheduler (C)",
    description: "Simulate a CPU scheduler with quantum = 4",
    dueDate: offset(9), estimatedHours: 6, loggedHours: 1,
    status: "in-progress", priority: "high", tags: ["project", "coding"],
  },
  {
    id: "t6", moduleId: "m3", moduleName: "Computer Architecture",
    moduleColor: "#c73838", title: "Read chapter on pipelining",
    dueDate: offset(5), estimatedHours: 1.5, loggedHours: 0,
    status: "todo", priority: "low", tags: ["reading"],
  },
];

// ─── Resources ────────────────────────────────────────────────────────────────
export const mockResources: Resource[] = [
  {
    id: "r1", moduleId: "m1", moduleName: "Algorithms & DS II",
    title: "Introduction to Algorithms (CLRS) — Chapter 6–8",
    type: "pdf", description: "Classic textbook sections on heaps and sorting",
    source: "MIT OpenCourseWare", rating: 5,
    tags: ["sorting", "textbook", "theory"], aiSuggested: true,
  },
  {
    id: "r2", moduleId: "m1", moduleName: "Algorithms & DS II",
    title: "Visualgo — Sorting Algorithms Visualizer",
    type: "link", url: "https://visualgo.net/en/sorting",
    description: "Interactive step-by-step visualization",
    source: "visualgo.net", rating: 5,
    tags: ["visualization", "interactive"], aiSuggested: true,
  },
  {
    id: "r3", moduleId: "m6", moduleName: "Database Systems",
    title: "Past Exam 2022 — DB Normalization",
    type: "past-exam", description: "ESTIN INF305 final exam from 2022",
    source: "ESTIN archives", rating: 4,
    tags: ["past-exam", "normalization"],
  },
  {
    id: "r4", moduleId: "m2", moduleName: "OOP",
    title: "Head First Design Patterns — O'Reilly",
    type: "book", description: "Highly practical patterns guide with Java examples",
    source: "O'Reilly Media", rating: 4,
    tags: ["design-patterns", "java", "textbook"], aiSuggested: true,
  },
  {
    id: "r5", moduleId: "m5", moduleName: "Operating Systems",
    title: "Operating System Concepts (Silberschatz) Ch. 5",
    type: "pdf", description: "CPU Scheduling algorithms explained",
    source: "Wiley", rating: 4,
    tags: ["scheduling", "theory"],
  },
  {
    id: "r6", moduleId: "m4", moduleName: "Discrete Mathematics",
    title: "MIT 6.042J — Mathematics for CS (Video Lectures)",
    type: "video", url: "https://ocw.mit.edu/6-042J",
    description: "Full lecture series on discrete math",
    source: "MIT OCW", rating: 5,
    tags: ["lectures", "graph-theory", "proofs"], aiSuggested: true,
  },
  {
    id: "r7", moduleId: "m3", moduleName: "Computer Architecture",
    title: "Patterson & Hennessy — Computer Organization Ch. 4",
    type: "pdf", description: "Pipelining and instruction-level parallelism",
    source: "Morgan Kaufmann", rating: 4,
    tags: ["pipelining", "textbook"],
  },
];

// ─── Conversation History ──────────────────────────────────────────────────────
export const mockConversations: ConversationSession[] = [
  {
    id: "c1", title: "Exam prep strategy", lastMessage: "Focus on sorting algorithms first...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), messageCount: 8,
  },
  {
    id: "c2", title: "Database normalization help", lastMessage: "Here is a step-by-step 3NF decomposition...",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), messageCount: 12,
  },
  {
    id: "c3", title: "Weekly schedule overview", lastMessage: "You have 3 exams this week...",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), messageCount: 5,
  },
];

// ─── Quick Prompts ─────────────────────────────────────────────────────────────
export const quickPrompts = [
  { label: "📅 This week's exams", value: "What exams do I have this week?" },
  { label: "📚 Study resources", value: "Suggest resources for my upcoming Algorithms midterm" },
  { label: "🗓 Plan my week", value: "Create a study plan for the next 3 days based on my deadlines" },
  { label: "⚠️ Urgent tasks", value: "What are my most urgent tasks right now?" },
  { label: "📊 Module overview", value: "Give me a quick overview of my current module progress" },
  { label: "🕐 Time estimate", value: "How many hours should I study before the Database exam?" },
];

// ─── Initial welcome message ──────────────────────────────────────────────────
export const welcomeMessage = `**Marhaba, Amira!** 👋

I'm your AI academic assistant, here to help you manage your studies at **ESTIN**.

I can help you with:
- 📅 **Viewing and syncing** your lecture schedule, TDs, and TPs
- 📝 **Tracking deadlines** and exam dates from your curriculum
- 📖 **Suggesting study resources** tailored to your ESTIN modules
- 🗓 **Building a personalized study plan** based on your upcoming exams
- ⚡ **Answering questions** about your modules or the Algerian university system

What would you like to do today?`;
