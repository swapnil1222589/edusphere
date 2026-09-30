# EduSphere 🎓

**The Smart College Management Platform**

EduSphere is a production-quality, fully responsive web application that serves as an all-in-one digital operating system for colleges. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

## ✨ Features

### Student Portal
- 📊 **Dashboard** – Attendance overview, upcoming classes, assignment deadlines, placement updates
- ✅ **Attendance** – Subject-wise tracking, monthly calendar, trend charts, low-attendance alerts
- 📅 **Timetable** – Weekly & daily view with color-coded subjects, room & faculty details
- 📝 **Assignments** – Submit, track deadlines, view grades & feedback            
- 📚 **Notes** – Search, filter, favorite, and download study materials
- 🎫 **Events** – Browse hackathons, workshops, cultural events; register with one click
- 💼 **Placement Portal** – Company drives, eligibility check, application tracker
- 🔍 **Lost & Found** – Report and find lost items on campus
- 🛒 **Marketplace** – Buy, sell, and exchange among students
- 👥 **Clubs** – Join coding, AI, robotics, photography, and sports clubs

### Faculty Portal
- 📊 **Dashboard** – Student performance charts, submission tracker
- ✅ **Attendance Management** – Mark attendance for entire classes with one click
- 📚 **Notes Upload** – Upload and manage study materials with tags
- 📝 **Assignments** – Create assignments, grade submissions, add feedback
- 📈 **Analytics** – Low attendance alerts, top performers, subject performance

### Admin Portal
- 📊 **Analytics Dashboard** – Student growth, placement stats, event participation
- 🎓 **Student Management** – Search, filter, view all student records
- 👥 **Faculty Management** – Faculty cards with subjects and designations
- 🏛️ **Departments** – Color-coded department cards with HOD and stats
- 📅 **Timetable** – College-wide schedule management
- 🎫 **Events** – Create and manage all campus events
- 📄 **Reports** – Generate and export institutional reports

### General
- 🔔 **Notifications** – Real-time notification center with type-specific icons
- ⚙️ **Settings** – Profile, password, notification preferences, appearance, privacy
- 🌙 **Dark/Light Mode** – Persistent theme switching
- 📱 **Fully Responsive** – Works beautifully on all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to project directory
cd edusphere

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values (Supabase optional for demo)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | student@edusphere.edu | any |
| Faculty | faculty@edusphere.edu | any |
| Admin | admin@edusphere.edu | any |

> **Note:** Authentication uses localStorage-based mock auth for demo. No Supabase setup required.

## 🏗️ Project Structure

```
edusphere/
├── app/
│   ├── (auth)/          # Login, Register, Forgot Password
│   ├── (dashboard)/     # All authenticated pages
│   │   ├── student/     # 10 student modules
│   │   ├── faculty/     # 5 faculty modules
│   │   └── admin/       # 7 admin modules
│   ├── globals.css      # Design system, themes, animations
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Button, Card, Badge, Modal, Skeleton, etc.
│   └── navigation/      # Sidebar, TopNav
├── data/mock/           # Realistic seed data for all modules
├── hooks/               # useAuth (context + provider)
├── lib/                 # utils.ts (cn, formatDate, etc.)
├── types/               # Shared TypeScript interfaces
├── .env.example         # Environment variable template
├── vercel.json          # Vercel deployment config
└── README.md
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Charts | Recharts |
| Auth/DB | Supabase (Supabase-ready architecture) |
| Icons | Lucide React |
| Notifications | react-hot-toast |

## 🌐 Deployment

### Deploy to Vercel

```bash
# Build for production
npm run build

# Or push to GitHub and connect to Vercel
# Vercel will auto-detect Next.js and deploy
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Connect Supabase (Optional)

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update `.env.local` with your Supabase credentials
4. Replace mock auth in `hooks/useAuth.tsx` with Supabase Auth

## 🎨 Design System

- **Dark theme** by default with light mode toggle
- **Glassmorphism** cards with `backdrop-filter: blur`
- **Gradient text** and accent colors (Indigo/Purple/Cyan)
- **Smooth animations** via Framer Motion
- **Custom scrollbar** styling
- **Responsive** via CSS media queries + Tailwind

## 📄 License

MIT License — feel free to use for educational and commercial projects.

---

Built with ❤️ by the EduSphere Team
