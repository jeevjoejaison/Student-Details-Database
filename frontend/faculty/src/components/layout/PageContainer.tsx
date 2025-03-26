
import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  fullWidth?: boolean;
  padding?: boolean;
}

export function PageContainer({
  children,
  className,
  centered = false,
  fullWidth = false,
  padding = true,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        padding && "px-4 py-6 md:px-6 md:py-8",
        centered && "flex flex-col items-center justify-center",
        !fullWidth && "mx-auto max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
