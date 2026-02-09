'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getStoredMockRole } from '@/lib/mock-auth'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const role = getStoredMockRole()
    setIsAdmin(role === 'admin')
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="text-sm text-gray-500">권한 확인 중...</div>
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>운영자 전용 화면</CardTitle>
          <CardDescription>현재 역할로는 운영 콘솔에 접근할 수 없습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">헤더의 역할 전환에서 <strong>운영자 모드</strong>로 변경 후 다시 접근하세요.</p>
          <Link href="/profile">
            <Button variant="outline">프로필로 돌아가기</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
