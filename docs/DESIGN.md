# GML (Global Mission Light) - 시스템 설계 문서

## 1. 프로젝트 개요

### Context

미국 텍사스 소재 Non-profit 법인(Global Mission Light)이 운영하는 **크리스챤 기부 멘토링 플랫폼**을 신규 구축한다.
크리스챤 전문가(멘토)가 도움이 필요한 크리스챤(멘티)에게 멘토링을 제공하고, 멘티가 지불한 세션 비용이 **전액 기부금으로 전환**되는 구조이다.
기부금은 한국 미자립/개척교회에 분배되며, 매월/분기별 임팩트 레터를 공시한다.

**핵심 가치**: 멘토는 재능으로 섬기고, 멘티는 도움을 받으면서 기부에 참여하는 선순환

### 주요 결정 사항
- 결제 수수료: **멘티가 추가 부담** (기부금 전액 전달)
- 세션 예약: **외부 캘린더 링크 연동** (Calendly/Cal.com 등)
- 인증: **Google OAuth + 이메일/비밀번호**
- 백엔드: **Supabase** (Auth + PostgreSQL + Storage)

---

## 2. 요구사항

### 2.1 핵심 기능 (MVP)

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

### 2.2 비기능 요구사항

- **다국어**: 초기 한국어 → 이후 영어 확장 가능 구조
- **다통화**: 초기 USD → 이후 KRW 등 확장
- **반응형**: 모바일 퍼스트 디자인
- **SEO**: 서버사이드 렌더링 (Next.js App Router)
- **접근성**: WCAG 2.1 AA 기본 준수
- **성능**: Core Web Vitals 기준 충족 (LCP < 2.5s)

---

## 3. 기술 스택

| 영역 | 기술 | 선택 이유 | 무료 티어 |
|------|------|---------|---------|
| **프레임워크** | Next.js 16 (App Router) + TypeScript | SSR/SSG, API Routes, 풀스택 | Vercel Hobby |
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

## 4. 시스템 아키텍처

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

## 5. 데이터베이스 스키마

### 5.1 ERD 개요

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

### 5.2 주요 테이블

#### profiles (사용자 프로필)
- `id`: UUID (auth.users 참조)
- `email`: TEXT
- `full_name`: TEXT
- `avatar_url`: TEXT
- `role`: TEXT (mentor/mentee/admin)
- `locale`: TEXT (기본 'ko')

#### mentor_profiles (멘토 프로필)
- `id`: UUID
- `user_id`: UUID (profiles 참조, UNIQUE)
- `company`: TEXT
- `job_title`: TEXT
- `bio`: TEXT
- `location`: TEXT
- `linkedin_url`: TEXT
- `calendar_url`: TEXT (외부 예약 링크)
- `session_duration_minutes`: INT (기본 30)
- `session_price_usd`: DECIMAL(10,2)
- `is_active`: BOOLEAN (기본 true)
- `is_approved`: BOOLEAN (기본 false, 관리자 승인 필요)

#### specialties (전문분야 마스터)
- `id`: UUID
- `name_ko`: TEXT
- `name_en`: TEXT
- `slug`: TEXT (UNIQUE)
- `category`: TEXT (커리어/비즈니스/기술/재무/라이프)

#### mentor_specialties (N:M 매핑)
- `mentor_profile_id`: UUID
- `specialty_id`: UUID
- PRIMARY KEY (mentor_profile_id, specialty_id)

#### donations (기부 기록)
- `id`: UUID
- `mentee_user_id`: UUID
- `mentor_profile_id`: UUID
- `amount_usd`: DECIMAL(10,2) (기부 금액)
- `processing_fee_usd`: DECIMAL(10,2) (Stripe 수수료)
- `total_charged_usd`: DECIMAL(10,2) (총 결제 금액)
- `currency`: TEXT (기본 'usd')
- `stripe_payment_intent_id`: TEXT (UNIQUE)
- `status`: TEXT (pending/completed/failed/refunded)
- `donated_at`: TIMESTAMPTZ

#### donation_receipts (기부 영수증)
- `id`: UUID
- `donation_id`: UUID
- `receipt_number`: TEXT (UNIQUE, 예: GML-2026-00001)
- `pdf_url`: TEXT
- `org_name`: TEXT (기본 'Global Mission Light')
- `org_ein`: TEXT (EIN 번호)
- `donor_name`: TEXT
- `donor_email`: TEXT
- `amount_usd`: DECIMAL(10,2)
- `donation_date`: DATE
- `statement`: TEXT (501(c)(3) 면세 단체 명시 문구)
- `sent_at`: TIMESTAMPTZ

### 5.3 Row Level Security (RLS)

모든 테이블에 RLS 활성화:

- **profiles**: 모든 사용자 읽기 가능, 본인만 수정 가능
- **mentor_profiles**: 승인된 활성 멘토만 공개 읽기, 본인만 수정
- **donations**: 관련 당사자(멘티/멘토)만 읽기
- **donation_receipts**: 기부자 본인만 읽기
- **specialties**: 모든 사용자 읽기 가능
- **impact_reports**: 발행된 리포트만 공개 읽기

---

## 6. 비즈니스 로직

### 6.1 수수료 계산 로직

```javascript
// 세션 가격: $100 (USD)
// Stripe 수수료: 2.9% + $0.30 = $3.20
// 멘티 총 결제: $103.20
// 기부 전달액: $100.00 (전액)

// 계산 공식:
totalCharged = sessionPrice + ((sessionPrice * 0.029 + 0.30) / (1 - 0.029))
// 수수료를 포함한 역산으로 정확한 전액 전달 보장
```

### 6.2 기부 영수증 필수 포함 정보 (501(c)(3) 요건)

- 단체명: Global Mission Light
- EIN: [실제 EIN 번호]
- 기부자명
- 기부 날짜
- 기부 금액 (USD)
- 501(c)(3) 면세 단체 명시 문구:
  > "Global Mission Light is a 501(c)(3) tax-exempt organization.
  > Your donation is tax-deductible to the extent allowed by law.
  > No goods or services were provided in exchange for this contribution."

⚠️ **법률 검토 필요사항**: 멘티가 멘토링 서비스를 받는 대가로 결제하는 구조에서, 이것이 순수 "기부"로 인정되려면 멘토링 서비스가 기부자에게 제공되는 "goods or services"에 해당하는지 세무/법률 전문가 검토가 필요합니다.

### 6.3 멘토 승인 워크플로우

1. 사용자 회원가입 (Google OAuth 또는 Email/PW)
2. `profiles` 테이블에 자동 생성 (트리거)
3. 멘토 프로필 작성 (`mentor_profiles` INSERT)
4. 관리자가 Supabase Dashboard에서 `is_approved = true` 설정
5. 승인 후 `/mentors` 목록에 표시

---

## 7. 세금/법률 고려사항

### 세금 공제 차이

| 구분 | 미국 거주 멘티 | 한국 거주 멘티 |
|------|-------------|-------------|
| 세금 공제 | ✅ 501(c)(3) 기부금 공제 가능 | ❌ 한국 세법상 공제 불가 |
| 기부 영수증 | PDF 영수증 ($75 초과 시 필수) | PDF 영수증 (참고용) |
| 결제 통화 | USD | USD (해외 결제) |
| 추가 수수료 | 없음 | 카드사 해외결제 수수료 가능 |

### 멘토 세금 처리

봉사 시간/서비스의 가치는 미국 세법상 자선 기부금으로 공제 **불가**. 봉사 관련 실비(교통비 등)만 공제 가능.

---

## 8. 보안 및 성능

### 보안

- Supabase RLS로 데이터 접근 제어
- API Route에서 인증 체크
- Stripe Webhook 서명 검증
- 환경 변수로 민감 정보 관리

### 성능

- Next.js SSG/ISR로 정적 페이지 생성
- 이미지 최적화 (Next.js Image)
- Supabase 연결 풀링
- Vercel Edge 캐싱

---

## 9. 향후 확장 고려사항

### 다국어 지원
```
src/messages/
  ko.json   # 한국어 (기본)
  en.json   # 영어 (추후)
```
- `next-intl` 사용
- DB 데이터는 초기에 단일 언어, 추후 `_ko`, `_en` 컬럼 확장

### 다통화 지원
- 초기: USD만 지원
- 향후: KRW, EUR 등 확장
- 환율 API 연동 (예: Open Exchange Rates)

### 실시간 알림
- Supabase Realtime 활용
- 새로운 세션 예약 시 멘토에게 실시간 알림

---

## 10. 참고 문서

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [IRS 501(c)(3) Guidelines](https://www.irs.gov/charities-non-profits)
