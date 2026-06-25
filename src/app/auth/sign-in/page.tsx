import SignInView from "@/components/views/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function SignIn() {
  return <SignInView />;
}
