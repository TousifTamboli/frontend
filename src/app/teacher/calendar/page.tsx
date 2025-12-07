"use client"

import { useState } from "react"
import TeacherLayout from "@/components/TeacherLayout"
import { Calendar, ChevronLeft, ChevronRight, BookOpen, GraduationCap, Trophy, Briefcase, AlertCircle } from "lucide-react"

export default function AcademicCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Academic Year Data
  const academicYear = "2025-2026"
  
  // Important Dates and Events
  const academicEvents = [
    {
      id: 1,
      title: "Academic Year Begins",
      date: "2025-04-01",
      type: "academic",
      description: "First day of the new academic year. Welcome ceremony for new students.",
      icon: BookOpen
    },
    {
      id: 2,
      title: "First Term Begins",
      date: "2025-04-01",
      endDate: "2025-07-31",
      type: "term",
      description: "First term classes commence. Focus on foundational concepts.",
      icon: BookOpen
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: "2025-05-15",
      type: "meeting",
      description: "First PTM of the year. Discuss student progress and expectations.",
      icon: Briefcase
    },
    {
      id: 4,
      title: "Mid-Term Examinations",
      date: "2025-06-15",
      endDate: "2025-06-25",
      type: "exam",
      description: "First term mid-term examinations for all grades.",
      icon: GraduationCap
    },
    {
      id: 5,
      title: "Sports Day",
      date: "2025-07-10",
      type: "event",
      description: "Annual sports day with various athletic competitions.",
      icon: Trophy
    },
    {
      id: 6,
      title: "First Term Ends",
      date: "2025-07-31",
      type: "term",
      description: "Last day of first term. Report cards distribution.",
      icon: BookOpen
    },
    {
      id: 7,
      title: "Summer Vacation",
      date: "2025-08-01",
      endDate: "2025-08-31",
      type: "holiday",
      description: "Summer break for students and staff.",
      icon: AlertCircle
    },
    {
      id: 8,
      title: "Second Term Begins",
      date: "2025-09-01",
      endDate: "2025-12-20",
      type: "term",
      description: "Second term classes commence.",
      icon: BookOpen
    },
    {
      id: 9,
      title: "Teachers' Day",
      date: "2025-09-05",
      type: "event",
      description: "Celebration of Teachers' Day with special programs.",
      icon: Trophy
    },
    {
      id: 10,
      title: "Half-Yearly Examinations",
      date: "2025-10-15",
      endDate: "2025-10-30",
      type: "exam",
      description: "Half-yearly examinations for all classes.",
      icon: GraduationCap
    },
    {
      id: 11,
      title: "Cultural Fest",
      date: "2025-11-20",
      type: "event",
      description: "Annual cultural festival with music, dance, and drama performances.",
      icon: Trophy
    },
    {
      id: 12,
      title: "Parent-Teacher Meeting",
      date: "2025-11-25",
      type: "meeting",
      description: "Second PTM to discuss half-yearly performance.",
      icon: Briefcase
    },
    {
      id: 13,
      title: "Winter Break",
      date: "2025-12-21",
      endDate: "2026-01-05",
      type: "holiday",
      description: "Winter vacation for Christmas and New Year.",
      icon: AlertCircle
    },
    {
      id: 14,
      title: "Third Term Begins",
      date: "2026-01-06",
      endDate: "2026-03-31",
      type: "term",
      description: "Final term of the academic year begins.",
      icon: BookOpen
    },
    {
      id: 15,
      title: "Science Fair",
      date: "2026-01-25",
      type: "event",
      description: "Annual science exhibition showcasing student projects.",
      icon: Trophy
    },
    {
      id: 16,
      title: "Annual Examinations",
      date: "2026-03-01",
      endDate: "2026-03-20",
      type: "exam",
      description: "Final examinations of the academic year.",
      icon: GraduationCap
    },
    {
      id: 17,
      title: "Result Declaration",
      date: "2026-03-28",
      type: "academic",
      description: "Annual results announced. Report cards distribution.",
      icon: GraduationCap
    },
    {
      id: 18,
      title: "Academic Year Ends",
      date: "2026-03-31",
      type: "academic",
      description: "Last day of the academic year. Farewell ceremony.",
      icon: BookOpen
    }
  ]

  // Get events for current month
  const getEventsForMonth = () => {
    return academicEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth.getMonth() && 
             eventDate.getFullYear() === currentMonth.getFullYear()
    })
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "exam":
        return "bg-red-100 text-red-700 border-red-300"
      case "event":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "meeting":
        return "bg-green-100 text-green-700 border-green-300"
      case "holiday":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "term":
        return "bg-indigo-100 text-indigo-700 border-indigo-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getEventTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      academic: "Academic",
      exam: "Examination",
      event: "Event",
      meeting: "Meeting",
      holiday: "Holiday",
      term: "Term"
    }
    return labels[type] || type
  }

  // Calendar grid generation
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const hasEventOnDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return academicEvents.some(event => event.date === dateStr)
  }

  return (
    <TeacherLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Academic Calendar
            </h2>
            <p className="text-sm text-gray-600">Academic Year {academicYear}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold text-slate-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }
                  
                  const hasEvent = hasEventOnDay(day)
                  const isToday = day === new Date().getDate() && 
                                 currentMonth.getMonth() === new Date().getMonth() &&
                                 currentMonth.getFullYear() === new Date().getFullYear()
                  
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded text-sm font-medium transition-colors relative ${
                        hasEvent 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      } ${isToday ? 'ring-2 ring-blue-600' : ''}`}
                    >
                      {day}
                      {hasEvent && (
                        <div className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-3">Legend:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div>
                    <span className="text-xs text-gray-600">Academic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
                    <span className="text-xs text-gray-600">Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-purple-100 border border-purple-300"></div>
                    <span className="text-xs text-gray-600">Event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
                    <span className="text-xs text-gray-600">Meeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
                    <span className="text-xs text-gray-600">Holiday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-indigo-100 border border-indigo-300"></div>
                    <span className="text-xs text-gray-600">Term</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Month Events */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Events in {monthNames[currentMonth.getMonth()]}
              </h3>
              <div className="space-y-3">
                {getEventsForMonth().length > 0 ? (
                  getEventsForMonth().map((event) => {
                    const Icon = event.icon
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${getEventTypeColor(event.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm opacity-90">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                              {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}`}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                            {getEventTypeBadge(event.type)}
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No events this month</p>
                )}
              </div>
            </div>
          </div>

          {/* Yearly Overview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Yearly Overview</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">Total School Days</p>
                  <p className="text-2xl font-bold text-blue-600">220</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-900">Working Days</p>
                  <p className="text-2xl font-bold text-green-600">180</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-semibold text-orange-900">Holidays</p>
                  <p className="text-2xl font-bold text-orange-600">40</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Term Schedule</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-indigo-500 bg-indigo-50">
                  <p className="text-sm font-semibold text-indigo-900">First Term</p>
                  <p className="text-xs text-indigo-700">Apr 1 - Jul 31, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-indigo-500 bg-indigo-50">
                  <p className="text-sm font-semibold text-indigo-900">Second Term</p>
                  <p className="text-xs text-indigo-700">Sep 1 - Dec 20, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-indigo-500 bg-indigo-50">
                  <p className="text-sm font-semibold text-indigo-900">Third Term</p>
                  <p className="text-xs text-indigo-700">Jan 6 - Mar 31, 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {academicEvents
                  .filter(event => new Date(event.date) > new Date())
                  .slice(0, 5)
                  .map((event) => {
                    const Icon = event.icon
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <Icon className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 rounded-t-lg ${getEventTypeColor(selectedEvent.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {selectedEvent.icon && <selectedEvent.icon className="w-6 h-6 flex-shrink-0 mt-1" />}
                    <div>
                      <h3 className="text-xl font-bold mb-1">{selectedEvent.title}</h3>
                      <p className="text-sm opacity-90">
                        {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                        {selectedEvent.endDate && ` - ${new Date(selectedEvent.endDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}
