'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockCurrentUser, mockSpecialties, mockDonations, getCategories } from '@/lib/mock-data'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 목 데이터 (실제로는 Supabase에서 가져올 데이터)
  const [formData, setFormData] = useState({
    fullName: mockCurrentUser.full_name,
    email: mockCurrentUser.email,
    company: 'Google',
    jobTitle: 'Senior Software Engineer',
    bio: '15년 경력의 소프트웨어 엔지니어입니다.',
    location: 'Austin, TX',
    linkedinUrl: 'https://linkedin.com/in/user',
    calendarUrl: 'https://calendly.com/user',
    sessionDuration: 60,
    sessionPrice: 50,
    specialties: ['software-dev', 'career-transition'],
  })

  const categories = getCategories()
  const isApproved = false // Mock: 승인 대기 중

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    // Mock mode: 1초 딜레이 후 성공 메시지
    // TODO: Supabase 복구 시 실제 저장 로직 추가
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSpecialtyToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(slug)
        ? prev.specialties.filter((s) => s !== slug)
        : [...prev.specialties, slug],
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">멘토 프로필 관리</h1>
        <p className="text-gray-600">
          멘토 프로필을 작성하고 승인을 받으면 멘토 목록에 공개됩니다.
        </p>
      </div>

      {/* 승인 상태 배너 */}
      {!isApproved && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <h3 className="font-semibold text-yellow-800">승인 대기 중</h3>
              <p className="text-sm text-yellow-700">
                프로필을 작성하신 후, GML 운영팀의 승인을 받으면 멘토 목록에 공개됩니다.
                승인은 보통 1~2 영업일 이내에 완료됩니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {isApproved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h3 className="font-semibold text-green-800">승인 완료</h3>
              <p className="text-sm text-green-700">
                멘토 프로필이 승인되어 공개되었습니다. 멘토 목록에서 확인하세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 성공 메시지 */}
      {success && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-700">✅ 프로필이 저장되었습니다!</p>
        </div>
      )}

      {/* 프로필 편집 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>멘토 프로필에 표시될 기본 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">이름 *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">이메일은 변경할 수 없습니다</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">회사</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">직무</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Senior Software Engineer"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">위치</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Austin, TX"
                disabled={loading}
              />
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
                placeholder="멘토로서의 경험과 멘티에게 제공할 수 있는 가치를 설명해 주세요..."
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        {/* 연락처 및 링크 */}
        <Card>
          <CardHeader>
            <CardTitle>연락처 및 링크</CardTitle>
            <CardDescription>멘티가 연락하거나 세션을 예약할 수 있는 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calendarUrl">캘린더 URL *</Label>
              <Input
                id="calendarUrl"
                name="calendarUrl"
                type="url"
                value={formData.calendarUrl}
                onChange={handleChange}
                required
                placeholder="https://calendly.com/yourname 또는 https://cal.com/yourname"
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Calendly, Cal.com 등의 캘린더 링크를 입력하세요. 멘티가 이 링크를 통해 세션을 예약합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 세션 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>세션 정보</CardTitle>
            <CardDescription>멘토링 세션의 시간과 가격을 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionDuration">세션 시간 (분) *</Label>
                <Input
                  id="sessionDuration"
                  name="sessionDuration"
                  type="number"
                  min="15"
                  max="180"
                  step="15"
                  value={formData.sessionDuration}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionPrice">세션 가격 (USD) *</Label>
                <Input
                  id="sessionPrice"
                  name="sessionPrice"
                  type="number"
                  min="10"
                  max="500"
                  step="5"
                  value={formData.sessionPrice}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 세션 가격은 멘티가 지불하는 금액이며, 100% 기부금으로 전환됩니다.
              멘토는 어떠한 금전적 보상도 받지 않습니다.
            </p>
          </CardContent>
        </Card>

        {/* 전문분야 선택 */}
        <Card>
          <CardHeader>
            <CardTitle>전문분야 *</CardTitle>
            <CardDescription>
              멘토링 가능한 전문분야를 선택하세요 (최소 1개, 최대 5개)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const categorySpecialties = mockSpecialties.filter(
                  (s) => s.category === category
                )
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySpecialties.map((specialty) => {
                        const isSelected = formData.specialties.includes(specialty.slug)
                        return (
                          <button
                            key={specialty.id}
                            type="button"
                            onClick={() => handleSpecialtyToggle(specialty.slug)}
                            disabled={loading}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              isSelected
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
            </div>
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? '저장 중...' : '프로필 저장'}
          </Button>
        </div>
      </form>

      {/* 최근 기부 내역 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>최근 기부 내역</CardTitle>
          <CardDescription>
            멘티로서 참여한 멘토링 세션 및 기부 내역입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="py-2">날짜</th>
                    <th className="py-2">멘토</th>
                    <th className="py-2">기부금</th>
                    <th className="py-2">수수료</th>
                    <th className="py-2">합계</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDonations.map((donation) => (
                    <tr key={donation.id} className="border-b">
                      <td className="py-2">
                        {new Date(donation.donated_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="py-2">
                        {donation.mentor_profiles?.profiles.full_name || '-'}
                      </td>
                      <td className="py-2 font-semibold text-blue-600">
                        ${donation.amount_usd}
                      </td>
                      <td className="py-2 text-gray-500">
                        ${donation.processing_fee_usd}
                      </td>
                      <td className="py-2 font-semibold">
                        ${donation.total_charged_usd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              아직 참여한 세션이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
