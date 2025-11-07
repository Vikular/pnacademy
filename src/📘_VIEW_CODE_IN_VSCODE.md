# 📘 How to View Pip Nation Academy Code in VS Code

**Purpose**: View and learn from your code locally in VS Code  
**Note**: Changes made locally won't affect your live site (which is hosted on Figma Make)  
**Your Live Site**: www.pipnationacademy.com (already working!)  

---

## 🎯 What You're Doing

You want to:
- ✅ Download your code to your computer
- ✅ Open it in VS Code to read and learn
- ✅ Understand how the platform works
- ❌ NOT deploy it yourself (Figma Make already handles this)

---

## 📋 Prerequisites

Before starting, make sure you have:

### 1. VS Code Installed
- Download from: https://code.visualstudio.com/
- Install on your computer
- Open it to verify it works

### 2. Node.js Installed (Optional, but recommended)
- Download from: https://nodejs.org/
- Choose LTS version (recommended)
- Install with default settings
- Verify: Open terminal/command prompt, type `node --version`

---

## 🚀 STEP-BY-STEP GUIDE

### STEP 1: Create a Folder for Your Project

**Windows**:
1. Open File Explorer
2. Go to your Documents folder
3. Right-click → New → Folder
4. Name it: `PipNationAcademy`

**Mac**:
1. Open Finder
2. Go to your Documents folder
3. Right-click → New Folder
4. Name it: `PipNationAcademy`

**Path will be**:
- Windows: `C:\Users\YourName\Documents\PipNationAcademy`
- Mac: `/Users/YourName/Documents/PipNationAcademy`

---

### STEP 2: Download Code from Figma Make

**Option A: Export from Figma Make** (If available)

1. **Go to your Figma Make project**
2. **Look for "Export" or "Download" button**
3. **Click it** to download a ZIP file
4. **Extract the ZIP** to your `PipNationAcademy` folder

**Option B: Manual Download** (If no export option)

Since I can see your file structure, I'll help you recreate it:

1. **Open VS Code**
2. **File → Open Folder**
3. **Select** your `PipNationAcademy` folder
4. **Skip to Step 3** (I'll provide the code files)

---

### STEP 3: Open Folder in VS Code

1. **Open VS Code**
2. **File → Open Folder** (or Ctrl+K, Ctrl+O)
3. **Navigate to** `PipNationAcademy` folder
4. **Click "Select Folder"**
5. ✅ VS Code now shows your project!

---

### STEP 4: Explore Your Code

Your file structure in VS Code should look like:

```
PipNationAcademy/
├── App.tsx                    ← Main application file
├── components/                ← All React components
│   ├── AdminDashboard.tsx
│   ├── LandingPage.tsx
│   ├── StudentDashboard.tsx
│   └── ui/                    ← UI components
├── utils/                     ← Utility functions
│   └── supabase/
│       ├── client.tsx         ← Supabase connection
│       └── info.tsx           ← Supabase credentials
├── supabase/                  ← Backend server code
│   └── functions/server/
│       └── index.tsx          ← API routes
├── styles/
│   └── globals.css            ← Global styles
└── README.md
```

---

### STEP 5: Key Files to Study

**For Learning React**:
1. **`App.tsx`** - Main app entry point
2. **`components/LandingPage.tsx`** - Homepage
3. **`components/StudentDashboard.tsx`** - Student interface
4. **`components/AdminDashboard.tsx`** - Admin interface

**For Learning Authentication**:
1. **`components/AuthModal.tsx`** - Login/signup forms
2. **`utils/supabase/client.tsx`** - Database connection
3. **`supabase/functions/server/index.tsx`** - Backend API

**For Learning UI Design**:
1. **`components/ui/`** - Reusable UI components
2. **`styles/globals.css`** - Styling and themes

---

### STEP 6: Install VS Code Extensions (Recommended)

Make coding easier with these extensions:

1. **ES7+ React/Redux/React-Native snippets**
   - Search in Extensions: "ES7 React"
   - Click "Install"

2. **Tailwind CSS IntelliSense**
   - Search: "Tailwind CSS IntelliSense"
   - Click "Install"

3. **Prettier - Code formatter**
   - Search: "Prettier"
   - Click "Install"

4. **ESLint**
   - Search: "ESLint"
   - Click "Install"

**How to Install Extensions**:
- Click Extensions icon (or Ctrl+Shift+X)
- Search for extension name
- Click "Install"

---

### STEP 7: Navigate the Code

**Use VS Code Features**:

**1. File Explorer** (Left sidebar):
- Click folders to expand
- Click files to open

**2. Search Across Files** (Ctrl+Shift+F):
- Search for "AdminDashboard"
- See where it's used

**3. Go to Definition** (F12):
- Click on a function name
- Press F12 to jump to its definition

**4. Find All References** (Shift+F12):
- Click on a component name
- See everywhere it's imported

**5. Command Palette** (Ctrl+Shift+P):
- Type "format document"
- Prettify your code

---

### STEP 8: Read and Understand Key Concepts

#### **1. React Components**

Example from `components/LandingPage.tsx`:
```tsx
export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Pip Nation Academy</h1>
    </div>
  );
}
```

**Learn**:
- Components are reusable UI pieces
- Use JSX (HTML-like syntax in JavaScript)
- Export/import to use in other files

#### **2. State Management**

Example:
```tsx
const [user, setUser] = useState(null);
```

**Learn**:
- `useState` creates reactive variables
- `user` is the current value
- `setUser` updates the value

#### **3. Supabase Integration**

Example from `utils/supabase/client.tsx`:
```tsx
export const supabase = createClient(url, key);
```

**Learn**:
- Creates connection to database
- Used for auth, data storage
- Imported across the app

#### **4. Tailwind CSS**

Example:
```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded">
  Click Me
</button>
```

**Learn**:
- Utility-first CSS framework
- Classes like `bg-blue-600` style elements
- Responsive with `md:`, `lg:` prefixes

---

## 🔍 Understanding Your Platform Architecture

### Frontend (React + Tailwind)
```
App.tsx
  ├─→ LandingPage (Homepage)
  ├─→ AuthModal (Login/Signup)
  ├─→ StudentDashboard
  │     ├─→ CourseEnrollment
  │     ├─→ PaymentModal
  │     └─→ LessonViewer
  └─→ AdminDashboard
        ├─→ PendingPaymentsTab
        ├─→ AdminCourseUpload
        └─→ AdminStudentsData
```

### Backend (Supabase)
```
supabase/functions/server/index.tsx
  ├─→ /make-server-0991178c/signup
  ├─→ /make-server-0991178c/enroll
  ├─→ /make-server-0991178c/payments
  └─→ /make-server-0991178c/approve-payment
```

### Database (Key-Value Store)
```
kv_store.tsx
  ├─→ users:{email}
  ├─→ enrollments:{userId}:{courseId}
  ├─→ payments:{paymentId}
  └─→ courses:{courseId}
```

---

## 📚 Learning Path

### Week 1: Basics
- [ ] Read `App.tsx` - understand entry point
- [ ] Study `LandingPage.tsx` - see React components
- [ ] Review `globals.css` - learn Tailwind

### Week 2: Features
- [ ] Analyze `AuthModal.tsx` - authentication flow
- [ ] Study `CourseEnrollment.tsx` - enrollment logic
- [ ] Review `PaymentModal.tsx` - payment system

### Week 3: Backend
- [ ] Read `supabase/functions/server/index.tsx` - API routes
- [ ] Study `utils/supabase/client.tsx` - database connection
- [ ] Understand `kv_store.tsx` - data storage

### Week 4: Advanced
- [ ] Analyze `AdminDashboard.tsx` - admin features
- [ ] Study state management patterns
- [ ] Understand component composition

---

## 💡 Tips for Learning

### 1. Start Small
- Don't try to understand everything at once
- Pick one component, study it thoroughly
- Move to related components

### 2. Use Comments
- Add comments to code as you learn
- Explain what each part does
- Create your own notes

### 3. Experiment
- Make small changes locally
- See what breaks (it's okay, it won't affect live site!)
- Learn by doing

### 4. Use Console Logs
- Add `console.log()` to see values
- Understand data flow
- Debug issues

### 5. Read Documentation
- React: https://react.dev/
- Tailwind: https://tailwindcss.com/
- Supabase: https://supabase.com/docs

---

## ⚠️ IMPORTANT NOTES

### Your Live Site is Separate

**Changes in VS Code**:
- ❌ Do NOT affect your live site
- ❌ Won't be deployed automatically
- ✅ Are just for learning

**Your Live Site** (www.pipnationacademy.com):
- ✅ Hosted on Figma Make
- ✅ Updates through Figma Make only
- ✅ Already working perfectly

### If You Want to Make Changes

**To update your live site**:
1. Make changes in **Figma Make** (not VS Code)
2. Figma Make automatically deploys
3. Changes appear on pipnationacademy.com

**VS Code is just for reading/learning!**

---

## 🎯 What to Look For

### Code Quality
- Clean component structure
- Proper separation of concerns
- Reusable components

### React Patterns
- Hooks (useState, useEffect)
- Component composition
- Props passing

### Tailwind Usage
- Responsive design
- Custom styling
- Theme consistency

### Supabase Integration
- Authentication flow
- Database operations
- Error handling

---

## 📖 Recommended Resources

### Learn React
- Official Tutorial: https://react.dev/learn
- FreeCodeCamp: https://www.freecodecamp.org/learn/front-end-development-libraries/
- React Course: https://scrimba.com/learn/learnreact

### Learn Tailwind
- Official Docs: https://tailwindcss.com/docs
- Tailwind Labs YouTube: https://www.youtube.com/c/TailwindLabs

### Learn TypeScript
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- TypeScript for React: https://react-typescript-cheatsheet.netlify.app/

### Learn Supabase
- Official Docs: https://supabase.com/docs
- Supabase YouTube: https://www.youtube.com/c/Supabase

---

## 🚫 What NOT to Do

### Don't Try to Run Locally (Unless You're Advanced)

Running this locally requires:
- Installing all dependencies (npm install)
- Configuring environment variables
- Setting up Supabase locally
- Complex build process

**Not worth it just for learning!**

**Better approach**:
- Read code in VS Code
- Learn patterns and concepts
- Test changes in Figma Make
- Keep live site on Figma Make

---

## ✅ Quick Setup Checklist

Setup complete when you have:

- [ ] VS Code installed
- [ ] `PipNationAcademy` folder created
- [ ] Folder opened in VS Code
- [ ] File explorer shows all files
- [ ] Extensions installed (React, Tailwind)
- [ ] Can navigate and read code
- [ ] Understand it's for learning only

---

## 🎓 Your Learning Environment is Ready!

You can now:
- ✅ Browse all code files
- ✅ Study React components
- ✅ Learn Tailwind styling
- ✅ Understand backend logic
- ✅ Take notes and experiment
- ✅ Learn at your own pace

**Your live site continues working perfectly at www.pipnationacademy.com!**

---

## 📞 Next Steps

1. **Now**: Open VS Code and explore `App.tsx`
2. **Today**: Read through `LandingPage.tsx`
3. **This Week**: Study all components
4. **Next Week**: Understand backend
5. **Ongoing**: Learn and grow!

---

**Happy Learning!** 📚💻🚀

**Remember**: Your live site at pipnationacademy.com is separate and already working perfectly!

---

**Last Updated**: October 27, 2025  
**Purpose**: Learning and exploration  
**Live Site**: www.pipnationacademy.com (hosted on Figma Make)
