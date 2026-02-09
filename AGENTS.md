# Repository Guidelines

## 프로젝트 구조 및 모듈 구성
- `src/app`: Next.js App Router 엔트리입니다. `(public)`, `(auth)`, `(dashboard)`는 **Route Group**이며 URL에 노출되지 않습니다(예: `src/app/(auth)/login/page.tsx` → `/login`).
- `src/components/ui`: shadcn/ui 기반 공용 UI 컴포넌트(`button.tsx`, `card.tsx` 등).
- `src/components/layout`, `src/components/mentors`, `src/components/impact`: 도메인별 화면 컴포넌트.
- `src/lib`: 공통 유틸/목데이터, `src/lib/supabase`: 브라우저/서버/미들웨어 클라이언트 분리.
- `supabase/migrations`, `supabase/seed.sql`: DB 스키마 및 시드 데이터.
- `docs/`: 요구사항/설계/계획 문서 보관.

## 빌드, 테스트, 개발 명령어
- `npm install`: 의존성 설치
- `npm run dev`: 로컬 개발 서버 실행 (`http://localhost:3000`)
- `npm run build`: 프로덕션 빌드
- `npm start`: 빌드 결과 실행
- `npm run lint`: ESLint 검사(기본 규칙: `next/core-web-vitals`)
- `npm run type-check`: TypeScript 타입 검사(`tsc --noEmit`)
- `npx supabase db push && npx supabase db seed`: 스키마 반영 및 초기 데이터 입력

## 코딩 스타일 및 네이밍
- 언어: TypeScript(엄격 모드 `strict: true`), React 함수형 컴포넌트.
- 들여쓰기 2칸, 문자열은 작은따옴표, 기존 코드처럼 세미콜론은 생략합니다.
- 경로 별칭 `@/*`를 우선 사용합니다. 예: `import { Button } from '@/components/ui/button'`
- 파일명은 소문자-kebab-case, 컴포넌트/타입은 PascalCase, 변수/함수는 camelCase.
- Supabase 클라이언트는 문맥별로 고정 사용: Client Component(`client.ts`), Server Component/Action(`server.ts`), Middleware(`middleware.ts`).

## 테스트 가이드라인
- 현재 저장소에는 Jest/Vitest 등 전용 테스트 러너가 설정되어 있지 않습니다.
- 최소 품질 게이트로 PR 전 `npm run lint`와 `npm run type-check`를 모두 통과해야 합니다.
- UI 변경 시 주요 경로(`/, /mentors, /login, /profile`) 수동 검증 결과를 PR 본문에 기록하세요.
- 신규 테스트 도입 시 파일명은 `*.test.ts(x)` 또는 `*.spec.ts(x)` 패턴을 사용하세요.

## 커밋 및 PR 가이드라인
- 커밋 메시지는 히스토리와 동일하게 `feat:`, `fix:`, `docs:` 접두어를 권장합니다.
- 예시: `feat: 멘토 상세 페이지 필터 로직 추가`
- 한 커밋에는 한 가지 논리 변경만 담고, 문서 수정은 기능 변경과 분리합니다.
- PR에는 다음을 포함하세요: 변경 배경, 핵심 변경점, 검증 명령/결과, UI 변경 스크린샷(해당 시), 관련 이슈 링크.

## 보안 및 설정 팁
- `.env.local.example`를 복사해 `.env.local`을 생성하고, 비밀키는 절대 커밋하지 마세요.
- `NEXT_PUBLIC_*`와 서버 전용 키(`SUPABASE_SERVICE_ROLE_KEY`)를 구분해 사용하세요.
