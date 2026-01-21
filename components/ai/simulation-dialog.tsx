"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Play, Sparkles, AlertCircle, Terminal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import InterviewArena from "./interview-arena";
import { Textarea } from "../ui/textarea";

interface SimulationDialogProps {
  job: {
    company: string;
    position: string;
    description?: string;
    stage?: string;
  };
  trigger?: React.ReactNode;
}

export default function SimulationDialog({ job, trigger }: SimulationDialogProps) {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<"consent" | "input" | "simulation">("consent");
  const [extraContext, setExtraContext] = useState("");

  const hasDescription = job.description && job.description.trim().length > 20;

  const handleStartSimulation = () => {
    setFlow("simulation");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        setFlow("consent");
        setExtraContext("");
      }
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 px-3 text-primary-500 hover:bg-primary-500/10 gap-2 font-black uppercase tracking-tighter text-[10px] w-full">
            <BrainCircuit className="h-3.5 w-3.5" />
            Prepare with AI
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className={cn(
        "bg-neutral-obsidian border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 m-3",
        flow === "simulation" ? "w-full h-[95%]" : "w-full"
      )}>
        {flow === "simulation" ? (
          <InterviewArena 
            jobTitle={job.position}
            company={job.company}
            stage={job.stage}
            description={extraContext || job.description}
            onClose={() => setOpen(false)}
          />
        ) : (
          <div className="flex flex-col">
            <DialogHeader className="p-8 bg-gradient-to-br from-primary-500/10 to-transparent border-b border-white/5 space-y-4">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary-500 rounded-2xl shadow-lime">
                   <BrainCircuit className="h-6 w-6 text-neutral-obsidian" strokeWidth={2.5} />
                 </div>
                 <div>
                   <DialogTitle className="text-xl font-black uppercase tracking-tighter">AI Mission Brief</DialogTitle>
                   <p className="text-[10px] font-black uppercase text-primary-500 tracking-[0.3em]">Tactical Prep Initialization</p>
                 </div>
               </div>
            </DialogHeader>

            <div className="p-3 space-y-5">
              {flow === "consent" ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <Sparkles className="h-5 w-5 text-primary-500 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white uppercase italic">
                           Target: {job.position} @ {job.company}
                        </p>
                        <p className="text-xs text-neutral-silver leading-relaxed">
                          {!hasDescription 
                            ? `Protocol Alert: No detailed intel detected for this sector. Shall I proceed using the INDUSTRY STANDARD for ${job.position}?`
                            : "JD Intel Detected. I am ready to generate a high-pressure technical screening based on your mission details."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button 
                      onClick={handleStartSimulation}
                      className="h-14 bg-primary-500 hover:bg-primary-400 text-neutral-obsidian font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-lime"
                    >
                      <Play className="h-4 w-4 mr-2 fill-current" />
                      Proceed with Mission
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setFlow("input")}
                      className="h-12 text-neutral-silver hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-[9px] gap-2"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Provide Supplementary Intel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary-500">
                         <Terminal className="h-3 w-3" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Manual Input Override</span>
                      </div>
                      <p className="text-xs text-neutral-silver italic">
                        Paste the Job Description or specific tech stack you'd like to practice.
                      </p>
                   </div>
                   <Textarea 
                      placeholder="Paste details here... (e.g., React, TypeScript, System Design)"
                      className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 text-white font-medium p-4 rounded-xl resize-none scrollbar-modern"
                      value={extraContext}
                      onChange={(e) => setExtraContext(e.target.value)}
                   />
                   <div className="flex gap-4 pt-4">
                      <Button 
                        variant="ghost"
                        onClick={() => setFlow("consent")}
                        className="flex-1 h-14 font-black uppercase tracking-widest text-[10px] text-neutral-silver border border-white/5 rounded-xl hover:bg-white/5"
                      >
                        Back
                      </Button>
                      <Button 
                        disabled={!extraContext.trim()}
                        onClick={handleStartSimulation}
                        className="flex-[2] h-14 bg-white text-neutral-obsidian font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl hover:bg-neutral-silver"
                      >
                        Launch Simulation
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
