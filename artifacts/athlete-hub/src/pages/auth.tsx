import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Brand, Button, AuthFrame } from '@/components/athlete-ui';
import { supabase } from "../lib/supabase";

export function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocation("/dashboard");
  };
  return (
    <AuthFrame
      eyebrow="Welcome back"
      title={
        <>
          Back to
          <br />
          <span>work.</span>
        </>
      }
      copy="Your next chapter is waiting. Pick up where you left off."
    >
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field
          label="Email"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          id="input-email"
          required
        />
        <Field
          label="Password"
          icon={LockKeyhole}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Your password"
          id="input-password"
          required
          end={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-testid="button-toggle-password"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
        <Button
          type="submit"
          className="mt-3 w-full py-3.5"
          data-testid="button-log-in"
        >
          Log In <ArrowRight size={17} />
        </Button>
        <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
          New to Athlete Hub?{" "}
          <Link
            href="/signup"
            className="font-bold text-[hsl(var(--primary))]"
            data-testid="link-continue-signup"
          >
            Continue to Sign Up
          </Link>
        </p>
      </form>
    </AuthFrame>
  );
}
export function Signup() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    username: "",
    position: "PG",
    grade: "9th",
    heightFt: "5",
    heightIn: "10",
    team: "",
    school: "",
    jerseyNumber: "",
    weight: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (
        !formData.email ||
        !formData.password ||
        !formData.displayName ||
        !formData.username
      ) {
        throw new Error(
          "Email, password, display name, and username are required",
        );
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
        throw new Error(
          "Username can only contain letters, numbers, underscores, and hyphens",
        );
      }

      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      // Step 2: Create player profile in profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          username: formData.username,
          display_name: formData.displayName,
          position: formData.position,
          grade: formData.grade,
          height_ft: parseInt(formData.heightFt),
          height_in: parseInt(formData.heightIn),
          team: formData.team || null,
          school: formData.school || null,
          jersey_number: formData.jerseyNumber
            ? parseInt(formData.jerseyNumber)
            : null,
          weight_lbs: formData.weight ? parseInt(formData.weight) : null,
          bio: formData.bio || null,
          photo_url: null,
        },
      ]);

      if (profileError) throw profileError;

      setSuccess(true);
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An error occurred during sign up";
      setError(message);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthFrame
        eyebrow="Success!"
        title={
          <>
            Welcome to
            <br />
            <span>Athlete Hub.</span>
          </>
        }
        copy="Your account is being set up. Redirecting..."
      >
        <div className="text-center mt-8">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Account created successfully! 🎉
          </p>
        </div>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame
      eyebrow="Build your identity"
      title={
        <>
          Make your
          <br />
          <span>mark.</span>
        </>
      }
      copy="Start with the player you are. Grow into the one you are becoming."
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4 mt-4">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <Field
          label="Display name"
          icon={UserRound}
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          placeholder="Jordan Lincoln"
          id="input-display-name"
          required
        />
        <Field
          label="Username"
          icon={UserRound}
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="jlincoln"
          id="input-username"
          required
        />
        <Field
          label="Email"
          icon={Mail}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@email.com"
          id="input-signup-email"
          required
        />
        <Field
          label="Password"
          icon={LockKeyhole}
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          id="input-signup-password"
          minLength={8}
          required
          end={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
        <Field
          label="Confirm Password"
          icon={LockKeyhole}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          id="input-confirm-password"
          minLength={8}
          required
        />

        {/* Position */}
        <label className="block text-left">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
            Position
          </span>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-3 text-sm"
          >
            <option>PG</option>
            <option>SG</option>
            <option>SF</option>
            <option>PF</option>
            <option>C</option>
          </select>
        </label>

        {/* Grade */}
        <label className="block text-left">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
            Grade
          </span>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-3 text-sm"
          >
            <option>9th</option>
            <option>10th</option>
            <option>11th</option>
            <option>12th</option>
            <option>AAU</option>
            <option>Rec</option>
          </select>
        </label>

        {/* Height */}
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-left">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
              Height (ft)
            </span>
            <input
              type="number"
              min="4"
              max="7"
              name="heightFt"
              value={formData.heightFt}
              onChange={handleChange}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-3 text-sm"
              required
            />
          </label>
          <label className="block text-left">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
              Height (in)
            </span>
            <input
              type="number"
              min="0"
              max="11"
              name="heightIn"
              value={formData.heightIn}
              onChange={handleChange}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-3 text-sm"
              required
            />
          </label>
        </div>

        {/* Team */}
        <Field
          label="Team"
          icon={UserRound}
          name="team"
          value={formData.team}
          onChange={handleChange}
          placeholder="Northside Wolves"
          id="input-team"
        />

        {/* School */}
        <Field
          label="School"
          icon={UserRound}
          name="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="Lincoln High School"
          id="input-school"
        />

        {/* Jersey Number */}
        <Field
          label="Jersey Number"
          icon={UserRound}
          type="number"
          min="0"
          max="99"
          name="jerseyNumber"
          value={formData.jerseyNumber}
          onChange={handleChange}
          placeholder="23"
          id="input-jersey"
        />

        {/* Weight */}
        <Field
          label="Weight (lbs)"
          icon={UserRound}
          type="number"
          min="80"
          max="350"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="185"
          id="input-weight"
        />

        {/* Bio */}
        <label className="block text-left">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
            Bio
          </span>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about your game..."
            rows={2}
            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-3 text-sm resize-none"
          />
        </label>

        <Button type="submit" disabled={loading} className="mt-3 w-full py-3.5">
          {loading ? "Creating Account..." : "Create Player"}{" "}
          <ArrowRight size={17} />
        </Button>
        <p className="text-center text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
          By creating a player, you agree to keep showing up for the work.
        </p>
      </form>
    </AuthFrame>
  );
}
