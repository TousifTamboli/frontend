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
  Award,
  X
} from "lucide-react"

export default function GalleryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; event: string } | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Gallery Data
  const galleryData = [
    {
      id: 1,
      src: "/logo.png",
      title: "Annual Sports Day Opening Ceremony",
      event: "Sports Day 2025",
      category: "Sports",
      date: "Jan 15, 2025"
    },
    {
      id: 2,
      src: "/logo.png",
      title: "Students Performing Cultural Dance",
      event: "Cultural Fest 2025",
      category: "Cultural",
      date: "Feb 10, 2025"
    },
    {
      id: 3,
      src: "/logo.png",
      title: "Science Project Exhibition",
      event: "Science Fair 2025",
      category: "Academic",
      date: "Jan 20, 2025"
    },
    {
      id: 4,
      src: "/logo.png",
      title: "Basketball Championship Winners",
      event: "Inter-School Tournament",
      category: "Sports",
      date: "Mar 5, 2025"
    },
    {
      id: 5,
      src: "/logo.png",
      title: "Drama Performance - Shakespeare Play",
      event: "Cultural Fest 2025",
      category: "Cultural",
      date: "Feb 12, 2025"
    },
    {
      id: 6,
      src: "/logo.png",
      title: "Math Olympiad Winners",
      event: "Math Olympiad 2025",
      category: "Academic",
      date: "Apr 20, 2025"
    },
    {
      id: 7,
      src: "/logo.png",
      title: "Football Team Practice Session",
      event: "Sports Day 2025",
      category: "Sports",
      date: "Jan 10, 2025"
    },
    {
      id: 8,
      src: "/logo.png",
      title: "Traditional Dance Performance",
      event: "Cultural Fest 2025",
      category: "Cultural",
      date: "Feb 11, 2025"
    },
    {
      id: 9,
      src: "/logo.png",
      title: "Robotics Competition",
      event: "Science Fair 2025",
      category: "Academic",
      date: "Jan 22, 2025"
    },
    {
      id: 10,
      src: "/logo.png",
      title: "Swimming Competition",
      event: "Sports Day 2025",
      category: "Sports",
      date: "Jan 16, 2025"
    },
    {
      id: 11,
      src: "/logo.png",
      title: "Music Concert Performance",
      event: "Cultural Fest 2025",
      category: "Cultural",
      date: "Feb 13, 2025"
    },
    {
      id: 12,
      src: "/logo.png",
      title: "Chemistry Lab Experiment",
      event: "Science Fair 2025",
      category: "Academic",
      date: "Jan 21, 2025"
    }
  ]

  const categories = ["All", "Sports", "Cultural", "Academic"]

  const filteredGallery = selectedCategory === "All" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory)

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
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Event Gallery
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Masonry Gallery Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage({ src: item.src, title: item.title, event: item.event })}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-sm font-semibold mb-1">{item.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-300">{item.event}</span>
                          <span className="text-xs text-gray-300">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.category === 'Sports'
                          ? 'bg-green-500 text-white'
                          : item.category === 'Cultural'
                          ? 'bg-purple-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredGallery.length === 0 && (
              <div className="text-center py-16">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No photos found in this category</p>
              </div>
            )}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <div
                className="max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedImage.event}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
