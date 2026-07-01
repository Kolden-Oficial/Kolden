-- Migration: 001_initial_schema
-- Omiron App — Schema completo + RLS policies

-- ─── Enums ────────────────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('patient', 'secretary', 'doctor');
CREATE TYPE plant_stage AS ENUM ('seed', 'sprout', 'seedling', 'adult', 'tree');
CREATE TYPE scale_type AS ENUM ('HAM-A', 'HAM-D', 'MADRS', 'YMRS', 'COCOCOLOS');
CREATE TYPE event_type AS ENUM ('appointment', 'task', 'milestone', 'reminder');
CREATE TYPE notification_type AS ENUM ('reminder', 'message', 'report', 'scale', 'milestone', 'system');

-- ─── Tables ───────────────────────────────────────────────────────────────────

-- Usuários (complementa auth.users)
CREATE TABLE users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT NOT NULL,
  role       user_role NOT NULL,
  name       TEXT NOT NULL,
  photo_url  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Perfil clínico do paciente
CREATE TABLE patient_profiles (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  doctor_id               UUID REFERENCES users(id) ON DELETE SET NULL,
  diagnoses               JSONB NOT NULL DEFAULT '[]',
  medications             JSONB NOT NULL DEFAULT '[]',
  goals                   JSONB NOT NULL DEFAULT '[]',
  notes                   TEXT,
  onboarding_completed_at TIMESTAMPTZ,
  reminder_time           TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Áreas de monitoramento (seeded abaixo)
CREATE TABLE monitoring_areas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE
);

-- Check-ins diários
CREATE TABLE daily_checkins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  area_id    UUID NOT NULL REFERENCES monitoring_areas(id) ON DELETE RESTRICT,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  value      INTEGER CHECK (value BETWEEN 1 AND 10),
  notes      TEXT,
  photo_url  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (patient_id, area_id, date)
);

-- Escalas diagnósticas
CREATE TABLE diagnostic_scales (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scale_type       scale_type NOT NULL,
  responses        JSONB NOT NULL,
  score            INTEGER,
  filled_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  appointment_date DATE
);

-- Mensagens de chat
CREATE TABLE messages (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content        TEXT,
  attachment_url TEXT,
  read_at        TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Relatórios do paciente
CREATE TABLE reports (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  attachments JSONB NOT NULL DEFAULT '[]',
  sent_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gamificação (planta virtual)
CREATE TABLE gamification (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id       UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  streak_days      INTEGER NOT NULL DEFAULT 0,
  plant_stage      plant_stage NOT NULL DEFAULT 'seed',
  last_activity_at TIMESTAMPTZ,
  total_days       INTEGER NOT NULL DEFAULT 0
);

-- Frases de impacto (seed no E5)
CREATE TABLE impact_phrases (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disorder_type TEXT NOT NULL,
  day_of_month  INTEGER NOT NULL CHECK (day_of_month BETWEEN 1 AND 31),
  content       TEXT NOT NULL,
  author        TEXT NOT NULL,
  source        TEXT
);

-- Meditações guiadas (seed no E5)
CREATE TABLE meditations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  audio_url        TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  category         TEXT NOT NULL,
  disorder_types   JSONB NOT NULL DEFAULT '[]',
  active           BOOLEAN NOT NULL DEFAULT TRUE
);

-- Eventos do calendário
CREATE TABLE calendar_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  type          event_type NOT NULL,
  event_date    DATE NOT NULL,
  notes         TEXT,
  reminder_sent BOOLEAN NOT NULL DEFAULT FALSE
);

-- Notificações
CREATE TABLE notifications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type         notification_type NOT NULL,
  content      TEXT NOT NULL,
  read         BOOLEAN NOT NULL DEFAULT FALSE,
  scheduled_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX idx_patient_profiles_doctor_id ON patient_profiles(doctor_id);
CREATE INDEX idx_daily_checkins_patient_date ON daily_checkins(patient_id, date DESC);
CREATE INDEX idx_daily_checkins_area_id ON daily_checkins(area_id);
CREATE INDEX idx_diagnostic_scales_patient_id ON diagnostic_scales(patient_id, filled_at DESC);
CREATE INDEX idx_messages_sender_id ON messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id, created_at DESC);
CREATE INDEX idx_notifications_user_id ON notifications(user_id, created_at DESC);
CREATE INDEX idx_calendar_events_patient_date ON calendar_events(patient_id, event_date);

-- ─── Updated-at trigger ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_patient_profiles_updated_at
  BEFORE UPDATE ON patient_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Seed: 7 Monitoring Areas ─────────────────────────────────────────────────

INSERT INTO monitoring_areas (name, icon, description, order_index) VALUES
  ('Medicação',          '💊', 'Adesão à medicação prescrita',       1),
  ('Alimentação',        '🥗', 'Hábitos alimentares e nutrição',     2),
  ('Movimento',          '🏃', 'Atividade física e exercícios',      3),
  ('Conexões Sociais',   '🤝', 'Relacionamentos e vida social',      4),
  ('Gestão de Estresse', '🧘', 'Saúde mental e bem-estar',          5),
  ('Produtividade',      '✅', 'Metas e organização',               6),
  ('Tóxicos',            '🚫', 'Abstinência de substâncias',         7);

-- ─── Row Level Security ────────────────────────────────────────────────────────

-- Helper: retorna o role do usuário autenticado
CREATE OR REPLACE FUNCTION auth_user_role()
RETURNS TEXT AS $$
  SELECT role::TEXT FROM users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: retorna o doctor_id do paciente autenticado
CREATE OR REPLACE FUNCTION auth_patient_doctor_id()
RETURNS UUID AS $$
  SELECT doctor_id FROM patient_profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── users ──────────────────────────────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "users_select_doctor_sees_patients" ON users
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = users.id AND doctor_id = auth.uid())
  );

CREATE POLICY "users_select_secretary_basic" ON users
  FOR SELECT USING (auth_user_role() = 'secretary');

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (id = auth.uid());

-- ── patient_profiles ───────────────────────────────────────────────────────────
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pp_select_own" ON patient_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "pp_select_doctor_sees_patients" ON patient_profiles
  FOR SELECT USING (
    doctor_id = auth.uid() AND auth_user_role() = 'doctor'
  );

CREATE POLICY "pp_select_secretary" ON patient_profiles
  FOR SELECT USING (auth_user_role() = 'secretary');

CREATE POLICY "pp_insert_own" ON patient_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "pp_update_doctor" ON patient_profiles
  FOR UPDATE USING (
    doctor_id = auth.uid() AND auth_user_role() = 'doctor'
  );

CREATE POLICY "pp_update_own" ON patient_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- ── monitoring_areas (public read, no write via RLS) ───────────────────────────
ALTER TABLE monitoring_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ma_select_all_authenticated" ON monitoring_areas
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- ── daily_checkins ─────────────────────────────────────────────────────────────
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dc_select_own" ON daily_checkins
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "dc_select_doctor" ON daily_checkins
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = daily_checkins.patient_id AND doctor_id = auth.uid())
  );

CREATE POLICY "dc_insert_own" ON daily_checkins
  FOR INSERT WITH CHECK (patient_id = auth.uid());

CREATE POLICY "dc_update_own" ON daily_checkins
  FOR UPDATE USING (patient_id = auth.uid());

-- ── diagnostic_scales ──────────────────────────────────────────────────────────
ALTER TABLE diagnostic_scales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ds_select_own" ON diagnostic_scales
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "ds_select_doctor" ON diagnostic_scales
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = diagnostic_scales.patient_id AND doctor_id = auth.uid())
  );

CREATE POLICY "ds_insert_own" ON diagnostic_scales
  FOR INSERT WITH CHECK (patient_id = auth.uid());

-- ── messages ───────────────────────────────────────────────────────────────────
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "msg_select_participant" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "msg_insert_own" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "msg_update_receiver_read" ON messages
  FOR UPDATE USING (receiver_id = auth.uid());

-- ── reports ────────────────────────────────────────────────────────────────────
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rep_select_own" ON reports
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "rep_select_doctor" ON reports
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = reports.patient_id AND doctor_id = auth.uid())
  );

CREATE POLICY "rep_insert_own" ON reports
  FOR INSERT WITH CHECK (patient_id = auth.uid());

-- ── gamification ───────────────────────────────────────────────────────────────
ALTER TABLE gamification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gam_select_own" ON gamification
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "gam_select_doctor" ON gamification
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = gamification.patient_id AND doctor_id = auth.uid())
  );

CREATE POLICY "gam_insert_own" ON gamification
  FOR INSERT WITH CHECK (patient_id = auth.uid());

CREATE POLICY "gam_update_own" ON gamification
  FOR UPDATE USING (patient_id = auth.uid());

-- ── impact_phrases (public read) ───────────────────────────────────────────────
ALTER TABLE impact_phrases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ip_select_authenticated" ON impact_phrases
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- ── meditations (public read) ──────────────────────────────────────────────────
ALTER TABLE meditations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "med_select_authenticated" ON meditations
  FOR SELECT USING (auth.uid() IS NOT NULL AND active = TRUE);

-- ── calendar_events ────────────────────────────────────────────────────────────
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cal_select_own" ON calendar_events
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "cal_select_doctor" ON calendar_events
  FOR SELECT USING (
    auth_user_role() = 'doctor' AND
    EXISTS (SELECT 1 FROM patient_profiles WHERE user_id = calendar_events.patient_id AND doctor_id = auth.uid())
  );

CREATE POLICY "cal_insert_own" ON calendar_events
  FOR INSERT WITH CHECK (patient_id = auth.uid());

CREATE POLICY "cal_update_own" ON calendar_events
  FOR UPDATE USING (patient_id = auth.uid());

CREATE POLICY "cal_delete_own" ON calendar_events
  FOR DELETE USING (patient_id = auth.uid());

-- ── notifications ──────────────────────────────────────────────────────────────
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notif_select_own" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notif_update_own" ON notifications
  FOR UPDATE USING (user_id = auth.uid());
