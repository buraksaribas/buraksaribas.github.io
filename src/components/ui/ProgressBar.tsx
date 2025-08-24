import { useIsMobile } from "../../hooks/useIsMobile";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

function ProgressBar({ progress, className }: ProgressBarProps) {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`bg-cyan-500/50 rounded overflow-hidden backdrop-blur-sm border border-cyan-500/50 ${
        isMobile ? "h-3 sm:h-3.5" : "h-4"
      } ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-700 rounded transition-all duration-500 ease-out relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
