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
  Download,
  Award
} from "lucide-react"

export default function ReportCardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState("Mid-Semester")
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Student Details
  const studentDetails = {
    name: "John Michael Smith",
    class: "10th Grade - Section A",
    rollNumber: "2025-10A-042",
    admissionNumber: "ADM/2020/1234",
    dateOfBirth: "March 15, 2010",
    fatherName: "Michael Smith",
    motherName: "Sarah Smith",
    academicYear: "2025-2026"
  }

  // Exam Types
  const examTypes = ["Mid-Semester", "End-Semester", "Unit Test 1", "Unit Test 2", "Annual Exam"]

  // Marks Data
  const marksData = {
    "Mid-Semester": [
      { subject: "Mathematics", totalMarks: 100, obtainedMarks: 85, grade: "A", remarks: "Excellent" },
      { subject: "Science", totalMarks: 100, obtainedMarks: 78, grade: "B+", remarks: "Very Good" },
      { subject: "English", totalMarks: 100, obtainedMarks: 92, grade: "A+", remarks: "Outstanding" },
      { subject: "Social Studies", totalMarks: 100, obtainedMarks: 88, grade: "A", remarks: "Excellent" },
      { subject: "Hindi", totalMarks: 100, obtainedMarks: 75, grade: "B+", remarks: "Good" },
      { subject: "Computer Science", totalMarks: 100, obtainedMarks: 90, grade: "A+", remarks: "Excellent" },
    ],
    "End-Semester": [
      { subject: "Mathematics", totalMarks: 100, obtainedMarks: 88, grade: "A", remarks: "Excellent" },
      { subject: "Science", totalMarks: 100, obtainedMarks: 82, grade: "A", remarks: "Very Good" },
      { subject: "English", totalMarks: 100, obtainedMarks: 95, grade: "A+", remarks: "Outstanding" },
      { subject: "Social Studies", totalMarks: 100, obtainedMarks: 90, grade: "A+", remarks: "Excellent" },
      { subject: "Hindi", totalMarks: 100, obtainedMarks: 80, grade: "A", remarks: "Very Good" },
      { subject: "Computer Science", totalMarks: 100, obtainedMarks: 93, grade: "A+", remarks: "Excellent" },
    ]
  }

  const currentMarks = marksData[selectedExam as keyof typeof marksData] || marksData["Mid-Semester"]
  
  const totalObtained = currentMarks.reduce((sum, subject) => sum + subject.obtainedMarks, 0)
  const totalMaxMarks = currentMarks.reduce((sum, subject) => sum + subject.totalMarks, 0)
  const percentage = ((totalObtained / totalMaxMarks) * 100).toFixed(2)

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

  const handleDownload = () => {
    console.log("Downloading report card...")
    // Backend integration will go here
    alert("Report card download will be implemented soon!")
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
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Report Card
                </h2>
              </div>
              
              {/* Exam Type Selector */}
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
              >
                {examTypes.map((exam) => (
                  <option key={exam} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>

            {/* Report Card Container */}
            <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg max-w-5xl mx-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">ABC International School</h3>
                    <p className="text-blue-100">Academic Report Card</p>
                  </div>
                  <Award className="w-12 h-12 sm:w-16 sm:h-16 opacity-80" />
                </div>
              </div>

              {/* Student Details */}
              <div className="p-6 sm:p-8 border-b-2 border-gray-200">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Student Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Student Name:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Class:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.class}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Roll Number:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.rollNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Admission No:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.admissionNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Date of Birth:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Father's Name:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.fatherName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Mother's Name:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.motherName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Academic Year:</span>
                    <span className="text-sm font-semibold text-slate-900">{studentDetails.academicYear}</span>
                  </div>
                </div>
              </div>

              {/* Marks Table */}
              <div className="p-6 sm:p-8 border-b-2 border-gray-200">
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                  {selectedExam} - Academic Performance
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 border-b-2 border-gray-300">
                          Subject
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-900 border-b-2 border-gray-300">
                          Total Marks
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-900 border-b-2 border-gray-300">
                          Obtained Marks
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-900 border-b-2 border-gray-300">
                          Grade
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 border-b-2 border-gray-300">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMarks.map((subject, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900 border-b border-gray-200">
                            {subject.subject}
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-gray-700 border-b border-gray-200">
                            {subject.totalMarks}
                          </td>
                          <td className="px-4 py-3 text-sm text-center font-semibold text-slate-900 border-b border-gray-200">
                            {subject.obtainedMarks}
                          </td>
                          <td className="px-4 py-3 text-center border-b border-gray-200">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              subject.grade.includes('A+') 
                                ? 'bg-green-100 text-green-700'
                                : subject.grade.includes('A')
                                ? 'bg-blue-100 text-blue-700'
                                : subject.grade.includes('B')
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                            {subject.remarks}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50">
                        <td className="px-4 py-4 text-sm font-bold text-slate-900 border-t-2 border-gray-300">
                          TOTAL
                        </td>
                        <td className="px-4 py-4 text-sm text-center font-bold text-slate-900 border-t-2 border-gray-300">
                          {totalMaxMarks}
                        </td>
                        <td className="px-4 py-4 text-sm text-center font-bold text-slate-900 border-t-2 border-gray-300">
                          {totalObtained}
                        </td>
                        <td className="px-4 py-4 text-center border-t-2 border-gray-300" colSpan={2}>
                          <span className="text-sm font-bold text-slate-900">
                            Percentage: {percentage}%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Overall Remarks */}
              <div className="p-6 sm:p-8 border-b-2 border-gray-200">
                <h4 className="text-lg font-bold text-slate-900 mb-3">Class Teacher's Remarks</h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {percentage >= "90" 
                    ? "Outstanding performance! The student has shown exceptional dedication and understanding in all subjects. Keep up the excellent work!"
                    : percentage >= "75"
                    ? "Very good performance! The student is doing well and shows consistent effort. With a little more focus, can achieve even better results."
                    : percentage >= "60"
                    ? "Good performance. The student needs to work harder in some subjects. Regular practice and attention in class will help improve the grades."
                    : "Needs improvement. The student should focus more on studies and seek help from teachers when needed. Regular practice is essential."}
                </p>
              </div>

              {/* Signatures */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                    <p className="text-sm font-semibold text-gray-700">Class Teacher</p>
                  </div>
                  <div className="text-center">
                    <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                    <p className="text-sm font-semibold text-gray-700">Principal</p>
                  </div>
                  <div className="text-center">
                    <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                    <p className="text-sm font-semibold text-gray-700">Parent's Signature</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleDownload}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold text-base"
              >
                <Download className="w-5 h-5" />
                Download Report Card
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
