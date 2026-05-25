export interface Student {
  id: number;
  name: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  cgpa: number;
  skills: string[];
  image: string;
  status: 'Active' | 'Inactive';
  motto?: string;
  bio?: string;
  projectTitle?: string;
  completedCredits?: number;
}

export type ThemeMode = 'light' | 'dark';
