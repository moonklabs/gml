'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { MockRole } from '@/lib/mock-data'
import { getMockUserByRole } from '@/lib/mock-data'
import { clearStoredMockRole, getStoredMockRole, setStoredMockRole } from '@/lib/mock-auth'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [role, setRole] = useState<MockRole>('mentee')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const currentRole = getStoredMockRole()
    setRole(currentRole)
    setMounted(true)
  }, [])

  const user = useMemo(() => getMockUserByRole(role), [role])

  const handleRoleChange = (nextRole: MockRole) => {
    setRole(nextRole)
    setStoredMockRole(nextRole)

    if (nextRole === 'admin') {
      router.push('/admin')
      return
    }

    if (nextRole === 'mentor') {
      router.push('/profile/mentor-dashboard')
      return
    }

    router.push('/profile')
  }

  const handleLogout = () => {
    clearStoredMockRole()
    setRole('mentee')
    router.push('/')
  }

  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-between items-center min-h-16 py-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">GML</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/mentors" className="text-gray-700 hover:text-blue-600 transition">
              멘토 찾기
            </Link>
            <Link href="/impact" className="text-gray-700 hover:text-blue-600 transition">
              임팩트
            </Link>
            <Link href="/receipts" className="text-gray-700 hover:text-blue-600 transition">
              영수증
            </Link>
            {mounted && role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition">
                운영 콘솔
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as MockRole)}
                className="h-9 rounded-md border px-2 text-sm"
                aria-label="역할 전환"
              >
                <option value="mentee">멘티 모드</option>
                <option value="mentor">멘토 모드</option>
                <option value="admin">운영자 모드</option>
              </select>
            )}

            {mounted ? (
              <>
                {role === 'admin' ? (
                  <Link href="/admin">
                    <Button variant={pathname.startsWith('/admin') ? 'default' : 'outline'} size="sm">
                      관리자
                    </Button>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <Button variant={pathname.startsWith('/profile') ? 'default' : 'outline'} size="sm">
                      {role === 'mentor' ? '멘토 대시보드' : '내 프로필'}
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
                <span className="hidden lg:inline text-sm text-gray-500">{user.full_name}</span>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">로그인</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">멘토 되기</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
