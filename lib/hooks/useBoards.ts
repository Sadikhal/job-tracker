"use client";

import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication, deleteJobApplication, createJobApplication } from "../actions/job-applications";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
  }, [initialBoard]);

  async function addJob(data: any) {
    try {
      const result = await createJobApplication(data);
      if (result.data) {
        const newJob = result.data;
        setColumns((prev) => {
          return prev.map((col) => {
            if (col._id === newJob.columnId) {
              return {
                ...col,
                jobApplications: [...col.jobApplications, newJob],
              };
            }
            return col;
          });
        });
        return { data: newJob };
      }
      return result;
    } catch (err) {
      console.error("Error adding job", err);
      return { error: "Failed to add job" };
    }
  }

  async function updateJobDetails(id: string, updates: any) {
    // Optimistic update
    const previousColumns = [...columns];
    setColumns((prev) => {
      return prev.map((col) => ({
        ...col,
        jobApplications: col.jobApplications.map((job) =>
          job._id === id ? { ...job, ...updates } : job
        ),
      }));
    });

    try {
      const result = await updateJobApplication(id, updates);
      if (result.error) {
        setColumns(previousColumns);
        return result;
      }
      return result;
    } catch (err) {
      setColumns(previousColumns);
      return { error: "Failed to update job" };
    }
  }

  async function deleteJob(id: string) {
    // Optimistic update
    const previousColumns = [...columns];
    let colId: string | null = null;
    
    setColumns((prev) => {
      return prev.map((col) => {
        const hasJob = col.jobApplications.some(j => j._id === id);
        if (hasJob) colId = col._id;
        return {
          ...col,
          jobApplications: col.jobApplications.filter((job) => job._id !== id),
        };
      });
    });

    try {
      const result = await deleteJobApplication(id);
      if (result.error) {
        setColumns(previousColumns);
        return result;
      }
      return result;
    } catch (err) {
      setColumns(previousColumns);
      return { error: "Failed to delete job" };
    }
  }

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      // Find and remove job from the old column

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobApplicationId
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error", err);
    }
  }

  return { 
    board: board ? { ...board, columns } : null, 
    columns, 
    error, 
    moveJob, 
    addJob, 
    updateJob: updateJobDetails, 
    deleteJob 
  };
}
