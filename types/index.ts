// ─── User & Auth ─────────────────────────────────────────────────────────────
export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  rollNumber?: string;
  employeeId?: string;
  semester?: number;
  year?: number;
  phone?: string;
  joinedAt: string;
}

// ─── Academic ─────────────────────────────────────────────────────────────────
export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  faculty: string;
  color: string;
  department: string;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  studentId: string;
}

export interface AttendanceSummary {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  color: string;
}

export interface TimetableSlot {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  faculty: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  color: string;
}

// ─── Assignments ─────────────────────────────────────────────────────────────
export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  facultyId: string;
  facultyName: string;
  dueDate: string;
  createdAt: string;
  maxMarks: number;
  fileUrl?: string;
  fileName?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  submittedAt?: string;
  marks?: number;
  feedback?: string;
}

// ─── Notes ────────────────────────────────────────────────────────────────────
export interface Note {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  facultyId: string;
  facultyName: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  tags: string[];
  isFavorited?: boolean;
  downloads: number;
}

// ─── Events ───────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'hackathon' | 'workshop' | 'seminar' | 'cultural' | 'sports' | 'placement';
  organizer: string;
  venue: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  maxParticipants: number;
  registeredCount: number;
  isRegistered?: boolean;
  image?: string;
  tags: string[];
  hasCertificate: boolean;
}

// ─── Placement ────────────────────────────────────────────────────────────────
export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
}

export interface PlacementDrive {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  role: string;
  type: 'full-time' | 'internship';
  package: string;
  eligibilityCgpa: number;
  eligibilitySemesters: number[];
  registrationDeadline: string;
  driveDate: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  isApplied?: boolean;
  applicationStatus?: 'applied' | 'shortlisted' | 'rejected' | 'selected';
  description: string;
  skills: string[];
}

// ─── Lost & Found ─────────────────────────────────────────────────────────────
export interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  reportedBy: string;
  reporterContact: string;
  image?: string;
  isResolved: boolean;
  createdAt: string;
}

// ─── Marketplace ──────────────────────────────────────────────────────────────
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'books' | 'electronics' | 'furniture' | 'clothing' | 'hostel' | 'other';
  condition: 'new' | 'like-new' | 'good' | 'fair';
  sellerId: string;
  sellerName: string;
  sellerContact: string;
  images: string[];
  isNegotiable: boolean;
  type: 'sell' | 'exchange';
  postedAt: string;
  isAvailable: boolean;
}

// ─── Clubs ────────────────────────────────────────────────────────────────────
export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  icon: string;
  color: string;
  gradient: string;
  isJoined?: boolean;
  president: string;
  events: number;
  foundedYear: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'attendance' | 'assignment' | 'placement' | 'event' | 'announcement' | 'grade';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface Department {
  id: string;
  name: string;
  code: string;
  hodName: string;
  studentCount: number;
  facultyCount: number;
  established: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  year: number;
  cgpa: number;
  attendance: number;
  status: 'active' | 'inactive' | 'graduated';
  joinedAt: string;
  avatar?: string;
}

export interface FacultyRecord {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  subjects: string[];
  experience: number;
  status: 'active' | 'inactive';
  joinedAt: string;
  avatar?: string;
}
