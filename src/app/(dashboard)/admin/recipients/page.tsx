'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminGuard } from '@/components/layout/admin-guard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { mockDonationRecipients, type DonationRecipient } from '@/lib/mock-data'

export default function AdminRecipientsPage() {
  const [recipients, setRecipients] = useState<DonationRecipient[]>(mockDonationRecipients)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const addRecipient = () => {
    if (!name.trim() || !location.trim()) return

    setRecipients((prev) => [
      ...prev,
      {
        id: `recipient-${prev.length + 1}`,
        name,
        description: '운영자가 추가한 목업 데이터입니다.',
        location,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ])

    setName('')
    setLocation('')
  }

  const toggleActive = (id: string) => {
    setRecipients((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_active: !item.is_active,
            }
          : item
      )
    )
  }

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">기부처 관리</h1>
          <p className="text-gray-600 mt-2">기부처 추가/활성화/삭제 시나리오를 목업으로 검증합니다.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>기부처 추가</CardTitle>
            <CardDescription>실제 저장 없이 현재 화면 상태만 업데이트됩니다.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-3">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="기부처 이름" />
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="위치" />
            <Button onClick={addRecipient}>추가</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>기부처 목록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recipients.map((item) => (
              <div key={item.id} className="border rounded-md p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.location}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleActive(item.id)}>
                    {item.is_active ? '비활성화' : '활성화'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => removeRecipient(item.id)}>
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  )
}
