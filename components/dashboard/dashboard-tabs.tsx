"use client";

import { Target, Zap, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Column } from "@/lib/models/models.types";

interface DashboardTabsProps {
  columns: Column[];
  activeTabId: string | null;
  setActiveTabId: (id: string) => void;
}

export default function DashboardTabs({
  columns,
  activeTabId,
  setActiveTabId,
}: DashboardTabsProps) {
  return (
    <div className="flex items-center justify-between gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-modern">
      {columns
        .sort((a, b) => a.order - b.order)
        .map((col) => {
          const isActive = activeTabId === col._id;
          const count = col.jobApplications?.length || 0;

          const name = col.name.toLowerCase();
          let Icon = Target;
          let activeColor = "text-primary-500";
          let badgeColor = "bg-primary-500/20 text-primary-500";

          if (name.includes("apply") || name.includes("applied")) {
            Icon = Zap;
            activeColor = "text-primary-500";
            badgeColor = "bg-primary-500/20 text-primary-500";
          } else if (name.includes("interview")) {
            Icon = TrendingUp;
            activeColor = "text-accent-amber";
            badgeColor = "bg-accent-amber/20 text-accent-amber";
          } else if (name.includes("offer")) {
            Icon = CheckCircle2;
            activeColor = "text-success";
            badgeColor = "bg-success/20 text-success";
          } else if (name.includes("reject")) {
            Icon = AlertCircle;
            activeColor = "text-neutral-silver";
            badgeColor = "bg-white/10 text-neutral-silver";
          }

          return (
            <button
              key={col._id}
              onClick={() => setActiveTabId(col._id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap group relative min-w-fit",
                isActive
                  ? "bg-white/10 text-white shadow-bespoke"
                  : "text-neutral-silver/50 hover:text-neutral-silver hover:bg-white/5",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? activeColor : "group-hover:text-primary-500",
                )}
              />
              <span className="text-xs font-black uppercase tracking-widest">
                {col.name}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-black transition-colors",
                  isActive ? badgeColor : "bg-white/5 text-neutral-silver/40",
                )}
              >
                {count}
              </span>

              {isActive && (
                <div
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full mb-1",
                    activeColor.replace("text-", "bg-"),
                  )}
                />
              )}
            </button>
          );
        })}
    </div>
  );
}
