import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">GML</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/mentors" className="text-gray-700 hover:text-blue-600 transition">
              멘토 찾기
            </Link>
            <Link href="/impact" className="text-gray-700 hover:text-blue-600 transition">
              임팩트
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">로그인</Button>
            </Link>
            <Link href="/signup">
              <Button>멘토 되기</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
