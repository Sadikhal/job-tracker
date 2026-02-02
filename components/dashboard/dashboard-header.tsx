"use client";

import { LayoutDashboard, BrainCircuit } from "lucide-react";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  mainMode: "pipeline" | "ailab";
  setMainMode: (mode: "pipeline" | "ailab") => void;
  totalJobs: number;
  onSearch: (query: string) => void;
}

export default function DashboardHeader({
  mainMode,
  setMainMode,
  totalJobs,
  onSearch,
}: DashboardHeaderProps) {
  return (
    <div className="relative border-b border-white/5 bg-neutral-obsidian overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto lg:px-6 px-2 md:px-4 py-16 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMainMode("pipeline")}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 group relative",
                  mainMode === "pipeline"
                    ? "bg-primary-500 text-neutral-obsidian shadow-lime scale-105"
                    : "text-neutral-silver hover:bg-white/5 border border-white/5",
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="text-sm font-black uppercase tracking-widest">
                  Dashboard
                </span>
                {mainMode === "pipeline" && (
                  <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-obsidian opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-obsidian/30"></span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setMainMode("ailab")}
                className={cn(
                  "flex items-center gap-3 px-2 lg:px-5 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                  mainMode === "ailab"
                    ? "bg-white text-neutral-obsidian shadow-glow-white scale-105"
                    : "text-neutral-silver hover:bg-white/5 border border-white/5",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse",
                    mainMode === "ailab" && "opacity-0",
                  )}
                />
                <BrainCircuit
                  className={cn(
                    "h-5 w-5 relative",
                    mainMode === "ailab"
                      ? "text-neutral-obsidian"
                      : "group-hover:text-primary-500",
                  )}
                />
                <span className="text-sm font-black uppercase lg:tracking-widest tracking-normal relative">
                  AI Career Lab
                </span>
              </button>
            </div>

            <div className="space-y-4 px-2">
              {mainMode === "pipeline" ? (
                <>
                  <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
                    Command <br />
                    <span className="text-primary-500">Center</span>.
                  </h1>
                  <p className="text-lg text-neutral-silver font-medium max-w-md italic border-l-2 border-primary-500/30 pl-4">
                    Strategic oversight of{" "}
                    <span className="text-foreground font-bold">
                      {totalJobs}
                    </span>{" "}
                    active deployment targets.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
                    Interview <br />
                    <span className="text-white">Simulator</span>.
                  </h1>
                  <p className="text-lg text-neutral-silver font-medium max-w-md italic border-l-2 border-white/30 pl-4">
                    Engage adaptive AI protocols for{" "}
                    <span className="text-white font-bold">Mock Combat</span>{" "}
                    training.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:max-w-md">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
