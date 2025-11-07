# 🎯 Database Transfer Quick Reference

**Quick decision guide for transferring Pip Nation Academy backend**

---

## 🚀 Choose Your Method

### Option A: Project Transfer (Paid)
**Time:** 15 minutes  
**Difficulty:** Easy  
**Cost:** Requires Supabase Pro  
**Keeps:** Everything (zero changes)  

✅ **Use if:** You have Pro plan  
❌ **Skip if:** On free tier  

---

### Option B: Export/Import (Free)
**Time:** 2-3 hours  
**Difficulty:** Medium  
**Cost:** Free  
**Keeps:** All data (manual migration)  

✅ **Use if:** On free tier  
✅ **Use if:** Want fresh start  

---

### Option C: Add Collaborator (Free)
**Time:** 5 minutes  
**Difficulty:** Very Easy  
**Cost:** Free  
**Keeps:** Everything (shared access)  

✅ **Use if:** Just need to share access  
❌ **Skip if:** Want to transfer ownership  

---

## ⚡ Quick Steps: Option B (Most Common)

### Phase 1: Preparation (10 min)

```bash
# 1. Export current data
# - Go to Supabase Dashboard
# - Table Editor → kv_store_0991178c → Export CSV
# - Save as: kv_store_backup.csv

# 2. Note current users
# - Authentication → Users
# - Write down emails, names, roles

# 3. Download receipts
# - Storage → make-0991178c-receipts
# - Download all files
```

---

### Phase 2: New Project Setup (30 min)

```bash
# 1. New owner creates Supabase account
https://supabase.com/signup

# 2. Create new project
# - Name: Pip Nation Academy
# - Region: Same as before
# - Strong database password

# 3. Save new credentials
# - Settings → API
# - Copy URL, anon key, service_role key
```

---

### Phase 3: Database Setup (20 min)

```sql
-- 1. Create table (SQL Editor)
CREATE TABLE kv_store_0991178c (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_kv_store_key_prefix 
ON kv_store_0991178c (key text_pattern_ops);

ALTER TABLE kv_store_0991178c ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for service role"
ON kv_store_0991178c FOR ALL
USING (true) WITH CHECK (true);
```

```bash
# 2. Import data
# - Table Editor → kv_store_0991178c
# - Import → Upload kv_store_backup.csv
```

---

### Phase 4: Migrate Users (15 min)

```bash
# 1. Edit migrate-to-new-supabase.ts
# - Add OLD and NEW credentials
# - Add user list with new passwords

# 2. Run migration
npx tsx migrate-to-new-supabase.ts

# Or manually create in dashboard:
# - Authentication → Add User
# - Fill email, password, metadata
```

---

### Phase 5: Deploy Functions (20 min)

```bash
# 1. Install Supabase CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Link to new project
supabase link --project-ref YOUR_NEW_REF

# 4. Deploy
supabase functions deploy make-server-0991178c

# 5. Set environment variables
# - Edge Functions → Settings → Secrets
# - Add SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
```

---

### Phase 6: Update Code (10 min)

```typescript
// utils/supabase/info.tsx
export const projectId = 'YOUR_NEW_PROJECT_REF';
export const publicAnonKey = 'YOUR_NEW_ANON_KEY';
```

```bash
# Supabase Dashboard
# Authentication → URL Configuration
# - Site URL: https://www.pipnationacademy.com
# - Redirect URLs: https://www.pipnationacademy.com/**
```

---

### Phase 7: Testing (30 min)

```bash
✅ Test signup
✅ Test login
✅ Test course enrollment
✅ Test payment upload
✅ Test admin approval
✅ Test course access
✅ Test receipt viewing
✅ Test admin dashboard
```

---

## 📋 Credentials Checklist

### From Old Project
- [ ] Project URL
- [ ] Service role key
- [ ] Database backup (CSV)
- [ ] User list with emails
- [ ] Payment receipt files

### From New Project
- [ ] New project URL
- [ ] New anon key
- [ ] New service role key
- [ ] Project ref ID

---

## 🔧 Files to Update

After migration, update these files:

```
✅ utils/supabase/info.tsx          (new credentials)
✅ ADMIN_CREDENTIALS.md             (new passwords)
✅ README.md                        (new project ref)
✅ Edge Function environment vars   (Supabase dashboard)
✅ Authentication URLs              (Supabase dashboard)
```

---

## 🚨 Common Mistakes

### ❌ Forgot to create table
**Fix:** Run SQL script to create kv_store_0991178c

### ❌ Imported data but empty
**Fix:** Check CSV format, ensure columns map correctly

### ❌ Users can't login
**Fix:** Recreate users with new passwords, they don't migrate

### ❌ Functions not working
**Fix:** Check environment variables are set in Edge Functions

### ❌ Receipts not loading
**Fix:** Create storage bucket, upload files manually

### ❌ CORS errors
**Fix:** Set Site URL and Redirect URLs in Auth configuration

---

## 💡 Pro Tips

### Use Migration Script
```bash
# Automates most of the process
npx tsx migrate-to-new-supabase.ts
```

### Test in Parallel
- Keep old project running
- Test new project thoroughly
- Switch only when confirmed working

### Document Everything
- Note all passwords
- Save backup files
- Update documentation

### Communicate with Users
- Notify if passwords reset
- Send new login instructions
- Test with real users

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Export data | 10 min |
| Create new project | 10 min |
| Setup database | 20 min |
| Migrate users | 15 min |
| Deploy functions | 20 min |
| Update code | 10 min |
| Testing | 30 min |
| Buffer | 30 min |
| **TOTAL** | **~2.5 hours** |

---

## 📞 Emergency Contacts

### If Something Breaks

**Supabase Issues:**
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support
- Discord: https://discord.supabase.com

**Code Issues:**
- Check browser console (F12)
- Check Supabase logs
- Verify credentials
- Test API endpoints

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ No console errors
- ✅ Users can login
- ✅ Dashboard loads
- ✅ Courses visible
- ✅ Payment upload works
- ✅ Admin can approve
- ✅ Receipts display
- ✅ All features functional

---

## 🎯 Decision Flow

```
Do you have Supabase Pro plan?
├─ YES → Use Option A (Project Transfer)
│         └─ Time: 15 min, No data loss
│
└─ NO → Do you just need to share access?
         ├─ YES → Use Option C (Add Collaborator)
         │         └─ Time: 5 min, No changes
         │
         └─ NO → Use Option B (Export/Import)
                   └─ Time: 2-3 hours, Free tier OK
```

---

## 📦 What Gets Transferred

### ✅ Transferred
- All user accounts (new passwords)
- All enrollments
- All payments
- All courses
- All KV store data
- Server code (Edge Functions)

### ⚠️ Manual Steps
- Payment receipt files (download/upload)
- User passwords (must reset)
- Storage bucket (recreate)
- Auth configuration (reset URLs)

### ❌ Cannot Transfer
- Old project settings
- Old logs/analytics
- Old API keys (get new ones)

---

## 🎉 After Migration

### Cleanup
- [ ] Delete old project (optional, after confirming)
- [ ] Update all documentation
- [ ] Notify users (if passwords changed)
- [ ] Update bookmarks/links

### Ongoing
- [ ] Monitor new project
- [ ] Check error logs
- [ ] Verify backups working
- [ ] Test regularly

---

**For full detailed guide:** See `🔄_DATABASE_TRANSFER_GUIDE.md`

**For automated migration:** Use `migrate-to-new-supabase.ts`

---

_Transfer time: 15 minutes (Pro) or 2-3 hours (Free)_
