"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Bell, 
  User, 
  Menu, 
  LogOut, 
  UserCircle, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  CreditCard, 
  MessageSquare, 
  Trophy, 
  ClipboardList, 
  Building2, 
  Camera 
} from "lucide-react"

// Attendance Calendar Component
function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Demo attendance data - will be replaced with backend data
  const attendanceData: Record<string, 'present' | 'absent'> = {
    '2025-11-01': 'present',
    '2025-11-02': 'present',
    '2025-11-03': 'absent',
    '2025-11-04': 'present',
    '2025-11-05': 'present',
    '2025-11-08': 'present',
    '2025-11-09': 'absent',
    '2025-11-10': 'present',
    '2025-11-11': 'present',
    '2025-11-12': 'present',
    '2025-11-15': 'present',
    '2025-11-16': 'present',
    '2025-11-17': 'present',
    '2025-11-18': 'absent',
    '2025-11-19': 'present',
    '2025-11-22': 'present',
    '2025-11-23': 'present',
    '2025-11-24': 'present',
    '2025-11-25': 'present',
    '2025-11-26': 'present',
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getAttendanceStatus = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return attendanceData[dateStr]
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h5 className="text-base font-semibold text-slate-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h5>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-gray-600 py-1 sm:py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }
          
          const status = getAttendanceStatus(day)
          const isToday = day === new Date().getDate() && 
                         currentDate.getMonth() === new Date().getMonth() &&
                         currentDate.getFullYear() === new Date().getFullYear()
          
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded text-xs sm:text-sm font-medium transition-colors ${
                status === 'present' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : status === 'absent'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              } ${isToday ? 'ring-1 sm:ring-2 ring-slate-900' : ''}`}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-100 border-2 border-green-500"></div>
          <span className="text-[10px] sm:text-xs text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-100 border-2 border-red-500"></div>
          <span className="text-[10px] sm:text-xs text-gray-600">Absent</span>
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedHomework, setSelectedHomework] = useState<number | null>(null)
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Demo notices data - will be replaced with backend data
  const notices = [
    {
      id: 1,
      title: "Annual Sports Day",
      description: "Participation required for all students. The event will be held at the main ground.",
      date: "Dec 15, 2025",
      attachments: ["sports_schedule.pdf", "participation_form.pdf"]
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      description: "Scheduled for next week. Meeting will be held in the conference hall from 9 AM to 4 PM.",
      date: "Dec 20, 2025",
      attachments: ["meeting_agenda.pdf"]
    },
    {
      id: 3,
      title: "Winter Break Notice",
      description: "School will remain closed for winter break from December 24th to January 5th.",
      date: "Dec 22, 2025",
      attachments: ["holiday_calendar.pdf"]
    },
    {
      id: 4,
      title: "Science Fair 2025",
      subtitle: "Registration open for all grades",
      description: "Students are encouraged to participate and showcase their innovative projects. Registration deadline is December 30th.",
      date: "Jan 10, 2026",
      attachments: ["registration_form.pdf", "guidelines.pdf"]
    }
  ]

  // Demo exam data - will be replaced with backend data (sorted by date)
  const upcomingExams = [
    {
      id: 1,
      subject: "Mathematics",
      date: "Dec 5, 2025",
      time: "9:00 AM - 11:00 AM"
    },
    {
      id: 2,
      subject: "Science",
      date: "Dec 7, 2025",
      time: "10:00 AM - 12:00 PM"
    },
    {
      id: 3,
      subject: "English",
      date: "Dec 10, 2025",
      time: "9:00 AM - 11:00 AM"
    },
    {
      id: 4,
      subject: "History",
      date: "Dec 12, 2025",
      time: "2:00 PM - 4:00 PM"
    },
    {
      id: 5,
      subject: "Geography",
      date: "Dec 14, 2025",
      time: "9:00 AM - 11:00 AM"
    }
  ]

  // Demo homework data - will be replaced with backend data (sorted by most recent first)
  const homeworks = [
    {
      id: 1,
      title: "Mathematics Assignment",
      subject: "Mathematics",
      date: "Nov 30, 2025",
      description: "Complete exercises 1-10 from Chapter 5. Solve all the problems from Chapter 5, Exercise 5.1. Show all working steps clearly. Focus on quadratic equations and their applications. Submit handwritten solutions.",
      attachments: ["math_chapter5.pdf", "exercise_solutions_guide.pdf"]
    },
    {
      id: 2,
      title: "Science Project",
      subject: "Science",
      date: "Nov 28, 2025",
      description: "Prepare a project on photosynthesis process. Create a detailed project report on the photosynthesis process. Include diagrams, chemical equations, and real-world applications. The project should be at least 10 pages with proper citations and references.",
      attachments: ["project_guidelines.pdf", "reference_materials.pdf", "sample_project.pdf"]
    },
    {
      id: 3,
      title: "English Essay",
      subject: "English",
      date: "Nov 27, 2025",
      description: "Write an essay on environmental conservation. Write a 500-word essay on the importance of environmental conservation. Include introduction, body paragraphs with examples, and conclusion. Use proper grammar and punctuation. Cite at least 3 sources.",
      attachments: ["essay_format.pdf"]
    },
    {
      id: 4,
      title: "History Research",
      subject: "History",
      date: "Nov 26, 2025",
      description: "Research on World War II events. Conduct research on major events of World War II. Focus on causes, key battles, and consequences. Prepare a presentation with timeline and important figures. Include maps and historical photographs.",
      attachments: ["ww2_timeline.pdf", "research_template.docx"]
    }
  ]

  const menuItems = [
    { name: "Child Profile", href: "/parent/dashboard", icon: UserCircle },
    { name: "Notices", href: "/parent/notices", icon: FileText },
    { name: "Homework", href: "/parent/homework", icon: BookOpen },
    { name: "Exams", href: "/parent/exams", icon: GraduationCap },
    { name: "Fee Details", href: "/parent/fees", icon: CreditCard },
    { name: "Enquiries", href: "/parent/enquiries", icon: MessageSquare },
    { name: "Sports", href: "/parent/sports", icon: Trophy },
    { name: "Admission Details", href: "/parent/admission", icon: ClipboardList },
    { name: "Franchise Details", href: "/parent/franchise", icon: Building2 },
    { name: "Camera Access", href: "/parent/camera", icon: Camera },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement
        if (!target.closest('button[aria-label="toggle-sidebar"]')) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-8">Parent Portal</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="toggle-sidebar"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              
              <Image
                src="/logo.png"
                alt="School Logo"
                width={40}
                height={40}
                className="object-contain sm:w-[50px] sm:h-[50px]"
              />
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        console.log("Logout clicked")
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 sm:mb-8">
              Child Profile
            </h2>
            
            {/* Attendance Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Attendance
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Circular Progress - Overall Attendance */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                  <h4 className="text-base font-semibold text-slate-900 mb-4 sm:mb-6">Overall Attendance</h4>
                  <div className="flex flex-col items-center justify-center py-4 sm:py-8">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#e5e7eb"
                          strokeWidth="16"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#0f172a"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 88}`}
                          strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.85)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-bold text-slate-900">85%</span>
                        <span className="text-xs sm:text-sm text-gray-600 mt-1">Present</span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 w-full">
                      <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                        <p className="text-xl sm:text-2xl font-bold text-green-700">170</p>
                        <p className="text-xs text-gray-600 mt-1">Present Days</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
                        <p className="text-xl sm:text-2xl font-bold text-red-700">30</p>
                        <p className="text-xs text-gray-600 mt-1">Absent Days</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar - Monthly Attendance */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                  <h4 className="text-base font-semibold text-slate-900 mb-4 sm:mb-6">Monthly Attendance</h4>
                  <AttendanceCalendar />
                </div>
              </div>
            </div>

            {/* Recent Homework Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Recent Homework
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {homeworks.map((homework) => (
                  <div
                    key={homework.id}
                    onClick={() => setSelectedHomework(homework.id)}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                          {homework.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">{homework.subject}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {homework.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {homework.description}
                    </p>
                    <div className="flex items-center justify-end pt-3 border-t border-gray-200 mt-3">
                      <span className="text-xs text-blue-600 font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Exams Section */}
            <div className="mb-8">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                  Upcoming Exam
                </h3>
                <p className="text-sm text-gray-600">Mid-Semester Examination</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Sr No
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Subject
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {upcomingExams.map((exam, index) => (
                        <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                            {exam.subject}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {exam.date}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {exam.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Notices Section */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Notices
              </h3>
              
              <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-hide">
                <div className="flex gap-4 pb-4 px-4 sm:px-0 min-w-min">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => setSelectedNotice(notice.id)}
                      className="flex-shrink-0 w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col cursor-pointer hover:shadow-md transition-all"
                    >
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {notice.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-4 flex-1">
                        {notice.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500">{notice.date}</span>
                        <span className="text-xs text-blue-600 font-medium">View →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Homework Detail Modal */}
          {selectedHomework && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedHomework(null)}
            >
              <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {homeworks
                  .filter((hw) => hw.id === selectedHomework)
                  .map((homework) => (
                    <div key={homework.id} className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-4">
                          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                            {homework.title}
                          </h2>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-600">{homework.subject}</p>
                            <span className="text-sm text-gray-400">•</span>
                            <p className="text-sm text-gray-500">{homework.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedHomework(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-slate-900 mb-3">Description</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {homework.description}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <h3 className="text-sm font-semibold text-slate-900">
                            Attachments
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {homework.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-700 flex-1">
                                {attachment}
                              </span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Notice Detail Modal */}
          {selectedNotice && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNotice(null)}
            >
              <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {notices
                  .filter((n) => n.id === selectedNotice)
                  .map((notice) => (
                    <div key={notice.id} className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-4">
                          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                            {notice.title}
                          </h2>
                          <p className="text-sm text-gray-500">{notice.date}</p>
                        </div>
                        <button
                          onClick={() => setSelectedNotice(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {notice.description}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <h3 className="text-sm font-semibold text-slate-900">
                            Attachments
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {notice.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-700 flex-1">
                                {attachment}
                              </span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
