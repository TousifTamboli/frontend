"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, User, Menu, Users, BookOpen, Award, Trophy, LogOut, Filter, Save } from "lucide-react"

interface Student {
  rollNo: number
  name: string
  marks: string
}

export default function UpdateScoresPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedExamType, setSelectedExamType] = useState("")
  const [maxMarks] = useState(50)
  const [hasChanges, setHasChanges] = useState(false)

  const subjects = ["Select Subject", "Mathematics", "Science", "English", "History", "Geography"]
  const classes = ["Select Class", "Grade 10-A", "Grade 10-B", "Grade 9-A", "Grade 9-B", "Grade 8-A", "Grade 8-B"]
  const examTypes = ["Select Exam Type", "Mid-Term", "Final", "Unit Test", "Quiz"]

  // Different student data for different combinations
  const studentData: Record<string, Student[]> = {
    "Mathematics-Grade 10-A-Mid-Term": [
      { rollNo: 1, name: "John Smith", marks: "45" },
      { rollNo: 2, name: "Emma Johnson", marks: "48" },
      { rollNo: 3, name: "Michael Brown", marks: "42" },
      { rollNo: 4, name: "Sophia Davis", marks: "50" },
      { rollNo: 5, name: "William Wilson", marks: "38" },
    ],
    "Science-Grade 9-B-Final": [
      { rollNo: 1, name: "Oliver Garcia", marks: "44" },
      { rollNo: 2, name: "Ava Rodriguez", marks: "47" },
      { rollNo: 3, name: "Ethan Martinez", marks: "41" },
      { rollNo: 4, name: "Mia Lopez", marks: "49" },
      { rollNo: 5, name: "Noah Hernandez", marks: "43" },
      { rollNo: 6, name: "Isabella Gonzalez", marks: "46" },
    ],
    "English-Grade 8-A-Unit Test": [
      { rollNo: 1, name: "Liam Perez", marks: "40" },
      { rollNo: 2, name: "Charlotte Wilson", marks: "45" },
      { rollNo: 3, name: "Lucas Anderson", marks: "38" },
      { rollNo: 4, name: "Amelia Thomas", marks: "48" },
      { rollNo: 5, name: "Mason Taylor", marks: "42" },
      { rollNo: 6, name: "Harper Moore", marks: "44" },
      { rollNo: 7, name: "Elijah Jackson", marks: "46" },
    ],
  }

  const [students, setStudents] = useState<Student[]>([])

  const menuItems = [
    { name: "Student Profile", href: "/teacher/students", icon: Users },
    { name: "Homework", href: "/teacher/homework", icon: BookOpen },
    { name: "Update Scores", href: "/teacher/scores", icon: Award },
    { name: "Update Sports", href: "/teacher/sports", icon: Trophy },
  ]

  const handleMarksChange = (rollNo: number, value: string) => {
    // Allow only numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = value === "" ? 0 : parseInt(value)
      if (numValue <= maxMarks) {
        setStudents(students.map(student => 
          student.rollNo === rollNo 
            ? { ...student, marks: value }
            : student
        ))
        setHasChanges(true)
      }
    }
  }

  const handleFilterChange = () => {
    setStudents([])
    setHasChanges(false)
  }

  const handleUpdate = () => {
    // Here you would send the data to backend
    console.log("Updating scores:", {
      subject: selectedSubject,
      class: selectedClass,
      examType: selectedExamType,
      students: students
    })
    setHasChanges(false)
    alert("Scores updated successfully!")
  }

  const showTable = selectedSubject !== "" && selectedSubject !== "Select Subject" && 
                    selectedClass !== "" && selectedClass !== "Select Class" && 
                    selectedExamType !== "" && selectedExamType !== "Select Exam Type"

  // Load students when filters change
  const loadStudents = () => {
    if (showTable) {
      const key = `${selectedSubject}-${selectedClass}-${selectedExamType}`
      const data = studentData[key]
      if (data) {
        setStudents(data)
      } else {
        // Default empty students if combination not found
        setStudents([
          { rollNo: 1, name: "Student One", marks: "" },
          { rollNo: 2, name: "Student Two", marks: "" },
          { rollNo: 3, name: "Student Three", marks: "" },
          { rollNo: 4, name: "Student Four", marks: "" },
        ])
      }
      setHasChanges(false)
    }
  }

  // Effect to load students when filters change
  if (showTable && students.length === 0) {
    loadStudents()
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
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
              
              <div className="relative">
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
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">Update Exam Scores</h2>
            
            {/* Filter Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-700" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Select Exam Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => { setSelectedSubject(e.target.value); handleFilterChange(); }}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm text-gray-700 font-medium hover:border-gray-300 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3cpath%20fill%3D%22%23374151%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} className="py-2">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => { setSelectedClass(e.target.value); handleFilterChange(); }}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm text-gray-700 font-medium hover:border-gray-300 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3cpath%20fill%3D%22%23374151%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls} className="py-2">
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedExamType}
                    onChange={(e) => { setSelectedExamType(e.target.value); handleFilterChange(); }}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm text-gray-700 font-medium hover:border-gray-300 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3cpath%20fill%3D%22%23374151%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
                  >
                    {examTypes.map((type) => (
                      <option key={type} value={type} className="py-2">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Students Scores Table */}
            {showTable ? (
              <>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                            Roll No
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                            Student Name
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                            Marks (out of {maxMarks})
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {students.map((student) => (
                          <tr key={student.rollNo} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                              {student.rollNo}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                              {student.name}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                              <input
                                type="text"
                                value={student.marks}
                                onChange={(e) => handleMarksChange(student.rollNo, e.target.value)}
                                className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                                placeholder="0"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Update Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdate}
                    disabled={!hasChanges}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                      hasChanges
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Save className="w-5 h-5" />
                    Update Scores
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  Please select Subject, Class, and Exam Type to view and update scores
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
