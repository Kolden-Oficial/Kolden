import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend, trendValue }: KpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-fade-in hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-semibold text-card-foreground">{value}</p>
          {(subtitle || trendValue) && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {trendValue && (
                <span className={cn(
                  "font-medium",
                  trend === "up" ? "text-primary" : "text-destructive"
                )}>
                  {trend === "up" ? "↑" : "↓"} {trendValue}
                </span>
              )}
              {subtitle}
            </p>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
