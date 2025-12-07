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
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

export default function FeeDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [barcodeExpanded, setBarcodeExpanded] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { name: "Students dashboard", href: "/parent/dashboard", icon: UserCircle },
    { name: "Student Profile", href: "/parent/profile", icon: User },
    { name: "Enrollment Details", href: "/parent/enrollment", icon: ClipboardList },
    { name: "Notices", href: "/parent/notices", icon: FileText },
    { name: "Homework", href: "/parent/homework", icon: BookOpen },
    { name: "Exams", href: "/parent/exams", icon: GraduationCap },
    { name: "Fee Details", href: "/parent/fees", icon: CreditCard },
    { name: "Food Menu", href: "/parent/menu", icon: BookOpen },
    { name: "Queries", href: "/parent/queries", icon: MessageSquare },
    { name: "Sports", href: "/parent/sports", icon: Trophy },
    { name: "Admission Details", href: "/parent/admission", icon: ClipboardList },
    { name: "Franchise Details", href: "/parent/franchise", icon: Building2 },
    { name: "Camera Access", href: "/parent/camera", icon: Camera },
  ]

  // Demo fee data - will be replaced with backend data
  const feeData = {
    totalFees: 50000,
    paidFees: 30000,
    outstandingFees: 20000,
    lateFeeCharges: 500
  }

  const paidInstallments = [
    { id: 1, installment: "1st Installment", amount: 15000, date: "Apr 15, 2025", receiptNo: "REC001" },
    { id: 2, installment: "2nd Installment", amount: 15000, date: "Aug 20, 2025", receiptNo: "REC002" }
  ]

  const upcomingInstallments = [
    { id: 1, installment: "3rd Installment", amount: 10000, dueDate: "Dec 15, 2025" },
    { id: 2, installment: "4th Installment", amount: 10000, dueDate: "Mar 15, 2026" }
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

  const handleDownloadReceipt = (receiptNo: string) => {
    console.log("Downloading receipt:", receiptNo)
    // Backend integration will go here
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
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 sm:mb-8">
              Fee Details
            </h2>
            
            {/* Fee Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Total Fees</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  ₹{feeData.totalFees.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">Academic Year 2025-26</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Paid Fees</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₹{feeData.paidFees.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">{paidInstallments.length} installments paid</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Outstanding</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  ₹{feeData.outstandingFees.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">{upcomingInstallments.length} pending installments</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Late Fee</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  ₹{feeData.lateFeeCharges.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">Additional charges</p>
              </div>
            </div>

            {/* Paid Installments */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Paid Installments
              </h3>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Installment
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Amount
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Date Paid
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paidInstallments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                            {payment.installment}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            ₹{payment.amount.toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {payment.date}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <button
                              onClick={() => handleDownloadReceipt(payment.receiptNo)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              <span className="hidden sm:inline">Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Upcoming Installments */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Upcoming Installments
              </h3>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Installment
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Amount
                        </th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {upcomingInstallments.map((installment) => (
                        <tr key={installment.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap font-medium">
                            {installment.installment}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            ₹{installment.amount.toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {installment.dueDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
                Bank Details for Payment
              </h3>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Bank Name
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      State Bank of India
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Account Holder Name
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      ABC International School
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Account Number
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      1234567890123456
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      IFSC Code
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      SBIN0001234
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Branch Name
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      Main Branch, City Center
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Account Type
                    </label>
                    <p className="text-base font-semibold text-slate-900">
                      Current Account
                    </p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={() => setBarcodeExpanded(!barcodeExpanded)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">
                          UPI QR Code for Payment
                        </h4>
                        <p className="text-sm text-gray-600">
                          Scan to pay using any UPI app
                        </p>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${barcodeExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {barcodeExpanded && (
                    <div className="mt-6 flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        {/* QR Code Placeholder - Replace with actual QR code generator */}
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
                          <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm4 8h-2v2h2v-2zm-2 2h-2v2h2v-2zm2 2h-2v2h2v-2zm0 2h2v-2h2v2h-2v2h-2v-2zm-4 0h2v2h-2v-2zm2-6h2v2h-2v-2zm0-2h2v2h-2v-2z"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-4 text-center">
                        UPI ID: <span className="font-semibold text-slate-900">school@sbi</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2 text-center max-w-md">
                        Please mention student name and installment number in the payment remarks
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
