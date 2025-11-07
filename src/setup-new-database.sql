-- ============================================
-- Pip Nation Academy - New Database Setup
-- ============================================
-- 
-- Run this script in your NEW Supabase project
-- SQL Editor to create the necessary table
-- 
-- Usage:
-- 1. Open new Supabase project
-- 2. Go to SQL Editor
-- 3. Click "New Query"
-- 4. Paste this entire file
-- 5. Click "Run"
-- 6. Verify table created successfully
--
-- ============================================

-- Create the key-value store table
CREATE TABLE IF NOT EXISTS kv_store_0991178c (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE kv_store_0991178c IS 'Key-value store for Pip Nation Academy - stores users, enrollments, payments, and courses';

-- Add comments to columns
COMMENT ON COLUMN kv_store_0991178c.key IS 'Unique key for the data (e.g., users:email, enrollments:userId:courseId)';
COMMENT ON COLUMN kv_store_0991178c.value IS 'JSON value containing the actual data';
COMMENT ON COLUMN kv_store_0991178c.created_at IS 'Timestamp when record was created';
COMMENT ON COLUMN kv_store_0991178c.updated_at IS 'Timestamp when record was last updated';

-- Create index for faster prefix queries (for getByPrefix function)
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
ON kv_store_0991178c (key text_pattern_ops);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at 
ON kv_store_0991178c (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE kv_store_0991178c ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
-- (Edge Functions use service role key)
CREATE POLICY "Enable all operations for service role"
ON kv_store_0991178c
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to read
-- (Can be customized based on your needs)
CREATE POLICY "Enable read for authenticated users"
ON kv_store_0991178c
FOR SELECT
TO authenticated
USING (true);

-- Optional: Create policy for specific key patterns
-- Uncomment if you want more granular access control
-- 
-- CREATE POLICY "Users can read their own data"
-- ON kv_store_0991178c
-- FOR SELECT
-- TO authenticated
-- USING (key LIKE 'users:' || auth.email() || '%');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS update_kv_store_updated_at ON kv_store_0991178c;
CREATE TRIGGER update_kv_store_updated_at
  BEFORE UPDATE ON kv_store_0991178c
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification Queries
-- ============================================

-- Check if table was created
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_name = 'kv_store_0991178c';

-- Check indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'kv_store_0991178c';

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'kv_store_0991178c';

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Uncomment to insert sample admin user
-- INSERT INTO kv_store_0991178c (key, value)
-- VALUES (
--   'users:admin@pipnationacademy.com',
--   jsonb_build_object(
--     'email', 'admin@pipnationacademy.com',
--     'name', 'Admin',
--     'role', 'admin',
--     'beginners_access', true,
--     'strategy_access', true,
--     'createdAt', NOW()
--   )
-- )
-- ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Success Message
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Next steps:';
  RAISE NOTICE '1. Import your data (CSV or use migration script)';
  RAISE NOTICE '2. Create auth users in Authentication section';
  RAISE NOTICE '3. Create storage bucket: make-0991178c-receipts';
  RAISE NOTICE '4. Deploy Edge Functions';
  RAISE NOTICE '5. Update frontend credentials';
END $$;

-- ============================================
-- Useful Queries for Maintenance
-- ============================================

-- Count total records
-- SELECT COUNT(*) as total_records FROM kv_store_0991178c;

-- Count by key prefix (users, enrollments, etc.)
-- SELECT 
--   SPLIT_PART(key, ':', 1) as key_type,
--   COUNT(*) as count
-- FROM kv_store_0991178c
-- GROUP BY key_type
-- ORDER BY count DESC;

-- View recent records
-- SELECT 
--   key,
--   value,
--   created_at,
--   updated_at
-- FROM kv_store_0991178c
-- ORDER BY created_at DESC
-- LIMIT 10;

-- Search for specific user
-- SELECT 
--   key,
--   value
-- FROM kv_store_0991178c
-- WHERE key LIKE 'users:%@%';

-- View all enrollments
-- SELECT 
--   key,
--   value
-- FROM kv_store_0991178c
-- WHERE key LIKE 'enrollments:%';

-- View pending payments
-- SELECT 
--   key,
--   value->>'status' as status,
--   value->>'courseId' as course_id,
--   created_at
-- FROM kv_store_0991178c
-- WHERE key LIKE 'payments:%'
-- AND value->>'status' = 'pending'
-- ORDER BY created_at DESC;

-- ============================================
-- Backup Query (Save data to file)
-- ============================================

-- Use this to backup your data
-- COPY (
--   SELECT * FROM kv_store_0991178c
-- ) TO '/tmp/kv_store_backup.csv' WITH CSV HEADER;

-- ============================================
-- Restore from Backup
-- ============================================

-- Use this to restore from CSV backup
-- COPY kv_store_0991178c (key, value, created_at, updated_at)
-- FROM '/path/to/kv_store_backup.csv'
-- WITH CSV HEADER;

-- ============================================
-- Clean Up (DANGER!)
-- ============================================

-- Uncomment ONLY if you need to start fresh
-- WARNING: This will delete ALL data!
-- 
-- DROP TABLE IF EXISTS kv_store_0991178c CASCADE;

-- ============================================
-- End of Setup Script
-- ============================================
