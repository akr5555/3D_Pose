import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  tooltip?: string;
  trend?: "up" | "down" | "neutral";
  accent?: boolean;
}

const MetricCard = ({ label, value, unit, tooltip, trend, accent }: MetricCardProps) => {
  return (
    <div className={`glass-card p-4 ${accent ? "glow-border border-primary/30" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px] text-xs">{tooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`metric-value ${accent ? "text-accent" : "text-foreground"}`}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className={`text-xs mt-1 ${trend === "down" ? "text-success" : trend === "up" ? "text-destructive" : "text-muted-foreground"}`}>
          {trend === "down" ? "↓ Lower is better" : trend === "up" ? "↑ Higher is better" : "—"}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
