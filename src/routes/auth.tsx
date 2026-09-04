import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logoAsset from "@/assets/exora-logo.jpg.asset.json";
import { GlassButton } from "@/components/site/GlassButton";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Exora" },
      {
        name: "description",
        content:
          "Create an Exora account or sign in to access the crypto trading terminal.",
      },
      { property: "og:title", content: "Sign in — Exora" },
      {
        property: "og:description",
        content: "Create an Exora account or sign in to start trading.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/trade" });
  }, [loading, session, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/trade`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created. Welcome to Exora.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Signed in.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/trade" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />

      <div className="glass relative w-full max-w-md rounded-[2rem] p-7 sm:p-9">
        <Link to="/" className="inline-block">
          <img
            src={logoAsset.url}
            alt="Exora"
            width={112}
            height={28}
            className="h-7 w-auto mix-blend-screen"
          />
        </Link>

        <h1 className="mt-7 text-3xl font-bold">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signup"
            ? "Pilot accounts start with 10 000 USDT of demo balance."
            : "Sign in to open the trading terminal."}
        </p>

        <button
          type="button"
          onClick={onGoogle}
          className="glass-soft mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-full text-sm font-medium transition-colors hover:border-primary/40"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.2 14.7 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c5.9 0 9.8-4.1 9.8-9.9 0-.7-.1-1.2-.2-1.7H12z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-white/10" />
          or with email
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {mode === "signup" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              className="glass-soft h-12 rounded-2xl px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
            />
          ) : null}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="glass-soft h-12 rounded-2xl px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            className="glass-soft h-12 rounded-2xl px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
          <GlassButton
            type="submit"
            variant="lime"
            size="lg"
            disabled={busy}
            className="mt-2 w-full"
          >
            {busy
              ? "Please wait…"
              : mode === "signup"
                ? "Create account"
                : "Sign in"}
          </GlassButton>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "Already have an account?" : "New to Exora?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signup" ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
