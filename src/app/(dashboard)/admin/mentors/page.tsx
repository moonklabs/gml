'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminGuard } from '@/components/layout/admin-guard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  mockMentorApplications,
  mockMentors,
  simulateApprovalTransition,
  type ApprovalStatus,
  type MentorApplicationMock,
} from '@/lib/mock-data'

export default function AdminMentorsPage() {
  const [applications, setApplications] = useState<MentorApplicationMock[]>(mockMentorApplications)

  const rows = useMemo(() => {
    return applications.map((application) => {
      const mentor = mockMentors.find((item) => item.id === application.mentor_profile_id)
      return { application, mentor }
    })
  }, [applications])

  const handleDecision = (id: string, status: ApprovalStatus) => {
    setApplications((prev) =>
      prev.map((application) => {
        if (application.id !== id) return application

        const note = status === 'approved' ? '승인 처리 완료' : '경력 증빙 재제출 필요'
        return simulateApprovalTransition(application, status, note)
      })
    )
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">멘토 승인 콘솔</h1>
          <p className="text-gray-600 mt-2">신청서를 검토하고 승인/반려를 시뮬레이션합니다.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>신청 목록</CardTitle>
            <CardDescription>승인 정책/기준은 최종 확정 전 목업 기준입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b text-left">
                  <tr>
                    <th className="py-2">멘토</th>
                    <th className="py-2">회사/직무</th>
                    <th className="py-2">상태</th>
                    <th className="py-2">검토 메모</th>
                    <th className="py-2">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ application, mentor }) => (
                    <tr key={application.id} className="border-b align-top">
                      <td className="py-3 font-medium">{mentor?.profiles.full_name || '-'}</td>
                      <td className="py-3">{mentor?.company} / {mentor?.job_title}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">{application.status}</span>
                      </td>
                      <td className="py-3 text-gray-600">{application.review_note || '-'}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleDecision(application.id, 'approved')}>승인</Button>
                          <Button size="sm" variant="outline" onClick={() => handleDecision(application.id, 'rejected')}>반려</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  )
}
