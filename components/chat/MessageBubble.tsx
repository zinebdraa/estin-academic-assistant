"use client";

import React from "react";
import { Sparkles, User, Clock } from "lucide-react";
import type { ChatMessage } from "@/lib/types";
import { formatRelativeTime } from "@/lib/api";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  if (isAssistant) {
    return (
      <div className="flex gap-3 message-enter">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{
            background: "linear-gradient(135deg, var(--gold-main), #a67820)",
            boxShadow: "0 2px 8px var(--gold-glow)",
          }}
        >
          <Sparkles size={14} color="#13110d" strokeWidth={2.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold" style={{ color: "var(--gold-light)" }}>
              ESTIN AI
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {formatRelativeTime(message.timestamp)}
            </span>
            {message.intent && message.intent !== "general" && (
              <IntentTag intent={message.intent} />
            )}
          </div>
          <div
            className="prose-academic rounded-2xl rounded-tl-sm p-4"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              fontSize: "14px",
              lineHeight: "1.65",
            }}
            dangerouslySetInnerHTML={{
              __html: formatMessageContent(message.content),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-end message-enter">
      <div className="flex-1 min-w-0 flex flex-col items-end">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {formatRelativeTime(message.timestamp)}
          </span>
          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            You
          </span>
        </div>
        <div
          className="max-w-sm rounded-2xl rounded-tr-sm px-4 py-3 text-sm"
          style={{
            background: "linear-gradient(135deg, #2a3f5c, #1e2d43)",
            border: "1px solid rgba(56,120,199,0.25)",
            color: "var(--text-primary)",
            lineHeight: "1.6",
          }}
        >
          {message.content}
        </div>
      </div>
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-semibold"
        style={{
          background: "linear-gradient(135deg, #3878c7, #5c9fe0)",
          color: "white",
        }}
      >
        AB
      </div>
    </div>
  );
}

function IntentTag({ intent }: { intent: string }) {
  const config: Record<string, { label: string; bg: string; color: string }> = {
    schedule:  { label: "📅 Schedule",  bg: "rgba(90,140,82,0.15)", color: "#a8c4a2" },
    resources: { label: "📚 Resources", bg: "rgba(56,120,199,0.15)", color: "#5c9fe0" },
    deadline:  { label: "⏰ Deadline",  bg: "rgba(199,56,56,0.15)", color: "#e05c5c" },
    plan:      { label: "📋 Plan",      bg: "rgba(201,151,42,0.15)", color: "#e8c05a" },
  };
  const c = config[intent];
  if (!c) return null;
  return (
    <span
      className="tag"
      style={{ background: c.bg, color: c.color }}
    >
      {c.label}
    </span>
  );
}

function formatMessageContent(text: string): string {
  // Convert markdown-like syntax to HTML
  return text
    .split("\n\n")
    .map(para => {
      if (para.startsWith("- ")) {
        const items = para.split("\n").map(line =>
          line.startsWith("- ") ? `<li>${formatInline(line.slice(2))}</li>` : line
        );
        return `<ul>${items.join("")}</ul>`;
      }
      if (/^\d+\. /.test(para)) {
        const items = para.split("\n").map((line, i) =>
          `<li>${formatInline(line.replace(/^\d+\. /, ""))}</li>`
        );
        return `<ol>${items.join("")}</ol>`;
      }
      if (para.startsWith("**") && para.endsWith("**")) {
        return `<h3>${para.slice(2, -2)}</h3>`;
      }
      return `<p>${formatInline(para)}</p>`;
    })
    .join("");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Typing indicator
export function TypingIndicator() {
  return (
    <div className="flex gap-3 message-enter">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--gold-main), #a67820)",
          boxShadow: "0 2px 8px var(--gold-glow)",
        }}
      >
        <Sparkles size={14} color="#13110d" strokeWidth={2.5} />
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-main)" }} />
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-main)" }} />
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-main)" }} />
      </div>
    </div>
  );
}
