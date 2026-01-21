import { Briefcase, CheckCircle2, Clock, TrendingUp, Cpu, Activity, ShieldCheck, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsItem {
  total: number;
  wishlist: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  color: string;
  glow: string;
}

function StatsCard({ title, value, icon, subtitle, color, glow }: StatsCardProps) {
  return (
    <div className="group relative rounded-3xl bg-neutral-slate/40 border border-white/5 p-8 transition-all duration-500 hover:bg-neutral-slate/60 hover:border-primary-500/30 shadow-bespoke overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className={cn("absolute -bottom-8 -left-8 w-24 h-24 blur-[60px] opacity-20 rounded-full transition-opacity group-hover:opacity-40", glow)} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-silver opacity-60">
                {title}
             </p>
             <p className="text-4xl font-black text-foreground tracking-tighter tabular-nums drop-shadow-2xl">
                {value.toString().padStart(2, '0')}
             </p>
          </div>
          <div className="flex items-center gap-2">
             <div className={cn("h-1 w-1 rounded-full", color)} />
             <p className="text-[9px] font-bold text-neutral-silver uppercase tracking-widest italic opacity-40">
                {subtitle}
             </p>
          </div>
        </div>
        <div className={cn("p-4 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", color)}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatsCards({ stats }: { stats: StatsItem }) {
  const inProgress = stats.applied + stats.interviewing;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12 animate-fade-in">
      <StatsCard
        title="Total Jobs"
        value={stats.total}
        subtitle="Total applications tracked"
        icon={<Target className="h-6 w-6 text-neutral-obsidian" strokeWidth={2.5} />}
        color="bg-primary-500 border-primary-500/50 shadow-lime"
        glow="bg-primary-500"
      />
      <StatsCard
        title="In Progress"
        value={inProgress}
        subtitle="Applied and interviewing"
        icon={<Activity className="h-6 w-6 text-white" strokeWidth={2.5} />}
        color="bg-accent-amber border-accent-amber/50"
        glow="bg-accent-amber"
      />
      <StatsCard
        title="Interviews"
        value={stats.interviewing}
        subtitle="Current active interviews"
        icon={<TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />}
        color="bg-primary-500/10 border-primary-500/20"
        glow="bg-primary-500"
      />
      <StatsCard
        title="Offers"
        value={stats.offers}
        subtitle="Job offers received"
        icon={<ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.5} />}
        color="bg-success border-success/50"
        glow="bg-success"
      />
    </div>
  );
}
