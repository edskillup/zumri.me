/*
# Add full_name and role columns to subscribers

## Summary
Extends the subscribers table to capture the subscriber's name and academic role
alongside their email address, supporting the updated 3-field sign-up form.

## Modified Tables
- `subscribers`
  - Added `full_name` (text, not null) — subscriber's full name
  - Added `role` (text, not null, CHECK) — either 'Academic' or 'Student'

## Notes
- Uses `IF NOT EXISTS` pattern via DO block so the migration is safe to re-run.
- Existing rows (email-only signups) will have empty strings as defaults for
  the new columns, which is acceptable for historical data.
- A CHECK constraint on `role` enforces the two valid options at the database level.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscribers' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE subscribers ADD COLUMN full_name text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscribers' AND column_name = 'role'
  ) THEN
    ALTER TABLE subscribers ADD COLUMN role text NOT NULL DEFAULT '' CHECK (role IN ('', 'Academic', 'Student'));
  END IF;
END $$;
