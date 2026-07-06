-- ============================================================
-- BFEF KENYA — SPRINT 1 SCHEMA
-- Tables: pages, members, contact_messages
-- ============================================================

-- Required for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------
-- 1. PAGES
-- Stores editable site content (mission, vision, objectives,
-- core values, constitution text) so non-devs can update copy
-- later without redeploying code.
-- ------------------------------------------------------------
CREATE TABLE pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(50) UNIQUE NOT NULL,   -- 'about', 'mission', 'vision', 'constitution', 'objectives', 'core-values'
  title       VARCHAR(200) NOT NULL,
  content     TEXT NOT NULL,                 -- markdown or plain text
  is_published BOOLEAN DEFAULT TRUE,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);


-- ------------------------------------------------------------
-- 2. MEMBERS
-- Governance/leadership table (Chairperson, Secretary,
-- Treasurer, Board Members). Only safe public fields are
-- exposed via the API — no phone/email/ID numbers returned
-- publicly.
-- ------------------------------------------------------------
CREATE TABLE members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  position        VARCHAR(50) NOT NULL,   -- Chairperson, Vice Chairperson, Secretary, Treasurer, Board Member
  member_type     VARCHAR(30) DEFAULT 'founding'
                    CHECK (member_type IN ('founding','ordinary','honorary')),
  bio             TEXT,
  photo_url       TEXT,
  term_start_date DATE,
  term_end_date   DATE,
  display_order   INT DEFAULT 0,          -- controls ordering on the leadership page
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_members_active ON members(is_active);


-- ------------------------------------------------------------
-- 3. CONTACT_MESSAGES
-- Stores submissions from the public contact form.
-- ------------------------------------------------------------
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  subject     VARCHAR(200),
  message     TEXT NOT NULL,
  status      VARCHAR(20) DEFAULT 'new'
                CHECK (status IN ('new','read','responded','archived')),
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);


-- ============================================================
-- No foreign-key relationships in Sprint 1 — these three
-- tables are independent. Relationships begin appearing in
-- Sprint 2 (impact_stories -> beneficiaries) and beyond.
-- ============================================================
