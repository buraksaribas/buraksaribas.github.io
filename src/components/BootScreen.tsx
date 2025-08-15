import ProgressBar from './ui/ProgressBar';
import type { BootScreenProps } from '../types';

function BootScreen({ bootText, bootProgress }: BootScreenProps) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center relative overflow-hidden">
      <div className="relative w-lg z-10 text-center max-w-md mx-auto px-8">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-24 h-24 relative mb-4 group">
            <div className="relative z-10 w-full h-full bg-cyan-700 rounded-full flex items-center justify-center border border-cyan-700 shadow-lg shadow-cyan-800/40">
              <svg
                className="w-10 h-10 text-cyan-200 animate-spin"
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

          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2 font-mono tracking-wider uppercase">
            Portfolio OS
          </h2>
        </div>

        <div className="mb-6">
          <div className="text-cyan-200 font-mono text-lg mb-2 min-h-[28px] whitespace-pre-line">
            {bootText}
            <span className="inline-block w-2 h-5 bg-cyan-300 animate-pulse ml-1"></span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <ProgressBar progress={bootProgress} />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
