import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { StudentDashboard } from "./components/StudentDashboard";
import { LessonViewer } from "./components/LessonViewer";
import { FTMOSubmissionModal } from "./components/FTMOSubmissionModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { EnhancedAdminDashboard } from "./components/EnhancedAdminDashboard";
import { CourseEnrollment } from "./components/CourseEnrollment";
import { BeginnersDashboard } from "./components/BeginnersDashboard";
import { StrategyDashboard } from "./components/StrategyDashboard";
import { CommunityPage } from "./components/CommunityPage";
import { DebugPanel } from "./components/DebugPanel";
import { ServerDiagnostics } from "./components/ServerDiagnostics";
import { AuthTester } from "./components/AuthTester";
import { AdminBootstrap } from "./components/AdminBootstrap";
import { Button } from "./components/ui/button";
import {
  projectId,
} from "./utils/supabase/info";
import { supabase } from "./utils/supabase/client";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type View =
  | "landing"
  | "dashboard"
  | "admin"
  | "courses"
  | "beginners"
  | "strategy"
  | "community"
  | "admin-setup";

interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  country: string;
  role: string;
  badge: string;
  progress: {
    foundation: { completed: number; total: number };
    advanced: { completed: number; total: number };
    beginners: { completed: number; total: number };
    strategy: { completed: number; total: number };
  };
  completedLessons: string[];
  quizScores: Record<string, any>;
  advancedUnlocked?: boolean;
  enrolledCourses: string[];
  coursesCompleted: string[];
  paymentHistory: any[];
}

export default function App() {
  const [currentView, setCurrentView] =
    useState<View>("landing");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<
    "login" | "signup" | "lead"
  >("lead");
  const [accessToken, setAccessToken] = useState<string>("");
  const [userProfile, setUserProfile] =
    useState<UserProfile | null>(null);
  const [selectedLesson, setSelectedLesson] =
    useState<any>(null);
  const [lessonViewerOpen, setLessonViewerOpen] =
    useState(false);
  const [ftmoModalOpen, setFtmoModalOpen] = useState(false);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-0991178c`;

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setAccessToken(storedToken);
      fetchUserProfile(storedUserId, storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async (
    userId: string,
    token: string,
  ) => {
    try {
      console.log(`🔄 Fetching user profile for userId: ${userId}`);
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        console.error("❌ Failed to fetch user:", error);
        handleLogout();
        return;
      }

      const meta = user.user_metadata || {};
      let serverProfile: any = null;

      try {
        const profileResponse = await fetch(`${apiUrl}/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.ok) {
          serverProfile = await profileResponse.json();
        }
      } catch (profileError) {
        console.warn("⚠️ Could not load server profile, falling back to auth metadata", profileError);
      }

      const profile: UserProfile = {
        userId: user.id,
        email: user.email || "",
        firstName: serverProfile?.firstName || meta.firstName || user.email?.split("@")[0] || "User",
        country: serverProfile?.country || meta.country || "",
        role: serverProfile?.role || meta.role || "student",
        badge: serverProfile?.badge || meta.badge || "Beginner",
        progress: serverProfile?.progress || meta.progress || {
          foundation: { completed: 0, total: 10 },
          advanced: { completed: 0, total: 10 },
          beginners: { completed: 0, total: 10 },
          strategy: { completed: 0, total: 10 },
        },
        completedLessons: serverProfile?.completedLessons || meta.completedLessons || [],
        quizScores: serverProfile?.quizScores || meta.quizScores || {},
        advancedUnlocked: serverProfile?.advancedUnlocked || meta.advancedUnlocked || false,
        enrolledCourses: serverProfile?.enrolledCourses || meta.enrolledCourses || [],
        coursesCompleted: serverProfile?.coursesCompleted || meta.coursesCompleted || [],
        paymentHistory: serverProfile?.paymentHistory || meta.paymentHistory || [],
      };

      console.log(`✅ Profile built successfully:`, {
        userId: profile.userId,
        email: profile.email,
        role: profile.role,
      });

      setUserProfile(profile);

      if (profile.role === "admin") {
        setCurrentView("admin");
      } else {
        setCurrentView("dashboard");
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      toast.error("Failed to load user profile");
    }
  };

  const handleAuth = async (
    email: string,
    password: string,
    signupData?: any,
  ) => {
    try {
      // Determine if this is signup or login
      const isSignup =
        authModalMode === "signup" || authModalMode === "lead";

      if (isSignup) {
        console.log("🔐 Starting signup via Supabase Auth...");

        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password,
            options: {
              data: {
                firstName: signupData?.fullName || email.split("@")[0],
                country: signupData?.country || "",
                role: "student",
                badge: "Beginner",
                tradingExperience: signupData?.tradingExperience || "",
                tradingGoals: signupData?.tradingGoals || "",
                currentKnowledge: signupData?.currentKnowledge || "",
                phoneNumber: signupData?.phoneNumber || "",
                whatsappNumber: signupData?.whatsappNumber || "",
                tradingPreferences: signupData?.tradingPreferences || [],
                enrolledCourses: [],
                coursesCompleted: [],
                completedLessons: [],
                quizScores: {},
                advancedUnlocked: false,
                paymentHistory: [],
              },
            },
          });

        if (signUpError) {
          console.error("❌ Signup failed:", signUpError);
          if (
            signUpError.message?.includes("already registered") ||
            signUpError.message?.includes("already exists") ||
            signUpError.code === "user_already_exists"
          ) {
            toast.error(
              "This email is already registered. Please log in instead.",
              {
                duration: 5000,
                action: {
                  label: "Login",
                  onClick: () => {
                    setAuthModalMode("login");
                    setAuthModalOpen(true);
                  },
                },
              },
            );
          } else {
            toast.error(signUpError.message || "Signup failed");
          }
          return;
        }

        console.log("✅ Signup successful:", signUpData.user?.id);

        // If email confirmation is required, Supabase will not return a session yet
        if (!signUpData.session) {
          toast.success(
            "Account created! Please check your email to confirm your account, then log in.",
            { duration: 8000 }
          );
          setAuthModalMode("login");
          setAuthModalOpen(false);
          return;
        }

        toast.success("Account created successfully!");

        console.log("✅ Auto sign-in successful (email confirmation disabled)");

        setAccessToken(signUpData.session.access_token);
        localStorage.setItem("accessToken", signUpData.session.access_token);
        localStorage.setItem("userId", signUpData.user!.id);
        await fetchUserProfile(
          signUpData.user!.id,
          signUpData.session.access_token,
        );
        setAuthModalOpen(false);
        toast.success("Welcome to Pip Nation Academy!");
      } else {
        // Sign in using Supabase client
        console.log(
          "🔐 Starting sign in with Supabase Auth...",
        );
        console.log("🔐 Login attempt with email:", email);

        // Check if this is the hardcoded admin attempting to login
        const isAdminCredentials = 
          email.trim().toLowerCase() === 'admin@pipnationacademy.com' && 
          password === 'Admin123!';

        console.log("🔍 Before login - isAdminCredentials:", isAdminCredentials);

        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(), // Normalize email
            password,
          });

        if (error) {
          console.error("❌ Sign in error:", error);
          console.error(
            "❌ Error details:",
            JSON.stringify(error, null, 2),
          );
          
          console.log("🔍 Debug - Checking admin credentials:");
          console.log("  Email entered:", email);
          console.log("  Email normalized:", email.trim().toLowerCase());
          console.log("  Password entered:", password);
          console.log("  Email match:", email.trim().toLowerCase() === 'admin@pipnationacademy.com');
          console.log("  Password match:", password === 'Admin123!');
          console.log("  Error code:", error.code);
          console.log("  Error message:", error.message);
          
          // If admin credentials and account doesn't exist, auto-create with Supabase Auth
          if (isAdminCredentials && (error.message?.includes("Invalid login credentials") || error.code === "invalid_credentials")) {
            console.log("🔐 Admin credentials detected, auto-creating admin account...");
            toast.info("Setting up your admin account...", { duration: 3000 });

            try {
              const { data: adminSignUpData, error: adminSignUpError } =
                await supabase.auth.signUp({
                  email: "admin@pipnationacademy.com",
                  password: "Admin123!",
                  options: {
                    data: {
                      firstName: "Admin",
                      country: "US",
                      role: "admin",
                      badge: "Administrator",
                      enrolledCourses: ["beginners", "strategy"],
                      coursesCompleted: [],
                      completedLessons: [],
                      quizScores: {},
                      advancedUnlocked: true,
                      paymentHistory: [],
                    },
                  },
                });

              if (adminSignUpError && adminSignUpError.code !== "user_already_exists") {
                console.error("❌ Admin sign up failed:", adminSignUpError);
                toast.error(adminSignUpError.message || "Failed to create admin account.");
                return;
              }

              if (!adminSignUpData.session) {
                toast.error("Admin account created. Confirm the admin email, then log in.");
                return;
              }

              console.log("✅ Admin account created and signed in:", adminSignUpData.user?.id);

              setAccessToken(adminSignUpData.session.access_token);
              localStorage.setItem("accessToken", adminSignUpData.session.access_token);
              localStorage.setItem("userId", adminSignUpData.user!.id);
              await fetchUserProfile(adminSignUpData.user!.id, adminSignUpData.session.access_token);
              setAuthModalOpen(false);
              toast.success("Welcome, Admin!");
              return;
            } catch (adminCreateError) {
              console.error("❌ Admin creation error:", adminCreateError);
              toast.error("Error creating admin account. Please try again.");
              return;
            }
          }
          
          // Provide helpful error messages based on error type
          if (error.message?.includes("Invalid login credentials") || error.code === "invalid_credentials") {
            toast.error(
              "Invalid email or password. Haven't signed up yet? Click 'Get Started' to create an account!",
              { duration: 6000 }
            );
          } else if (error.message?.includes("Email not confirmed")) {
            toast.error(
              "Please confirm your email address before signing in.",
            );
          } else if (error.message?.includes("Too many requests")) {
            toast.error(
              "Too many login attempts. Please wait a few minutes and try again.",
            );
          } else {
            toast.error(
              error.message || "Sign in failed. Please check your credentials and try again.",
            );
          }
          return;
        }

        if (!data.session?.access_token || !data.user?.id) {
          toast.error("Sign in failed - no session created");
          return;
        }

        console.log("✅ Sign in successful:", data.user.id);

        setAccessToken(data.session.access_token);
        localStorage.setItem(
          "accessToken",
          data.session.access_token,
        );
        localStorage.setItem("userId", data.user.id);
        await fetchUserProfile(
          data.user.id,
          data.session.access_token,
        );
        setAuthModalOpen(false);
        toast.success("Welcome back!");
      }
    } catch (error) {
      console.error("❌ Auth error:", error);
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
      );
    }
  };

  const handleLogout = () => {
    setAccessToken("");
    setUserProfile(null);
    setCurrentView("landing");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
  };

  const handleGetStarted = () => {
    setAuthModalMode("lead");
    setAuthModalOpen(true);
  };

  const handleLogin = () => {
    setAuthModalMode("login");
    setAuthModalOpen(true);
  };

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setLessonViewerOpen(true);
  };

  const handleLessonComplete = async (quizScore?: number) => {
    if (!userProfile) return;

    try {
      const lessonData = {
        userId: userProfile.userId,
        courseLevel: selectedLesson.level,
        lessonId: selectedLesson.id,
      };

      const response = await fetch(
        `${apiUrl}/progress/lesson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(lessonData),
        },
      );

      if (response.ok) {
        toast.success("Lesson completed!");

        // If it's a quiz, submit the score
        if (selectedLesson.isQuiz && quizScore !== undefined) {
          const quizResponse = await fetch(
            `${apiUrl}/quiz/submit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                userId: userProfile.userId,
                quizId: selectedLesson.id,
                score: quizScore,
                courseLevel: selectedLesson.level,
              }),
            },
          );

          const quizData = await quizResponse.json();

          if (quizResponse.ok) {
            if (quizData.advancedUnlocked) {
              toast.success("🎉 Advanced Course Unlocked!");
            }
          }
        }

        // Refresh user profile
        await fetchUserProfile(userProfile.userId, accessToken);
        setLessonViewerOpen(false);
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      toast.error("Failed to save progress");
    }
  };

  const handleSubmitFTMO = () => {
    setFtmoModalOpen(true);
  };

  const handleFTMOSubmission = async (
    proofUrl: string,
    notes: string,
  ) => {
    if (!userProfile) return;

    try {
      const response = await fetch(`${apiUrl}/ftmo/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: userProfile.userId,
          proofUrl,
          notes,
        }),
      });

      if (response.ok) {
        toast.success("FTMO proof submitted for verification!");
      } else {
        toast.error("Failed to submit FTMO proof");
      }
    } catch (error) {
      console.error("Error submitting FTMO proof:", error);
      toast.error("Submission failed");
    }
  };

  const handleCourseEnroll = async (courseId: string) => {
    if (!userProfile) {
      console.error("❌ No user profile - cannot enroll");
      toast.error("Please log in to access courses");
      return;
    }

    console.log(
      `🔄 handleCourseEnroll called for course: ${courseId}`,
    );
    console.log(`📊 Current state BEFORE refresh:`, {
      enrolledCourses: userProfile.enrolledCourses,
      role: userProfile.role,
      userId: userProfile.userId,
    });

    // Refresh user profile to get updated enrollment status
    console.log("🔄 Refreshing user profile...");
    await fetchUserProfile(userProfile.userId, accessToken);

    console.log(
      `✅ Profile refreshed, navigating to: ${courseId}`,
    );
    // Navigate to course dashboard
    setCurrentView(courseId as View);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  // Show diagnostics if there's a '?diagnostics' query parameter
  const showDiagnostics =
    typeof window !== "undefined" &&
    window.location.search.includes("diagnostics");
  const showAuthTester =
    typeof window !== "undefined" &&
    window.location.search.includes("test-auth");
  const showAdminSetup =
    typeof window !== "undefined" &&
    window.location.search.includes("admin-setup");

  if (showDiagnostics) {
    return (
      <div className="min-h-screen bg-background p-8">
        <ServerDiagnostics />
        <div className="text-center mt-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-sm text-primary hover:underline"
          >
            ← Back to app
          </button>
        </div>
      </div>
    );
  }

  if (showAuthTester) {
    return <AuthTester />;
  }

  if (showAdminSetup) {
    return <AdminBootstrap accessToken={accessToken} onLogout={handleLogout} />;
  }

  return (
    <>
      {currentView === "landing" && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      )}

      {currentView === "dashboard" && userProfile && (
        <StudentDashboard
          user={userProfile}
          onLogout={handleLogout}
          onLessonClick={handleLessonClick}
          onSubmitFTMO={handleSubmitFTMO}
          accessToken={accessToken}
          onViewChange={handleViewChange}
        />
      )}

      {currentView === "courses" && userProfile && (
        <CourseEnrollment
          enrolledCourses={userProfile.enrolledCourses}
          onEnroll={handleCourseEnroll}
          onBack={() => handleViewChange("dashboard")}
          userName={userProfile.firstName}
          userRole={userProfile.role}
          onLogout={handleLogout}
          userId={userProfile.userId}
          accessToken={accessToken}
        />
      )}

      {currentView === "beginners" &&
        userProfile &&
        (() => {
          const isEnrolled =
            userProfile.enrolledCourses.includes("beginners");
          const hasAccess =
            isEnrolled && userProfile.role !== "lead";

          console.log("🔍 Beginners view render:", {
            currentView,
            isEnrolled,
            role: userProfile.role,
            hasAccess,
            enrolledCourses: userProfile.enrolledCourses,
            progress: userProfile.progress?.beginners,
          });

          if (hasAccess) {
            return (
              <BeginnersDashboard
                userProgress={userProfile.progress.beginners}
                completedLessons={userProfile.completedLessons}
                onLessonSelect={handleLessonClick}
                onBack={() => handleViewChange("dashboard")}
                userName={userProfile.firstName}
                userRole={userProfile.role}
                onLogout={handleLogout}
              />
            );
          } else {
            return (
              <CourseEnrollment
                enrolledCourses={userProfile.enrolledCourses}
                onEnroll={handleCourseEnroll}
                onBack={() => handleViewChange("dashboard")}
                userName={userProfile.firstName}
                userRole={userProfile.role}
                onLogout={handleLogout}
                userId={userProfile.userId}
                accessToken={accessToken}
              />
            );
          }
        })()}

      {currentView === "strategy" &&
        userProfile &&
        (() => {
          const isEnrolled =
            userProfile.enrolledCourses.includes("strategy");
          const hasAccess =
            isEnrolled && userProfile.role !== "lead";

          console.log("🔍 Strategy view render:", {
            currentView,
            isEnrolled,
            role: userProfile.role,
            hasAccess,
            enrolledCourses: userProfile.enrolledCourses,
            progress: userProfile.progress?.strategy,
          });

          if (hasAccess) {
            return (
              <StrategyDashboard
                userProgress={userProfile.progress.strategy}
                completedLessons={userProfile.completedLessons}
                onLessonSelect={handleLessonClick}
                onBack={() => handleViewChange("dashboard")}
                userName={userProfile.firstName}
                userRole={userProfile.role}
                onLogout={handleLogout}
              />
            );
          } else {
            return (
              <CourseEnrollment
                enrolledCourses={userProfile.enrolledCourses}
                onEnroll={handleCourseEnroll}
                onBack={() => handleViewChange("dashboard")}
                userName={userProfile.firstName}
                userRole={userProfile.role}
                onLogout={handleLogout}
                userId={userProfile.userId}
                accessToken={accessToken}
              />
            );
          }
        })()}

      {currentView === "community" && userProfile && (
        <CommunityPage
          userRole={userProfile.role}
          enrolledCourses={userProfile.enrolledCourses}
          coursesCompleted={userProfile.coursesCompleted}
          onBack={() => handleViewChange("dashboard")}
          userName={userProfile.firstName}
          onLogout={handleLogout}
        />
      )}

      {currentView === "admin" && (
        <EnhancedAdminDashboard
          accessToken={accessToken}
          onLogout={handleLogout}
        />
      )}

      {currentView === "admin-setup" && (
        <AdminBootstrap
          accessToken={accessToken}
          onLogout={handleLogout}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authModalMode}
        onAuth={handleAuth}
      />

      <LessonViewer
        lesson={selectedLesson}
        isOpen={lessonViewerOpen}
        onClose={() => setLessonViewerOpen(false)}
        onComplete={handleLessonComplete}
      />

      <FTMOSubmissionModal
        isOpen={ftmoModalOpen}
        onClose={() => setFtmoModalOpen(false)}
        onSubmit={handleFTMOSubmission}
      />

      {/* Fallback for invalid states */}
      {currentView !== "landing" &&
        currentView !== "dashboard" &&
        currentView !== "courses" &&
        currentView !== "beginners" &&
        currentView !== "strategy" &&
        currentView !== "community" &&
        currentView !== "admin" &&
        currentView !== "admin-setup" && (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-2xl mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">
                Invalid view: {currentView}
              </p>
              <Button
                onClick={() => setCurrentView("dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

      <Toaster position="top-right" />
      <DebugPanel />
    </>
  );
}