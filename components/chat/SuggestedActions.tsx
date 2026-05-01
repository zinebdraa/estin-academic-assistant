"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface SuggestedActionsProps {
  actions: Array<{ label: string; action: string; payload?: Record<string, unknown> }>;
  onAction: (action: string) => void;
}

export default function SuggestedActions({ actions, onAction }: SuggestedActionsProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pl-11 mt-1">
      {actions.map((a) => (
        <button
          key={a.action}
          onClick={() => onAction(a.label)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-medium)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-main)";
            (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          {a.label}
          <ArrowRight size={11} />
        </button>
      ))}
    </div>
  );
}
