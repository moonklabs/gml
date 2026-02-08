'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getCategories,
  getMentorApplicationByMentorId,
  getMockUserByRole,
  mockDonations,
  mockMentors,
  mockSpecialties,
  type ApprovalStatus,
  type MockRole,
} from '@/lib/mock-data'
import { getStoredMockRole } from '@/lib/mock-auth'

function StatusBanner({ status, rejectionReason }: { status: ApprovalStatus; rejectionReason?: string | null }) {
  if (status === 'approved') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800">승인 완료</h3>
        <p className="text-sm text-green-700">멘토 프로필이 공개 상태입니다.</p>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-red-800">반려됨</h3>
        <p className="text-sm text-red-700">사유: {rejectionReason || '운영팀 검토 메모를 확인해 주세요.'}</p>
      </div>
    )
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-yellow-800">승인 대기 중</h3>
      <p className="text-sm text-yellow-700">운영팀 검토 후 멘토 목록에 공개됩니다. 평균 1~2 영업일 소요됩니다.</p>
    </div>
  )
}

export default function ProfilePage() {
  const [role, setRole] = useState<MockRole>('mentee')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [photoName, setPhotoName] = useState('')

  useEffect(() => {
    setRole(getStoredMockRole())
  }, [])

  const mentor = mockMentors[0]
  const app = getMentorApplicationByMentorId(mentor.id)
  const status = app?.status || 'pending'

  const [formData, setFormData] = useState({
    fullName: mentor.profiles.full_name,
    email: mentor.profiles.email,
    company: mentor.company,
    jobTitle: mentor.job_title,
    bio: mentor.bio,
    location: mentor.location,
    linkedinUrl: mentor.linkedin_url || '',
    calendarUrl: mentor.calendar_url,
    sessionDuration: mentor.session_duration_minutes,
    sessionPrice: mentor.session_price_usd,
    specialties: mentor.mentor_specialties.map((item) => item.specialties.slug),
  })

  const user = useMemo(() => getMockUserByRole(role), [role])
  const categories = getCategories()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }, 700)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSpecialtyToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(slug)
        ? prev.specialties.filter((item) => item !== slug)
        : [...prev.specialties, slug],
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">프로필 관리</h1>
        <p className="text-gray-600">
          현재 역할: <span className="font-semibold">{user.role}</span> · 목업 모드에서 저장/업로드 동작을 시뮬레이션합니다.
        </p>
      </div>

      {role === 'mentor' && <StatusBanner status={status} rejectionReason={app?.review_note || mentor.rejection_reason} />}

      {success && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-700 text-sm">
          프로필이 저장되었습니다. (목업 시뮬레이션)
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>멘토/멘티 공통 프로필 정보</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">이름 *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input id="email" name="email" value={formData.email} disabled className="bg-gray-50" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">회사</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">직무</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">위치</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">자기소개 *</Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>프로필 사진 업로드</CardTitle>
            <CardDescription>실제 업로드는 없고 파일 선택 상태만 시뮬레이션합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoName(e.target.files?.[0]?.name || '')}
            />
            <p className="text-xs text-gray-500">권장: 512x512 이상, 2MB 이하</p>
            {photoName && <p className="text-sm text-blue-600">선택된 파일: {photoName}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>연락처 및 세션</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input id="linkedinUrl" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendarUrl">캘린더 URL</Label>
              <Input id="calendarUrl" name="calendarUrl" value={formData.calendarUrl} onChange={handleChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionDuration">세션 시간 (분)</Label>
                <Input id="sessionDuration" name="sessionDuration" type="number" value={formData.sessionDuration} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionPrice">세션 가격 (USD)</Label>
                <Input id="sessionPrice" name="sessionPrice" type="number" value={formData.sessionPrice} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>전문분야</CardTitle>
            <CardDescription>최대 5개 선택 (시뮬레이션)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category) => {
              const categorySpecialties = mockSpecialties.filter((item) => item.category === category)
              return (
                <div key={category}>
                  <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySpecialties.map((specialty) => {
                      const selected = formData.specialties.includes(specialty.slug)
                      return (
                        <button
                          key={specialty.id}
                          type="button"
                          onClick={() => handleSpecialtyToggle(specialty.slug)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selected
                              ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {specialty.name_ko}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={loading}>{loading ? '저장 중...' : '프로필 저장'}</Button>
        </div>
      </form>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>최근 기부 내역</CardTitle>
          <CardDescription>멘티 기준 결제/기부 이력 목업</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-left">
                <tr>
                  <th className="py-2">날짜</th>
                  <th className="py-2">멘토</th>
                  <th className="py-2">기부금</th>
                  <th className="py-2">수수료</th>
                  <th className="py-2">상태</th>
                </tr>
              </thead>
              <tbody>
                {mockDonations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="py-2">{new Date(donation.donated_at).toLocaleDateString('ko-KR')}</td>
                    <td className="py-2">{donation.mentor_profiles?.profiles.full_name || '-'}</td>
                    <td className="py-2 font-semibold text-blue-600">${donation.amount_usd.toFixed(2)}</td>
                    <td className="py-2">${donation.processing_fee_usd.toFixed(2)}</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-gray-100 text-xs">{donation.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
