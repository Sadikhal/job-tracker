import { getBoard } from "@/lib/actions/board";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/dashboard-client";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex h-[80vh] items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-500 font-medium animate-pulse">
              Authenticating tactical uplink...
            </p>
          </div>
        </div>
      }>
        <DashboardDataWrapper />
      </Suspense>
    </div>
  );
}

async function DashboardDataWrapper() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const boardPromise = getBoard(session.user.id);
  return <DashboardClient boardPromise={boardPromise} userId={session.user.id} />;
}
