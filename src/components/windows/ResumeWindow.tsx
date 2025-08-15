function ResumeWindow() {
  return (
    <div className="text-cyan-100 p-4">
      <div className="border border-cyan-500/50 rounded-md overflow-hidden h-[785px]">
        <iframe
          src={'/burak-saribas-resume.pdf'}
          className="w-full h-full"
          title="Resume PDF"
        />
      </div>
    </div>
  );
};

export default ResumeWindow;
