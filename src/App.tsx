import MatrixBackground from "./components/MatrixBackground";
import IntroScreen from "./components/IntroScreen";
import { useBootSequence } from "./hooks/useBootSequence";
import { useWindows } from "./hooks/useWindows";
import BootScreen from "./components/BootScreen";
import SystemBar from "./components/SystemBar";
import Desktop from "./components/Desktop";
import WindowManager from "./components/WindowManager";

function App() {
  const { isPoweredOn, isBooting, bootText, bootProgress, handlePowerOn } =
    useBootSequence();
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    getActiveWindow,
  } = useWindows();

  const handleWindowAction = (
    id: string,
    action: "open" | "minimize" | "bringToFront",
  ) => {
    switch (action) {
      case "open":
        openWindow(id);
        break;
      case "minimize":
        minimizeWindow(id);
        break;
      case "bringToFront":
        bringToFront(id);
        break;
    }
  };

  const activeWindowId = getActiveWindow();

  if (!isPoweredOn && !isBooting) {
    return <IntroScreen onEnter={handlePowerOn} />;
  }

  if (isBooting) {
    return <BootScreen bootText={bootText} bootProgress={bootProgress} />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-cyan-950 to-black overflow-hidden transition-all duration-1000 opacity-100">
      <MatrixBackground />
      <SystemBar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowAction={handleWindowAction}
      />
      <Desktop onIconDoubleClick={openWindow} />
      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onBringToFront={bringToFront}
      />
    </div>
  );
}

export default App;
