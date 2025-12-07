"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, User, Menu, LogOut, Users, BookOpen, Award, Trophy, LayoutDashboard, UserCircle, Calendar } from "lucide-react"

export default function TeacherProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Student Profile", href: "/teacher/students", icon: Users },
    { name: "Homework", href: "/teacher/homework", icon: BookOpen },
    { name: "Update Scores", href: "/teacher/scores", icon: Award },
    { name: "Activities", href: "/teacher/activities", icon: BookOpen },
    { name: "Academic Calendar", href: "/teacher/calendar", icon: Calendar },
    { name: "Update Sports", href: "/teacher/sports", icon: Trophy },
  ]

  // Teacher Details
  const teacherDetails = {
    name: "Dr. Emily Roberts",
    employeeId: "TCH/2020/1234",
    department: "Mathematics",
    designation: "Senior Teacher",
    qualification: "M.Sc., B.Ed., Ph.D. in Mathematics",
    experience: "12 Years",
    email: "emily.roberts@school.com",
    phone: "+91 98765 43210",
    joiningDate: "August 15, 2013",
    subjects: ["Mathematics", "Advanced Calculus", "Statistics"],
    classes: ["10th Grade - Section A", "10th Grade - Section B", "12th Grade - Section A"]
  }

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
          <h2 className="text-xl font-semibold mb-8">Teacher Portal</h2>
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
                    <Link
                      href="/teacher/profile"
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
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
              Teacher Profile
            </h2>

            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-4xl">
              {/* Header with Avatar */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 sm:py-12">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <UserCircle className="w-20 h-20 sm:w-28 sm:h-28 text-blue-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {teacherDetails.name}
                    </h3>
                    <p className="text-blue-100 text-lg mb-1">{teacherDetails.designation}</p>
                    <p className="text-blue-200 text-sm">{teacherDetails.department} Department</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 sm:p-8">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Employee ID
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.employeeId}
                        </p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Qualification
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.qualification}
                        </p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Experience
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.experience}
                        </p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Joining Date
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.joiningDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Email
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.email}
                        </p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Phone
                        </label>
                        <p className="text-base font-semibold text-slate-900">
                          {teacherDetails.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Teaching Details */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
                      Teaching Details
                    </h4>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Subjects
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {teacherDetails.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Classes Assigned
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {teacherDetails.classes.map((classItem, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {classItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
