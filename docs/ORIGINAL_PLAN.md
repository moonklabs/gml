# GML (Global Mission Light) - 크리스챤 기부 멘토링 플랫폼 시스템 설계

## Context

미국 텍사스 소재 Non-profit 법인(Global Mission Light)이 운영하는 **크리스챤 기부 멘토링 플랫폼**을 신규 구축한다.
크리스챤 전문가(멘토)가 도움이 필요한 크리스챤(멘티)에게 멘토링을 제공하고, 멘티가 지불한 세션 비용이 **전액 기부금으로 전환**되는 구조이다.
기부금은 한국 미자립/개척교회에 분배되며, 매월/분기별 임팩트 레터를 공시한다.

**핵심 가치**: 멘토는 재능으로 섬기고, 멘티는 도움을 받으면서 기부에 참여하는 선순환

### 결정된 사항
- 결제 수수료: **멘티가 추가 부담** (기부금 전액 전달)
- 세션 예약: **외부 캘린더 링크 연동** (Calendly/Cal.com 등)
- 인증: **Google OAuth + 이메일/비밀번호**
- 백엔드: **Supabase** (Auth + PostgreSQL + Storage)

---

## 1. 요구사항 정리

### 1.1 핵심 기능 (MVP)

| # | 기능 | 설명 | 우선순위 |
|---|------|------|---------|
| F1 | 랜딩 페이지 | 기부 멘토링 소개, 진행 순서 안내, CTA | P0 |
| F2 | 멘토 목록 | 카드형 UI, 검색/필터 (분야, 직무, 위치) | P0 |
| F3 | 멘토 상세 프로필 | 이름, 회사, 직무, 설명, LinkedIn, 가능시간 URL, 세션 정보, 전문분야, 사진 | P0 |
| F4 | 멘토 회원가입/로그인 | Google OAuth + 이메일/비밀번호 (Supabase Auth) | P0 |
| F5 | 멘토 프로필 관리 | 프로필 생성/수정 CRUD | P0 |
| F6 | 임팩트 페이지 | 총 기부금 현황, 기부처 안내, 멘토/멘티 수 통계 대시보드 | P1 |
| F7 | Stripe 결제 | 세션 결제 → 전액 기부 전환, 수수료 멘티 추가 부담 | P2 (마지막) |
| F8 | 기부 영수증 | 501(c)(3) 요건 충족 PDF 자동 생성/이메일 발송 | P2 |

### 1.2 비기능 요구사항

- **다국어**: 초기 한국어 → 이후 영어 확장 가능 구조
- **다통화**: 초기 USD → 이후 KRW 등 확장
- **반응형**: 모바일 퍼스트 디자인
- **SEO**: 서버사이드 렌더링 (Next.js App Router)
- **접근성**: WCAG 2.1 AA 기본 준수
- **성능**: Core Web Vitals 기준 충족 (LCP < 2.5s)

---

## 2. 기술 스택

| 영역 | 기술 | 선택 이유 | 무료 티어 |
|------|------|---------|---------|
| **프레임워크** | Next.js 15 (App Router) + TypeScript | SSR/SSG, API Routes, 풀스택 | Vercel Hobby |
| **스타일링** | Tailwind CSS + shadcn/ui | 빠른 UI 개발, 일관된 디자인 시스템 | 무료 |
| **백엔드/DB** | Supabase (PostgreSQL) | Auth+DB+Storage+Realtime 올인원 | 500MB DB, 1GB Storage |
| **인증** | Supabase Auth | Google OAuth + Email/PW 내장 | 50,000 MAU |
| **파일 저장** | Supabase Storage | 멘토 프로필 사진 | 1GB 무료 |
| **결제** | Stripe Checkout | 글로벌 결제, 비영리 할인, Webhook | 거래 수수료만 |
| **이메일** | Resend | 기부 영수증, 알림 발송 | 100통/일 |
| **배포** | Vercel | Next.js 최적 배포, Edge Functions | Hobby 무료 |
| **모니터링** | Vercel Analytics + Sentry | 성능/에러 추적 | 무료 티어 |
| **i18n** | next-intl | 다국어 지원 (추후 확장) | 무료 |

### 월간 비용 추정

| 단계 | 기간 | 예상 비용 | 비고 |
|------|------|---------|------|
| **MVP** | 0~3개월 | **~$1/월** | 도메인만 (모든 서비스 무료 티어) |
| **런칭 후** | 3~6개월 | **~$25/월** | Supabase Pro ($25) 전환 시점 |
| **성장기** | 6~12개월 | **~$50~100/월** | 트래픽 증가에 따른 스케일업 |

---

## 3. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│              Next.js App (SSR + Client)                  │
└──────────┬──────────────────────┬───────────────────────┘
           │                      │
           ▼                      ▼
┌─────────────────┐    ┌──────────────────┐
│   Vercel Edge    │    │  Vercel Functions │
│   (Static/SSR)   │    │  (API Routes)    │
└─────────────────┘    └────────┬─────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────────┐
        │ Supabase │   │ Supabase │   │   Supabase   │
        │   Auth   │   │ Database │   │   Storage    │
        │          │   │ (Postgres)│   │  (프로필사진) │
        └──────────┘   └──────────┘   └──────────────┘
                                │
                                ▼
                ┌──────────────────────────┐
                │     Stripe Checkout      │
                │  (결제 처리 + Webhook)    │
                └──────────┬───────────────┘
                           │
                           ▼
                ┌──────────────────┐
                │     Resend       │
                │  (영수증 이메일)   │
                └──────────────────┘
```

### 핵심 데이터 흐름

**멘토링 세션 결제 흐름:**
```
1. 멘티 → 멘토 프로필에서 "세션 예약 + 기부" 클릭
2. → Stripe Checkout Session 생성 (세션비 + 수수료 계산)
3. → Stripe Hosted 결제 페이지 (USD)
4. → 결제 완료 → Stripe Webhook → API Route
5. → donations 테이블에 기록
6. → 501(c)(3) 기부 영수증 PDF 생성
7. → Resend로 멘티에게 영수증 이메일 발송
8. → 멘토에게 세션 예약 알림 발송
```

---

## 4. 데이터베이스 스키마

### 4.1 ERD 개요

```
profiles (멘토/멘티 공용)
    ├── mentor_profiles (멘토 전용 정보)
    │       ├── mentor_specialties (멘토-전문분야 N:M)
    │       └── mentor_sessions (세션 유형 정보)
    ├── donations (기부/결제 기록)
    │       └── donation_receipts (영수증)
    └── impact_reports (임팩트 리포트)

specialties (전문분야 마스터)
donation_recipients (기부처 마스터)
```

### 4.2 테이블 상세

```sql
-- 사용자 프로필 (Supabase Auth 연동)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'mentee' CHECK (role IN ('mentor', 'mentee', 'admin')),
  locale TEXT DEFAULT 'ko',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 멘토 프로필 (멘토 전용 확장 정보)
CREATE TABLE mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company TEXT,
  job_title TEXT,
  bio TEXT,                          -- 자기소개
  location TEXT,                     -- 거주 지역 (예: "서울", "텍사스")
  linkedin_url TEXT,
  calendar_url TEXT,                 -- Calendly/Cal.com 등 외부 예약 링크
  session_duration_minutes INT DEFAULT 30,
  session_price_usd DECIMAL(10,2),   -- 세션 가격 (USD)
  is_active BOOLEAN DEFAULT true,    -- 활성/비활성
  is_approved BOOLEAN DEFAULT false, -- 관리자 승인 여부
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- 전문분야 마스터 테이블
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ko TEXT NOT NULL,    -- 한국어명
  name_en TEXT,             -- 영어명 (다국어 확장용)
  slug TEXT UNIQUE NOT NULL,
  category TEXT,            -- 카테고리 (커리어, 비즈니스, 법률, 재무 등)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 멘토-전문분야 매핑 (N:M)
CREATE TABLE mentor_specialties (
  mentor_profile_id UUID REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  specialty_id UUID REFERENCES specialties(id) ON DELETE CASCADE,
  PRIMARY KEY (mentor_profile_id, specialty_id)
);

-- 기부(결제) 기록
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_user_id UUID REFERENCES profiles(id),
  mentor_profile_id UUID REFERENCES mentor_profiles(id),
  amount_usd DECIMAL(10,2) NOT NULL,          -- 기부 금액 (세션 가격)
  processing_fee_usd DECIMAL(10,2) NOT NULL,  -- Stripe 수수료 (멘티 부담)
  total_charged_usd DECIMAL(10,2) NOT NULL,   -- 총 결제 금액
  currency TEXT DEFAULT 'usd',
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  donated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 기부 영수증
CREATE TABLE donation_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
  receipt_number TEXT UNIQUE NOT NULL,  -- 영수증 번호 (GML-2026-00001)
  pdf_url TEXT,                         -- Storage 내 PDF 경로
  org_name TEXT DEFAULT 'Global Mission Light',
  org_ein TEXT,                         -- EIN (고용주 식별번호)
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount_usd DECIMAL(10,2) NOT NULL,
  donation_date DATE NOT NULL,
  statement TEXT,                       -- 501(c)(3) 면세 단체 명시 문구
  sent_at TIMESTAMPTZ,                  -- 이메일 발송 시각
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 기부처 (기부금 수령 교회/단체)
CREATE TABLE donation_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 임팩트 리포트
CREATE TABLE impact_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,           -- 마크다운 또는 HTML
  report_period TEXT NOT NULL,     -- "2026-Q1", "2026-03" 등
  total_donated_usd DECIMAL(10,2),
  total_mentors INT,
  total_mentees INT,
  total_sessions INT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) 정책
-- profiles: 본인만 수정 가능, 모든 사용자 읽기 가능
-- mentor_profiles: 본인만 수정, 승인된 멘토만 공개 읽기
-- donations: 관련 당사자 + admin만 읽기
-- donation_receipts: 기부자 본인 + admin만 읽기
```

### 4.3 인덱스

```sql
CREATE INDEX idx_mentor_profiles_active ON mentor_profiles(is_active, is_approved);
CREATE INDEX idx_mentor_specialties_specialty ON mentor_specialties(specialty_id);
CREATE INDEX idx_donations_mentee ON donations(mentee_user_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_donated_at ON donations(donated_at);
```

---

## 5. 프로젝트 디렉토리 구조

```
gml/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # 공개 페이지 그룹
│   │   │   ├── page.tsx              # 랜딩 페이지 (F1)
│   │   │   ├── mentors/
│   │   │   │   ├── page.tsx          # 멘토 목록 (F2)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 멘토 상세 (F3)
│   │   │   └── impact/
│   │   │       └── page.tsx          # 임팩트 페이지 (F6)
│   │   ├── (auth)/                   # 인증 페이지 그룹
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (dashboard)/              # 인증된 사용자 대시보드
│   │   │   ├── layout.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx          # 멘토 프로필 관리 (F5)
│   │   │   └── donations/
│   │   │       └── page.tsx          # 기부 내역 (멘티/멘토)
│   │   ├── api/                      # API Routes
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/route.ts   # Stripe Webhook
│   │   │   ├── donations/
│   │   │   │   └── checkout/route.ts # Checkout Session 생성
│   │   │   └── mentors/
│   │   │       └── route.ts          # 멘토 검색 API
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── navigation.tsx
│   │   ├── mentors/
│   │   │   ├── mentor-card.tsx       # 멘토 카드 컴포넌트
│   │   │   ├── mentor-list.tsx       # 멘토 목록
│   │   │   ├── mentor-filter.tsx     # 검색/필터
│   │   │   └── mentor-profile-form.tsx
│   │   ├── donations/
│   │   │   ├── donation-button.tsx   # 기부(결제) 버튼
│   │   │   └── donation-stats.tsx    # 기부 통계
│   │   └── impact/
│   │       ├── impact-dashboard.tsx  # 임팩트 대시보드
│   │       └── impact-counter.tsx    # 숫자 카운터 애니메이션
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # 브라우저 클라이언트
│   │   │   ├── server.ts             # 서버 클라이언트
│   │   │   ├── middleware.ts         # Auth 미들웨어
│   │   │   └── types.ts             # DB 타입 (자동 생성)
│   │   ├── stripe/
│   │   │   ├── client.ts            # Stripe 클라이언트
│   │   │   ├── checkout.ts          # Checkout 세션 생성 로직
│   │   │   └── webhook.ts           # Webhook 핸들러
│   │   ├── receipt/
│   │   │   └── generator.ts         # PDF 영수증 생성
│   │   ├── email/
│   │   │   └── sender.ts            # Resend 이메일 발송
│   │   └── utils/
│   │       ├── currency.ts          # 통화/환율 유틸
│   │       └── fee-calculator.ts    # 수수료 계산
│   ├── hooks/                        # Custom React Hooks
│   │   ├── use-mentors.ts
│   │   └── use-donations.ts
│   └── types/
│       └── index.ts                  # 공통 타입 정의
├── supabase/
│   ├── migrations/                   # DB 마이그레이션 파일
│   │   └── 001_initial_schema.sql
│   ├── seed.sql                      # 초기 데이터 (전문분야 등)
│   └── config.toml
├── public/
│   └── images/
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 6. 페이지별 상세 설계

### 6.1 랜딩 페이지 (`/`)
- **히어로 섹션**: 핵심 메시지 + CTA ("멘토 찾기", "멘토 되기")
- **서비스 소개**: 3단계 진행 순서 (멘토 찾기 → 세션 예약 → 기부 참여)
- **숫자 하이라이트**: 총 기부금, 멘토 수, 세션 수 (실시간 DB 조회)
- **최근 멘토 캐러셀**: 승인된 활성 멘토 미리보기
- **FAQ 섹션**: 기부금 사용처, 세금 공제, 멘토 자격 등

### 6.2 멘토 목록 (`/mentors`)
- **검색바**: 이름, 회사, 키워드 풀텍스트 검색
- **필터**: 전문분야(멀티셀렉트), 세션 가격대, 위치
- **정렬**: 최신순, 가격순
- **카드 UI**: 사진, 이름, 회사/직무, 전문분야 태그, 세션 가격
- **페이지네이션**: 무한 스크롤 또는 페이지 번호

### 6.3 멘토 상세 (`/mentors/[id]`)
- **프로필 헤더**: 사진, 이름, 회사/직무, 위치, LinkedIn
- **소개문**: 멘토 자기소개 (bio)
- **전문분야 태그**: 관련 전문분야 목록
- **세션 정보**: 시간(분), 가격(USD), 외부 예약 링크 버튼
- **CTA 버튼**: "세션 예약 + 기부하기" → Stripe Checkout 또는 외부 캘린더

### 6.4 임팩트 페이지 (`/impact`)
- **총 기부금 카운터**: 애니메이션 숫자 (USD)
- **기부처 소개**: 수령 교회/단체 목록 + 설명
- **통계 대시보드**: 멘토 수, 멘티 수, 총 세션 수, 월별 기부 추이 차트
- **임팩트 레터**: 월/분기별 리포트 아카이브

### 6.5 멘토 대시보드 (`/dashboard/profile`)
- **프로필 편집 폼**: 모든 멘토 정보 CRUD
- **세션/기부 내역**: 자신을 통한 기부 목록
- **상태 표시**: 승인 대기/활성/비활성

---

## 7. 핵심 비즈니스 로직

### 7.1 수수료 계산 로직 (`fee-calculator.ts`)

```
세션 가격: $100 (USD)
Stripe 수수료: 2.9% + $0.30 = $3.20
멘티 총 결제: $103.20
기부 전달액: $100.00 (전액)

계산 공식:
totalCharged = sessionPrice + ((sessionPrice * 0.029 + 0.30) / (1 - 0.029))
// 수수료를 포함한 역산으로 정확한 전액 전달 보장
```

### 7.2 기부 영수증 필수 포함 정보 (501(c)(3) 요건)

```
- 단체명: Global Mission Light
- EIN: [실제 EIN 번호]
- 기부자명
- 기부 날짜
- 기부 금액 (USD)
- 501(c)(3) 면세 단체 명시 문구:
  "Global Mission Light is a 501(c)(3) tax-exempt organization.
   Your donation is tax-deductible to the extent allowed by law.
   No goods or services were provided in exchange for this contribution."
- 반대급부 설명: 멘토링은 멘토의 재능기부이므로, 기부자(멘티)에게 제공되는
  서비스의 가치를 어떻게 처리할지 법률 검토 필요 (⚠️ 중요)
```

> ⚠️ **법률 검토 필요사항**: 멘티가 멘토링 서비스를 받는 대가로 결제하는 구조에서,
> 이것이 순수 "기부"로 인정되려면 멘토링 서비스가 기부자에게 제공되는 "goods or services"에
> 해당하는지 세무/법률 전문가 검토가 필요합니다. 플랫폼 구조상 멘토는 자발적 봉사이고
> 결제는 단체에 대한 기부이지만, IRS 관점에서 quid pro quo 기부로 분류될 수 있습니다.
> 이 경우 멘토링 서비스의 공정시장가치(FMV)를 기부금에서 차감해야 합니다.

### 7.3 다국어 지원 구조

```
src/messages/
  ko.json   # 한국어 (기본)
  en.json   # 영어 (추후)
```
- `next-intl` 사용, 서버 컴포넌트에서 직접 번역
- DB 데이터(멘토 프로필 등)는 초기에 단일 언어, 추후 `_ko`, `_en` 컬럼 확장

---

## 8. 세금/법률 고려사항 요약

| 구분 | 미국 거주 멘티 | 한국 거주 멘티 |
|------|-------------|-------------|
| 세금 공제 | ✅ 501(c)(3) 기부금 공제 가능 | ❌ 한국 세법상 공제 불가 |
| 기부 영수증 | PDF 영수증 ($75 초과 시 필수) | PDF 영수증 (참고용) |
| 결제 통화 | USD | USD (해외 결제) |
| 추가 수수료 | 없음 | 카드사 해외결제 수수료 가능 |

**멘토 세금 처리**: 봉사 시간/서비스의 가치는 미국 세법상 자선 기부금으로 공제 **불가**. 봉사 관련 실비(교통비 등)만 공제 가능.

---

## 9. 개발 단계 (Phase)

### Phase 1: 기반 구축 (1주)
- [ ] Next.js 프로젝트 초기 설정 (App Router + TypeScript + Tailwind + shadcn/ui)
- [ ] Supabase 프로젝트 생성 및 DB 마이그레이션
- [ ] Supabase Auth 설정 (Google OAuth + Email/PW)
- [ ] 기본 레이아웃 (Header, Footer, Navigation)
- [ ] Vercel 배포 파이프라인 설정

### Phase 2: 핵심 기능 (2~3주)
- [ ] 랜딩 페이지 구현
- [ ] 멘토 회원가입/로그인
- [ ] 멘토 프로필 생성/수정 (CRUD + 사진 업로드)
- [ ] 멘토 목록 페이지 (카드 UI + 검색/필터)
- [ ] 멘토 상세 프로필 페이지
- [ ] 관리자 멘토 승인 기능 (간단한 admin 페이지 또는 Supabase Dashboard 직접 사용)

### Phase 3: 임팩트 & 통계 (1주)
- [ ] 임팩트 페이지 (기부 통계 대시보드)
- [ ] 기부처 소개 섹션
- [ ] 숫자 카운터 애니메이션

### Phase 4: 결제 연동 (2주)
- [ ] Stripe 계정 설정 (Non-profit 할인 신청)
- [ ] Checkout Session API 구현
- [ ] 수수료 계산 로직 (멘티 추가 부담)
- [ ] Stripe Webhook 핸들러
- [ ] 기부 기록 저장
- [ ] 501(c)(3) PDF 영수증 생성
- [ ] 이메일 발송 (Resend)

### Phase 5: 마무리 & 런칭 (1주)
- [ ] SEO 최적화 (메타태그, OG 이미지, sitemap)
- [ ] 전문분야 초기 데이터 시딩
- [ ] 에러 핸들링 및 로딩 상태
- [ ] 반응형 디자인 QA
- [ ] 성능 최적화 (이미지 최적화, 캐싱)
- [ ] 프로덕션 배포

---

## 10. 수정해야 할 파일 목록

현재 빈 프로젝트이므로 **모든 파일을 새로 생성**합니다.

### 핵심 생성 파일 (Phase 1~2)
1. `package.json` - 의존성 정의
2. `next.config.ts` - Next.js 설정
3. `tailwind.config.ts` - Tailwind 설정
4. `.env.local.example` - 환경 변수 템플릿
5. `supabase/migrations/001_initial_schema.sql` - DB 스키마
6. `supabase/seed.sql` - 초기 데이터
7. `src/app/layout.tsx` - 루트 레이아웃
8. `src/app/(public)/page.tsx` - 랜딩 페이지
9. `src/app/(public)/mentors/page.tsx` - 멘토 목록
10. `src/app/(public)/mentors/[id]/page.tsx` - 멘토 상세
11. `src/app/(auth)/login/page.tsx` - 로그인
12. `src/app/(dashboard)/profile/page.tsx` - 프로필 관리
13. `src/lib/supabase/client.ts` - Supabase 클라이언트
14. `src/lib/supabase/server.ts` - 서버 클라이언트
15. `src/components/mentors/mentor-card.tsx` - 멘토 카드

---

## 11. 검증 계획

### 11.1 개발 중 검증
- `npm run lint` - ESLint 검사
- `npm run build` - 빌드 성공 여부
- `npm run dev` - 로컬 개발 서버에서 UI 확인

### 11.2 기능 검증 체크리스트
- [ ] 랜딩 페이지 렌더링 확인 (SSR)
- [ ] Google OAuth 로그인 성공
- [ ] 이메일/비밀번호 회원가입 및 로그인
- [ ] 멘토 프로필 생성/수정/사진 업로드
- [ ] 멘토 목록 검색/필터 동작
- [ ] 멘토 상세 페이지 렌더링
- [ ] 임팩트 페이지 통계 표시
- [ ] Stripe Checkout 결제 흐름 (테스트 모드)
- [ ] Webhook → 기부 기록 저장
- [ ] PDF 영수증 생성 및 이메일 발송
- [ ] 모바일 반응형 확인

### 11.3 Stripe 테스트
- Stripe 테스트 모드에서 카드번호 `4242 4242 4242 4242` 사용
- Webhook은 Stripe CLI(`stripe listen --forward-to`)로 로컬 테스트

### 11.4 보안 검증
- Supabase RLS 정책 동작 확인
- API Route에서 인증 체크
- Stripe Webhook 서명 검증
- 환경 변수 노출 여부 확인
