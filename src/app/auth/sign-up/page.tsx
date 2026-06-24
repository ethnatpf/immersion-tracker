import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUp() {
  return (
    <section>
      <h2 className="text-2xl font-space-grotestk mb-1 font-bold tracking-tight">
        Start immersing
      </h2>
      <h1 className="text-sm text-secondary-text mb-6">
        Create your free account — takes 30 seconds.
      </h1>

      {/* Name input & label*/}
      <div className="mb-4">
        <label
          htmlFor="name-input"
          className="text-[12px] text-muted-text font-semibold block mb-1"
        >
          NAME
        </label>
        <Input
          placeholder="John Doe"
          className="mt-1 w-full"
          autoComplete="name"
          id="name-input"
        />
      </div>

      {/* Email input & label */}
      <div className="mb-4">
        <label
          htmlFor="email-input"
          className="text-[12px] text-muted-text font-semibold block mb-1"
        >
          EMAIL
        </label>
        <Input
          placeholder="you@example.com"
          className="mt-1 w-full"
          autoComplete="email"
          id="email-input"
        />
      </div>

      {/* Password input and label*/}
      <div className="mb-5">
        <label
          htmlFor="password-input"
          className="text-[12px] text-muted-text font-semibold block mb-1"
        >
          PASSWORD
        </label>
        <Input
          placeholder="••••••••"
          className="mt-1 w-full"
          autoComplete="new-password"
          id="password-input"
        />
      </div>

      <Button className="w-full">Create account</Button>

      <div className="text-center mt-6 text-[12px]">
        <span className="text-muted-text mr-1">Already have an account?</span>
        <Link href="/auth/sign-in" className="text-primary-light font-semibold">
          Sign in
        </Link>
      </div>
    </section>
  );
}
