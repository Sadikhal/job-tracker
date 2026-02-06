"use client";

import { use, useMemo, useState, useEffect } from "react";
import { Board } from "@/lib/models/models.types";
import StatsCards from "@/components/dashboard/stats-cards";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck } from "lucide-react";
import { exportToCSV } from "@/lib/export-utils";
import StageGrid from "@/components/dashboard/stage-grid";
import AIPrepLab from "@/components/dashboard/ai-lab-tab";
import DashboardHeader from "./dashboard-header";
import DashboardTabs from "./dashboard-tabs";
import DashboardError from "./dashboard-error";
import { useDashboardActions } from "@/lib/hooks/use-dashboard-actions";

interface DashboardClientProps {
  boardPromise: Promise<{ data?: Board; error?: string }>;
  userId: string;
}

export default function DashboardClient({ boardPromise, userId }: DashboardClientProps) {
  const result = use(boardPromise);

  if (result.error) {
    return <DashboardError message={result.error} />;
  }

  return <DashboardContent initialBoard={result.data as Board} userId={userId} />;
}



function DashboardContent({ initialBoard, userId }: { initialBoard: Board; userId: string }) {
  const { optimisticBoard, isPending, handlers } = useDashboardActions(initialBoard);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [mainMode, setMainMode] = useState<"pipeline" | "ailab">("pipeline");


  useEffect(() => {
    if (optimisticBoard?.columns?.length > 0 && !activeTabId) {
      setActiveTabId(optimisticBoard.columns[0]._id);
    }
  }, [optimisticBoard, activeTabId]);

  const filteredColumns = useMemo(() => {
    if (!optimisticBoard) return [];
    if (!searchQuery) return optimisticBoard.columns;

    const lowerQuery = searchQuery.toLowerCase();
    return optimisticBoard.columns.map((col) => ({
      ...col,
      jobApplications: (col.jobApplications || []).filter(
        (job) =>
          job.company.toLowerCase().includes(lowerQuery) ||
          job.position.toLowerCase().includes(lowerQuery) ||
          job.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          job.location?.toLowerCase().includes(lowerQuery)
      ),
    }));
  }, [optimisticBoard, searchQuery]);



  const stats = useMemo(() => {
    // const defaultStats = { total: 0, wishlist: 0, applied: 0, interviewing: 0, offers: 0, rejected: 0 };
    let total = 0, wishlist = 0, applied = 0, interviewing = 0, offers = 0, rejected = 0;

    optimisticBoard.columns.forEach((col) => {
      const count = col.jobApplications?.length || 0;
      total += count;
      const name = col.name.toLowerCase();
      if (name.includes("wish")) wishlist = count;
      else if (name.includes("apply") || name.includes("applied")) applied = count;
      else if (name.includes("interview")) interviewing = count;
      else if (name.includes("offer")) offers = count;
      else if (name.includes("reject")) rejected = count;
    });

    return { total, wishlist, applied, interviewing, offers, rejected };
  }, [optimisticBoard]);



  return (
    <div className="min-h-screen bg-background pb-10">
      <DashboardHeader 
        mainMode={mainMode} 
        setMainMode={setMainMode} 
        totalJobs={stats.total} 
        onSearch={setSearchQuery} 
      />

      <div className="container mx-auto px-6 space-y-12 -translate-y-10">
        {mainMode === "pipeline" ? (
          <>
            <div className="transition-all duration-500 ease-in-out">
              <StatsCards stats={stats} />
            </div>

            <div className="flex flex-col gap-10 mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase whitespace-nowrap">
                      Application Pipeline
                    </h2>
                    <p className="text-xs text-primary-500/60 font-black uppercase tracking-[0.4em]">
                      Integrated Funnel Management
                    </p>
                  </div>
                  
                  {isPending && (
                    <div className="flex items-center gap-3 py-1 px-3 bg-primary-500/10 rounded-full border border-primary-500/20 animate-fade-in w-fit">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                      <span className="text-[9px] font-black text-primary-500 uppercase tracking-widest whitespace-nowrap">Tactical Uplink Active</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {searchQuery && (
                    <div className="hidden lg:flex items-center gap-2 animate-fade-in mr-4">
                      <p className="text-[10px] text-neutral-silver font-black uppercase tracking-widest">
                        Filtered By:
                      </p>
                      <div className="text-sm text-primary-500 font-bold bg-primary-500/10 px-5 py-2 rounded-full border border-primary-500/20 shadow-lime">
                        "{searchQuery}"
                      </div>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => optimisticBoard && exportToCSV(optimisticBoard)}
                    disabled={!optimisticBoard || stats.total === 0}
                    className="h-12 px-6 font-black uppercase tracking-tighter rounded-xl border-white/10 bg-white/5 hover:bg-primary-500 hover:text-neutral-obsidian transition-all gap-3"
                  >
                    <Download className="h-5 w-5" />
                    Data Export
                  </Button>
                </div>
              </div>

              <DashboardTabs 
                columns={optimisticBoard?.columns || []} 
                activeTabId={activeTabId} 
                setActiveTabId={setActiveTabId} 
              />
            </div>

            <div className="bg-neutral-charcoal/80 backdrop-blur-3xl rounded-[3rem] p-6 sm:p-12 border border-white/10 shadow-bespoke relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />

              <div className="relative">
                {activeTabId ? (
                  <StageGrid
                    column={optimisticBoard.columns.find((c) => c._id === activeTabId)!}
                    jobs={filteredColumns.find((c) => c._id === activeTabId)?.jobApplications || []}
                    boardId={optimisticBoard._id}
                    onAddJob={handlers.onAddJob}
                    onUpdate={handlers.onUpdateJob}
                    onDelete={handlers.onDeleteJob}
                    onMove={handlers.onMoveJob}
                    allColumns={optimisticBoard.columns}
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-5 pt-12 opacity-40">
               <ShieldCheck className="h-5 w-5 text-primary-500" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-silver">End-to-End Encryption Protocol Active</p>
            </div>
          </>
        ) : (
          <AIPrepLab />
        )}
      </div>
    </div>
  );
}
