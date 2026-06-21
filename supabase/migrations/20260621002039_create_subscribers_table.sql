/*
# Create subscribers table

## Summary
Creates a table to store email addresses submitted via the community sign-up form
on the AI Academic Skills with Zumri landing page.

## New Tables
- `subscribers`
  - `id` (uuid, primary key) — auto-generated unique identifier
  - `email` (text, unique, not null) — subscriber's email address
  - `created_at` (timestamptz) — when they signed up, defaults to now()

## Security
- RLS enabled on `subscribers`.
- Anonymous visitors (the landing page uses the anon key) can INSERT their email.
- SELECT is restricted to authenticated users only, so the subscriber list is not
  publicly readable.
- UPDATE and DELETE are not permitted from the client at all.

## Notes
- `email` has a UNIQUE constraint so duplicate signups are silently handled
  by the frontend (we check for a duplicate key error and show a friendly message).
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers" ON subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_subscribers" ON subscribers;
CREATE POLICY "auth_select_subscribers" ON subscribers
  FOR SELECT TO authenticated
  USING (true);
