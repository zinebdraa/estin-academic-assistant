import type { N8NWebhookPayload, N8NWebhookResponse } from "./types";

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://your-n8n-instance.com/webhook/academic-assistant";

export async function sendMessageToN8N(payload: N8NWebhookPayload): Promise<N8NWebhookResponse> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`N8N webhook error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as N8NWebhookResponse;
}

// Fallback mock response for development
export function getMockResponse(message: string): N8NWebhookResponse {
  const lower = message.toLowerCase();

  if (lower.includes("exam") || lower.includes("schedule")) {
    return {
      reply: `Based on your current schedule, here are your **upcoming exams**:\n\n- **Algorithms Midterm** — in 2 days, Amphi A, 14:00–16:00\n- **Database Systems Midterm** — in 6 days, Amphi C, 10:00–12:00\n\nFor the Algorithms exam, I recommend focusing on sorting algorithm complexity proofs and tree traversals — these topics appear frequently in ESTIN exams based on past papers.\n\nWould you like me to build a study plan for either of these?`,
      intent: "schedule",
      suggestedActions: [
        { label: "📋 Build study plan", action: "build_plan" },
        { label: "📚 Study resources", action: "get_resources" },
      ],
    };
  }

  if (lower.includes("resource") || lower.includes("material")) {
    return {
      reply: `Here are some **highly rated resources** for your current modules:\n\n**Algorithms & DS II:**\n- CLRS Textbook (Chapters 6–8) — Sorting algorithms\n- Visualgo.net — Interactive sorting visualizer\n\n**Database Systems:**\n- Past exam 2022 — Normalization exercises\n- Ramez Elmasri's textbook Chapter 14\n\nAll of these are aligned with the **ESTIN S3 curriculum**. Would you like resources for a specific module?`,
      intent: "resources",
    };
  }

  if (lower.includes("plan") || lower.includes("study")) {
    return {
      reply: `Here's a **3-day study plan** based on your deadlines:\n\n**Today:**\n- 2h — Algorithms: Sorting algorithm revision (QuickSort, MergeSort)\n- 1.5h — OOP: UML diagrams for project\n\n**Tomorrow:**\n- 2h — Algorithms: Past exam practice\n- 1h — Database: Normalization review\n\n**Day after:**\n- 1h — Final Algorithms review\n- 30min — Rest before exam\n\nThis plan gives you **~8 hours** of focused study. Shall I add this to your planner?`,
      intent: "plan",
      suggestedActions: [
        { label: "✅ Add to planner", action: "add_to_planner" },
        { label: "🔄 Adjust timing", action: "adjust_plan" },
      ],
    };
  }

  return {
    reply: `I understand you're asking about **"${message}"**.\n\nI can help you with your ESTIN coursework, exam schedule, study resources, and personalized study plans. Could you tell me more specifically what you need? For example:\n\n- Which module are you studying?\n- Do you have an upcoming deadline?\n- What type of resources do you need?`,
    intent: "general",
  };
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Generate session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Parse markdown-style bold for simple rendering
export function parseSimpleMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}
