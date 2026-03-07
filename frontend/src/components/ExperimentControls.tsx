import { Play, GitCompare, Download, FileJson, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const ExperimentControls = () => {
  const [occlusion, setOcclusion] = useState([25]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    setRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setRunning(false);
          return 100;
        }
        return p + 2;
      });
    }, 80);
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Experiment Controls</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Model Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Model</label>
          <Select defaultValue="hrnet">
            <SelectTrigger className="h-9 text-sm bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hrnet">HRNet</SelectItem>
              <SelectItem value="openpose">OpenPose</SelectItem>
              <SelectItem value="baseline">Baseline 2D-to-3D Lift</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Dataset</label>
          <Select defaultValue="h36m">
            <SelectTrigger className="h-9 text-sm bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h36m">Human3.6M</SelectItem>
              <SelectItem value="3dpw">3DPW</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Occlusion Simulation: {occlusion[0]}%</label>
          <Slider value={occlusion} onValueChange={setOcclusion} max={100} step={5} className="mt-3" />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={handleRun} disabled={running} className="h-9 flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            {running ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Play className="w-4 h-4 mr-1.5" />}
            {running ? "Running..." : "Run Estimation"}
          </Button>
        </div>
      </div>

      {running && (
        <div className="mb-4">
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground mt-1">Processing frame {Math.floor(progress * 3)}/300...</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs border-border text-muted-foreground hover:text-foreground">
          <GitCompare className="w-3.5 h-3.5 mr-1.5" />Compare Models
        </Button>
        <Button variant="outline" size="sm" className="text-xs border-border text-muted-foreground hover:text-foreground">
          <Download className="w-3.5 h-3.5 mr-1.5" />Download Results
        </Button>
        <Button variant="outline" size="sm" className="text-xs border-border text-muted-foreground hover:text-foreground">
          <FileJson className="w-3.5 h-3.5 mr-1.5" />Export JSON
        </Button>
      </div>
    </div>
  );
};

export default ExperimentControls;
