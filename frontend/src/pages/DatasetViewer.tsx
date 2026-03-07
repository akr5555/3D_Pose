import DashboardLayout from "@/components/DashboardLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const actions = ["Walking", "Sitting", "Running", "Waving", "Jumping", "Standing", "Crouching", "Turning"];
const datasets = ["Human3.6M", "3DPW"];

const samples = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  action: actions[i % actions.length],
  dataset: datasets[i % 2],
  occlusion: Math.floor(Math.random() * 60),
  subject: `S${(i % 5) + 1}`,
}));

const DatasetViewer = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Dataset Viewer</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Browse and filter dataset samples</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Select defaultValue="all-actions">
              <SelectTrigger className="w-[120px] sm:w-[140px] h-9 text-sm bg-secondary border-border">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-actions">All Actions</SelectItem>
                {actions.map(a => <SelectItem key={a} value={a.toLowerCase()}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select defaultValue="all-datasets">
              <SelectTrigger className="w-[120px] sm:w-[140px] h-9 text-sm bg-secondary border-border">
                <SelectValue placeholder="Dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-datasets">All Datasets</SelectItem>
                {datasets.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select defaultValue="all-occlusion">
              <SelectTrigger className="w-[120px] sm:w-[140px] h-9 text-sm bg-secondary border-border">
                <SelectValue placeholder="Occlusion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-occlusion">All Levels</SelectItem>
                <SelectItem value="low">Low (&lt;20%)</SelectItem>
                <SelectItem value="mid">Medium (20-50%)</SelectItem>
                <SelectItem value="high">High (&gt;50%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {samples.map((sample, i) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card overflow-hidden cursor-pointer hover:border-primary/30 transition-colors group"
            >
              <div className="aspect-square bg-background/60 relative flex items-center justify-center">
                <svg viewBox="0 0 200 300" className="h-3/4 opacity-60 group-hover:opacity-90 transition-opacity">
                  <circle cx="100" cy="30" r="12" fill="none" stroke="hsl(185 75% 55%)" strokeWidth="1.5" />
                  <line x1="100" y1="42" x2="100" y2="130" stroke="hsl(215 80% 55%)" strokeWidth="1.5" />
                  <line x1="100" y1="65" x2="60" y2="110" stroke="hsl(215 80% 55%)" strokeWidth="1.5" />
                  <line x1="100" y1="65" x2="140" y2="110" stroke="hsl(215 80% 55%)" strokeWidth="1.5" />
                  <line x1="100" y1="130" x2="70" y2="220" stroke="hsl(215 80% 55%)" strokeWidth="1.5" />
                  <line x1="100" y1="130" x2="130" y2="220" stroke="hsl(215 80% 55%)" strokeWidth="1.5" />
                </svg>
                {sample.occlusion > 30 && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="text-[10px] border-warning/40 text-warning bg-warning/10">
                      {sample.occlusion}% occluded
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-2.5 sm:p-3 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] sm:text-xs font-medium text-foreground">{sample.action}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{sample.subject}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">{sample.dataset}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DatasetViewer;
