"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search by company, position, or tags..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative group w-full max-w-xl animate-fade-in">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
        <Search className="h-5 w-5 text-neutral-silver group-focus-within:text-primary-500 transition-colors" />
      </div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search jobs"
        className="pl-14 pr-12 h-14 bg-neutral-charcoal/80 border-2 border-white/10 focus:border-primary-500 focus:ring-0 rounded-2xl shadow-bespoke transition-all text-base font-bold text-foreground placeholder:text-neutral-silver/40 placeholder:font-medium"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-xl text-neutral-silver hover:text-foreground transition-all z-10"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="absolute inset-0 bg-primary-500/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
    </div>
  );
}
