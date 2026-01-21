"use server";

import connectDB from "../db";
import { Board } from "../models";
import { getSession } from "../auth/auth";

export async function getBoard(userId: string) {
  const session = await getSession();

  if (!session?.user || session.user.id !== userId) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return { error: "Board not found" };

  const board = JSON.parse(JSON.stringify(boardDoc));

  return { data: board };
}
