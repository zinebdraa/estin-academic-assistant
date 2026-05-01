// app/settings/page.tsx
"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useProfile } from "@/contexts/ProfileContext";
import { Bell, Moon, Globe, Palette, Trash2, RefreshCw } from "lucide-react";

function SettingsContent() {
  const { profile, updateProfile } = useProfile();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleResetProfile = () => {
    if (confirm("Are you sure you want to reset your profile to default?")) {
      const defaultProfile = {
        name: "Amira Bensalem",
        studentId: "2024-CS-0182",
        university: "ESTIN",
        department: "Computer Science & IT",
        year: 2,
        semester: "S3" as const,
        email: "amira.bensalem@estin.dz",
        phone: "+213 5XX XX XX XX",
        address: "Bejaia, Algeria",
      };
      updateProfile(defaultProfile);
    }
  };

  const SettingSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h2>
      </div>
      <div className="card p-4 space-y-3">
        {children}
      </div>
    </div>
  );

  const SettingRow = ({ label, description, control }: { label: string; description?: string; control: React.ReactNode }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm" style={{ color: "var(--text-primary)" }}>{label}</div>
        {description && <div className="text-xs" style={{ color: "var(--text-muted)" }}>{description}</div>}
      </div>
      {control}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-auto" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Customize your experience
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Preferences */}
          <SettingSection title="Preferences" icon={<Palette size={16} style={{ color: "var(--gold-main)" }} />}>
            <SettingRow
              label="Dark Mode"
              description="Toggle dark/light theme"
              control={
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${darkMode ? "bg-gold-main" : "bg-gray-600"}`}
                >
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              }
            />
            <SettingRow
              label="Notifications"
              description="Receive alerts for deadlines and exams"
              control={
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? "bg-gold-main" : "bg-gray-600"}`}
                >
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${notifications ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              }
            />
            <SettingRow
              label="Language"
              description="Choose your preferred language"
              control={
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="input-field text-sm py-1.5 w-28"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              }
            />
          </SettingSection>

          {/* Data Management */}
          <SettingSection title="Data Management" icon={<RefreshCw size={16} style={{ color: "var(--gold-main)" }} />}>
            <SettingRow
              label="Reset Profile"
              description="Restore default profile information"
              control={
                <button onClick={handleResetProfile} className="btn-ghost text-xs py-1.5" style={{ color: "var(--crimson-main)" }}>
                  <Trash2 size={12} className="inline mr-1" /> Reset
                </button>
              }
            />
          </SettingSection>

          {/* About */}
          <SettingSection title="About" icon={<Globe size={16} style={{ color: "var(--gold-main)" }} />}>
            <div className="text-center py-4">
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                ESTIN Academic Assistant
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Version 1.0.0
              </div>
              <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                Powered by Next.js & n8n
              </div>
              <div className="text-xs mt-4" style={{ color: "var(--gold-main)" }}>
                © 2024 ESTIN University
              </div>
            </div>
          </SettingSection>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  );
}