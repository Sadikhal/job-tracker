"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import { Briefcase, Sparkles, UserPlus, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpInput) {
    setLoading(true);

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Enrollment protocol failed");
      } else {
        toast.success("Operative registered", {
          description: "Identity established in the pipeline",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Internal system error during enrollment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-obsidian p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-glow pointer-events-none" />

      <Card className="relative w-full max-w-md bg-neutral-charcoal/80 backdrop-blur-3xl border border-white/10 shadow-bespoke animate-fade-in rounded-3xl overflow-hidden">
        <div className="h-1.5 w-full bg-primary-500 shadow-lime" />

        <CardHeader className="space-y-6 pt-5 pb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 shadow-lime rotate-3 transition-transform hover:rotate-6 cursor-pointer group">
            <UserPlus className="h-8 w-8 text-neutral-obsidian transition-transform group-hover:scale-110" strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black uppercase tracking-tighter text-foreground">
              Create Account
            </CardTitle>
            <CardDescription className="text-neutral-silver font-bold uppercase tracking-widest text-[10px] opacity-60">
              Start tracking your career journey
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 px-10">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-primary-500">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name")}
                className={cn(
                  "h-12 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-xl font-bold placeholder:text-neutral-silver/20",
                  errors.name && "border-red-500/50 focus:border-red-500"
                )}
              />
              {errors.name && (
                <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-primary-500">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className={cn(
                  "h-12 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-xl font-bold placeholder:text-neutral-silver/20",
                  errors.email && "border-red-500/50 focus:border-red-500"
                )}
              />
              {errors.email && (
                <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-primary-500">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={cn(
                  "h-12 bg-white/5 border-white/10 focus:border-primary-500 focus:ring-0 rounded-xl font-bold placeholder:text-neutral-silver/20",
                  errors.password && "border-red-500/50 focus:border-red-500"
                )}
              />
              {errors.password && (
                <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 p-10 pt-6">
            <Button
              type="submit"
              className="w-full h-14 bg-primary-500 hover:bg-primary-400 shadow-lime text-neutral-obsidian font-black uppercase tracking-tighter text-lg rounded-2xl transition-all active:scale-95 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                   <div className="h-5 w-5 border-2 border-neutral-obsidian/30 border-t-neutral-obsidian rounded-full animate-spin" />
                   SIGNING UP...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Create Account
                </span>
              )}
            </Button>

            <div className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest">
               <span className="text-neutral-silver/40">Already have an account?</span>
               <Link
                 href="/sign-in"
                 className="text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-2 group"
               >
                 Sign In
                 <div className="h-1.5 w-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform" />
               </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20 pointer-events-none">
         <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encryption ON</span>
         </div>
         <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">V1.0.4</span>
         </div>
      </div>
    </div>
  );
}

