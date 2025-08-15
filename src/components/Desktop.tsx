import type { DesktopProps } from '../types';
import DesktopIcon from './DesktopIcon';


function Desktop({ onIconDoubleClick }: DesktopProps) {
  const desktopIcons = [
    { id: "terminal", label: "Terminal", icon: ">", top: 50, left: 50 },
    { id: "about", label: "About", icon: "👨‍💻", top: 50, left: 155 },
    { id: "skills", label: "Skills", icon: "👨‍💻", top: 50, left: 250 },
    { id: "projects", label: "Projects", icon: "📁", top: 150, left: 50 },
    { id: "resume", label: "Resume", icon: "📁", top: 350, left: 50 },
    { id: "contact", label: "Contact", icon: "📧", top: 150, left: 150 },
    { id: "tictactoe", label: "Tic Tac Toe", icon: "❌", top: 350, left: 400 },
    { id: "minesweeper", label: "Minesweeper", icon: "💣", top: 350, left: 550 },
    { id: "snake", label: "Snake", icon: "🐍", top: 350, left: 700 },
  ];

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
          onDoubleClick={onIconDoubleClick}
        />
      ))}
    </div>
  );
};

export default Desktop;
