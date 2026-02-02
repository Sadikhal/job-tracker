"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  CheckCircle2,
  Target,
  TrendingUp,
  Zap,
  AlertCircle,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./job-application-card";

interface KanbanBoardProps {
  board: Board;
  userId: string;
  moveJob: (jobApplicationId: string, newColumnId: string, newOrder: number) => Promise<void>;
  addJob: (data: any) => Promise<any>;
  updateJob: (id: string, updates: any) => Promise<any>;
  deleteJob: (id: string) => Promise<any>;
}

const COLUMNS = [
  {
    id: "wishlist",
    name: "Wishlist",
    color: "bg-neutral-slate/40 border-white/5",
    icon: <Target className="h-5 w-5 text-neutral-silver" strokeWidth={2.5} />,
    accent: "text-neutral-silver",
  },
  {
    id: "applied",
    name: "Applied",
    color: "bg-primary-500/10 border-primary-500/20",
    icon: <Zap className="h-5 w-5 text-primary-500" strokeWidth={2.5} />,
    accent: "text-primary-500",
  },
  {
    id: "interviewing",
    name: "Interviewing",
    color: "bg-accent-amber/5 border-accent-amber/10",
    icon: <TrendingUp className="h-5 w-5 text-accent-amber" strokeWidth={2.5} />,
    accent: "text-accent-amber",
  },
  {
    id: "offer",
    name: "Offers",
    color: "bg-success/5 border-success/10",
    icon: <CheckCircle2 className="h-5 w-5 text-success" strokeWidth={2.5} />,
    accent: "text-success",
  },
  {
    id: "rejected",
    name: "Rejected",
    color: "bg-neutral-obsidian border-white/5 opacity-40 grayscale",
    icon: <AlertCircle className="h-5 w-5 text-neutral-silver" strokeWidth={2.5} />,
    accent: "text-neutral-silver",
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
  addJob,
  updateJob,
  deleteJob,
  onMove,
}: {
  column: Column;
  config: typeof COLUMNS[0];
  boardId: string;
  sortedColumns: Column[];
  addJob: (data: any) => Promise<any>;
  updateJob: (id: string, updates: any) => Promise<any>;
  deleteJob: (id: string) => Promise<any>;
  onMove: (id: string, columnId: string, order: number) => Promise<any>;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
    
  return (
    <div className="flex flex-col min-w-[340px] max-w-[340px] h-full flex-shrink-0 animate-fade-in">
      <div className={`relative rounded-3xl p-6 ${config.color} border-2 flex flex-col h-full bg-neutral-slate/10 backdrop-blur-3xl group shadow-bespoke transition-all duration-500 ${isOver ? 'ring-2 ring-primary-500/50 scale-[1.01]' : ''}`}>
        
        <div className="flex items-start justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${isOver ? 'bg-primary-500 border-primary-500 shadow-lime rotate-6' : 'bg-white/5 border-white/10'}`}>
                 {React.isValidElement(config.icon) ? React.cloneElement(config.icon as React.ReactElement<any>, { 
                   className: `h-6 w-6 ${isOver ? 'text-neutral-obsidian' : config.accent}` 
                 }) : config.icon}
              </div>
              <div className="space-y-1">
                 <h3 className={`text-sm font-black uppercase tracking-[0.2em] leading-none transition-colors ${isOver ? 'text-primary-500' : 'text-foreground'}`}>
                    {column.name}
                 </h3>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-neutral-silver tabular-nums">
                       {sortedJobs.length.toString().padStart(2, '0')} APPLICATIONS
                    </span>
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-[10px] font-bold text-primary-500/50 uppercase tracking-widest">Active</span>
                 </div>
              </div>
           </div>
           
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-silver hover:text-foreground hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                   <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-charcoal border-white/10" align="end">
                 <DropdownMenuItem className="text-red-400 focus:text-red-400 font-bold uppercase text-xs tracking-tighter">
                    <Trash2 className="mr-3 h-4 w-4" />
                    Purge Column
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
        <div 
          ref={setNodeRef}
          className="flex-1 space-y-4 overflow-y-auto scrollbar-modern pr-2 pb-6"
        >
          <SortableContext
            items={sortedJobs.map((job) => job._id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedJobs.map((job) => (
              <SortableJobCard
                key={job._id}
                job={{ ...job, columnId: job.columnId || column._id }}
                columns={sortedColumns}
                updateJob={updateJob}
                deleteJob={deleteJob}
                onMove={onMove}
              />
            ))}
          </SortableContext>
          
          <div className="pt-2">
             <CreateJobApplicationDialog columnId={column._id} boardId={boardId} onAddJob={addJob} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-3xl overflow-hidden">
           <div 
             className="h-full bg-primary-500 shadow-lime transition-all duration-1000" 
             style={{ width: `${Math.min(100, (sortedJobs.length / 10) * 100)}%` }}
           />
        </div>
      </div>
    </div>
  );
}

function SortableJobCard({
  job,
  columns,
  updateJob,
  deleteJob,
  onMove,
}: {
  job: JobApplication;
  columns: Column[];
  updateJob: (id: string, updates: any) => Promise<any>;
  deleteJob: (id: string) => Promise<any>;
  onMove: (id: string, columnId: string, order: number) => Promise<any>;
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: "job",
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard
        job={job}
        columns={columns}
        dragHandleProps={{ ...attributes, ...listeners }}
        onUpdate={updateJob}
        onDelete={deleteJob}
        onMove={onMove}
      />
    </div>
  );
}

export default function KanbanBoard({ board, userId, moveJob, addJob, updateJob, deleteJob }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  if (!board) return null;

  const columns = board.columns;
  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let targetColumnId: string = "";
    let newOrder: number = 0;

    const overCol = sortedColumns.find(c => c._id === overId);
    if (overCol) {
       targetColumnId = overCol._id;
       newOrder = (overCol.jobApplications?.length || 0);
    } else {
       const overJob = sortedColumns.flatMap(c => c.jobApplications || []).find(j => j._id === overId);
       if (overJob) {
          targetColumnId = overJob.columnId || "";
          newOrder = overJob.order;
       }
    }

    if (targetColumnId) {
       await moveJob(activeId, targetColumnId, newOrder);
    }
  }

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative">
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-modern pr-4">
          {sortedColumns.map((col, index) => {
            const config = COLUMNS.find(c => col.name.toLowerCase().includes(c.id)) || COLUMNS[index] || COLUMNS[0];
            return (
              <DroppableColumn
                key={col._id}
                column={col}
                config={config}
                boardId={board._id || ""}
                sortedColumns={sortedColumns}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
                onMove={moveJob}
              />
            );
          })}
        </div>
      </div>

      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.4',
            },
          },
        }),
      }}>
        {activeJob ? (
          <div className="scale-105 rotate-2 filter shadow-lime transition-transform duration-300">
            <JobApplicationCard 
              job={activeJob} 
              columns={sortedColumns} 
              onUpdate={updateJob} 
              onDelete={deleteJob} 
              onMove={moveJob}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
