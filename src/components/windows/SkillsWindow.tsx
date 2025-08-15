import { skills } from '../../data/data';

function SkillsWindow() {
  const categories = [
    "Programming Languages",
    "Web Frontend",
    "Web Backend",
    "Mobile",
    "Desktop",
    "Databases",
    "Other Tools",
    "Human Languages"
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-cyan-300 font-bold mb-2">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {skills
              .filter((skill) => skill.category.toLowerCase() === category.toLowerCase())
              .map((skill) => (
                <span
                  key={skill.name}
                  className="text-cyan-100 bg-cyan-900/30 px-3 py-1 rounded-md select-none"
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsWindow;

