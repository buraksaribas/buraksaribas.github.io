import { about } from '../../data/data';

function AboutWindow() {
  return (
    <div className="text-cyan-100 leading-6 p-4">
      {/* About Text */}
      <p className="mb-4">{about.text}</p>

      {/* Education */}
      <h3 className="text-cyan-100 mb-2 text-lg">Education</h3>
      <ul className="list-disc pl-6 mb-4">
        {about.education.map((edu) => (
          <li key={edu.degree}>
            <span className="font-bold">{edu.degree}</span> - {edu.school} ({edu.year})
            <div className="text-cyan-200 text-sm">{edu.details}</div>
          </li>
        ))}
      </ul>

      {/* Experience */}
      <h3 className="text-cyan-100 mb-2 text-lg">Experience</h3>
      {about.experience.map((exp) => (
        <div key={exp.role} className="mb-3">
          <div className="font-bold">{exp.role}</div>
          <div className="text-cyan-200 text-sm">{exp.company} | {exp.year}</div>
          {Array.isArray(exp.details) && (
            <ul className="list-disc pl-6 text-sm">
              {exp.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          )}
          {!Array.isArray(exp.details) && (
            <div className="text-cyan-200 text-sm">{exp.details}</div>
          )}
        </div>
      ))}

      {/* Certifications */}
      <h3 className="text-cyan-100 mb-2 text-lg">Certifications</h3>
      <ul className="list-disc pl-6">
        {about.certifications.map((cert, i) => (
          <li key={i}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-200 hover:text-cyan-300 transition-colors"
            >
              {cert.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutWindow;
