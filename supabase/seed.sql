-- 초기 데이터 시딩

-- 전문분야 마스터 데이터
INSERT INTO specialties (name_ko, name_en, slug, category) VALUES
  -- 커리어
  ('커리어 전환', 'Career Transition', 'career-transition', '커리어'),
  ('리더십 개발', 'Leadership Development', 'leadership', '커리어'),
  ('면접 준비', 'Interview Preparation', 'interview-prep', '커리어'),
  ('이력서 작성', 'Resume Writing', 'resume', '커리어'),

  -- 비즈니스
  ('창업', 'Entrepreneurship', 'entrepreneurship', '비즈니스'),
  ('비즈니스 전략', 'Business Strategy', 'business-strategy', '비즈니스'),
  ('마케팅', 'Marketing', 'marketing', '비즈니스'),
  ('세일즈', 'Sales', 'sales', '비즈니스'),

  -- 기술
  ('소프트웨어 개발', 'Software Development', 'software-dev', '기술'),
  ('데이터 분석', 'Data Analysis', 'data-analysis', '기술'),
  ('프로덕트 매니지먼트', 'Product Management', 'product-mgmt', '기술'),

  -- 재무/법률
  ('재무 설계', 'Financial Planning', 'financial-planning', '재무'),
  ('투자', 'Investment', 'investment', '재무'),
  ('법률 자문', 'Legal Advice', 'legal', '법률'),

  -- 라이프
  ('영성 성장', 'Spiritual Growth', 'spiritual-growth', '라이프'),
  ('워라밸', 'Work-Life Balance', 'work-life-balance', '라이프'),
  ('멘탈 헬스', 'Mental Health', 'mental-health', '라이프');

-- 샘플 기부처 데이터
INSERT INTO donation_recipients (name, description, location, is_active) VALUES
  ('서울 개척교회', '서울 지역 개척 3년차 교회로, 청년 사역에 집중하고 있습니다.', '서울시 강남구', true),
  ('부산 미자립교회', '부산 지역 미자립 교회로, 지역 사회 봉사에 힘쓰고 있습니다.', '부산시 해운대구', true),
  ('대전 청년교회', '대전 지역 청년 중심 개척교회입니다.', '대전시 유성구', true);

-- 샘플 임팩트 리포트 (테스트용)
INSERT INTO impact_reports (
  title,
  content,
  report_period,
  total_donated_usd,
  total_mentors,
  total_mentees,
  total_sessions,
  published_at
) VALUES (
  '2026년 1월 임팩트 리포트',
  '## 감사 인사

Global Mission Light 플랫폼을 통해 기부에 참여해 주신 모든 분들께 감사드립니다.

## 이달의 성과

- **총 기부금**: $1,500
- **참여 멘토**: 5명
- **도움 받은 멘티**: 12명
- **진행된 세션**: 15회

## 기부금 사용처

이번 달 기부금은 다음과 같이 분배되었습니다:

1. 서울 개척교회 - $600
2. 부산 미자립교회 - $500
3. 대전 청년교회 - $400

모든 교회에서 감사의 인사를 전해왔습니다.',
  '2026-01',
  1500.00,
  5,
  12,
  15,
  now()
);
