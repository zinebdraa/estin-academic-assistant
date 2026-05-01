// app/course/[moduleId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import {
  BookOpen, Video, FileText, CheckCircle, Clock,
  Download, ExternalLink, ChevronLeft, ChevronRight,
  Award, Brain, PenTool, FileQuestion, Loader2,
  Play, Headphones, Shield, Star, ThumbsUp, MessageCircle,
} from "lucide-react";
import Link from "next/link";

// Types
interface CourseContent {
  id: string;
  moduleId: string;
  moduleName: string;
  moduleCode: string;
  professor: string;
  credits: number;
  coefficient: number;
  description: string;
  progress: number;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "exercise" | "summary";
  duration: string;
  content: string;
  videoUrl?: string;
  pdfUrl?: string;
  isCompleted: boolean;
}

interface Exercise {
  id: string;
  moduleId: string;
  moduleName: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  type: "quiz" | "coding" | "theory" | "practical";
  questions: Question[];
  timeEstimate: number;
  points: number;
}

interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "open-ended" | "coding";
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  codeTemplate?: string;
}

// Mock data for demonstration (will be replaced with API calls)
const mockCourseContent: CourseContent = {
  id: "1",
  moduleId: "m1",
  moduleName: "Algorithms & Data Structures II",
  moduleCode: "INF301",
  professor: "Dr. Khelil Nassim",
  credits: 6,
  coefficient: 3,
  description: "Advanced algorithms including sorting, searching, graph algorithms, and data structures like trees, heaps, and hash tables.",
  progress: 68,
  chapters: [
    {
      id: "ch1",
      title: "Sorting Algorithms",
      description: "Advanced sorting techniques and complexity analysis",
      duration: "2 hours",
      isCompleted: true,
      lessons: [
        {
          id: "l1",
          title: "QuickSort Algorithm",
          type: "video",
          duration: "25 min",
          content: "Understanding QuickSort partitioning and recursion",
          videoUrl: "https://example.com/quicksort",
          isCompleted: true,
        },
        {
          id: "l2",
          title: "MergeSort Implementation",
          type: "reading",
          duration: "15 min",
          content: "Divide and conquer approach with merge operation",
          pdfUrl: "https://example.com/mergesort.pdf",
          isCompleted: true,
        },
        {
          id: "l3",
          title: "Sorting Algorithms Quiz",
          type: "quiz",
          duration: "30 min",
          content: "Test your knowledge on sorting algorithms",
          isCompleted: false,
        },
      ],
    },
    {
      id: "ch2",
      title: "Graph Algorithms",
      description: "Graph traversal, shortest paths, and minimum spanning trees",
      duration: "3 hours",
      isCompleted: false,
      lessons: [
        {
          id: "l4",
          title: "BFS and DFS Traversal",
          type: "video",
          duration: "35 min",
          content: "Breadth-first and depth-first search algorithms",
          videoUrl: "https://example.com/bfs-dfs",
          isCompleted: false,
        },
        {
          id: "l5",
          title: "Dijkstra's Algorithm",
          type: "exercise",
          duration: "45 min",
          content: "Implement shortest path algorithm",
          isCompleted: false,
        },
      ],
    },
  ],
};

const mockExercises: Exercise[] = [
  {
    id: "ex1",
    moduleId: "m1",
    moduleName: "Algorithms & Data Structures II",
    title: "Sorting Algorithms Practice",
    difficulty: "medium",
    type: "quiz",
    timeEstimate: 30,
    points: 50,
    questions: [
      {
        id: "q1",
        text: "What is the time complexity of QuickSort in the average case?",
        type: "multiple-choice",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: "O(n log n)",
        explanation: "QuickSort has average case time complexity of O(n log n) due to balanced partitioning.",
      },
      {
        id: "q2",
        text: "True or False: MergeSort is an in-place sorting algorithm.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "MergeSort requires O(n) additional space for the merge operation.",
      },
    ],
  },
  {
    id: "ex2",
    moduleId: "m1",
    moduleName: "Algorithms & Data Structures II",
    title: "Graph Traversal Challenge",
    difficulty: "hard",
    type: "coding",
    timeEstimate: 60,
    points: 100,
    questions: [
      {
        id: "q3",
        text: "Implement a function to detect cycles in a directed graph using DFS.",
        type: "coding",
        codeTemplate: `function hasCycle(graph) {\n  // Your code here\n  \n}`,
      },
    ],
  },
];

// Lesson Type Icon Component
function LessonIcon({ type }: { type: Lesson["type"] }) {
  const icons = {
    video: <Video size={16} />,
    reading: <BookOpen size={16} />,
    quiz: <Brain size={16} />,
    exercise: <PenTool size={16} />,
    summary: <FileText size={16} />,
  };
  return icons[type] || <FileText size={16} />;
}

// Main Course Content Component
function CourseContentPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "exercises">("content");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch course content from backend
  useEffect(() => {
    const fetchCourseContent = async () => {
      setLoading(true);
      try {
        // Replace with actual API call to your n8n backend
        // const response = await fetch(`YOUR_N8N_WEBHOOK_URL/course/${moduleId}`);
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setCourse(mockCourseContent);
          setExercises(mockExercises);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching course content:", error);
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [moduleId]);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleExerciseSubmit = () => {
    let totalScore = 0;
    exercises.forEach(exercise => {
      exercise.questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (question.correctAnswer && userAnswer === question.correctAnswer) {
          totalScore += exercise.points / exercise.questions.length;
        }
      });
    });
    setScore(Math.round(totalScore));
    setShowResults(true);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 size={40} className="animate-spin mx-auto mb-4" style={{ color: "var(--primary-main)" }} />
            <p style={{ color: "var(--text-secondary)" }}>Loading course content...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!course) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <BookOpen size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-secondary)" }}>Course not found</p>
            <button onClick={() => router.back()} className="btn-primary mt-4">
              Go Back
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm mb-3 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronLeft size={16} /> Back to Modules
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="tag text-xs" style={{ background: "var(--primary-glow)", color: "var(--primary-main)" }}>
                  {course.moduleCode}
                </span>
                <span className="tag text-xs" style={{ background: "var(--bg-elevated)" }}>
                  {course.credits} credits · Coef {course.coefficient}
                </span>
              </div>
              <h1 className="section-title mb-1">{course.moduleName}</h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Professor: {course.professor}
              </p>
            </div>
            
            {/* Progress circle */}
            <div className="text-center">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="var(--border-medium)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="var(--primary-main)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${course.progress * 1.76} 176`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {course.progress}%
                  </span>
                </div>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Complete</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 px-6" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-2 py-3 text-sm font-medium transition-all relative ${
                activeTab === "content" ? "text-primary-main" : "text-muted"
              }`}
              style={{ color: activeTab === "content" ? "var(--primary-main)" : "var(--text-muted)" }}
            >
              Course Content
              {activeTab === "content" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-main" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`px-2 py-3 text-sm font-medium transition-all relative ${
                activeTab === "exercises" ? "text-primary-main" : "text-muted"
              }`}
              style={{ color: activeTab === "exercises" ? "var(--primary-main)" : "var(--text-muted)" }}
            >
              Exercises & Quizzes
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full" style={{ background: "var(--primary-glow)" }}>
                {exercises.length}
              </span>
              {activeTab === "exercises" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-main" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {activeTab === "content" ? (
            <>
              {/* Chapters Sidebar */}
              <div
                className="w-80 overflow-y-auto flex-shrink-0"
                style={{ borderRight: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                    Chapters
                  </h3>
                  <div className="space-y-3">
                    {course.chapters.map((chapter, idx) => (
                      <div key={chapter.id} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {chapter.isCompleted ? (
                                <CheckCircle size={14} style={{ color: "var(--success)" }} />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: "var(--border-medium)" }} />
                              )}
                              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                {chapter.title}
                              </span>
                            </div>
                            <p className="text-xs ml-5 mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {chapter.duration} · {chapter.lessons.length} lessons
                            </p>
                          </div>
                        </div>
                        <div className="ml-5 space-y-1">
                          {chapter.lessons.map(lesson => (
                            <button
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                                selectedLesson?.id === lesson.id ? "bg-primary-glow" : "hover:bg-elevated"
                              }`}
                              style={{
                                background: selectedLesson?.id === lesson.id ? "var(--primary-glow)" : "transparent",
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <LessonIcon type={lesson.type} />
                                <span style={{ color: "var(--text-secondary)" }}>{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{lesson.duration}</span>
                                {lesson.isCompleted && <CheckCircle size={10} style={{ color: "var(--success)" }} />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedLesson ? (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <LessonIcon type={selectedLesson.type} />
                        <span className="tag text-xs" style={{ background: "var(--bg-elevated)" }}>
                          {selectedLesson.type.charAt(0).toUpperCase() + selectedLesson.type.slice(1)}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {selectedLesson.duration}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                        {selectedLesson.title}
                      </h2>
                      <div className="prose-academic" style={{ color: "var(--text-secondary)" }}>
                        <p>{selectedLesson.content}</p>
                      </div>
                    </div>

                    {/* Video Player for video lessons */}
                    {selectedLesson.type === "video" && selectedLesson.videoUrl && (
                      <div className="card p-4 mb-6">
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play size={48} style={{ color: "var(--text-muted)" }} />
                            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Video player placeholder</p>
                            <p className="text-xs">Video URL: {selectedLesson.videoUrl}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PDF Viewer for reading materials */}
                    {selectedLesson.type === "reading" && selectedLesson.pdfUrl && (
                      <div className="card p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText size={24} style={{ color: "var(--primary-main)" }} />
                            <div>
                              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Reading Material</p>
                              <p className="text-xs" style={{ color: "var(--text-muted)" }}>PDF Document</p>
                            </div>
                          </div>
                          <button className="btn-primary text-sm py-1.5">
                            <Download size={14} className="inline mr-1" /> Download PDF
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mark as completed button */}
                    <button className="btn-primary w-full mt-6 py-2">
                      {selectedLesson.isCompleted ? "Completed ✓" : "Mark as Completed"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <BookOpen size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                      <p style={{ color: "var(--text-secondary)" }}>Select a lesson to start learning</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Exercises Tab
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    Practice Exercises
                  </h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Test your knowledge with these exercises and quizzes
                  </p>
                </div>

                {showResults ? (
                  <div className="card p-6 text-center">
                    <Award size={48} className="mx-auto mb-4" style={{ color: "var(--gold-main)" }} />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                      Your Score: {score} points
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                      {score >= 70 ? "Great job! Keep up the good work!" : "Keep practicing, you'll get better!"}
                    </p>
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setAnswers({});
                        setSelectedExercise(null);
                      }}
                      className="btn-primary"
                    >
                      Try Again
                    </button>
                  </div>
                ) : selectedExercise ? (
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="tag" style={{ background: "var(--primary-glow)", color: "var(--primary-main)" }}>
                            {selectedExercise.type}
                          </span>
                          <span className="tag" style={{ background: "var(--bg-elevated)" }}>
                            {selectedExercise.difficulty}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                          {selectedExercise.title}
                        </h3>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {selectedExercise.timeEstimate} min · {selectedExercise.points} points
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="text-sm hover:opacity-70"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Back to list
                      </button>
                    </div>

                    <div className="space-y-6">
                      {selectedExercise.questions.map((question, qIdx) => (
                        <div key={question.id} className="border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                          <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>
                            {qIdx + 1}. {question.text}
                          </p>
                          
                          {question.type === "multiple-choice" && question.options && (
                            <div className="space-y-2">
                              {question.options.map(option => (
                                <label key={option} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-elevated">
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {question.type === "true-false" && (
                            <div className="flex gap-4">
                              {["True", "False"].map(option => (
                                <label key={option} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-elevated">
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                                  />
                                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {question.type === "coding" && (
                            <textarea
                              className="input-field font-mono text-sm"
                              rows={8}
                              placeholder={question.codeTemplate || "Write your code here..."}
                              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                            />
                          )}

                          {question.explanation && (
                            <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                              💡 Hint: {question.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button onClick={handleExerciseSubmit} className="btn-primary w-full mt-6 py-2">
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {exercises.map(exercise => (
                      <button
                        key={exercise.id}
                        onClick={() => setSelectedExercise(exercise)}
                        className="card p-4 w-full text-left hover:bg-elevated transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="tag" style={{ background: "var(--primary-glow)", color: "var(--primary-main)" }}>
                                {exercise.type}
                              </span>
                              <span className="tag" style={{ background: "var(--bg-elevated)" }}>
                                {exercise.difficulty}
                              </span>
                            </div>
                            <h3 className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                              {exercise.title}
                            </h3>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {exercise.timeEstimate} min · {exercise.points} points
                            </p>
                          </div>
                          <ChevronRight size={20} style={{ color: "var(--text-muted)" }} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default CourseContentPage;