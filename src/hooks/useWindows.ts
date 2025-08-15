import { useState } from "react";
import type { WindowsState } from "../types";

const initialWindows: WindowsState = {
  terminal: {
    isOpen: true,
    isMinimized: false,
    zIndex: 200,
    isMaximized: false,
    position: { top: 50, left: 20, width: "600px", height: "400px" },
  },
  about: {
    isOpen: false,
    isMinimized: true,
    zIndex: 100,
    isMaximized: false,
    position: { top: 100, left: 60, width: "600px", height: "600px" },
  },
  skills: {
    isOpen: false,
    isMinimized: true,
    zIndex: 100,
    isMaximized: false,
    position: { top: 150, left: 100, width: "600px", height: "600px" },
  },
  projects: {
    isOpen: false,
    isMinimized: true,
    zIndex: 100,
    isMaximized: false,
    position: { top: 200, left: 140, width: "600px", height: "600px" },
  },
  contact: {
    isOpen: false,
    isMinimized: true,
    zIndex: 100,
    isMaximized: false,
    position: { top: 250, left: 180, width: "600px", height: "500px" },
  },
  resume: {
    isOpen: false,
    isMinimized: true,
    zIndex: 100,
    isMaximized: false,
    position: { top: 250, left: 180, width: "600px", height: "500px" },
  },
  games: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    isMaximized: false,
    position: { top: 300, left: 220, width: "600px", height: "600px" },
  },
  tictactoe: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    isMaximized: true,
    position: { top: 200, left: 300, width: "400px", height: "400px" },
    gameId: "tictactoe",
  },
  minesweeper: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    isMaximized: true,
    position: { top: 250, left: 250, width: "450px", height: "450px" },
    gameId: "minesweeper",
  },
  snake: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    isMaximized: true,
    position: { top: 200, left: 200, width: "400px", height: "400px" },
    gameId: "snake",
  },
};

export const useWindows = () => {
  const [windows, setWindows] = useState<WindowsState>(initialWindows);
  const [zIndexCounter, setZIndexCounter] = useState(200);

  const openWindow = (id: string) => {
    setZIndexCounter((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: zIndexCounter + 1,
      },
    }));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
        isOpen: false,
      },
    }));
  };

  const maximizeWindow = (id: string, maximized: boolean) => {
    setWindows((prev) => {
      const window = prev[id];
      const newWindow = { ...window, isMaximized: maximized };

      if (maximized && !window.savedPosition) {
        newWindow.savedPosition = window.position;
      } else if (!maximized && window.savedPosition) {
        newWindow.position = window.savedPosition;
        delete newWindow.savedPosition;
      }

      return {
        ...prev,
        [id]: newWindow,
      };
    });
  };

  const bringToFront = (id: string) => {
    setZIndexCounter((prev) => {
      const newZ = prev + 1;
      setWindows((prevWindows) => ({
        ...prevWindows,
        [id]: { ...prevWindows[id], zIndex: newZ },
      }));
      return newZ;
    });
  };

  const getActiveWindow = () => {
    const openWindows = Object.entries(windows).filter(
      ([, w]) => w.isOpen && !w.isMinimized,
    );
    if (openWindows.length === 0) return null;

    return openWindows.reduce(
      (highest, [id, window]) => {
        return window.zIndex > highest.zIndex
          ? { id, zIndex: window.zIndex }
          : highest;
      },
      { id: "", zIndex: 0 },
    ).id;
  };

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    getActiveWindow,
  };
};
