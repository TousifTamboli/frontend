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
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

export default function AdmissionDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showNewAdmissionForm, setShowNewAdmissionForm] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    grade: "",
    parentName: "",
    email: "",
    phone: "",
    address: ""
  })

  const menuItems = [
    { name: "Students dashboard", href: "/parent/dashboard", icon: UserCircle },
    { name: "Student Profile", href: "/parent/profile", icon: User },
    { name: "Enrollment Details", href: "/parent/enrollment", icon: ClipboardList },
    { name: "Notices", href: "/parent/notices", icon: FileText },
    { name: "Homework", href: "/parent/homework", icon: BookOpen },
    { name: "Exams", href: "/parent/exams", icon: GraduationCap },
    { name: "Fee Details", href: "/parent/fees", icon: CreditCard },
    { name: "Queries", href: "/parent/queries", icon: MessageSquare },
    { name: "Sports", href: "/parent/sports", icon: Trophy },
    { name: "Admission Details", href: "/parent/admission", icon: ClipboardList },
    { name: "Franchise Details", href: "/parent/franchise", icon: Building2 },
    { name: "Camera Access", href: "/parent/camera", icon: Camera },
  ]

  // Demo admission data - will be replaced with backend data
  const admissionDetails = {
    studentName: "John Smith",
    admissionNumber: "ADM2025001",
    dateOfAdmission: "Apr 1, 2025",
    grade: "Grade 10-A",
    section: "A",
    rollNumber: "10",
    academicYear: "2025-26"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend integration will go here
    console.log("New admission form submitted:", formData)
    alert("Admission application submitted successfully! We will contact you soon.")
    setFormData({
      studentName: "",
      dateOfBirth: "",
      grade: "",
      parentName: "",
      email: "",
      phone: "",
      address: ""
    })
    setShowNewAdmissionForm(false)
  }

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
                      onClick={() => console.log("Logout clicked")}
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
              Admission Details
            </h2>
            
            {/* Current Admission Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Student Details</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Student Name</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Admission Number</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.admissionNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date of Admission</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.dateOfAdmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Grade & Section</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Roll Number</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Academic Year</p>
                    <p className="text-base font-semibold text-slate-900">{admissionDetails.academicYear}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Admission Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Apply for New Admission</h3>
                {!showNewAdmissionForm && (
                  <button
                    onClick={() => setShowNewAdmissionForm(true)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {showNewAdmissionForm && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Student Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.studentName}
                          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                          placeholder="Enter student name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Grade <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({...formData, grade: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
                          required
                        >
                          <option value="">Select Grade</option>
                          <option value="Grade 1">Grade 1</option>
                          <option value="Grade 2">Grade 2</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
                          <option value="Grade 10">Grade 10</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Parent Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.parentName}
                          onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                          placeholder="Enter parent name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                          placeholder="Enter email"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors resize-none"
                        placeholder="Enter complete address"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
                      >
                        Submit Application
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewAdmissionForm(false)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
