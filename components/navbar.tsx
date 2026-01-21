"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-2xl">
      <div className="container mx-auto flex h-20 items-center px-6 justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 shadow-lime transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary-400">
            <Briefcase className="h-6 w-6 text-neutral-obsidian" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">
              Job
            </span>
            <span className="text-[10px] font-bold text-primary-500 tracking-[0.2em] uppercase leading-none mt-1">
              Tracker
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-neutral-silver hover:text-primary-500 hover:bg-white/5 font-bold uppercase tracking-widest text-xs transition-all"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-11 w-11 rounded-xl glass-border hover:bg-white/5 transition-all p-0 overflow-hidden"
                  >
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarFallback className="bg-neutral-slate text-primary-500 font-black text-lg">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 bg-neutral-charcoal border-white/10 text-foreground rounded-2xl p-2 shadow-2xl" align="end">
                  <DropdownMenuLabel className="px-4 py-3 border-b border-white/5 mb-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-black uppercase text-primary-500 italic">
                        Account
                      </p>
                      <p className="text-base font-bold text-foreground">
                        {session.user.name}
                      </p>
                      <p className="text-xs font-medium text-neutral-silver truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <div className="px-1 py-1">
                    <SignOutButton />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-neutral-silver hover:text-primary-500 hover:bg-white/5 font-bold uppercase tracking-widest text-xs transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary-500 hover:bg-primary-400 text-neutral-obsidian font-black uppercase tracking-tighter px-6 h-11 rounded-xl shadow-lime transition-all active:scale-95">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

