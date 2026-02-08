import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {/* 사이드바 (md 이상에서만 표시) */}
        <aside className="hidden md:block w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-6 space-y-2">
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              📝 프로필 관리
            </Link>
            <span className="block px-4 py-2 text-gray-400 cursor-not-allowed rounded-md">
              💰 기부 내역 (준비 중)
            </span>
            <span className="block px-4 py-2 text-gray-400 cursor-not-allowed rounded-md">
              📅 세션 관리 (준비 중)
            </span>
            <div className="border-t border-gray-200 my-4"></div>
            <Link
              href="/mentors"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              ← 멘토 목록으로
            </Link>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
