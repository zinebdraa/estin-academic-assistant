// contexts/ProfileContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { StudentProfile, Semester } from "@/lib/types";

interface ProfileContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const defaultProfile: StudentProfile = {
  name: "Amira Bensalem",
  studentId: "2024-CS-0182",
  university: "ESTIN",
  department: "Computer Science & IT",
  year: 2,
  semester: "S3",
  avatar: "",
  email: "amira.bensalem@estin.dz",
  phone: "+213 5XX XX XX XX",
  address: "Bejaia, Algeria",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("estin_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem("estin_profile", JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isEditing, setIsEditing }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}