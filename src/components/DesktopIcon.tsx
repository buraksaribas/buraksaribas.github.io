import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { DesktopIconProps } from "../types";

function DesktopIcon({ id, label, icon, top, left, onDoubleClick }: DesktopIconProps) {
  const [position, setPosition] = useState({ top, left });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const clampPosition = (pos: { top: number; left: number }) => {
    const iconWidth = 80;
    const iconHeight = 100;
    const maxX = window.innerWidth - iconWidth;
    const maxY = window.innerHeight - iconHeight - 48;

    return {
      top: Math.max(0, Math.min(pos.top, maxY)),
      left: Math.max(0, Math.min(pos.left, maxX)),
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => clampPosition(prev));
    };

    setPosition(clampPosition({ top, left }));

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [top, left]);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsSelected(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    setPosition({
      left: Math.max(2, Math.min(window.innerWidth - 76, x)),
      top: Math.max(50, Math.min(window.innerHeight - 76, y)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, handleMouseMove]);

  return (
    <div
      ref={iconRef}
      className={`absolute flex flex-col items-center p-1 cursor-pointer select-none transition-all duration-200 hover:scale-105 
                  ${isSelected ? "bg-cyan-500/20 rounded-2xl" : ""}`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => {
        onDoubleClick(id);
        setIsSelected(false);
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gradient-to-br from-cyan-300 to-cyan-900 rounded-2xl shadow-lg border border-cyan-500 mb-2 hover:shadow-cyan-400/50">
        {icon}
      </div>
      <span className="text-cyan-200 text-xs font-mono text-center px-2 rounded-2xl bg-black/20">
        {label}
      </span>
    </div>
  );
}

export default DesktopIcon;
