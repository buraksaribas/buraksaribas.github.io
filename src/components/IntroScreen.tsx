import { PowerIcon } from "./ui/PowerIcon";

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[150px] opacity-25 animate-pulse" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="relative w-56 h-56 group">
          <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center">
            <button
              onClick={onEnter}
              className="
                cursor-pointer
                w-full h-full rounded-full flex items-center justify-center
                text-cyan-100 text-4xl bg-gradient-to-br from-cyan-600 to-cyan-800
                hover:shadow-[0_0_40px_rgba(6,182,212,0.9)] hover:scale-105 transition-all duration-500"
            >
              <div className="text-cyan-200">{PowerIcon}</div>
            </button>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mt-8">
          Burak Sarıbaş
        </h1>
        <p className="text-cyan-200 text-lg mt-2">
          Software Engineer · Portfolio
        </p>
      </div>
    </div>
  );
}

