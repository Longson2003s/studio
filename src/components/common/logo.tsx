import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-lg font-semibold tracking-tighter text-primary", className)}>
      <div className="flex items-center justify-center rounded-lg bg-primary p-2">
         <Stethoscope className="h-5 w-5 text-primary-foreground" />
      </div>
      <h1 className="font-headline font-bold text-xl">Trợ lý bác sĩ</h1>
    </div>
  );
}
