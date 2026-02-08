/**
 * Mock Data for Frontend Review
 *
 * 목업 데모 전용 데이터/헬퍼 모음
 */

// ============================================================================
// Common Types
// ============================================================================

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded'
export type ReportStatus = 'draft' | 'published'
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled'
export type MockRole = 'mentor' | 'mentee' | 'admin'

// ============================================================================
// Core Types
// ============================================================================

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: 'mentor' | 'mentee' | 'admin'
  locale: string
  created_at: string
  updated_at: string
}

export interface Specialty {
  id: string
  name_ko: string
  name_en: string
  slug: string
  category: string
  created_at: string
}

export interface MentorProfile {
  id: string
  user_id: string
  company: string
  job_title: string
  bio: string
  location: string
  linkedin_url: string | null
  calendar_url: string
  session_duration_minutes: number
  session_price_usd: number
  is_active: boolean
  is_approved: boolean
  approval_status?: ApprovalStatus
  rejection_reason?: string | null
  created_at: string
  updated_at: string
  profiles: Profile
  mentor_specialties: Array<{
    specialties: Specialty
  }>
}

export interface DonationRecipient {
  id: string
  name: string
  description: string
  location: string
  is_active: boolean
  created_at: string
}

export interface ImpactReport {
  id: string
  title: string
  content: string
  report_period: string
  total_donated_usd: number
  total_mentors: number
  total_mentees: number
  total_sessions: number
  published_at: string
  created_at: string
  status?: ReportStatus
}

export interface Donation {
  id: string
  mentee_user_id: string
  mentor_profile_id: string
  amount_usd: number
  processing_fee_usd: number
  total_charged_usd: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  donated_at: string
  created_at: string
  mentor_profiles?: MentorProfile
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

// ============================================================================
// New Mock Types for Full MVP Simulation
// ============================================================================

export interface PaymentIntentMock {
  id: string
  mentee_user_id: string
  mentor_profile_id: string
  amount_usd: number
  processing_fee_usd: number
  total_charged_usd: number
  status: PaymentStatus
  created_at: string
  updated_at: string
  receipt_id?: string
}

export interface ReceiptMock {
  id: string
  payment_intent_id: string
  receipt_number: string
  donor_name: string
  donor_email: string
  amount_usd: number
  issue_date: string
  quid_pro_quo_mode: 'A' | 'B'
  services_fmv_usd: number
  tax_deductible_amount_usd: number
  status: 'issued' | 'resent'
  storage_path: string
}

export interface SessionMock {
  id: string
  mentor_profile_id: string
  mentor_name: string
  mentee_user_id: string
  mentee_name: string
  scheduled_at: string
  duration_minutes: number
  status: SessionStatus
  meeting_url: string
}

export interface MentorApplicationMock {
  id: string
  user_id: string
  mentor_profile_id: string
  submitted_at: string
  status: ApprovalStatus
  review_note: string | null
  reviewed_by: string | null
  reviewed_at: string | null
}

export interface AdminActionLogMock {
  id: string
  actor_role: 'admin'
  action: string
  target_type: 'mentor_application' | 'payment' | 'recipient' | 'report'
  target_id: string
  note: string
  created_at: string
}

export interface ImpactTrendPoint {
  month: string
  amount_usd: number
}

export interface ImpactCategoryPoint {
  category: string
  sessions: number
}

// ============================================================================
// Mock Profiles
// ============================================================================

export const mockUsersByRole: Record<MockRole, Profile> = {
  mentor: {
    id: 'user-1',
    email: 'kim.sungmin@example.com',
    full_name: '김성민',
    avatar_url: null,
    role: 'mentor',
    locale: 'ko',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  mentee: {
    id: 'current-user-id',
    email: 'user@example.com',
    full_name: '홍길동',
    avatar_url: null,
    role: 'mentee',
    locale: 'ko',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  admin: {
    id: 'admin-1',
    email: 'admin@globalmissionlight.org',
    full_name: 'GML 운영자',
    avatar_url: null,
    role: 'admin',
    locale: 'ko',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
}

export const mockCurrentUser: Profile = mockUsersByRole.mentee

// ============================================================================
// Mock Data
// ============================================================================

export const mockSpecialties: Specialty[] = [
  { id: 'spec-1', name_ko: '커리어 전환', name_en: 'Career Transition', slug: 'career-transition', category: '커리어', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-2', name_ko: '리더십 개발', name_en: 'Leadership Development', slug: 'leadership', category: '커리어', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-3', name_ko: '면접 준비', name_en: 'Interview Preparation', slug: 'interview-prep', category: '커리어', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-4', name_ko: '이력서 작성', name_en: 'Resume Writing', slug: 'resume', category: '커리어', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-5', name_ko: '창업', name_en: 'Entrepreneurship', slug: 'entrepreneurship', category: '비즈니스', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-6', name_ko: '비즈니스 전략', name_en: 'Business Strategy', slug: 'business-strategy', category: '비즈니스', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-7', name_ko: '마케팅', name_en: 'Marketing', slug: 'marketing', category: '비즈니스', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-8', name_ko: '세일즈', name_en: 'Sales', slug: 'sales', category: '비즈니스', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-9', name_ko: '소프트웨어 개발', name_en: 'Software Development', slug: 'software-dev', category: '기술', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-10', name_ko: '데이터 분석', name_en: 'Data Analysis', slug: 'data-analysis', category: '기술', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-11', name_ko: '프로덕트 매니지먼트', name_en: 'Product Management', slug: 'product-mgmt', category: '기술', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-12', name_ko: '재무 설계', name_en: 'Financial Planning', slug: 'financial-planning', category: '재무', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-13', name_ko: '투자', name_en: 'Investment', slug: 'investment', category: '재무', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-14', name_ko: '법률 자문', name_en: 'Legal Advice', slug: 'legal', category: '법률', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-15', name_ko: '영성 성장', name_en: 'Spiritual Growth', slug: 'spiritual-growth', category: '라이프', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-16', name_ko: '워라밸', name_en: 'Work-Life Balance', slug: 'work-life-balance', category: '라이프', created_at: '2026-01-01T00:00:00Z' },
  { id: 'spec-17', name_ko: '멘탈 헬스', name_en: 'Mental Health', slug: 'mental-health', category: '라이프', created_at: '2026-01-01T00:00:00Z' },
]

export const mockMentors: MentorProfile[] = [
  {
    id: 'mentor-1',
    user_id: 'user-1',
    company: 'Google',
    job_title: 'Senior Software Engineer',
    bio: '15년 경력의 소프트웨어 엔지니어로, 구글에서 대규모 시스템 설계를 담당하고 있습니다. 커리어 전환과 기술 면접 준비를 도와드립니다.',
    location: 'Austin, TX',
    linkedin_url: 'https://linkedin.com/in/mock-user',
    calendar_url: 'https://calendly.com/mock-user',
    session_duration_minutes: 60,
    session_price_usd: 50,
    is_active: true,
    is_approved: true,
    approval_status: 'approved',
    rejection_reason: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    profiles: mockUsersByRole.mentor,
    mentor_specialties: [
      { specialties: mockSpecialties[8] },
      { specialties: mockSpecialties[2] },
      { specialties: mockSpecialties[0] },
    ],
  },
  {
    id: 'mentor-2',
    user_id: 'user-2',
    company: 'McKinsey & Company',
    job_title: 'Management Consultant',
    bio: '맥킨지에서 7년간 경영 컨설팅을 하고 있습니다. 비즈니스 전략과 리더십 개발을 전문으로 합니다.',
    location: 'Dallas, TX',
    linkedin_url: 'https://linkedin.com/in/mock-user-2',
    calendar_url: 'https://calendly.com/mock-user-2',
    session_duration_minutes: 45,
    session_price_usd: 80,
    is_active: true,
    is_approved: true,
    approval_status: 'approved',
    rejection_reason: null,
    created_at: '2026-01-02T00:00:00Z',
    updated_at: '2026-01-16T00:00:00Z',
    profiles: {
      id: 'user-2',
      email: 'park.jiyoung@example.com',
      full_name: '박지영',
      avatar_url: null,
      role: 'mentor',
      locale: 'ko',
      created_at: '2026-01-02T00:00:00Z',
      updated_at: '2026-01-02T00:00:00Z',
    },
    mentor_specialties: [{ specialties: mockSpecialties[5] }, { specialties: mockSpecialties[1] }],
  },
  {
    id: 'mentor-3',
    user_id: 'user-3',
    company: 'Self-Employed',
    job_title: 'Startup Founder & CEO',
    bio: '3번의 창업 경험이 있는 시리얼 앤트러프러너입니다. 스타트업 창업과 초기 단계 비즈니스 전략을 함께 고민합니다.',
    location: 'Houston, TX',
    linkedin_url: null,
    calendar_url: 'https://cal.com/mock-user-3',
    session_duration_minutes: 30,
    session_price_usd: 30,
    is_active: true,
    is_approved: true,
    approval_status: 'approved',
    rejection_reason: null,
    created_at: '2026-01-03T00:00:00Z',
    updated_at: '2026-01-17T00:00:00Z',
    profiles: {
      id: 'user-3',
      email: 'lee.junho@example.com',
      full_name: '이준호',
      avatar_url: null,
      role: 'mentor',
      locale: 'ko',
      created_at: '2026-01-03T00:00:00Z',
      updated_at: '2026-01-03T00:00:00Z',
    },
    mentor_specialties: [{ specialties: mockSpecialties[4] }, { specialties: mockSpecialties[6] }],
  },
  {
    id: 'mentor-4',
    user_id: 'user-4',
    company: 'JPMorgan Chase',
    job_title: 'Investment Banker',
    bio: '월스트리트에서 10년간 투자은행 업무를 담당하고 있습니다. 재무 설계와 투자 전략을 도와드립니다.',
    location: 'New York, NY',
    linkedin_url: 'https://linkedin.com/in/mock-user-4',
    calendar_url: 'https://calendly.com/mock-user-4',
    session_duration_minutes: 60,
    session_price_usd: 100,
    is_active: true,
    is_approved: true,
    approval_status: 'approved',
    rejection_reason: null,
    created_at: '2026-01-04T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z',
    profiles: {
      id: 'user-4',
      email: 'choi.sujin@example.com',
      full_name: '최수진',
      avatar_url: null,
      role: 'mentor',
      locale: 'ko',
      created_at: '2026-01-04T00:00:00Z',
      updated_at: '2026-01-04T00:00:00Z',
    },
    mentor_specialties: [{ specialties: mockSpecialties[11] }, { specialties: mockSpecialties[12] }],
  },
  {
    id: 'mentor-5',
    user_id: 'user-5',
    company: 'Meta',
    job_title: 'Product Manager',
    bio: 'Meta에서 5년간 프로덕트 매니저로 일하고 있습니다. PM 커리어 전환과 프로덕트 전략을 함께 나눕니다.',
    location: 'San Jose, CA',
    linkedin_url: 'https://linkedin.com/in/mock-user-5',
    calendar_url: 'https://calendly.com/mock-user-5',
    session_duration_minutes: 45,
    session_price_usd: 60,
    is_active: true,
    is_approved: false,
    approval_status: 'pending',
    rejection_reason: null,
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-01-19T00:00:00Z',
    profiles: {
      id: 'user-5',
      email: 'jung.haneul@example.com',
      full_name: '정하늘',
      avatar_url: null,
      role: 'mentor',
      locale: 'ko',
      created_at: '2026-01-05T00:00:00Z',
      updated_at: '2026-01-05T00:00:00Z',
    },
    mentor_specialties: [{ specialties: mockSpecialties[10] }, { specialties: mockSpecialties[0] }],
  },
  {
    id: 'mentor-6',
    user_id: 'user-6',
    company: 'Grace Community Church',
    job_title: 'Life Coach & Ministry Leader',
    bio: '15년간 교회 사역자로 섬기며, 영성 코칭과 워라밸 멘토링을 하고 있습니다. 믿음 안에서 균형잡힌 삶을 함께 찾아갑니다.',
    location: 'Dallas, TX',
    linkedin_url: null,
    calendar_url: 'https://calendly.com/mock-user-6',
    session_duration_minutes: 60,
    session_price_usd: 25,
    is_active: true,
    is_approved: false,
    approval_status: 'rejected',
    rejection_reason: 'LinkedIn 프로필 검증 필요',
    created_at: '2026-01-06T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
    profiles: {
      id: 'user-6',
      email: 'han.mirae@example.com',
      full_name: '한미래',
      avatar_url: null,
      role: 'mentor',
      locale: 'ko',
      created_at: '2026-01-06T00:00:00Z',
      updated_at: '2026-01-06T00:00:00Z',
    },
    mentor_specialties: [
      { specialties: mockSpecialties[14] },
      { specialties: mockSpecialties[15] },
      { specialties: mockSpecialties[16] },
    ],
  },
]

export const mockDonationRecipients: DonationRecipient[] = [
  {
    id: 'recipient-1',
    name: '서울 개척교회',
    description: '서울 지역 개척 3년차 교회로, 청년 사역에 집중하고 있습니다.',
    location: '서울시 강남구',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'recipient-2',
    name: '부산 미자립교회',
    description: '부산 지역 미자립 교회로, 지역 사회 봉사에 힘쓰고 있습니다.',
    location: '부산시 해운대구',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'recipient-3',
    name: '대전 청년교회',
    description: '대전 지역 청년 중심 개척교회입니다.',
    location: '대전시 유성구',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
]

export const mockImpactStats = {
  totalDonatedUsd: 15750,
  totalMentors: 6,
  totalMentees: 42,
  totalSessions: 53,
  totalChurches: 3,
}

export const mockImpactReports: ImpactReport[] = [
  {
    id: 'report-1',
    title: '2026년 1월 임팩트 리포트',
    content: `## 감사 인사\n\nGlobal Mission Light 플랫폼을 통해 기부에 참여해 주신 모든 분들께 감사드립니다.\n\n## 이달의 성과\n\n- **총 기부금**: $8,250\n- **참여 멘토**: 6명\n- **도움 받은 멘티**: 25명\n- **진행된 세션**: 30회\n\n## 기부금 사용처\n\n1. 서울 개척교회 - $3,500\n2. 부산 미자립교회 - $2,800\n3. 대전 청년교회 - $1,950`,
    report_period: '2026-01',
    total_donated_usd: 8250,
    total_mentors: 6,
    total_mentees: 25,
    total_sessions: 30,
    published_at: '2026-02-01T00:00:00Z',
    created_at: '2026-02-01T00:00:00Z',
    status: 'published',
  },
  {
    id: 'report-2',
    title: '2025년 12월 임팩트 리포트',
    content: `## 감사 인사\n\n2025년 한 해를 마무리하며, 함께해 주신 모든 분들께 감사드립니다.\n\n## 이달의 성과\n\n- **총 기부금**: $7,500\n- **참여 멘토**: 5명\n- **도움 받은 멘티**: 17명\n- **진행된 세션**: 23회`,
    report_period: '2025-12',
    total_donated_usd: 7500,
    total_mentors: 5,
    total_mentees: 17,
    total_sessions: 23,
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    status: 'published',
  },
  {
    id: 'report-3',
    title: '2026년 2월 임팩트 리포트 (초안)',
    content: `운영팀 검수 중인 초안입니다.`,
    report_period: '2026-02',
    total_donated_usd: 0,
    total_mentors: 0,
    total_mentees: 0,
    total_sessions: 0,
    published_at: '',
    created_at: '2026-02-05T00:00:00Z',
    status: 'draft',
  },
]

export const mockImpactTrend: ImpactTrendPoint[] = [
  { month: '2025-10', amount_usd: 1900 },
  { month: '2025-11', amount_usd: 2350 },
  { month: '2025-12', amount_usd: 7500 },
  { month: '2026-01', amount_usd: 8250 },
  { month: '2026-02', amount_usd: 6100 },
]

export const mockImpactByCategory: ImpactCategoryPoint[] = [
  { category: '커리어', sessions: 18 },
  { category: '비즈니스', sessions: 15 },
  { category: '기술', sessions: 12 },
  { category: '재무', sessions: 5 },
  { category: '라이프', sessions: 3 },
]

export const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'GML은 어떻게 운영되나요?',
    answer: 'Global Mission Light는 미국 텍사스에 소재한 501(c)(3) 비영리 법인입니다. 전문가 멘토가 재능기부로 멘토링을 제공하고, 멘티가 지불한 세션 비용이 전액 기부금으로 전환되어 한국의 미자립/개척교회를 지원합니다.',
    category: '일반',
    order: 1,
  },
  {
    id: 'faq-2',
    question: '세션 비용은 어떻게 계산되나요?',
    answer: '각 멘토가 설정한 세션 가격이 100% 기부금으로 전환됩니다. 결제 처리 수수료(Stripe 수수료)는 멘티가 추가로 부담합니다.',
    category: '결제',
    order: 2,
  },
  {
    id: 'faq-3',
    question: '세금 공제를 받을 수 있나요?',
    answer: '네, GML은 미국 IRS로부터 501(c)(3) 인증을 받은 비영리 단체입니다. 세션 결제 후 세금 공제용 기부 영수증을 이메일로 발송해 드립니다.',
    category: '세금',
    order: 3,
  },
  {
    id: 'faq-4',
    question: '멘토는 어떻게 되나요?',
    answer: '회원가입 후 멘토 프로필을 작성해 주세요. 운영팀 승인 후 멘토 목록에 공개됩니다.',
    category: '멘토',
    order: 4,
  },
  {
    id: 'faq-5',
    question: '기부금은 어디에 사용되나요?',
    answer: '모든 기부금은 한국의 미자립 교회 및 개척 교회 지원에 사용됩니다. 매월 임팩트 리포트를 통해 사용 내역을 공개합니다.',
    category: '기부',
    order: 5,
  },
  {
    id: 'faq-6',
    question: '세션은 어떻게 진행되나요?',
    answer: '멘토 프로필의 세션 예약 버튼으로 캘린더 링크로 이동하고 결제를 완료하면 예약이 확정됩니다.',
    category: '세션',
    order: 6,
  },
]

export const mockDonations: Donation[] = [
  {
    id: 'donation-1',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-1',
    amount_usd: 50,
    processing_fee_usd: 1.75,
    total_charged_usd: 51.75,
    currency: 'usd',
    status: 'completed',
    donated_at: '2026-01-20T10:30:00Z',
    created_at: '2026-01-20T10:30:00Z',
    mentor_profiles: mockMentors[0],
  },
  {
    id: 'donation-2',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-2',
    amount_usd: 80,
    processing_fee_usd: 2.62,
    total_charged_usd: 82.62,
    currency: 'usd',
    status: 'completed',
    donated_at: '2026-01-15T14:00:00Z',
    created_at: '2026-01-15T14:00:00Z',
    mentor_profiles: mockMentors[1],
  },
  {
    id: 'donation-3',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-3',
    amount_usd: 30,
    processing_fee_usd: 1.17,
    total_charged_usd: 31.17,
    currency: 'usd',
    status: 'refunded',
    donated_at: '2026-01-10T16:45:00Z',
    created_at: '2026-01-10T16:45:00Z',
    mentor_profiles: mockMentors[2],
  },
]

export const mockSessions: SessionMock[] = [
  {
    id: 'session-1',
    mentor_profile_id: 'mentor-1',
    mentor_name: '김성민',
    mentee_user_id: 'current-user-id',
    mentee_name: '홍길동',
    scheduled_at: '2026-02-10T10:00:00Z',
    duration_minutes: 60,
    status: 'scheduled',
    meeting_url: 'https://meet.google.com/mock-s1',
  },
  {
    id: 'session-2',
    mentor_profile_id: 'mentor-2',
    mentor_name: '박지영',
    mentee_user_id: 'current-user-id',
    mentee_name: '홍길동',
    scheduled_at: '2026-01-18T14:00:00Z',
    duration_minutes: 45,
    status: 'completed',
    meeting_url: 'https://meet.google.com/mock-s2',
  },
  {
    id: 'session-3',
    mentor_profile_id: 'mentor-3',
    mentor_name: '이준호',
    mentee_user_id: 'current-user-id',
    mentee_name: '홍길동',
    scheduled_at: '2026-01-09T16:30:00Z',
    duration_minutes: 30,
    status: 'cancelled',
    meeting_url: 'https://meet.google.com/mock-s3',
  },
]

export const mockPaymentIntents: PaymentIntentMock[] = [
  {
    id: 'pi-1',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-1',
    amount_usd: 50,
    processing_fee_usd: 1.75,
    total_charged_usd: 51.75,
    status: 'paid',
    created_at: '2026-01-20T10:20:00Z',
    updated_at: '2026-01-20T10:30:00Z',
    receipt_id: 'receipt-1',
  },
  {
    id: 'pi-2',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-2',
    amount_usd: 80,
    processing_fee_usd: 2.62,
    total_charged_usd: 82.62,
    status: 'failed',
    created_at: '2026-02-01T12:00:00Z',
    updated_at: '2026-02-01T12:02:00Z',
  },
  {
    id: 'pi-3',
    mentee_user_id: 'current-user-id',
    mentor_profile_id: 'mentor-3',
    amount_usd: 30,
    processing_fee_usd: 1.17,
    total_charged_usd: 31.17,
    status: 'refunded',
    created_at: '2026-01-10T16:40:00Z',
    updated_at: '2026-01-12T09:00:00Z',
    receipt_id: 'receipt-2',
  },
]

export const mockReceipts: ReceiptMock[] = [
  {
    id: 'receipt-1',
    payment_intent_id: 'pi-1',
    receipt_number: 'GML-2026-00001',
    donor_name: '홍길동',
    donor_email: 'user@example.com',
    amount_usd: 50,
    issue_date: '2026-01-20',
    quid_pro_quo_mode: 'A',
    services_fmv_usd: 0,
    tax_deductible_amount_usd: 50,
    status: 'issued',
    storage_path: '/receipts/2026/GML-2026-00001.pdf',
  },
  {
    id: 'receipt-2',
    payment_intent_id: 'pi-3',
    receipt_number: 'GML-2026-00002',
    donor_name: '홍길동',
    donor_email: 'user@example.com',
    amount_usd: 30,
    issue_date: '2026-01-10',
    quid_pro_quo_mode: 'B',
    services_fmv_usd: 10,
    tax_deductible_amount_usd: 20,
    status: 'resent',
    storage_path: '/receipts/2026/GML-2026-00002.pdf',
  },
]

export const mockMentorApplications: MentorApplicationMock[] = [
  {
    id: 'application-1',
    user_id: 'user-5',
    mentor_profile_id: 'mentor-5',
    submitted_at: '2026-02-02T10:00:00Z',
    status: 'pending',
    review_note: null,
    reviewed_by: null,
    reviewed_at: null,
  },
  {
    id: 'application-2',
    user_id: 'user-6',
    mentor_profile_id: 'mentor-6',
    submitted_at: '2026-02-01T09:00:00Z',
    status: 'rejected',
    review_note: 'LinkedIn 인증 및 경력 증빙 자료 보완 필요',
    reviewed_by: 'admin-1',
    reviewed_at: '2026-02-02T12:00:00Z',
  },
]

export const mockAdminActionLogs: AdminActionLogMock[] = [
  {
    id: 'log-1',
    actor_role: 'admin',
    action: '멘토 신청 반려',
    target_type: 'mentor_application',
    target_id: 'application-2',
    note: 'LinkedIn 정보 미기재',
    created_at: '2026-02-02T12:00:00Z',
  },
  {
    id: 'log-2',
    actor_role: 'admin',
    action: '영수증 재발송',
    target_type: 'payment',
    target_id: 'pi-3',
    note: '사용자 요청으로 재발송 처리',
    created_at: '2026-02-03T15:20:00Z',
  },
]

// ============================================================================
// Utilities
// ============================================================================

export function getMentorById(id: string): MentorProfile | null {
  return mockMentors.find((m) => m.id === id) || null
}

export function getImpactReportById(id: string): ImpactReport | null {
  return mockImpactReports.find((report) => report.id === id) || null
}

export function getReceiptById(id: string): ReceiptMock | null {
  return mockReceipts.find((receipt) => receipt.id === id) || null
}

export function getMockUserByRole(role: MockRole): Profile {
  return mockUsersByRole[role]
}

export function calculateProcessingFee(amountUsd: number, rate = 0.029, fixedFee = 0.3): number {
  return Number((amountUsd * rate + fixedFee).toFixed(2))
}

export function getFilteredMentors(filters?: {
  search?: string
  category?: string
}): MentorProfile[] {
  let filtered = mockMentors.filter(
    (m) => m.is_active && (m.is_approved || m.approval_status === 'approved')
  )

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (m) =>
        m.profiles.full_name.toLowerCase().includes(search) ||
        m.company.toLowerCase().includes(search) ||
        m.job_title.toLowerCase().includes(search) ||
        m.bio.toLowerCase().includes(search)
    )
  }

  if (filters?.category && filters.category !== 'all') {
    filtered = filtered.filter((m) =>
      m.mentor_specialties.some((ms) => ms.specialties.category === filters.category)
    )
  }

  return filtered
}

export function getCategories(): string[] {
  const categories = new Set<string>()
  mockSpecialties.forEach((s) => categories.add(s.category))
  return Array.from(categories)
}

export function createPaymentIntentMock(params: {
  mentee_user_id: string
  mentor_profile_id: string
  amount_usd: number
}): PaymentIntentMock {
  const processing_fee_usd = calculateProcessingFee(params.amount_usd)
  const total_charged_usd = Number((params.amount_usd + processing_fee_usd).toFixed(2))

  return {
    id: `pi-new-${params.mentor_profile_id}`,
    mentee_user_id: params.mentee_user_id,
    mentor_profile_id: params.mentor_profile_id,
    amount_usd: params.amount_usd,
    processing_fee_usd,
    total_charged_usd,
    status: 'created',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export function simulatePaymentTransition(
  payment: PaymentIntentMock,
  status: PaymentStatus
): PaymentIntentMock {
  return {
    ...payment,
    status,
    updated_at: new Date().toISOString(),
  }
}

export function simulateApprovalTransition(
  application: MentorApplicationMock,
  status: ApprovalStatus,
  reviewNote: string
): MentorApplicationMock {
  return {
    ...application,
    status,
    review_note: reviewNote,
    reviewed_by: 'admin-1',
    reviewed_at: new Date().toISOString(),
  }
}

export function simulateReportTransition(report: ImpactReport, status: ReportStatus): ImpactReport {
  return {
    ...report,
    status,
    published_at: status === 'published' ? new Date().toISOString() : '',
  }
}

export function getMentorApplicationByMentorId(mentorId: string): MentorApplicationMock | null {
  return mockMentorApplications.find((application) => application.mentor_profile_id === mentorId) || null
}

export function getPaymentsByMenteeId(userId: string): PaymentIntentMock[] {
  return mockPaymentIntents.filter((payment) => payment.mentee_user_id === userId)
}

export function getSessionsByMenteeId(userId: string): SessionMock[] {
  return mockSessions.filter((session) => session.mentee_user_id === userId)
}

export function getSessionsByMentorId(mentorId: string): SessionMock[] {
  return mockSessions.filter((session) => session.mentor_profile_id === mentorId)
}

export function getReceiptByPaymentIntentId(paymentIntentId: string): ReceiptMock | null {
  return mockReceipts.find((receipt) => receipt.payment_intent_id === paymentIntentId) || null
}

export function getMentorStats(mentorId: string): {
  total_sessions: number
  completed_sessions: number
  scheduled_sessions: number
  cancelled_sessions: number
  total_contribution_usd: number
} {
  const sessions = getSessionsByMentorId(mentorId)
  const relatedPayments = mockPaymentIntents.filter((payment) => payment.mentor_profile_id === mentorId)

  return {
    total_sessions: sessions.length,
    completed_sessions: sessions.filter((session) => session.status === 'completed').length,
    scheduled_sessions: sessions.filter((session) => session.status === 'scheduled').length,
    cancelled_sessions: sessions.filter((session) => session.status === 'cancelled').length,
    total_contribution_usd: relatedPayments
      .filter((payment) => payment.status === 'paid' || payment.status === 'refunded')
      .reduce((sum, payment) => sum + payment.amount_usd, 0),
  }
}
