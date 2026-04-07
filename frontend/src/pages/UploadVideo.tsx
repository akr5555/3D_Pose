import DashboardLayout from "@/components/DashboardLayout";
import { Upload, Film, Play, FileVideo, Clock, Monitor, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoMeta {
  duration: number;
  width: number;
  height: number;
}

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/x-msvideo", "video/quicktime", "video/webm"];

const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const tenth = Math.floor((seconds % 1) * 10);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenth}`;
};

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
};

const UploadVideo = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [readingMetadata, setReadingMetadata] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readVideoMetadata = useCallback((file: File) => {
    setReadingMetadata(true);
    setVideoMeta(null);

    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      setVideoMeta({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
      setReadingMetadata(false);
      URL.revokeObjectURL(objectUrl);
    };

    video.onerror = () => {
      setReadingMetadata(false);
      setError("Could not read video metadata. Please try another file.");
      URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const processFile = useCallback((file: File | undefined) => {
    if (!file) return;

    const validType = ALLOWED_VIDEO_TYPES.includes(file.type) || file.type.startsWith("video/");
    if (!validType) {
      setError("Unsupported format. Please upload MP4, AVI, MOV, or WEBM.");
      setSelectedFile(null);
      setVideoMeta(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    readVideoMetadata(file);
  }, [readVideoMetadata]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  }, [processFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  }, [processFile]);

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
          onClick={() => fileInputRef.current?.click()}
          className={`glass-card border-2 border-dashed cursor-pointer transition-all duration-200 ${
            dragging ? "border-accent bg-accent/5" : "border-border hover:border-primary/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/x-msvideo,video/quicktime,video/webm"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-3 sm:gap-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-colors ${
              dragging ? "bg-accent/20" : "bg-primary/10"
            }`}>
              <Upload className={`w-5 h-5 sm:w-7 sm:h-7 ${dragging ? "text-accent" : "text-primary"}`} />
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium text-foreground">Upload Human Motion Video</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Drag and drop or click to browse · MP4, AVI, MOV, WEBM</p>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs sm:text-sm text-destructive">{error}</p>
        )}

        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden"
            >
              <div className="aspect-video bg-background/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Film className="w-10 h-10 sm:w-12 sm:h-12 opacity-30" />
                  <span className="text-xs text-center px-3 break-all">{selectedFile.name}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 border-t border-border space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <FileVideo className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground break-all">{selectedFile.name}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Duration</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">
                        {readingMetadata ? "Reading..." : formatDuration(videoMeta?.duration ?? 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Resolution</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">
                        {readingMetadata ? "Reading..." : `${videoMeta?.width ?? "--"}x${videoMeta?.height ?? "--"}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">File Size</p>
                      <p className="text-xs sm:text-sm font-mono text-foreground">{formatBytes(selectedFile.size)}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={readingMetadata || !!error}>
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
