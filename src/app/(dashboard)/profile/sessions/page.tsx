import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSessionsByMenteeId, mockSessions } from '@/lib/mock-data'

const statusStyle = {
  scheduled: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700',
}

export default function ProfileSessionsPage() {
  const sessions = getSessionsByMenteeId('current-user-id')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">내 세션 요청</h1>
        <p className="text-gray-600 mt-2">예정/완료/취소 상태를 포함한 전체 세션 이력을 확인합니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>세션 목록</CardTitle>
          <CardDescription>총 {mockSessions.length}건 중 내 세션 {sessions.length}건</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-md p-4 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
              <div>
                <p className="font-semibold">멘토: {session.mentor_name}</p>
                <p className="text-sm text-gray-600">일정: {new Date(session.scheduled_at).toLocaleString('ko-KR')}</p>
                <p className="text-sm text-gray-600">시간: {session.duration_minutes}분</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-1 text-xs ${statusStyle[session.status]}`}>{session.status}</span>
                <a href={session.meeting_url} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">미팅 링크</Button>
                </a>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Link href="/mentors"><Button variant="ghost">← 멘토 목록으로</Button></Link>
    </div>
  )
}
