"use client";

import { Plus, Target, Zap, Shield, Layout } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations/job-application";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
  onAddJob: (data: any) => Promise<any>;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
  onAddJob,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      notes: "",
      salary: "",
      jobUrl: "",
      tags: "",
      description: "",
    },
  });

  async function onSubmit(data: JobApplicationInput) {
    setLoading(true);

    try {
      const formattedTags = data.tags
        ? data.tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
        : [];

      const result = await onAddJob({
        ...data,
        tags: formattedTags,
        columnId,
        boardId,
      });

      if (!result.error) {
        toast.success("Job added", {
          description: `${data.position} at ${data.company} has been added to your dashboard.`,
        });
        reset();
        setOpen(false);
      } else {
        toast.error(result.error || "Submission protocol failed");
      }
    } catch (err) {
      toast.error("Internal system error during submission");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mb-4 h-12 justify-center gap-3 text-neutral-silver font-black uppercase tracking-tighter border-dashed border-2 border-white/10 bg-white/5 hover:border-primary-500 hover:text-white hover:bg-primary-500/5 transition-all rounded-xl active:scale-95 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          Add New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-neutral-charcoal border-white/10 text-foreground p-0 overflow-hidden rounded-[2rem] shadow-2xl">
        <DialogHeader className="px-6 py-3 bg-gradient-to-br from-primary-500/20 to-neutral-charcoal border-b border-white/5 relative">
          <div className="absolute top-0 right-0 p-6 flex items-center gap-4 opacity-10">
             <Shield className="h-12 w-12" />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2.5 bg-primary-500 rounded-xl shadow-lime rotate-3">
              <Plus className="h-6 w-6 text-neutral-obsidian" strokeWidth={3} />
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-tighter">Add Job</DialogTitle>
              <DialogDescription className="text-neutral-silver font-bold uppercase tracking-widest text-[9px] opacity-60 mt-0.5">
                Enter details for your new application
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="flex flex-col h-full max-h-[70vh]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-modern">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[9px] font-black uppercase tracking-widest text-primary-500">Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g. Google"
                  {...register("company")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
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
                <Label htmlFor="position" className="text-[10px] font-black uppercase tracking-widest text-primary-500">Position *</Label>
                <Input
                  id="position"
                  placeholder="e.g. Software Engineer"
                  {...register("position")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
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
                  placeholder="e.g. Remote / NYC"
                  {...register("location")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
                    errors.location && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Salary</Label>
                <Input
                  id="salary"
                  placeholder="e.g. $120k - $150k"
                  {...register("salary")}
                  className={cn(
                    "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
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
                placeholder="https://..."
                {...register("jobUrl")}
                className={cn(
                  "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
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
              <Label htmlFor="tagsInput" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Tags (split by comma)</Label>
              <Input
                id="tagsInput"
                placeholder="High Priority, Fintech, AI"
                {...register("tags")}
                className={cn(
                  "h-11 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20",
                  errors.tags && "border-red-500/50 focus:border-red-500"
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Description</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Enter job description..."
                {...register("description")}
                className={cn(
                  "bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20 resize-none scrollbar-modern",
                  errors.description && "border-red-500/50 focus:border-red-500"
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[9px] font-black uppercase tracking-widest text-neutral-silver opacity-60">Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Personal notes..."
                {...register("notes")}
                className={cn(
                  "bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-lg font-bold placeholder:text-neutral-silver/20 resize-none scrollbar-modern",
                  errors.notes && "border-red-500/50 focus:border-red-500"
                )}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-3 pt-4 border-t border-white/5 flex gap-4 bg-neutral-charcoal">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 font-black uppercase tracking-tighter text-neutral-silver border-white/10 hover:bg-white/5 hover:text-foreground rounded-xl transition-all"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="h-12 px-8 font-black uppercase tracking-tighter bg-primary-500 hover:bg-primary-400 shadow-lime text-neutral-obsidian rounded-xl transition-all active:scale-95 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                   <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ADDING...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  Add Job
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

