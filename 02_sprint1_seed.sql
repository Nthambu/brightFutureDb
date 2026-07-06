-- ============================================================
-- BFEF KENYA — SPRINT 1 SEED DATA
-- Run after 01_sprint1_schema.sql
-- ============================================================

-- ------------------------------------------------------------
-- PAGES — pulled directly from your constitution & brochure
-- ------------------------------------------------------------
INSERT INTO pages (slug, title, content) VALUES
('mission', 'Our Mission',
 'To promote access to education through scholarships, mentorship, educational support, and skills development programs.'),

('vision', 'Our Vision',
 'To ensure every needy child and youth in Kenya has access to quality education and opportunities for a better future.'),

('about', 'Who We Are',
 'Bright Future Education Foundation Kenya (BFEF Kenya) is a charitable organization dedicated to transforming lives through education. We believe that every child deserves the opportunity to learn, grow, and achieve their dreams regardless of their economic background. We work with communities, schools, donors, and partners to ensure that no child is left behind because of poverty.'),

('objectives', 'Our Objectives',
 '1. Support needy children and youth with educational sponsorship.
2. Provide school fees, uniforms, books, and learning materials.
3. Promote education for girls and boys equally.
4. Support vocational, technical, college, and university education.
5. Conduct mentorship and career guidance programs.
6. Partner with local and international donors.
7. Promote child welfare and protection.
8. Undertake fundraising activities to support educational programs.'),

('core-values', 'Our Core Values',
 'Integrity, Accountability, Equality, Compassion, Excellence, Transparency, Service.'),

('constitution', 'BFEF Kenya Constitution',
 'The full constitution text goes here, or this page can instead serve as a landing page with a download link to the constitution PDF — see /documents/constitution endpoint.');


-- ------------------------------------------------------------
-- MEMBERS — leadership per Article 7 of the constitution
-- Replace placeholder names with real founding members.
-- ------------------------------------------------------------
INSERT INTO members (first_name, last_name, position, member_type, term_start_date, display_order) VALUES
('Jane', 'Doe', 'Chairperson', 'founding', '2026-01-01', 1),
('John', 'Smith', 'Vice Chairperson', 'founding', '2026-01-01', 2),
('Mary', 'Wanjiru', 'Secretary', 'founding', '2026-01-01', 3),
('Peter', 'Otieno', 'Treasurer', 'founding', '2026-01-01', 4),
('Grace', 'Achieng', 'Board Member', 'founding', '2026-01-01', 5),
('Samuel', 'Kiprop', 'Board Member', 'founding', '2026-01-01', 6),
('Esther', 'Nduta', 'Board Member', 'founding', '2026-01-01', 7);
