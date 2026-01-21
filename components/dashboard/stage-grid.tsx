"use client";

import React from "react";
import { JobApplication, Column, Board } from "@/lib/models/models.types";
import JobApplicationCard from "../job-application-card";
import { Ghost, Plus, Layers } from "lucide-react";
import CreateJobApplicationDialog from "../create-job-dialog";

interface StageGridProps {
  jobs: JobApplication[];
  column: Column;
  boardId: string;
  onAddJob: (data: any) => Promise<any>;
  onUpdate: (id: string, updates: any) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
  allColumns: Column[];
}

export default function StageGrid({
  jobs,
  column,
  boardId,
  onAddJob,
  onUpdate,
  onDelete,
  allColumns,
}: StageGridProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-xl">
             <Layers className="h-6 w-6 text-primary-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              {column.name} 
              <span className="text-sm font-black bg-white/5 px-3 py-1 rounded-full text-neutral-silver group-hover:text-primary-500 transition-colors">
                {jobs.length}
              </span>
            </h3>
            <p className="text-[10px] text-primary-500/40 font-black uppercase tracking-[0.4em]">Sector Segment Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <CreateJobApplicationDialog 
             columnId={column._id}
             boardId={boardId}
             onAddJob={onAddJob}
           />
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02] text-center space-y-6">
          <div className="p-6 bg-white/5 rounded-full relative group">
            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Ghost className="h-12 w-12 text-neutral-silver/20 relative animate-bounce-slow" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">Sector is Clear</h3>
              <p className="text-sm text-neutral-silver/40 font-bold max-w-xs mx-auto">
                No active applications detected in <span className="text-primary-500 italic pr-1">{column.name}</span>.
              </p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500/40">Deployment Pending</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {jobs.map((job) => (
            <div key={job._id} className="h-full">
              <JobApplicationCard
                job={job}
                columns={allColumns}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
