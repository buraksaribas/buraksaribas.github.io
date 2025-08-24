export interface Position {
  top: number;
  left: number;
  width: string;
  height: string;
}

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultPosition: Position;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string, isMaximized: boolean) => void;
  isActive: boolean;
  bringToFront: (id: string) => void;
  isMaximized: boolean;
  zIndex: number;
}

export interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  top?: number;
  left?: number;
  onDoubleClick: (id: string) => void;
  isOpen?: boolean;
  isMobile?: boolean;
}

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  isMaximized: boolean;
  position: Position;
  savedPosition?: Position;
  gameId?: string;
}

export type WindowsState = Record<string, WindowState>;

export interface WindowManagerProps {
  windows: WindowsState;
  activeWindowId: string | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string, maximized: boolean) => void;
  onBringToFront: (id: string) => void;
}

export interface SystemBarProps {
  windows: WindowsState;
  activeWindowId: string | null;
  onWindowAction: (
    id: string,
    action: "open" | "minimize" | "bringToFront",
  ) => void;
}

export interface DesktopProps {
  onIconDoubleClick: (id: string) => void;
}

export interface BootScreenProps {
  bootText: string;
  bootProgress: number;
}

export interface GameWindowProps {
  gameId: string;
}
