"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, CheckCircle2, AlertCircle, RefreshCw, Trophy, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { getGeminiInterviewResponse, getGeminiInterviewReport } from "@/lib/actions/ai-interview";
import { toast } from "sonner";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface InterviewArenaProps {
  jobTitle?: string;
  company?: string;
  stage?: string;
  description?: string;
  onComplete?: (report: any) => void;
  onClose: () => void;
}

export default function InterviewArena({
  jobTitle = "Software Engineer",
  company = "Tech Corps",
  stage = "General",
  description,
  onComplete,
  onClose,
}: InterviewArenaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<{ score: number, gaps: string[], advice: string } | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const isVague = jobTitle.toLowerCase() === "engineer" || jobTitle.toLowerCase() === "developer" || jobTitle.length < 5;
    
    let greeting = "";
    if (isVague) {
      greeting = `To initialize for a generic role: "${jobTitle}". \n\nPlease elaborate clearly. What is your specific tech stack or position? (e.g., Senior MERN Stack Developer, Java Backend Engineer)`;
      setCurrentStep(-1);
    } else {
      greeting = `[HANDSHAKE SUCCESSFUL] Target: ${jobTitle} @ ${company}. \n\nI am your Technical Evaluator. Protocols initialized for ${stage} assessment. \n\nDRILL START: Define your primary tech stack and the most complex architectural challenge you've solved using it.`;
      setCurrentStep(0);
    }
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ role: "ai", content: greeting }]);
      setIsTyping(false);
    }, 1000);
  }, [jobTitle, company, stage]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isTyping || showReport) return;

    const newUserMessage: Message = { role: "user", content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsTyping(true);


    try {
      const response = await getGeminiInterviewResponse(
        [...messages, newUserMessage],
        { jobTitle, company, stage, description }
      );

      let aiResponse = response;
      const nextStep = currentStep + 1;


      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);


      if (currentStep === -1) {
        if (!response.toLowerCase().includes("rejected")) {
           setCurrentStep(1);
        }
      } else if (nextStep < totalSteps) {
        setCurrentStep(nextStep);
      } else {
        // Final Turn - Generate Report after AI gives its final reaction/acknowledgment
        setIsGeneratingReport(true);
        try {
          const report = await getGeminiInterviewReport([...messages, newUserMessage, { role: "ai", content: aiResponse }]);
          setReportData(report);
        } catch (err) {
          console.error("Report Generation Failed:", err);
        } finally {
          setIsGeneratingReport(false);
          setShowReport(true);
        }
      }
    } catch (error: any) {
      console.error("AI Bridge Error:", error.message);
      
      let fallbackMsg = "";
      if (error.message === "API_KEY_MISSING") {
        toast.info("Gemini Key Missing: Using Tactical Simulation Engine.");
        fallbackMsg = "[FALLBACK ACTIVE] Protcols initialized. Describe your tech stack and next architectural challenge.";
        setCurrentStep(1);
      } else if (error.message === "SAFETY_TRIGGERED") {
        toast.error("AI Safety Filter Triggered. Reverting to Simulation.");
        fallbackMsg = "[SAFETY OVERRIDE] Input violates neutrality protocols. Re-routing to localized technical simulation...";
        setCurrentStep(currentStep === -1 ? 0 : currentStep);
      } else if (error.message === "QUOTA_EXCEEDED") {
        toast.error("Gemini Free Tier Quota Reached. Please wait 60 seconds.");
        fallbackMsg = "[QUOTA ALERT] You've reached the free tier limit. Please wait 60 seconds and try again, or continue with the local simulation...";
        setCurrentStep(currentStep === -1 ? 0 : currentStep);
      } else {
        toast.error("Brain Connection Failed. Using Local Engine.");
        fallbackMsg = "[CONNECTION ERROR] Neural Link interrupted. Re-routing to internal simulation engine...";
        setCurrentStep(currentStep === -1 ? 0 : currentStep);
      }
      setMessages(prev => [...prev, { role: "ai", content: fallbackMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-obsidian border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="bg-neutral-charcoal px-4 md:px-6 py-2 border-b border-white/5 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="hidden sm:flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/10 mx-1 md:mx-2 shrink-0" />
          <div className="flex items-center gap-2 truncate">
            <Terminal className="h-3 w-3 text-primary-500 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-silver truncate">Arena v1.1</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <div className="flex items-center gap-2">
             <div className="hidden sm:block text-[9px] font-black uppercase text-neutral-silver/40 tracking-widest">Progress</div>
             <div className="flex gap-0.5 md:gap-1">
                {[...Array(totalSteps)].map((_, i) => (
                  <div key={i} className={cn(
                    "w-4 md:w-6 h-1 rounded-full transition-all duration-500",
                    i < currentStep ? "bg-primary-500" : i === (currentStep === -1 ? 0 : currentStep) ? "bg-primary-500/30 animate-pulse" : "bg-white/5"
                  )} />
                ))}
             </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="text-neutral-silver hover:text-white hover:bg-white/5 text-[9px] font-black uppercase tracking-widest h-8 px-2 md:px-3"
          >
            Abort
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative"> 
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 md:space-y-12 scrollbar-modern pb-20"> 
          {messages.map((msg, i) => (
            <div key={i} className={cn(
              "flex flex-col gap-2 max-w-[85%]", 
              msg.role === "user" ? "ml-auto items-end" : "items-start"
            )}>
              <div className={cn(
                "px-5 py-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm transition-all duration-300",
                msg.role === "user" 
                  ? "bg-primary-500 text-neutral-obsidian rounded-tr-none font-bold scale-[0.98] origin-right" 
                  : "bg-white/5 border border-white/10 text-foreground rounded-tl-none font-mono"
              )}>
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? "mt-2" : ""}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-primary-500/50 font-mono text-xs italic animate-pulse">
               <RefreshCw className="h-3 w-3 animate-spin" />
               Interviewer is analyzing...
            </div>
          )}

          {showReport && (
            <div className="animate-in zoom-in-95 fade-in duration-1000 pt-8 pb-12 w-full">
              <div className="bg-neutral-charcoal/40 border border-primary-500/30 rounded-[2.5rem] p-3 space-y-10 shadow-lime-glow backdrop-blur-sm mx-auto max-w-5xl">
                <div className="flex flex-col items-start md:items-center justify-between gap-4 pb-8 border-b border-white/5">
                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                      <div className="p-3 bg-primary-500/10 rounded-2xl">
                        <Trophy className="h-8 w-8 text-primary-500" />
                      </div>
                      Tactical Debrief
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="h-1 w-12 bg-primary-500 rounded-full" />
                      <p className="text-xs font-black uppercase text-primary-500 tracking-[0.4em]">Critical Execution Assessment</p>
                    </div>
                  </div>
                  <div className="bg-white/5 p-1 md:p-2 rounded-3xl border border-white/10 w-full text-center px-3">
                    <div className="text-base md:text-3xl font-black text-white tabular-nums">
                      {reportData?.score || "0.0"}
                      <span className="text-sm text-neutral-silver/40 font-bold ml-1">/10</span>
                    </div>
                    <div className="text-[7px] md:text-[8px] font-black uppercase text-neutral-silver/60  mt-2">Composite Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-6 bg-neutral-obsidian/40 p-3 rounded-[2rem] border border-white/5 hover:border-red-500/20 transition-colors group">
                    <div className="flex items-center gap-3 text-primary-500">
                      <div className="p-2 bg-primary-500/10 rounded-lg group-hover:scale-110 transition-transform">
                        <Target className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em]">Detected Gaps</h4>
                    </div>
                    <ul className="space-y-4">
                      {(reportData?.gaps || ["Incomplete tech stack justification.", "Lack of production mitigation strategies."]).map((gap, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                          <div className="mt-1 bg-red-500/20 p-1 rounded-md">
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                          </div>
                          <span className="text-sm text-neutral-silver font-medium leading-relaxed">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6 bg-neutral-obsidian/40 p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-accent-amber/20 transition-colors group">
                    <div className="flex items-center gap-3 text-accent-amber">
                      <div className="p-2 bg-accent-amber/10 rounded-lg group-hover:scale-110 transition-transform">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em]">Lead Advice</h4>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary-500/20 rounded-full" />
                      <p className="text-sm md:text-base text-neutral-silver font-medium leading-relaxed italic pl-6 py-2">
                        "{reportData?.advice || `Stop giving high-level summaries. For a role like ${jobTitle}, we expect deep-dives into memory management.`}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                       <p className="text-[10px] font-black uppercase text-neutral-silver/40 tracking-widest">Signed: AI_Lead_Evaluator</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button onClick={onClose} className="w-full h-18 bg-white text-neutral-obsidian hover:bg-primary-500 hover:text-white font-black uppercase tracking-[0.08em] text-[11px] rounded-[1.5rem] shadow-2xl transition-all active:scale-95 group overflow-hidden relative">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Terminate Simulation
                      <CheckCircle2 className="h-4 w-4" />
                    </span>

                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {isGeneratingReport && (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-white/5 border border-primary-500/10 rounded-3xl animate-pulse">
               <RefreshCw className="h-12 w-12 text-primary-500 animate-spin" />
               <div className="text-center">
                  <p className="text-sm font-black text-white uppercase tracking-widest">Neural Analysis in Progress</p>
                  <p className="text-[10px] text-neutral-silver font-bold uppercase tracking-[0.2em] mt-1">Generating Tactical Debrief...</p>
               </div>
            </div>
          )}
        </div>

        {!showReport && (
          <div className="p-6 bg-neutral-charcoal border-t border-white/5">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-500/5 blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity" />
              <Textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Transmission initiated... Type your response here."
                className="min-h-[60px] w-full bg-neutral-obsidian border-white/10 focus:border-primary-500 focus:ring-0 text-foreground font-medium p-6 rounded-2xl resize-none pr-16 scrollbar-modern relative"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="absolute bottom-4 right-4 h-10 w-10 p-0 rounded-xl bg-primary-500 hover:bg-primary-400 text-neutral-obsidian shadow-lime"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[10px] text-neutral-silver/30 font-bold uppercase tracking-[0.2em]">Press Enter to transmit</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-[9px] font-black text-primary-500/60 uppercase tracking-widest">Link Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
