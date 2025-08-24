import { contact } from "../../data/data";

function ContactWindow() {
  return (
    <div className="text-cyan-100 p-2 sm:p-4">
      <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
        {contact.map((item) => (
          <div
            key={item.label}
            className="p-2 sm:p-3 border-l-2 border-cyan-500/50 pl-3 sm:pl-4 bg-cyan-500/5 rounded-r-md"
          >
            <span className="text-cyan-100 font-semibold text-sm sm:text-base block mb-1">
              {item.label}:
            </span>
            <a
              href={item.href}
              className="text-cyan-200 hover:text-cyan-300 transition-colors text-sm sm:text-base break-all underline decoration-cyan-500/50 hover:decoration-cyan-300/70"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>

      <div className="mb-3 sm:mb-4 p-2 sm:p-3 border-l-2 border-cyan-500/50 pl-3 sm:pl-4 bg-cyan-500/5 rounded-r-md">
        <span className="text-cyan-100 font-semibold text-sm sm:text-base block mb-1">
          Resume:
        </span>
        <a
          href="/burak-saribas-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-300 transition-colors text-sm sm:text-base underline decoration-cyan-500/50 hover:decoration-cyan-300/70"
        >
          <span>📄</span>
          Download Resume
        </a>
      </div>

      <div className="mt-3 sm:mt-4 p-3 sm:p-4 border border-cyan-500/50 bg-cyan-500/10 rounded-md text-center">
        <div className="text-2xl sm:text-3xl mb-2">🚀</div>
        <p className="text-cyan-200 font-medium text-sm sm:text-base">
          Let's build something amazing together!
        </p>
        <p className="text-cyan-300/70 text-xs sm:text-sm mt-1">
          Ready to collaborate on your next project
        </p>
      </div>
    </div>
  );
}

export default ContactWindow;
