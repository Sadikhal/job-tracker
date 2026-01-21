"use client";

import { getBoard } from "@/lib/actions/board";
import { useSession } from "@/lib/auth/auth-client";
import { Board } from "@/lib/models/models.types";
import { useEffect, useState, useMemo } from "react";
import StatsCards from "@/components/dashboard/stats-cards";
import LoadingSpinner from "@/components/shared/loading-spinner";
import SearchBar from "@/components/dashboard/search-bar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV } from "@/lib/export-utils";
import { useBoard } from "@/lib/hooks/useBoards";
import StageGrid from "@/components/dashboard/stage-grid";
import AIPrepLab from "@/components/dashboard/ai-lab-tab";
import {
  Target,
  Zap,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  BrainCircuit,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session, isPending: sessionPending } = useSession();
  const [initialBoard, setInitialBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [mainMode, setMainMode] = useState<"pipeline" | "ailab">("pipeline");

  const { board, addJob, updateJob, deleteJob } =
    useBoard(initialBoard);

  useEffect(() => {
    async function fetchBoard() {
      if (session?.user?.id) {
        const result = await getBoard(session.user.id);
        if (result.data) {
          const boardData = result.data as unknown as Board;
          setInitialBoard(boardData);
          if (boardData.columns?.length > 0) {
            setActiveTabId(boardData.columns[0]._id);
          }
        }
        setLoading(false);
      }
    }

    if (!sessionPending) {
      if (session?.user) {
        fetchBoard();
      } else {
        setLoading(false);
      }
    }
  }, [session, sessionPending]);

  const filteredBoard = useMemo(() => {
    if (!board || !searchQuery) return board;

    const lowerQuery = searchQuery.toLowerCase();

    const newColumns = (board.columns || []).map((col) => ({
      ...col,
      jobApplications: (col.jobApplications || []).filter(
        (job) =>
          job.company.toLowerCase().includes(lowerQuery) ||
          job.position.toLowerCase().includes(lowerQuery) ||
          job.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          job.location?.toLowerCase().includes(lowerQuery),
      ),
    }));

    return { ...board, columns: newColumns };
  }, [board, searchQuery]);

  const stats = useMemo(() => {
    const defaultStats = {
      total: 0,
      wishlist: 0,
      applied: 0,
      interviewing: 0,
      offers: 0,
      rejected: 0,
    };
    if (!board) return defaultStats;

    let total = 0;
    let wishlist = 0;
    let applied = 0;
    let interviewing = 0;
    let offers = 0;
    let rejected = 0;

    (board.columns || []).forEach((col) => {
      const count = col.jobApplications?.length || 0;
      total += count;
      const name = col.name.toLowerCase();
      if (name.includes("wish")) wishlist = count;
      else if (name.includes("apply") || name.includes("applied"))
        applied = count;
      else if (name.includes("interview")) interviewing = count;
      else if (name.includes("offer")) offers = count;
      else if (name.includes("reject")) rejected = count;
    });

    return { total, wishlist, applied, interviewing, offers, rejected };
  }, [board]);

  if (loading || sessionPending) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-500 font-medium animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-gray-500 font-medium">
          Please sign in to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
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
                        {stats.total}
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
              <SearchBar onSearch={(setQuery) => setSearchQuery(setQuery)} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-12 -translate-y-10">
        {mainMode === "pipeline" ? (
          <>
            <div className="transition-all duration-500 ease-in-out">
              <StatsCards stats={stats} />
            </div>

            <div className="flex flex-col gap-10 mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">
                    Application Pipeline
                  </h2>
                  <p className="text-xs text-primary-500/60 font-black uppercase tracking-[0.4em]">
                    Integrated Funnel Management
                  </p>
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
                    onClick={() => board && exportToCSV(board)}
                    aria-label="Export job applications to CSV"
                    disabled={
                      !board ||
                      board.columns.every((c) => c.jobApplications.length === 0)
                    }
                    className="h-12 px-6 font-black uppercase tracking-tighter rounded-xl border-white/10 bg-white/5 hover:bg-primary-500 hover:text-neutral-obsidian transition-all gap-3"
                  >
                    <Download className="h-5 w-5" />
                    Data Export
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-modern">
                {board?.columns
                  .sort((a, b) => a.order - b.order)
                  .map((col) => {
                    const isActive = activeTabId === col._id;
                    const count = col.jobApplications?.length || 0;

                    // Map icons based on column name
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
                            isActive
                              ? activeColor
                              : "group-hover:text-primary-500",
                          )}
                        />
                        <span className="text-xs font-black uppercase tracking-widest">
                          {col.name}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-black transition-colors",
                            isActive
                              ? badgeColor
                              : "bg-white/5 text-neutral-silver/40",
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
            </div>

            <div className="bg-neutral-charcoal/80 backdrop-blur-3xl rounded-[3rem] p-6 sm:p-12 border border-white/10 shadow-bespoke relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />

              <div className="relative">
                {filteredBoard && activeTabId ? (
                  <StageGrid
                    column={
                      filteredBoard.columns.find((c) => c._id === activeTabId)!
                    }
                    jobs={
                      filteredBoard.columns.find((c) => c._id === activeTabId)
                        ?.jobApplications || []
                    }
                    boardId={filteredBoard._id}
                    onAddJob={addJob}
                    onUpdate={updateJob}
                    onDelete={deleteJob}
                    allColumns={filteredBoard.columns}
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <AIPrepLab />
        )}
      </div>
    </div>
  );
}
