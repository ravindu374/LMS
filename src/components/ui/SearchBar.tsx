import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  label = "Search",
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="search-bar" className="sr-only">
        {label}
      </label>

      <Search
        size={18}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      {/*
        This previously had no dark: classes at all - a white input with
        black text sat on the dark background in dark mode, unreadable and
        inconsistent with every other input in the app.
      */}
      <input
        id="search-bar"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          dark:border-slate-600
          bg-white
          dark:bg-slate-900
          text-slate-800
          dark:text-white
          placeholder:text-slate-400
          dark:placeholder:text-slate-500
          pl-11
          pr-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      />
    </div>
  );
}
