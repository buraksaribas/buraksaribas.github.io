interface ProgressBarProps {
  progress: number;
  className?: string;
}

function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={`h-4 bg-cyan-500/50 rounded overflow-hidden backdrop-blur-sm border border-cyan-500/50 ${className}`}>
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
