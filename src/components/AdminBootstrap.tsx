import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle2, XCircle, Loader2, Shield } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface AdminBootstrapProps {
  accessToken?: string;
  onLogout?: () => void;
}

export function AdminBootstrap({ accessToken, onLogout }: AdminBootstrapProps) {
  const [email, setEmail] = useState("admin@pipnationacademy.com");
  const [password, setPassword] = useState("Admin123!");
  const [firstName, setFirstName] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error" | "info";
    message: string;
    details?: any;
  } | null>(null);

  const createAdmin = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("🔐 Creating admin account...");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0991178c/bootstrap-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            firstName,
            country: "US",
          }),
        }
      );

      const data = await response.json();
      console.log("📥 Bootstrap response:", data);

      if (data.success) {
        setResult({
          type: "success",
          message: `✅ Admin account created successfully!`,
          details: data,
        });
      } else if (data.error?.includes("already")) {
        // User already exists, try upgrading
        setResult({
          type: "info",
          message: "Account exists. Attempting to upgrade to admin...",
        });
        await upgradeToAdmin();
      } else {
        setResult({
          type: "error",
          message: data.error || "Failed to create admin",
          details: data,
        });
      }
    } catch (error) {
      console.error("❌ Bootstrap error:", error);
      setResult({
        type: "error",
        message: `Network error: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const upgradeToAdmin = async () => {
    try {
      console.log("⬆️ Upgrading to admin...");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0991178c/upgrade-to-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            secretKey: "pip-nation-2024-admin-upgrade",
          }),
        }
      );

      const data = await response.json();
      console.log("📥 Upgrade response:", data);

      if (data.success) {
        setResult({
          type: "success",
          message: `✅ Account upgraded to admin successfully!`,
          details: data,
        });
      } else {
        setResult({
          type: "error",
          message: data.error || "Failed to upgrade to admin",
          details: data,
        });
      }
    } catch (error) {
      console.error("❌ Upgrade error:", error);
      setResult({
        type: "error",
        message: `Network error: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("🧪 Testing server connection...");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0991178c/`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      console.log("📥 Server response:", data);

      setResult({
        type: "success",
        message: "✅ Server is online and responding!",
        details: data,
      });
    } catch (error) {
      console.error("❌ Connection error:", error);
      setResult({
        type: "error",
        message: `Cannot connect to server: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="size-16 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Admin Account Setup</CardTitle>
          <CardDescription>
            Create your admin account to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pipnationacademy.com"
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="text-sm mb-2 block">First Name</label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Admin"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={createAdmin}
              disabled={loading || !email || !password || !firstName}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Admin Account"
              )}
            </Button>

            <Button
              onClick={testConnection}
              disabled={loading}
              variant="outline"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Test Server"
              )}
            </Button>
          </div>

          {/* Result */}
          {result && (
            <Alert
              variant={result.type === "error" ? "destructive" : "default"}
              className={
                result.type === "success"
                  ? "border-green-500 bg-green-50 text-green-900"
                  : result.type === "info"
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : ""
              }
            >
              {result.type === "success" && (
                <CheckCircle2 className="size-4" />
              )}
              {result.type === "error" && <XCircle className="size-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">{result.message}</p>
                  {result.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer hover:underline">
                        View details
                      </summary>
                      <pre className="mt-2 p-2 bg-black/10 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Success Instructions */}
          {result?.type === "success" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-blue-900">
                🎉 Next Steps:
              </h3>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Click the "Back to Home" button below</li>
                <li>Click "Login" on the landing page</li>
                <li>
                  Enter your credentials:
                  <div className="ml-6 mt-1 font-mono text-xs bg-blue-100 p-2 rounded">
                    Email: {email}
                    <br />
                    Password: {password}
                  </div>
                </li>
                <li>Click "Sign In"</li>
                <li>✅ Admin Dashboard will load automatically!</li>
              </ol>

              <Button
                onClick={() => window.location.href = "/"}
                className="w-full mt-4"
              >
                Back to Home
              </Button>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm">💡 Tips:</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>
                • <strong>First time?</strong> Click "Create Admin Account"
              </li>
              <li>
                • <strong>Account exists?</strong> It will auto-upgrade to admin
              </li>
              <li>
                • <strong>Server issues?</strong> Click "Test Server" first
              </li>
              <li>
                • <strong>Still stuck?</strong> Check browser console (F12) for
                errors
              </li>
            </ul>
          </div>

          {/* Direct Upgrade Option */}
          <details className="border border-slate-200 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-sm">
              Already have an account? Upgrade to admin
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                If you already have a regular account, enter your email above
                and click this button:
              </p>
              <Button
                onClick={upgradeToAdmin}
                disabled={loading || !email}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Upgrading...
                  </>
                ) : (
                  "Upgrade Existing Account to Admin"
                )}
              </Button>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}