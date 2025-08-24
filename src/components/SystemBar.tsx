import { useEffect, useState } from "react";
import Button from "./ui/Button";
import type { SystemBarProps, WindowState } from "../types";

function SystemBar({
  windows,
  activeWindowId,
  onWindowAction,
}: SystemBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getFormattedTime = () => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: window.innerWidth >= 640 ? "2-digit" : undefined, // sm: ve üstünde saniye göster
      hour12: false,
    });
  };

  const getFormattedDate = () => {
    return time.toLocaleDateString([], {
      weekday: window.innerWidth >= 640 ? "short" : undefined,
      month: "short",
      day: "numeric",
    });
  };

  const handleWindowClick = (id: string, window: WindowState) => {
    if (window.isMinimized) {
      onWindowAction(id, "open");
    } else if (window.isOpen && activeWindowId !== id) {
      onWindowAction(id, "bringToFront");
    } else {
      onWindowAction(id, "minimize");
    }
  };

  const getWindowDisplayName = (id: string) => {
    return id === "terminal"
      ? window.innerWidth < 640
        ? "Term"
        : "Terminal"
      : window.innerWidth < 640
        ? id.charAt(0).toUpperCase()
        : id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex items-center bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl h-10 sm:h-12">
      {/* Left section */}
      <div className="flex items-center">
        <div className="flex items-center gap-1 sm:gap-3 px-2 sm:px-1 py-1 sm:py-2 h-10 sm:h-12 bg-cyan-900 backdrop-blur-sm border border-cyan-500/20">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-600 flex items-center justify-center text-cyan-200 text-xs sm:text-base">
            BS
          </div>
          <span className="hidden sm:inline text-white font-semibold text-sm">
            Portfolio OS
          </span>
        </div>
      </div>

      {/* Center section */}
      <div className="flex-1 flex justify-center px-2">
        <div className="flex gap-1 sm:gap-2">
          {Object.entries(windows).map(
            ([id, window]) =>
              (window.isMinimized || window.isOpen) && (
                <Button
                  key={id}
                  variant="taskbar"
                  isActive={window.isOpen && !window.isMinimized}
                  onClick={() => handleWindowClick(id, window)}
                  className="px-2 py-1 text-xs sm:text-sm"
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span
                      className={`rounded-full bg-current opacity-60 w-1.5 h-1.5 sm:w-2 sm:h-2 ${
                        window.isOpen && !window.isMinimized
                          ? "bg-cyan-400"
                          : ""
                      }`}
                    />
                    <span className="hidden sm:inline">
                      {getWindowDisplayName(id)}
                    </span>
                    <span className="sm:hidden">
                      {id.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </Button>
              ),
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center">
        <div className="flex items-center gap-1 sm:gap-3 px-2 sm:px-1 py-1 sm:py-2 h-10 sm:h-12 bg-cyan-900 backdrop-blur-sm border border-cyan-500/10">
          <div className="text-right">
            <div className="text-white font-mono leading-tight text-xs sm:text-sm">
              {getFormattedTime()}
            </div>
            <div className="text-gray-400 font-mono leading-tight text-[10px] sm:text-xs">
              {getFormattedDate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemBar;
