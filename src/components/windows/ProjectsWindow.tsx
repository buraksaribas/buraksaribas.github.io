import { projects } from '../../data/data';

function ProjectsWindow() {
  return (
    <div className="text-cyan-100 p-4">
      {projects.map((project) => (
        <div
          key={project.title}
          className="relative border border-cyan-500/50 p-4 mb-2 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-cyan-100 font-bold mb-1 text-lg">
                {project.title}
              </div>
              <div className="text-cyan-200 text-sm mb-1 font-['Courier_New',monospace]">
                {project.tech}
              </div>
            </div>

            <div className="flex gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-md text-sm border border-cyan-500 hover:bg-cyan-500/20 transition"
                >
                  🌐 App
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-md text-sm border border-cyan-500 hover:bg-cyan-500/20 transition"
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </div>

          <p className="text-cyan-100 mt-2">{project.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsWindow;
