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

export default function ExamsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedExamType, setSelectedExamType] = useState("")
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

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

  const examTypes = ["Select Exam Type", "Mid-Semester", "End-Semester", "Unit Test 1", "Unit Test 2", "Final Exam"]

  // Demo exam results data - will be replaced with backend data
  const examResults: Record<string, Array<{id: number, subject: string, marks: number, totalMarks: number, grade: string}>> = {
    "Mid-Semester": [
      { id: 1, subject: "Mathematics", marks: 92, totalMarks: 100, grade: "A+" },
      { id: 2, subject: "Science", marks: 88, totalMarks: 100, grade: "A" },
      { id: 3, subject: "English", marks: 85, totalMarks: 100, grade: "A" },
      { id: 4, subject: "History", marks: 78, totalMarks: 100, grade: "B+" },
      { id: 5, subject: "Geography", marks: 75, totalMarks: 100, grade: "B+" },
    ],
    "End-Semester": [
      { id: 1, subject: "Mathematics", marks: 95, totalMarks: 100, grade: "A+" },
      { id: 2, subject: "English", marks: 90, totalMarks: 100, grade: "A+" },
      { id: 3, subject: "Science", marks: 87, totalMarks: 100, grade: "A" },
      { id: 4, subject: "History", marks: 82, totalMarks: 100, grade: "A" },
      { id: 5, subject: "Geography", marks: 80, totalMarks: 100, grade: "A" },
    ],
    "Unit Test 1": [
      { id: 1, subject: "Mathematics", marks: 48, totalMarks: 50, grade: "A+" },
      { id: 2, subject: "Science", marks: 45, totalMarks: 50, grade: "A+" },
      { id: 3, subject: "English", marks: 42, totalMarks: 50, grade: "A" },
      { id: 4, subject: "History", marks: 40, totalMarks: 50, grade: "A" },
      { id: 5, subject: "Geography", marks: 38, totalMarks: 50, grade: "B+" },
    ],
    "Unit Test 2": [
      { id: 1, subject: "Science", marks: 47, totalMarks: 50, grade: "A+" },
      { id: 2, subject: "Mathematics", marks: 46, totalMarks: 50, grade: "A+" },
      { id: 3, subject: "English", marks: 44, totalMarks: 50, grade: "A" },
      { id: 4, subject: "Geography", marks: 41, totalMarks: 50, grade: "A" },
      { id: 5, subject: "History", marks: 39, totalMarks: 50, grade: "B+" },
    ],
    "Final Exam": [
      { id: 1, subject: "Mathematics", marks: 96, totalMarks: 100, grade: "A+" },
      { id: 2, subject: "Science", marks: 93, totalMarks: 100, grade: "A+" },
      { id: 3, subject: "English", marks: 91, totalMarks: 100, grade: "A+" },
      { id: 4, subject: "History", marks: 85, totalMarks: 100, grade: "A" },
      { id: 5, subject: "Geography", marks: 83, totalMarks: 100, grade: "A" },
    ]
  }

  const currentResults = selectedExamType && selectedExamType !== "Select Exam Type" 
    ? examResults[selectedExamType]?.sort((a, b) => b.marks - a.marks) || []
    : []

  // Demo curriculum schedule data - will be replaced with backend data
  const curriculumSchedule = [
    { id: 1, event: "Unit Test 1", date: "Jan 15-20, 2026" },
    { id: 2, event: "Science Fair", date: "Jan 25, 2026" },
    { id: 3, event: "Mid-Semester Examination", date: "Feb 10-15, 2026" },
    { id: 4, event: "Sports Day", date: "Feb 20, 2026" },
    { id: 5, event: "Parent-Teacher Meeting", date: "Feb 28, 2026" },
    { id: 6, event: "Unit Test 2", date: "Mar 15-20, 2026" },
    { id: 7, event: "Cultural Festival", date: "Mar 25, 2026" },
    { id: 8, event: "End-Semester Examination", date: "Apr 10-20, 2026" },
    { id: 9, event: "Annual Day Celebration", date: "Apr 30, 2026" },
    { id: 10, event: "Summer Break Begins", date: "May 1, 2026" }
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
              Exam Results
            </h2>
            
            {/* Exam Type Selector */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Select Exam Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full sm:w-96 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm text-gray-700 font-medium hover:border-gray-300 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3cpath%20fill%3D%22%23374151%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
              >
                {examTypes.map((type) => (
                  <option key={type} value={type} className="py-2">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Table */}
            {currentResults.length > 0 ? (
              <>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
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
                          Marks
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentResults.map((result, index) => (
                        <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                            {result.subject}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {result.marks} / {result.totalMarks}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.grade.startsWith('A') 
                                ? 'bg-green-100 text-green-800' 
                                : result.grade.startsWith('B')
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analysis Report Section */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                  Analysis Report
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Overall Progress Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                    <h4 className="text-base font-semibold text-slate-900 mb-6">Overall Progress</h4>
                    <div className="flex flex-col items-center justify-center py-4 sm:py-8">
                      {(() => {
                        const totalMarks = currentResults.reduce((sum, r) => sum + r.marks, 0)
                        const maxMarks = currentResults.reduce((sum, r) => sum + r.totalMarks, 0)
                        const percentage = (totalMarks / maxMarks) * 100
                        
                        return (
                          <>
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
                                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                                  strokeLinecap="round"
                                  className="transition-all duration-1000"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                                  {percentage.toFixed(1)}%
                                </span>
                                <span className="text-xs sm:text-sm text-gray-600 mt-1">Overall</span>
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 w-full">
                              <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                                <p className="text-xl sm:text-2xl font-bold text-green-700">{totalMarks}</p>
                                <p className="text-xs text-gray-600 mt-1">Obtained</p>
                              </div>
                              <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                                <p className="text-xl sm:text-2xl font-bold text-blue-700">{maxMarks}</p>
                                <p className="text-xs text-gray-600 mt-1">Total Marks</p>
                              </div>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Subject-wise Performance Bar Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                    <h4 className="text-base font-semibold text-slate-900 mb-6">Subject-wise Performance</h4>
                    <div className="space-y-4">
                      {currentResults.map((result) => {
                        const percentage = (result.marks / result.totalMarks) * 100
                        return (
                          <div key={result.id}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                {result.subject}
                              </span>
                              <span className="text-sm text-gray-600">
                                {result.marks}/{result.totalMarks}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  percentage >= 90 
                                    ? 'bg-green-500' 
                                    : percentage >= 75 
                                    ? 'bg-blue-500' 
                                    : percentage >= 60
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                {percentage.toFixed(1)}%
                              </span>
                              <span className={`text-xs font-medium ${
                                result.grade.startsWith('A') 
                                  ? 'text-green-600' 
                                  : result.grade.startsWith('B')
                                  ? 'text-blue-600'
                                  : 'text-yellow-600'
                              }`}>
                                Grade: {result.grade}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Curriculum Schedule Section */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                  Curriculum Schedule
                </h3>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                            Sr No
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900">
                            Event
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                            Tentative Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {curriculumSchedule.map((item, index) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium">
                              {item.event}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                              {item.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              </>
            ) : selectedExamType && selectedExamType !== "Select Exam Type" ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  No results available for this exam type
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  Please select an exam type to view results
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
