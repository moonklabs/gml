# GML (Global Mission Light) - 크리스챤 기부 멘토링 플랫폼

미국 텍사스 소재 Non-profit 법인(Global Mission Light)이 운영하는 크리스챤 기부 멘토링 플랫폼입니다.

## 핵심 가치

- **멘토**: 재능으로 섬김 (무보수 자원봉사)
- **멘티**: 전문가 멘토링을 받으면서 기부에 참여
- **기부금**: 결제 금액 전액이 한국 미자립/개척교회 지원

## 기술 스택

- **프레임워크**: Next.js 15 (App Router) + TypeScript
- **스타일링**: Tailwind CSS + shadcn/ui
- **백엔드**: Supabase (Auth + PostgreSQL + Storage)
- **결제**: Stripe Checkout
- **배포**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 값을 입력하세요.

```bash
cp .env.local.example .env.local
```

### 3. Supabase 로컬 개발 환경 시작 (선택사항)

```bash
npx supabase start
```

### 4. 데이터베이스 마이그레이션

Supabase 프로젝트를 생성한 후:

```bash
npx supabase db push
```

### 5. 초기 데이터 시딩

```bash
npx supabase db seed
```

### 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

## 프로젝트 구조

```
gml/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   ├── lib/             # 유틸리티 라이브러리
│   ├── hooks/           # React Hooks
│   └── types/           # TypeScript 타입 정의
├── supabase/
│   ├── migrations/      # DB 마이그레이션
│   └── seed.sql        # 초기 데이터
└── public/             # 정적 파일
```

## 개발 단계

- [x] Phase 1: 기반 구축 (진행 중)
- [ ] Phase 2: 핵심 기능
- [ ] Phase 3: 임팩트 & 통계
- [ ] Phase 4: 결제 연동
- [ ] Phase 5: 마무리 & 런칭

## 라이선스

이 프로젝트는 Global Mission Light의 소유입니다.
