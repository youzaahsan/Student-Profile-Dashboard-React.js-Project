import { Sun, Moon, GraduationCap, Users } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  totalStudents: number;
  activeCount: number;
}

export default function Navbar({ theme, toggleTheme, totalStudents, activeCount }: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <nav 
      className={`navbar navbar-expand-lg sticky-top transition-all-premium ${
        isDark 
          ? 'navbar-dark bg-dark/80 border-bottom border-white/10' 
          : 'navbar-light bg-white/85 border-bottom border-slate-200/80'
      } shadow-sm backdrop-blur-md`}
      style={{ zIndex: 1040 }}
    >
      <div className="container py-1.5">
        <span className="navbar-brand d-flex align-items-center gap-2.5 fw-bold fs-4 m-0 transition-all-premium hover:opacity-90">
          <div className={`p-2 rounded-3 d-flex align-items-center justify-content-center ${
            isDark ? 'bg-cyan-500/10' : 'bg-blue-600/10'
          }`}>
            <GraduationCap 
              size={26} 
              className={isDark ? 'text-info' : 'text-primary'} 
            />
          </div>
          <span className={`tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ fontWeight: 800 }}>
            Student<span className={isDark ? 'text-cyan-400' : 'text-blue-600'}>Ledger</span>
          </span>
        </span>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Metrics & Interactive Actions in Navbar */}
          <div className="ms-auto d-flex align-items-center flex-wrap gap-3 mt-3 mt-lg-0">
            
            {/* Elegant pill indicator */}
            <div className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
              isDark 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              <Users size={15} />
              <span className="fs-7 fw-semibold tracking-wide uppercase font-mono">
                {activeCount} / {totalStudents} Enrolled
              </span>
            </div>

            {/* Premium toggle theme item */}
            <button
              onClick={toggleTheme}
              className={`btn d-flex align-items-center gap-2 px-3.5 py-2 rounded-pill shadow-inner border transition-all-premium ${
                isDark 
                  ? 'btn-dark bg-slate-900 border-white/10 hover:border-cyan-400/40' 
                  : 'btn-light bg-slate-100 border-slate-200 hover:border-blue-600/40'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <div className="text-warning d-flex align-items-center justify-content-center bg-warning/10 p-1 rounded-circle" style={{ animation: 'spin 12s linear infinite' }}>
                    <Sun size={15} />
                  </div>
                  <span className="small text-white/95 fw-semibold font-sans">Solar View</span>
                </>
              ) : (
                <>
                  <div className="text-indigo-600 d-flex align-items-center justify-content-center bg-indigo-50 p-1 rounded-circle">
                    <Moon size={15} />
                  </div>
                  <span className="small text-slate-800 fw-semibold font-sans">Cosmic View</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
