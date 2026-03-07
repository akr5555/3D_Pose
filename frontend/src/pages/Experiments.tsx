import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const experiments = [
  { id: "EXP-001", model: "HRNet-W48", dataset: "Human3.6M", status: "completed", mpjpe: "42.3mm", date: "2026-03-06" },
  { id: "EXP-002", model: "OpenPose", dataset: "Human3.6M", status: "completed", mpjpe: "56.1mm", date: "2026-03-06" },
  { id: "EXP-003", model: "Baseline 2D-to-3D", dataset: "3DPW", status: "running", mpjpe: "—", date: "2026-03-07" },
  { id: "EXP-004", model: "HRNet-W48", dataset: "3DPW", status: "queued", mpjpe: "—", date: "2026-03-07" },
  { id: "EXP-005", model: "OpenPose", dataset: "3DPW", status: "failed", mpjpe: "—", date: "2026-03-05" },
];

const statusConfig = {
  completed: { icon: CheckCircle2, class: "text-success", bg: "bg-success/10 border-success/30" },
  running: { icon: Loader2, class: "text-accent animate-spin", bg: "bg-accent/10 border-accent/30" },
  queued: { icon: Clock, class: "text-muted-foreground", bg: "bg-secondary border-border" },
  failed: { icon: AlertCircle, class: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
};

const Experiments = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Experiments</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track and compare your pose estimation experiments</p>
        </div>

        {/* Desktop table */}
        <div className="glass-card overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["ID", "Model", "Dataset", "Status", "MPJPE", "Date"].map(h => (
                    <th key={h} className="text-left px-4 sm:px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {experiments.map((exp) => {
                  const status = statusConfig[exp.status as keyof typeof statusConfig];
                  const Icon = status.icon;
                  return (
                    <tr key={exp.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                      <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm font-mono text-primary">{exp.id}</td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm text-foreground">{exp.model}</td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm text-muted-foreground">{exp.dataset}</td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4">
                        <Badge variant="outline" className={`text-xs ${status.bg}`}>
                          <Icon className={`w-3 h-3 mr-1 ${status.class}`} />
                          {exp.status}
                        </Badge>
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm font-mono text-foreground">{exp.mpjpe}</td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm text-muted-foreground">{exp.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {experiments.map((exp) => {
            const status = statusConfig[exp.status as keyof typeof statusConfig];
            const Icon = status.icon;
            return (
              <div key={exp.id} className="glass-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-primary">{exp.id}</span>
                  <Badge variant="outline" className={`text-xs ${status.bg}`}>
                    <Icon className={`w-3 h-3 mr-1 ${status.class}`} />
                    {exp.status}
                  </Badge>
                </div>
                <div className="text-sm text-foreground font-medium">{exp.model}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{exp.dataset}</span>
                  <span className="font-mono">{exp.mpjpe}</span>
                  <span>{exp.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Experiments;
