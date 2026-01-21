import Papa from "papaparse";
import { Board, Column, JobApplication } from "./models/models.types";

export function exportToCSV(board: Board) {
  const data = board.columns.flatMap((col) =>
    col.jobApplications.map((job) => ({
      Company: job.company,
      Position: job.position,
      Status: col.name,
      Location: job.location || "",
      Salary: job.salary || "",
      URL: job.jobUrl || "",
      Tags: job.tags?.join(", ") || "",
      Notes: job.notes || "",
      Description: job.description || "",
      "Date Added": new Date().toLocaleDateString(),
    }))
  );

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
