// "use client";

// import React, { useState } from "react";
// import {
//   GraduationCap, TrendingUp, Award, BookOpen,
//   ChevronRight, BarChart3, User, Hash,
// } from "lucide-react";
// import { mockModules, mockStudent } from "@/lib/mockData";
// import type { Module } from "@/lib/types";

// const CATEGORY_CONFIG = {
//   fundamental:     { label: "Fundamental",     color: "#5c9fe0", bg: "rgba(56,120,199,0.12)" },
//   methodological:  { label: "Methodological",  color: "#a8c4a2", bg: "rgba(90,140,82,0.12)" },
//   discovery:       { label: "Discovery",       color: "#c4b5fd", bg: "rgba(139,92,246,0.12)" },
//   transversal:     { label: "Transversal",     color: "#6ee7b7", bg: "rgba(5,150,105,0.12)" },
// };

// function GradeBar({ value, max = 20 }: { value?: number; max?: number }) {
//   if (value === undefined) {
//     return (
//       <div className="flex items-center gap-2">
//         <div className="progress-bar flex-1"><div className="progress-fill" style={{ width: "0%", background: "var(--border-subtle)" }} /></div>
//         <span className="text-xs w-12 text-right" style={{ color: "var(--text-muted)" }}>–/20</span>
//       </div>
//     );
//   }
//   const pct = (value / max) * 100;
//   const color = value >= 16 ? "#5a8c52" : value >= 12 ? "#c9972a" : value >= 10 ? "#e85c5c" : "#c73838";
//   return (
//     <div className="flex items-center gap-2">
//       <div className="progress-bar flex-1">
//         <div style={{ height: "100%", borderRadius: 2, background: color, width: `${pct}%`, transition: "width 0.6s ease" }} />
//       </div>
//       <span className="text-xs font-semibold w-12 text-right" style={{ color }}>{value}/20</span>
//     </div>
//   );
// }

// function ModuleCard({ module }: { module: Module }) {
//   const cat = CATEGORY_CONFIG[module.category];
//   const hasGrade = module.grade !== undefined;

//   return (
//     <div
//       className="card p-4 cursor-pointer transition-all duration-200"
//       style={{ borderTop: `3px solid ${module.color}` }}
//       onMouseEnter={e => {
//         (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//         (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${module.color}30`;
//       }}
//       onMouseLeave={e => {
//         (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
//         (e.currentTarget as HTMLElement).style.boxShadow = "none";
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-start justify-between gap-2 mb-3">
//         <div className="min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-xs font-mono font-semibold" style={{ color: module.color }}>{module.code}</span>
//             <span className="tag" style={{ background: cat.bg, color: cat.color, fontSize: "10px" }}>{cat.label}</span>
//           </div>
//           <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
//             {module.name}
//           </h3>
//         </div>
//         <div
//           className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
//           style={{ background: `${module.color}18`, color: module.color }}
//         >
//           {module.credits}
//           <span style={{ fontSize: "8px", marginLeft: 1 }}>cr</span>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="mb-3">
//         <div className="flex items-center justify-between mb-1">
//           <span className="label" style={{ fontSize: "9px" }}>Course Progress</span>
//           <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{module.progress}%</span>
//         </div>
//         <div className="progress-bar">
//           <div className="progress-fill" style={{ width: `${module.progress}%`, background: `linear-gradient(90deg, ${module.color}, ${module.color}99)` }} />
//         </div>
//       </div>

//       {/* Grade */}
//       <div className="mb-3">
//         <div className="label mb-1" style={{ fontSize: "9px" }}>Current Grade</div>
//         <GradeBar value={module.grade} />
//       </div>

//       {/* Meta */}
//       <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
//         <div className="flex items-center gap-1.5">
//           {module.professor && (
//             <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
//               <User size={11} />
//               <span className="truncate max-w-28">{module.professor}</span>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-xs" style={{ color: "var(--text-muted)" }}>Coef {module.coefficient}</span>
//           <ChevronRight size={13} style={{ color: "var(--text-muted)" }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ModulesPage() {
//   const [activeTab, setActiveTab] = useState<"overview" | "grades" | "progress">("overview");

//   // Computed stats
//   const gradedModules = mockModules.filter(m => m.grade !== undefined);
//   const average = gradedModules.length
//     ? gradedModules.reduce((s, m) => s + (m.grade ?? 0), 0) / gradedModules.length
//     : 0;
//   const totalCredits = mockModules.reduce((s, m) => s + m.credits, 0);
//   const avgProgress = mockModules.reduce((s, m) => s + m.progress, 0) / mockModules.length;
//   const passCount = gradedModules.filter(m => (m.grade ?? 0) >= 10).length;

//   return (
//     <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
//       {/* Header */}
//       <div
//         className="px-6 py-4 flex-shrink-0"
//         style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="section-title">My Modules</h1>
//             <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
//               {mockStudent.university} · {mockStudent.department} · {mockStudent.semester}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             {(["overview", "grades", "progress"] as const).map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
//                 style={{
//                   background: activeTab === tab ? "var(--bg-card)" : "transparent",
//                   color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
//                   border: activeTab === tab ? "1px solid var(--border-medium)" : "1px solid transparent",
//                 }}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats strip */}
//         <div className="grid grid-cols-4 gap-3">
//           {[
//             {
//               icon: <Hash size={15} />, label: "Total Modules", value: mockModules.length.toString(),
//               color: "var(--text-secondary)",
//             },
//             {
//               icon: <Award size={15} />, label: "Semester Avg", value: average.toFixed(2) + "/20",
//               color: average >= 14 ? "#a8c4a2" : average >= 10 ? "#e8c05a" : "#e05c5c",
//             },
//             {
//               icon: <BookOpen size={15} />, label: "Total Credits", value: totalCredits + " ECTS",
//               color: "var(--text-secondary)",
//             },
//             {
//               icon: <TrendingUp size={15} />, label: "Avg Progress", value: Math.round(avgProgress) + "%",
//               color: "var(--gold-main)",
//             },
//           ].map(s => (
//             <div key={s.label} className="card-elevated p-3 flex items-center gap-3">
//               <div style={{ color: s.color }}>{s.icon}</div>
//               <div>
//                 <div className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
//                 <div className="label" style={{ fontSize: "9px" }}>{s.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto px-6 py-5">
//         {activeTab === "overview" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//             {mockModules.map(m => <ModuleCard key={m.id} module={m} />)}
//           </div>
//         )}

//         {activeTab === "grades" && (
//           <div className="max-w-2xl">
//             <div className="card-elevated p-5">
//               <div className="flex items-center gap-2 mb-5">
//                 <BarChart3 size={16} style={{ color: "var(--gold-main)" }} />
//                 <span className="font-display font-semibold" style={{ color: "var(--text-primary)" }}>
//                   Grade Overview — S3
//                 </span>
//               </div>
//               <div className="space-y-4">
//                 {mockModules.map(m => (
//                   <div key={m.id}>
//                     <div className="flex items-center justify-between mb-1.5">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2.5 h-2.5 rounded-sm" style={{ background: m.color }} />
//                         <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{m.code}</span>
//                         <span className="text-xs" style={{ color: "var(--text-muted)" }}>— {m.name}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-xs" style={{ color: "var(--text-muted)" }}>×{m.coefficient}</span>
//                         {m.grade !== undefined ? (
//                           <span
//                             className="text-xs font-bold w-14 text-right"
//                             style={{ color: m.grade >= 16 ? "#5a8c52" : m.grade >= 12 ? "#c9972a" : "#c73838" }}
//                           >
//                             {m.grade}/20
//                           </span>
//                         ) : (
//                           <span className="text-xs w-14 text-right" style={{ color: "var(--text-muted)" }}>Pending</span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="progress-bar">
//                       <div
//                         style={{
//                           height: "100%",
//                           borderRadius: 2,
//                           width: m.grade ? `${(m.grade / 20) * 100}%` : "0%",
//                           background: m.color,
//                           transition: "width 0.6s ease",
//                           opacity: m.grade ? 1 : 0.2,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className="flex items-center justify-between mt-5 pt-4"
//                 style={{ borderTop: "1px solid var(--border-subtle)" }}
//               >
//                 <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Semester Average</span>
//                 <span
//                   className="font-display text-xl font-bold"
//                   style={{ color: average >= 14 ? "#a8c4a2" : average >= 10 ? "#e8c05a" : "#e05c5c" }}
//                 >
//                   {average.toFixed(2)}/20
//                 </span>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="flex items-center gap-4 mt-3 px-1">
//               {[
//                 { range: "≥16", label: "Excellent", color: "#5a8c52" },
//                 { range: "12–16", label: "Good", color: "#c9972a" },
//                 { range: "10–12", label: "Pass", color: "#e05c5c" },
//                 { range: "<10", label: "Fail", color: "#c73838" },
//               ].map(l => (
//                 <div key={l.range} className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
//                   <span className="text-xs" style={{ color: "var(--text-muted)" }}>{l.range} {l.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "progress" && (
//           <div className="max-w-2xl space-y-3">
//             {mockModules.map(m => (
//               <div key={m.id} className="card p-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
//                     style={{ background: `${m.color}18`, color: m.color }}>
//                     {m.code.replace(/[A-Z]/g, "").slice(0, 3)}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{m.name}</div>
//                     <div className="text-xs" style={{ color: "var(--text-muted)" }}>
//                       {m.professor} · {m.credits} credits
//                     </div>
//                   </div>
//                   <span className="font-mono text-lg font-bold" style={{ color: m.color }}>{m.progress}%</span>
//                 </div>
//                 <div className="progress-bar h-2 rounded">
//                   <div
//                     style={{
//                       height: "100%",
//                       borderRadius: 4,
//                       width: `${m.progress}%`,
//                       background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`,
//                       transition: "width 0.8s ease",
//                     }}
//                   />
//                 </div>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-xs" style={{ color: "var(--text-muted)" }}>
//                     {Math.round(m.progress / 100 * 14)}/14 weeks completed
//                   </span>
//                   <span className="tag" style={{
//                     background: m.progress >= 75 ? "rgba(90,140,82,0.12)" : m.progress >= 40 ? "rgba(201,151,42,0.12)" : "rgba(122,110,92,0.1)",
//                     color: m.progress >= 75 ? "#a8c4a2" : m.progress >= 40 ? "#e8c05a" : "var(--text-muted)",
//                     fontSize: "10px",
//                   }}>
//                     {m.progress >= 75 ? "On Track" : m.progress >= 40 ? "In Progress" : "Early Stage"}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";  // ← ADD THIS IMPORT
import {
  GraduationCap, TrendingUp, Award, BookOpen,
  ChevronRight, BarChart3, User, Hash,
} from "lucide-react";
import { mockModules, mockStudent } from "@/lib/mockData";
import type { Module } from "@/lib/types";

const CATEGORY_CONFIG = {
  fundamental:     { label: "Fundamental",     color: "#5c9fe0", bg: "rgba(56,120,199,0.12)" },
  methodological:  { label: "Methodological",  color: "#a8c4a2", bg: "rgba(90,140,82,0.12)" },
  discovery:       { label: "Discovery",       color: "#c4b5fd", bg: "rgba(139,92,246,0.12)" },
  transversal:     { label: "Transversal",     color: "#6ee7b7", bg: "rgba(5,150,105,0.12)" },
};

function GradeBar({ value, max = 20 }: { value?: number; max?: number }) {
  if (value === undefined) {
    return (
      <div className="flex items-center gap-2">
        <div className="progress-bar flex-1"><div className="progress-fill" style={{ width: "0%", background: "var(--border-subtle)" }} /></div>
        <span className="text-xs w-12 text-right" style={{ color: "var(--text-muted)" }}>–/20</span>
      </div>
    );
  }
  const pct = (value / max) * 100;
  const color = value >= 16 ? "#5a8c52" : value >= 12 ? "#c9972a" : value >= 10 ? "#e85c5c" : "#c73838";
  return (
    <div className="flex items-center gap-2">
      <div className="progress-bar flex-1">
        <div style={{ height: "100%", borderRadius: 2, background: color, width: `${pct}%`, transition: "width 0.6s ease" }} />
      </div>
      <span className="text-xs font-semibold w-12 text-right" style={{ color }}>{value}/20</span>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const cat = CATEGORY_CONFIG[module.category];
  const hasGrade = module.grade !== undefined;

  return (
    <Link href={`/course/${module.id}`}>  {/* ← WRAP THE WHOLE CARD WITH LINK */}
      <div
        className="card p-4 cursor-pointer transition-all duration-200"
        style={{ borderTop: `3px solid ${module.color}` }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${module.color}30`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold" style={{ color: module.color }}>{module.code}</span>
              <span className="tag" style={{ background: cat.bg, color: cat.color, fontSize: "10px" }}>{cat.label}</span>
            </div>
            <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
              {module.name}
            </h3>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
            style={{ background: `${module.color}18`, color: module.color }}
          >
            {module.credits}
            <span style={{ fontSize: "8px", marginLeft: 1 }}>cr</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="label" style={{ fontSize: "9px" }}>Course Progress</span>
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{module.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${module.progress}%`, background: `linear-gradient(90deg, ${module.color}, ${module.color}99)` }} />
          </div>
        </div>

        {/* Grade */}
        <div className="mb-3">
          <div className="label mb-1" style={{ fontSize: "9px" }}>Current Grade</div>
          <GradeBar value={module.grade} />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center gap-1.5">
            {module.professor && (
              <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <User size={11} />
                <span className="truncate max-w-28">{module.professor}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Coef {module.coefficient}</span>
            <ChevronRight size={13} style={{ color: "var(--text-muted)" }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ModulesPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "grades" | "progress">("overview");

  // Computed stats
  const gradedModules = mockModules.filter(m => m.grade !== undefined);
  const average = gradedModules.length
    ? gradedModules.reduce((s, m) => s + (m.grade ?? 0), 0) / gradedModules.length
    : 0;
  const totalCredits = mockModules.reduce((s, m) => s + m.credits, 0);
  const avgProgress = mockModules.reduce((s, m) => s + m.progress, 0) / mockModules.length;
  const passCount = gradedModules.filter(m => (m.grade ?? 0) >= 10).length;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="section-title">My Modules</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {mockStudent.university} · {mockStudent.department} · {mockStudent.semester}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(["overview", "grades", "progress"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  background: activeTab === tab ? "var(--bg-card)" : "transparent",
                  color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
                  border: activeTab === tab ? "1px solid var(--border-medium)" : "1px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              icon: <Hash size={15} />, label: "Total Modules", value: mockModules.length.toString(),
              color: "var(--text-secondary)",
            },
            {
              icon: <Award size={15} />, label: "Semester Avg", value: average.toFixed(2) + "/20",
              color: average >= 14 ? "#a8c4a2" : average >= 10 ? "#e8c05a" : "#e05c5c",
            },
            {
              icon: <BookOpen size={15} />, label: "Total Credits", value: totalCredits + " ECTS",
              color: "var(--text-secondary)",
            },
            {
              icon: <TrendingUp size={15} />, label: "Avg Progress", value: Math.round(avgProgress) + "%",
              color: "var(--gold-main)",
            },
          ].map(s => (
            <div key={s.label} className="card-elevated p-3 flex items-center gap-3">
              <div style={{ color: s.color }}>{s.icon}</div>
              <div>
                <div className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="label" style={{ fontSize: "9px" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockModules.map(m => <ModuleCard key={m.id} module={m} />)}
          </div>
        )}

        {activeTab === "grades" && (
          <div className="max-w-2xl">
            <div className="card-elevated p-5">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 size={16} style={{ color: "var(--gold-main)" }} />
                <span className="font-display font-semibold" style={{ color: "var(--text-primary)" }}>
                  Grade Overview — S3
                </span>
              </div>
              <div className="space-y-4">
                {mockModules.map(m => (
                  <div key={m.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: m.color }} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{m.code}</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>— {m.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>×{m.coefficient}</span>
                        {m.grade !== undefined ? (
                          <span
                            className="text-xs font-bold w-14 text-right"
                            style={{ color: m.grade >= 16 ? "#5a8c52" : m.grade >= 12 ? "#c9972a" : "#c73838" }}
                          >
                            {m.grade}/20
                          </span>
                        ) : (
                          <span className="text-xs w-14 text-right" style={{ color: "var(--text-muted)" }}>Pending</span>
                        )}
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 2,
                          width: m.grade ? `${(m.grade / 20) * 100}%` : "0%",
                          background: m.color,
                          transition: "width 0.6s ease",
                          opacity: m.grade ? 1 : 0.2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-between mt-5 pt-4"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Semester Average</span>
                <span
                  className="font-display text-xl font-bold"
                  style={{ color: average >= 14 ? "#a8c4a2" : average >= 10 ? "#e8c05a" : "#e05c5c" }}
                >
                  {average.toFixed(2)}/20
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 px-1">
              {[
                { range: "≥16", label: "Excellent", color: "#5a8c52" },
                { range: "12–16", label: "Good", color: "#c9972a" },
                { range: "10–12", label: "Pass", color: "#e05c5c" },
                { range: "<10", label: "Fail", color: "#c73838" },
              ].map(l => (
                <div key={l.range} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{l.range} {l.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="max-w-2xl space-y-3">
            {mockModules.map(m => (
              <div key={m.id} className="card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${m.color}18`, color: m.color }}>
                    {m.code.replace(/[A-Z]/g, "").slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{m.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {m.professor} · {m.credits} credits
                    </div>
                  </div>
                  <span className="font-mono text-lg font-bold" style={{ color: m.color }}>{m.progress}%</span>
                </div>
                <div className="progress-bar h-2 rounded">
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 4,
                      width: `${m.progress}%`,
                      background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {Math.round(m.progress / 100 * 14)}/14 weeks completed
                  </span>
                  <span className="tag" style={{
                    background: m.progress >= 75 ? "rgba(90,140,82,0.12)" : m.progress >= 40 ? "rgba(201,151,42,0.12)" : "rgba(122,110,92,0.1)",
                    color: m.progress >= 75 ? "#a8c4a2" : m.progress >= 40 ? "#e8c05a" : "var(--text-muted)",
                    fontSize: "10px",
                  }}>
                    {m.progress >= 75 ? "On Track" : m.progress >= 40 ? "In Progress" : "Early Stage"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}