import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Award, ToggleLeft, ToggleRight, Eye, EyeOff, BookOpen, Star, Code, Layers } from 'lucide-react';
import { Student, ThemeMode } from '../types';

interface StudentCardProps {
  key?: any;
  student: Student;
  theme: ThemeMode;
  onToggleStatus: (id: number) => void;
  onOpenModal: (student: Student) => void;
}

export function getSkillColorClass(skill: string): string {
  const normalized = skill.toLowerCase();
  if (normalized.includes('react')) return 'bg-sky-500/10 text-sky-500 border border-sky-500/20';
  if (normalized.includes('javascript') || normalized.includes('js')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
  if (normalized.includes('bootstrap')) return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
  if (normalized.includes('html') || normalized.includes('css')) return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
  if (normalized.includes('python')) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
  if (normalized.includes('sql')) return 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20';
  if (normalized.includes('tensorflow') || normalized.includes('pytorch') || normalized.includes('deep learning')) {
    return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20';
  }
  return 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20';
}

export default function StudentCard({ student, theme, onToggleStatus, onOpenModal }: StudentCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isDark = theme === 'dark';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="col-12 col-md-6 col-lg-4 mb-4"
    >
      <div 
        className={`card h-100 student-card-hover ambient-glow-card ${
          isDark 
            ? 'bg-slate-900/90 text-slate-100 border border-white/10' 
            : 'bg-white text-slate-850 border border-slate-200/60'
        }`}
        style={{ borderRadius: '20px', overflow: 'hidden' }}
      >
        {/* Colorful Gradient Header Decorative Background */}
        <div 
          className="p-3 position-relative"
          style={{ 
            background: student.status === 'Active'
              ? (isDark 
                  ? 'linear-gradient(135deg, rgba(8, 145, 178, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)' 
                  : 'linear-gradient(135deg, rgba(8, 145, 178, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)')
              : (isDark 
                  ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.25) 0%, rgba(148, 163, 184, 0.25) 100%)' 
                  : 'linear-gradient(135deg, rgba(226, 232, 240, 0.6) 0%, rgba(203, 213, 225, 0.6) 100%)'),
            height: '90px'
          }}
        >
          {/* Status Badge with glowing pulse */}
          <span 
            className={`badge position-absolute top-3 end-3 rounded-pill px-3 py-2 shadow-sm fw-bold d-flex align-items-center gap-1.5 ${
              student.status === 'Active' 
                ? 'bg-emerald-500 text-white pulse-badge-success' 
                : 'bg-slate-500 text-white pulse-badge-secondary'
            }`}
            style={{ fontSize: '0.75rem', letterSpacing: '0.03em' }}
          >
            <span 
              className="spinner-grow spinner-grow-sm text-light p-0" 
              role="status" 
              style={{ width: '6px', height: '6px', animationDuration: '1.2s' }}
            ></span>
            {student.status.toUpperCase()}
          </span>
        </div>

        {/* Card Content body */}
        <div className="card-body pt-0 px-4 pb-4 position-relative d-flex flex-column">
          {/* Avatar Container with glowing border on hover */}
          <div className="text-center" style={{ marginTop: '-50px' }}>
            <motion.div className="d-inline-block position-relative">
              <img 
                referrerPolicy="no-referrer"
                src={student.image} 
                alt={student.name} 
                className="rounded-circle border border-4 shadow-md bg-white object-cover"
                style={{ 
                  width: '94px', 
                  height: '94px', 
                  borderColor: isDark ? '#0f172a' : '#ffffff',
                  cursor: 'pointer'
                }}
                onClick={() => onOpenModal(student)}
              />
            </motion.div>
          </div>

          <div className="text-center mt-3 flex-grow-1">
            <h4 
              className={`card-title mb-1 fw-bold cursor-pointer transition-all-premium ${
                isDark ? 'text-white hover:text-cyan-400' : 'text-slate-900 hover:text-blue-600'
              }`}
              style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}
              onClick={() => onOpenModal(student)}
            >
              {student.name}
            </h4>
            <div className={`text-muted small mb-3 fw-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {student.department}
            </div>

            {/* Student Motto / Quote to give personality */}
            {student.motto && (
              <p 
                className={`fst-italic small mb-3.5 px-2 text-center line-clamp-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
                style={{ fontSize: '0.82rem', lineHeight: '1.4' }}
              >
                &ldquo;{student.motto}&rdquo;
              </p>
            )}

            {/* Department and Semester quick info in bento style grid */}
            <div className={`row g-0 rounded-4 mb-3 border ${
              isDark 
                ? 'bg-slate-950/45 border-white/5 text-slate-300' 
                : 'bg-slate-50 border-slate-100 text-slate-700'
            }`}>
              <div className="col-6 py-2.5 border-end border-slate-200/40 dark:border-white/5 text-center">
                <span className="text-muted d-block small mb-0.5 fw-medium">TERM RANK</span>
                <span className={`fw-bold font-mono ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} style={{ fontSize: '1.05rem' }}>
                  {student.semester}th Sem
                </span>
              </div>
              <div className="col-6 py-2.5 text-center">
                <span className="text-muted d-block small mb-0.5 fw-medium">CUMULATIVE GPA</span>
                <span className="fw-bold text-emerald-500 d-flex align-items-center justify-content-center gap-1 font-mono" style={{ fontSize: '1.05rem' }}>
                  <Star size={14} className="fill-warning text-warning border-0" />
                  {student.cgpa.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Conditional Details Section with Smooth Animation */}
            <AnimatePresence>
              {showDetails && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden text-start mb-3 border-top border-slate-200/30 dark:border-white/5 pt-3"
                >
                  <div className="d-flex align-items-center gap-2.5 mb-2.5">
                    <div className={`p-1 rounded bg-blue-500/10 text-blue-500`}>
                      <Mail size={13} />
                    </div>
                    <span className={`small text-truncate-custom ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {student.email}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2.5 mb-3">
                    <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                      <Phone size={13} />
                    </div>
                    <span className="small text-muted">{student.phone}</span>
                  </div>

                  {student.projectTitle && (
                    <div className="mb-3 p-2 rounded-3 bg-indigo-500/5 border border-indigo-500/10">
                      <span className="small d-block text-muted fw-bold mb-1 d-flex align-items-center gap-1">
                        <Code size={13} className="text-indigo-500" />
                        Active Course Project
                      </span>
                      <span className="small fw-semibold">{student.projectTitle}</span>
                    </div>
                  )}

                  {/* Skills Section */}
                  <div className="mt-2.5">
                    <span className="small d-block text-muted fw-bold mb-2 d-flex align-items-center gap-1">
                      <Award size={13} className="text-cyan-500" />
                      CORE COMPETENCY
                    </span>
                    <div className="d-flex flex-wrap gap-1.5">
                      {student.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className={`badge ${getSkillColorClass(skill)} rounded px-2.5 py-1.5 small fw-semibold`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons Container */}
          <div className="d-flex flex-column gap-2 mt-auto pt-3 border-top border-slate-200/20 dark:border-white/5">
            <div className="d-flex gap-2">
              <button 
                className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1.5 py-2 fw-semibold rounded-3 transition-all-premium ${
                  showDetails 
                    ? 'btn-secondary text-white' 
                    : (isDark 
                        ? 'btn-slate-800 bg-slate-800 text-slate-200 border-0 hover:bg-slate-700' 
                        : 'btn-outline-primary border-slate-200 text-primary hover:bg-primary/5')
                }`}
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <EyeOff size={15} />
                    <span>Hide Bio</span>
                  </>
                ) : (
                  <>
                    <Eye size={15} />
                    <span>Quick Specs</span>
                  </>
                )}
              </button>

              <button 
                className={`btn btn-sm d-flex align-items-center justify-content-center px-3 rounded-3 transition-all-premium ${
                  student.status === 'Active' 
                    ? 'btn-outline-danger border-slate-250 hover:bg-danger/5' 
                    : 'btn-outline-success border-slate-250 hover:bg-success/5'
                }`}
                onClick={() => onToggleStatus(student.id)}
                title={`Toggle enrollment to ${student.status === 'Active' ? 'Inactive' : 'Active'}`}
              >
                {student.status === 'Active' ? <ToggleRight size={22} className="text-danger" /> : <ToggleLeft size={22} className="text-success" />}
              </button>
            </div>

            <button 
              className={`btn btn-sm w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-1.5 rounded-3 transition-all-premium border-0 ${
                isDark 
                  ? 'btn-info bg-cyan-400 text-slate-900 hover:bg-cyan-300' 
                  : 'btn-primary bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => onOpenModal(student)}
            >
              <BookOpen size={14} />
              <span>Request Full Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
