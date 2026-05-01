"use client";

import React, { useState } from "react";
import {
  Search, Sparkles, ExternalLink, BookOpen, Video,
  FileText, Link2, Star, Filter, Download, Bookmark,
} from "lucide-react";
import { mockResources, mockModules } from "@/lib/mockData";
import type { Resource, ResourceType } from "@/lib/types";

const TYPE_CONFIG: Record<ResourceType, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  pdf:        { label: "PDF",        icon: <FileText size={13} />,  color: "#e05c5c", bg: "rgba(199,56,56,0.12)" },
  video:      { label: "Video",      icon: <Video size={13} />,     color: "#5c9fe0", bg: "rgba(56,120,199,0.12)" },
  link:       { label: "Link",       icon: <Link2 size={13} />,     color: "#a8c4a2", bg: "rgba(90,140,82,0.12)" },
  exercise:   { label: "Exercise",   icon: <BookOpen size={13} />,  color: "#c4b5fd", bg: "rgba(139,92,246,0.12)" },
  "past-exam":{ label: "Past Exam",  icon: <FileText size={13} />,  color: "#e8c05a", bg: "rgba(201,151,42,0.15)" },
  book:       { label: "Book",       icon: <BookOpen size={13} />,  color: "#6ee7b7", bg: "rgba(5,150,105,0.12)" },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const typeCfg = TYPE_CONFIG[resource.type];
  const module = mockModules.find(m => m.id === resource.moduleId);

  return (
    <div
      className="card p-4 group cursor-pointer transition-all duration-200 flex flex-col gap-3"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="tag" style={{ background: typeCfg.bg, color: typeCfg.color, fontSize: "10px" }}>
            <span>{typeCfg.icon}</span> {typeCfg.label}
          </span>
          {resource.aiSuggested && (
            <span className="tag" style={{ background: "var(--gold-glow)", color: "var(--gold-light)", fontSize: "10px" }}>
              <Sparkles size={10} /> AI Pick
            </span>
          )}
        </div>
        {resource.rating && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {Array.from({ length: resource.rating }).map((_, i) => (
              <Star key={i} size={11} fill="var(--gold-main)" style={{ color: "var(--gold-main)" }} />
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="text-sm font-semibold leading-snug mb-1" style={{ color: "var(--text-primary)" }}>
          {resource.title}
        </h3>
        {resource.description && (
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {resource.description}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {resource.tags.map(tag => (
          <span key={tag} className="tag" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", fontSize: "10px" }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div>
          <div className="text-xs font-medium" style={{ color: module?.color || "var(--text-secondary)" }}>
            {resource.moduleName}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{resource.source}</div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
            title="Save"
          >
            <Bookmark size={13} />
          </button>
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
              title="Open"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [showAIOnly, setShowAIOnly] = useState(false);

  const filtered = mockResources.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) &&
        !r.description?.toLowerCase().includes(search.toLowerCase()) &&
        !r.tags.some(t => t.includes(search.toLowerCase()))) return false;
    if (selectedModule !== "all" && r.moduleId !== selectedModule) return false;
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (showAIOnly && !r.aiSuggested) return false;
    return true;
  });

  const aiCount = mockResources.filter(r => r.aiSuggested).length;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="section-title">Study Resources</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {filtered.length} resources · {aiCount} AI-suggested for your modules
            </p>
          </div>
          <button className="btn-primary flex items-center gap-1.5 text-xs">
            <Sparkles size={13} /> Ask AI for Resources
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 min-w-48 px-3 py-2 rounded-lg"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}
          >
            <Search size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Module filter */}
          <select
            value={selectedModule}
            onChange={e => setSelectedModule(e.target.value)}
            className="input-field py-2 text-xs"
            style={{ width: "auto", minWidth: "160px" }}
          >
            <option value="all">All Modules</option>
            {mockModules.map(m => (
              <option key={m.id} value={m.id}>{m.code} · {m.name.split(" ").slice(0, 3).join(" ")}</option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as ResourceType | "all")}
            className="input-field py-2 text-xs"
            style={{ width: "auto", minWidth: "130px" }}
          >
            <option value="all">All Types</option>
            {(Object.keys(TYPE_CONFIG) as ResourceType[]).map(t => (
              <option key={t} value={t}>{TYPE_CONFIG[t].label}</option>
            ))}
          </select>

          {/* AI filter */}
          <button
            onClick={() => setShowAIOnly(v => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: showAIOnly ? "var(--gold-glow)" : "var(--bg-elevated)",
              border: showAIOnly ? "1px solid rgba(201,151,42,0.3)" : "1px solid var(--border-medium)",
              color: showAIOnly ? "var(--gold-light)" : "var(--text-muted)",
            }}
          >
            <Sparkles size={12} /> AI Picks
          </button>
        </div>
      </div>

      {/* Resource grid */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <BookOpen size={32} style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No resources match your filters</p>
            <button onClick={() => { setSearch(""); setSelectedModule("all"); setSelectedType("all"); setShowAIOnly(false); }}
              className="btn-ghost text-xs">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* AI Suggested section */}
            {!showAIOnly && filtered.some(r => r.aiSuggested) && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} style={{ color: "var(--gold-main)" }} />
                  <div className="label">AI-Suggested for You</div>
                  <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filtered.filter(r => r.aiSuggested).map(r => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </div>
            )}

            {/* All resources */}
            {!showAIOnly && filtered.some(r => !r.aiSuggested) && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} style={{ color: "var(--text-muted)" }} />
                  <div className="label">All Resources</div>
                  <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filtered.filter(r => !r.aiSuggested).map(r => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </div>
            )}

            {/* AI-only view */}
            {showAIOnly && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
