import ProgressBar from "./ui/ProgressBar";
import type { BootScreenProps } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";

function BootScreen({ bootText, bootProgress }: BootScreenProps) {
  const { isMobile } = useIsMobile();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center relative overflow-hidden px-4">
      <div
        className={`relative z-10 text-center w-full mx-auto ${
          isMobile ? "max-w-sm px-4" : "max-w-md px-8"
        }`}
      >
        {/* Logo and title section */}
        <div className="mb-6 flex flex-col items-center">
          {/* Loading spinner */}
          <div
            className={`relative mb-4 group ${
              isMobile ? "w-20 h-20" : "w-24 h-24"
            }`}
          >
            <div className="relative z-10 w-full h-full bg-cyan-700 rounded-full flex items-center justify-center border border-cyan-700 shadow-lg shadow-cyan-800/40">
              <svg
                className={`text-cyan-200 animate-spin ${
                  isMobile ? "w-8 h-8" : "w-10 h-10"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>

          {/* Portfolio OS title */}
          <h2
            className={`font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2 font-mono tracking-wider uppercase ${
              isMobile ? "text-lg sm:text-xl" : "text-2xl"
            }`}
          >
            Portfolio OS
          </h2>
        </div>

        {/* Boot text section  */}
        <div className="mb-6">
          <div
            className={`text-cyan-200 font-mono mb-2 min-h-[28px] whitespace-pre-line ${
              isMobile ? "text-sm sm:text-base" : "text-lg"
            }`}
          >
            {bootText}
            <span
              className={`inline-block bg-cyan-300 animate-pulse ml-1 ${
                isMobile ? "w-1.5 h-4" : "w-2 h-5"
              }`}
            ></span>
          </div>
        </div>

        {/* Progress bar section */}
        <div className={`w-full mx-auto ${isMobile ? "max-w-sm" : "max-w-md"}`}>
          <ProgressBar progress={bootProgress} />
        </div>
      </div>
    </div>
  );
}

export default BootScreen;
