import { useIsMobile } from "../hooks/useIsMobile";
import type { DesktopProps } from "../types";
import DesktopIcon from "./DesktopIcon";

function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { isMobile } = useIsMobile();

  const getMobileIcons = () => [
    { id: "terminal", label: "Terminal", icon: ">", row: 0, col: 0 },
    { id: "about", label: "About", icon: "👨‍💻", row: 0, col: 1 },
    { id: "skills", label: "Skills", icon: "👨‍💻", row: 0, col: 2 },
    { id: "projects", label: "Projects", icon: "📁", row: 1, col: 0 },
    { id: "resume", label: "Resume", icon: "📁", row: 1, col: 1 },
    { id: "contact", label: "Contact", icon: "📧", row: 1, col: 2 },
    { id: "tictactoe", label: "Tic Tac Toe", icon: "❌", row: 2, col: 0 },
    { id: "minesweeper", label: "Minesweeper", icon: "💣", row: 2, col: 1 },
    { id: "snake", label: "Snake", icon: "🐍", row: 2, col: 2 },
  ];

  const getDesktopIcons = () => [
    { id: "terminal", label: "Terminal", icon: ">", top: 50, left: 50 },
    { id: "about", label: "About", icon: "👨‍💻", top: 50, left: 155 },
    { id: "skills", label: "Skills", icon: "👨‍💻", top: 50, left: 250 },
    { id: "projects", label: "Projects", icon: "📁", top: 150, left: 50 },
    { id: "resume", label: "Resume", icon: "📁", top: 350, left: 50 },
    { id: "contact", label: "Contact", icon: "📧", top: 150, left: 150 },
    { id: "tictactoe", label: "Tic Tac Toe", icon: "❌", top: 350, left: 400 },
    {
      id: "minesweeper",
      label: "Minesweeper",
      icon: "💣",
      top: 350,
      left: 550,
    },
    { id: "snake", label: "Snake", icon: "🐍", top: 350, left: 700 },
  ];

  if (isMobile) {
    const mobileIcons = getMobileIcons();
    return (
      <div className="desktop w-full h-screen pt-10 relative z-10 px-4">
        <div className="grid grid-cols-3 gap-4 mt-4 justify-items-center">
          {mobileIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isMobile={true}
              onDoubleClick={onIconDoubleClick}
            />
          ))}
        </div>
      </div>
    );
  }

  const desktopIcons = getDesktopIcons();
  return (
    <div className="desktop w-full h-screen pt-12 relative z-10">
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          icon={icon.icon}
          top={icon.top}
          left={icon.left}
          isMobile={false}
          onDoubleClick={onIconDoubleClick}
        />
      ))}
    </div>
  );
}

export default Desktop;
