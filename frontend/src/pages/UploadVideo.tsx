import DashboardLayout from "@/components/DashboardLayout";
import { Upload, Film, Play, FileVideo, Clock, Monitor, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UploadVideo = () => {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    setUploaded(true);
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Upload Video</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Upload a human motion video for 3D pose estimation analysis</p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => setUploaded(true)}
          className={`glass-card border-2 border-dashed cursor-pointer transition-all duration-200 ${
            dragging ? "border-accent bg-accent/5" : "border-border hover:border-primary/40"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-3 sm:gap-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-colors ${
              dragging ? "bg-accent/20" : "bg-primary/10"
            }`}>
              <Upload className={`w-5 h-5 sm:w-7 sm:h-7 ${dragging ? "text-accent" : "text-primary"}`} />
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium text-foreground">Upload Human Motion Video</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Drag and drop or click to browse · MP4, AVI, MOV</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {uploaded && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden"
            >
              <div className="aspect-video bg-background/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Film className="w-10 h-10 sm:w-12 sm:h-12 opacity-30" />
                  <span className="text-xs">walking_subject01.mp4</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 border-t border-border space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <FileVideo className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">walking_subject01.mp4</span>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Duration</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">00:10.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Resolution</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">1920×1080</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">File Size</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">24.7 MB</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Play className="w-4 h-4 mr-2" />
                  Run Pose Estimation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default UploadVideo;
