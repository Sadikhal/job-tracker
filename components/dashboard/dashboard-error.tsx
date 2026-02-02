"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  message: string;
}

export default function DashboardError({ message }: DashboardErrorProps) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="p-6 bg-red-500/10 rounded-full border border-red-500/20">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">System Access Denied</h2>
        <p className="text-neutral-silver max-w-md">{message}</p>
      </div>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline" 
        className="rounded-xl font-bold uppercase tracking-widest gap-3 border-white/10 hover:bg-white/5"
      >
        <RefreshCcw className="h-4 w-4" /> RE-AUTHENTICATE
      </Button>
    </div>
  );
}
