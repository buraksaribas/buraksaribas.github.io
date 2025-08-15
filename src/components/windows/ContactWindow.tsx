import { contact } from '../../data/data';

function ContactWindow() {
  return (
    <div className="text-cyan-100 font-['Courier_New',monospace] p-4">
      <div className="mb-4">
        {contact.map((item) => (
          <div key={item.label} className="mb-2 p-2 border-l-2 border-cyan-500/50 pl-4">
            <span className="text-cyan-100 font-semibold">{item.label}:</span><br />
            <a href={item.href} className="text-cyan-200 hover:text-cyan-300 transition-colors font-['Courier_New',monospace]">
              {item.value}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 border border-cyan-500/50 bg-cyan-500/10 rounded-md text-center">
        <p className="text-cyan-200 font-semibold">🚀</p>
      </div>
    </div>
  );
};

export default ContactWindow;
