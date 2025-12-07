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
  Utensils
} from "lucide-react"

export default function FoodMenuPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Get current day
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  const currentDay = getCurrentDay()

  // Weekly menu data
  const weeklyMenu = {
    Monday: {
      breakfast: ["Idli with Sambar", "Coconut Chutney", "Banana", "Milk"],
      lunch: ["Chapati", "Dal Tadka", "Mixed Vegetable Curry", "Rice", "Curd", "Salad"],
      snacks: ["Vegetable Sandwich", "Fresh Juice"]
    },
    Tuesday: {
      breakfast: ["Poha", "Peanuts & Curry Leaves", "Apple", "Tea"],
      lunch: ["Paratha", "Rajma Masala", "Jeera Rice", "Raita", "Pickle", "Papad"],
      snacks: ["Samosa", "Green Chutney", "Milk"]
    },
    Wednesday: {
      breakfast: ["Upma", "Coconut Chutney", "Orange", "Milk"],
      lunch: ["Chapati", "Paneer Butter Masala", "Aloo Gobi", "Rice", "Dal", "Salad"],
      snacks: ["Bread Pakora", "Tomato Ketchup", "Tea"]
    },
    Thursday: {
      breakfast: ["Dosa with Potato Filling", "Sambar", "Coconut Chutney", "Banana", "Coffee"],
      lunch: ["Puri", "Chole", "Jeera Rice", "Boondi Raita", "Sweet Dish"],
      snacks: ["Vada Pav", "Green Chutney", "Juice"]
    },
    Friday: {
      breakfast: ["Paratha", "Curd", "Pickle", "Seasonal Fruit", "Milk"],
      lunch: ["Chapati", "Kadhi Pakora", "Bhindi Masala", "Rice", "Salad", "Papad"],
      snacks: ["Dhokla", "Green Chutney", "Tea"]
    },
    Saturday: {
      breakfast: ["Aloo Paratha", "Butter", "Curd", "Mango", "Milk"],
      lunch: ["Chapati", "Dal Makhani", "Mix Veg", "Pulao", "Raita", "Sweet"],
      snacks: ["Spring Roll", "Sauce", "Fresh Juice"]
    },
    Sunday: {
      breakfast: ["Special Breakfast - Pav Bhaji", "Butter", "Onion", "Lemon", "Milk"],
      lunch: ["Special Lunch - Biryani", "Raita", "Salad", "Gulab Jamun"],
      snacks: ["Pizza Slice", "Garlic Bread", "Cold Drink"]
    }
  }

  const menuItems = [
    { name: "Students dashboard", href: "/parent/dashboard", icon: UserCircle },
    { name: "Student Profile", href: "/parent/profile", icon: User },
    { name: "Enrollment Details", href: "/parent/enrollment", icon: ClipboardList },
    { name: "Notices", href: "/parent/notices", icon: FileText },
    { name: "Homework", href: "/parent/homework", icon: BookOpen },
    { name: "Exams", href: "/parent/exams", icon: GraduationCap },
    { name: "Fee Details", href: "/parent/fees", icon: CreditCard },
    { name: "Food Menu", href: "/parent/menu", icon: Utensils },
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
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Food Menu
              </h2>
            </div>

            {/* Carte du Jour - Today's Menu */}
            <div className="mb-8 sm:mb-12">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-2 border-orange-200 shadow-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      Carte du Jour
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Today's Special Menu - {currentDay}
                    </p>
                  </div>
                  <div className="text-4xl sm:text-5xl">
                    🍽️
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Breakfast */}
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🌅</span>
                      <h4 className="text-lg font-bold text-orange-600">Breakfast</h4>
                    </div>
                    <ul className="space-y-2">
                      {weeklyMenu[currentDay as keyof typeof weeklyMenu]?.breakfast.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch */}
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">☀️</span>
                      <h4 className="text-lg font-bold text-orange-600">Lunch</h4>
                    </div>
                    <ul className="space-y-2">
                      {weeklyMenu[currentDay as keyof typeof weeklyMenu]?.lunch.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Snacks */}
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🌙</span>
                      <h4 className="text-lg font-bold text-orange-600">Evening Snacks</h4>
                    </div>
                    <ul className="space-y-2">
                      {weeklyMenu[currentDay as keyof typeof weeklyMenu]?.snacks.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Weekly Food Schedule
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(weeklyMenu).map(([day, meals]) => (
                  <div
                    key={day}
                    className={`bg-white rounded-lg border shadow-sm p-6 transition-all ${
                      day === currentDay 
                        ? 'border-orange-400 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`text-lg font-bold ${
                        day === currentDay ? 'text-orange-600' : 'text-slate-900'
                      }`}>
                        {day}
                      </h4>
                      {day === currentDay && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Breakfast */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          🌅 Breakfast
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {meals.breakfast.map((item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Lunch */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          ☀️ Lunch
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {meals.lunch.map((item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Snacks */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          🌙 Evening Snacks
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {meals.snacks.map((item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Utensils className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Nutritious & Balanced Meals
                  </h4>
                  <p className="text-sm text-blue-700">
                    Our menu is carefully designed by nutritionists to provide balanced meals for growing children. 
                    All meals are prepared fresh daily in our hygienic kitchen. Special dietary requirements can be 
                    accommodated upon request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
