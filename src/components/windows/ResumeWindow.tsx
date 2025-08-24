function ResumeWindow() {
  return (
    <div className="text-cyan-100 p-2 sm:p-4">
      {/* PDF Viewer Container */}
      <div className="border border-cyan-500/50 rounded-md overflow-hidden h-[300px] sm:h-[500px] lg:h-[785px]">
        <iframe
          src="/burak-saribas-resume.pdf"
          className="w-full h-full"
          title="Resume PDF"
          loading="lazy"
        />
      </div>

      {/* Mobile: Additional download option at bottom */}
      <div className="block sm:hidden mt-3">
        <div className="flex flex-col sm:flex-row gap-2 text-center">
          <a
            href="/burak-saribas-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 border border-cyan-500 text-cyan-200 hover:bg-cyan-500/20 rounded-md text-sm transition-colors"
          >
            🔗 Open in New Tab
          </a>
          <a
            href="/burak-saribas-resume.pdf"
            download
            className="flex-1 px-3 py-2 border border-cyan-500 text-cyan-200 hover:bg-cyan-500/20 rounded-md text-sm transition-colors"
          >
            💾 Download PDF
          </a>
        </div>

        {/* Help text for mobile users */}
        <div className="mt-2 text-xs text-cyan-300/70 text-center">
          💡 Tip: Use pinch to zoom in the PDF viewer above
        </div>
      </div>

      {/* Desktop: Simple download link */}
      <div className="hidden sm:block mt-3 text-center">
        <a
          href="/burak-saribas-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-200 hover:bg-cyan-500/20 rounded-md text-sm transition-colors"
        >
          <span>📄</span>
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default ResumeWindow;
