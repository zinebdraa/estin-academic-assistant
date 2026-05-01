# ESTIN AI Academic Assistant — Frontend

A full Next.js 14 frontend for the AI Academic Assistant tailored for Algerian universities (ESTIN and others). Designed to connect to an **n8n** backend via webhook.

---

## 🗂 Project Structure

```
estin-assistant/
├── app/
│   ├── chat/           ← AI Chat interface (connects to n8n)
│   ├── schedule/       ← Weekly schedule & exam calendar
│   ├── planner/        ← Kanban study task planner
│   ├── resources/      ← Study resources browser
│   ├── modules/        ← Curriculum & grade tracker
│   └── globals.css     ← Design tokens & global styles
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx      ← Navigation sidebar
│   │   └── AppShell.tsx     ← Responsive shell
│   └── chat/
│       ├── MessageBubble.tsx   ← Chat message renderer
│       └── SuggestedActions.tsx← Action pill buttons
├── lib/
│   ├── types.ts        ← All TypeScript types
│   ├── mockData.ts     ← Dev mock data (ESTIN S3 curriculum)
│   └── api.ts          ← n8n webhook client + mock fallback
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Copy env and set your n8n webhook URL
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/chat`.

---

## 🔌 n8n Backend Integration

### Webhook Payload (Frontend → n8n)

The chat sends a `POST` request to your n8n webhook with this body:

```json
{
  "sessionId": "session_1234567890_abc123",
  "message": "What exams do I have this week?",
  "studentId": "2024-CS-0182",
  "context": {
    "currentModules": ["INF301", "INF302", "MAT301"],
    "upcomingDeadlines": ["OOP Project - 3 days", "Algorithms Exam - 2 days"],
    "activeScreen": "chat"
  }
}
```

### Expected Response (n8n → Frontend)

```json
{
  "reply": "You have **2 exams** this week:\n- Algorithms Midterm ...",
  "intent": "schedule",
  "data": {
    "events": [],
    "tasks": [],
    "resources": []
  },
  "suggestedActions": [
    { "label": "📋 Build study plan", "action": "build_plan" },
    { "label": "📚 Study resources", "action": "get_resources" }
  ]
}
```

**Fields:**
| Field | Type | Required | Description |
|---|---|---|---|
| `reply` | string | ✅ | Markdown-formatted AI response |
| `intent` | string | ❌ | `schedule`, `resources`, `deadline`, `plan`, `general` |
| `data` | object | ❌ | Optional structured data to update the UI |
| `suggestedActions` | array | ❌ | Quick-action buttons shown after the reply |

### Intent values
Returning an intent changes the tag shown on the AI message bubble:
- `schedule` — 📅 Schedule
- `resources` — 📚 Resources  
- `deadline` — ⏰ Deadline
- `plan` — 📋 Plan

### Markdown support in `reply`
The reply field supports:
- `**bold**` → **bold**
- `*italic*` → *italic*
- `` `code` `` → `code`
- `- item` → bullet list
- `1. item` → numbered list
- Double newlines = paragraph breaks

---

## 📐 n8n Workflow Suggestions

**Recommended n8n nodes for this webhook:**

1. **Webhook** — Receive POST from frontend
2. **AI Agent / LLM node** — Process the message with context
3. **Switch node** — Route by detected intent:
   - Schedule intent → Query calendar data
   - Resources intent → Search resource database
   - Plan intent → Generate study plan
4. **Function node** — Format the response JSON
5. **Respond to Webhook** — Return structured response

**System prompt suggestion for the AI node:**
```
You are an academic assistant for Algerian university students at ESTIN (École Supérieure en Sciences et Technologie de l'Informatique de Bejaia).
You help students with:
- Their S3 modules: INF301 (Algorithms), INF302 (OOP), INF303 (Computer Architecture), MAT301 (Discrete Math), INF304 (Operating Systems), INF305 (Database Systems), ANG301 (Technical English)
- Exam schedules following the Algerian semester system
- Study resources (books, past exams, online materials)
- Personalized study plans

Always respond in clear, structured markdown. Be encouraging and specific to the Algerian curriculum.
Student context: {{$json.context}}
```

---

## 🎨 Design System

Dark academic theme using CSS custom properties:

| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#13110d` | Page background |
| `--bg-secondary` | `#1c1814` | Sidebar, headers |
| `--bg-card` | `#221e18` | Cards |
| `--gold-main` | `#c9972a` | Primary accent |
| `--text-primary` | `#f0ebe0` | Main text |
| `--text-muted` | `#7a6e5c` | Labels, hints |

Fonts: **Playfair Display** (headings) + **DM Sans** (body) + **JetBrains Mono** (code/numbers)

---

## 📦 Dependencies

- **Next.js 14** — App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility styling
- **Lucide React** — Icons
- **date-fns** — Date utilities

---

## 🔧 Customization

**Add a new university:**
Edit `lib/mockData.ts` → `mockStudent` and `mockModules`.

**Change webhook URL:**
Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`.

**Add new modules:**
Add entries to the `mockModules` array in `lib/mockData.ts` — the UI adapts automatically.
