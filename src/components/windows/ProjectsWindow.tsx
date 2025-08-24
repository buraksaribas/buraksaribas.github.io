import { projects } from "../../data/data";

function ProjectsWindow() {
  return (
    <div className="text-cyan-100 p-2 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="relative border border-cyan-500/50 p-3 sm:p-4 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="text-cyan-100 font-bold mb-1 text-base sm:text-lg">
                  {project.title}
                </div>
                <div className="text-cyan-200 text-xs sm:text-sm mb-2 font-mono break-all">
                  {project.tech}
                </div>
              </div>

              {/* Action buttons - responsive layout */}
              <div className="flex flex-row sm:flex-col gap-2 flex-wrap">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm border border-cyan-500 hover:bg-cyan-500/20 transition-colors whitespace-nowrap min-w-[70px] sm:min-w-[80px]"
                  >
                    <span>🌐</span>
                    <span className="hidden xs:inline sm:inline">App</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm border border-cyan-500 hover:bg-cyan-500/20 transition-colors whitespace-nowrap min-w-[70px] sm:min-w-[80px]"
                  >
                    <span>💻</span>
                    <span className="hidden xs:inline sm:inline">GitHub</span>
                  </a>
                )}
              </div>
            </div>

            <p className="text-cyan-100 text-sm sm:text-base leading-relaxed">
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsWindow;
