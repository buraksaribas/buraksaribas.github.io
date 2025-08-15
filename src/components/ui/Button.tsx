import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'taskbar';
  children: ReactNode;
  isActive?: boolean;
}

function Button({ variant = 'primary', children, isActive, className, ...props }: ButtonProps) {
  const baseStyles = 'transition-all duration-200';
  const variantStyles = {
    primary: 'w-5 h-5 bg-cyan-600/20 border border-cyan-500/50 text-cyan-200 text-xs flex items-center justify-center rounded-full hover:bg-cyan-600 hover:text-black hover:shadow-[0_0_8px_rgba(0,247,255,0.7)]',
    secondary: 'px-2 py-1 bg-cyan-600/10 border border-cyan-500/50 text-cyan-200 text-sm hover:bg-cyan-600/20',
    taskbar: `px-1 py-2 h-12 text-sm font-medium backdrop-blur-sm border ${isActive
      ? 'bg-cyan-600/50 text-white border-cyan-500/30 shadow-lg shadow-cyan-500/20'
      : 'bg-cyan-600/10 text-cyan-200 border-cyan-500/10 hover:bg-cyan-600/20 hover:border-cyan-500/20'
      }`,
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
