# ✅ Database Transfer Checklist

**Complete step-by-step checklist for transferring Pip Nation Academy backend**

---

## 📋 PRE-MIGRATION PREPARATION

### Backup Current System
- [ ] Export kv_store_0991178c table to CSV
- [ ] List all auth users (emails, names, roles)
- [ ] Download all payment receipt files
- [ ] Save current Supabase credentials
- [ ] Screenshot current dashboard
- [ ] Note admin email and password
- [ ] Document custom settings

### Verify Requirements
- [ ] New owner has email account
- [ ] New owner created Supabase account
- [ ] Decided on migration method (A, B, or C)
- [ ] Have 2-3 hours available (for Option B)
- [ ] Saved all backup files locally

---

## 🆕 NEW PROJECT SETUP

### Create New Supabase Project
- [ ] New owner logged into Supabase
- [ ] Created new project: "Pip Nation Academy"
- [ ] Selected same region as old project
- [ ] Created strong database password
- [ ] Saved database password securely
- [ ] Waited for project to finish initializing
- [ ] Project status shows "Active"

### Save New Credentials
- [ ] Copied new Project URL
- [ ] Copied new anon/public key
- [ ] Copied new service_role key
- [ ] Noted new project reference ID
- [ ] Saved all credentials in secure location
- [ ] Verified credentials are correct

---

## 🗄️ DATABASE SETUP

### Create KV Store Table
- [ ] Opened SQL Editor in new project
- [ ] Ran CREATE TABLE script
- [ ] Ran CREATE INDEX script
- [ ] Enabled Row Level Security
- [ ] Created access policy
- [ ] Verified table appears in Table Editor
- [ ] Confirmed table structure is correct

### Import Data
- [ ] Opened Table Editor → kv_store_0991178c
- [ ] Clicked Import → Upload CSV
- [ ] Selected kv_store_backup.csv
- [ ] Mapped columns correctly
- [ ] Clicked Import
- [ ] Verified import successful
- [ ] Checked record count matches export

---

## 👥 USER MIGRATION

### Prepare User List
- [ ] Listed all admin users
- [ ] Listed all student users
- [ ] Created new passwords for each
- [ ] Documented user metadata (name, role, access)
- [ ] Saved user list securely

### Create Auth Users
- [ ] Updated migrate-to-new-supabase.ts with credentials
- [ ] Added all users to migration script
- [ ] Ran migration script: `npx tsx migrate-to-new-supabase.ts`
- [ ] Verified all users created successfully
- [ ] Checked Authentication → Users in dashboard
- [ ] Confirmed user metadata correct
- [ ] Tested login for admin user
- [ ] Tested login for student user

---

## 📁 STORAGE SETUP

### Create Storage Bucket
- [ ] Opened Storage in new project
- [ ] Clicked "Create Bucket"
- [ ] Named bucket: `make-0991178c-receipts`
- [ ] Set to Private (not public)
- [ ] Created bucket
- [ ] Verified bucket appears in list

### Upload Receipt Files
- [ ] Opened bucket: make-0991178c-receipts
- [ ] Uploaded all payment receipt files
- [ ] Maintained original file names
- [ ] Maintained folder structure
- [ ] Verified all files uploaded
- [ ] Tested file access (generate signed URL)

---

## 🚀 EDGE FUNCTIONS DEPLOYMENT

### Install & Setup CLI
- [ ] Installed Supabase CLI: `npm install -g supabase`
- [ ] Verified installation: `supabase --version`
- [ ] Ran `supabase login`
- [ ] Pasted access token
- [ ] Login successful

### Deploy Functions
- [ ] Ran `supabase link --project-ref NEW_PROJECT_REF`
- [ ] Verified link successful
- [ ] Ran `supabase functions deploy make-server-0991178c`
- [ ] Deployment completed successfully
- [ ] Function appears in Edge Functions dashboard
- [ ] Function status shows "Active"

### Set Environment Variables
- [ ] Opened Edge Functions → make-server-0991178c → Settings
- [ ] Added secret: `SUPABASE_URL` = new project URL
- [ ] Added secret: `SUPABASE_ANON_KEY` = new anon key
- [ ] Added secret: `SUPABASE_SERVICE_ROLE_KEY` = new service key
- [ ] Saved all secrets
- [ ] Verified secrets are set
- [ ] Restarted function (if needed)

---

## 💻 FRONTEND CODE UPDATES

### Update Supabase Credentials
- [ ] Opened `utils/supabase/info.tsx`
- [ ] Updated `projectId` to new project ref
- [ ] Updated `publicAnonKey` to new anon key
- [ ] Saved file
- [ ] Verified no typos in credentials

### Configure Authentication URLs
- [ ] Opened new Supabase project
- [ ] Went to Authentication → URL Configuration
- [ ] Set Site URL: `https://www.pipnationacademy.com`
- [ ] Added Redirect URL: `https://www.pipnationacademy.com`
- [ ] Added Redirect URL: `https://www.pipnationacademy.com/**`
- [ ] Added Redirect URL: `http://localhost:5173/**` (for dev)
- [ ] Saved configuration

### Deploy Updated Code
- [ ] Code updated in Figma Make
- [ ] Changes saved
- [ ] Auto-deployment triggered
- [ ] Verified deployment successful
- [ ] Checked live site loads

---

## 🧪 TESTING PHASE

### Basic Connectivity
- [ ] Opened live site: www.pipnationacademy.com
- [ ] No console errors (F12)
- [ ] Site loads correctly
- [ ] No "connection failed" messages
- [ ] Supabase client connects

### Student User Flow
- [ ] Can access signup page
- [ ] Can create new account
- [ ] Receives confirmation (if applicable)
- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Can view courses
- [ ] Can click "Enroll Now"
- [ ] Can select course
- [ ] Can upload payment receipt
- [ ] Receipt uploads to storage
- [ ] Status shows "Pending Approval"

### Admin User Flow
- [ ] Can login as admin
- [ ] Admin dashboard loads
- [ ] Enhanced dashboard accessible
- [ ] Can see pending payments
- [ ] Can view receipt images
- [ ] Images load from storage
- [ ] Can approve payment
- [ ] Student gets access immediately
- [ ] Can manage students
- [ ] Can delete accounts
- [ ] Can upload course content

### Course Access
- [ ] After approval, student sees courses
- [ ] Can click into course
- [ ] Lesson viewer opens
- [ ] Content displays correctly
- [ ] Can navigate between lessons
- [ ] Progress saves
- [ ] Can complete lessons

### FTMO Tracking
- [ ] Student can submit FTMO link
- [ ] Submission saves
- [ ] Admin can view submissions
- [ ] Data persists correctly

---

## 🔒 SECURITY VERIFICATION

### Credentials Check
- [ ] No API keys in browser code
- [ ] Service role key only on server
- [ ] Environment variables secure
- [ ] .gitignore protecting sensitive files
- [ ] No credentials in GitHub

### Access Control
- [ ] Students can't access admin routes
- [ ] Unauthenticated users redirected
- [ ] Protected pages require login
- [ ] Role-based access working
- [ ] Storage buckets are private

### Authentication
- [ ] Login requires valid credentials
- [ ] Signup creates account properly
- [ ] Session persists across pages
- [ ] Logout works correctly
- [ ] Password reset available (if configured)

---

## 📚 DOCUMENTATION UPDATES

### Update Files
- [ ] Updated `ADMIN_CREDENTIALS.md` with new passwords
- [ ] Updated `README.md` with new project info
- [ ] Updated `SETUP.md` with new credentials
- [ ] Updated any reference to old project
- [ ] Noted migration date in docs

### Create Records
- [ ] Documented what was migrated
- [ ] Listed any issues encountered
- [ ] Noted solutions applied
- [ ] Created backup schedule plan
- [ ] Documented new admin credentials

---

## 📞 USER COMMUNICATION

### Notify Users (If Needed)
- [ ] Drafted notification message
- [ ] Explained password reset (if applicable)
- [ ] Provided new login instructions
- [ ] Set timeline for migration
- [ ] Sent notification to all users
- [ ] Provided support contact info

---

## 🧹 POST-MIGRATION CLEANUP

### Verify Everything Works
- [ ] Tested all major features
- [ ] No critical errors in logs
- [ ] Performance is acceptable
- [ ] All data visible
- [ ] Users can perform all actions

### Optional: Delete Old Project
- [ ] Confirmed new project fully working
- [ ] Waited at least 1 week
- [ ] Backed up old project one more time
- [ ] Deleted old Supabase project
- [ ] Confirmed deletion

### Monitor New System
- [ ] Check error logs daily (first week)
- [ ] Monitor usage metrics
- [ ] Watch for issues
- [ ] Respond to user feedback
- [ ] Document any problems

---

## 🎉 MIGRATION COMPLETE!

### Final Verification
- [ ] ✅ All data migrated
- [ ] ✅ All users can access system
- [ ] ✅ All features working
- [ ] ✅ No critical errors
- [ ] ✅ Documentation updated
- [ ] ✅ Team/users notified
- [ ] ✅ Old project backed up
- [ ] ✅ Monitoring in place

### Success Criteria Met
- [ ] Students can signup and login
- [ ] Students can enroll in courses
- [ ] Students can upload payment receipts
- [ ] Admins can approve payments
- [ ] Course content accessible after approval
- [ ] FTMO submissions working
- [ ] Admin dashboard fully functional
- [ ] No data loss occurred
- [ ] Platform stable and performant

---

## 📊 Migration Summary

**Date Started:** _______________

**Date Completed:** _______________

**Duration:** _______________

**Method Used:** 
- [ ] Option A: Project Transfer
- [ ] Option B: Export/Import
- [ ] Option C: Add Collaborator

**Data Migrated:**
- [ ] KV Store records: _____ items
- [ ] Auth users: _____ users
- [ ] Storage files: _____ files
- [ ] Edge Functions: ✅ Deployed

**Issues Encountered:**
- _________________________________
- _________________________________
- _________________________________

**Resolution:**
- _________________________________
- _________________________________
- _________________________________

**New Project Details:**
- Project URL: _________________________________
- Project Ref: _________________________________
- Owner Email: _________________________________

**Old Project:**
- [ ] Still active (monitoring period)
- [ ] Deleted (date: _______________)

---

## 🆘 If Something Goes Wrong

### Emergency Rollback
If critical issues occur:
1. **Don't panic** - old project still exists
2. **Revert credentials** in utils/supabase/info.tsx to old ones
3. **Redeploy** with old credentials
4. **Investigate** issue in new project
5. **Fix** and try again

### Get Help
- **Supabase Docs:** https://supabase.com/docs
- **Supabase Support:** https://supabase.com/support
- **Review guides:** `🔄_DATABASE_TRANSFER_GUIDE.md`

---

## 📝 Notes

Use this section for any additional notes during migration:

```
_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________
```

---

**Print this checklist and check off items as you complete them!**

**Estimated time: 2-3 hours for full migration (Option B)**

---

_Last updated: October 27, 2025_
