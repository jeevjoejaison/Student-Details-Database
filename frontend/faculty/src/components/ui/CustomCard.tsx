
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  animation?: "none" | "fade" | "slide-up" | "slide-right";
  delay?: number;
  header?: {
    title?: React.ReactNode;
    description?: React.ReactNode;
  };
  footer?: React.ReactNode;
}

export function CustomCard({
  children,
  className,
  glass = false,
  animation = "none",
  delay = 0,
  header,
  footer,
}: CustomCardProps) {
  const getAnimationClass = () => {
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-up";
      case "slide-right":
        return "animate-slide-right";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden",
        glass && "glass-card border-none",
        getAnimationClass(),
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {header && (
        <CardHeader>
          {header.title && <CardTitle>{header.title}</CardTitle>}
          {header.description && <CardDescription>{header.description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
