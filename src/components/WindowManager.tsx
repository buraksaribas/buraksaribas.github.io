import React from 'react';
import Window from './Window';
import Terminal from './Terminal';
import AboutWindow from './windows/AboutWindow';
import SkillsWindow from './windows/SkillsWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import GameWindow from './windows/GameWindow';
import type { WindowManagerProps, WindowState } from '../types';


function WindowManager({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront
}: WindowManagerProps) {
  const renderWindow = (id: string, window: WindowState) => {
    const commonProps = {
      id,
      defaultPosition: window.position,
      onClose,
      onMinimize,
      onMaximize,
      isActive: activeWindowId === id,
      bringToFront: onBringToFront,
      isMaximized: window.isMaximized,
      zIndex: window.zIndex
    };

    switch (id) {
      case 'terminal':
        return (
          <Window {...commonProps} title="user@portfolio:~$">
            <Terminal />
          </Window>
        );
      case 'about':
        return (
          <Window {...commonProps} title="About">
            <AboutWindow />
          </Window>
        );
      case 'skills':
        return (
          <Window {...commonProps} title="Skills & Technologies">
            <SkillsWindow />
          </Window>
        );
      case 'projects':
        return (
          <Window {...commonProps} title="Projects">
            <ProjectsWindow />
          </Window>
        );
      case 'contact':
        return (
          <Window {...commonProps} title="Contact">
            <ContactWindow />
          </Window>
        );
      default:
        if (window.gameId) {
          const titleMap: Record<string, string> = {
            tictactoe: 'Tic Tac Toe',
            minesweeper: 'Minesweeper',
            snake: 'Snake'
          };
          return (
            <Window
              {...commonProps}
              title={titleMap[window.gameId] || window.gameId.charAt(0).toUpperCase() + window.gameId.slice(1)}
            >
              <GameWindow gameId={window.gameId} />
            </Window>
          );
        }
        return null;
    }
  };

  return (
    <>
      {Object.entries(windows)
        .filter(([, window]) => window.isOpen)
        .map(([id, window]) => (
          <React.Fragment key={id}>
            {renderWindow(id, window)}
          </React.Fragment>
        ))}
    </>
  );
};

export default WindowManager;
