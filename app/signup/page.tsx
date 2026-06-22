"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import Crest from "@/components/Crest";

export default function SignUpPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleSubmitting(true);
    try {
      const { error: oAuthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });
      if (oAuthError) {
        setError(oAuthError.message);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      if (profile?.role === "admin") {
        router.push("/admin");
      } else if (profile) {
        router.push("/");
      }
    }
  }, [user, profile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        // Check if session is active (if email verification is disabled)
        if (data.session) {
          router.push("/");
          router.refresh();
        } else {
          // Email verification is required
          setSuccess(true);
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-maroon" />
          <p className="text-sm font-medium text-ink/60">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream px-4 py-12">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #800000 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-gold-100 blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-maroon-50 blur-3xl opacity-60"
      />

      <div className="absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/65 hover:text-maroon transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Crest
              size={64}
              className="transition-transform duration-300 hover:scale-105"
              ringClassName="bg-maroon text-gold"
              fallbackTextClassName="text-xl"
            />
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-maroon">
            Create Account
          </h1>
          <p className="mt-1.5 text-sm text-ink/60">
            Join the ACOBA 2020 Group community
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-maroon-100 bg-white p-8 shadow-elegant-lg sm:p-10">
          {success ? (
            <div className="text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle size={24} />
              </div>
              <h2 className="mt-4 font-serif text-xl font-bold text-ink">
                Check your email
              </h2>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                We have sent a verification link to <strong className="text-ink font-semibold">{email}</strong>. Please check your inbox and spam folders to verify your account.
              </p>
              <div className="mt-8">
                <Link
                  href="/signin"
                  className="btn-primary inline-flex w-full justify-center py-3.5"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-100">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold">Registration Error</p>
                    <p className="text-red-700/90 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
                  >
                    Full Name
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink/40">
                      <UserIcon size={16} />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Ananda Alumnus"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-ink/10 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder-ink/40 transition-all outline-none focus:border-maroon focus:bg-white focus:ring-1 focus:ring-maroon"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink/40">
                      <Mail size={16} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-ink/10 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder-ink/40 transition-all outline-none focus:border-maroon focus:bg-white focus:ring-1 focus:ring-maroon"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink/40">
                      <Lock size={16} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="•••••••• (Min 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-ink/10 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder-ink/40 transition-all outline-none focus:border-maroon focus:bg-white focus:ring-1 focus:ring-maroon"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink/40">
                      <Lock size={16} />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-ink/10 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder-ink/40 transition-all outline-none focus:border-maroon focus:bg-white focus:ring-1 focus:ring-maroon"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-ink/10"></div>
                </div>
                <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
                  <span className="bg-white px-3 text-ink/40">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleSubmitting || submitting}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-ink/10 bg-white py-3 text-sm font-semibold text-ink transition-all hover:bg-cream/40 focus:outline-none focus:ring-2 focus:ring-maroon disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {googleSubmitting ? (
                  <Loader2 size={16} className="animate-spin text-maroon" />
                ) : (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                Google
              </button>

              <div className="mt-6 text-center text-sm text-ink/60">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-maroon hover:text-maroon-700 transition-colors underline"
                >
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
