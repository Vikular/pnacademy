# 🔄 Transfer Backend Database to Another User - Complete Guide

**Transfer your Pip Nation Academy backend and database to a different Supabase account**

---

## 🎯 What You're Doing

Transfer options:
1. **Option A:** Transfer Supabase project ownership (keeps everything)
2. **Option B:** Export data → Create new project → Import data
3. **Option C:** Add collaborator (share access, not transfer)

---

## 📊 What Needs to be Transferred

### Backend Components
- ✅ **Database:** All user data, enrollments, payments, courses
- ✅ **Edge Functions:** Server code (index.tsx, kv_store.tsx)
- ✅ **Storage:** Payment receipt images
- ✅ **Auth Users:** Student and admin accounts

### Configuration
- ✅ **Supabase credentials:** URL, ANON_KEY, SERVICE_ROLE_KEY
- ✅ **Environment variables:** In Edge Functions
- ✅ **Authentication URLs:** Site URLs, redirect URLs

---

## 🚀 OPTION A: Transfer Project Ownership (RECOMMENDED)

**Best for:** Complete transfer to new owner

### Advantages
✅ Keeps all data intact  
✅ Preserves URLs and keys  
✅ No reconfiguration needed  
✅ Fastest method  
✅ No downtime  

### Disadvantages
❌ Requires Supabase Pro plan (paid)  
❌ Must be organization project  

---

### Step-by-Step: Project Ownership Transfer

#### Step 1: Check if Transfer is Available

1. **Login to Supabase:** https://supabase.com/dashboard
2. **Go to your project:** mkblwhxlrdcoflliwnyr
3. **Settings → General**
4. **Look for:** "Transfer project" section

**If you see it:** Continue to Step 2  
**If you don't see it:** Use Option B (Export/Import)

---

#### Step 2: Create Organization (If Needed)

Projects must be in an organization to transfer.

1. **Supabase Dashboard → Organizations**
2. **Click:** "New Organization"
3. **Name:** "Pip Nation Academy"
4. **Create**

---

#### Step 3: Move Project to Organization

1. **Your Project → Settings → General**
2. **Find:** "Organization"
3. **Click:** "Transfer to organization"
4. **Select:** Your organization
5. **Confirm**

---

#### Step 4: Invite New Owner

1. **Organization Settings → Members**
2. **Click:** "Invite member"
3. **Enter:** New user's email
4. **Role:** Owner
5. **Send invitation**

---

#### Step 5: New Owner Accepts

New owner must:
1. **Check email** for invitation
2. **Click** invitation link
3. **Accept** organization invite
4. **Confirm** owner role

---

#### Step 6: Original Owner Leaves (Optional)

After transfer:
1. **Organization → Members**
2. **Your account → Remove**
3. **Confirm removal**

✅ **Transfer complete!**

---

## 🔄 OPTION B: Export & Import Data (FREE)

**Best for:** Free tier users or new Supabase project

### What This Does
- Exports all data from current project
- Creates new Supabase project under new email
- Imports all data to new project
- Updates all credentials in code

---

### Step-by-Step: Export & Import

#### PART 1: Export Current Data

##### Step 1: Export KV Store Data

**Create export script:**

1. **Go to:** https://supabase.com/dashboard/project/mkblwhxlrdcoflliwnyr/sql
2. **Run this SQL:**

```sql
-- Export all data from kv_store table
COPY (
  SELECT * FROM kv_store_0991178c
) TO '/tmp/kv_store_backup.csv' WITH CSV HEADER;
```

**Alternative: Manual export via Dashboard:**

1. **Go to:** Table Editor → kv_store_0991178c
2. **Export:** Click "Export" → CSV
3. **Save file:** `kv_store_backup.csv`

---

##### Step 2: Export Auth Users

**Using Supabase Dashboard:**

1. **Authentication → Users**
2. **For each user, note:**
   - Email
   - Encrypted password (can't export, must reset)
   - Metadata (name, role)
   - Created date

**Create user list file:** `users_backup.json`

```json
[
  {
    "email": "admin@pipnationacademy.com",
    "name": "Admin",
    "role": "admin",
    "metadata": {
      "beginners_access": true,
      "strategy_access": true
    }
  },
  {
    "email": "student@example.com",
    "name": "Student Name",
    "role": "student",
    "metadata": {}
  }
]
```

---

##### Step 3: Export Storage Files

**Download payment receipts:**

1. **Storage → Buckets → make-0991178c-receipts**
2. **Download all files** manually
3. **Save to folder:** `receipts_backup/`

---

##### Step 4: Backup Edge Functions

**Already in your code:**
- ✅ `supabase/functions/server/index.tsx`
- ✅ `supabase/functions/server/kv_store.tsx`
- ✅ `supabase/functions/server/admin-setup.tsx`

No action needed - you have the code!

---

#### PART 2: Create New Supabase Project

##### Step 1: New Owner Creates Account

**New owner should:**

1. **Go to:** https://supabase.com/signup
2. **Sign up** with their email
3. **Verify** email
4. **Login**

---

##### Step 2: Create New Project

1. **Dashboard → New Project**
2. **Organization:** Default (or create new)
3. **Name:** Pip Nation Academy
4. **Database Password:** Create strong password (save it!)
5. **Region:** Same as original (or closest to users)
6. **Plan:** Free or Pro
7. **Create Project**

⏳ **Wait 2-3 minutes for project setup**

---

##### Step 3: Get New Credentials

1. **New Project → Settings → API**
2. **Copy these values:**

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save these - you'll need them!**

---

#### PART 3: Setup New Database

##### Step 1: Create KV Store Table

**Go to:** SQL Editor → New Query

**Run this:**

```sql
-- Create the key-value store table
CREATE TABLE IF NOT EXISTS kv_store_0991178c (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
ON kv_store_0991178c (key text_pattern_ops);

-- Enable Row Level Security
ALTER TABLE kv_store_0991178c ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Enable all for service role"
ON kv_store_0991178c
FOR ALL
USING (true)
WITH CHECK (true);
```

---

##### Step 2: Import Data

**Upload CSV file:**

1. **Table Editor → kv_store_0991178c**
2. **Import → Upload CSV**
3. **Select:** `kv_store_backup.csv`
4. **Map columns:** key → key, value → value
5. **Import**

---

##### Step 3: Recreate Auth Users

**For each user in your backup list:**

```typescript
// You'll do this through the admin API
// I'll provide a script below
```

**Create file:** `migrate-users.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_NEW_PROJECT_URL';
const supabaseServiceKey = 'YOUR_NEW_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const users = [
  {
    email: "admin@pipnationacademy.com",
    password: "NewSecurePassword123!",
    email_confirm: true,
    user_metadata: {
      name: "Admin",
      role: "admin",
      beginners_access: true,
      strategy_access: true
    }
  },
  // Add more users...
];

async function migrateUsers() {
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser(user);
    
    if (error) {
      console.error(`Failed to create ${user.email}:`, error);
    } else {
      console.log(`✅ Created user: ${user.email}`);
    }
  }
}

migrateUsers();
```

**Run migration:**
```bash
npx tsx migrate-users.ts
```

---

##### Step 4: Create Storage Bucket

**Create receipts bucket:**

1. **Storage → Create Bucket**
2. **Name:** `make-0991178c-receipts`
3. **Public:** No (private)
4. **Create**

**Upload receipt files:**
1. **Open bucket**
2. **Upload files** from `receipts_backup/`
3. **Maintain folder structure**

---

#### PART 4: Deploy Edge Functions

##### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

---

##### Step 2: Login to Supabase

```bash
supabase login
```

**Enter your access token** (get from Supabase dashboard)

---

##### Step 3: Link to New Project

```bash
supabase link --project-ref YOUR_NEW_PROJECT_REF
```

**Find project ref:** In new project URL: `https://[PROJECT_REF].supabase.co`

---

##### Step 4: Deploy Functions

**From your project root:**

```bash
supabase functions deploy make-server-0991178c
```

---

##### Step 5: Set Environment Variables

**In Supabase Dashboard:**

1. **Edge Functions → make-server-0991178c → Settings**
2. **Add secrets:**

```
SUPABASE_URL = https://YOUR_NEW_PROJECT.supabase.co
SUPABASE_ANON_KEY = your_new_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_new_service_role_key
```

---

#### PART 5: Update Frontend Code

##### Step 1: Update Supabase Info

**Edit:** `utils/supabase/info.tsx`

**Replace with new credentials:**

```typescript
export const projectId = 'YOUR_NEW_PROJECT_REF';
export const publicAnonKey = 'YOUR_NEW_ANON_KEY';
```

---

##### Step 2: Update Authentication URLs

**In Supabase Dashboard:**

1. **Authentication → URL Configuration**
2. **Site URL:** `https://www.pipnationacademy.com`
3. **Redirect URLs:**
   - `https://www.pipnationacademy.com`
   - `https://www.pipnationacademy.com/**`
   - `http://localhost:5173/**` (for development)

---

##### Step 3: Test Connection

**Create test file:** `test-new-connection.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test New Supabase Connection</title>
</head>
<body>
  <h1>Test New Backend</h1>
  <button onclick="testConnection()">Test Connection</button>
  <div id="result"></div>

  <script type="module">
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
    
    const supabase = createClient(
      'YOUR_NEW_PROJECT_URL',
      'YOUR_NEW_ANON_KEY'
    );
    
    window.testConnection = async () => {
      const result = document.getElementById('result');
      result.innerHTML = 'Testing...';
      
      try {
        // Test database connection
        const { data, error } = await supabase
          .from('kv_store_0991178c')
          .select('count')
          .limit(1);
        
        if (error) throw error;
        
        result.innerHTML = '✅ Connection successful!';
        console.log('Connected to new database');
      } catch (err) {
        result.innerHTML = `❌ Error: ${err.message}`;
        console.error(err);
      }
    };
  </script>
</body>
</html>
```

---

##### Step 4: Deploy Updated Code

**In Figma Make:**
1. **Update** `utils/supabase/info.tsx` with new credentials
2. **Save changes**
3. **Figma Make auto-deploys**

---

#### PART 6: Verify Transfer

##### Checklist

- [ ] New Supabase project created
- [ ] KV store table created
- [ ] Data imported successfully
- [ ] Auth users recreated (with new passwords)
- [ ] Storage bucket created
- [ ] Receipt files uploaded
- [ ] Edge functions deployed
- [ ] Environment variables set
- [ ] Frontend credentials updated
- [ ] Authentication URLs configured
- [ ] Test connection successful
- [ ] Users can login
- [ ] Course enrollment works
- [ ] Payment receipts load
- [ ] Admin dashboard accessible

---

##### Test Everything

**Student Flow:**
1. ✅ Signup works
2. ✅ Login works
3. ✅ Can view courses
4. ✅ Can enroll in course
5. ✅ Can upload payment receipt
6. ✅ Can view course content (after approval)

**Admin Flow:**
1. ✅ Admin login works
2. ✅ Can see pending payments
3. ✅ Can view receipt images
4. ✅ Can approve payments
5. ✅ Can manage students
6. ✅ Can upload course content

---

## 👥 OPTION C: Add Collaborator (Share Access)

**Best for:** Keeping original owner, adding helper

### Step-by-Step

1. **Supabase Dashboard → Project Settings → Team**
2. **Click:** "Invite member"
3. **Email:** New user's email
4. **Role:** 
   - **Owner:** Full access
   - **Developer:** Read/write
   - **Read-only:** View only
5. **Send invite**

**New user:**
- Gets email invitation
- Accepts invite
- Can access project in their dashboard

**No data migration needed!**

---

## 🔐 Security After Transfer

### Important Steps

#### 1. Update Admin Credentials

**New owner should:**
1. Login to platform as admin
2. Change admin password
3. Update `ADMIN_CREDENTIALS.md`

#### 2. Rotate API Keys (Optional)

**For extra security:**
1. **Supabase Dashboard → Settings → API**
2. **Click:** "Rotate service_role key"
3. **Update** in Edge Functions environment
4. **Update** in frontend code

#### 3. Review Access

**Check who has access:**
- Supabase project members
- Auth users in platform
- Admin accounts

#### 4. Update Documentation

**Update these files:**
- `ADMIN_CREDENTIALS.md` (new passwords)
- `README.md` (new owner info)
- `SETUP.md` (new Supabase project ref)

---

## 📋 Data to Migrate Checklist

### Database Tables
- [ ] `kv_store_0991178c` - All keys and values

### Key-Value Store Keys
- [ ] `users:{email}` - User profiles
- [ ] `enrollments:{userId}:{courseId}` - Course enrollments
- [ ] `payments:{paymentId}` - Payment records
- [ ] `courses:{courseId}` - Course data
- [ ] Any custom keys

### Authentication
- [ ] Admin user
- [ ] Student users
- [ ] User metadata (name, role, access)

### Storage
- [ ] `make-0991178c-receipts` bucket
- [ ] All payment receipt images
- [ ] Maintain file paths/names

### Edge Functions
- [ ] `make-server-0991178c` function
- [ ] Environment variables
- [ ] Server code (already in files)

### Configuration
- [ ] Supabase URL
- [ ] Anon key
- [ ] Service role key
- [ ] Authentication URLs
- [ ] Site URL
- [ ] Redirect URLs

---

## 🆘 Troubleshooting

### Issue: Can't Transfer Project

**Solution:** Use Option B (Export/Import) - works on free tier

---

### Issue: Lost Service Role Key

**Solution:**
1. **Supabase → Settings → API**
2. **View service_role key**
3. **Or rotate** to get new one

---

### Issue: Users Can't Login After Transfer

**Cause:** Passwords don't transfer

**Solution:**
1. **Recreate users** with new passwords
2. **Send password reset emails**
3. **Users create new passwords**

---

### Issue: Payment Receipts Not Loading

**Cause:** Storage bucket paths changed

**Solution:**
1. **Check bucket name** matches code
2. **Verify files uploaded** correctly
3. **Update file paths** if needed
4. **Regenerate signed URLs**

---

### Issue: Edge Functions Not Working

**Cause:** Environment variables not set

**Solution:**
1. **Edge Functions → Settings → Secrets**
2. **Add all three:**
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
3. **Redeploy function**

---

### Issue: CORS Errors After Transfer

**Cause:** Site URL not configured

**Solution:**
1. **Authentication → URL Configuration**
2. **Add:** `https://www.pipnationacademy.com`
3. **Add:** `https://www.pipnationacademy.com/**`
4. **Save**

---

## 💰 Cost Considerations

### Supabase Free Tier
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB data transfer/month
- ✅ 500K Edge Function invocations

**Enough for:**
- ~1000 users
- Hundreds of payment receipts
- Normal usage

### When to Upgrade
- More than 500 MB data
- Heavy traffic
- Need project transfer feature
- Want daily backups

---

## 🎯 Recommended Approach

### For Most Users: Option B (Export/Import)

**Why:**
- ✅ Works on free tier
- ✅ Fresh start with new owner
- ✅ No organizational complexity
- ✅ Full control

**Time:** 2-3 hours

### For Pro Users: Option A (Project Transfer)

**Why:**
- ✅ No downtime
- ✅ Keeps everything intact
- ✅ Fastest method

**Time:** 15-30 minutes

**Cost:** Requires Pro plan (~$25/month)

---

## 📞 Need Help?

### If You Get Stuck

**Option B issues:**
- Check Supabase docs: https://supabase.com/docs
- Verify credentials are correct
- Check browser console for errors
- Ensure Edge Functions deployed

**Option A issues:**
- Contact Supabase support
- Check if project is in organization
- Verify Pro plan status

---

## ✅ Final Checklist

**Before starting:**
- [ ] Decided which option to use
- [ ] New owner has Supabase account
- [ ] Backed up all data
- [ ] Saved current credentials
- [ ] Noted all users and their access

**After transfer:**
- [ ] New project working
- [ ] All data transferred
- [ ] Users can login
- [ ] Platform functional
- [ ] Admin access works
- [ ] Receipts load correctly
- [ ] Old project can be deleted (optional)

---

## 🎉 Success!

**Your backend is now transferred to the new owner!**

**Next steps:**
1. ✅ Test all features thoroughly
2. ✅ Update documentation
3. ✅ Notify users of any changes (if passwords reset)
4. ✅ Delete old project (optional, after confirming new one works)

---

**Questions about the transfer process? Let me know which option you're using!** 🚀

---

_Last updated: October 27, 2025_
