import { useIsMobile } from "../hooks/useIsMobile";
import { PowerIcon } from "./ui/PowerIcon";

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const { isMobile } = useIsMobile();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glow effect */}
      <div
        className={`absolute bg-cyan-500 rounded-full blur-[150px] opacity-25 animate-pulse ${
          isMobile ? "w-[250px] h-[250px]" : "w-[400px] h-[400px]"
        }`}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-md">
        <div
          className={`relative group ${isMobile ? "w-40 h-40" : "w-56 h-56"}`}
        >
          <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center">
            <button
              onClick={onEnter}
              className="
                cursor-pointer
                w-full h-full rounded-full flex items-center justify-center
                text-cyan-100 bg-gradient-to-br from-cyan-600 to-cyan-800
                hover:shadow-[0_0_40px_rgba(6,182,212,0.9)] 
                hover:scale-105 active:scale-95
                transition-all duration-500
                touch-manipulation
              "
            >
              <div
                className={`text-cyan-200 ${
                  isMobile ? "text-2xl" : "text-4xl"
                }`}
              >
                {PowerIcon}
              </div>
            </button>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mt-6 ${
            isMobile ? "text-3xl sm:text-4xl" : "text-5xl"
          }`}
        >
          Burak Sarıbaş
        </h1>

        {/* Subtitle  */}
        <p
          className={`text-cyan-200 mt-2 ${
            isMobile ? "text-base sm:text-lg" : "text-lg"
          }`}
        >
          Software Engineer · Portfolio
        </p>
      </div>
    </div>
  );
}
