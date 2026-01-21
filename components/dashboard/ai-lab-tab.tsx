"use client";

import React, { useState } from "react";
import { BrainCircuit, Target, Code2, Server, Smartphone, ShieldCheck, Terminal, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InterviewArena from "../ai/interview-arena";

const DOMAINS = [
  { id: "frontend", name: "Frontend Architecture", icon: Code2, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: "backend", name: "Distributed Systems", icon: Server, color: "text-primary-500", bg: "bg-primary-500/10" },
  { id: "mobile", name: "Mobile Ecosystems", icon: Smartphone, color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: "security", name: "Cybersecurity Ops", icon: ShieldCheck, color: "text-red-400", bg: "bg-red-400/10" },
  { id: "fullstack", name: "Fullstack Mastery", icon: Terminal, color: "text-success", bg: "bg-success/10" },
];

export default function AIPrepLab() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [extraContext, setExtraContext] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  if (isSimulating) {
    return (
      <div className="min-h-[400px] h-full animate-in fade-in zoom-in-95 duration-700">
        <InterviewArena 
           jobTitle={extraContext || DOMAINS.find(d => d.id === selectedDomain)?.name || "Software Engineer"}
           company="Strategic Command"
           stage="Global Selection"
           onClose={() => setIsSimulating(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="relative rounded-[3rem] bg-neutral-charcoal/80 border border-white/10 p-12 overflow-hidden group shadow-bespoke">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/10 transition-colors duration-1000" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full">
              <Sparkles className="h-3 w-3 text-primary-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500">Neural Link Active</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Master the <br />
              <span className="text-primary-500">Interview Arena</span>.
            </h2>
            <p className="text-neutral-silver font-medium text-lg max-w-xl italic border-l-2 border-white/10 pl-6">
              Our adaptive AI simulates high-pressure technical screenings tailored to your specific field. Choose a domain to begin your combat calibration.
            </p>
          </div>

          <div className="w-full md:w-auto">
             <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
                <BrainCircuit className="h-24 w-24 text-white opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative space-y-6 text-center">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-neutral-silver tracking-[0.3em]">Module Status</p>
                      <p className="text-xl font-black text-white uppercase italic">Ready to Initialize</p>
                   </div>

                   {selectedDomain && (
                      <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                        <p className="text-[9px] font-black uppercase text-primary-500 tracking-widest">Detail Required</p>
                        <input 
                          type="text"
                          placeholder="Specify Tech Stack (e.g. Java, MERN)"
                          value={extraContext}
                          onChange={(e) => setExtraContext(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder:text-neutral-silver/30 focus:border-primary-500 focus:ring-0 outline-none transition-all"
                        />
                      </div>
                   )}

                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Button 
                      variant="ghost"
                      onClick={() => {
                        setSelectedDomain(null);
                        setExtraContext("");
                      }}
                      className="h-14 px-6 font-black uppercase tracking-[0.2em] text-[10px] text-neutral-silver hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                     >
                       Change Domain
                     </Button>
                     <Button 
                      disabled={!!(!selectedDomain || (selectedDomain && extraContext.length < 3))}
                      onClick={() => setIsSimulating(true)}
                      className={cn(
                        "w-48 h-14 font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500",
                        selectedDomain 
                          ? "bg-white text-neutral-obsidian shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105" 
                          : "bg-white/5 text-neutral-silver/30 cursor-not-allowed"
                      )}
                     >
                       <Play className="h-3.5 w-3.5 mr-2 fill-current" />
                       Start Session
                     </Button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-white/5" />
           <h3 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-silver/40">Select Operational Domain</h3>
           <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            const Icon = domain.icon;
            
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={cn(
                  "p-6 rounded-[2rem] border transition-all duration-500 text-center space-y-4 group relative overflow-hidden",
                  isSelected 
                    ? "bg-white/10 border-white/20 shadow-xl" 
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-4 h-1.5 w-1.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(132,204,22,1)]" />
                )}
                
                <div className={cn(
                  "p-4 rounded-2xl inline-block transition-transform duration-500 group-hover:scale-110",
                  domain.bg,
                  domain.color
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h4 className={cn(
                  "text-xs font-black uppercase tracking-widest transition-colors",
                  isSelected ? "text-white" : "text-neutral-silver group-hover:text-neutral-silver"
                )}>
                  {domain.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center pt-8">
         <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl opacity-60 hover:opacity-100 transition-opacity">
            <Target className="h-4 w-4 text-primary-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-silver">
              PRO TIP: Select <span className="text-white">Fullstack Mastery</span> for a comprehensive system drill.
            </p>
         </div>
      </div>
    </div>
  );
}
