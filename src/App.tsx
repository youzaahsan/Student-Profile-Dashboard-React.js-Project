import { useState, useEffect } from 'react';
import { initialStudents } from './data';
import { Student, ThemeMode } from './types';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';
import { GraduationCap, Award, Compass, Heart, Users, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const isDark = theme === 'dark';

  // Synchronize theme state with the html document's background and classes for flawless integration
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#f1f5f9';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [theme]);

  // Handler to toggle active/inactive status
  const handleToggleStatus = (id: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        const nextStatus = student.status === 'Active' ? 'Inactive' : 'Active';
        
        // If the toggled student is currently active in the modal view, update that as well
        if (selectedStudent && selectedStudent.id === id) {
          setSelectedStudent({ ...selectedStudent, status: nextStatus });
        }
        
        return {
          ...student,
          status: nextStatus
        };
      }
      return student;
    }));
  };

  // Toggle app-wide theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const totalCount = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const avgCgpa = students.length > 0
    ? students.reduce((sum, s) => sum + s.cgpa, 0) / students.length
    : 0;

  return (
    <div className={`min-vh-100 d-flex flex-column transition-all-premium ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`} style={{ backgroundColor: isDark ? '#090d16' : '#f8fafc' }}>
      
      {/* Navbar Section */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        totalStudents={totalCount}
        activeCount={activeCount}
      />

      {/* Hero Header Jumbotron */}
      <header className={`py-5 mb-2 position-relative overflow-hidden ${
        isDark 
          ? 'bg-slate-900/40 text-white' 
          : 'bg-white text-slate-800 border-bottom border-slate-200/60'
      }`}>
        {/* Ambient decorative blobs */}
        <div 
          className="position-absolute rounded-circle filter blur-3xl opacity-15"
          style={{
            top: '-60px',
            right: '-40px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%)'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle filter blur-3xl opacity-15"
          style={{
            bottom: '-120px',
            left: '-60px',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(239, 68, 68, 0.4) 100%)'
          }}
        ></div>

        <div className="container position-relative z-1 text-center py-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className={`badge rounded-pill px-3 py-2 mb-3 fw-bold uppercase font-mono tracking-wider ${
              isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-600/10 text-blue-600 border border-blue-600/20'
            }`} style={{ fontSize: '0.75rem' }}>
              Academic Registrar & Performance Ledger
            </span>
            <h1 className="display-4 fw-black tracking-tight mb-2 mb-sm-3 font-sans max-w-4xl mx-auto" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
              Elegance Meets Campus Intelligence
            </h1>
            <p className="lead mx-auto mb-4 text-muted max-w-2xl text-center font-sans" style={{ maxWidth: '640px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              A high performance, interactive academic roster enabling rapid enrollment status toggling, department segmentation, and fully detailed dossier auditing.
            </p>
          </motion.div>

          {/* Aggregate Stats Cards Row inside grid */}
          <div className="row g-3 justify-content-center max-w-2xl mx-auto" style={{ maxWidth: '760px' }}>
            {/* Total Student Count */}
            <div className="col-12 col-sm-4">
              <div className={`p-3 rounded-4 shadow-sm border h-100 transition-all-premium student-card-hover ${
                isDark ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200/50'
              }`}>
                <div className="d-flex align-items-center justify-content-center gap-2 text-primary mb-1.5">
                  <GraduationCap size={16} className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
                  <span className="small text-muted fw-bold uppercase font-mono tracking-wider" style={{ fontSize: '0.72rem' }}>Total Enrolled</span>
                </div>
                <h3 className="fw-extrabold mb-0 text-center font-mono" style={{ fontWeight: 800 }}>{totalCount}</h3>
              </div>
            </div>

            {/* Active Rate */}
            <div className="col-12 col-sm-4">
              <div className={`p-3 rounded-4 shadow-sm border h-100 transition-all-premium student-card-hover ${
                isDark ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200/50'
              }`}>
                <div className="d-flex align-items-center justify-content-center gap-2 text-success mb-1.5">
                  <Users size={16} className="text-emerald-500" />
                  <span className="small text-muted fw-bold uppercase font-mono tracking-wider" style={{ fontSize: '0.72rem' }}>Attendance Rate</span>
                </div>
                <h3 className="fw-extrabold mb-0 text-center text-emerald-500 font-mono" style={{ fontWeight: 800 }}>
                  {totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(0) : 0}%
                </h3>
              </div>
            </div>

            {/* Average GPA */}
            <div className="col-12 col-sm-4">
              <div className={`p-3 rounded-4 shadow-sm border h-100 transition-all-premium student-card-hover ${
                isDark ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200/50'
              }`}>
                <div className="d-flex align-items-center justify-content-center gap-2 text-warning mb-1.5">
                  <Star size={16} className="fill-warning border-0" />
                  <span className="small text-muted fw-bold uppercase font-mono tracking-wider" style={{ fontSize: '0.72rem' }}>Average GPA</span>
                </div>
                <h3 className="fw-extrabold mb-0 text-center text-amber-500 font-mono" style={{ fontWeight: 800 }}>
                  {avgCgpa.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Student Directory Roster Section */}
      <main className="flex-grow-1">
        <StudentList 
          students={students} 
          onToggleStatus={handleToggleStatus}
          onOpenModal={(student) => setSelectedStudent(student)}
          theme={theme}
        />
      </main>

      {/* Smoothly Animated Academic Modal Report Detailer */}
      <AnimatePresence>
        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            theme={theme}
          />
        )}
      </AnimatePresence>

      {/* Decorative Footer */}
      <footer className={`py-4 mt-5 text-center border-top small ${
        isDark ? 'bg-slate-950 border-white/5 text-slate-400' : 'bg-white border-slate-200/50 text-slate-500'
      }`}>
        <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2.5">
          <div className="d-flex align-items-center gap-2">
            <GraduationCap size={18} className="text-secondary" />
            <span>© 2026 Student Profile Dashboard Ledger. All rights reserved.</span>
          </div>
          <div className="d-flex align-items-center gap-1.5 opacity-75 justify-content-center">
            <span>Admin-only Registrar Portal with</span>
            <Heart size={14} className="text-red-500 fill-red-500 border-0" />
            <span>and modern aesthetic values.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
