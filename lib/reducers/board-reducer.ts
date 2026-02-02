import { Board, JobApplication } from "@/lib/models/models.types";

export type OptimisticAction = 
  | { type: "ADD"; payload: { job: JobApplication } }
  | { type: "UPDATE"; payload: { id: string; updates: Partial<JobApplication> } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "MOVE"; payload: { id: string; columnId: string; order: number } };

export function boardReducer(state: Board, action: OptimisticAction): Board {
  switch (action.type) {
    case "ADD": {
      const { job } = action.payload;
      return {
        ...state,
        columns: state.columns.map(col => 
          col._id === job.columnId 
            ? { ...col, jobApplications: [...col.jobApplications, job] } 
            : col
        )
      };
    }
    
    case "UPDATE": {
      const { id, updates } = action.payload;
      return {
        ...state,
        columns: state.columns.map(col => ({
          ...col,
          jobApplications: col.jobApplications.map(j => 
            j._id === id ? { ...j, ...updates } : j
          )
        }))
      };
    }
    
    case "DELETE": {
      const { id } = action.payload;
      return {
        ...state,
        columns: state.columns.map(col => ({
          ...col,
          jobApplications: col.jobApplications.filter(j => j._id !== id)
        }))
      };
    }
    
    case "MOVE": {
      const { id, columnId, order } = action.payload;
      let jobToMove: JobApplication | null = null;

      const columnsWithRemoved = state.columns.map(col => {
        const found = col.jobApplications.find(j => j._id === id);
        if (found) {
          jobToMove = { ...found, columnId, order };
          return { ...col, jobApplications: col.jobApplications.filter(j => j._id !== id) };
        }
        return col;
      });

      if (!jobToMove) return state;

      return {
        ...state,
        columns: columnsWithRemoved.map(col => {
          if (col._id === columnId) {
            const appCopy = [...col.jobApplications];
            appCopy.splice(order, 0, jobToMove as JobApplication);
            return { 
              ...col, 
              jobApplications: appCopy.map((j, i) => ({ ...j, order: i })) 
            };
          }
          return col;
        })
      };
    }
    
    default:
      return state;
  }
}
