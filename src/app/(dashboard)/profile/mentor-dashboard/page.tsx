import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getMentorStats, getSessionsByMentorId, mockMentors } from '@/lib/mock-data'

export default function MentorDashboardPage() {
  const mentor = mockMentors[0]
  const stats = getMentorStats(mentor.id)
  const sessions = getSessionsByMentorId(mentor.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">멘토 대시보드</h1>
        <p className="text-gray-600 mt-2">멘토 관점의 세션/기부 기여 통계를 확인합니다.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardHeader><CardDescription>총 세션</CardDescription><CardTitle>{stats.total_sessions}회</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>완료 세션</CardDescription><CardTitle>{stats.completed_sessions}회</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>예정 세션</CardDescription><CardTitle>{stats.scheduled_sessions}회</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>기여 기부금</CardDescription><CardTitle>${stats.total_contribution_usd.toFixed(2)}</CardTitle></CardHeader></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 세션</CardTitle>
          <CardDescription>멘토 기준 최근 세션 상태</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-md p-4 flex justify-between gap-3 items-center">
              <div>
                <p className="font-semibold">멘티: {session.mentee_name}</p>
                <p className="text-sm text-gray-600">{new Date(session.scheduled_at).toLocaleString('ko-KR')}</p>
              </div>
              <span className="rounded-full px-2 py-1 text-xs bg-gray-100">{session.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
