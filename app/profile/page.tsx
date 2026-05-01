// app/profile/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useProfile } from "@/contexts/ProfileContext";
import {
  User, Mail, Phone, MapPin, Building2, GraduationCap,
  Calendar, Edit2, Save, X, Camera, Upload,
} from "lucide-react";

function ProfileContent() {
  const router = useRouter();
  const { profile, updateProfile, isEditing, setIsEditing } = useProfile();
  const [formData, setFormData] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || "");

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setAvatarPreview(profile.avatar || "");
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatarPreview(avatarUrl);
        setFormData({ ...formData, avatar: avatarUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const InfoField = ({ label, value }: { label: string; value: string | number }) => (
    <div className="mb-4">
      <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-sm" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );

  const EditField = ({
    label,
    name,
    type = "text",
    value,
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    value: string | number;
  }) => (
    <div className="mb-4">
      <label className="text-xs font-medium mb-1 block" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="input-field text-sm"
      />
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
          <h1 className="section-title">My Profile</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Manage your personal information
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn-ghost text-sm py-2">
                <X size={16} className="inline mr-1" /> Cancel
              </button>
              <button onClick={handleSave} className="btn-primary text-sm py-2">
                <Save size={16} className="inline mr-1" /> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-primary text-sm py-2">
              <Edit2 size={16} className="inline mr-1" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Avatar Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-semibold overflow-hidden"
                style={{
                  background: avatarPreview ? "transparent" : "linear-gradient(135deg, #3878c7, #5c9fe0)",
                  border: "3px solid var(--gold-main)",
                }}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials(profile.name)
                )}
              </div>
              {isEditing && (
                <label
                  className="absolute bottom-0 right-0 p-1.5 rounded-full cursor-pointer transition-colors"
                  style={{ background: "var(--gold-main)" }}
                >
                  <Camera size={14} color="#13110d" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="card p-6">
            {isEditing ? (
              <>
                <EditField label="Full Name" name="name" value={formData.name} />
                <EditField label="Student ID" name="studentId" value={formData.studentId} />
                <EditField label="Email" name="email" type="email" value={formData.email || ""} />
                <EditField label="Phone" name="phone" value={formData.phone || ""} />
                <EditField label="University" name="university" value={formData.university} />
                <EditField label="Department" name="department" value={formData.department} />
                <EditField label="Year" name="year" type="number" value={formData.year} />
                <EditField label="Address" name="address" value={formData.address || ""} />
                <div className="mb-4">
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--text-muted)" }}>
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value as any })}
                    className="input-field text-sm"
                  >
                    <option value="S1">Semester 1</option>
                    <option value="S2">Semester 2</option>
                    <option value="S3">Semester 3</option>
                    <option value="S4">Semester 4</option>
                    <option value="S5">Semester 5</option>
                    <option value="S6">Semester 6</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Full Name" value={profile.name} />
                  <InfoField label="Student ID" value={profile.studentId} />
                  {profile.email && <InfoField label="Email" value={profile.email} />}
                  {profile.phone && <InfoField label="Phone" value={profile.phone} />}
                  <InfoField label="University" value={profile.university} />
                  <InfoField label="Department" value={profile.department} />
                  <InfoField label="Year" value={profile.year} />
                  <InfoField label="Semester" value={profile.semester} />
                  {profile.address && <InfoField label="Address" value={profile.address} />}
                </div>
              </>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <GraduationCap size={20} style={{ color: "var(--gold-main)", margin: "0 auto 8px" }} />
              <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {profile.year}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Year of Study</div>
            </div>
            <div className="card p-4 text-center">
              <Building2 size={20} style={{ color: "var(--gold-main)", margin: "0 auto 8px" }} />
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {profile.university}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>University</div>
            </div>
            <div className="card p-4 text-center">
              <Calendar size={20} style={{ color: "var(--gold-main)", margin: "0 auto 8px" }} />
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {profile.semester}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Current Semester</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfileContent />
    </AppShell>
  );
}