// // "use client";

// // import React, { useState, useRef, useEffect, useCallback } from "react";
// // import { Send, Plus, Sparkles, ChevronDown, Clock, Hash } from "lucide-react";
// // import MessageBubble, { TypingIndicator } from "@/components/chat/MessageBubble";
// // import SuggestedActions from "@/components/chat/SuggestedActions";
// // import type { ChatMessage, ConversationSession } from "@/lib/types";
// // import {
// //   getMockResponse, generateSessionId, formatRelativeTime,
// // } from "@/lib/api";
// // import {
// //   mockConversations, quickPrompts, welcomeMessage, mockStudent,
// // } from "@/lib/mockData";

// // function createWelcomeMsg(): ChatMessage {
// //   return {
// //     id: "welcome",
// //     role: "assistant",
// //     content: welcomeMessage,
// //     timestamp: new Date(),
// //     intent: "general",
// //   };
// // }

// // export default function ChatPage() {
// //   const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMsg()]);
// //   const [input, setInput] = useState("");
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [sessionId] = useState(generateSessionId);
// //   const [lastActions, setLastActions] = useState<Array<{ label: string; action: string }>>([]);
// //   const [sessions] = useState<ConversationSession[]>(mockConversations);
// //   const [showHistory, setShowHistory] = useState(false);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const inputRef = useRef<HTMLTextAreaElement>(null);

// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, []);

// //   useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

// //   const sendMessage = useCallback(async (text: string) => {
// //     const trimmed = text.trim();
// //     if (!trimmed || isTyping) return;

// //     const userMsg: ChatMessage = {
// //       id: `u_${Date.now()}`,
// //       role: "user",
// //       content: trimmed,
// //       timestamp: new Date(),
// //     };

// //     setMessages(prev => [...prev, userMsg]);
// //     setInput("");
// //     setIsTyping(true);
// //     setLastActions([]);

// //     // Simulate latency
// //     await new Promise(r => setTimeout(r, 900 + Math.random() * 800));

// //     const response = getMockResponse(trimmed);

// //     const assistantMsg: ChatMessage = {
// //       id: `a_${Date.now()}`,
// //       role: "assistant",
// //       content: response.reply,
// //       timestamp: new Date(),
// //       intent: (response.intent as ChatMessage["intent"]) || "general",
// //     };

// //     setIsTyping(false);
// //     setMessages(prev => [...prev, assistantMsg]);
// //     if (response.suggestedActions) {
// //       setLastActions(response.suggestedActions);
// //     }
// //   }, [isTyping]);

// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage(input);
// //     }
// //   };

// //   const handleQuickPrompt = (value: string) => {
// //     setInput(value);
// //     inputRef.current?.focus();
// //   };

// //   return (
// //     <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>

// //       {/* ── History panel (desktop) ─────────────────────────── */}
// //       <div
// //         className="hidden xl:flex flex-col flex-shrink-0"
// //         style={{
// //           width: "220px",
// //           borderRight: "1px solid var(--border-subtle)",
// //           background: "var(--bg-secondary)",
// //         }}
// //       >
// //         <div className="px-3 py-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
// //           <button
// //             className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
// //             onClick={() => setMessages([createWelcomeMsg()])}
// //           >
// //             <Plus size={13} /> New Chat
// //           </button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto px-2 py-3">
// //           <div className="label px-2 mb-2">Recent</div>
// //           {sessions.map(s => (
// //             <button
// //               key={s.id}
// //               className="w-full text-left px-2.5 py-2.5 rounded-lg mb-0.5 transition-colors"
// //               style={{ color: "var(--text-secondary)" }}
// //               onMouseEnter={e => {
// //                 (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
// //               }}
// //               onMouseLeave={e => {
// //                 (e.currentTarget as HTMLElement).style.background = "transparent";
// //               }}
// //             >
// //               <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
// //                 {s.title}
// //               </div>
// //               <div className="flex items-center gap-1 mt-0.5">
// //                 <Clock size={10} style={{ color: "var(--text-muted)" }} />
// //                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
// //                   {formatRelativeTime(s.timestamp)}
// //                 </span>
// //                 <Hash size={10} style={{ color: "var(--text-muted)", marginLeft: 2 }} />
// //                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
// //                   {s.messageCount}
// //                 </span>
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ── Main chat area ──────────────────────────────────── */}
// //       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

// //         {/* Header */}
// //         <div
// //           className="flex items-center justify-between px-5 py-3 flex-shrink-0"
// //           style={{
// //             borderBottom: "1px solid var(--border-subtle)",
// //             background: "var(--bg-secondary)",
// //           }}
// //         >
// //           <div className="flex items-center gap-3">
// //             <div
// //               className="w-7 h-7 rounded-full flex items-center justify-center"
// //               style={{ background: "var(--gold-glow)", border: "1px solid rgba(201,151,42,0.3)" }}
// //             >
// //               <Sparkles size={13} style={{ color: "var(--gold-main)" }} />
// //             </div>
// //             <div>
// //               <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
// //                 AI Academic Assistant
// //               </div>
// //               <div className="flex items-center gap-1.5">
// //                 <span
// //                   className="w-1.5 h-1.5 rounded-full"
// //                   style={{ background: "#5a8c52" }}
// //                 />
// //                 <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Online · n8n powered</span>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="tag text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
// //               Session · {messages.length - 1} msgs
// //             </span>
// //             <button
// //               onClick={() => setMessages([createWelcomeMsg()])}
// //               className="btn-ghost text-xs py-1.5"
// //             >
// //               <Plus size={13} className="mr-1 inline" /> New
// //             </button>
// //           </div>
// //         </div>

// //         {/* Messages */}
// //         <div className="chat-messages flex-1">
// //           {messages.map((msg, i) => (
// //             <div key={msg.id}>
// //               <MessageBubble message={msg} />
// //               {/* Show actions after last assistant message */}
// //               {msg.role === "assistant" && i === messages.length - 1 && lastActions.length > 0 && (
// //                 <SuggestedActions
// //                   actions={lastActions}
// //                   onAction={sendMessage}
// //                 />
// //               )}
// //             </div>
// //           ))}
// //           {isTyping && <TypingIndicator />}
// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Quick prompts */}
// //         {messages.length === 1 && (
// //           <div className="px-5 pb-3 flex flex-wrap gap-2">
// //             {quickPrompts.map(p => (
// //               <button
// //                 key={p.value}
// //                 onClick={() => handleQuickPrompt(p.value)}
// //                 className="tag text-xs py-1.5 px-3 rounded-full transition-all duration-150 cursor-pointer"
// //                 style={{
// //                   background: "var(--bg-elevated)",
// //                   border: "1px solid var(--border-medium)",
// //                   color: "var(--text-secondary)",
// //                 }}
// //                 onMouseEnter={e => {
// //                   (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-main)";
// //                   (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
// //                 }}
// //                 onMouseLeave={e => {
// //                   (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
// //                   (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
// //                 }}
// //               >
// //                 {p.label}
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {/* Input area */}
// //         <div
// //           className="px-4 py-3 flex-shrink-0"
// //           style={{
// //             borderTop: "1px solid var(--border-subtle)",
// //             background: "var(--bg-secondary)",
// //           }}
// //         >
// //           <div
// //             className="flex items-end gap-3 rounded-xl p-2"
// //             style={{
// //               background: "var(--bg-elevated)",
// //               border: "1px solid var(--border-medium)",
// //             }}
// //           >
// //             <textarea
// //               ref={inputRef}
// //               value={input}
// //               onChange={e => setInput(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               placeholder="Ask about your schedule, exams, study resources..."
// //               rows={1}
// //               className="flex-1 resize-none bg-transparent text-sm py-2 px-2 outline-none"
// //               style={{
// //                 color: "var(--text-primary)",
// //                 maxHeight: "120px",
// //                 minHeight: "36px",
// //                 lineHeight: "1.5",
// //                 fontFamily: "'DM Sans', sans-serif",
// //               }}
// //               onInput={e => {
// //                 const t = e.currentTarget;
// //                 t.style.height = "auto";
// //                 t.style.height = Math.min(t.scrollHeight, 120) + "px";
// //               }}
// //             />
// //             <button
// //               onClick={() => sendMessage(input)}
// //               disabled={!input.trim() || isTyping}
// //               className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
// //               style={{
// //                 background: input.trim() && !isTyping ? "var(--gold-main)" : "var(--bg-card)",
// //                 color: input.trim() && !isTyping ? "#13110d" : "var(--text-muted)",
// //                 cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
// //               }}
// //             >
// //               <Send size={15} strokeWidth={2.5} />
// //             </button>
// //           </div>
// //           <div className="text-center mt-2" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
// //             Powered by n8n · Synced with ESTIN curriculum
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // app/chat/page.tsx
// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Send, Plus, Sparkles, Clock, Hash, Paperclip, Image, FileText, X, Upload, Mic } from "lucide-react";
// import MessageBubble, { TypingIndicator } from "@/components/chat/MessageBubble";
// import SuggestedActions from "@/components/chat/SuggestedActions";
// import type { ChatMessage, ConversationSession } from "@/lib/types";
// import {
//   getMockResponse, generateSessionId, formatRelativeTime,
// } from "@/lib/api";
// import {
//   mockConversations, quickPrompts, welcomeMessage,
// } from "@/lib/mockData";

// // File attachment type
// interface Attachment {
//   id: string;
//   file: File;
//   type: "image" | "pdf" | "document" | "other";
//   preview?: string;
//   name: string;
//   size: number;
// }

// function createWelcomeMsg(): ChatMessage {
//   return {
//     id: "welcome",
//     role: "assistant",
//     content: welcomeMessage,
//     timestamp: new Date(),
//     intent: "general",
//   };
// }

// export default function ChatPage() {
//   const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMsg()]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [sessionId] = useState(generateSessionId);
//   const [lastActions, setLastActions] = useState<Array<{ label: string; action: string }>>([]);
//   const [sessions] = useState<ConversationSession[]>(mockConversations);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const pdfInputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

//   // Handle file selection
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf" | "document") => {
//     const files = Array.from(e.target.files || []);
//     const newAttachments: Attachment[] = [];

//     files.forEach(file => {
//       // Validate file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         alert(`File ${file.name} is too large. Maximum size is 10MB.`);
//         return;
//       }

//       let attachmentType: "image" | "pdf" | "document" | "other" = "other";
//       let preview: string | undefined;

//       if (type === "image" || file.type.startsWith("image/")) {
//         attachmentType = "image";
//         preview = URL.createObjectURL(file);
//       } else if (file.type === "application/pdf") {
//         attachmentType = "pdf";
//       } else if (file.type.includes("document") || file.type.includes("text")) {
//         attachmentType = "document";
//       }

//       newAttachments.push({
//         id: `att_${Date.now()}_${Math.random()}`,
//         file,
//         type: attachmentType,
//         preview,
//         name: file.name,
//         size: file.size,
//       });
//     });

//     setAttachments(prev => [...prev, ...newAttachments]);
//     setShowAttachmentMenu(false);
//     inputRef.current?.focus();
//   };

//   // Remove attachment
//   const removeAttachment = (id: string) => {
//     setAttachments(prev => {
//       const attachment = prev.find(a => a.id === id);
//       if (attachment?.preview) {
//         URL.revokeObjectURL(attachment.preview);
//       }
//       return prev.filter(a => a.id !== id);
//     });
//   };

//   // Format file size
//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   // Send message with attachments
//   const sendMessage = useCallback(async (text: string) => {
//     const trimmed = text.trim();
//     if ((!trimmed && attachments.length === 0) || isTyping) return;

//     // Create user message with attachments
//     const userMsg: ChatMessage = {
//       id: `u_${Date.now()}`,
//       role: "user",
//       content: trimmed || (attachments.length > 0 ? `📎 Sent ${attachments.length} file(s)` : ""),
//       timestamp: new Date(),
//     };

//     // Add attachments metadata to message (custom field)
//     const userMsgWithFiles = {
//       ...userMsg,
//       attachments: attachments.map(a => ({
//         name: a.name,
//         type: a.type,
//         size: a.size,
//         preview: a.preview,
//       })),
//     };

//     setMessages(prev => [...prev, userMsgWithFiles as ChatMessage]);
//     setInput("");
//     setIsTyping(true);
//     setLastActions([]);

//     // Simulate AI processing with file context
//     await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

//     let responseText = "";
//     if (attachments.length > 0) {
//       const fileDescriptions = attachments.map(a => {
//         if (a.type === "image") return `an image "${a.name}"`;
//         if (a.type === "pdf") return `a PDF document "${a.name}"`;
//         return `a file "${a.name}"`;
//       }).join(", ");
      
//       responseText = `I've received ${fileDescriptions}. I'm analyzing the content. `;
      
//       // Add specific responses based on file type
//       if (attachments.some(a => a.type === "image")) {
//         responseText += "\n\n📸 **Image Analysis:** I can help describe, analyze diagrams, or extract text from images. What would you like me to do with this image?";
//       }
//       if (attachments.some(a => a.type === "pdf")) {
//         responseText += "\n\n📄 **PDF Processing:** I can summarize the document, answer questions about its content, or help you study key points. Ask me anything about the document!";
//       }
//       if (attachments.some(a => a.type === "document")) {
//         responseText += "\n\n📝 **Document Analysis:** I can help you understand, summarize, or extract key information from this document.";
//       }
//     } else {
//       const response = getMockResponse(trimmed);
//       responseText = response.reply;
//     }

//     const assistantMsg: ChatMessage = {
//       id: `a_${Date.now()}`,
//       role: "assistant",
//       content: responseText,
//       timestamp: new Date(),
//       intent: attachments.length > 0 ? "resources" : (getMockResponse(trimmed).intent as ChatMessage["intent"]) || "general",
//     };

//     setIsTyping(false);
//     setMessages(prev => [...prev, assistantMsg]);
    
//     // Clear attachments after sending
//     setAttachments([]);
    
//     if (!attachments.length && getMockResponse(trimmed).suggestedActions) {
//       setLastActions(getMockResponse(trimmed).suggestedActions || []);
//     }
//   }, [isTyping, attachments]);

//   // Voice recording (simplified - would need Web Speech API)
//   const startVoiceRecording = () => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
//       const recognition = new SpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.continuous = false;
//       recognition.interimResults = false;

//       recognition.onstart = () => {
//         setIsRecording(true);
//       };

//       recognition.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = () => {
//         setIsRecording(false);
//         alert("Voice recognition failed. Please try again.");
//       };

//       recognition.onend = () => {
//         setIsRecording(false);
//       };

//       recognition.start();
//     } else {
//       alert("Voice recognition is not supported in your browser.");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(input);
//     }
//   };

//   const handleQuickPrompt = (value: string) => {
//     setInput(value);
//     inputRef.current?.focus();
//   };

//   return (
//     <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>

//       {/* History panel */}
//       <div
//         className="hidden xl:flex flex-col flex-shrink-0"
//         style={{
//           width: "220px",
//           borderRight: "1px solid var(--border-subtle)",
//           background: "var(--bg-secondary)",
//         }}
//       >
//         <div className="px-3 py-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
//           <button
//             className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
//             onClick={() => setMessages([createWelcomeMsg()])}
//           >
//             <Plus size={13} /> New Chat
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-2 py-3">
//           <div className="label px-2 mb-2">Recent</div>
//           {sessions.map(s => (
//             <button
//               key={s.id}
//               className="w-full text-left px-2.5 py-2.5 rounded-lg mb-0.5 transition-colors"
//               style={{ color: "var(--text-secondary)" }}
//               onMouseEnter={e => {
//                 (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget as HTMLElement).style.background = "transparent";
//               }}
//             >
//               <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
//                 {s.title}
//               </div>
//               <div className="flex items-center gap-1 mt-0.5">
//                 <Clock size={10} style={{ color: "var(--text-muted)" }} />
//                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//                   {formatRelativeTime(s.timestamp)}
//                 </span>
//                 <Hash size={10} style={{ color: "var(--text-muted)", marginLeft: 2 }} />
//                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//                   {s.messageCount}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//         {/* Header */}
//         <div
//           className="flex items-center justify-between px-5 py-3 flex-shrink-0"
//           style={{
//             borderBottom: "1px solid var(--border-subtle)",
//             background: "var(--bg-secondary)",
//           }}
//         >
//           <div className="flex items-center gap-3">
//             <div
//               className="w-7 h-7 rounded-full flex items-center justify-center"
//               style={{ background: "var(--primary-glow)", border: "1px solid rgba(99,102,241,0.3)" }}
//             >
//               <Sparkles size={13} style={{ color: "var(--primary-main)" }} />
//             </div>
//             <div>
//               <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
//                 AI Academic Assistant
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <span
//                   className="w-1.5 h-1.5 rounded-full"
//                   style={{ background: "#10b981" }}
//                 />
//                 <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Online · n8n powered</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="tag text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
//               Session · {messages.length - 1} msgs
//             </span>
//             <button
//               onClick={() => setMessages([createWelcomeMsg()])}
//               className="btn-ghost text-xs py-1.5"
//             >
//               <Plus size={13} className="mr-1 inline" /> New
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="chat-messages flex-1">
//           {messages.map((msg, i) => (
//             <div key={msg.id}>
//               <MessageBubble message={msg} />
//               {msg.role === "assistant" && i === messages.length - 1 && lastActions.length > 0 && (
//                 <SuggestedActions
//                   actions={lastActions}
//                   onAction={sendMessage}
//                 />
//               )}
//             </div>
//           ))}
//           {isTyping && <TypingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Quick prompts */}
//         {messages.length === 1 && (
//           <div className="px-5 pb-3 flex flex-wrap gap-2">
//             {quickPrompts.map(p => (
//               <button
//                 key={p.value}
//                 onClick={() => handleQuickPrompt(p.value)}
//                 className="tag text-xs py-1.5 px-3 rounded-full transition-all duration-150 cursor-pointer"
//                 style={{
//                   background: "var(--bg-elevated)",
//                   border: "1px solid var(--border-medium)",
//                   color: "var(--text-secondary)",
//                 }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = "var(--primary-main)";
//                   (e.currentTarget as HTMLElement).style.color = "var(--primary-main)";
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
//                   (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
//                 }}
//               >
//                 {p.label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Attachments preview */}
//         {attachments.length > 0 && (
//           <div className="px-4 pt-3 flex flex-wrap gap-2">
//             {attachments.map(att => (
//               <div
//                 key={att.id}
//                 className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
//                 style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}
//               >
//                 {att.type === "image" && att.preview ? (
//                   <div className="relative w-8 h-8 rounded overflow-hidden">
//                     <img src={att.preview} alt={att.name} className="w-full h-full object-cover" />
//                   </div>
//                 ) : att.type === "pdf" ? (
//                   <FileText size={16} style={{ color: "var(--error)" }} />
//                 ) : (
//                   <Paperclip size={14} style={{ color: "var(--text-muted)" }} />
//                 )}
//                 <div className="max-w-[150px]">
//                   <div className="text-xs truncate" style={{ color: "var(--text-primary)" }}>
//                     {att.name}
//                   </div>
//                   <div className="text-xs" style={{ color: "var(--text-muted)" }}>
//                     {formatFileSize(att.size)}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeAttachment(att.id)}
//                   className="p-0.5 rounded hover:bg-red-500/20 transition-colors"
//                 >
//                   <X size={12} style={{ color: "var(--text-muted)" }} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Input area */}
//         <div
//           className="px-4 py-3 flex-shrink-0"
//           style={{
//             borderTop: "1px solid var(--border-subtle)",
//             background: "var(--bg-secondary)",
//           }}
//         >
//           <div
//             className="flex items-end gap-2 rounded-xl p-2"
//             style={{
//               background: "var(--bg-elevated)",
//               border: "1px solid var(--border-medium)",
//             }}
//           >
//             {/* Attachment button with menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
//                 className="p-2 rounded-lg transition-colors hover:bg-white/5"
//                 style={{ color: "var(--text-muted)" }}
//                 title="Attach file"
//               >
//                 <Paperclip size={18} />
//               </button>
              
//               {showAttachmentMenu && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-40"
//                     onClick={() => setShowAttachmentMenu(false)}
//                   />
//                   <div
//                     className="absolute bottom-full left-0 mb-2 w-48 rounded-lg shadow-lg overflow-hidden z-50"
//                     style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}
//                   >
//                     <button
//                       onClick={() => imageInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <Image size={16} /> Upload Image
//                     </button>
//                     <button
//                       onClick={() => pdfInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <FileText size={16} /> Upload PDF
//                     </button>
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <Upload size={16} /> Upload Document
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask about your schedule, exams, study resources... or upload a file"
//               rows={1}
//               className="flex-1 resize-none bg-transparent text-sm py-2 px-1 outline-none"
//               style={{
//                 color: "var(--text-primary)",
//                 maxHeight: "120px",
//                 minHeight: "36px",
//                 lineHeight: "1.5",
//                 fontFamily: "'Inter', sans-serif",
//               }}
//               onInput={e => {
//                 const t = e.currentTarget;
//                 t.style.height = "auto";
//                 t.style.height = Math.min(t.scrollHeight, 120) + "px";
//               }}
//             />

//             {/* Voice input button */}
//             <button
//               onClick={startVoiceRecording}
//               className={`p-2 rounded-lg transition-all ${isRecording ? "animate-pulse" : ""}`}
//               style={{ 
//                 color: isRecording ? "var(--error)" : "var(--text-muted)",
//                 background: isRecording ? "rgba(239,68,68,0.1)" : "transparent"
//               }}
//               title="Voice input"
//             >
//               <Mic size={18} />
//             </button>

//             {/* Send button */}
//             <button
//               onClick={() => sendMessage(input)}
//               disabled={(!input.trim() && attachments.length === 0) || isTyping}
//               className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
//               style={{
//                 background: (input.trim() || attachments.length > 0) && !isTyping ? "var(--primary-main)" : "var(--bg-card)",
//                 color: (input.trim() || attachments.length > 0) && !isTyping ? "white" : "var(--text-muted)",
//                 cursor: (input.trim() || attachments.length > 0) && !isTyping ? "pointer" : "not-allowed",
//               }}
//             >
//               <Send size={15} strokeWidth={2.5} />
//             </button>
//           </div>
          
//           {/* Hidden file inputs */}
//           <input
//             ref={imageInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "image")}
//           />
//           <input
//             ref={pdfInputRef}
//             type="file"
//             accept=".pdf"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "pdf")}
//           />
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".doc,.docx,.txt,.md,.json"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "document")}
//           />

//           <div className="text-center mt-2" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//             Powered by n8n · Supports images, PDFs, and documents (max 10MB)
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/chat/page.tsx
// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { 
//   Send, Plus, Sparkles, Clock, Hash, Paperclip, Image, FileText, 
//   X, Upload, Mic, Calendar, BookOpen, Target, Clock as ClockIcon,
//   Moon, Sun, Brain, Zap, ChevronDown, CheckCircle, AlertCircle
// } from "lucide-react";
// import MessageBubble, { TypingIndicator } from "@/components/chat/MessageBubble";
// import SuggestedActions from "@/components/chat/SuggestedActions";
// import type { ChatMessage, ConversationSession } from "@/lib/types";
// import {
//   getMockResponse, generateSessionId, formatRelativeTime,
// } from "@/lib/api";
// import {
//   mockConversations, quickPrompts, welcomeMessage,
// } from "@/lib/mockData";

// interface Attachment {
//   id: string;
//   file: File;
//   type: "image" | "pdf" | "document" | "other";
//   preview?: string;
//   name: string;
//   size: number;
// }

// interface StructuredInput {
//   type: "exam" | "task" | "course" | "td" | "tp" | "deadline" | "preference";
//   data: Record<string, any>;
// }

// function createWelcomeMsg(): ChatMessage {
//   return {
//     id: "welcome",
//     role: "assistant",
//     content: welcomeMessage,
//     timestamp: new Date(),
//     intent: "general",
//   };
// }

// export default function ChatPage() {
//   const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMsg()]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [sessionId] = useState(generateSessionId);
//   const [lastActions, setLastActions] = useState<Array<{ label: string; action: string }>>([]);
//   const [sessions] = useState<ConversationSession[]>(mockConversations);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [showStructuredForm, setShowStructuredForm] = useState(false);
//   const [formType, setFormType] = useState<"exam" | "task" | "course" | "td" | "tp" | "deadline" | "preference">("task");
//   const [formData, setFormData] = useState<Record<string, any>>({});

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const pdfInputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf" | "document") => {
//     const files = Array.from(e.target.files || []);
//     const newAttachments: Attachment[] = [];

//     files.forEach(file => {
//       if (file.size > 10 * 1024 * 1024) {
//         alert(`File ${file.name} is too large. Maximum size is 10MB.`);
//         return;
//       }

//       let attachmentType: "image" | "pdf" | "document" | "other" = "other";
//       let preview: string | undefined;

//       if (type === "image" || file.type.startsWith("image/")) {
//         attachmentType = "image";
//         preview = URL.createObjectURL(file);
//       } else if (file.type === "application/pdf") {
//         attachmentType = "pdf";
//       } else if (file.type.includes("document") || file.type.includes("text")) {
//         attachmentType = "document";
//       }

//       newAttachments.push({
//         id: `att_${Date.now()}_${Math.random()}`,
//         file,
//         type: attachmentType,
//         preview,
//         name: file.name,
//         size: file.size,
//       });
//     });

//     setAttachments(prev => [...prev, ...newAttachments]);
//     setShowAttachmentMenu(false);
//     inputRef.current?.focus();
//   };

//   const removeAttachment = (id: string) => {
//     setAttachments(prev => {
//       const attachment = prev.find(a => a.id === id);
//       if (attachment?.preview) {
//         URL.revokeObjectURL(attachment.preview);
//       }
//       return prev.filter(a => a.id !== id);
//     });
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   const handleStructuredSubmit = () => {
//     let message = "";
    
//     switch (formType) {
//       case "exam":
//         message = `📝 **Exam Added to Schedule**\n\n**Course:** ${formData.course}\n**Exam Type:** ${formData.examType}\n**Date:** ${formData.date}\n**Time:** ${formData.time}\n**Room:** ${formData.room || "TBA"}\n**Duration:** ${formData.duration} minutes\n\n**Topics to cover:**\n${formData.topics?.map((t: string) => `- ${t}`).join("\n") || "- Not specified"}\n\n${formData.notes ? `**Additional Notes:** ${formData.notes}` : ""}\n\nI've added this exam to your schedule. Would you like me to create a study plan?`;
//         break;
        
//       case "task":
//         message = `✅ **Task Created**\n\n**Task:** ${formData.title}\n**Course:** ${formData.course}\n**Priority:** ${formData.priority}\n**Due Date:** ${formData.dueDate}\n**Estimated Hours:** ${formData.estimatedHours}h\n\n**Subtasks:**\n${formData.subtasks?.map((s: string) => `- ${s}`).join("\n") || "- No subtasks"}\n\nI've added this to your planner. Need help breaking it down further?`;
//         break;
        
//       case "course":
//         message = `📚 **Course Added**\n\n**Course Name:** ${formData.name}\n**Course Code:** ${formData.code}\n**Credits:** ${formData.credits}\n**Coefficient:** ${formData.coefficient}\n**Professor:** ${formData.professor || "TBA"}\n**Schedule:** ${formData.schedule || "TBA"}\n\n**Topics covered:**\n${formData.topics?.map((t: string) => `- ${t}`).join("\n") || "- No topics specified"}\n\nI've added this course to your curriculum.`;
//         break;
        
//       case "td":
//         message = `📖 **TD Session Added**\n\n**Course:** ${formData.course}\n**TD Number:** ${formData.tdNumber}\n**Date:** ${formData.date}\n**Time:** ${formData.time}\n**Room:** ${formData.room}\n**Professor:** ${formData.professor}\n\n**Exercises to cover:**\n${formData.exercises?.map((e: string) => `- ${e}`).join("\n") || "- Not specified"}\n\nI've added this TD session to your schedule.`;
//         break;
        
//       case "tp":
//         message = `🔬 **TP Session Added**\n\n**Course:** ${formData.course}\n**TP Number:** ${formData.tpNumber}\n**Date:** ${formData.date}\n**Time:** ${formData.time}\n**Lab Room:** ${formData.labRoom}\n**Supervisor:** ${formData.supervisor}\n\n**Tasks to complete:**\n${formData.tasks?.map((t: string) => `- ${t}`).join("\n") || "- Not specified"}\n\nDon't forget to prepare the required materials!`;
//         break;
        
//       case "deadline":
//         message = `⏰ **Deadline Added**\n\n**Project/Assignment:** ${formData.title}\n**Course:** ${formData.course}\n**Due Date:** ${formData.dueDate}\n**Time:** ${formData.time || "23:59"}\n**Type:** ${formData.type}\n\n**Requirements:**\n${formData.requirements?.map((r: string) => `- ${r}`).join("\n") || "- Not specified"}\n\nI'll remind you before this deadline!`;
//         break;
        
//       case "preference":
//         message = `⚙️ **Study Preferences Updated**\n\n**Study Time:** ${formData.studyTime}\n**Productivity Peak:** ${formData.peakHours}\n**Break Interval:** Every ${formData.breakInterval} minutes\n**Preferred Study Environment:** ${formData.environment}\n\n**Goals:**\n${formData.goals?.map((g: string) => `- ${g}`).join("\n")}\n\nI'll tailor my recommendations based on these preferences!`;
//         break;
//     }

//     const assistantMsg: ChatMessage = {
//       id: `a_${Date.now()}`,
//       role: "assistant",
//       content: message,
//       timestamp: new Date(),
//       intent: "plan",
//     };

//     setMessages(prev => [...prev, assistantMsg]);
//     setShowStructuredForm(false);
//     setFormData({});
    
//     // Scroll to show the new message
//     setTimeout(scrollToBottom, 100);
//   };

//   const updateFormData = (key: string, value: any) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const addArrayItem = (key: string, value: string) => {
//     if (!value.trim()) return;
//     setFormData(prev => ({
//       ...prev,
//       [key]: [...(prev[key] || []), value.trim()]
//     }));
//   };

//   const removeArrayItem = (key: string, index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: prev[key].filter((_: any, i: number) => i !== index)
//     }));
//   };

//   const sendMessage = useCallback(async (text: string) => {
//     const trimmed = text.trim();
//     if ((!trimmed && attachments.length === 0) || isTyping) return;

//     const userMsg: ChatMessage = {
//       id: `u_${Date.now()}`,
//       role: "user",
//       content: trimmed || (attachments.length > 0 ? `📎 Sent ${attachments.length} file(s)` : ""),
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);
//     setLastActions([]);

//     await new Promise(r => setTimeout(r, 900 + Math.random() * 800));

//     let responseText = "";
//     if (attachments.length > 0) {
//       const fileDescriptions = attachments.map(a => {
//         if (a.type === "image") return `an image "${a.name}"`;
//         if (a.type === "pdf") return `a PDF document "${a.name}"`;
//         return `a file "${a.name}"`;
//       }).join(", ");
      
//       responseText = `I've received ${fileDescriptions}. I'm analyzing the content. `;
//     } else {
//       const response = getMockResponse(trimmed);
//       responseText = response.reply;
//     }

//     const assistantMsg: ChatMessage = {
//       id: `a_${Date.now()}`,
//       role: "assistant",
//       content: responseText,
//       timestamp: new Date(),
//       intent: "general",
//     };

//     setIsTyping(false);
//     setMessages(prev => [...prev, assistantMsg]);
//     setAttachments([]);
//   }, [isTyping, attachments]);

//   const startVoiceRecording = () => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
//       const recognition = new SpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.continuous = false;
//       recognition.interimResults = false;

//       recognition.onstart = () => {
//         setIsRecording(true);
//       };

//       recognition.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = () => {
//         setIsRecording(false);
//         alert("Voice recognition failed. Please try again.");
//       };

//       recognition.onend = () => {
//         setIsRecording(false);
//       };

//       recognition.start();
//     } else {
//       alert("Voice recognition is not supported in your browser.");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(input);
//     }
//   };

//   const handleQuickPrompt = (value: string) => {
//     setInput(value);
//     inputRef.current?.focus();
//   };

//   // Structured Form Component
//   const StructuredForm = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
//       <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
//         {/* Header */}
//         <div className="sticky top-0 p-5 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {formType === "exam" && <Calendar size={20} style={{ color: "var(--primary-main)" }} />}
//               {formType === "task" && <Target size={20} style={{ color: "var(--primary-main)" }} />}
//               {formType === "course" && <BookOpen size={20} style={{ color: "var(--primary-main)" }} />}
//               {formType === "preference" && <Brain size={20} style={{ color: "var(--primary-main)" }} />}
//               <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
//                 Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
//               </h2>
//             </div>
//             <button onClick={() => setShowStructuredForm(false)} className="p-1 rounded-lg hover:bg-white/10">
//               <X size={20} style={{ color: "var(--text-muted)" }} />
//             </button>
//           </div>
//         </div>

//         {/* Form Body */}
//         <div className="p-5 space-y-4">
//           {/* Type Selector */}
//           <div>
//             <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-secondary)" }}>
//               What would you like to add?
//             </label>
//             <div className="flex gap-2 flex-wrap">
//               {[
//                 { type: "exam", label: "📝 Exam", icon: <Calendar size={14} /> },
//                 { type: "task", label: "✅ Task", icon: <Target size={14} /> },
//                 { type: "course", label: "📚 Course", icon: <BookOpen size={14} /> },
//                 { type: "td", label: "📖 TD", icon: <BookOpen size={14} /> },
//                 { type: "tp", label: "🔬 TP", icon: <Zap size={14} /> },
//                 { type: "deadline", label: "⏰ Deadline", icon: <ClockIcon size={14} /> },
//                 { type: "preference", label: "⚙️ Preferences", icon: <Brain size={14} /> },
//               ].map(item => (
//                 <button
//                   key={item.type}
//                   onClick={() => {
//                     setFormType(item.type as any);
//                     setFormData({});
//                   }}
//                   className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 ${
//                     formType === item.type ? "bg-primary-main text-black" : "bg-elevated text-secondary"
//                   }`}
//                   style={formType === item.type ? {} : { background: "var(--bg-elevated)" }}
//                 >
//                   {item.icon}
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Exam Form */}
//           {formType === "exam" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course Name *</label>
//                   <input type="text" className="input-field" placeholder="Algorithms & Data Structures"
//                     value={formData.course || ""} onChange={e => updateFormData("course", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Exam Type</label>
//                   <select className="input-field" value={formData.examType || "midterm"} onChange={e => updateFormData("examType", e.target.value)}>
//                     <option value="midterm">Midterm Exam</option>
//                     <option value="final">Final Exam</option>
//                     <option value="quiz">Quiz</option>
//                     <option value="test">Test</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Date *</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => updateFormData("date", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Time</label>
//                   <input type="time" className="input-field" value={formData.time || ""} onChange={e => updateFormData("time", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Room</label>
//                   <input type="text" className="input-field" placeholder="Amphi A" value={formData.room || ""} onChange={e => updateFormData("room", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Duration (minutes)</label>
//                   <input type="number" className="input-field" placeholder="120" value={formData.duration || ""} onChange={e => updateFormData("duration", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Topics to Cover</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="topicInput" className="input-field flex-1" placeholder="Add a topic" />
//                   <button onClick={() => {
//                     const input = document.getElementById("topicInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("topics", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {(formData.topics || []).map((topic: string, idx: number) => (
//                     <span key={idx} className="tag px-2 py-1" style={{ background: "var(--bg-elevated)" }}>
//                       {topic}
//                       <button onClick={() => removeArrayItem("topics", idx)} className="ml-1"><X size={12} /></button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Notes</label>
//                 <textarea className="input-field" rows={2} placeholder="Additional information..." value={formData.notes || ""} onChange={e => updateFormData("notes", e.target.value)} />
//               </div>
//             </>
//           )}

//           {/* Task Form */}
//           {formType === "task" && (
//             <>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Task Title *</label>
//                 <input type="text" className="input-field" placeholder="Complete project report" value={formData.title || ""} onChange={e => updateFormData("title", e.target.value)} />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course</label>
//                   <input type="text" className="input-field" placeholder="Algorithms" value={formData.course || ""} onChange={e => updateFormData("course", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Priority</label>
//                   <select className="input-field" value={formData.priority || "medium"} onChange={e => updateFormData("priority", e.target.value)}>
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                     <option value="urgent">Urgent</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Due Date</label>
//                   <input type="date" className="input-field" value={formData.dueDate || ""} onChange={e => updateFormData("dueDate", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Est. Hours</label>
//                   <input type="number" className="input-field" placeholder="3" value={formData.estimatedHours || ""} onChange={e => updateFormData("estimatedHours", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Subtasks</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="subtaskInput" className="input-field flex-1" placeholder="Add a subtask" />
//                   <button onClick={() => {
//                     const input = document.getElementById("subtaskInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("subtasks", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="space-y-1">
//                   {(formData.subtasks || []).map((subtask: string, idx: number) => (
//                     <div key={idx} className="flex items-center gap-2 p-1 rounded" style={{ background: "var(--bg-elevated)" }}>
//                       <CheckCircle size={12} style={{ color: "var(--text-muted)" }} />
//                       <span className="text-sm flex-1">{subtask}</span>
//                       <button onClick={() => removeArrayItem("subtasks", idx)}><X size={12} /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Course Form */}
//           {formType === "course" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course Name *</label>
//                   <input type="text" className="input-field" placeholder="Algorithms & Data Structures" value={formData.name || ""} onChange={e => updateFormData("name", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course Code</label>
//                   <input type="text" className="input-field" placeholder="INF301" value={formData.code || ""} onChange={e => updateFormData("code", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Credits</label>
//                   <input type="number" className="input-field" placeholder="6" value={formData.credits || ""} onChange={e => updateFormData("credits", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Coefficient</label>
//                   <input type="number" className="input-field" placeholder="3" value={formData.coefficient || ""} onChange={e => updateFormData("coefficient", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Professor</label>
//                   <input type="text" className="input-field" placeholder="Dr. Khelil" value={formData.professor || ""} onChange={e => updateFormData("professor", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Schedule</label>
//                   <input type="text" className="input-field" placeholder="Monday 8:00-9:30" value={formData.schedule || ""} onChange={e => updateFormData("schedule", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Topics Covered</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="courseTopicInput" className="input-field flex-1" placeholder="Add a topic" />
//                   <button onClick={() => {
//                     const input = document.getElementById("courseTopicInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("topics", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {(formData.topics || []).map((topic: string, idx: number) => (
//                     <span key={idx} className="tag px-2 py-1" style={{ background: "var(--bg-elevated)" }}>
//                       {topic}
//                       <button onClick={() => removeArrayItem("topics", idx)}><X size={12} /></button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* TD Form */}
//           {formType === "td" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course *</label>
//                   <input type="text" className="input-field" placeholder="Discrete Mathematics" value={formData.course || ""} onChange={e => updateFormData("course", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>TD Number</label>
//                   <input type="text" className="input-field" placeholder="TD 3" value={formData.tdNumber || ""} onChange={e => updateFormData("tdNumber", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Date</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => updateFormData("date", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Time</label>
//                   <input type="time" className="input-field" value={formData.time || ""} onChange={e => updateFormData("time", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Room</label>
//                   <input type="text" className="input-field" placeholder="Salle 14" value={formData.room || ""} onChange={e => updateFormData("room", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Professor</label>
//                   <input type="text" className="input-field" placeholder="Dr. Zeraoulia" value={formData.professor || ""} onChange={e => updateFormData("professor", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Exercises to Cover</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="exerciseInput" className="input-field flex-1" placeholder="Add an exercise" />
//                   <button onClick={() => {
//                     const input = document.getElementById("exerciseInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("exercises", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="space-y-1">
//                   {(formData.exercises || []).map((ex: string, idx: number) => (
//                     <div key={idx} className="flex items-center gap-2 p-1 rounded" style={{ background: "var(--bg-elevated)" }}>
//                       <span className="text-sm flex-1">{ex}</span>
//                       <button onClick={() => removeArrayItem("exercises", idx)}><X size={12} /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* TP Form */}
//           {formType === "tp" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course *</label>
//                   <input type="text" className="input-field" placeholder="Object-Oriented Programming" value={formData.course || ""} onChange={e => updateFormData("course", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>TP Number</label>
//                   <input type="text" className="input-field" placeholder="TP 2" value={formData.tpNumber || ""} onChange={e => updateFormData("tpNumber", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Date</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => updateFormData("date", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Time</label>
//                   <input type="time" className="input-field" value={formData.time || ""} onChange={e => updateFormData("time", e.target.value)} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Lab Room</label>
//                   <input type="text" className="input-field" placeholder="Salle TP 2" value={formData.labRoom || ""} onChange={e => updateFormData("labRoom", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Supervisor</label>
//                   <input type="text" className="input-field" placeholder="Dr. Merzougui" value={formData.supervisor || ""} onChange={e => updateFormData("supervisor", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Tasks to Complete</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="tpTaskInput" className="input-field flex-1" placeholder="Add a task" />
//                   <button onClick={() => {
//                     const input = document.getElementById("tpTaskInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("tasks", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="space-y-1">
//                   {(formData.tasks || []).map((task: string, idx: number) => (
//                     <div key={idx} className="flex items-center gap-2 p-1 rounded" style={{ background: "var(--bg-elevated)" }}>
//                       <CheckCircle size={12} style={{ color: "var(--text-muted)" }} />
//                       <span className="text-sm flex-1">{task}</span>
//                       <button onClick={() => removeArrayItem("tasks", idx)}><X size={12} /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Deadline Form */}
//           {formType === "deadline" && (
//             <>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Project/Assignment Title *</label>
//                 <input type="text" className="input-field" placeholder="Final Project Submission" value={formData.title || ""} onChange={e => updateFormData("title", e.target.value)} />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course</label>
//                   <input type="text" className="input-field" placeholder="Database Systems" value={formData.course || ""} onChange={e => updateFormData("course", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Type</label>
//                   <select className="input-field" value={formData.type || "project"} onChange={e => updateFormData("type", e.target.value)}>
//                     <option value="project">Project</option>
//                     <option value="assignment">Assignment</option>
//                     <option value="homework">Homework</option>
//                     <option value="presentation">Presentation</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Due Date</label>
//                   <input type="date" className="input-field" value={formData.dueDate || ""} onChange={e => updateFormData("dueDate", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Time</label>
//                   <input type="time" className="input-field" value={formData.time || "23:59"} onChange={e => updateFormData("time", e.target.value)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Requirements</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="reqInput" className="input-field flex-1" placeholder="Add a requirement" />
//                   <button onClick={() => {
//                     const input = document.getElementById("reqInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("requirements", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="space-y-1">
//                   {(formData.requirements || []).map((req: string, idx: number) => (
//                     <div key={idx} className="flex items-center gap-2 p-1 rounded" style={{ background: "var(--bg-elevated)" }}>
//                       <AlertCircle size={12} style={{ color: "var(--text-muted)" }} />
//                       <span className="text-sm flex-1">{req}</span>
//                       <button onClick={() => removeArrayItem("requirements", idx)}><X size={12} /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Preferences Form */}
//           {formType === "preference" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Preferred Study Time</label>
//                   <select className="input-field" value={formData.studyTime || "evening"} onChange={e => updateFormData("studyTime", e.target.value)}>
//                     <option value="morning">🌅 Morning (6 AM - 12 PM)</option>
//                     <option value="afternoon">☀️ Afternoon (12 PM - 5 PM)</option>
//                     <option value="evening">🌙 Evening (5 PM - 10 PM)</option>
//                     <option value="night">🦉 Night (10 PM - 2 AM)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Peak Productivity Hours</label>
//                   <select className="input-field" value={formData.peakHours || "evening"} onChange={e => updateFormData("peakHours", e.target.value)}>
//                     <option value="morning">Morning</option>
//                     <option value="afternoon">Afternoon</option>
//                     <option value="evening">Evening</option>
//                     <option value="night">Night</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Break Interval (minutes)</label>
//                   <input type="number" className="input-field" placeholder="25" value={formData.breakInterval || ""} onChange={e => updateFormData("breakInterval", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Study Environment</label>
//                   <select className="input-field" value={formData.environment || "quiet"} onChange={e => updateFormData("environment", e.target.value)}>
//                     <option value="quiet">🤫 Quiet (Library/Study room)</option>
//                     <option value="music">🎵 With music</option>
//                     <option value="coffee">☕ Coffee shop</option>
//                     <option value="home">🏠 Home</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Study Goals</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" id="goalInput" className="input-field flex-1" placeholder="Add a goal" />
//                   <button onClick={() => {
//                     const input = document.getElementById("goalInput") as HTMLInputElement;
//                     if (input.value) addArrayItem("goals", input.value);
//                     input.value = "";
//                   }} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="space-y-1">
//                   {(formData.goals || []).map((goal: string, idx: number) => (
//                     <div key={idx} className="flex items-center gap-2 p-1 rounded" style={{ background: "var(--bg-elevated)" }}>
//                       <Target size={12} style={{ color: "var(--primary-main)" }} />
//                       <span className="text-sm flex-1">{goal}</span>
//                       <button onClick={() => removeArrayItem("goals", idx)}><X size={12} /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 p-5 border-t flex gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
//           <button onClick={() => setShowStructuredForm(false)} className="flex-1 btn-ghost">
//             Cancel
//           </button>
//           <button onClick={handleStructuredSubmit} className="flex-1 btn-primary flex items-center justify-center gap-2">
//             <CheckCircle size={16} />
//             Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>
//       {/* History panel */}
//       <div
//         className="hidden xl:flex flex-col flex-shrink-0"
//         style={{
//           width: "220px",
//           borderRight: "1px solid var(--border-subtle)",
//           background: "var(--bg-secondary)",
//         }}
//       >
//         <div className="px-3 py-4 space-y-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
//           <button
//             className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
//             onClick={() => setMessages([createWelcomeMsg()])}
//           >
//             <Plus size={13} /> New Chat
//           </button>
//           <button
//             onClick={() => setShowStructuredForm(true)}
//             className="btn-secondary w-full flex items-center justify-center gap-2 text-xs"
//             style={{ background: "linear-gradient(135deg, var(--secondary-main), var(--secondary-600))" }}
//           >
//             <Plus size={13} /> Add Exam/Task
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-2 py-3">
//           <div className="label px-2 mb-2">Recent</div>
//           {sessions.map(s => (
//             <button
//               key={s.id}
//               className="w-full text-left px-2.5 py-2.5 rounded-lg mb-0.5 transition-colors"
//               style={{ color: "var(--text-secondary)" }}
//               onMouseEnter={e => {
//                 (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget as HTMLElement).style.background = "transparent";
//               }}
//             >
//               <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
//                 {s.title}
//               </div>
//               <div className="flex items-center gap-1 mt-0.5">
//                 <Clock size={10} style={{ color: "var(--text-muted)" }} />
//                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//                   {formatRelativeTime(s.timestamp)}
//                 </span>
//                 <Hash size={10} style={{ color: "var(--text-muted)", marginLeft: 2 }} />
//                 <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//                   {s.messageCount}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//         {/* Header */}
//         <div
//           className="flex items-center justify-between px-5 py-3 flex-shrink-0"
//           style={{
//             borderBottom: "1px solid var(--border-subtle)",
//             background: "var(--bg-secondary)",
//           }}
//         >
//           <div className="flex items-center gap-3">
//             <div
//               className="w-7 h-7 rounded-full flex items-center justify-center"
//               style={{ background: "var(--primary-glow)", border: "1px solid rgba(16,185,129,0.3)" }}
//             >
//               <Sparkles size={13} style={{ color: "var(--primary-main)" }} />
//             </div>
//             <div>
//               <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
//                 AI Academic Assistant
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
//                 <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Online · n8n powered</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowStructuredForm(true)}
//               className="btn-secondary text-xs py-1.5 flex items-center gap-1"
//             >
//               <Plus size={13} /> Add Exam/Task
//             </button>
//             <span className="tag text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
//               Session · {messages.length - 1} msgs
//             </span>
//             <button
//               onClick={() => setMessages([createWelcomeMsg()])}
//               className="btn-ghost text-xs py-1.5"
//             >
//               <Plus size={13} className="mr-1 inline" /> New
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="chat-messages flex-1">
//           {messages.map((msg, i) => (
//             <div key={msg.id}>
//               <MessageBubble message={msg} />
//               {msg.role === "assistant" && i === messages.length - 1 && lastActions.length > 0 && (
//                 <SuggestedActions actions={lastActions} onAction={sendMessage} />
//               )}
//             </div>
//           ))}
//           {isTyping && <TypingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Quick prompts */}
//         {messages.length === 1 && (
//           <div className="px-5 pb-3 flex flex-wrap gap-2">
//             <button
//               onClick={() => setShowStructuredForm(true)}
//               className="tag text-xs py-1.5 px-3 rounded-full transition-all duration-150 cursor-pointer"
//               style={{
//                 background: "var(--primary-glow)",
//                 border: "1px solid rgba(16,185,129,0.3)",
//                 color: "var(--primary-main)",
//               }}
//             >
//               <Plus size={12} className="mr-1" /> Add Exam/Deadline
//             </button>
//             {quickPrompts.map(p => (
//               <button
//                 key={p.value}
//                 onClick={() => handleQuickPrompt(p.value)}
//                 className="tag text-xs py-1.5 px-3 rounded-full transition-all duration-150 cursor-pointer"
//                 style={{
//                   background: "var(--bg-elevated)",
//                   border: "1px solid var(--border-medium)",
//                   color: "var(--text-secondary)",
//                 }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = "var(--primary-main)";
//                   (e.currentTarget as HTMLElement).style.color = "var(--primary-main)";
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
//                   (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
//                 }}
//               >
//                 {p.label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Attachments preview */}
//         {attachments.length > 0 && (
//           <div className="px-4 pt-3 flex flex-wrap gap-2">
//             {attachments.map(att => (
//               <div
//                 key={att.id}
//                 className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
//                 style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}
//               >
//                 {att.type === "image" && att.preview ? (
//                   <div className="relative w-8 h-8 rounded overflow-hidden">
//                     <img src={att.preview} alt={att.name} className="w-full h-full object-cover" />
//                   </div>
//                 ) : att.type === "pdf" ? (
//                   <FileText size={16} style={{ color: "var(--error)" }} />
//                 ) : (
//                   <Paperclip size={14} style={{ color: "var(--text-muted)" }} />
//                 )}
//                 <div className="max-w-[150px]">
//                   <div className="text-xs truncate" style={{ color: "var(--text-primary)" }}>
//                     {att.name}
//                   </div>
//                   <div className="text-xs" style={{ color: "var(--text-muted)" }}>
//                     {formatFileSize(att.size)}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeAttachment(att.id)}
//                   className="p-0.5 rounded hover:bg-red-500/20 transition-colors"
//                 >
//                   <X size={12} style={{ color: "var(--text-muted)" }} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Input area */}
//         <div
//           className="px-4 py-3 flex-shrink-0"
//           style={{
//             borderTop: "1px solid var(--border-subtle)",
//             background: "var(--bg-secondary)",
//           }}
//         >
//           <div
//             className="flex items-end gap-2 rounded-xl p-2"
//             style={{
//               background: "var(--bg-elevated)",
//               border: "1px solid var(--border-medium)",
//             }}
//           >
//             {/* Attachment button */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
//                 className="p-2 rounded-lg transition-colors hover:bg-white/5"
//                 style={{ color: "var(--text-muted)" }}
//                 title="Attach file"
//               >
//                 <Paperclip size={18} />
//               </button>
              
//               {showAttachmentMenu && (
//                 <>
//                   <div className="fixed inset-0 z-40" onClick={() => setShowAttachmentMenu(false)} />
//                   <div
//                     className="absolute bottom-full left-0 mb-2 w-48 rounded-lg shadow-lg overflow-hidden z-50"
//                     style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}
//                   >
//                     <button
//                       onClick={() => imageInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <Image size={16} /> Upload Image
//                     </button>
//                     <button
//                       onClick={() => pdfInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <FileText size={16} /> Upload PDF
//                     </button>
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       <Upload size={16} /> Upload Document
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Quick Add Buttons */}
//             <button
//               onClick={() => {
//                 setFormType("exam");
//                 setFormData({});
//                 setShowStructuredForm(true);
//               }}
//               className="p-2 rounded-lg transition-colors hover:bg-white/5"
//               style={{ color: "var(--text-muted)" }}
//               title="Add Exam"
//             >
//               <Calendar size={18} />
//             </button>

//             <button
//               onClick={() => {
//                 setFormType("task");
//                 setFormData({});
//                 setShowStructuredForm(true);
//               }}
//               className="p-2 rounded-lg transition-colors hover:bg-white/5"
//               style={{ color: "var(--text-muted)" }}
//               title="Add Task"
//             >
//               <Target size={18} />
//             </button>

//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask me anything... or use the buttons above to add exams, tasks, and courses"
//               rows={1}
//               className="flex-1 resize-none bg-transparent text-sm py-2 px-1 outline-none"
//               style={{
//                 color: "var(--text-primary)",
//                 maxHeight: "120px",
//                 minHeight: "36px",
//                 lineHeight: "1.5",
//                 fontFamily: "'Inter', sans-serif",
//               }}
//               onInput={e => {
//                 const t = e.currentTarget;
//                 t.style.height = "auto";
//                 t.style.height = Math.min(t.scrollHeight, 120) + "px";
//               }}
//             />

//             {/* Voice input button */}
//             <button
//               onClick={startVoiceRecording}
//               className={`p-2 rounded-lg transition-all ${isRecording ? "animate-pulse" : ""}`}
//               style={{ 
//                 color: isRecording ? "var(--error)" : "var(--text-muted)",
//                 background: isRecording ? "rgba(239,68,68,0.1)" : "transparent"
//               }}
//               title="Voice input"
//             >
//               <Mic size={18} />
//             </button>

//             {/* Send button */}
//             <button
//               onClick={() => sendMessage(input)}
//               disabled={(!input.trim() && attachments.length === 0) || isTyping}
//               className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
//               style={{
//                 background: (input.trim() || attachments.length > 0) && !isTyping ? "var(--primary-main)" : "var(--bg-card)",
//                 color: (input.trim() || attachments.length > 0) && !isTyping ? "white" : "var(--text-muted)",
//                 cursor: (input.trim() || attachments.length > 0) && !isTyping ? "pointer" : "not-allowed",
//               }}
//             >
//               <Send size={15} strokeWidth={2.5} />
//             </button>
//           </div>
          
//           {/* Hidden file inputs */}
//           <input
//             ref={imageInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "image")}
//           />
//           <input
//             ref={pdfInputRef}
//             type="file"
//             accept=".pdf"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "pdf")}
//           />
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".doc,.docx,.txt,.md,.json"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFileSelect(e, "document")}
//           />

//           <div className="text-center mt-2" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
//             💡 Use the 📅 and 🎯 buttons to add exams, tasks, courses, and preferences
//           </div>
//         </div>
//       </div>

//       {/* Structured Form Modal */}
//       {showStructuredForm && <StructuredForm />}
//     </div>
//   );
// }
// app/chat/page.tsx
// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { 
//   Send, Plus, Sparkles, Clock, Hash, Paperclip, Image, FileText, 
//   X, Upload, Mic, Calendar, BookOpen, Target, Clock as ClockIcon,
//   Brain, Zap, CheckCircle, AlertCircle
// } from "lucide-react";
// import MessageBubble, { TypingIndicator } from "@/components/chat/MessageBubble";
// import SuggestedActions from "@/components/chat/SuggestedActions";
// import type { ChatMessage, ConversationSession } from "@/lib/types";
// import {
//   getMockResponse, generateSessionId, formatRelativeTime,
// } from "@/lib/api";
// import {
//   mockConversations, quickPrompts, welcomeMessage,
// } from "@/lib/mockData";

// interface Attachment {
//   id: string;
//   file: File;
//   type: "image" | "pdf" | "document" | "other";
//   preview?: string;
//   name: string;
//   size: number;
// }

// function createWelcomeMsg(): ChatMessage {
//   return {
//     id: "welcome",
//     role: "assistant",
//     content: welcomeMessage,
//     timestamp: new Date(),
//     intent: "general",
//   };
// }

// export default function ChatPage() {
//   const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMsg()]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [sessionId] = useState(generateSessionId);
//   const [lastActions, setLastActions] = useState<Array<{ label: string; action: string }>>([]);
//   const [sessions] = useState<ConversationSession[]>(mockConversations);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [showStructuredForm, setShowStructuredForm] = useState(false);
//   const [formType, setFormType] = useState<"exam" | "task" | "course" | "td" | "tp" | "deadline" | "preference">("course");
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [tempTopic, setTempTopic] = useState("");
//   const [tempSubtask, setTempSubtask] = useState("");
//   const [tempExercise, setTempExercise] = useState("");
//   const [tempTask, setTempTask] = useState("");
//   const [tempRequirement, setTempRequirement] = useState("");
//   const [tempGoal, setTempGoal] = useState("");
//   const [tempResource, setTempResource] = useState("");

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const pdfInputRef = useRef<HTMLInputElement>(null);
//   const courseFileInputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

//   const handleCourseFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const newAttachments: Attachment[] = [];

//     files.forEach(file => {
//       if (file.size > 20 * 1024 * 1024) {
//         alert(`File ${file.name} is too large. Maximum size is 20MB.`);
//         return;
//       }

//       let attachmentType: "image" | "pdf" | "document" | "other" = "other";
//       let preview: string | undefined;

//       if (file.type.startsWith("image/")) {
//         attachmentType = "image";
//         preview = URL.createObjectURL(file);
//       } else if (file.type === "application/pdf") {
//         attachmentType = "pdf";
//       } else if (file.type.includes("document") || file.type.includes("presentation")) {
//         attachmentType = "document";
//       }

//       newAttachments.push({
//         id: `course_att_${Date.now()}_${Math.random()}`,
//         file,
//         type: attachmentType,
//         preview,
//         name: file.name,
//         size: file.size,
//       });
//     });

//     setCourseAttachments(prev => [...prev, ...newAttachments]);
//   };

//   const removeCourseAttachment = (id: string) => {
//     setCourseAttachments(prev => {
//       const attachment = prev.find(a => a.id === id);
//       if (attachment?.preview) {
//         URL.revokeObjectURL(attachment.preview);
//       }
//       return prev.filter(a => a.id !== id);
//     });
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf" | "document") => {
//     const files = Array.from(e.target.files || []);
//     const newAttachments: Attachment[] = [];

//     files.forEach(file => {
//       if (file.size > 10 * 1024 * 1024) {
//         alert(`File ${file.name} is too large. Maximum size is 10MB.`);
//         return;
//       }

//       let attachmentType: "image" | "pdf" | "document" | "other" = "other";
//       let preview: string | undefined;

//       if (type === "image" || file.type.startsWith("image/")) {
//         attachmentType = "image";
//         preview = URL.createObjectURL(file);
//       } else if (file.type === "application/pdf") {
//         attachmentType = "pdf";
//       } else if (file.type.includes("document") || file.type.includes("text")) {
//         attachmentType = "document";
//       }

//       newAttachments.push({
//         id: `att_${Date.now()}_${Math.random()}`,
//         file,
//         type: attachmentType,
//         preview,
//         name: file.name,
//         size: file.size,
//       });
//     });

//     setAttachments(prev => [...prev, ...newAttachments]);
//     setShowAttachmentMenu(false);
//     inputRef.current?.focus();
//   };

//   const removeAttachment = (id: string) => {
//     setAttachments(prev => {
//       const attachment = prev.find(a => a.id === id);
//       if (attachment?.preview) {
//         URL.revokeObjectURL(attachment.preview);
//       }
//       return prev.filter(a => a.id !== id);
//     });
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   const addArrayItem = (key: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
//     if (!value.trim()) return;
//     setFormData(prev => ({
//       ...prev,
//       [key]: [...(prev[key] || []), value.trim()]
//     }));
//     setter("");
//   };

//   const removeArrayItem = (key: string, index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: prev[key].filter((_: any, i: number) => i !== index)
//     }));
//   };

//   const handleStructuredSubmit = () => {
//     let message = "";
    
//     switch (formType) {
//       case "exam":
//         message = `📝 **Exam Added to Schedule**\n\n**Course:** ${formData.course || "Not specified"}\n**Exam Type:** ${formData.examType || "Exam"}\n**Date:** ${formData.date || "TBA"}\n**Time:** ${formData.time || "TBA"}\n**Room:** ${formData.room || "TBA"}\n**Duration:** ${formData.duration || "N/A"} minutes\n\n**Topics to cover:**\n${formData.topics?.map((t: string) => `- ${t}`).join("\n") || "- Not specified"}\n\nI've added this exam to your schedule.`;
//         break;
        
//       case "task":
//         message = `✅ **Task Created**\n\n**Task:** ${formData.title || "Untitled Task"}\n**Course:** ${formData.course || "Not specified"}\n**Priority:** ${formData.priority || "Medium"}\n**Due Date:** ${formData.dueDate || "Not set"}\n**Estimated Hours:** ${formData.estimatedHours || 0}h\n\n**Subtasks:**\n${formData.subtasks?.map((s: string) => `- ${s}`).join("\n") || "- No subtasks"}\n\nI've added this to your planner.`;
//         break;
        
//       case "course":
//         const fileList = courseAttachments.map(f => `- ${f.name}`).join("\n");
//         message = `📚 **Course Added**\n\n**Course Name:** ${formData.name || "Unnamed Course"}\n**Course Code:** ${formData.code || "N/A"}\n**Credits:** ${formData.credits || "N/A"}\n**Coefficient:** ${formData.coefficient || "N/A"}\n**Professor:** ${formData.professor || "TBA"}\n**Schedule:** ${formData.schedule || "TBA"}\n\n**Topics covered:**\n${formData.topics?.map((t: string) => `- ${t}`).join("\n") || "- No topics specified"}\n\n**Uploaded Materials:**\n${fileList || "- No files uploaded"}\n\nI've added this course to your curriculum.`;
//         setCourseAttachments([]);
//         break;
        
//       case "td":
//         message = `📖 **TD Session Added**\n\n**Course:** ${formData.course || "Not specified"}\n**TD Number:** ${formData.tdNumber || "N/A"}\n**Date:** ${formData.date || "TBA"}\n**Time:** ${formData.time || "TBA"}\n**Room:** ${formData.room || "TBA"}\n**Professor:** ${formData.professor || "TBA"}\n\n**Exercises to cover:**\n${formData.exercises?.map((e: string) => `- ${e}`).join("\n") || "- Not specified"}\n\nI've added this TD session to your schedule.`;
//         break;
        
//       case "tp":
//         message = `🔬 **TP Session Added**\n\n**Course:** ${formData.course || "Not specified"}\n**TP Number:** ${formData.tpNumber || "N/A"}\n**Date:** ${formData.date || "TBA"}\n**Time:** ${formData.time || "TBA"}\n**Lab Room:** ${formData.labRoom || "TBA"}\n**Supervisor:** ${formData.supervisor || "TBA"}\n\n**Tasks to complete:**\n${formData.tasks?.map((t: string) => `- ${t}`).join("\n") || "- Not specified"}\n\nDon't forget to prepare the required materials!`;
//         break;
        
//       case "deadline":
//         message = `⏰ **Deadline Added**\n\n**Project/Assignment:** ${formData.title || "Untitled"}\n**Course:** ${formData.course || "Not specified"}\n**Due Date:** ${formData.dueDate || "Not set"}\n**Time:** ${formData.time || "23:59"}\n**Type:** ${formData.type || "Assignment"}\n\n**Requirements:**\n${formData.requirements?.map((r: string) => `- ${r}`).join("\n") || "- Not specified"}\n\nI'll remind you before this deadline!`;
//         break;
        
//       case "preference":
//         message = `⚙️ **Study Preferences Updated**\n\n**Study Time:** ${formData.studyTime || "Not set"}\n**Productivity Peak:** ${formData.peakHours || "Not set"}\n**Break Interval:** Every ${formData.breakInterval || "N/A"} minutes\n**Preferred Study Environment:** ${formData.environment || "Not set"}\n\n**Goals:**\n${formData.goals?.map((g: string) => `- ${g}`).join("\n") || "- No goals set"}\n\nI'll tailor my recommendations based on these preferences!`;
//         break;
//     }

//     const assistantMsg: ChatMessage = {
//       id: `a_${Date.now()}`,
//       role: "assistant",
//       content: message,
//       timestamp: new Date(),
//       intent: "plan",
//     };

//     setMessages(prev => [...prev, assistantMsg]);
//     setShowStructuredForm(false);
//     setFormData({});
//     setTimeout(scrollToBottom, 100);
//   };

//   const sendMessage = useCallback(async (text: string) => {
//     const trimmed = text.trim();
//     if ((!trimmed && attachments.length === 0) || isTyping) return;

//     const userMsg: ChatMessage = {
//       id: `u_${Date.now()}`,
//       role: "user",
//       content: trimmed || (attachments.length > 0 ? `📎 Sent ${attachments.length} file(s)` : ""),
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);
//     setLastActions([]);

//     await new Promise(r => setTimeout(r, 900 + Math.random() * 800));

//     let responseText = "";
//     if (attachments.length > 0) {
//       const fileDescriptions = attachments.map(a => {
//         if (a.type === "image") return `an image "${a.name}"`;
//         if (a.type === "pdf") return `a PDF document "${a.name}"`;
//         return `a file "${a.name}"`;
//       }).join(", ");
      
//       responseText = `I've received ${fileDescriptions}. I'm analyzing the content. `;
//     } else {
//       const response = getMockResponse(trimmed);
//       responseText = response.reply;
//     }

//     const assistantMsg: ChatMessage = {
//       id: `a_${Date.now()}`,
//       role: "assistant",
//       content: responseText,
//       timestamp: new Date(),
//       intent: "general",
//     };

//     setIsTyping(false);
//     setMessages(prev => [...prev, assistantMsg]);
//     setAttachments([]);
//   }, [isTyping, attachments]);

//   const startVoiceRecording = () => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
//       const recognition = new SpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.continuous = false;
//       recognition.interimResults = false;

//       recognition.onstart = () => setIsRecording(true);
//       recognition.onresult = (event: any) => {
//         setInput(event.results[0][0].transcript);
//         setIsRecording(false);
//       };
//       recognition.onerror = () => {
//         setIsRecording(false);
//         alert("Voice recognition failed. Please try again.");
//       };
//       recognition.onend = () => setIsRecording(false);
//       recognition.start();
//     } else {
//       alert("Voice recognition is not supported in your browser.");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(input);
//     }
//   };

//   const handleQuickPrompt = (value: string) => {
//     setInput(value);
//     inputRef.current?.focus();
//   };

//   const StructuredForm = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
//       <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
//         <div className="sticky top-0 p-5 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
//               Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
//             </h2>
//             <button onClick={() => setShowStructuredForm(false)} className="p-1 rounded-lg hover:bg-white/10">
//               <X size={20} style={{ color: "var(--text-muted)" }} />
//             </button>
//           </div>
//         </div>

//         <div className="p-5 space-y-4">
//           {/* Type Selector */}
//           <div>
//             <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-secondary)" }}>
//               What would you like to add?
//             </label>
//             <div className="flex gap-2 flex-wrap">
//               {[
//                 { type: "course", label: "📚 Course" },
//                 { type: "exam", label: "📝 Exam" },
//                 { type: "task", label: "✅ Task" },
//                 { type: "td", label: "📖 TD" },
//                 { type: "tp", label: "🔬 TP" },
//                 { type: "deadline", label: "⏰ Deadline" },
//                 { type: "preference", label: "⚙️ Preferences" },
//               ].map(item => (
//                 <button
//                   key={item.type}
//                   onClick={() => {
//                     setFormType(item.type as any);
//                     setFormData({});
//                   }}
//                   className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
//                     formType === item.type ? "bg-primary-main text-black" : ""
//                   }`}
//                   style={formType === item.type ? {} : { background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Course Form */}
//           {formType === "course" && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course Name *</label>
//                   <input type="text" className="input-field" placeholder="Algorithms & Data Structures" 
//                     value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Course Code</label>
//                   <input type="text" className="input-field" placeholder="INF301" 
//                     value={formData.code || ""} onChange={e => setFormData({...formData, code: e.target.value})} />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Credits</label>
//                   <input type="number" className="input-field" placeholder="6" 
//                     value={formData.credits || ""} onChange={e => setFormData({...formData, credits: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Coefficient</label>
//                   <input type="number" className="input-field" placeholder="3" 
//                     value={formData.coefficient || ""} onChange={e => setFormData({...formData, coefficient: e.target.value})} />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Professor</label>
//                   <input type="text" className="input-field" placeholder="Dr. Khelil Nassim" 
//                     value={formData.professor || ""} onChange={e => setFormData({...formData, professor: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Schedule</label>
//                   <input type="text" className="input-field" placeholder="Monday 8:00-9:30" 
//                     value={formData.schedule || ""} onChange={e => setFormData({...formData, schedule: e.target.value})} />
//                 </div>
//               </div>
              
//               {/* File Upload */}
//               <div>
//                 <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-secondary)" }}>📁 Course Materials</label>
//                 <div className="border-2 border-dashed rounded-lg p-4 text-center"
//                   style={{ borderColor: "var(--border-medium)", background: "var(--bg-elevated)" }}>
//                   <input
//                     ref={courseFileInputRef}
//                     type="file"
//                     accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
//                     multiple
//                     className="hidden"
//                     onChange={handleCourseFileSelect}
//                   />
//                   <button onClick={() => courseFileInputRef.current?.click()} className="flex flex-col items-center gap-2 w-full">
//                     <Upload size={32} style={{ color: "var(--primary-main)" }} />
//                     <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Click to upload lecture slides, PDFs, notes</span>
//                     <span className="text-xs" style={{ color: "var(--text-muted)" }}>Supports: PDF, PowerPoint, Word, Images (max 20MB)</span>
//                   </button>
//                 </div>
                
//                 {courseAttachments.length > 0 && (
//                   <div className="mt-3 space-y-2">
//                     <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Uploaded ({courseAttachments.length} files):</div>
//                     {courseAttachments.map(att => (
//                       <div key={att.id} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
//                         <FileText size={20} style={{ color: "var(--primary-main)" }} />
//                         <div className="flex-1 min-w-0">
//                           <div className="text-sm truncate">{att.name}</div>
//                           <div className="text-xs text-muted">{formatFileSize(att.size)}</div>
//                         </div>
//                         <button onClick={() => removeCourseAttachment(att.id)} className="p-1 rounded hover:bg-red-500/20">
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               {/* Topics */}
//               <div>
//                 <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>Topics Covered</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="e.g., Sorting Algorithms" 
//                     value={tempTopic} onChange={e => setTempTopic(e.target.value)} />
//                   <button onClick={() => addArrayItem("topics", tempTopic, setTempTopic)} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {(formData.topics || []).map((topic: string, idx: number) => (
//                     <span key={idx} className="tag px-2 py-1" style={{ background: "var(--bg-elevated)" }}>
//                       {topic}
//                       <button onClick={() => removeArrayItem("topics", idx)} className="ml-1"><X size={12} /></button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Exam Form */}
//           {formType === "exam" && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Course Name</label>
//                   <input type="text" className="input-field" placeholder="Algorithms" value={formData.course || ""} onChange={e => setFormData({...formData, course: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Exam Type</label>
//                   <select className="input-field" value={formData.examType || "midterm"} onChange={e => setFormData({...formData, examType: e.target.value})}>
//                     <option value="midterm">Midterm</option><option value="final">Final</option><option value="quiz">Quiz</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Date</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Time</label>
//                   <input type="time" className="input-field" value={formData.time || ""} onChange={e => setFormData({...formData, time: e.target.value})} />
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Topics to Cover</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add a topic" value={tempTopic} onChange={e => setTempTopic(e.target.value)} />
//                   <button onClick={() => addArrayItem("topics", tempTopic, setTempTopic)} className="btn-primary px-3">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {(formData.topics || []).map((topic: string, idx: number) => (
//                     <span key={idx} className="tag px-2 py-1" style={{ background: "var(--bg-elevated)" }}>
//                       {topic}<button onClick={() => removeArrayItem("topics", idx)} className="ml-1"><X size={12} /></button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Task Form */}
//           {formType === "task" && (
//             <div className="space-y-4">
//               <div><label className="text-sm mb-1 block">Task Title</label>
//                 <input type="text" className="input-field" placeholder="Complete project" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Due Date</label>
//                   <input type="date" className="input-field" value={formData.dueDate || ""} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Priority</label>
//                   <select className="input-field" value={formData.priority || "medium"} onChange={e => setFormData({...formData, priority: e.target.value})}>
//                     <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
//                   </select>
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Subtasks</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add a subtask" value={tempSubtask} onChange={e => setTempSubtask(e.target.value)} />
//                   <button onClick={() => addArrayItem("subtasks", tempSubtask, setTempSubtask)} className="btn-primary px-3">Add</button>
//                 </div>
//                 {(formData.subtasks || []).map((subtask: string, idx: number) => (
//                   <div key={idx} className="flex items-center gap-2 p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
//                     <CheckCircle size={14} /><span className="flex-1">{subtask}</span>
//                     <button onClick={() => removeArrayItem("subtasks", idx)}><X size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* TD Form */}
//           {formType === "td" && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Course</label>
//                   <input type="text" className="input-field" placeholder="Mathematics" value={formData.course || ""} onChange={e => setFormData({...formData, course: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">TD Number</label>
//                   <input type="text" className="input-field" placeholder="TD 3" value={formData.tdNumber || ""} onChange={e => setFormData({...formData, tdNumber: e.target.value})} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Date</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Time</label>
//                   <input type="time" className="input-field" value={formData.time || ""} onChange={e => setFormData({...formData, time: e.target.value})} />
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Exercises</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add exercise" value={tempExercise} onChange={e => setTempExercise(e.target.value)} />
//                   <button onClick={() => addArrayItem("exercises", tempExercise, setTempExercise)} className="btn-primary px-3">Add</button>
//                 </div>
//                 {(formData.exercises || []).map((ex: string, idx: number) => (
//                   <div key={idx} className="flex items-center gap-2 p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
//                     <span className="flex-1">{ex}</span>
//                     <button onClick={() => removeArrayItem("exercises", idx)}><X size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* TP Form */}
//           {formType === "tp" && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Course</label>
//                   <input type="text" className="input-field" placeholder="Programming" value={formData.course || ""} onChange={e => setFormData({...formData, course: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">TP Number</label>
//                   <input type="text" className="input-field" placeholder="TP 2" value={formData.tpNumber || ""} onChange={e => setFormData({...formData, tpNumber: e.target.value})} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Date</label>
//                   <input type="date" className="input-field" value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Lab Room</label>
//                   <input type="text" className="input-field" placeholder="Lab 203" value={formData.labRoom || ""} onChange={e => setFormData({...formData, labRoom: e.target.value})} />
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Tasks</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add task" value={tempTask} onChange={e => setTempTask(e.target.value)} />
//                   <button onClick={() => addArrayItem("tasks", tempTask, setTempTask)} className="btn-primary px-3">Add</button>
//                 </div>
//                 {(formData.tasks || []).map((task: string, idx: number) => (
//                   <div key={idx} className="flex items-center gap-2 p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
//                     <span className="flex-1">{task}</span>
//                     <button onClick={() => removeArrayItem("tasks", idx)}><X size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Deadline Form */}
//           {formType === "deadline" && (
//             <div className="space-y-4">
//               <div><label className="text-sm mb-1 block">Project/Assignment Title</label>
//                 <input type="text" className="input-field" placeholder="Final Project" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Due Date</label>
//                   <input type="date" className="input-field" value={formData.dueDate || ""} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
//                 </div>
//                 <div><label className="text-sm mb-1 block">Time</label>
//                   <input type="time" className="input-field" value={formData.time || "23:59"} onChange={e => setFormData({...formData, time: e.target.value})} />
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Requirements</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add requirement" value={tempRequirement} onChange={e => setTempRequirement(e.target.value)} />
//                   <button onClick={() => addArrayItem("requirements", tempRequirement, setTempRequirement)} className="btn-primary px-3">Add</button>
//                 </div>
//                 {(formData.requirements || []).map((req: string, idx: number) => (
//                   <div key={idx} className="flex items-center gap-2 p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
//                     <AlertCircle size={14} /><span className="flex-1">{req}</span>
//                     <button onClick={() => removeArrayItem("requirements", idx)}><X size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Preferences Form */}
//           {formType === "preference" && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-sm mb-1 block">Study Time</label>
//                   <select className="input-field" value={formData.studyTime || "evening"} onChange={e => setFormData({...formData, studyTime: e.target.value})}>
//                     <option value="morning">Morning</option><option value="afternoon">Afternoon</option>
//                     <option value="evening">Evening</option><option value="night">Night</option>
//                   </select>
//                 </div>
//                 <div><label className="text-sm mb-1 block">Break Interval</label>
//                   <input type="number" className="input-field" placeholder="25" value={formData.breakInterval || ""} onChange={e => setFormData({...formData, breakInterval: e.target.value})} />
//                 </div>
//               </div>
//               <div><label className="text-sm mb-1 block">Goals</label>
//                 <div className="flex gap-2 mb-2">
//                   <input type="text" className="input-field flex-1" placeholder="Add a goal" value={tempGoal} onChange={e => setTempGoal(e.target.value)} />
//                   <button onClick={() => addArrayItem("goals", tempGoal, setTempGoal)} className="btn-primary px-3">Add</button>
//                 </div>
//                 {(formData.goals || []).map((goal: string, idx: number) => (
//                   <div key={idx} className="flex items-center gap-2 p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
//                     <Target size={14} /><span className="flex-1">{goal}</span>
//                     <button onClick={() => removeArrayItem("goals", idx)}><X size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="sticky bottom-0 p-5 border-t flex gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
//           <button onClick={() => setShowStructuredForm(false)} className="flex-1 btn-ghost">Cancel</button>
//           <button onClick={handleStructuredSubmit} className="flex-1 btn-primary">Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>
//       {/* History panel */}
//       <div className="hidden xl:flex flex-col flex-shrink-0" style={{ width: "220px", borderRight: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
//         <div className="px-3 py-4 space-y-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
//           <button className="btn-primary w-full flex items-center justify-center gap-2 text-xs" onClick={() => setMessages([createWelcomeMsg()])}>
//             <Plus size={13} /> New Chat
//           </button>
//           <button onClick={() => setShowStructuredForm(true)} className="btn-secondary w-full flex items-center justify-center gap-2 text-xs">
//             <Plus size={13} /> Add
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-2 py-3">
//           <div className="label px-2 mb-2">Recent</div>
//           {sessions.map(s => (
//             <button key={s.id} className="w-full text-left px-2.5 py-2.5 rounded-lg mb-0.5 transition-colors hover:bg-elevated">
//               <div className="text-xs font-medium truncate">{s.title}</div>
//               <div className="flex items-center gap-1 mt-0.5 text-muted text-[10px]">
//                 <Clock size={10} /> {formatRelativeTime(s.timestamp)} <Hash size={10} className="ml-2" /> {s.messageCount}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
//           <div className="flex items-center gap-3">
//             <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--primary-glow)" }}>
//               <Sparkles size={13} style={{ color: "var(--primary-main)" }} />
//             </div>
//             <div>
//               <div className="text-sm font-semibold">AI Academic Assistant</div>
//               <div className="flex items-center gap-1.5 text-muted text-[11px]"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online · n8n powered</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => setShowStructuredForm(true)} className="btn-secondary text-xs py-1.5"><Plus size={13} className="mr-1 inline" /> Add</button>
//             <button onClick={() => setMessages([createWelcomeMsg()])} className="btn-ghost text-xs py-1.5"><Plus size={13} className="mr-1 inline" /> New</button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="chat-messages flex-1">
//           {messages.map((msg, i) => (
//             <div key={msg.id}>
//               <MessageBubble message={msg} />
//               {msg.role === "assistant" && i === messages.length - 1 && lastActions.length > 0 && (
//                 <SuggestedActions actions={lastActions} onAction={sendMessage} />
//               )}
//             </div>
//           ))}
//           {isTyping && <TypingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Quick prompts */}
//         {messages.length === 1 && (
//           <div className="px-5 pb-3 flex flex-wrap gap-2">
//             <button onClick={() => setShowStructuredForm(true)} className="tag text-xs py-1.5 px-3 rounded-full" style={{ background: "var(--primary-glow)", color: "var(--primary-main)" }}>
//               <Plus size={12} className="mr-1" /> Add Course/Exam
//             </button>
//             {quickPrompts.slice(0, 3).map(p => (
//               <button key={p.value} onClick={() => handleQuickPrompt(p.value)} className="tag text-xs py-1.5 px-3 rounded-full" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}>
//                 {p.label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Input area */}
//         <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
//           <div className="flex items-end gap-2 rounded-xl p-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}>
//             <button onClick={() => setShowStructuredForm(true)} className="p-2 rounded-lg" style={{ color: "var(--text-muted)" }} title="Add via form">
//               <Plus size={18} />
//             </button>

//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask me anything... or click + to add courses, exams, tasks"
//               rows={1}
//               className="flex-1 resize-none bg-transparent text-sm py-2 px-1 outline-none"
//               style={{ color: "var(--text-primary)", maxHeight: "120px", minHeight: "36px" }}
//               onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px"; }}
//             />

//             <button onClick={startVoiceRecording} className={`p-2 rounded-lg transition-all ${isRecording ? "animate-pulse" : ""}`} style={{ color: isRecording ? "var(--error)" : "var(--text-muted)" }}>
//               <Mic size={18} />
//             </button>

//             <button onClick={() => sendMessage(input)} disabled={(!input.trim() && attachments.length === 0) || isTyping} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{
//               background: (input.trim() || attachments.length > 0) && !isTyping ? "var(--primary-main)" : "var(--bg-card)",
//               color: (input.trim() || attachments.length > 0) && !isTyping ? "white" : "var(--text-muted)",
//             }}>
//               <Send size={15} />
//             </button>
//           </div>
//           <div className="text-center mt-2 text-[10px] text-muted">💡 Click + to add courses, exams, tasks via structured forms</div>
//         </div>
//       </div>

//       {showStructuredForm && <StructuredForm />}
//     </div>
//   );
// }
// app/chat/page.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { 
  Send, Plus, Sparkles, Clock, Hash, Paperclip, Image, FileText, 
  X, Upload, Mic, Calendar, BookOpen, Target, Clock as ClockIcon,
  Brain, Zap, CheckCircle, AlertCircle
} from "lucide-react";
import MessageBubble, { TypingIndicator } from "@/components/chat/MessageBubble";
import SuggestedActions from "@/components/chat/SuggestedActions";
import type { ChatMessage, ConversationSession } from "@/lib/types";
import {
  getMockResponse, generateSessionId, formatRelativeTime,
} from "@/lib/api";
import {
  mockConversations, quickPrompts, welcomeMessage,
} from "@/lib/mockData";

interface Attachment {
  id: string;
  file: File;
  type: "image" | "pdf" | "document" | "other";
  preview?: string;
  name: string;
  size: number;
}

function createWelcomeMsg(): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: welcomeMessage,
    timestamp: new Date(),
    intent: "general",
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMsg()]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [lastActions, setLastActions] = useState<Array<{ label: string; action: string }>>([]);
  const [sessions] = useState<ConversationSession[]>(mockConversations);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showStructuredForm, setShowStructuredForm] = useState(false);
  const [formType, setFormType] = useState<"exam" | "task" | "course" | "td" | "tp" | "deadline" | "preference">("course");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Separate state for form inputs to prevent re-renders
  const [localFormData, setLocalFormData] = useState<Record<string, any>>({});
  
  // Update localFormData when formType changes
  useEffect(() => {
    setLocalFormData({});
    setCourseAttachments([]);
    setIsSubmitting(false);
  }, [formType]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const courseFileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // Handle input change without causing re-renders of the whole form
  const handleFormInputChange = (field: string, value: any) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: Attachment[] = [];

    files.forEach(file => {
      if (file.size > 20 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 20MB.`);
        return;
      }

      let attachmentType: "image" | "pdf" | "document" | "other" = "other";
      let preview: string | undefined;

      if (file.type.startsWith("image/")) {
        attachmentType = "image";
        preview = URL.createObjectURL(file);
      } else if (file.type === "application/pdf") {
        attachmentType = "pdf";
      } else if (file.type.includes("document") || file.type.includes("presentation")) {
        attachmentType = "document";
      }

      newAttachments.push({
        id: `course_att_${Date.now()}_${Math.random()}`,
        file,
        type: attachmentType,
        preview,
        name: file.name,
        size: file.size,
      });
    });

    setCourseAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeCourseAttachment = (id: string) => {
    setCourseAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf" | "document") => {
    const files = Array.from(e.target.files || []);
    const newAttachments: Attachment[] = [];

    files.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      let attachmentType: "image" | "pdf" | "document" | "other" = "other";
      let preview: string | undefined;

      if (type === "image" || file.type.startsWith("image/")) {
        attachmentType = "image";
        preview = URL.createObjectURL(file);
      } else if (file.type === "application/pdf") {
        attachmentType = "pdf";
      } else if (file.type.includes("document") || file.type.includes("text")) {
        attachmentType = "document";
      }

      newAttachments.push({
        id: `att_${Date.now()}_${Math.random()}`,
        file,
        type: attachmentType,
        preview,
        name: file.name,
        size: file.size,
      });
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    setShowAttachmentMenu(false);
    inputRef.current?.focus();
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if ((!trimmed && attachments.length === 0) || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: trimmed || (attachments.length > 0 ? `📎 Sent ${attachments.length} file(s)` : ""),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setLastActions([]);

    // Simulate API call (replace with actual n8n call when ready)
    await new Promise(r => setTimeout(r, 1000));
    
    const response = getMockResponse(trimmed || "file");
    const assistantMsg: ChatMessage = {
      id: `a_${Date.now()}`,
      role: "assistant",
      content: response.reply,
      timestamp: new Date(),
      intent: "general",
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
    setAttachments([]);
  }, [isTyping, attachments]);

  const handleStructuredSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual n8n call
    await new Promise(r => setTimeout(r, 1500));
    
    // Success message
    const successMessage = `✅ **Success!**\n\nYour ${formType} has been added successfully.\n\n${formType === "course" ? `Course "${localFormData.name}" has been saved to your curriculum.` : ""}`;
    
    const assistantMsg: ChatMessage = {
      id: `a_${Date.now()}`,
      role: "assistant",
      content: successMessage,
      timestamp: new Date(),
      intent: "plan",
    };
    
    setMessages(prev => [...prev, assistantMsg]);
    setShowStructuredForm(false);
    setLocalFormData({});
    setCourseAttachments([]);
    setIsSubmitting(false);
    setTimeout(scrollToBottom, 100);
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
        setIsRecording(false);
      };
      recognition.onerror = () => {
        setIsRecording(false);
        alert("Voice recognition failed. Please try again.");
      };
      recognition.onend = () => setIsRecording(false);
      recognition.start();
    } else {
      alert("Voice recognition is not supported in your browser.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleQuickPrompt = (value: string) => {
    setInput(value);
    inputRef.current?.focus();
  };

  // Structured Form Component - defined outside to prevent re-renders
  const StructuredFormModal = useMemo(() => {
    if (!showStructuredForm) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
          <div className="sticky top-0 p-5 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
              </h2>
              <button onClick={() => setShowStructuredForm(false)} className="p-1 rounded-lg hover:bg-white/10">
                <X size={20} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Type Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-secondary)" }}>
                What would you like to add?
              </label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { type: "course", label: "📚 Course" },
                  { type: "exam", label: "📝 Exam" },
                  { type: "task", label: "✅ Task" },
                  { type: "td", label: "📖 TD" },
                  { type: "tp", label: "🔬 TP" },
                  { type: "deadline", label: "⏰ Deadline" },
                  { type: "preference", label: "⚙️ Preferences" },
                ].map(item => (
                  <button
                    key={item.type}
                    onClick={() => {
                      setFormType(item.type as any);
                      setLocalFormData({});
                      setCourseAttachments([]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      formType === item.type ? "bg-primary-main text-black" : ""
                    }`}
                    style={formType === item.type ? {} : { background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Form */}
            {formType === "course" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-1 block">Course Name *</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Algorithms & Data Structures" 
                      value={localFormData.name || ""} 
                      onChange={(e) => handleFormInputChange("name", e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Course Code</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="INF301" 
                      value={localFormData.code || ""} 
                      onChange={(e) => handleFormInputChange("code", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-1 block">Credits</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      placeholder="6" 
                      value={localFormData.credits || ""} 
                      onChange={(e) => handleFormInputChange("credits", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Coefficient</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      placeholder="3" 
                      value={localFormData.coefficient || ""} 
                      onChange={(e) => handleFormInputChange("coefficient", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-1 block">Professor</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Dr. Khelil Nassim" 
                      value={localFormData.professor || ""} 
                      onChange={(e) => handleFormInputChange("professor", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Schedule</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Monday 8:00-9:30" 
                      value={localFormData.schedule || ""} 
                      onChange={(e) => handleFormInputChange("schedule", e.target.value)}
                    />
                  </div>
                </div>
                
                {/* File Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">📁 Course Materials</label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: "var(--border-medium)", background: "var(--bg-elevated)" }}>
                    <input
                      ref={courseFileInputRef}
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      onChange={handleCourseFileSelect}
                    />
                    <button onClick={() => courseFileInputRef.current?.click()} className="flex flex-col items-center gap-2 w-full">
                      <Upload size={32} style={{ color: "var(--primary-main)" }} />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Click to upload lecture slides, PDFs, notes</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Supports: PDF, PowerPoint, Word, Images (max 20MB)</span>
                    </button>
                  </div>
                  
                  {courseAttachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Uploaded ({courseAttachments.length} files):</div>
                      {courseAttachments.map(att => (
                        <div key={att.id} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
                          <FileText size={20} style={{ color: "var(--primary-main)" }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm truncate">{att.name}</div>
                            <div className="text-xs text-muted">{formatFileSize(att.size)}</div>
                          </div>
                          <button onClick={() => removeCourseAttachment(att.id)} className="p-1 rounded hover:bg-red-500/20">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Other forms placeholder */}
            {formType !== "course" && (
              <div className="text-center p-8" style={{ color: "var(--text-muted)" }}>
                <p>Form for {formType} - Coming soon</p>
                <p className="text-sm mt-2">This feature will be available in the next update.</p>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 p-5 border-t flex gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}>
            <button onClick={() => setShowStructuredForm(false)} className="flex-1 btn-ghost" disabled={isSubmitting}>
              Cancel
            </button>
            <button 
              onClick={handleStructuredSubmit} 
              className="flex-1 btn-primary flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>⏳ Saving...</>
              ) : (
                <>✅ Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }, [showStructuredForm, formType, localFormData, courseAttachments, isSubmitting]);

  return (
    <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>
      {/* History panel */}
      <div className="hidden xl:flex flex-col flex-shrink-0" style={{ width: "220px", borderRight: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div className="px-3 py-4 space-y-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <button className="btn-primary w-full flex items-center justify-center gap-2 text-xs" onClick={() => setMessages([createWelcomeMsg()])}>
            <Plus size={13} /> New Chat
          </button>
          <button onClick={() => setShowStructuredForm(true)} className="btn-secondary w-full flex items-center justify-center gap-2 text-xs">
            <Plus size={13} /> Add
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <div className="label px-2 mb-2">Recent</div>
          {sessions.map(s => (
            <button key={s.id} className="w-full text-left px-2.5 py-2.5 rounded-lg mb-0.5 transition-colors hover:bg-elevated">
              <div className="text-xs font-medium truncate">{s.title}</div>
              <div className="flex items-center gap-1 mt-0.5 text-muted text-[10px]">
                <Clock size={10} /> {formatRelativeTime(s.timestamp)} <Hash size={10} className="ml-2" /> {s.messageCount}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--primary-glow)" }}>
              <Sparkles size={13} style={{ color: "var(--primary-main)" }} />
            </div>
            <div>
              <div className="text-sm font-semibold">AI Academic Assistant</div>
              <div className="flex items-center gap-1.5 text-muted text-[11px]"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online · Ready</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowStructuredForm(true)} className="btn-secondary text-xs py-1.5"><Plus size={13} className="mr-1 inline" /> Add</button>
            <button onClick={() => setMessages([createWelcomeMsg()])} className="btn-ghost text-xs py-1.5"><Plus size={13} className="mr-1 inline" /> New</button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages flex-1">
          {messages.map((msg, i) => (
            <div key={msg.id}>
              <MessageBubble message={msg} />
              {msg.role === "assistant" && i === messages.length - 1 && lastActions.length > 0 && (
                <SuggestedActions actions={lastActions} onAction={sendMessage} />
              )}
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            <button onClick={() => setShowStructuredForm(true)} className="tag text-xs py-1.5 px-3 rounded-full" style={{ background: "var(--primary-glow)", color: "var(--primary-main)" }}>
              <Plus size={12} className="mr-1" /> Add Course/Exam
            </button>
            {quickPrompts.slice(0, 3).map(p => (
              <button key={p.value} onClick={() => handleQuickPrompt(p.value)} className="tag text-xs py-1.5 px-3 rounded-full" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}>
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
          <div className="flex items-end gap-2 rounded-xl p-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)" }}>
            <button onClick={() => setShowStructuredForm(true)} className="p-2 rounded-lg" style={{ color: "var(--text-muted)" }}>
              <Plus size={18} />
            </button>

            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything... or click + to add courses, exams, tasks"
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm py-2 px-1 outline-none"
              style={{ color: "var(--text-primary)", maxHeight: "120px", minHeight: "36px" }}
              onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px"; }}
            />

            <button onClick={startVoiceRecording} className={`p-2 rounded-lg transition-all ${isRecording ? "animate-pulse" : ""}`} style={{ color: isRecording ? "var(--error)" : "var(--text-muted)" }}>
              <Mic size={18} />
            </button>

            <button onClick={() => sendMessage(input)} disabled={(!input.trim() && attachments.length === 0) || isTyping} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{
              background: (input.trim() || attachments.length > 0) && !isTyping ? "var(--primary-main)" : "var(--bg-card)",
              color: (input.trim() || attachments.length > 0) && !isTyping ? "white" : "var(--text-muted)",
            }}>
              <Send size={15} />
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-muted">💡 Click + to add courses, exams, and tasks via structured forms</div>
        </div>
      </div>

      {StructuredFormModal}
    </div>
  );
}