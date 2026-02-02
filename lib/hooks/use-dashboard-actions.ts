"use client";

import { useTransition, useOptimistic } from "react";
import { Board, JobApplication } from "@/lib/models/models.types";
import { boardReducer } from "@/lib/reducers/board-reducer";
import { 
  updateJobApplication, 
  createJobApplication, 
  deleteJobApplication 
} from "@/lib/actions/job-applications";


export function useDashboardActions(initialBoard: Board) {
  const [isPending, startTransition] = useTransition();

  const [optimisticBoard, addOptimisticBoard] = useOptimistic(
    initialBoard,
    boardReducer
  );

  const onAddJob = (data: any) => {
    return new Promise((resolve) => {
      const tempId = crypto.randomUUID();
      const targetCol = optimisticBoard.columns.find(c => c._id === data.columnId);
      
      const newJob: JobApplication = {
        _id: tempId,
        ...data,
        order: targetCol?.jobApplications?.length || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      startTransition(async () => {
        addOptimisticBoard({ type: "ADD", payload: { job: newJob } });
        const result = await createJobApplication({ ...data, boardId: optimisticBoard._id });
        resolve(result);
      });
    });
  };

  const onUpdateJob = (id: string, updates: any) => {
    return new Promise((resolve) => {
      startTransition(async () => {
        addOptimisticBoard({ type: "UPDATE", payload: { id, updates } });
        const result = await updateJobApplication(id, updates);
        resolve(result);
      });
    });
  };

  const onMoveJob = (id: string, columnId: string, order: number) => {
    return new Promise((resolve) => {
      startTransition(async () => {
        addOptimisticBoard({ type: "MOVE", payload: { id, columnId, order } });
        const result = await updateJobApplication(id, { columnId, order });
        resolve(result);
      });
    });
  };

  const onDeleteJob = (id: string) => {
    return new Promise((resolve) => {
      startTransition(async () => {
        addOptimisticBoard({ type: "DELETE", payload: { id } });
        const result = await deleteJobApplication(id);
        resolve(result);
      });
    });
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
