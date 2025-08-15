import { useEffect, useState } from 'react';
import Button from './ui/Button';
import type { SystemBarProps, WindowState } from '../types';


function SystemBar({
  windows,
  activeWindowId,
  onWindowAction
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
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getFormattedDate = () => {
    return time.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleWindowClick = (id: string, window: WindowState) => {
    if (window.isMinimized) {
      onWindowAction(id, 'open');
    } else if (window.isOpen && activeWindowId !== id) {
      onWindowAction(id, 'bringToFront');
    } else {
      onWindowAction(id, 'minimize');
    }
  };

  return (
    <div className="rounded-b-2xl fixed top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center z-[1000] shadow-2xl">
      {/* Left section - Logo and system info */}
      <div className="flex items-center">
        <div className="rounded-bl-2xl flex items-center gap-3 px-1 py-2 h-12 bg-cyan-900 backdrop-blur-sm border border-cyan-500/20">
          <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-cyan-200">
            BS
          </div>
          <span className="text-white font-semibold text-sm">Portfolio OS</span>
        </div>
      </div>

      {/* Center section - Window controls */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-2">
          {Object.entries(windows).map(([id, window]) =>
            (window.isMinimized || window.isOpen) && (
              <Button
                key={id}
                variant="taskbar"
                isActive={window.isOpen && !window.isMinimized}
                onClick={() => handleWindowClick(id, window)}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-current opacity-60
                     ${window.isOpen && !window.isMinimized ? "bg-cyan-400" : ""}
                      `}></span>
                  {id === "terminal" ? "Terminal" : id.charAt(0).toUpperCase() + id.slice(1)}
                </span>
              </Button>
            )
          )}
        </div>
      </div>

      {/* Right section - Time and system status */}
      <div className="flex items-center">
        <div className="flex rounded-br-2xl items-center gap-3 h-12 px-1 py-2 bg-cyan-900 backdrop-blur-sm border border-cyan-500/10">
          <div className="text-right">
            <div className="text-white font-mono text-sm leading-tight">
              {getFormattedTime()}
            </div>
            <div className="text-gray-400 font-mono text-xs leading-tight">
              {getFormattedDate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBar;
