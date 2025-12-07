"use client"

import { useState, useRef } from "react"
import TeacherLayout from "@/components/TeacherLayout"
import { Upload, Video, Calendar, CheckCircle, Clock, XCircle, Trash2 } from "lucide-react"

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "events">("videos")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventImages, setEventImages] = useState<File[]>([])
  const videoInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Demo data - will be replaced with backend
  const uploadedVideos = [
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Basic concepts of algebraic expressions and equations",
      uploadDate: "Dec 1, 2025",
      status: "approved",
      views: 245
    },
    {
      id: 2,
      title: "Quadratic Equations",
      description: "Solving quadratic equations using different methods",
      uploadDate: "Dec 3, 2025",
      status: "pending",
      views: 0
    },
    {
      id: 3,
      title: "Trigonometry Basics",
      description: "Understanding sine, cosine, and tangent functions",
      uploadDate: "Nov 28, 2025",
      status: "rejected",
      views: 0,
      rejectionReason: "Video quality needs improvement"
    }
  ]

  const uploadedEvents = [
    {
      id: 1,
      title: "Science Fair 2025",
      description: "Annual science exhibition showcasing student projects",
      eventDate: "Jan 20, 2025",
      uploadDate: "Dec 2, 2025",
      status: "approved",
      images: 5
    },
    {
      id: 2,
      title: "Math Quiz Competition",
      description: "Inter-class mathematics competition",
      eventDate: "Dec 15, 2025",
      uploadDate: "Dec 5, 2025",
      status: "pending",
      images: 3
    }
  ]

  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Video upload:", { videoTitle, videoDescription, videoFile })
    alert("Video submitted for admin approval!")
    setVideoTitle("")
    setVideoDescription("")
    setVideoFile(null)
  }

  const handleEventUpload = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event upload:", { eventTitle, eventDescription, eventDate, eventImages })
    alert("Event submitted for admin approval!")
    setEventTitle("")
    setEventDescription("")
    setEventDate("")
    setEventImages([])
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventImages(Array.from(e.target.files))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        )
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        )
      default:
        return null
    }
  }

  return (
    <TeacherLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <Video className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Activities
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "videos"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
            }`}
          >
            Video Lectures
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "events"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
            }`}
          >
            Events
          </button>
        </div>

        {/* Video Lectures Tab */}
        {activeTab === "videos" && (
          <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Upload Video Lecture</h3>
              
              <form onSubmit={handleVideoUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm text-gray-700 hover:border-gray-300 transition-colors resize-none"
                    placeholder="Describe the video content"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Video File <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors text-sm text-gray-700 font-medium w-full justify-center"
                  >
                    <Upload className="w-5 h-5" />
                    {videoFile ? videoFile.name : "Upload Video File"}
                  </button>
                  <input
                    ref={videoInputRef}
                    type="file"
                    onChange={handleVideoFileChange}
                    className="hidden"
                    accept="video/*"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Submit for Approval
                </button>
              </form>
            </div>

            {/* Uploaded Videos List */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">My Video Lectures</h3>
              <div className="space-y-4">
                {uploadedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-slate-900 mb-1">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Uploaded: {video.uploadDate}</span>
                          {video.status === "approved" && (
                            <span>Views: {video.views}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(video.status)}
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    {video.status === "rejected" && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>Rejection Reason:</strong> {video.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Upload Event</h3>
              
              <form onSubmit={handleEventUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm text-gray-700 hover:border-gray-300 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm text-gray-700 hover:border-gray-300 transition-colors resize-none"
                    placeholder="Describe the event"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Event Images <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors text-sm text-gray-700 font-medium w-full justify-center"
                  >
                    <Upload className="w-5 h-5" />
                    {eventImages.length > 0 ? `${eventImages.length} images selected` : "Upload Event Images"}
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    onChange={handleImageFilesChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Submit for Approval
                </button>
              </form>
            </div>

            {/* Uploaded Events List */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">My Events</h3>
              <div className="space-y-4">
                {uploadedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-slate-900 mb-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Event Date: {event.eventDate}
                          </span>
                          <span>Uploaded: {event.uploadDate}</span>
                          <span>{event.images} images</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}
