-- Global Mission Light 초기 스키마 마이그레이션

-- 사용자 프로필 (Supabase Auth 연동)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'mentee' CHECK (role IN ('mentor', 'mentee', 'admin')),
  locale TEXT DEFAULT 'ko',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 프로필 자동 생성 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 신규 사용자 가입 시 프로필 자동 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 멘토 프로필 (멘토 전용 확장 정보)
CREATE TABLE mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company TEXT,
  job_title TEXT,
  bio TEXT,
  location TEXT,
  linkedin_url TEXT,
  calendar_url TEXT,
  session_duration_minutes INT DEFAULT 30,
  session_price_usd DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- 전문분야 마스터 테이블
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ko TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
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
  amount_usd DECIMAL(10,2) NOT NULL,
  processing_fee_usd DECIMAL(10,2) NOT NULL,
  total_charged_usd DECIMAL(10,2) NOT NULL,
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
  receipt_number TEXT UNIQUE NOT NULL,
  pdf_url TEXT,
  org_name TEXT DEFAULT 'Global Mission Light',
  org_ein TEXT,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount_usd DECIMAL(10,2) NOT NULL,
  donation_date DATE NOT NULL,
  statement TEXT,
  sent_at TIMESTAMPTZ,
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
  content TEXT NOT NULL,
  report_period TEXT NOT NULL,
  total_donated_usd DECIMAL(10,2),
  total_mentors INT,
  total_mentees INT,
  total_sessions INT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_mentor_profiles_active ON mentor_profiles(is_active, is_approved);
CREATE INDEX idx_mentor_specialties_specialty ON mentor_specialties(specialty_id);
CREATE INDEX idx_donations_mentee ON donations(mentee_user_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_donated_at ON donations(donated_at);

-- RLS (Row Level Security) 정책

-- profiles: 모든 사용자 읽기 가능, 본인만 수정 가능
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "프로필은 모든 사용자가 읽을 수 있음"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "사용자는 자신의 프로필만 수정 가능"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- mentor_profiles: 승인된 멘토만 공개 읽기, 본인만 수정
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "승인된 활성 멘토 프로필은 모든 사용자가 읽을 수 있음"
  ON mentor_profiles FOR SELECT
  USING (is_approved = true AND is_active = true);

CREATE POLICY "멘토는 자신의 프로필만 생성 가능"
  ON mentor_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "멘토는 자신의 프로필만 수정 가능"
  ON mentor_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- mentor_specialties: 멘토 프로필과 동일한 정책
ALTER TABLE mentor_specialties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "멘토 전문분야는 모든 사용자가 읽을 수 있음"
  ON mentor_specialties FOR SELECT
  USING (true);

CREATE POLICY "멘토는 자신의 전문분야만 관리 가능"
  ON mentor_specialties FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM mentor_profiles
      WHERE mentor_profiles.id = mentor_specialties.mentor_profile_id
      AND mentor_profiles.user_id = auth.uid()
    )
  );

-- specialties: 모든 사용자 읽기 가능
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "전문분야는 모든 사용자가 읽을 수 있음"
  ON specialties FOR SELECT
  USING (true);

-- donations: 관련 당사자만 읽기
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "기부 내역은 당사자만 읽을 수 있음"
  ON donations FOR SELECT
  USING (
    auth.uid() = mentee_user_id OR
    auth.uid() IN (
      SELECT user_id FROM mentor_profiles WHERE id = mentor_profile_id
    )
  );

-- donation_receipts: 기부자 본인만 읽기
ALTER TABLE donation_receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "기부 영수증은 기부자만 읽을 수 있음"
  ON donation_receipts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT mentee_user_id FROM donations WHERE id = donation_id
    )
  );

-- donation_recipients: 모든 사용자 읽기 가능
ALTER TABLE donation_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "기부처는 모든 사용자가 읽을 수 있음"
  ON donation_recipients FOR SELECT
  USING (is_active = true);

-- impact_reports: 발행된 리포트만 공개 읽기
ALTER TABLE impact_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "발행된 임팩트 리포트는 모든 사용자가 읽을 수 있음"
  ON impact_reports FOR SELECT
  USING (published_at IS NOT NULL);
