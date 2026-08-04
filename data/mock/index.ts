import {
  AttendanceSummary, TimetableSlot, Assignment, Note, Event,
  PlacementDrive, LostFoundItem, MarketplaceItem, Club,
  Notification, StudentRecord, FacultyRecord, Department, ChartDataPoint
} from '@/types';

// ─── Attendance ───────────────────────────────────────────────────────────────
export const mockAttendanceSummary: AttendanceSummary[] = [
  { subjectId: '1', subjectName: 'Data Structures & Algorithms', subjectCode: 'CS301', totalClasses: 42, attended: 38, percentage: 90, color: '#6366f1' },
  { subjectId: '2', subjectName: 'Computer Networks', subjectCode: 'CS302', totalClasses: 38, attended: 26, percentage: 68, color: '#8b5cf6' },
  { subjectId: '3', subjectName: 'Database Management Systems', subjectCode: 'CS303', totalClasses: 40, attended: 34, percentage: 85, color: '#06b6d4' },
  { subjectId: '4', subjectName: 'Operating Systems', subjectCode: 'CS304', totalClasses: 36, attended: 24, percentage: 67, color: '#10b981' },
  { subjectId: '5', subjectName: 'Software Engineering', subjectCode: 'CS305', totalClasses: 30, attended: 28, percentage: 93, color: '#f59e0b' },
  { subjectId: '6', subjectName: 'Machine Learning', subjectCode: 'CS306', totalClasses: 28, attended: 18, percentage: 64, color: '#ef4444' },
];

export const mockAttendanceCalendar = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 6, i + 1);
  const day = date.getDay();
  if (day === 0 || day === 6) return { date: date.toISOString().split('T')[0], status: 'holiday' as const };
  const rand = Math.random();
  return {
    date: date.toISOString().split('T')[0],
    status: rand > 0.85 ? 'absent' as const : rand > 0.75 ? 'late' as const : 'present' as const,
  };
});

export const mockAttendanceMonthly: ChartDataPoint[] = [
  { name: 'Jan', value: 88 }, { name: 'Feb', value: 82 }, { name: 'Mar', value: 91 },
  { name: 'Apr', value: 76 }, { name: 'May', value: 85 }, { name: 'Jun', value: 79 },
  { name: 'Jul', value: 83 },
];

// ─── Timetable ────────────────────────────────────────────────────────────────
export const mockTimetable: TimetableSlot[] = [
  { id: '1', subjectId: '1', subjectName: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Anjali Sharma', room: 'A-201', day: 'Monday', startTime: '09:00', endTime: '10:00', color: '#6366f1' },
  { id: '2', subjectId: '2', subjectName: 'Computer Networks', subjectCode: 'CS302', faculty: 'Prof. Ravi Kumar', room: 'B-102', day: 'Monday', startTime: '10:00', endTime: '11:00', color: '#8b5cf6' },
  { id: '3', subjectId: '3', subjectName: 'DBMS', subjectCode: 'CS303', faculty: 'Dr. Priya Nair', room: 'C-305', day: 'Monday', startTime: '11:30', endTime: '12:30', color: '#06b6d4' },
  { id: '4', subjectId: '4', subjectName: 'Operating Systems', subjectCode: 'CS304', faculty: 'Prof. Vikram Singh', room: 'A-101', day: 'Tuesday', startTime: '09:00', endTime: '10:00', color: '#10b981' },
  { id: '5', subjectId: '1', subjectName: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Anjali Sharma', room: 'Lab-3', day: 'Tuesday', startTime: '10:00', endTime: '12:00', color: '#6366f1' },
  { id: '6', subjectId: '5', subjectName: 'Software Engineering', subjectCode: 'CS305', faculty: 'Dr. Meera Pillai', room: 'A-204', day: 'Wednesday', startTime: '09:00', endTime: '10:00', color: '#f59e0b' },
  { id: '7', subjectId: '6', subjectName: 'Machine Learning', subjectCode: 'CS306', faculty: 'Prof. Arjun Das', room: 'AI-Lab', day: 'Wednesday', startTime: '10:00', endTime: '12:00', color: '#ef4444' },
  { id: '8', subjectId: '2', subjectName: 'Computer Networks', subjectCode: 'CS302', faculty: 'Prof. Ravi Kumar', room: 'Net-Lab', day: 'Thursday', startTime: '09:00', endTime: '11:00', color: '#8b5cf6' },
  { id: '9', subjectId: '3', subjectName: 'DBMS', subjectCode: 'CS303', faculty: 'Dr. Priya Nair', room: 'C-305', day: 'Thursday', startTime: '11:30', endTime: '12:30', color: '#06b6d4' },
  { id: '10', subjectId: '4', subjectName: 'Operating Systems', subjectCode: 'CS304', faculty: 'Prof. Vikram Singh', room: 'A-101', day: 'Friday', startTime: '09:00', endTime: '10:00', color: '#10b981' },
  { id: '11', subjectId: '5', subjectName: 'Software Engineering', subjectCode: 'CS305', faculty: 'Dr. Meera Pillai', room: 'A-204', day: 'Friday', startTime: '10:00', endTime: '11:00', color: '#f59e0b' },
  { id: '12', subjectId: '6', subjectName: 'Machine Learning', subjectCode: 'CS306', faculty: 'Prof. Arjun Das', room: 'A-302', day: 'Saturday', startTime: '09:00', endTime: '10:00', color: '#ef4444' },
];

// ─── Assignments ──────────────────────────────────────────────────────────────
export const mockAssignments: Assignment[] = [
  { id: '1', title: 'Implement AVL Tree with Rotations', description: 'Implement a fully functional AVL tree with insertion, deletion, and all rotation cases. Include test cases.', subjectId: '1', subjectName: 'Data Structures', subjectCode: 'CS301', facultyId: 'f1', facultyName: 'Dr. Anjali Sharma', dueDate: '2025-07-28T23:59:00', createdAt: '2025-07-15T10:00:00', maxMarks: 20, status: 'submitted', submittedAt: '2025-07-27T18:30:00', marks: 18, feedback: 'Excellent implementation! Minor edge case missed in deletion.' },
  { id: '2', title: 'Simulate TCP Three-Way Handshake', description: 'Write a program to simulate TCP connection establishment and termination using socket programming.', subjectId: '2', subjectName: 'Computer Networks', subjectCode: 'CS302', facultyId: 'f2', facultyName: 'Prof. Ravi Kumar', dueDate: '2025-08-05T23:59:00', createdAt: '2025-07-20T09:00:00', maxMarks: 25, status: 'pending' },
  { id: '3', title: 'ER Diagram for Hospital Management', description: 'Design a comprehensive ER diagram for a hospital management system and normalize to 3NF.', subjectId: '3', subjectName: 'DBMS', subjectCode: 'CS303', facultyId: 'f3', facultyName: 'Dr. Priya Nair', dueDate: '2025-07-20T23:59:00', createdAt: '2025-07-10T11:00:00', maxMarks: 15, status: 'graded', submittedAt: '2025-07-19T22:00:00', marks: 14 },
  { id: '4', title: 'Process Scheduling Algorithms', description: 'Implement FCFS, SJF, Priority Scheduling, and Round Robin. Compare performance using Gantt charts.', subjectId: '4', subjectName: 'Operating Systems', subjectCode: 'CS304', facultyId: 'f4', facultyName: 'Prof. Vikram Singh', dueDate: '2025-08-10T23:59:00', createdAt: '2025-07-22T08:00:00', maxMarks: 30, status: 'pending' },
  { id: '5', title: 'UML Diagrams for E-commerce App', description: 'Create complete UML diagrams (use case, class, sequence, activity) for an e-commerce platform.', subjectId: '5', subjectName: 'Software Engineering', subjectCode: 'CS305', facultyId: 'f5', facultyName: 'Dr. Meera Pillai', dueDate: '2025-07-18T23:59:00', createdAt: '2025-07-08T10:00:00', maxMarks: 20, status: 'late' },
  { id: '6', title: 'Linear Regression from Scratch', description: 'Implement linear and polynomial regression using only NumPy. Include visualization with Matplotlib.', subjectId: '6', subjectName: 'Machine Learning', subjectCode: 'CS306', facultyId: 'f6', facultyName: 'Prof. Arjun Das', dueDate: '2025-08-15T23:59:00', createdAt: '2025-07-25T09:00:00', maxMarks: 35, status: 'pending' },
];

// ─── Notes ────────────────────────────────────────────────────────────────────
export const mockNotes: Note[] = [
  { id: '1', title: 'AVL Trees & Red-Black Trees', description: 'Complete notes on self-balancing BSTs with visual examples and complexity analysis', subjectId: '1', subjectName: 'Data Structures', subjectCode: 'CS301', facultyId: 'f1', facultyName: 'Dr. Anjali Sharma', fileUrl: '#', fileName: 'AVL_RedBlack_Trees.pdf', fileSize: '2.4 MB', uploadedAt: '2025-07-10T10:00:00', tags: ['trees', 'balancing', 'algorithms'], downloads: 234, isFavorited: true },
  { id: '2', title: 'OSI Model & TCP/IP Stack', description: 'Comprehensive notes on network layers, protocols, and encapsulation with diagrams', subjectId: '2', subjectName: 'Computer Networks', subjectCode: 'CS302', facultyId: 'f2', facultyName: 'Prof. Ravi Kumar', fileUrl: '#', fileName: 'OSI_TCPIP.pdf', fileSize: '3.1 MB', uploadedAt: '2025-07-12T11:00:00', tags: ['networking', 'protocols', 'OSI'], downloads: 312, isFavorited: false },
  { id: '3', title: 'SQL Joins & Subqueries', description: 'Detailed examples of all SQL join types, subqueries, and aggregate functions', subjectId: '3', subjectName: 'DBMS', subjectCode: 'CS303', facultyId: 'f3', facultyName: 'Dr. Priya Nair', fileUrl: '#', fileName: 'SQL_Joins_Subqueries.pdf', fileSize: '1.8 MB', uploadedAt: '2025-07-08T09:00:00', tags: ['SQL', 'joins', 'database'], downloads: 421, isFavorited: true },
  { id: '4', title: 'Process Management & Deadlocks', description: 'Notes on process states, PCB, scheduling algorithms, and deadlock prevention', subjectId: '4', subjectName: 'Operating Systems', subjectCode: 'CS304', facultyId: 'f4', facultyName: 'Prof. Vikram Singh', fileUrl: '#', fileName: 'Process_Deadlocks.pdf', fileSize: '2.9 MB', uploadedAt: '2025-07-15T10:00:00', tags: ['processes', 'deadlocks', 'scheduling'], downloads: 189, isFavorited: false },
  { id: '5', title: 'Agile & Scrum Framework', description: 'Complete guide to Agile methodology, Scrum ceremonies, and sprint planning', subjectId: '5', subjectName: 'Software Engineering', subjectCode: 'CS305', facultyId: 'f5', facultyName: 'Dr. Meera Pillai', fileUrl: '#', fileName: 'Agile_Scrum.pdf', fileSize: '1.5 MB', uploadedAt: '2025-07-05T14:00:00', tags: ['agile', 'scrum', 'methodology'], downloads: 276, isFavorited: false },
  { id: '6', title: 'Neural Networks & Backpropagation', description: 'Mathematical derivation of backprop with practical PyTorch examples', subjectId: '6', subjectName: 'Machine Learning', subjectCode: 'CS306', facultyId: 'f6', facultyName: 'Prof. Arjun Das', fileUrl: '#', fileName: 'Neural_Networks.pdf', fileSize: '4.2 MB', uploadedAt: '2025-07-18T10:00:00', tags: ['deep learning', 'neural networks', 'backprop'], downloads: 518, isFavorited: true },
];

// ─── Events ───────────────────────────────────────────────────────────────────
export const mockEvents: Event[] = [
  { id: '1', title: 'HackSphere 2025', description: '36-hour national hackathon with ₹2L prize pool. Build solutions for real-world problems in healthcare, education, and sustainability.', category: 'hackathon', organizer: 'Coding Club', venue: 'Main Auditorium & Labs', startDate: '2025-08-15T09:00:00', endDate: '2025-08-16T21:00:00', registrationDeadline: '2025-08-10T23:59:00', maxParticipants: 500, registeredCount: 342, isRegistered: true, tags: ['coding', 'innovation', 'prizes'], hasCertificate: true },
  { id: '2', title: 'AI & ML Workshop Series', description: 'A 3-day hands-on workshop series covering Deep Learning, NLP, and Computer Vision with industry experts from Google & Microsoft.', category: 'workshop', organizer: 'AI Club & CSE Dept.', venue: 'AI Laboratory, Block C', startDate: '2025-08-20T10:00:00', endDate: '2025-08-22T17:00:00', registrationDeadline: '2025-08-18T23:59:00', maxParticipants: 100, registeredCount: 87, isRegistered: false, tags: ['AI', 'ML', 'workshop'], hasCertificate: true },
  { id: '3', title: 'Annual Tech Symposium', description: 'National-level technical symposium with paper presentations, coding contests, and robotics events. Open to all engineering students.', category: 'seminar', organizer: 'Technical Committee', venue: 'College Campus', startDate: '2025-09-05T09:00:00', endDate: '2025-09-07T18:00:00', registrationDeadline: '2025-08-25T23:59:00', maxParticipants: 2000, registeredCount: 1245, isRegistered: false, tags: ['technical', 'symposium', 'national'], hasCertificate: true },
  { id: '4', title: 'Campus Cultural Fest "Utsav"', description: 'Annual cultural extravaganza with dance, music, drama, and art competitions. Two days of celebration and talent showcase.', category: 'cultural', organizer: 'Cultural Committee', venue: 'Open Air Theatre', startDate: '2025-09-20T18:00:00', endDate: '2025-09-21T22:00:00', registrationDeadline: '2025-09-15T23:59:00', maxParticipants: 5000, registeredCount: 3200, isRegistered: true, tags: ['cultural', 'music', 'dance'], hasCertificate: false },
  { id: '5', title: 'Google Cloud Study Jams', description: 'Free Google Cloud training sessions with hands-on labs. Complete all labs to earn official Google certification.', category: 'workshop', organizer: 'GDSC Chapter', venue: 'Online + Computer Lab 2', startDate: '2025-08-25T10:00:00', endDate: '2025-09-10T17:00:00', registrationDeadline: '2025-08-24T23:59:00', maxParticipants: 200, registeredCount: 156, isRegistered: true, tags: ['cloud', 'Google', 'certification'], hasCertificate: true },
];

// ─── Placement ────────────────────────────────────────────────────────────────
export const mockPlacementDrives: PlacementDrive[] = [
  { id: '1', companyId: 'c1', companyName: 'Google', companyLogo: '🔵', role: 'Software Engineer', type: 'full-time', package: '45 LPA', eligibilityCgpa: 8.0, eligibilitySemesters: [7, 8], registrationDeadline: '2025-08-20T23:59:00', driveDate: '2025-08-28T09:00:00', venue: 'Main Auditorium', status: 'upcoming', isApplied: true, applicationStatus: 'shortlisted', description: 'Join Google as a Software Engineer. Work on products used by billions. Roles in SWE, SRE, and Infrastructure.', skills: ['DSA', 'System Design', 'Python/Java', 'Problem Solving'] },
  { id: '2', companyId: 'c2', companyName: 'Microsoft', companyLogo: '🟦', role: 'SDE Intern', type: 'internship', package: '80K/month', eligibilityCgpa: 7.5, eligibilitySemesters: [5, 6, 7], registrationDeadline: '2025-08-15T23:59:00', driveDate: '2025-08-22T10:00:00', venue: 'Online', status: 'upcoming', isApplied: false, description: '6-month internship program at Microsoft. Work on real products like Azure, Office, or Teams.', skills: ['C++/C#', 'DSA', 'OOP', 'Azure basics'] },
  { id: '3', companyId: 'c3', companyName: 'Amazon', companyLogo: '🟠', role: 'SDE-1', type: 'full-time', package: '32 LPA', eligibilityCgpa: 7.0, eligibilitySemesters: [7, 8], registrationDeadline: '2025-07-30T23:59:00', driveDate: '2025-08-05T09:00:00', venue: 'Main Auditorium', status: 'completed', isApplied: true, applicationStatus: 'rejected', description: 'Software Development Engineer role at Amazon. Work in a dynamic environment building scalable solutions.', skills: ['Java', 'AWS', 'System Design', 'Leadership Principles'] },
  { id: '4', companyId: 'c4', companyName: 'Infosys', companyLogo: '🟢', role: 'Systems Engineer', type: 'full-time', package: '6.5 LPA', eligibilityCgpa: 6.5, eligibilitySemesters: [7, 8], registrationDeadline: '2025-09-01T23:59:00', driveDate: '2025-09-10T09:00:00', venue: 'College Campus', status: 'upcoming', isApplied: false, description: 'Join Infosys as a Systems Engineer. Training program provided. Work across various technology domains.', skills: ['Any Programming Language', 'Basic Networking', 'Communication'] },
  { id: '5', companyId: 'c5', companyName: 'Flipkart', companyLogo: '🛒', role: 'SDE Intern', type: 'internship', package: '60K/month', eligibilityCgpa: 7.5, eligibilitySemesters: [5, 6], registrationDeadline: '2025-08-25T23:59:00', driveDate: '2025-09-02T10:00:00', venue: 'Online', status: 'upcoming', isApplied: true, applicationStatus: 'applied', description: 'Summer internship at Flipkart. Work with experienced engineers on live e-commerce platform challenges.', skills: ['Java/Python', 'DSA', 'System Design', 'SQL'] },
];

// ─── Lost & Found ─────────────────────────────────────────────────────────────
export const mockLostFound: LostFoundItem[] = [
  { id: '1', type: 'lost', title: 'Black HP Laptop Bag', description: 'Lost my black HP laptop bag near the library. Contains HP laptop, charger, and some notebooks. Please contact if found.', category: 'Electronics', location: 'Main Library', date: '2025-07-28', reportedBy: 'Rahul Sharma', reporterContact: '9876543210', isResolved: false, createdAt: '2025-07-28T14:00:00' },
  { id: '2', type: 'found', title: 'Samsung Galaxy Watch', description: 'Found a Samsung Galaxy Watch in the cafeteria. Watch is in good condition. Please describe it to claim.', category: 'Electronics', location: 'College Cafeteria', date: '2025-07-27', reportedBy: 'Priya Menon', reporterContact: '9876543211', isResolved: false, createdAt: '2025-07-27T12:30:00' },
  { id: '3', type: 'lost', title: 'Student ID Card', description: 'Lost my student ID card. Name: Arjun Patel, Roll No: CS2021045. Please drop it at the administrative office.', category: 'Documents', location: 'Sports Complex', date: '2025-07-25', reportedBy: 'Arjun Patel', reporterContact: '9876543212', isResolved: false, createdAt: '2025-07-25T16:00:00' },
  { id: '4', type: 'found', title: 'Blue JanSport Backpack', description: 'Found a blue JanSport backpack near the basketball court. Contains water bottle and some textbooks.', category: 'Bags', location: 'Sports Complex', date: '2025-07-24', reportedBy: 'Kavya Nair', reporterContact: '9876543213', isResolved: true, createdAt: '2025-07-24T17:00:00' },
  { id: '5', type: 'lost', title: 'Calculator (Casio fx-991)', description: 'Scientific calculator lost during the mathematics exam. Has my name written on the back.', category: 'Stationery', location: 'Exam Hall B', date: '2025-07-22', reportedBy: 'Deepak Kumar', reporterContact: '9876543214', isResolved: false, createdAt: '2025-07-22T11:00:00' },
];

// ─── Marketplace ──────────────────────────────────────────────────────────────
export const mockMarketplace: MarketplaceItem[] = [
  { id: '1', title: 'GATE CS 2024 Preparation Books', description: 'Complete set of 8 GATE CS books. Includes MADE EASY notes, previous year questions, and reference books. Used for 1 year.', price: 1200, category: 'books', condition: 'good', sellerId: 's1', sellerName: 'Neha Gupta', sellerContact: '9876543220', images: [], isNegotiable: true, type: 'sell', postedAt: '2025-07-25T10:00:00', isAvailable: true },
  { id: '2', title: 'Dell Inspiron 15 Laptop (2022)', description: 'Dell Inspiron 15, Intel i5-12th Gen, 16GB RAM, 512GB SSD. Excellent condition, no scratches. Selling due to upgrade.', price: 45000, category: 'electronics', condition: 'like-new', sellerId: 's2', sellerName: 'Rohit Verma', sellerContact: '9876543221', images: [], isNegotiable: true, type: 'sell', postedAt: '2025-07-24T09:00:00', isAvailable: true },
  { id: '3', title: 'Study Table + Chair', description: 'Wooden study table (4x2 ft) with adjustable chair. Good condition. Selling as I am shifting hostel.', price: 2500, category: 'furniture', condition: 'good', sellerId: 's3', sellerName: 'Ankita Shah', sellerContact: '9876543222', images: [], isNegotiable: false, type: 'sell', postedAt: '2025-07-23T15:00:00', isAvailable: true },
  { id: '4', title: 'Engineering Drawing Instruments', description: 'Complete set of engineering drawing instruments. Barely used, like new condition. Looking to exchange for Data Structures book.', price: 800, category: 'other', condition: 'like-new', sellerId: 's4', sellerName: 'Vivek Pandey', sellerContact: '9876543223', images: [], isNegotiable: true, type: 'exchange', postedAt: '2025-07-22T11:00:00', isAvailable: true },
  { id: '5', title: 'JBL Bluetooth Speaker', description: 'JBL Go 3 speaker in mint condition. Bought 3 months ago. Comes with original box and charging cable.', price: 1800, category: 'electronics', condition: 'like-new', sellerId: 's5', sellerName: 'Meghna Joshi', sellerContact: '9876543224', images: [], isNegotiable: false, type: 'sell', postedAt: '2025-07-21T14:00:00', isAvailable: true },
  { id: '6', title: 'Mini Refrigerator (Hostel)', description: 'Small 30L fridge perfect for hostel. Working condition, cleaned. Great for storing medicine and snacks.', price: 3500, category: 'hostel', condition: 'fair', sellerId: 's6', sellerName: 'Kiran Reddy', sellerContact: '9876543225', images: [], isNegotiable: true, type: 'sell', postedAt: '2025-07-20T10:00:00', isAvailable: true },
];

// ─── Clubs ────────────────────────────────────────────────────────────────────
export const mockClubs: Club[] = [
  { id: '1', name: 'CodeSphere', description: 'The premier coding club. Competitive programming, hackathons, open source, and tech talks. Building the next generation of engineers.', category: 'Technical', memberCount: 342, icon: '💻', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600', isJoined: true, president: 'Aditya Rao', events: 24, foundedYear: 2018 },
  { id: '2', name: 'AI Nexus', description: 'Exploring artificial intelligence, machine learning, and data science. Regular workshops, paper readings, and project building sessions.', category: 'Technical', memberCount: 218, icon: '🤖', color: '#06b6d4', gradient: 'from-cyan-500 to-blue-600', isJoined: true, president: 'Shreya Iyer', events: 18, foundedYear: 2020 },
  { id: '3', name: 'Robotics & Automation', description: 'Build robots, drones, and IoT projects. Participate in national robotics competitions and autonomous systems challenges.', category: 'Technical', memberCount: 156, icon: '🦾', color: '#10b981', gradient: 'from-emerald-500 to-teal-600', isJoined: false, president: 'Harsh Mehta', events: 12, foundedYear: 2019 },
  { id: '4', name: 'Lens & Light', description: 'Photography and videography club. Learn composition, editing, portrait, and event photography. Monthly photo walks and contests.', category: 'Creative', memberCount: 189, icon: '📸', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', isJoined: false, president: 'Pooja Desai', events: 20, foundedYear: 2017 },
  { id: '5', name: 'Sports & Fitness', description: 'Cricket, football, basketball, badminton, and more. Regular training sessions, inter-college tournaments, and sports events.', category: 'Sports', memberCount: 512, icon: '⚽', color: '#ef4444', gradient: 'from-red-500 to-rose-600', isJoined: false, president: 'Suresh Kumar', events: 32, foundedYear: 2015 },
  { id: '6', name: 'Debate & MUN', description: 'Sharpen your critical thinking and public speaking. Regular debates, Model UN conferences, and elocution competitions.', category: 'Cultural', memberCount: 134, icon: '🎤', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600', isJoined: false, president: 'Nidhi Sharma', events: 16, foundedYear: 2016 },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: '1', title: 'Low Attendance Alert', message: 'Your attendance in Machine Learning (CS306) has dropped to 64%. Minimum required is 75%.', type: 'attendance', isRead: false, createdAt: '2025-07-29T10:00:00' },
  { id: '2', title: 'Assignment Graded', message: 'Your ER Diagram assignment in DBMS has been graded. You scored 14/15. View feedback now.', type: 'grade', isRead: false, createdAt: '2025-07-28T16:30:00' },
  { id: '3', title: 'Google Shortlist', message: 'Congratulations! You have been shortlisted for the Google SWE Drive. Interview scheduled for Aug 28.', type: 'placement', isRead: false, createdAt: '2025-07-28T09:00:00' },
  { id: '4', title: 'HackSphere Registration Confirmed', message: 'Your registration for HackSphere 2025 is confirmed. Team code: HSP-4521. Good luck!', type: 'event', isRead: true, createdAt: '2025-07-27T14:00:00' },
  { id: '5', title: 'New Assignment Posted', message: 'Dr. Anjali Sharma posted a new assignment: "Implement AVL Tree with Rotations" due Jul 28.', type: 'assignment', isRead: true, createdAt: '2025-07-25T11:00:00' },
  { id: '6', title: 'Holiday Announcement', message: 'College will remain closed on August 15th (Independence Day). All scheduled classes are cancelled.', type: 'announcement', isRead: true, createdAt: '2025-07-24T10:00:00' },
  { id: '7', title: 'Attendance Marked', message: 'Attendance marked as Present for Data Structures (CS301) - July 29, 9:00 AM.', type: 'attendance', isRead: true, createdAt: '2025-07-29T09:05:00' },
];

// ─── Admin: Students ──────────────────────────────────────────────────────────
export const mockStudents: StudentRecord[] = [
  { id: 's1', name: 'Aarav Sharma', email: 'aarav.sharma@edusphere.edu', rollNumber: 'CS2021001', department: 'Computer Science', semester: 7, year: 4, cgpa: 8.9, attendance: 88, status: 'active', joinedAt: '2021-07-15' },
  { id: 's2', name: 'Priya Nair', email: 'priya.nair@edusphere.edu', rollNumber: 'CS2021002', department: 'Computer Science', semester: 7, year: 4, cgpa: 9.2, attendance: 92, status: 'active', joinedAt: '2021-07-15' },
  { id: 's3', name: 'Rohan Gupta', email: 'rohan.gupta@edusphere.edu', rollNumber: 'CS2021003', department: 'Computer Science', semester: 7, year: 4, cgpa: 7.5, attendance: 72, status: 'active', joinedAt: '2021-07-15' },
  { id: 's4', name: 'Ananya Patel', email: 'ananya.patel@edusphere.edu', rollNumber: 'EC2021001', department: 'Electronics', semester: 7, year: 4, cgpa: 8.1, attendance: 85, status: 'active', joinedAt: '2021-07-15' },
  { id: 's5', name: 'Karan Mehta', email: 'karan.mehta@edusphere.edu', rollNumber: 'ME2022001', department: 'Mechanical', semester: 5, year: 3, cgpa: 7.8, attendance: 79, status: 'active', joinedAt: '2022-07-15' },
  { id: 's6', name: 'Sneha Iyer', email: 'sneha.iyer@edusphere.edu', rollNumber: 'CS2020001', department: 'Computer Science', semester: 8, year: 4, cgpa: 9.5, attendance: 95, status: 'active', joinedAt: '2020-07-15' },
  { id: 's7', name: 'Vikram Singh', email: 'vikram.singh@edusphere.edu', rollNumber: 'CI2021001', department: 'Civil', semester: 7, year: 4, cgpa: 6.9, attendance: 68, status: 'active', joinedAt: '2021-07-15' },
  { id: 's8', name: 'Deepika Rao', email: 'deepika.rao@edusphere.edu', rollNumber: 'CS2023001', department: 'Computer Science', semester: 3, year: 2, cgpa: 8.7, attendance: 91, status: 'active', joinedAt: '2023-07-15' },
];

// ─── Admin: Faculty ───────────────────────────────────────────────────────────
export const mockFaculty: FacultyRecord[] = [
  { id: 'f1', name: 'Dr. Anjali Sharma', email: 'anjali.sharma@edusphere.edu', employeeId: 'FAC001', department: 'Computer Science', designation: 'Professor', subjects: ['Data Structures', 'Algorithms'], experience: 12, status: 'active', joinedAt: '2013-06-01' },
  { id: 'f2', name: 'Prof. Ravi Kumar', email: 'ravi.kumar@edusphere.edu', employeeId: 'FAC002', department: 'Computer Science', designation: 'Associate Professor', subjects: ['Computer Networks', 'Cloud Computing'], experience: 8, status: 'active', joinedAt: '2017-07-01' },
  { id: 'f3', name: 'Dr. Priya Nair', email: 'priya.nair@edusphere.edu', employeeId: 'FAC003', department: 'Computer Science', designation: 'Assistant Professor', subjects: ['DBMS', 'Big Data'], experience: 5, status: 'active', joinedAt: '2020-08-01' },
  { id: 'f4', name: 'Prof. Vikram Singh', email: 'vikram.singh@edusphere.edu', employeeId: 'FAC004', department: 'Computer Science', designation: 'Professor', subjects: ['Operating Systems', 'Computer Architecture'], experience: 15, status: 'active', joinedAt: '2010-06-01' },
  { id: 'f5', name: 'Dr. Meera Pillai', email: 'meera.pillai@edusphere.edu', employeeId: 'FAC005', department: 'Computer Science', designation: 'Associate Professor', subjects: ['Software Engineering', 'Agile Methods'], experience: 9, status: 'active', joinedAt: '2016-07-01' },
  { id: 'f6', name: 'Prof. Arjun Das', email: 'arjun.das@edusphere.edu', employeeId: 'FAC006', department: 'Computer Science', designation: 'Assistant Professor', subjects: ['Machine Learning', 'Deep Learning'], experience: 4, status: 'active', joinedAt: '2021-08-01' },
];

// ─── Admin: Departments ───────────────────────────────────────────────────────
export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Computer Science & Engineering', code: 'CSE', hodName: 'Dr. Suresh Menon', studentCount: 420, facultyCount: 18, established: '1998' },
  { id: 'd2', name: 'Electronics & Communication', code: 'ECE', hodName: 'Dr. Radha Krishnan', studentCount: 380, facultyCount: 16, established: '1998' },
  { id: 'd3', name: 'Mechanical Engineering', code: 'ME', hodName: 'Prof. Ramesh Babu', studentCount: 360, facultyCount: 15, established: '1998' },
  { id: 'd4', name: 'Civil Engineering', code: 'CE', hodName: 'Dr. Lakshmi Devi', studentCount: 280, facultyCount: 12, established: '2001' },
  { id: 'd5', name: 'Information Technology', code: 'IT', hodName: 'Prof. Ganesh Iyer', studentCount: 320, facultyCount: 14, established: '2005' },
  { id: 'd6', name: 'Artificial Intelligence & ML', code: 'AIML', hodName: 'Dr. Kavitha Rao', studentCount: 180, facultyCount: 10, established: '2021' },
];

// ─── Analytics Data ───────────────────────────────────────────────────────────
export const mockStudentGrowth: ChartDataPoint[] = [
  { name: '2019', value: 1800 }, { name: '2020', value: 2100 }, { name: '2021', value: 2450 },
  { name: '2022', value: 2800 }, { name: '2023', value: 3200 }, { name: '2024', value: 3600 }, { name: '2025', value: 3940 },
];

export const mockPlacementStats: Array<{ name: string; placed: number; offers: number; package: number }> = [
  { name: '2020', placed: 180, offers: 220, package: 8.2 },
  { name: '2021', placed: 210, offers: 265, package: 9.1 },
  { name: '2022', placed: 245, offers: 310, package: 11.3 },
  { name: '2023', placed: 278, offers: 352, package: 13.5 },
  { name: '2024', placed: 312, offers: 398, package: 15.8 },
];

export const mockAcademicPerformance: Array<{ name: string; avg: number; highest: number; lowest: number }> = [
  { name: 'CS301', avg: 74, highest: 98, lowest: 42 },
  { name: 'CS302', avg: 68, highest: 95, lowest: 38 },
  { name: 'CS303', avg: 79, highest: 97, lowest: 45 },
  { name: 'CS304', avg: 71, highest: 94, lowest: 40 },
  { name: 'CS305', avg: 82, highest: 99, lowest: 52 },
  { name: 'CS306', avg: 65, highest: 96, lowest: 35 },
];

export const mockEventParticipation: ChartDataPoint[] = [
  { name: 'Hackathons', value: 342 },
  { name: 'Workshops', value: 512 },
  { name: 'Cultural', value: 1240 },
  { name: 'Sports', value: 890 },
  { name: 'Seminars', value: 456 },
];
