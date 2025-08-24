import { useEffect, useState } from "react";
import Button from "./ui/Button";
import type { SystemBarProps, WindowState } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";

function SystemBar({
  windows,
  activeWindowId,
  onWindowAction,
}: SystemBarProps) {
  const { isMobile } = useIsMobile();
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
      second: isMobile ? undefined : "2-digit", // Hide seconds on mobile
      hour12: false,
    });
  };

  const getFormattedDate = () => {
    return time.toLocaleDateString([], {
      weekday: isMobile ? undefined : "short", // Hide weekday on mobile
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
    if (isMobile) {
      // Shorter names for mobile
      return id === "terminal" ? "Term" : id.charAt(0).toUpperCase();
    }
    return id === "terminal"
      ? "Terminal"
      : id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div
      className={`rounded-b-2xl fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center z-[1000] shadow-2xl ${
        isMobile ? "h-10" : "h-12"
      }`}
    >
      {/* Left section - Logo and system info */}
      <div className="flex items-center">
        <div
          className={`rounded-bl-2xl flex items-center bg-cyan-900 backdrop-blur-sm border border-cyan-500/20 ${
            isMobile ? "gap-1 px-2 py-1 h-10" : "gap-3 px-1 py-2 h-12"
          }`}
        >
          <div
            className={`rounded-full bg-cyan-600 flex items-center justify-center text-cyan-200 ${
              isMobile ? "w-5 h-5 text-xs" : "w-6 h-6"
            }`}
          >
            BS
          </div>
          {!isMobile && (
            <span className="text-white font-semibold text-sm">
              Portfolio OS
            </span>
          )}
        </div>
      </div>

      {/* Center section - Window controls */}
      <div className="flex-1 flex justify-center px-2">
        <div className={`flex ${isMobile ? "gap-1" : "gap-2"}`}>
          {Object.entries(windows).map(
            ([id, window]) =>
              (window.isMinimized || window.isOpen) && (
                <Button
                  key={id}
                  variant="taskbar"
                  isActive={window.isOpen && !window.isMinimized}
                  onClick={() => handleWindowClick(id, window)}
                  className={isMobile ? "px-2 py-1 text-xs" : ""}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`rounded-full bg-current opacity-60 ${
                        isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                      } ${window.isOpen && !window.isMinimized ? "bg-cyan-400" : ""}`}
                    ></span>
                    <span className={isMobile ? "hidden sm:inline" : ""}>
                      {getWindowDisplayName(id)}
                    </span>
                  </span>
                </Button>
              ),
          )}
        </div>
      </div>

      {/* Right section - Time and system status */}
      <div className="flex items-center">
        <div
          className={`flex rounded-br-2xl items-center bg-cyan-900 backdrop-blur-sm border border-cyan-500/10 ${
            isMobile ? "gap-1 h-10 px-2 py-1" : "gap-3 h-12 px-1 py-2"
          }`}
        >
          <div className="text-right">
            <div
              className={`text-white font-mono leading-tight ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              {getFormattedTime()}
            </div>
            <div
              className={`text-gray-400 font-mono leading-tight ${
                isMobile ? "text-[10px]" : "text-xs"
              }`}
            >
              {getFormattedDate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemBar;
