import {
  useState,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { Position, WindowProps } from "../types";
import Button from "./ui/Button";
import { useIsMobile } from "../hooks/useIsMobile";

function Window({
  id,
  title,
  children,
  defaultPosition,
  onClose,
  onMinimize,
  onMaximize,
  isActive,
  bringToFront,
  isMaximized,
  zIndex,
}: WindowProps) {
  const { isMobile } = useIsMobile();
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [savedState, setSavedState] = useState<Position | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!windowRef.current || isMaximized || isMobile) return;

    const target = e.target as HTMLElement;
    if (
      target.classList.contains("window-btn") ||
      target.closest(".window-controls") ||
      !target.closest(".window-header")
    ) {
      return;
    }

    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    bringToFront(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !windowRef.current || isMaximized) return;

    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    const maxX = window.innerWidth - windowRef.current.offsetWidth;
    const maxY = window.innerHeight - windowRef.current.offsetHeight;

    setPosition((prev) => ({
      ...prev,
      left: Math.max(2, Math.min(maxX, x)),
      top: Math.max(50, Math.min(maxY, y)),
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMaximize = () => {
    if (!windowRef.current || isMobile) return;

    if (!isMaximized) {
      setSavedState(position);
      setPosition({
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 40px)",
      });
      onMaximize(id, true);
    } else {
      if (savedState) {
        setPosition(savedState);
        setSavedState(null);
      }
      onMaximize(id, false);
    }

    bringToFront(id);
  };

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, isMaximized]);

  const getMobileStyle = () => {
    return {
      top: "40px", // Below system bar
      left: "4px",
      right: "4px",
      bottom: "4px",
      width: "calc(100vw - 8px)",
      height: "calc(100vh - 44px)",
      zIndex,
    };
  };

  const getDesktopStyle = () => {
    return isMaximized
      ? {
          top: 48,
          left: 0,
          width: "calc(100vw - 20px)",
          height: "calc(100vh - 65px)",
          zIndex,
        }
      : {
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: position.width,
          height: position.height,
          zIndex,
        };
  };
  const windowStyle = isMobile ? getMobileStyle() : getDesktopStyle();
  return (
    <div
      ref={windowRef}
      className={`
        absolute bg-black/80 border ${isActive ? "border-cyan-500/50 scale-100" : "border-cyan-700/50 scale-95"}
        shadow-[0_0_10px_rgba(0,247,255,0.4)] rounded-2xl
        ${isMobile ? "m-0" : "m-2 min-w-[300px] min-h-[200px]"}
        ${isMaximized || isMobile ? "resize-none" : "resize"} 
        overflow-hidden backdrop-blur-sm transition-all duration-200
      `}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`window-header bg-gradient-to-b from-cyan-700 to-black/90 text-cyan-100 flex justify-between items-center border-b border-cyan-500/50 select-none ${
          isMobile ? "p-3 cursor-default" : "p-2 cursor-move"
        }`}
        onDoubleClick={isMobile ? undefined : handleMaximize}
      >
        <span
          className={`window-title ${isMobile ? "text-base font-medium" : "text-sm"}`}
        >
          {title}
        </span>
        <div className="window-controls flex gap-1">
          {/* Hide minimize and maximize buttons on mobile */}
          {!isMobile && (
            <>
              <Button
                onClick={() => onMinimize(id)}
                aria-label="Minimize window"
              >
                _
              </Button>
              <Button onClick={handleMaximize} aria-label="Maximize window">
                □
              </Button>
            </>
          )}
          <Button
            onClick={() => onClose(id)}
            aria-label="Close window"
            className={isMobile ? "px-3 py-2" : ""}
          >
            ×
          </Button>
        </div>
      </div>
      <div
        className={`window-content overflow-y-auto bg-black/70 text-cyan-100 ${
          isMobile ? "p-3 h-[calc(100%-56px)]" : "p-2 h-[calc(100%-40px)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Window;
