# 👑 Admin Account Setup & Login Guide

**Your Admin Credentials & Dashboard Access**

---

## 🚨 IMPORTANT: You Need to Create an Admin Account First!

**Your system does NOT have predefined admin credentials.**  
You must create an admin account using one of the methods below.

**Getting "Invalid login credentials" error?** → This is normal! See `🔧_FIX_ADMIN_LOGIN_ERROR.md` for the quick fix.

---

## ✅ RECOMMENDED METHOD: Use the Admin Setup Page

### Quick Steps (Takes 2 Minutes):

1. **Open this URL:**
   - Local: `http://localhost:5173/?admin-setup`
   - Live: `https://www.pipnationacademy.com/?admin-setup`

2. **Fill in the form** (or use the pre-filled defaults):
   - Email: `admin@pipnationacademy.com`
   - Password: `Admin123!`
   - First Name: `Admin`

3. **Click "Create Admin Account"**

4. **Wait for success message**

5. **Click "Back to Home"**

6. **Click "Login"** and use the credentials you just created

7. ✅ **You're in the Admin Dashboard!**

---

## ✅ Option 1: Create Admin via API (Recommended)

### Step 1: Use the Bootstrap Endpoint

**Open your terminal or a tool like Postman/Insomnia:**

```bash
curl -X POST https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/bootstrap-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pipnationacademy.com",
    "password": "YourSecurePassword123!",
    "firstName": "Admin",
    "country": "US"
  }'
```

**Replace:**
- `admin@pipnationacademy.com` → Your desired admin email
- `YourSecurePassword123!` → Your secure password (min 6 characters)

---

### Step 2: Verify Success

**Expected Response:**
```json
{
  "success": true,
  "message": "🎉 Admin user created successfully!",
  "email": "admin@pipnationacademy.com",
  "userId": "some-uuid-here",
  "role": "admin",
  "instructions": "You can now log in with this email and password. This bootstrap endpoint should not be used again."
}
```

---

### Step 3: Login to Your App

1. **Open:** `http://localhost:5173/` (local) or `https://www.pipnationacademy.com` (live)
2. **Click:** "Login"
3. **Enter:**
   - Email: `admin@pipnationacademy.com`
   - Password: `YourSecurePassword123!`
4. **Click:** "Sign In"
5. ✅ **You're now logged into the Admin Dashboard!**

---

## ✅ Option 2: Upgrade Existing Account to Admin

**If you already have a regular account:**

### Step 1: Use the Upgrade Endpoint

```bash
curl -X POST https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/upgrade-to-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-existing-email@example.com",
    "secretKey": "pip-nation-2024-admin-upgrade"
  }'
```

**Replace:**
- `your-existing-email@example.com` → Email of your existing account

**Note:** The secretKey is hardcoded in your backend for security.

---

### Step 2: Login Again

1. Logout if currently logged in
2. Login with your existing credentials
3. ✅ You'll now see the Admin Dashboard!

---

## ✅ Option 3: Use Browser Console (Quick & Easy)

### Step 1: Open Developer Console

1. **Open your app:** `http://localhost:5173/`
2. **Press F12** to open developer tools
3. **Go to Console tab**

---

### Step 2: Run This Code

**Copy and paste this into the console:**

```javascript
// Create admin account
fetch('https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/bootstrap-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@pipnationacademy.com',
    password: 'Admin123!',
    firstName: 'Admin',
    country: 'US'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Admin created:', data);
  if (data.success) {
    alert('Admin account created! Email: admin@pipnationacademy.com, Password: Admin123!');
  } else {
    alert('Error: ' + data.error);
  }
})
.catch(err => console.error('❌ Error:', err));
```

**Then change the email/password if desired!**

---

### Step 3: Login

**Use these credentials:**
- Email: `admin@pipnationacademy.com`
- Password: `Admin123!`

---

## 🎯 Recommended Admin Credentials

**For Production (Live Site):**
```
Email: admin@pipnationacademy.com
Password: [Create a STRONG password - 12+ characters]
```

**For Testing (Local Development):**
```
Email: admin@test.com
Password: admin123
```

**⚠️ SECURITY WARNING:**  
- Use a STRONG password for production!
- Never share admin credentials
- Change default passwords immediately
- Consider using a password manager

---

## 🔐 After Creating Admin Account

### What You Get:

✅ **Full Admin Dashboard Access**
- User Management (view, edit, delete users)
- Payment Approval/Rejection
- Course Content Management
- Analytics & Statistics
- System Diagnostics
- User Role Management

✅ **Auto-enrolled in All Courses**
- Beginners Academy
- Strategy & Mentorship

✅ **Admin Badge**
- Special admin role indicator
- Access to all features

---

## 🚀 Accessing Admin Dashboard

### From Landing Page:

1. **Click "Login"**
2. **Enter admin credentials**
3. **Click "Sign In"**
4. ✅ **Admin Dashboard automatically loads!**

The app detects your `role: "admin"` and routes you directly to the admin view.

---

### From User Dashboard:

**If logged in as admin**, the system automatically shows the admin dashboard instead of the student dashboard.

---

## 🔍 How to Verify You're Admin

**After logging in, check for:**

1. ✅ **URL or view shows admin interface**
2. ✅ **Enhanced Admin Dashboard** title visible
3. ✅ **Tabs:** Overview, Users, Payments, Content
4. ✅ **User management table** visible
5. ✅ **Statistics and analytics** shown

**Console logs (F12 → Console):**
```
✅ Profile fetched successfully: { role: "admin", ... }
```

---

## 📋 Admin Account Structure

**Your admin profile in the database:**

```json
{
  "userId": "unique-uuid",
  "email": "admin@pipnationacademy.com",
  "firstName": "Admin",
  "country": "US",
  "role": "admin",           // 👑 Admin role
  "badge": "admin",           // 👑 Admin badge
  "enrolledCourses": [
    "beginners",
    "strategy"
  ],
  "progress": {
    "foundation": { "completed": 0, "total": 12 },
    "advanced": { "completed": 0, "total": 15 },
    "beginners": { "completed": 0, "total": 12 },
    "strategy": { "completed": 0, "total": 17 }
  },
  "completedLessons": [],
  "quizScores": {},
  "coursesCompleted": [],
  "paymentHistory": [],
  "createdAt": "2024-11-24T..."
}
```

---

## 🛠️ Troubleshooting

### Issue 1: Bootstrap Endpoint Returns Error "User Already Exists"

**Solution:**
```bash
# Use the upgrade endpoint instead:
curl -X POST https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/upgrade-to-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "secretKey": "pip-nation-2024-admin-upgrade"
  }'
```

---

### Issue 2: "Invalid Login Credentials" Error

**Cause:** Admin account not created yet OR wrong password

**Solution:**
1. Verify you created admin account (check response from bootstrap)
2. Double-check email and password
3. Try creating account again with different email

---

### Issue 3: Logged In But Not Seeing Admin Dashboard

**Cause:** Account role is not "admin"

**Check:**
1. **F12 → Console** → Look for:
   ```
   ✅ Profile fetched successfully: { role: "admin" }
   ```
2. If role is "student" or "lead", use upgrade endpoint

**Fix:**
```bash
# Upgrade to admin
curl -X POST https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/upgrade-to-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "secretKey": "pip-nation-2024-admin-upgrade"
  }'
```

---

### Issue 4: Can't Access Bootstrap Endpoint

**Cause:** Server not deployed OR URL incorrect

**Check:**
1. Server is running (for local dev)
2. URL is correct: `https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/bootstrap-admin`
3. Supabase Edge Functions are deployed

**Test:**
```bash
# Test server health
curl https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/
```

---

## 🔒 Security Best Practices

### 1. Disable Bootstrap After First Use

**After creating your admin, consider removing the endpoint:**

**Edit `/supabase/functions/server/index.tsx`:**

```typescript
// Comment out or remove this endpoint after admin creation
/*
app.post("/make-server-0991178c/bootstrap-admin", async (c) => {
  return c.json({ error: "Endpoint disabled" }, 403);
});
*/
```

---

### 2. Change Default Passwords

**If you used a simple password for testing:**
```
1. Create new admin with strong password
2. Delete old admin account
```

---

### 3. Use Environment Variables

**For secret key, use environment variable:**

```typescript
const ADMIN_SECRET_KEY = Deno.env.get('ADMIN_UPGRADE_SECRET') || 'pip-nation-2024-admin-upgrade';
```

---

### 4. Monitor Admin Access

**Check admin activity regularly:**
- Review user modifications
- Monitor payment approvals
- Check content changes

---

## 📊 Admin Dashboard Features

**Once logged in as admin, you can:**

### 1. User Management
- ✅ View all users
- ✅ Search and filter users
- ✅ Change user roles (Student, Lead, Pro Trader, Admin)
- ✅ View user details and progress
- ✅ Delete users (with confirmation)

### 2. Payment Management
- ✅ View pending payments
- ✅ Approve payments (grants course access)
- ✅ Reject payments
- ✅ View payment history
- ✅ Process refunds

### 3. Course Content
- ✅ Manage course modules
- ✅ Add/edit/delete lessons
- ✅ Update course materials
- ✅ View course analytics

### 4. Analytics
- ✅ Total users count
- ✅ Active students
- ✅ Revenue metrics
- ✅ Course completion rates
- ✅ User engagement stats

### 5. System Health
- ✅ Server diagnostics
- ✅ Database status
- ✅ Error logs
- ✅ Performance metrics

---

## 🎯 Quick Reference

### Create Admin (Browser Console):
```javascript
fetch('https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/bootstrap-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@pipnationacademy.com',
    password: 'Admin123!',
    firstName: 'Admin',
    country: 'US'
  })
}).then(r => r.json()).then(console.log);
```

### Upgrade to Admin (Browser Console):
```javascript
fetch('https://mkblwhxlrdcoflliwnyr.supabase.co/functions/v1/make-server-0991178c/upgrade-to-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your-email@example.com',
    secretKey: 'pip-nation-2024-admin-upgrade'
  })
}).then(r => r.json()).then(console.log);
```

### Login Credentials (After Creation):
```
Email: admin@pipnationacademy.com
Password: Admin123!
```

---

## ✅ Step-by-Step Checklist

**To create and access admin dashboard:**

- [ ] Open browser console (F12)
- [ ] Paste bootstrap code
- [ ] Run the code
- [ ] Wait for "Admin created!" message
- [ ] Note the credentials
- [ ] Go to app homepage
- [ ] Click "Login"
- [ ] Enter admin credentials
- [ ] Click "Sign In"
- [ ] ✅ Admin Dashboard loads!

---

## 🆘 Still Having Issues?

**Provide these details:**

1. **Error message** from bootstrap/upgrade request
2. **Console logs** (F12 → Console)
3. **Account email** you're trying to use
4. **What you tried** (bootstrap, upgrade, or manual)
5. **User role** shown in console after login

---

## 📚 Related Documentation

- **`🖥️_LOCAL_DEVELOPMENT_SETUP.md`** - Local dev setup
- **`✅_ERROR_FIXED_SUMMARY.md`** - Auth error fixes
- **`SETUP.md`** - Full system setup
- **`TESTING_GUIDE.md`** - Testing procedures

---

## 🎉 You're Ready!

**Follow these steps to get admin access:**

1. **Create admin** using browser console method
2. **Login** with admin credentials
3. **Access** Enhanced Admin Dashboard
4. **Manage** your Pip Nation Academy platform!

---

**Happy managing!** 👑

---

_Admin setup guide - Last updated: November 24, 2024_