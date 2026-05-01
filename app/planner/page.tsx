"use client";

import React, { useState } from "react";
import {
  Plus, CheckCircle2, Circle, Clock, Zap,
  ArrowUp, Filter, BarChart3, Calendar,
} from "lucide-react";
import { mockTasks } from "@/lib/mockData";
import type { StudyTask, TaskStatus, TaskPriority } from "@/lib/types";

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; bg: string }> = {
  urgent: { label: "Urgent",  color: "#e05c5c", bg: "rgba(199,56,56,0.15)" },
  high:   { label: "High",    color: "#e8c05a", bg: "rgba(201,151,42,0.15)" },
  medium: { label: "Medium",  color: "#5c9fe0", bg: "rgba(56,120,199,0.15)" },
  low:    { label: "Low",     color: "#7a6e5c", bg: "rgba(122,110,92,0.1)" },
};

const STATUS_COLUMNS: { key: TaskStatus; label: string; icon: React.ReactNode }[] = [
  { key: "todo",        label: "To Do",       icon: <Circle size={14} /> },
  { key: "in-progress", label: "In Progress", icon: <Zap size={14} /> },
  { key: "done",        label: "Done",        icon: <CheckCircle2 size={14} /> },
];

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function DueBadge({ days }: { days: number }) {
  if (days < 0) return <span className="tag text-xs" style={{ background: "rgba(199,56,56,0.2)", color: "#e05c5c" }}>Overdue</span>;
  if (days === 0) return <span className="tag text-xs" style={{ background: "rgba(199,56,56,0.15)", color: "#e05c5c" }}>Today</span>;
  if (days === 1) return <span className="tag text-xs" style={{ background: "rgba(201,151,42,0.15)", color: "#e8c05a" }}>Tomorrow</span>;
  if (days <= 3) return <span className="tag text-xs" style={{ background: "rgba(201,151,42,0.1)", color: "#c9972a" }}>In {days}d</span>;
  return <span className="tag text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>In {days}d</span>;
}

function TaskCard({
  task, onStatusChange,
}: {
  task: StudyTask;
  onStatusChange: (id: string, status: TaskStatus) => void;
}) {
  const priority = PRIORITY_CONFIG[task.priority];
  const days = daysUntil(task.dueDate);
  const progress = task.estimatedHours > 0
    ? Math.min((task.loggedHours / task.estimatedHours) * 100, 100)
    : 0;

  const nextStatus: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "todo",
  };

  return (
    <div
      className="card p-3.5 cursor-pointer group transition-all duration-150"
      style={{ borderLeft: `3px solid ${task.moduleColor}` }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
        (e.currentTarget as HTMLElement).style.borderTopColor = "var(--border-medium)";
        (e.currentTarget as HTMLElement).style.borderRightColor = "var(--border-medium)";
        (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border-medium)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
        (e.currentTarget as HTMLElement).style.borderTopColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.borderRightColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border-subtle)";
      }}
    >
      {/* Module tag */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="tag text-xs"
          style={{ background: `${task.moduleColor}18`, color: task.moduleColor, fontSize: "10px" }}
        >
          {task.moduleName}
        </span>
        <DueBadge days={days} />
      </div>

      {/* Title */}
      <div
        className="text-sm font-medium leading-snug mb-2"
        style={{
          color: task.status === "done" ? "var(--text-muted)" : "var(--text-primary)",
          textDecoration: task.status === "done" ? "line-through" : "none",
        }}
      >
        {task.title}
      </div>

      {/* Description */}
      {task.description && (
        <div className="text-xs mb-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {task.description}
        </div>
      )}

      {/* Progress */}
      {task.estimatedHours > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              {task.loggedHours}h / {task.estimatedHours}h
            </span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="tag text-xs"
            style={{ background: priority.bg, color: priority.color, fontSize: "10px" }}
          >
            {priority.label}
          </span>
          {task.tags.slice(0, 2).map(t => (
            <span key={t} className="tag text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", fontSize: "10px" }}>
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onStatusChange(task.id, nextStatus[task.status]); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md"
          style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
          title="Move to next status"
        >
          <ArrowUp size={12} />
        </button>
      </div>
    </div>
  );
}

export default function PlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>(mockTasks);
  const [filter, setFilter] = useState<"all" | TaskPriority>("all");

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  };

  const filteredTasks = tasks.filter(t =>
    filter === "all" || t.priority === filter
  );

  const getColumnTasks = (status: TaskStatus) =>
    filteredTasks.filter(t => t.status === status)
      .sort((a, b) => {
        const p = { urgent: 0, high: 1, medium: 2, low: 3 };
        return p[a.priority] - p[b.priority];
      });

  // Stats
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const inProg = tasks.filter(t => t.status === "in-progress").length;
  const totalHours = tasks.reduce((s, t) => s + t.estimatedHours, 0);
  const loggedHours = tasks.reduce((s, t) => s + t.loggedHours, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div>
          <h1 className="section-title">Study Planner</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {done}/{total} tasks done · {Math.round(loggedHours)}h logged
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Priority filter */}
          <div
            className="flex items-center gap-1 rounded-lg p-1"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            {(["all", "urgent", "high", "medium"] as const).map(p => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all"
                style={{
                  background: filter === p ? "var(--bg-card)" : "transparent",
                  color: filter === p
                    ? (p === "all" ? "var(--text-primary)" : PRIORITY_CONFIG[p as TaskPriority]?.color || "var(--text-primary)")
                    : "var(--text-muted)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="btn-primary flex items-center gap-1.5 text-xs">
            <Plus size={13} /> Add Task
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="flex gap-0 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        {[
          { label: "Total Tasks",    value: total,                         unit: "",    color: "var(--text-secondary)" },
          { label: "In Progress",    value: inProg,                        unit: "",    color: "#5c9fe0" },
          { label: "Completed",      value: done,                          unit: "",    color: "#a8c4a2" },
          { label: "Hours Est.",     value: totalHours,                    unit: "h",   color: "var(--text-secondary)" },
          { label: "Hours Logged",   value: Math.round(loggedHours * 10) / 10, unit: "h", color: "var(--gold-main)" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="flex-1 px-4 py-3 text-center"
            style={{
              borderRight: i < 4 ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            <div className="text-lg font-bold font-mono" style={{ color: stat.color }}>
              {stat.value}{stat.unit}
            </div>
            <div className="label" style={{ fontSize: "9px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-hidden px-6 py-5">
        <div className="flex gap-4 h-full">
          {STATUS_COLUMNS.map(col => {
            const colTasks = getColumnTasks(col.key);
            return (
              <div key={col.key} className="flex flex-col flex-1 min-w-0">
                {/* Column header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--text-muted)" }}>{col.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                      {col.label}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
                    >
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div
                  className="flex-1 overflow-y-auto space-y-2 pr-1 rounded-xl p-2"
                  style={{
                    background: col.key === "done" ? "rgba(90,140,82,0.03)" : "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                    minHeight: "200px",
                  }}
                >
                  {colTasks.length === 0 ? (
                    <div
                      className="flex items-center justify-center h-20 text-xs rounded-lg"
                      style={{ color: "var(--text-muted)", border: "1px dashed var(--border-subtle)" }}
                    >
                      No tasks
                    </div>
                  ) : (
                    colTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

