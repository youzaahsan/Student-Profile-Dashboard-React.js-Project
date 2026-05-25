import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, RotateCcw, UserCheck, UserX } from 'lucide-react';
import { Student, ThemeMode } from '../types';
import StudentCard from './StudentCard';

interface StudentListProps {
  students: Student[];
  onToggleStatus: (id: number) => void;
  onOpenModal: (student: Student) => void;
  theme: ThemeMode;
}

type SortOption = 'name' | 'cgpa-desc' | 'cgpa-asc' | 'semester';

export default function StudentList({ students, onToggleStatus, onOpenModal, theme }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  
  const isDark = theme === 'dark';

  // Get unique list of departments
  const departments = useMemo(() => {
    const list = students.map(s => s.department);
    return ['All', ...Array.from(new Set(list))];
  }, [students]);

  // Handle resets
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
    setStatusFilter('All');
    setSortBy('name');
  };

  // Filter and Sort calculation
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    // Search filter (name, department, skills)
    if (searchTerm.trim() !== '') {
      const lower = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(lower) || 
        s.department.toLowerCase().includes(lower) ||
        s.skills.some(skill => skill.toLowerCase().includes(lower))
      );
    }

    // Department filter
    if (selectedDepartment !== 'All') {
      result = result.filter(s => s.department === selectedDepartment);
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(s => s.status === statusFilter);
    }

    // Sort By
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'cgpa-desc') {
        return b.cgpa - a.cgpa; // High to Low
      }
      if (sortBy === 'cgpa-asc') {
        return a.cgpa - b.cgpa; // Low to High
      }
      if (sortBy === 'semester') {
        return a.semester - b.semester;
      }
      return 0;
    });

    return result;
  }, [students, searchTerm, selectedDepartment, statusFilter, sortBy]);

  return (
    <div className="container py-4">
      
      {/* Search and Filters Hub */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card p-4 mb-4 border-0 ambient-glow-card transition-all-premium ${
          isDark 
            ? 'bg-slate-900/60 text-slate-100 border border-white/10' 
            : 'bg-white border border-slate-200/60'
        }`}
        style={{ borderRadius: '24px' }}
      >
        <div className="row g-3 align-items-center">
          
          {/* Main search bar */}
          <div className="col-12 col-md-4">
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <Search size={18} className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
              </span>
              <input
                type="text"
                placeholder="Search by name, department, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`form-control ps-5 py-2.5 rounded-3 custom-input-focus transition-all-premium ${
                  isDark ? 'bg-slate-950/50 text-white border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}
                style={{ fontSize: '0.92rem', borderRadius: '12px' }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-sm position-absolute end-0 top-50 translate-middle-y me-2 text-muted hover:text-dark border-0 bg-transparent"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Selector */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="d-flex align-items-center gap-2">
              <Filter size={15} className="text-secondary flex-shrink-0" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`form-select py-2.5 rounded-3 custom-input-focus transition-all-premium ${
                  isDark ? 'bg-slate-950/50 text-white border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}
                style={{ fontSize: '0.92rem', borderRadius: '12px' }}
              >
                <option value="All">All Departments</option>
                {departments.filter(dept => dept !== 'All').map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting Controller */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="d-flex align-items-center gap-2">
              <SlidersHorizontal size={15} className="text-secondary flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={`form-select py-2.5 rounded-3 custom-input-focus transition-all-premium ${
                  isDark ? 'bg-slate-950/50 text-white border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}
                style={{ fontSize: '0.92rem', borderRadius: '12px' }}
              >
                <option value="name">Sort by: Name (A - Z)</option>
                <option value="cgpa-desc">Sort by: CGPA (High to Low)</option>
                <option value="cgpa-asc">Sort by: CGPA (Low to High)</option>
                <option value="semester">Sort by: Semester (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Shortcut */}
          <div className="col-12 col-md-2 text-md-end">
            <button
              onClick={handleResetFilters}
              className={`btn btn-sm py-2.5 px-3 rounded-3 w-100 d-flex align-items-center justify-content-center gap-2 transition-all-premium ${
                isDark 
                  ? 'btn-outline-secondary border-white/15 text-slate-300 hover:bg-white/5' 
                  : 'btn-outline-dark border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              style={{ borderRadius: '12px' }}
            >
              <RotateCcw size={14} />
              <span className="fw-semibold" style={{ fontSize: '0.85rem' }}>Clear All</span>
            </button>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="border-top border-slate-200/30 dark:border-white/5 my-3.5"></div>

        {/* Status Filtering Pills Bar */}
        <div className="d-flex align-items-center flex-wrap gap-2.5">
          <span className="small text-muted fw-bold me-2 uppercase font-mono tracking-wider" style={{ fontSize: '0.75rem' }}>
            Quick Filter Status:
          </span>
          
          <button
            onClick={() => setStatusFilter('All')}
            className={`btn btn-sm px-4 py-2 rounded-pill border-0 transition-all-premium fw-semibold ${
              statusFilter === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : (isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
            }`}
            style={{ fontSize: '0.82rem' }}
          >
            All Enrolled
          </button>

          <button
            onClick={() => setStatusFilter('Active')}
            className={`btn btn-sm px-4 py-2 rounded-pill border-0 d-flex align-items-center gap-1.5 transition-all-premium fw-semibold ${
              statusFilter === 'Active'
                ? 'bg-emerald-500 text-white shadow-sm'
                : (isDark 
                    ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100')
            }`}
            style={{ fontSize: '0.82rem' }}
          >
            <UserCheck size={14} />
            <span>Active Enrolled</span>
          </button>

          <button
            onClick={() => setStatusFilter('Inactive')}
            className={`btn btn-sm px-4 py-2 rounded-pill border-0 d-flex align-items-center gap-1.5 transition-all-premium fw-semibold ${
              statusFilter === 'Inactive'
                ? 'bg-slate-500 text-white shadow-sm'
                : (isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-250')
            }`}
            style={{ fontSize: '0.82rem' }}
          >
            <UserX size={14} />
            <span>Inactive Roster</span>
          </button>
        </div>
      </motion.div>

      {/* Grid List displaying filtered metrics */}
      <div className="mb-3.5 d-flex align-items-center justify-content-between">
        <span className="text-secondary small fw-bold font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
          Database Query Result: {filteredAndSortedStudents.length} of {students.length} Student Profiles
        </span>
      </div>

      <motion.div layout className="row">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedStudents.length > 0 ? (
            filteredAndSortedStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                theme={theme}
                onToggleStatus={onToggleStatus}
                onOpenModal={onOpenModal}
              />
            ))
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="col-12 py-5 text-center"
            >
              <div 
                className={`card p-5 max-w-md mx-auto ambient-glow-card border-0 ${
                  isDark ? 'bg-slate-900 border border-white/5' : 'bg-white border border-slate-200/60'
                }`} 
                style={{ borderRadius: '24px', maxWidth: '480px' }}
              >
                <div className="p-3 bg-slate-500/10 rounded-circle d-inline-block mx-auto mb-3 text-muted">
                  <Search size={36} />
                </div>
                <h4 className="fw-extrabold text-slate-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>
                  No Profiles Match Your Query
                </h4>
                <p className="text-muted mb-4 small px-2">
                  Try tweaking search keywords, choosing a different academic department, or removing status parameters.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="btn btn-primary bg-blue-600 border-0 px-4 py-2.5 rounded-pill shadow-sm fw-bold transition-all-premium"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
