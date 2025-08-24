import { useEffect, useRef, useState } from "react";
import { skills, about, projects } from "../data/data";

interface HistoryEntry {
  command: string;
  output?: string;
}

function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "neofetch",
      output:
        "Portfolio OS v1.0\nReactJS 19.1.0 Terminal\nFull Stack Developer & Software Engineer",
    },
  ]);
  const [currentPath, setCurrentPath] = useState("~");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, string | (() => string)> = {
    whoami: "Full Stack Developer & Software Engineer",
    pwd: () => `/home/developer${currentPath === "~" ? "" : currentPath}`,
    date: () => new Date().toLocaleString(),
    clear: "",
    help: `Available commands:
- whoami, pwd, date, clear, help
- fortune, hack, joke, coffee
- skills, about, projects
- coinflip, 
`,
    skills: () => {
      const grouped: Record<string, { name: string; level: number }[]> = {};
      skills.forEach((s) => {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push({ name: s.name, level: s.level });
      });
      setCurrentPath("skills");
      return Object.entries(grouped)
        .map(
          ([cat, arr]) =>
            `${cat.toUpperCase()}:\n${arr.map((s) => `  - ${s.name}`).join("\n")}`,
        )
        .join("\n\n");
    },
    coinflip: () => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails";
      return `Coin flip result: ${result}`;
    },
    about: () => {
      let output = `${about.text}\n\nEDUCATION:\n`;
      output += about.education
        .map((e) => `- ${e.degree} | ${e.school} (${e.year})\n  ${e.details}`)
        .join("\n");
      output += "\n\nEXPERIENCE:\n";
      output += about.experience
        .map((e) => `- ${e.role} | ${e.company} (${e.year})\n  ${e.details}`)
        .join("\n");
      output += "\n\nCERTIFICATIONS:\n";
      output += about.certifications
        .map((c) => `- ${c.name}${c.link ? ` (${c.link})` : ""}`)
        .join("\n");
      return output;
    },

    projects: () =>
      projects
        .map(
          (p) =>
            `- ${p.title}\n  Tech: ${p.tech}\n  ${p.desc}${p.link ? `\n  Link: ${p.link}` : ""}${
              p.github ? `\n  GitHub: ${p.github}` : ""
            }`,
        )
        .join("\n\n"),

    coffee: () => {
      const coffeeTypes = [
        "Espresso",
        "Latte",
        "Cappuccino",
        "Americano",
        "Turkish Coffee",
      ];
      const coffee =
        coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
      return `☕ Brewing ${coffee}...\n████████████ 100%\nYour ${coffee} is ready! ☕\n+10 Focus, +5 Creativity, +15 Bug Squashing Power!`;
    },

    fortune: () => {
      const fortunes = [
        '"The best code is no code at all." - Jeff Atwood',
        '"Talk is cheap. Show me the code." - Linus Torvalds',
        '"Code never lies, comments sometimes do." - Ron Jeffries',
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    hack: () => {
      const steps = [
        "🔒 Initializing quantum encryption bypass...",
        "🌐 Connecting to the mainframe... ████████████ 100%",
        "🔓 Decrypting firewall protocols... ████████████ 100%",
        "📡 Accessing satellite uplink... ████████████ 100%",
        "💾 Downloading classified memes... ████████████ 100%",
        "🎉 HACK SUCCESSFUL! Access granted!",
        "😄 (Just a demo, no real hacking here)",
      ];
      return steps.join("\n");
    },

    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "I would tell you a UDP joke, but you might not get it.",
        "Why did the developer go broke? Because he used up all his cache.",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    history: () => history.map((h, i) => `${i + 1}  ${h.command}`).join("\n"),
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      let output = "";
      if (trimmedInput === "clear") {
        setHistory([]);
      } else {
        const command = commands[trimmedInput];
        output =
          typeof command === "function"
            ? command()
            : command || `Command '${trimmedInput}' not found. Type 'help'`;
        setHistory((prev) => [...prev, { command: trimmedInput, output }]);
      }

      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input),
      );
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div
      ref={terminalRef}
      className="h-full overflow-y-auto font-mono bg-black text-cyan-300 p-2 sm:p-4"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className="mb-2">
          <div className="flex flex-wrap items-start gap-1 sm:gap-2">
            <span className="text-cyan-400 font-semibold text-xs sm:text-sm break-all">
              developer@portfolio-os:{currentPath}$
            </span>
            <span className="text-xs sm:text-sm break-all">
              {entry.command}
            </span>
          </div>
          {entry.output && (
            <pre className="pl-3 sm:pl-6 text-cyan-200 text-xs sm:text-sm whitespace-pre-wrap break-words">
              {entry.output}
            </pre>
          )}
        </div>
      ))}

      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-cyan-400 font-semibold text-xs sm:text-sm break-all flex-shrink-0">
          developer@portfolio-os:{currentPath}$
        </span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-cyan-100 outline-none flex-1 font-mono caret-cyan-300 text-xs sm:text-sm min-w-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}

export default Terminal;
