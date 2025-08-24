import { about } from "../../data/data";

function AboutWindow() {
  return (
    <div className="text-cyan-100 leading-5 sm:leading-6 p-2 sm:p-4">
      {/* About Text */}
      <p className="mb-3 sm:mb-4 text-sm sm:text-base">{about.text}</p>

      {/* Education */}
      <h3 className="text-cyan-100 mb-2 text-base sm:text-lg font-semibold">
        Education
      </h3>
      <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-2">
        {about.education.map((edu) => (
          <li key={edu.degree} className="text-sm sm:text-base">
            <span className="font-bold">{edu.degree}</span> - {edu.school} (
            {edu.year})
            <div className="text-cyan-200 text-xs sm:text-sm mt-1">
              {edu.details}
            </div>
          </li>
        ))}
      </ul>

      {/* Experience */}
      <h3 className="text-cyan-100 mb-2 text-base sm:text-lg font-semibold">
        Experience
      </h3>
      <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
        {about.experience.map((exp) => (
          <div
            key={exp.role}
            className="border-l-2 border-cyan-500/30 pl-3 sm:pl-4"
          >
            <div className="font-bold text-sm sm:text-base">{exp.role}</div>
            <div className="text-cyan-200 text-xs sm:text-sm mb-2">
              {exp.company} | {exp.year}
            </div>
            {Array.isArray(exp.details) && (
              <ul className="list-disc pl-4 sm:pl-6 text-xs sm:text-sm space-y-1">
                {exp.details.map((detail, i) => (
                  <li key={i} className="text-cyan-200">
                    {detail}
                  </li>
                ))}
              </ul>
            )}
            {!Array.isArray(exp.details) && (
              <div className="text-cyan-200 text-xs sm:text-sm">
                {exp.details}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Certifications */}
      <h3 className="text-cyan-100 mb-2 text-base sm:text-lg font-semibold">
        Certifications
      </h3>
      <ul className="list-disc pl-4 sm:pl-6 space-y-1">
        {about.certifications.map((cert, i) => (
          <li key={i} className="text-sm sm:text-base">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-200 hover:text-cyan-300 transition-colors underline decoration-cyan-500/50 hover:decoration-cyan-300/70"
            >
              {cert.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutWindow;
