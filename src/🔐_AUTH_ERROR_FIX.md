# 🔐 Authentication Error Fix Guide

**Error:** `AuthApiError: Invalid login credentials`

---

## 🚨 What This Error Means

**Error Details:**
```json
{
  "__isAuthError": true,
  "name": "AuthApiError",
  "status": 400,
  "code": "invalid_credentials"
}
```

**This error occurs when:**
1. ✅ **Most Common:** The user doesn't exist in the database yet
2. ✅ Email or password is incorrect
3. ✅ Email format doesn't match what was registered
4. ✅ Password was changed but you're using old password
5. ⚠️ There's a mismatch between local and production databases

---

## ✅ QUICK FIX - Step by Step

### Option 1: Create a New Account First (Recommended)

**If you haven't created an account yet:**

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Open browser:** `http://localhost:5173/`

3. **Click "Get Started"** button on landing page

4. **Fill out the signup form:**
   - Full Name
   - Email (use a valid email you can remember)
   - Password (min 6 characters - remember this!)
   - Country
   - Trading Experience
   - All required fields

5. **Click "Start Free Trial"**

6. **Wait for success message**

7. **Now try logging in** with those exact credentials

---

### Option 2: Use Admin Dashboard to Check Users

**If you already created an account:**

1. **Login as admin** (if you have admin credentials)

2. **Go to Admin Dashboard**

3. **Check "User Management"** section

4. **Verify:**
   - Your email exists
   - Account status is "Active" (not "Pending")
   - Check the exact email format saved

---

### Option 3: Reset Your Password (Coming Soon)

**Password reset feature not yet implemented, so:**

1. **Create a new account** with a different email
2. **Or** ask admin to reset your account

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console

**Open Developer Tools (F12):**

1. Go to **Console** tab

2. Look for these logs when you try to login:
   ```
   🔐 Starting sign in with Supabase Auth...
   🔐 Login attempt with email: [your-email]
   ❌ Sign in error: [error message]
   ```

3. **Check the email** being logged - is it correct?

4. **Note any additional error messages**

---

### Step 2: Verify Supabase Connection

**Check if Supabase is working:**

1. **Open browser console (F12)**

2. **Go to Network tab**

3. **Try to login**

4. **Look for requests to:**
   ```
   https://mkblwhxlrdcoflliwnyr.supabase.co
   ```

5. **Check response:**
   - Status 400 = Invalid credentials
   - Status 500 = Server error
   - Status 200 = Success (but might still have auth error)

---

### Step 3: Check Email Format

**Common email format issues:**

```javascript
// Your app normalizes emails like this:
email.trim().toLowerCase()

// So these are treated as the same:
"User@Example.com"  → "user@example.com"
"user@example.com " → "user@example.com"
" USER@EXAMPLE.COM" → "user@example.com"
```

**Try:**
- Remove spaces
- Use all lowercase
- Check for typos

---

### Step 4: Verify Database Has Users

**Using Supabase Dashboard:**

1. **Go to:** https://supabase.com/dashboard

2. **Select your project:** `mkblwhxlrdcoflliwnyr`

3. **Go to:** Authentication → Users

4. **Check if any users exist**

5. **Verify your email is there**

**If NO users exist:**
- You need to signup first!
- Database might be empty

**If your email EXISTS:**
- Password might be wrong
- Try "forgot password" (if implemented)
- Or create new account with different email

---

## 🛠️ Advanced Debugging

### Check Supabase Credentials

**Verify credentials are correct:**

```bash
# In VS Code, open terminal
# Check the info file:
cat utils/supabase/info.tsx
```

**Expected output:**
```typescript
export const projectId = "mkblwhxlrdcoflliwnyr"
export const publicAnonKey = "eyJhbGc..."
```

**If these are wrong:**
- Your Supabase project might have changed
- Contact admin for correct credentials

---

### Enable Detailed Logging

**Add more console logs to debug:**

**Edit `App.tsx`, find the login section (around line 253):**

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: email.trim().toLowerCase(),
  password,
});

// ADD THESE LOGS:
console.log('🔍 Login attempt details:', {
  email: email.trim().toLowerCase(),
  passwordLength: password.length,
  hasPassword: !!password,
});

if (error) {
  console.error('❌ Sign in error:', error);
  console.error('❌ Error details:', JSON.stringify(error, null, 2));
  
  // ADD THIS:
  console.error('🔍 Error breakdown:', {
    message: error.message,
    status: error.status,
    code: error.code,
    name: error.name,
  });
}
```

**Then try logging in again and check console.**

---

### Test with Supabase Dashboard

**Manually test authentication:**

1. **Go to Supabase Dashboard**

2. **Authentication → Users**

3. **Click "Invite user"** or **"Create user"**

4. **Enter:**
   - Email: `test@example.com`
   - Password: `test123456`
   - Auto-confirm: ✅ YES

5. **Create the user**

6. **Try logging in with those credentials in your app**

---

## 🔧 Common Fixes

### Fix 1: Create Admin User First

**Your app needs at least one user:**

```bash
# If you have access to Supabase SQL Editor:
```

**Go to Supabase Dashboard → SQL Editor**

**Run this query to create a test user:**

```sql
-- This won't work because we can't create auth users via SQL
-- You MUST use the signup form or Supabase Auth UI
```

**Actually, you need to:**
1. Use the signup form in your app
2. Or use Supabase Dashboard → Authentication → Create User

---

### Fix 2: Check Password Requirements

**Your app requires:**
- ✅ Minimum 6 characters
- ✅ No maximum length
- ✅ Any characters allowed

**Supabase default requirements:**
- ✅ Minimum 6 characters
- ✅ Maximum 72 characters (bcrypt limit)

**If your password is too long:**
- Try a shorter password (under 72 chars)

---

### Fix 3: Clear Local Storage

**Sometimes cached credentials cause issues:**

**In browser console (F12):**
```javascript
// Clear all stored auth data
localStorage.clear();
sessionStorage.clear();

// Reload page
location.reload();
```

**Or manually:**
1. **F12 → Application tab** (Chrome) or **Storage tab** (Firefox)
2. **Local Storage** → Select your site
3. **Right-click → Clear**
4. **Reload page**

---

### Fix 4: Check Environment

**Are you using the right database?**

**Your app uses:**
- **Production Supabase:** `mkblwhxlrdcoflliwnyr.supabase.co`
- **Same database** for both local and live site

**This means:**
- ✅ Users created on live site work locally
- ✅ Users created locally work on live site
- ✅ Same login credentials everywhere

**But also means:**
- ⚠️ If database is empty, no users exist anywhere
- ⚠️ Test data in local affects production!

---

## 🎯 Most Likely Solutions

### Solution 1: You Haven't Signed Up Yet ⭐⭐⭐⭐⭐

**MOST COMMON ISSUE!**

**Fix:**
1. **Click "Get Started"** (not "Login")
2. **Fill out signup form**
3. **Create account**
4. **Then login**

---

### Solution 2: Wrong Password ⭐⭐⭐⭐

**Fix:**
- **Try again** carefully
- **Check caps lock**
- **Copy/paste if needed**

---

### Solution 3: Wrong Email ⭐⭐⭐

**Fix:**
- **Check for typos**
- **Use lowercase**
- **Remove spaces**

---

### Solution 4: Database is Empty ⭐⭐

**Fix:**
- **Create first user** via signup
- **Or** use Supabase Dashboard

---

### Solution 5: Account Not Confirmed ⭐

**Your app auto-confirms emails, so this shouldn't happen**

**But if it does:**
- Check Supabase Dashboard → Authentication → Users
- Look for "Confirmation Status"
- Manually confirm if needed

---

## 📝 Step-by-Step Test

**Follow this exact process:**

### 1. Signup New Account

```
1. Open: http://localhost:5173/
2. Click: "Get Started"
3. Fill form:
   - Name: Test User
   - Email: testuser@example.com
   - Password: testpass123
   - Country: United States
   - Experience: Beginner
   - Goals: Supplemental Income
   - Knowledge: None
   - Phone: +1 234 567 8900
   - WhatsApp: +1 234 567 8900
   - Preferences: Forex (check at least one)
4. Click: "Start Free Trial"
5. Wait for: "Account created successfully!"
```

### 2. Verify in Console

**Check browser console for:**
```
✅ Signup successful
✅ Auto sign-in successful
✅ Welcome to Pip Nation Academy!
```

### 3. Logout

```
1. Click profile icon
2. Click "Logout"
3. You're back at landing page
```

### 4. Login Again

```
1. Click: "Login"
2. Enter:
   - Email: testuser@example.com
   - Password: testpass123
3. Click: "Sign In"
4. Should work! ✅
```

---

## 🔐 Understanding the Auth Flow

**Your app uses Supabase Auth:**

```
User Signup
    ↓
Backend /user/signup
    ↓
Creates auth user (email confirmed automatically)
    ↓
Creates user profile in database
    ↓
Returns success
    ↓
Frontend auto-signs in
    ↓
Gets session token
    ↓
Fetches user profile
    ↓
Shows dashboard
```

**User Login:**

```
User enters credentials
    ↓
Frontend calls Supabase auth.signInWithPassword()
    ↓
Supabase validates credentials
    ↓
Returns session token OR error
    ↓
If success: Fetch user profile
    ↓
Show dashboard
    ↓
If error: Show error message
```

---

## 🆘 Still Not Working?

### Check These:

1. **Is internet working?**
   - Supabase is online service
   - Need internet connection

2. **Is Supabase down?**
   - Check: https://status.supabase.com/
   - Rare but possible

3. **Browser issues?**
   - Try different browser
   - Clear cache and cookies
   - Disable extensions

4. **Try production site:**
   - Go to: https://www.pipnationacademy.com
   - Try signup/login there
   - If it works there but not locally, it's a local setup issue

---

## 🔄 Start Fresh

**If nothing works, start completely fresh:**

### 1. Clear Everything

```bash
# In VS Code terminal:

# Clear npm cache
npm cache clean --force

# Delete node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Start fresh
npm run dev
```

### 2. Clear Browser Data

```
1. F12 → Application/Storage
2. Clear all storage
3. Hard reload: Ctrl+Shift+R
```

### 3. Try Signup Again

```
1. New email address
2. Strong password you'll remember
3. Fill all fields
4. Submit
```

---

## 📊 Error Codes Reference

| Code | Status | Meaning | Fix |
|------|--------|---------|-----|
| `invalid_credentials` | 400 | Email or password wrong | Verify credentials, try signup |
| `user_not_found` | 404 | User doesn't exist | Signup first |
| `invalid_grant` | 400 | Token expired or invalid | Logout and login again |
| `email_not_confirmed` | 400 | Email not verified | Should not happen (auto-confirmed) |
| `too_many_requests` | 429 | Rate limited | Wait 5 minutes, try again |

---

## 🎯 Quick Checklist

**Before asking for help, verify:**

- [ ] I tried signup (not just login)
- [ ] I used correct email format (lowercase, no spaces)
- [ ] I used correct password (case-sensitive, min 6 chars)
- [ ] I checked browser console for detailed errors
- [ ] I verified Supabase credentials in `info.tsx`
- [ ] I cleared browser cache/storage
- [ ] I tried in a different browser
- [ ] I checked if app works on production site
- [ ] Internet connection is working
- [ ] No typos in email/password

---

## 💡 Pro Tips

### 1. Use Password Manager

**Avoid typos:**
- Save password in browser
- Or use password manager
- Never type from memory

### 2. Test Account

**Create a dedicated test account:**
```
Email: youremail+test@gmail.com
Password: testpass123456

(Gmail ignores +test, goes to your inbox)
```

### 3. Console Logging

**Always check console first:**
- Most errors have detailed logs
- Error messages are helpful
- Shows exact issue

### 4. Network Tab

**Check API calls:**
- See request payload
- See response
- See status codes

---

## 🎉 Success Indicators

**You'll know it worked when:**

- ✅ No error message shown
- ✅ Modal closes automatically
- ✅ Dashboard appears
- ✅ Welcome message displays
- ✅ Profile data loads
- ✅ No console errors

---

## 📚 Related Documentation

**For more help, see:**
- `🖥️_LOCAL_DEVELOPMENT_SETUP.md` - Local setup guide
- `⚡_FIX_NPM_ERROR_NOW.md` - NPM error fixes
- Supabase Auth Docs: https://supabase.com/docs/guides/auth

---

**Still stuck?** Share these details:

1. Full error message from console
2. Screenshot of error
3. Email format you're using (don't share password!)
4. Have you signed up or just trying to login?
5. Does it work on production site?

---

_Auth troubleshooting guide - Last updated: November 7, 2025_
