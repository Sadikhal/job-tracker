"use client";

import { useTransition, useOptimistic } from "react";
import { Board, JobApplication } from "@/lib/models/models.types";
import { boardReducer } from "@/lib/reducers/board-reducer";
import { 
  updateJobApplication, 
  createJobApplication, 
  deleteJobApplication 
} from "@/lib/actions/job-applications";
import { JobApplicationInput } from "@/lib/validations/job-application";



type ServerActionResult<T = any> = { data?: T; error?: string; success?: boolean };

type CreateJobData = Omit<JobApplicationInput, 'tags'> & {
  columnId: string;
  boardId: string;
  tags: string[];
};

type UpdateJobData = Partial<Omit<JobApplicationInput, 'tags'>> & {
  tags?: string[];
  columnId?: string;
  order?: number;
};




export function useDashboardActions(initialBoard: Board) {
  const [isPending, startTransition] = useTransition();

  const [optimisticBoard, addOptimisticBoard] = useOptimistic(
    initialBoard,
    boardReducer
  );

  const onAddJob = async (data: CreateJobData): Promise<ServerActionResult<JobApplication>> => {
    const tempId = crypto.randomUUID();
    const targetCol = optimisticBoard.columns.find(c => c._id === data.columnId);
    
    const newJob: JobApplication = {
      _id: tempId,
      ...data,
      status: "applied",
      order: targetCol?.jobApplications?.length || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    startTransition(() => {
      addOptimisticBoard({ type: "ADD", payload: { job: newJob } });
    });
    
    const result = await createJobApplication({ ...data, boardId: optimisticBoard._id });
    
    if (result.error) {
      startTransition(() => {
        addOptimisticBoard({ type: "DELETE", payload: { id: tempId } });
      });
    }
    
    return result;
  };

  const onUpdateJob = async (id: string, updates: UpdateJobData): Promise<ServerActionResult<JobApplication>> => {
    let originalJob: JobApplication | undefined;
    
    for (const col of optimisticBoard.columns) {
      const job = col.jobApplications.find(j => j._id === id);
      if (job) {
        originalJob = { ...job };
        break;
      }
    }
    
    startTransition(() => {
      addOptimisticBoard({ type: "UPDATE", payload: { id, updates } });
    });
    
    const result = await updateJobApplication(id, updates);
    
    if (result.error && originalJob) {
      startTransition(() => {
        addOptimisticBoard({ type: "UPDATE", payload: { id, updates: originalJob! } });
      });
    }
    
    return result;
  };

  const onMoveJob = async (id: string, columnId: string, order: number): Promise<ServerActionResult<JobApplication>> => {
    let originalColumnId: string | undefined;
    let originalOrder: number | undefined;
    
    for (const col of optimisticBoard.columns) {
      const job = col.jobApplications.find(j => j._id === id);
      if (job) {
        originalColumnId = col._id;
        originalOrder = job.order;
        break;
      }
    }
    
    startTransition(() => {
      addOptimisticBoard({ type: "MOVE", payload: { id, columnId, order } });
    });
    
    const result = await updateJobApplication(id, { columnId, order });
    
    if (result.error && originalColumnId !== undefined && originalOrder !== undefined) {
      startTransition(() => {
        addOptimisticBoard({ type: "MOVE", payload: { id, columnId: originalColumnId!, order: originalOrder! } });
      });
    }
    
    return result;
  };

  const onDeleteJob = async (id: string): Promise<ServerActionResult> => {
    let deletedJob: JobApplication | undefined;
    
    for (const col of optimisticBoard.columns) {
      const job = col.jobApplications.find(j => j._id === id);
      if (job) {
        deletedJob = { ...job };
        break;
      }
    }
    
    startTransition(() => {
      addOptimisticBoard({ type: "DELETE", payload: { id } });
    });
    
    const result = await deleteJobApplication(id);
    
    if (result.error && deletedJob) {
      startTransition(() => {
        addOptimisticBoard({ type: "ADD", payload: { job: deletedJob! } });
      });
    }
    
    return result;
  };

  return {
    optimisticBoard,
    isPending,
    handlers: {
      onAddJob,
      onUpdateJob,
      onMoveJob,
      onDeleteJob
    }
  };
}
