// components/layout/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare, Calendar, BookOpen, LayoutGrid,
  GraduationCap, ChevronRight, Sparkles, X,
  BellRing, Settings, LogOut, User,Timer,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

const navItems = [
  { href: "/chat",      label: "AI Assistant",   icon: MessageSquare,  badge: null },
  { href: "/schedule",  label: "Schedule",        icon: Calendar,       badge: "3" },
  { href: "/planner",   label: "Study Planner",   icon: LayoutGrid,     badge: "2" },
  { href: "/resources", label: "Resources",       icon: BookOpen,       badge: null },
  { href: "/modules",   label: "My Modules",      icon: GraduationCap,  badge: null },
  { href: "/pomodoro",  label: "Pomodoro Timer",  icon: Timer,          badge: null },
];

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useProfile();

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const handleProfileClick = () => {
    if (onClose) onClose();
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    if (onClose) onClose();
    router.push("/settings");
  };

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-subtle)",
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
      }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--gold-main), #a67820)",
                boxShadow: "0 2px 8px var(--gold-glow)",
              }}
            >
              <Sparkles size={15} color="#13110d" strokeWidth={2.5} />
            </div>
            <div>
              <div
                className="font-display font-semibold leading-tight"
                style={{ fontSize: "14px", color: "var(--text-primary)" }}
              >
                ESTIN AI
              </div>
              <div className="label" style={{ fontSize: "9px" }}>Academic Assistant</div>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Clickable Student Card */}
      <div className="px-3 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-150 cursor-pointer"
          style={{ background: "var(--bg-elevated)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            (e.currentTarget as HTMLElement).style.border = "1px solid var(--border-medium)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
            (e.currentTarget as HTMLElement).style.border = "none";
          }}
        >
          {/* Avatar */}
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #3878c7, #5c9fe0)",
                color: "white",
              }}
            >
              {getInitials(profile.name)}
            </div>
          )}
          <div className="min-w-0 flex-1 text-left">
            <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {profile.name}
            </div>
            <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
              {profile.university} · {profile.semester}
            </div>
          </div>
          <ChevronRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <div className="label px-1 mb-2">Navigation</div>
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const isActive = pathname === href || pathname?.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold badge-pulse"
                      style={{
                        background: "var(--gold-main)",
                        color: "#13110d",
                        fontSize: "10px",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Upcoming summary */}
        <div className="mt-5">
          <div className="label px-1 mb-2">Next Up</div>
          <div className="card p-3 space-y-2" style={{ background: "var(--bg-card)" }}>
            <UpcomingItem
              color="#5a8c52"
              label="Algorithms Midterm"
              when="In 2 days · 14:00"
              type="exam"
            />
            <UpcomingItem
              color="#3878c7"
              label="OOP Project Deadline"
              when="In 3 days · 23:59"
              type="deadline"
            />
            <UpcomingItem
              color="#e85c5c"
              label="Database Midterm"
              when="In 6 days · 10:00"
              type="exam"
            />
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="space-y-0.5">
          <button className="nav-item w-full">
            <BellRing size={16} strokeWidth={2} />
            <span>Notifications</span>
          </button>
          <button onClick={handleSettingsClick} className="nav-item w-full">
            <Settings size={16} strokeWidth={2} />
            <span>Settings</span>
          </button>
          <button className="nav-item w-full" style={{ color: "var(--crimson-main)" }}>
            <LogOut size={16} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function UpcomingItem({
  color, label, when,
}: {
  color: string; label: string; when: string; type: "exam" | "deadline" | "lecture";
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium truncate" style={{ color: "var(--text-secondary)" }}>
          {label}
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>{when}</div>
      </div>
    </div>
  );
}