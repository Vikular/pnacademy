# 🖥️ Local Development Setup - VS Code

**Complete guide to run Pip Nation Academy locally in VS Code**

---

## 🚨 IMPORTANT: Why You Got the Error

Your project was originally built for **Figma Make** hosting, which handles all build configuration automatically. To run it locally in VS Code, you need proper Node.js project files.

**The error you saw:**
```
npm error code EINVALIDPACKAGENAME
npm error Invalid package name "Access Course"
```

**What caused it:**
- Missing `package.json` file
- npm tried to interpret something in your code as a package name
- Project wasn't configured for local development

**Solution:** I've created all the necessary configuration files!

---

## ✅ Files I Created

I've added these files to make your project run locally:

1. **`package.json`** - Project dependencies and scripts
2. **`vite.config.ts`** - Build tool configuration
3. **`tsconfig.json`** - TypeScript configuration
4. **`index.html`** - HTML entry point
5. **`main.tsx`** - React entry point
6. **`.eslintrc.json`** - Code linting rules

---

## 🚀 STEP-BY-STEP LOCAL SETUP

### Prerequisites

Before starting, ensure you have:

**1. Node.js Installed**
- Version: 18.x or higher
- Download: https://nodejs.org/
- Verify: Open terminal/command prompt and run:
  ```bash
  node --version
  # Should show: v18.x.x or higher
  ```

**2. npm Installed** (comes with Node.js)
- Verify:
  ```bash
  npm --version
  # Should show: 9.x.x or higher
  ```

**3. VS Code Installed**
- Download: https://code.visualstudio.com/
- Already installed ✅

---

### Step 1: Open Terminal in VS Code

**In VS Code:**
1. **Open** your project folder
2. **Press** `` Ctrl+` `` (backtick) or View → Terminal
3. **Terminal** appears at bottom

**Make sure you're in the project root folder:**
```bash
# You should see package.json when you run:
dir    # Windows
ls     # Mac/Linux
```

---

### Step 2: Install Dependencies

**Run this command in the terminal:**

```bash
npm install
```

**What this does:**
- Reads `package.json`
- Downloads all required packages (~500MB)
- Creates `node_modules` folder
- Creates `package-lock.json`

**This will take 2-5 minutes** ⏳

**Expected output:**
```
added 1234 packages in 3m
```

**If you get errors:**
- Make sure you have internet connection
- Try: `npm install --legacy-peer-deps`
- Or: `npm cache clean --force` then `npm install` again

---

### Step 3: Start Development Server

**Run this command:**

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.3.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h to show help
```

**Your browser should automatically open to:**
```
http://localhost:5173/
```

✅ **Success!** Your app is now running locally!

---

### Step 4: View in Browser

**Open your browser to:**
```
http://localhost:5173/
```

**You should see:**
- Pip Nation Academy landing page
- All animations working
- Fully functional platform

---

## 🎯 Development Workflow

### Making Changes

**Hot Module Replacement (HMR)** is enabled:

1. **Edit any `.tsx` file** in VS Code
2. **Save** (Ctrl+S)
3. **Browser automatically updates** - no refresh needed!

**Example:**
```tsx
// Edit components/LandingPage.tsx
// Change some text
// Save file
// See changes instantly in browser!
```

---

### Available Commands

**In VS Code terminal:**

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check code for errors
npm run lint
```

---

### Stop the Server

**To stop the development server:**

1. **Click** in the terminal
2. **Press** `Ctrl+C`
3. **Confirm** with `Y` if prompted

---

## 📁 Project Structure (Updated)

```
pip-nation-academy/
├── index.html              ← HTML entry point (NEW)
├── main.tsx               ← React entry point (NEW)
├── package.json           ← Dependencies (NEW)
├── vite.config.ts         ← Build config (NEW)
├── tsconfig.json          ← TypeScript config (NEW)
├── .eslintrc.json         ← Linting config (NEW)
├── App.tsx                ← Main app component
├── components/            ← All React components
├── utils/                 ← Utility functions
├── styles/                ← CSS files
├── supabase/             ← Backend code
└── node_modules/         ← Dependencies (created after npm install)
```

---

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot find module 'react'"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json   # Mac/Linux
rmdir /s node_modules & del package-lock.json  # Windows

npm install
```

---

### Issue 2: Port 5173 Already in Use

**Solution:**
```bash
# Kill the process using port 5173
# Or change port in vite.config.ts:
server: {
  port: 3000,  // Change to different port
}
```

---

### Issue 3: "Module not found" errors

**Common missing modules:**

```bash
# If any specific module is missing, install it:
npm install <package-name>

# For example:
npm install @supabase/supabase-js
```

---

### Issue 4: TypeScript Errors

**Solution:**
```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P
# Type: "TypeScript: Restart TS Server"
# Press: Enter
```

---

### Issue 5: "Cannot read property of undefined"

**Cause:** Environment variables not set

**Solution:** Create `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Note:** In Figma Make, these are in `utils/supabase/info.tsx`

---

## 🌐 Supabase Configuration

### Current Setup

Your Supabase credentials are in:
```
utils/supabase/info.tsx
```

**This works for local development!** No changes needed.

### Environment Variables (Optional)

For better security in production, use `.env` files:

**Create `.env.local`:**
```env
VITE_SUPABASE_URL=https://mkblwhxlrdcoflliwnyr.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Update `utils/supabase/info.tsx`:**
```typescript
export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || 'mkblwhxlrdcoflliwnyr';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_fallback_key';
```

**Add to `.gitignore`:**
```
.env.local
.env
```

---

## 🎨 VS Code Extensions (Recommended)

**Install these for better development experience:**

### 1. ES7+ React/Redux/React-Native snippets
- Quick React snippets
- Install: Search "ES7 React" in Extensions

### 2. Tailwind CSS IntelliSense
- Autocomplete Tailwind classes
- Install: Search "Tailwind CSS IntelliSense"

### 3. Prettier - Code formatter
- Auto-format on save
- Install: Search "Prettier"

### 4. ESLint
- Real-time linting
- Install: Search "ESLint"

### 5. TypeScript Error Translator
- Better error messages
- Install: Search "TypeScript Error Translator"

**How to install:**
1. Click Extensions icon (or Ctrl+Shift+X)
2. Search extension name
3. Click "Install"

---

## 🔥 Hot Tips

### Format on Save

**Enable in VS Code:**

1. **File → Preferences → Settings** (or Ctrl+,)
2. **Search:** "format on save"
3. **Check:** "Editor: Format On Save"

### Auto Import

**VS Code auto-imports missing imports:**

1. Hover over red underlined component
2. Click "Quick Fix" (or Ctrl+.)
3. Select "Add import from..."

### Multi-cursor Editing

**Edit multiple lines at once:**

1. **Hold Alt** (Windows) or **Option** (Mac)
2. **Click** multiple locations
3. **Type** - edits all at once!

### Terminal Split

**Run multiple terminals:**

1. **Click** + icon in terminal
2. **Or** Click split icon
3. Run different commands simultaneously

---

## 📊 Development vs Production

### Local Development (What you're doing now)

**Running:**
```bash
npm run dev
```

**Features:**
- ✅ Hot Module Replacement
- ✅ Fast refresh
- ✅ Source maps for debugging
- ✅ Detailed error messages
- ❌ Not optimized for performance
- ❌ Larger file sizes

**URL:** `http://localhost:5173/`

---

### Production Build

**Build for production:**
```bash
npm run build
```

**Creates:**
- `/dist` folder with optimized files
- Minified JavaScript
- Optimized CSS
- Compressed assets

**Preview production build:**
```bash
npm run preview
```

**Deploy:** 
- Upload `/dist` folder to any hosting
- Or continue using Figma Make (recommended)

---

## 🌍 Local vs Figma Make

### Local Development

**Pros:**
- ✅ Instant changes (hot reload)
- ✅ Full control
- ✅ Offline development
- ✅ Debug easily
- ✅ Test before deploying

**Cons:**
- ❌ Requires setup
- ❌ Requires Node.js
- ❌ Not accessible to others
- ❌ Need to deploy separately

---

### Figma Make (Your Current Live Site)

**Pros:**
- ✅ Automatic deployment
- ✅ No setup needed
- ✅ Live instantly
- ✅ Custom domain support
- ✅ SSL certificate included

**Cons:**
- ❌ Changes not instant
- ❌ Limited debugging
- ❌ Can't work offline

---

## 🔄 Recommended Workflow

### Best Practice

1. **Develop locally** (VS Code) ← You're doing this now
   - Make changes
   - Test thoroughly
   - Debug issues

2. **Test in browser** (localhost:5173)
   - Verify everything works
   - Test all features
   - Check responsive design

3. **Deploy to Figma Make** (when ready)
   - Copy changes to Figma Make
   - Auto-deploys to pipnationacademy.com
   - Goes live

**This gives you best of both worlds!**

---

## 🎯 Your Current Setup

### What's Running Where

**Local (VS Code):**
```
http://localhost:5173/
├─ For development
├─ Hot reload enabled
└─ You only can access
```

**Production (Figma Make):**
```
https://www.pipnationacademy.com
├─ Live site
├─ Public access
└─ Connected to Supabase
```

**Both use the same Supabase backend!**

---

## ⚠️ Important Notes

### Changes in VS Code

**Changes you make locally:**
- ❌ Do NOT automatically deploy to live site
- ✅ Only affect localhost:5173
- ✅ Safe to experiment

**To deploy changes:**
- Must update code in Figma Make
- Or deploy manually to hosting

### Supabase Backend

**Both local and live use:**
- ✅ Same Supabase project
- ✅ Same database
- ✅ Same users
- ✅ Same data

**Be careful:**
- Testing locally affects real data!
- Consider using separate Supabase project for dev

---

## 📝 Quick Reference

### Terminal Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Stop server
Ctrl+C

# Build for production
npm run build

# Preview production
npm run preview

# Lint code
npm run lint

# Clear cache
npm cache clean --force
```

### Keyboard Shortcuts

```
Ctrl+`         → Open terminal
Ctrl+S         → Save file
Ctrl+Shift+P   → Command palette
Ctrl+P         → Quick file open
Ctrl+.         → Quick fix
Ctrl+/         → Toggle comment
F12            → Go to definition
Shift+F12      → Find all references
```

---

## 🎉 You're All Set!

### Current Status

✅ **Configuration files created**
✅ **package.json ready**
✅ **Build tools configured**
✅ **TypeScript setup**

### Next Steps

**1. Install dependencies:**
```bash
npm install
```

**2. Start dev server:**
```bash
npm run dev
```

**3. Open browser:**
```
http://localhost:5173/
```

**4. Start coding!** 🚀

---

## 🆘 Still Getting Errors?

### Common npm install errors

**Error: "EACCES: permission denied"**
```bash
# Windows: Run CMD as Administrator
# Mac/Linux:
sudo npm install
```

**Error: "Network timeout"**
```bash
# Increase timeout:
npm install --timeout=60000
```

**Error: "Conflicting peer dependencies"**
```bash
# Use legacy peer deps:
npm install --legacy-peer-deps
```

### Still stuck?

**Try this clean install:**
```bash
# 1. Delete everything
rm -rf node_modules package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall
npm install --legacy-peer-deps

# 4. Start dev server
npm run dev
```

---

## 💡 Pro Tips

### 1. Use Console Logs

**Debug your code:**
```typescript
console.log('User data:', userData);
console.table(users);  // Nice table format!
console.error('Error:', error);
```

**View in browser:**
- Press F12
- Go to Console tab

### 2. React DevTools

**Install browser extension:**
- Chrome: React Developer Tools
- Firefox: React Developer Tools

**Features:**
- Inspect component tree
- View props and state
- Debug performance

### 3. Network Tab

**Debug API calls:**
- F12 → Network tab
- See all requests to Supabase
- Check response data

### 4. Git for Version Control

**Track changes:**
```bash
git init
git add .
git commit -m "Local development setup"
```

---

## 📚 Learning Resources

### Vite
- Docs: https://vitejs.dev/
- Fast build tool for modern web

### React
- Docs: https://react.dev/
- Learn React fundamentals

### TypeScript
- Docs: https://www.typescriptlang.org/
- Type safety in JavaScript

### Tailwind CSS
- Docs: https://tailwindcss.com/
- Utility-first CSS framework

---

**Happy coding!** 🎉

**Your platform is now ready for local development in VS Code!**

---

_Last updated: November 7, 2025_
