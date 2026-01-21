import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp, Zap, Target, LineChart, Shield, Layout } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary-500/30">
      <main className="flex-1">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-amber/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container relative mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in">
                  <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-neutral-silver">
                    Job Tracker v1.0
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 animate-slide-in">
                   TRACK YOUR <br />
                   <span className="text-primary-500">CAREER</span> <br />
                   <span className="text-neutral-silver italic">JOURNEY</span>.
                </h1>

                <p className="text-lg md:text-xl text-neutral-silver mb-12 max-w-lg font-medium leading-relaxed border-l-4 border-primary-500/30 pl-6">
                  Stay organized and track your job applications effortlessly with our modern tracking system.
                </p>

                <div className="flex flex-wrap gap-6 animate-slide-up">
                  <Link href="/sign-up">
                    <Button 
                      size="lg" 
                      className="h-16 px-10 text-base font-black uppercase tracking-tighter bg-primary-500 hover:bg-primary-400 text-neutral-obsidian shadow-lime transition-all active:scale-95"
                    >
                      Get Started
                      <ArrowRight className="ml-3 h-5 w-5" strokeWidth={3} />
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-16 px-10 text-base font-black uppercase tracking-tighter border-white/10 hover:bg-white/5 text-foreground transition-all"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 flex items-center gap-8 opacity-50 gray-scale hover:grayscale-0 transition-all">
                   <div className="h-px w-12 bg-white/20" />
                   <span className="text-[10px] uppercase font-bold tracking-widest">Modern Job Tracking Standard</span>
                </div>
              </div>

              <div className="relative group hidden lg:block">
                <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-[3rem] border border-white/10 bg-neutral-charcoal/50 backdrop-blur-3xl p-4 animate-float aspect-square flex items-center justify-center">
                  <div className="w-full h-full rounded-[2.5rem] bg-neutral-obsidian border border-white/5 flex flex-col p-8 overflow-hidden">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500/50" />
                           <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                           <div className="w-3 h-3 rounded-full bg-primary-500/50" />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
                        <div className="h-12 w-2/3 bg-white/5 rounded-xl animate-pulse delay-75" />
                        <div className="h-12 w-3/4 bg-white/5 rounded-xl animate-pulse delay-150" />
                        <div className="flex justify-end pt-8">
                           <div className="h-20 w-20 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                              <Zap className="h-8 w-8 text-primary-500 animate-pulse" />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-12 bg-neutral-charcoal relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
                  EVERYTHING YOU <br />
                  <span className="text-primary-500">NEED.</span>
                </h2>
                <p className="text-lg text-neutral-silver font-medium italic">
                  Simple tools to help you stay organized and find your next role.
                </p>
              </div>
              <div className="h-20 w-20 rounded-full border border-white/10 flex items-center justify-center">
                <p className="text-[10px] font-black uppercase text-neutral-silver rotate-90 tracking-widest">Features</p>
              </div>
            </div>

            <div className="grid gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="grid md:grid-cols-3">
                <div className="p-12 bg-neutral-obsidian hover:bg-neutral-charcoal transition-colors group">
                  <div className="h-12 w-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-10 group-hover:bg-primary-500 transition-all">
                    <Layout className="h-6 w-6 text-primary-500 group-hover:text-neutral-obsidian" />
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary-500 transition-colors">Visual Kanban</h3>
                  <p className="text-neutral-silver font-medium text-sm leading-relaxed">
                    Easily manage your applications with a visual drag-and-drop board.
                  </p>
                </div>
                <div className="p-12 bg-neutral-obsidian hover:bg-neutral-charcoal transition-colors group border-x border-white/5">
                  <div className="h-12 w-12 rounded-xl bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center mb-10 group-hover:bg-accent-amber transition-all">
                    <LineChart className="h-6 w-6 text-accent-amber group-hover:text-neutral-obsidian" />
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-accent-amber transition-colors">Insightful Stats</h3>
                  <p className="text-neutral-silver font-medium text-sm leading-relaxed">
                    Track your progress with clear statistics and stay updated on your application status.
                  </p>
                </div>
                <div className="p-12 bg-neutral-obsidian hover:bg-neutral-charcoal transition-colors group">
                  <div className="h-12 w-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-10 group-hover:bg-primary-500 transition-all">
                    <Shield className="h-6 w-6 text-primary-500 group-hover:text-neutral-obsidian" />
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary-500 transition-colors">Secure Tracking</h3>
                  <p className="text-neutral-silver font-medium text-sm leading-relaxed">
                    Your application data is handled securely and kept organized in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-white/5 flex justify-center">
             <div className="px-8 py-2 bg-neutral-obsidian border border-white/5 rounded-full -translate-y-1/2">
                <Zap className="h-4 w-4 text-primary-500" />
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}

