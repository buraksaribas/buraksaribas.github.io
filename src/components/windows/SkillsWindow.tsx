import { skills } from "../../data/data";

function SkillsWindow() {
  const categories = [
    "Programming Languages",
    "Web Frontend",
    "Web Backend",
    "Mobile",
    "Desktop",
    "Databases",
    "Other Tools",
    "Human Languages",
  ];

  return (
    <div className="p-3 sm:p-6 h-full overflow-y-auto">
      <div className="space-y-4 sm:space-y-6">
        {categories.map((category) => (
          <div key={category} className="mb-4 sm:mb-6">
            <h3 className="text-cyan-300 font-bold mb-2 sm:mb-3 text-sm sm:text-base border-b border-cyan-500/30 pb-1">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skills
                .filter(
                  (skill) =>
                    skill.category.toLowerCase() === category.toLowerCase(),
                )
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="text-cyan-100 bg-cyan-900/30 hover:bg-cyan-800/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md select-none text-xs sm:text-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Skills count summary */}
      <div className="block sm:hidden mt-6 pt-4 border-t border-cyan-500/30">
        <div className="text-center text-cyan-300/80 text-xs">
          <span className="font-mono">
            Total Skills: {skills.length} • Categories: {categories.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SkillsWindow;
