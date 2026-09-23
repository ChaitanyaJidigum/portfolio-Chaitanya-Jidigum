import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col grow justify-center items-center py-24 sm:py-32 px-5 text-center animate-slide-up">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#2E54FE]">
          Error 404 // Location Not Found
        </span>
        <h1 className="text-5xl sm:text-7xl font-black text-foreground tracking-tighter leading-none">
          404
        </h1>
        <div className="flex flex-col gap-1 text-xs sm:text-sm font-mono text-foreground/55 leading-relaxed">
          <p>LOCATION NOT FOUND.</p>
          <p>Scanning nearby dimensions...</p>
          <p>Nothing detected. Not even an orb.</p>
        </div>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white text-xs font-semibold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO BASE</span>
        </Link>
      </div>
    </div>
  );
}
