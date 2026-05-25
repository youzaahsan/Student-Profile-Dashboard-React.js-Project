import { motion } from 'motion/react';
import { Mail, Phone, GraduationCap, Calendar, Star, Award, ChevronRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Student, ThemeMode } from '../types';
import { getSkillColorClass } from './StudentCard';

interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
  theme: ThemeMode;
}

export default function StudentModal({ student, onClose, theme }: StudentModalProps) {
  if (!student) return null;
  const isDark = theme === 'dark';

  // Determine a progress rate or static evaluation based on CGPA
  const cgpaPercentage = (student.cgpa / 4.0) * 100;
  
  // Custom estimated profile badges
  const getAcademicLevel = (cgpa: number) => {
    if (cgpa >= 3.8) return { label: "Summa Cum Laude", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
    if (cgpa >= 3.5) return { label: "Magna Cum Laude", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" };
    if (cgpa >= 3.0) return { label: "Dean's List Honoree", color: "bg-blue-500/10 text-blue-600 dark:text-blue-450 border-blue-500/20" };
    return { label: "First Division State", color: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20" };
  };

  const honor = getAcademicLevel(student.cgpa);

  return (
    <div 
      className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 1050,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
        className={`modal-dialog-custom w-100 max-w-lg mx-3 overflow-hidden rounded-4 shadow-lg ${
          isDark ? 'bg-slate-900 text-slate-150 border border-white/10' : 'bg-white text-slate-800'
        }`}
        style={{ maxWidth: '560px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div 
          className="p-4 position-relative d-flex justify-content-between align-items-start gradient-bar-animate"
          style={{ 
            background: student.status === 'Active'
              ? 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)'
              : 'linear-gradient(135deg, #475569 0%, #64748b 100%)'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-3 border border-white/20 backdrop-blur-sm">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div>
              <h5 className="modal-title fw-bold text-white mb-0" style={{ letterSpacing: '-0.01em', fontSize: '1.2rem' }}>
                Academic Ledger Report
              </h5>
              <span className="small text-white/80 font-mono tracking-wider uppercase">REGISTRAR RECORD PROFILES</span>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white shadow-none" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        {/* Modal Scroll Container */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          
          {/* Identity Card Block */}
          <div className="d-flex flex-column flex-sm-row gap-4 align-items-center align-items-sm-start text-center text-sm-start pb-4 border-bottom border-slate-200/40 dark:border-white/5">
            {/* Avatar image with Status Node */}
            <div className="position-relative">
              <img 
                referrerPolicy="no-referrer"
                src={student.image} 
                alt={student.name} 
                className="rounded-circle border border-4 shadow-md object-cover"
                style={{ width: '100px', height: '100px', borderColor: isDark ? '#1e293b' : '#f1f5f9' }}
              />
              <span 
                className={`position-absolute bottom-0 end-0 rounded-circle border border-2 border-white dark:border-slate-900 ${
                  student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
                style={{ width: '18px', height: '18px' }}
                title={`Status: ${student.status}`}
              ></span>
            </div>

            {/* Basic Identity info */}
            <div className="flex-grow-1">
              <h3 className="fw-black mb-1 text-slate-900 dark:text-white" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {student.name}
              </h3>
              <p className={`text-muted small fw-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {student.department}
              </p>
              
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-sm-start">
                <span className={`badge border rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 ${honor.color}`}>
                  <Sparkles size={11} />
                  {honor.label}
                </span>
                <span className={`badge rounded-pill px-3 py-1.5 fw-semibold ${
                  student.status === 'Active' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                }`}>
                  {student.status.toUpperCase()} STATUS
                </span>
              </div>
            </div>
          </div>

          {/* Student Biography Statement */}
          {student.bio && (
            <div className="py-3 border-bottom border-slate-200/40 dark:border-white/5">
              <h6 className="fw-bold text-uppercase tracking-wider small text-muted mb-2 font-mono">Biography Statement</h6>
              <p className={`small leading-relaxed mb-0 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {student.bio}
              </p>
            </div>
          )}

          {/* Academic Progression details */}
          <div className="py-3">
            <h6 className="fw-bold text-uppercase tracking-wider small text-muted mb-3 font-mono">Academic Metrics Ledger</h6>
            
            <div className="row g-3 mb-3">
              {/* Semester info */}
              <div className="col-12 col-sm-6">
                <div className={`p-3 rounded-3 border d-flex align-items-center gap-2.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <Calendar size={18} className="text-blue-500" />
                  <div>
                    <span className="small text-muted d-block">Academic Year</span>
                    <span className="fw-bold">Semester {student.semester}</span>
                  </div>
                </div>
              </div>

              {/* CGPA display with graphical Progress */}
              <div className="col-12 col-sm-6">
                <div className={`p-3 rounded-3 border d-flex align-items-center gap-2.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <Star size={18} className="fill-warning text-warning border-0" />
                  <div>
                    <span className="small text-muted d-block">Cumulative GPA</span>
                    <span className="fw-bold font-mono text-emerald-500">{student.cgpa.toFixed(2)} / 4.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GPA Bar Meter & completed credit info */}
            <div className="mb-4 p-3 rounded-3 border border-slate-200/40 dark:border-white/5">
              <div className="d-flex justify-content-between align-items-center mb-2 small text-muted font-mono">
                <span className="fw-medium">PROGRESSED CREDITS</span>
                <span className="fw-bold text-success">{student.completedCredits || '—'} / 130 Units</span>
              </div>
              <div className="progress rounded-pill bg-slate-200 dark:bg-slate-800" style={{ height: '8px', overflow: 'hidden' }}>
                <div 
                  className="progress-bar bg-emerald-500 progress-bar-striped progress-bar-animated rounded-pill" 
                  role="progressbar" 
                  style={{ width: `${cgpaPercentage}%` }} 
                  aria-valuenow={cgpaPercentage} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                ></div>
              </div>
            </div>

            {/* Research project showcase */}
            {student.projectTitle && (
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase tracking-wider small text-muted mb-2 font-mono">Active Thesis / Project</h6>
                <div className={`p-3 rounded-3 border d-flex gap-3 align-items-start ${
                  isDark ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-indigo-50/50 border-indigo-100'
                }`}>
                  <BookOpen size={20} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="fw-bold d-block mb-1 text-slate-900 dark:text-white" style={{ fontSize: '0.92rem' }}>
                      {student.projectTitle}
                    </span>
                    <span className="small text-muted">
                      Certified & approved by Academic Committee, Faculty Board.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Official Contact records */}
            <h6 className="fw-bold text-uppercase tracking-wider small text-muted mb-2.5 font-mono">Verified Institutional Contact</h6>
            <div className={`p-3 rounded-3 mb-4 border ${
              isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="d-flex align-items-center gap-3 py-1.5 border-bottom border-slate-250 dark:border-white/5 text-wrap-break-all">
                <Mail size={16} className="text-blue-500 flex-shrink-0" />
                <div>
                  <span className="small text-muted d-block font-sans" style={{ fontSize: '0.75rem' }}>Primary Email</span>
                  <span className={`small fw-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{student.email}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 py-1.5 pt-2.5">
                <Phone size={16} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="small text-muted d-block font-sans" style={{ fontSize: '0.75rem' }}>Registered Phone</span>
                  <span className={`small fw-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{student.phone}</span>
                </div>
              </div>
            </div>

            {/* Detailed Skills Meter */}
            <h6 className="fw-bold text-uppercase tracking-wider small text-muted mb-2.5 font-mono">Major Competencies</h6>
            <div className="d-flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 border ${getSkillColorClass(skill)}`}
                >
                  <Award size={13} />
                  <span className="fw-bold small">{skill}</span>
                  <ChevronRight size={9} className="opacity-50" />
                  <span className="small font-mono fw-normal opacity-75" style={{ fontSize: '0.7rem' }}>Certified</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3.5 d-flex justify-content-end gap-2 border-top ${
          isDark ? 'bg-slate-950 border-white/5' : 'bg-slate-50'
        }`}>
          <button 
            type="button" 
            className={`btn px-4 py-2 rounded-3 fw-bold transition-all-premium ${
              isDark ? 'btn-slate-800 bg-slate-800 hover:bg-slate-700 text-slate-100 border-0' : 'btn-outline-dark border-slate-200'
            }`} 
            onClick={onClose}
          >
            Close Roster Dossier
          </button>
        </div>
      </motion.div>
    </div>
  );
}
