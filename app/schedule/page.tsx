"use client";

import React, { useState } from "react";
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  MapPin, User, AlertTriangle, BookOpen,
} from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import type { ScheduleEvent, EventType } from "@/lib/types";

const EVENT_TYPE_CONFIG: Record<EventType, { label: string; dotBg: string; tagBg: string; tagColor: string }> = {
  lecture:  { label: "Lecture",  dotBg: "#5a8c52", tagBg: "rgba(90,140,82,0.15)",  tagColor: "#a8c4a2" },
  td:       { label: "TD",       dotBg: "#3878c7", tagBg: "rgba(56,120,199,0.15)", tagColor: "#5c9fe0" },
  tp:       { label: "TP",       dotBg: "#8b5cf6", tagBg: "rgba(139,92,246,0.15)", tagColor: "#c4b5fd" },
  exam:     { label: "Exam",     dotBg: "#c73838", tagBg: "rgba(199,56,56,0.2)",   tagColor: "#e05c5c" },
  deadline: { label: "Deadline", dotBg: "#c9972a", tagBg: "rgba(201,151,42,0.15)", tagColor: "#e8c05a" },
  seminar:  { label: "Seminar",  dotBg: "#059669", tagBg: "rgba(5,150,105,0.15)",  tagColor: "#6ee7b7" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];

function getWeekDates(referenceDate: Date): Date[] {
  const d = new Date(referenceDate);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(d);
    date.setDate(d.getDate() + i);
    return date;
  });
}

function fmt(d: Date) { return d.toISOString().split("T")[0]; }

function EventCard({ event }: { event: ScheduleEvent }) {
  const cfg = EVENT_TYPE_CONFIG[event.type];
  return (
    <div
      className="p-3 rounded-xl mb-2 transition-all duration-150 cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderLeft: `3px solid ${event.color}`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
        (e.currentTarget as HTMLElement).style.borderLeftColor = event.color;
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.borderLeftColor = event.color;
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="font-medium text-sm leading-tight" style={{ color: "var(--text-primary)" }}>
          {event.title}
        </div>
        <span
          className="tag flex-shrink-0"
          style={{ background: cfg.tagBg, color: cfg.tagColor, fontSize: "10px" }}
        >
          {cfg.label}
        </span>
      </div>

      <div className="text-xs" style={{ color: "var(--text-muted)", fontWeight: 500 }}>
        {event.module}
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
        {event.type !== "deadline" && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <Clock size={11} />
            {event.startTime}–{event.endTime}
          </div>
        )}
        {event.room && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <MapPin size={11} />
            {event.room}
          </div>
        )}
        {event.professor && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <User size={11} />
            {event.professor}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "list">("week");
  const weekDates = getWeekDates(currentDate);

  const goPrev = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };
  const goNext = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };
  const goToday = () => setCurrentDate(new Date());

  const today = fmt(new Date());
  const getEventsForDate = (date: Date) =>
    mockEvents.filter(e => e.date === fmt(date)).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const upcomingExams = mockEvents.filter(e => e.type === "exam" && e.date >= today).slice(0, 3);
  const upcomingDeadlines = mockEvents.filter(e => e.type === "deadline" && e.date >= today).slice(0, 3);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div>
          <h1 className="section-title">Schedule</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()} · S3 Semester
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div
            className="flex rounded-lg p-1"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            {(["week", "list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize"
                style={{
                  background: view === v ? "var(--bg-card)" : "transparent",
                  color: view === v ? "var(--text-primary)" : "var(--text-muted)",
                  border: view === v ? "1px solid var(--border-medium)" : "1px solid transparent",
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={goPrev} className="btn-ghost py-1.5 px-2">
              <ChevronLeft size={16} />
            </button>
            <button onClick={goToday} className="btn-ghost py-1.5 text-xs">Today</button>
            <button onClick={goNext} className="btn-ghost py-1.5 px-2">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {view === "week" ? (
            <>
              {/* Week grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekDates.map((date, i) => {
                  const isToday = fmt(date) === today;
                  const events = getEventsForDate(date);
                  const isSunday = date.getDay() === 0;
                  return (
                    <div
                      key={i}
                      className="rounded-xl p-3 min-h-[130px]"
                      style={{
                        background: isToday ? "rgba(201,151,42,0.06)" : "var(--bg-card)",
                        border: isToday ? "1px solid rgba(201,151,42,0.3)" : "1px solid var(--border-subtle)",
                        opacity: isSunday ? 0.5 : 1,
                      }}
                    >
                      {/* Day header */}
                      <div className="flex flex-col items-center mb-2">
                        <span className="label" style={{ fontSize: "9px", color: isToday ? "var(--gold-main)" : "var(--text-muted)" }}>
                          {DAYS[date.getDay()]}
                        </span>
                        <span
                          className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mt-0.5"
                          style={{
                            background: isToday ? "var(--gold-main)" : "transparent",
                            color: isToday ? "#13110d" : "var(--text-secondary)",
                          }}
                        >
                          {date.getDate()}
                        </span>
                      </div>
                      {/* Events */}
                      <div className="space-y-1">
                        {events.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className="px-2 py-1.5 rounded-lg text-xs truncate cursor-pointer transition-opacity"
                            style={{
                              background: `${event.color}20`,
                              borderLeft: `2px solid ${event.color}`,
                              color: "var(--text-secondary)",
                            }}
                            title={`${event.title} · ${event.startTime}`}
                          >
                            <div className="font-medium truncate text-xs" style={{ color: "var(--text-primary)", fontSize: "11px" }}>
                              {event.title}
                            </div>
                            {event.type !== "deadline" && (
                              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{event.startTime}</div>
                            )}
                          </div>
                        ))}
                        {events.length > 3 && (
                          <div className="text-center" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                            +{events.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Today's detail */}
              <div>
                <div className="label mb-3">Today's Classes</div>
                {getEventsForDate(new Date()).length === 0 ? (
                  <div className="card p-5 text-center" style={{ color: "var(--text-muted)" }}>
                    No classes today
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {getEventsForDate(new Date()).map(e => <EventCard key={e.id} event={e} />)}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* List view */
            <div className="space-y-6">
              {weekDates.map(date => {
                const events = getEventsForDate(date);
                if (events.length === 0) return null;
                const isToday = fmt(date) === today;
                return (
                  <div key={fmt(date)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: isToday ? "var(--gold-main)" : "var(--bg-elevated)",
                          color: isToday ? "#13110d" : "var(--text-secondary)",
                        }}
                      >
                        {date.getDate()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: isToday ? "var(--gold-light)" : "var(--text-primary)" }}>
                          {DAYS[date.getDay()]} {isToday && "· Today"}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {events.length} {events.length === 1 ? "event" : "events"}
                        </div>
                      </div>
                    </div>
                    <div className="ml-12 space-y-2">
                      {events.map(e => <EventCard key={e.id} event={e} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div
          className="hidden xl:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{
            width: "260px",
            borderLeft: "1px solid var(--border-subtle)",
            background: "var(--bg-secondary)",
            padding: "20px 16px",
          }}
        >
          {/* Upcoming exams */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} style={{ color: "#c73838" }} />
              <div className="label">Upcoming Exams</div>
            </div>
            {upcomingExams.length === 0 ? (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>No upcoming exams</p>
            ) : (
              <div className="space-y-2">
                {upcomingExams.map(e => (
                  <div key={e.id} className="card p-3" style={{ borderLeft: `3px solid ${e.color}` }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{e.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {new Date(e.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · {e.startTime}
                    </div>
                    {e.room && (
                      <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <MapPin size={10} /> {e.room}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming deadlines */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} style={{ color: "var(--gold-main)" }} />
              <div className="label">Deadlines</div>
            </div>
            {upcomingDeadlines.map(e => (
              <div key={e.id} className="card p-3 mb-2" style={{ borderLeft: "3px solid var(--gold-main)" }}>
                <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{e.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {new Date(e.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6">
            <div className="label mb-3">Legend</div>
            <div className="space-y-2">
              {(Object.entries(EVENT_TYPE_CONFIG) as [EventType, typeof EVENT_TYPE_CONFIG[EventType]][]).map(([type, cfg]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: cfg.dotBg }} />
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
