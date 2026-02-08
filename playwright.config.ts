import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E Test Configuration for GML Platform
 *
 * 23개 페이지, 141개 테스트 케이스
 * Desktop Chrome + Mobile (iPhone 14) 2개 프로젝트
 */
export default defineConfig({
  testDir: './e2e',

  // 전체 테스트 타임아웃 (각 테스트당 30초)
  timeout: 30 * 1000,

  // 테스트 실패 시 최대 재시도 횟수 (CI에서 유용)
  retries: process.env.CI ? 2 : 0,

  // 병렬 실행 워커 수
  workers: process.env.CI ? 1 : undefined,

  // 리포터 설정
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  // 모든 테스트에 공통 적용되는 설정
  use: {
    // 베이스 URL (webServer가 실행되면 자동 연결)
    baseURL: 'http://localhost:3000',

    // 실패 시 스크린샷
    screenshot: 'only-on-failure',

    // 실패 시 트레이스 수집
    trace: 'retain-on-failure',

    // 비디오 녹화 (실패 시에만)
    video: 'retain-on-failure'
  },

  // 테스트 실행 전 자동으로 dev 서버 시작
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // dev 서버 시작 대기 시간 (2분)
    stdout: 'ignore',
    stderr: 'pipe'
  },

  // 프로젝트 설정 (Desktop + Mobile)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 14'] }
    }
  ]
})
