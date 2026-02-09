import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-6 space-y-2">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              📝 프로필 관리
            </Link>
            <Link
              href="/profile/sessions"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              📅 내 세션
            </Link>
            <Link
              href="/profile/mentor-dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              📊 멘토 대시보드
            </Link>
            <Link
              href="/receipts"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              🧾 영수증
            </Link>
            <div className="border-t border-gray-200 my-4"></div>
            <Link
              href="/admin"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              🛠 운영 콘솔
            </Link>
            <Link
              href="/mentors"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              ← 멘토 목록으로
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
