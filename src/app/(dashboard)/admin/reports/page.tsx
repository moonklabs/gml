'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockImpactReports, simulateReportTransition, type ImpactReport } from '@/lib/mock-data'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ImpactReport[]>(mockImpactReports)

  const handleToggleStatus = (report: ImpactReport) => {
    const nextStatus = report.status === 'published' ? 'draft' : 'published'

    setReports((prev) =>
      prev.map((item) => (item.id === report.id ? simulateReportTransition(item, nextStatus) : item))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">임팩트 리포트 관리</h1>
        <p className="text-gray-600 mt-2">월간 리포트 초안/발행 전환을 시뮬레이션합니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>리포트 목록</CardTitle>
          <CardDescription>발행 상태 전환 시 임팩트 페이지 노출 시나리오를 검증합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="border rounded-md p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{report.title}</p>
                <p className="text-sm text-gray-600">기간: {report.report_period}</p>
                <p className="text-sm text-gray-500">상태: {report.status || 'draft'}</p>
              </div>
              <Button onClick={() => handleToggleStatus(report)}>
                {report.status === 'published' ? '초안으로 전환' : '발행 처리'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
