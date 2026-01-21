"use client";

import { Github, Linkedin, Mail, Briefcase, ExternalLink, Shield, Zap } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative border-t border-white/5 bg-neutral-obsidian/40 backdrop-blur-3xl mt-auto overflow-hidden">

      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-xl rotate-3 shadow-lime">
                  <Briefcase className="h-6 w-6 text-neutral-obsidian" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Job Tracker</h3>
              </div>
              <p className="text-neutral-silver text-sm leading-relaxed max-w-xs font-medium">
                Modern workflow for tracking and organizing your job application journey.
              </p>
              <div className="flex items-center gap-4 pt-2">
                 <div className="h-10 w-10 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center group cursor-pointer hover:border-primary-500/30 transition-all">
                    <Shield className="h-5 w-5 text-neutral-silver group-hover:text-primary-500 transition-colors" />
                 </div>
                 <div className="h-10 w-10 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center group cursor-pointer hover:border-primary-500/30 transition-all">
                    <Zap className="h-5 w-5 text-neutral-silver group-hover:text-primary-500 transition-colors" />
                 </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {['Dashboard', 'Sign Up', 'Sign In'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={item === 'Dashboard' ? '/dashboard' : item === 'Sign Up' ? '/sign-up' : '/sign-in'} 
                      className="text-neutral-silver hover:text-foreground text-sm font-bold transition-all flex items-center gap-2 group"
                    >
                      <div className="h-1 w-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-8">Social Connect</h4>
              <div className="space-y-4">
                 {[
                   { icon: Github, label: 'GitHub', href: 'https://github.com/Sadikhal' },
                   { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sadikhali-p-v-6aa76722a/' },
                   { icon: Mail, label: 'Email', href: 'mailto:sadikhalikvr@gmail.com' }
                 ].map((social) => (
                   <a
                     key={social.label}
                     href={social.href}
                     target="_blank"
                     className="flex items-center gap-4 text-neutral-silver hover:text-foreground group transition-all"
                   >
                     <social.icon className="h-4 w-4 group-hover:text-primary-500 transition-colors" />
                     <span className="text-sm font-bold uppercase tracking-tighter">{social.label}</span>
                     <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                   </a>
                 ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Shield className="h-8 w-8 text-primary-500" />
               </div>
               <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Operations</h4>
               <p className="text-[10px] text-neutral-silver font-medium leading-relaxed uppercase tracking-tighter">
                 Job Tracker v1.0.0<br />
                 All rights reserved.
               </p>
               <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 w-3/4 shadow-lime transition-all duration-1000" />
               </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-silver/40">
              &copy; {year} JOB TRACKER. Developed by <span className="text-primary-500 cursor-pointer transition-colors">Sadikhali P V</span>
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-silver/40">
               <span className="hover:text-primary-500 cursor-pointer transition-colors">Privacy Policy</span>
               <span className="hover:text-primary-500 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
      </div>
    </footer>
  );
}
