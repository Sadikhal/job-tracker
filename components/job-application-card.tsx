"use client";

import { JobApplication, Column } from "@/lib/models/models.types";
import { ExternalLink, MoreVertical, Trash2, Edit, MapPin, DollarSign, Clock, Building2, Layout, Zap, Target } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState, useEffect } from "react";
import SimulationDialog from "./ai/simulation-dialog";
import { BrainCircuit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations/job-application";
import { toast } from "sonner";
import { cn, getErrorMessage } from "@/lib/utils";

interface JobApplicationCardProps {
  job: JobApplication;
  columns: Column[];
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
  onUpdate: (id: string, updates: Partial<Omit<JobApplicationInput, 'tags'>> & { tags?: string[] }) => Promise<{ data?: any; error?: string }>;
  onDelete: (id: string) => Promise<{ data?: any; error?: string; success?: boolean }>;
  onMove: (id: string, columnId: string, order: number) => Promise<{ data?: any; error?: string }>;
}

export default function JobApplicationCard({
  job,
  columns,
  dragHandleProps,
  onUpdate,
  onDelete,
  onMove,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      company: job.company,
      position: job.position,
      location: job.location || "",
      notes: job.notes || "",
      salary: job.salary || "",
      jobUrl: job.jobUrl || "",
      tags: job.tags?.join(", ") || "",
      description: job.description || "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      reset({
        company: job.company,
        position: job.position,
        location: job.location || "",
        notes: job.notes || "",
        salary: job.salary || "",
        jobUrl: job.jobUrl || "",
        tags: job.tags?.join(", ") || "",
        description: job.description || "",
      });
    }
  }, [isEditing, job, reset]);



  async function onUpdateSubmit(data: JobApplicationInput) {
    setLoading(true);
    try {
      const formattedTags = data.tags
        ? data.tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
        : [];

      const result = await onUpdate(job._id, {
        ...data,
        tags: formattedTags,
      });

      if (result?.error) throw new Error(result.error);

      toast.success("Job updated");
      setIsEditing(false);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Update protocol failed"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const result = await onDelete(job._id);
      if (result?.error) throw new Error(result.error);
      toast.success("Application deleted");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Purge failed"));
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      const targetCol = columns.find(c => c._id === newColumnId);
      const newOrder = targetCol?.jobApplications?.length || 0;
      const result = await onMove(job._id, newColumnId, newOrder);
      
      if (result?.error) throw new Error(result.error);
      toast.success("Moved to " + targetCol?.name);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Deployment failed"));
    }
  }

  return (
    <>
      <div
        className="group relative rounded-2xl bg-neutral-slate/40 border border-white/5 p-5 transition-all duration-300 hover:bg-neutral-slate/60 hover:border-primary-500/30 shadow-bespoke select-none cursor-grab active:cursor-grabbing animate-fade-in"
        {...dragHandleProps}
      >
        <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 grayscale group-hover:grayscale-0 transition-all">
                <Building2 className="h-3 w-3 text-primary-500" />
                <p className="text-[10px] font-black uppercase text-primary-500 tracking-[0.2em] opacity-80 truncate">
                  {job.company}
                </p>
              </div>
              <h4 className="text-base md:text-lg font-black text-foreground tracking-tight leading-none group-hover:text-primary-500 transition-colors truncate">
                {job.position}
              </h4>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-silver hover:text-foreground hover:bg-white/5 rounded-lg shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-charcoal border-white/10 w-48">
                <DropdownMenuItem onClick={() => setIsEditing(true)} className="font-bold text-xs uppercase tracking-tighter cursor-pointer">
                  <Edit className="mr-3 h-4 w-4" />
                  View/Edit Details
                </DropdownMenuItem>
                <div className="border-t border-white/5 my-1" />
                {columns.length > 1 && (
                  <div className="py-1">
                    {columns.filter(c => c._id !== job.columnId).map(col => (
                      <DropdownMenuItem key={col._id} onClick={() => handleMove(col._id)} className="font-bold text-[10px] uppercase tracking-widest text-neutral-silver cursor-pointer">
                        <Layout className="mr-3 h-3 w-3 opacity-50" />
                        Move to {col.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
                <div className="border-t border-white/5 my-1" />
                <DropdownMenuItem onClick={handleDelete} className="text-red-400 focus:text-red-400 font-bold text-xs uppercase tracking-tighter cursor-pointer">
                  <Trash2 className="mr-3 h-4 w-4" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {job.location && (
              <div className="flex items-center gap-2 text-neutral-silver group-hover:text-foreground transition-colors">
                <MapPin className="h-3 w-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-2 text-primary-500">
                <DollarSign className="h-3 w-3" />
                <span className="text-[10px] font-black tracking-tighter">${job.salary.toLocaleString()}</span>
              </div>
            )}
          </div>

          {(job.tags && job.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {job.tags.map((tag) => (
                <div key={tag} className="px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                   <p className="text-[9px] font-black text-neutral-silver uppercase tracking-widest">
                      {tag}
                   </p>
                </div>
              ))}
            </div>
          )}
         
          <div className="pt-2">
            <SimulationDialog 
              job={{
                company: job.company,
                position: job.position,
                description: job.description,
                stage: columns.find(c => c._id === job.columnId)?.name || "General"
              }}
              trigger={
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full h-11 bg-primary-500/5 border-primary-500/10 hover:bg-primary-500 hover:text-neutral-obsidian hover:border-primary-500 text-primary-500 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-500 group/ai shadow-sm hover:shadow-lime"
                >
                  <BrainCircuit className="h-3.5 w-3.5 mr-2 group-hover/ai:rotate-12 transition-transform" />
                  Prepare with AI
                </Button>
              }
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-bold uppercase text-neutral-silver/40">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : 'Just now'}</span>
            </div>
            {job.jobUrl && (
               <a 
                 href={job.jobUrl} 
                 target="_blank" 
                 onClick={e => e.stopPropagation()}
                 className="flex items-center gap-1.5 text-primary-500/60 hover:text-primary-500 transition-colors"
               >
                  Listing Agent
                  <ExternalLink className="h-3 w-3" />
               </a>
            )}
            {!job.jobUrl && <div className="h-1.5 w-1.5 rounded-full bg-primary-500/20" />}
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl bg-neutral-charcoal border-white/10 text-foreground p-0 overflow-hidden rounded-[2rem] shadow-2xl">
          <DialogHeader className="p-6 bg-gradient-to-br from-primary-500/20 to-neutral-charcoal border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-primary-500 rounded-xl shadow-lime rotate-3">
                <Edit className="h-6 w-6 text-neutral-obsidian" strokeWidth={2.5} />
              </div>
              <div>
                <DialogTitle className="text-xl font-black uppercase tracking-tighter">Edit Job</DialogTitle>
                <DialogDescription className="text-neutral-silver font-bold uppercase tracking-widest text-[9px] opacity-60 mt-0.5">
                  Update details for <span className="text-primary-500 font-black italic">{job.company}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form className="flex flex-col h-full max-h-[70vh]" onSubmit={handleSubmit(onUpdateSubmit)}>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-modern">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-[9px] font-black uppercase tracking-widest text-primary-500">Company *</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    className={cn(
                      "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                      errors.company && "border-red-500/50 focus:border-red-500"
                    )}
                  />
                  {errors.company && (
                    <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-[9px] font-black uppercase tracking-widest text-primary-500">Position *</Label>
                  <Input
                    id="position"
                    {...register("position")}
                    className={cn(
                      "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                      errors.position && "border-red-500/50 focus:border-red-500"
                    )}
                  />
                  {errors.position && (
                    <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Location</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    className={cn(
                      "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                      errors.location && "border-red-500/50 focus:border-red-500"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Salary</Label>
                  <Input
                    id="salary"
                    {...register("salary")}
                    className={cn(
                      "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                      errors.salary && "border-red-500/50 focus:border-red-500"
                    )}
                  />
                  {errors.salary && (
                    <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="jobUrl" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Job URL</Label>
               <Input
                  id="jobUrl"
                  type="url"
                  {...register("jobUrl")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                    errors.jobUrl && "border-red-500/50 focus:border-red-500"
                  )}
               />
               {errors.jobUrl && (
                  <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                    {errors.jobUrl.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Tags (split by comma)</Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold",
                    errors.tags && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  {...register("description")}
                  className={cn(
                    "bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold resize-none scrollbar-modern",
                    errors.description && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  {...register("notes")}
                  className={cn(
                    "bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold resize-none scrollbar-modern",
                    errors.notes && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t border-white/5 flex gap-4 bg-neutral-charcoal">
              <Button
                type="button"
                variant="outline"
                className="h-12 px-6 font-black uppercase tracking-tighter text-neutral-silver border-white/10 hover:bg-white/5 hover:text-foreground rounded-xl transition-all"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="h-12 px-8 font-black uppercase tracking-tighter bg-primary-500 hover:bg-primary-400 shadow-lime text-neutral-obsidian rounded-xl transition-all active:scale-95 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "SAVING..." : "SAVE CHANGES"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
