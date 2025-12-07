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
  Send
} from "lucide-react"

export default function QueriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [queryType, setQueryType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments([...attachments, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend integration will go here
    console.log("Query submitted:", { 
      queryType, 
      title, 
      description, 
      attachments: attachments.map(f => f.name) 
    })
    alert(`Your ${queryType} query has been submitted successfully!`)
    setQueryType("")
    setTitle("")
    setDescription("")
    setAttachments([])
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
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
              Queries
            </h2>
            <p className="text-sm text-gray-600 mb-6 sm:mb-8">
              Have a question or concern? Send us your query and we'll get back to you soon.
            </p>
            
            {/* Query Form */}
            <div className="max-w-3xl">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Query Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={queryType}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
                      required
                    >
                      <option value="">Select query type</option>
                      <option value="Technical">Technical Query</option>
                      <option value="Admin">Admin Query</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      {queryType === "Technical" && "Your query will be sent to the Technical Support team"}
                      {queryType === "Admin" && "Your query will be sent to the Administrative team"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                      placeholder="Enter query title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm text-gray-700 hover:border-gray-300 transition-colors resize-none"
                      placeholder="Describe your query in detail"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors text-sm text-gray-700 font-medium w-full justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Upload Images or Documents
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                        multiple
                      />
                      
                      {attachments.length > 0 && (
                        <div className="space-y-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-gray-700 truncate">
                                  {file.name}
                                </span>
                                <span className="text-xs text-gray-500 flex-shrink-0">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0 ml-2"
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
                  >
                    <Send className="w-5 h-5" />
                    Send Query
                  </button>
                </form>
              </div>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Response Time
                    </h4>
                    <p className="text-sm text-blue-700">
                      We typically respond to Queries within 24-48 hours during working days. 
                      For urgent matters, please contact the school office directly.
                    </p>
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
