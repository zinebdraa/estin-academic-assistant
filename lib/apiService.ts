// lib/apiService.ts - n8n only version
import type { ChatMessage, ScheduleEvent, StudyTask, Resource } from "./types";

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

// Get stored user info
const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("estin_user_info");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

// ============== CHAT & AI ==============

export async function sendMessageToAI(message: string, sessionId: string) {
  const userInfo = getUserInfo();
  
  const payload = {
    userId: userInfo?.studentId || "anonymous",
    sessionId: sessionId,
    message: message,
    university: userInfo?.university || "ESTIN",
    year: `L${userInfo?.year || 2}`,
    semester: userInfo?.semester || "S3",
    language: "en",
  };

  const response = await fetch(`${N8N_WEBHOOK_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`N8N error: ${response.status}`);
  }

  return response.json();
}

// ============== FILE UPLOAD ==============

export async function uploadCourseMaterial(
  file: File,
  courseId?: string,
  fileType: "course" | "syllabus" | "exam" | "note" = "course"
) {
  const userInfo = getUserInfo();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userInfo?.studentId || "anonymous");
  formData.append("fileType", fileType);
  formData.append("fileName", file.name);
  if (courseId) {
    formData.append("courseId", courseId);
  }

  const response = await fetch(`${N8N_WEBHOOK_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return response.json();
}

export async function uploadMultipleCourseMaterials(
  files: File[],
  courseId?: string
) {
  const uploadPromises = files.map(file => 
    uploadCourseMaterial(file, courseId, "course")
  );
  return Promise.all(uploadPromises);
}

// ============== COURSES ==============

export async function createCourse(courseData: {
  name: string;
  code: string;
  credits: number;
  coefficient: number;
  professor?: string;
  schedule?: string;
  topics?: string[];
  resources?: string[];
  semester?: string;
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...courseData,
      userId: userInfo?.studentId,
      university: userInfo?.university,
      intent: "set_courses",
    }),
  });

  return response.json();
}

export async function getCourses() {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/courses?userId=${userInfo?.studentId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

// ============== EXAMS ==============

export async function createExam(examData: {
  courseId?: string;
  courseName: string;
  examType: string;
  date: string;
  time: string;
  room?: string;
  duration: number;
  topics?: string[];
  notes?: string;
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/exams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...examData,
      userId: userInfo?.studentId,
      intent: "set_deadlines",
    }),
  });

  return response.json();
}

export async function getExams() {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/exams?userId=${userInfo?.studentId}`, {
    method: "GET",
  });

  return response.json();
}

// ============== TASKS ==============

export async function createTask(taskData: {
  title: string;
  courseId?: string;
  courseName?: string;
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  estimatedHours: number;
  subtasks?: string[];
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...taskData,
      userId: userInfo?.studentId,
    }),
  });

  return response.json();
}

export async function getTasks() {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/tasks?userId=${userInfo?.studentId}`, {
    method: "GET",
  });

  return response.json();
}

// ============== STUDY PLAN ==============

export async function generateStudyPlan() {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/study-plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userInfo?.studentId,
      university: userInfo?.university,
      year: `L${userInfo?.year}`,
      semester: userInfo?.semester,
      modules: userInfo?.modules || [],
      intent: "request_schedule",
    }),
  });

  return response.json();
}

// ============== RESOURCES ==============

export async function getResources(moduleName?: string) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userInfo?.studentId,
      module: moduleName,
      intent: "request_resources",
    }),
  });

  return response.json();
}

// ============== QUIZ ==============

export async function generateQuiz(moduleName: string, courseContent?: string) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userInfo?.studentId,
      module: moduleName,
      content: courseContent,
      intent: "request_quiz",
    }),
  });

  return response.json();
}

// ============== COURSE SUMMARY ==============

export async function generateCourseSummary(moduleName: string, courseContent?: string) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userInfo?.studentId,
      module: moduleName,
      content: courseContent,
      intent: "request_resume",
    }),
  });

  return response.json();
}

// ============== STUDY PREFERENCES ==============

export async function saveStudyPreferences(preferences: {
  studyTime: string;
  peakHours: string;
  breakInterval: number;
  environment: string;
  goals: string[];
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...preferences,
      userId: userInfo?.studentId,
      intent: "preference",
    }),
  });

  return response.json();
}

// ============== TD/TP SESSIONS ==============

export async function createTDSession(sessionData: {
  courseId?: string;
  courseName: string;
  tdNumber: string;
  date: string;
  time: string;
  room: string;
  professor: string;
  exercises?: string[];
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/td-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sessionData,
      userId: userInfo?.studentId,
    }),
  });

  return response.json();
}

export async function createTPSession(sessionData: {
  courseId?: string;
  courseName: string;
  tpNumber: string;
  date: string;
  time: string;
  labRoom: string;
  supervisor: string;
  tasks?: string[];
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/tp-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sessionData,
      userId: userInfo?.studentId,
    }),
  });

  return response.json();
}

// ============== DEADLINES ==============

export async function createDeadline(deadlineData: {
  title: string;
  courseId?: string;
  courseName?: string;
  dueDate: string;
  time: string;
  type: string;
  requirements?: string[];
}) {
  const userInfo = getUserInfo();
  
  const response = await fetch(`${N8N_WEBHOOK_URL}/deadlines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...deadlineData,
      userId: userInfo?.studentId,
      intent: "set_deadlines",
    }),
  });

  return response.json();
}