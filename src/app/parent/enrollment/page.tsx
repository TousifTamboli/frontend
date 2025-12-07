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
  Camera,
  Award 
} from "lucide-react"

export default function EnrollmentDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Demo sports enrollment data
  const sportsEnrollment = [
    {
      id: 1,
      name: "Football",
      coach: "Mr. John Anderson",
      schedule: "Mon, Wed, Fri - 4:00 PM",
      status: "Active",
      activities: [
        "Inter-school tournament participation",
        "Weekly practice sessions",
        "Fitness training program"
      ],
      achievements: [
        "🏆 District Championship - 2nd Place (2024)",
        "⚽ Best Team Player Award (Nov 2024)",
        "🎖️ Most Improved Player (Oct 2024)"
      ]
    },
    {
      id: 2,
      name: "Basketball",
      coach: "Ms. Sarah Williams",
      schedule: "Tue, Thu - 3:30 PM",
      status: "Active",
      activities: [
        "State level competition training",
        "Dribbling and shooting practice",
        "Team coordination drills"
      ],
      achievements: [
        "🏀 Regional Tournament - 1st Place (2024)",
        "🌟 Top Scorer Award (Dec 2024)",
        "🎯 Best Defense Player (Nov 2024)"
      ]
    },
    {
      id: 3,
      name: "Swimming",
      coach: "Mr. David Chen",
      schedule: "Mon, Wed - 5:00 PM",
      status: "Active",
      activities: [
        "Freestyle and backstroke training",
        "Endurance building exercises",
        "Competition preparation"
      ],
      achievements: [
        "🏊 State Swimming Meet - 3rd Place (2024)",
        "💧 50m Freestyle Record Holder",
        "🥉 Bronze Medal - District Meet"
      ]
    },
    {
      id: 4,
      name: "Cricket",
      coach: "Mr. Rajesh Kumar",
      schedule: "Sat, Sun - 8:00 AM",
      status: "Active",
      activities: [
        "Batting and bowling practice",
        "Match strategy sessions",
        "Fielding drills"
      ],
      achievements: [
        "🏏 Best Batsman - School Tournament (2024)",
        "🎯 Century Scorer Award",
        "⭐ Player of the Match (3 times)"
      ]
    }
  ]

  // Demo extra courses data
  const extraCourses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      instructor: "Dr. Emily Roberts",
      duration: "6 months",
      progress: 75,
      icon: "📐"
    },
    {
      id: 2,
      name: "Coding & Robotics",
      instructor: "Mr. Alex Thompson",
      duration: "8 months",
      progress: 60,
      icon: "🤖"
    },
    {
      id: 3,
      name: "Public Speaking",
      instructor: "Ms. Jennifer Lee",
      duration: "4 months",
      progress: 90,
      icon: "🎤"
    },
    {
      id: 4,
      name: "Art & Craft",
      instructor: "Mrs. Maria Garcia",
      duration: "5 months",
      progress: 85,
      icon: "🎨"
    }
  ]

  // Demo events data
  const registeredEvents = [
    {
      id: 1,
      name: "Annual Science Fair 2025",
      date: "Jan 15, 2025",
      description: "Showcase innovative science projects and experiments",
      fullDescription: "The Annual Science Fair is a prestigious event where students from all grades present their innovative science projects. This year's theme is 'Technology for Tomorrow'. Students will demonstrate their projects to judges, parents, and fellow students. Winners will receive certificates and prizes. The event promotes scientific thinking and creativity among students.",
      venue: "School Auditorium",
      time: "9:00 AM - 4:00 PM",
      category: "Academic",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png"
      ]
    },
    {
      id: 2,
      name: "Cultural Fest 2025",
      date: "Feb 10, 2025",
      description: "Celebrate diversity through music, dance, and drama",
      fullDescription: "Cultural Fest is the most awaited event of the year where students showcase their talents in various cultural activities. The event includes traditional dance performances, music concerts, drama competitions, and art exhibitions. Students from different grades participate in group and solo performances. It's a celebration of our rich cultural heritage and diversity.",
      venue: "Main Ground",
      time: "10:00 AM - 6:00 PM",
      category: "Cultural",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png"
      ]
    },
    {
      id: 3,
      name: "Inter-School Sports Meet",
      date: "Mar 5, 2025",
      description: "Compete with other schools in various sports",
      fullDescription: "The Inter-School Sports Meet brings together students from multiple schools to compete in various sporting events. Events include track and field, basketball, football, cricket, and swimming. This is an excellent opportunity for students to showcase their athletic abilities and represent our school. Participants will compete for medals and trophies in their respective categories.",
      venue: "City Sports Complex",
      time: "8:00 AM - 5:00 PM",
      category: "Sports",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png"
      ]
    },
    {
      id: 4,
      name: "Math Olympiad 2025",
      date: "Apr 20, 2025",
      description: "Test your mathematical skills in this challenging competition",
      fullDescription: "The Math Olympiad is a competitive examination designed to challenge students' mathematical abilities. Participants will solve complex problems involving algebra, geometry, number theory, and combinatorics. The competition has multiple rounds, with top performers advancing to regional and national levels. It's an excellent opportunity to showcase mathematical prowess and win scholarships.",
      venue: "School Auditorium",
      time: "9:00 AM - 12:00 PM",
      category: "Academic",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png",
        "/logo.png"
      ]
    }
  ]

  const menuItems = [
    { name: "Students dashboard", href: "/parent/dashboard", icon: UserCircle },
    { name: "Student Profile", href: "/parent/profile", icon: User },
    { name: "Enrollment Details", href: "/parent/enrollment", icon: ClipboardList },
    { name: "Notices", href: "/parent/notices", icon: FileText },
    { name: "Homework", href: "/parent/homework", icon: BookOpen },
    { name: "Exams", href: "/parent/exams", icon: GraduationCap },
    { name: "Report Card", href: "/parent/reportcard", icon: Award },
    { name: "Fee Details", href: "/parent/fees", icon: CreditCard },
    { name: "Food Menu", href: "/parent/menu", icon: BookOpen },
    { name: "Gallery", href: "/parent/gallery", icon: Camera },
    { name: "Queries", href: "/parent/queries", icon: MessageSquare },
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
        <div className="h-full overflow-y-auto p-6">
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
              Student Enrollment Details
            </h2>

            {/* Sports Enrollment Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Sports Enrollment
              </h3>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Sr No
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Sport Name
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Coach
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Schedule
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sportsEnrollment.map((sport, index) => (
                        <tr 
                          key={sport.id} 
                          onClick={() => setSelectedSport(sport.id)}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                            {sport.name}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {sport.coach}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {sport.schedule}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {sport.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Extra Courses Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Extra Courses
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {extraCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{course.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                          {course.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Instructor: {course.instructor}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Duration: {course.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Events Section */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Event Registered
              </h3>
              
              <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-hide">
                <div className="flex gap-4 pb-4 px-4 sm:px-0 min-w-min">
                  {registeredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event.id)}
                      className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col cursor-pointer hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === 'Academic' 
                            ? 'bg-blue-100 text-blue-700'
                            : event.category === 'Cultural'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {event.name}
                      </h4>
                      
                      <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-3 flex-1">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500">{event.date}</span>
                        <span className="text-xs text-blue-600 font-medium">View Details →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sport Detail Modal */}
          {selectedSport && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSport(null)}
            >
              <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {sportsEnrollment
                  .filter((sport) => sport.id === selectedSport)
                  .map((sport) => (
                    <div key={sport.id} className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1 pr-4">
                          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                            {sport.name}
                          </h2>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Coach: {sport.coach}</span>
                            <span className="text-gray-400">•</span>
                            <span>{sport.schedule}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedSport(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-slate-900 mb-3">Activities</h3>
                        <ul className="space-y-2">
                          {sport.activities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-3">Achievements</h3>
                        <div className="space-y-3">
                          {sport.achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                            >
                              <span className="text-lg">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Event Detail Modal */}
          {selectedEvent && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <div
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {registeredEvents
                  .filter((event) => event.id === selectedEvent)
                  .map((event) => (
                    <div key={event.id} className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.category === 'Academic' 
                                ? 'bg-blue-100 text-blue-700'
                                : event.category === 'Cultural'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {event.category}
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                            {event.name}
                          </h2>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedEvent(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-slate-900 mb-3">Event Description</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {event.fullDescription}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-4">Event Gallery</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {event.images.map((image, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer group"
                            >
                              <Image
                                src={image}
                                alt={`Event image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
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
