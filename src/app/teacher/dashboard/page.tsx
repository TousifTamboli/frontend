"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, User, Menu, X, Users, BookOpen, Award, Trophy, LogOut, Paperclip, Calendar, LayoutDashboard } from "lucide-react"

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Student Profile", href: "/teacher/students", icon: Users },
    { name: "Homework", href: "/teacher/homework", icon: BookOpen },
    { name: "Update Scores", href: "/teacher/scores", icon: Award },
    { name: "Update Sports", href: "/teacher/sports", icon: Trophy },
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

  const events = [
    {
      id: 1,
      title: "Music Concert",
      subtitle: "Annual music performance",
      date: "Dec 28, 2025",
      description: "Students will showcase their musical talents in various genres including classical, jazz, and contemporary music."
    },
    {
      id: 2,
      title: "Art Exhibition",
      subtitle: "Student artwork display",
      date: "Jan 5, 2026",
      description: "A collection of paintings, sculptures, and digital art created by our talented students throughout the semester."
    },
    {
      id: 3,
      title: "Drama Performance",
      subtitle: "Theater club presentation",
      date: "Jan 12, 2026",
      description: "The drama club presents a classic play with modern interpretations. All are welcome to attend."
    },
    {
      id: 4,
      title: "Career Fair",
      subtitle: "Industry professionals meet",
      date: "Jan 18, 2026",
      description: "Various companies and universities will be present to guide students about career opportunities and higher education."
    },
    {
      id: 5,
      title: "Debate Competition",
      subtitle: "Inter-school championship",
      date: "Jan 25, 2026",
      description: "Students from different schools will compete in a series of debates on current affairs and social issues."
    }
  ]

  const notices = [
    {
      id: 1,
      title: "Annual Sports Day",
      subtitle: "Participation required for all students",
      date: "Dec 15, 2025",
      content: "We are excited to announce our Annual Sports Day. All teachers are requested to coordinate with their respective classes and ensure maximum participation. The event will be held at the main ground.",
      attachments: ["sports_schedule.pdf", "participation_form.pdf"]
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      subtitle: "Scheduled for next week",
      date: "Dec 20, 2025",
      content: "The parent-teacher meeting is scheduled for next week. Please prepare progress reports for all students in your class. Meeting will be held in the conference hall from 9 AM to 4 PM.",
      attachments: ["meeting_agenda.pdf"]
    },
    {
      id: 3,
      title: "Winter Break Notice",
      subtitle: "School closure dates announced",
      date: "Dec 22, 2025",
      content: "School will remain closed for winter break from December 24th to January 5th. All pending assignments should be submitted before the break. Classes will resume on January 6th.",
      attachments: ["holiday_calendar.pdf", "assignment_list.pdf"]
    },
    {
      id: 4,
      title: "Science Fair 2025",
      subtitle: "Registration open for all grades",
      date: "Jan 10, 2026",
      content: "The annual Science Fair is scheduled for January. Students are encouraged to participate and showcase their innovative projects. Registration deadline is December 30th. Prizes will be awarded to top performers.",
      attachments: ["registration_form.pdf", "guidelines.pdf", "project_ideas.pdf"]
    },
    {
      id: 5,
      title: "Staff Training Workshop",
      subtitle: "Professional development session",
      date: "Jan 15, 2026",
      content: "A mandatory training workshop on modern teaching methodologies will be conducted. All teaching staff must attend. The session will cover digital tools, student engagement techniques, and assessment strategies.",
      attachments: ["workshop_agenda.pdf", "training_materials.pdf"]
    },
    {
      id: 6,
      title: "Exam Schedule Released",
      subtitle: "Mid-term examinations",
      date: "Jan 20, 2026",
      content: "The mid-term examination schedule has been released. Please review the timetable and prepare your students accordingly. Exam papers must be submitted to the office by January 18th.",
      attachments: ["exam_timetable.pdf", "syllabus.pdf"]
    },
    {
      id: 7,
      title: "Cultural Festival",
      subtitle: "Annual celebration event",
      date: "Feb 5, 2026",
      content: "Our annual cultural festival will showcase student talents in music, dance, drama, and art. Teachers are requested to help students prepare their performances. Auditions will be held next week.",
      attachments: ["event_schedule.pdf", "audition_form.pdf"]
    }
  ]

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
          <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
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
              
              {/* Logo - Add your logo to /public/logo.png */}
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
                        // Add logout logic here
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
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">Your Schedule</h2>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6 sm:mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                        Sr No
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                        Class
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                        Subjects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">1</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">Grade 10-A</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">Mathematics</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">2</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">Grade 9-B</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">Science</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notices Section */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">Notices</h2>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-hide mb-6 sm:mb-8">
              <div className="flex gap-4 pb-4 px-4 sm:px-0 min-w-min">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice.id)}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                      {notice.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{notice.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Section */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">Events</h2>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-hide">
              <div className="flex gap-4 pb-4 px-4 sm:px-0 min-w-min">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-1">
                      {event.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 pb-3 border-b border-gray-200">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4 flex-1">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Notice Modal */}
          {selectedNotice && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNotice(null)}
            >
              <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {notices
                  .filter((n) => n.id === selectedNotice)
                  .map((notice) => (
                    <div key={notice.id} className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 pr-8">
                          {notice.title}
                        </h2>
                        <button
                          onClick={() => setSelectedNotice(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {notice.subtitle}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                        <Calendar className="w-4 h-4" />
                        <span>{notice.date}</span>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                        {notice.content}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Paperclip className="w-5 h-5 text-gray-700" />
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
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">
                                {attachment}
                              </span>
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
