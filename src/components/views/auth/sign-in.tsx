"use client";

import KratosMessage from "@/components/kratos/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useKratosError } from "@/hooks/kratos";
import { extractMessages, isFlow, kratosFrontendApi } from "@/lib/kratos";
import { LoginFlow } from "@ory/kratos-client";
import { isAxiosError } from "axios";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInView() {
  const [flow, setFlow] = useState<LoginFlow>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleKratosError } = useKratosError();

  const flowId = searchParams.get("flow");

  if (flowId && typeof flowId !== "string") {
    throw new Error('Invalid query parameter "flowId" - string expected');
  }

  // We cannot fetch kratos flow on the server-side, as it needs to set csrf cookies
  useEffect(() => {
    if (flowId) {
      kratosFrontendApi
        .getLoginFlow({ id: flowId })
        .then((res) => setFlow(res.data))
        .catch(handleKratosError);
    } else {
      kratosFrontendApi
        .createBrowserLoginFlow()
        .then((res) => {
          setFlow(res.data);
          const params = new URLSearchParams(searchParams);
          params.set("flow", res.data.id);
          router.replace(`${pathname}?${params.toString()}`);
        })
        .catch(handleKratosError);
    }
  }, [flowId, pathname, router, searchParams]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true);
      event.preventDefault();

      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const csrfToken = flow!.ui.nodes.find(
        (node) =>
          "name" in node.attributes && node.attributes.name === "csrf_token",
      )?.attributes?.value;

      const response = await kratosFrontendApi
        .updateLoginFlow({
          flow: flow!.id,
          updateLoginFlowBody: {
            method: "password",
            csrf_token: csrfToken,
            password: password as string,
            identifier: email as string,
          },
        })
        .catch((err) => {
          if (isAxiosError(err) && isFlow<LoginFlow>(err.response?.data)) {
            setFlow(err.response.data);
          } else {
            handleKratosError(err);
          }
        });

      if (response) {
        router.push("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const messages = extractMessages(flow);
  const emailMessages = messages.nodes["traits.email"];
  const passwordMessages = messages.nodes.password;

  return (
    <form onSubmit={handleSubmit}>
      {/* Sign-in section */}
      <h2 className="text-2xl font-space-grotestk mb-1 font-bold tracking-tight">
        Welcome back
      </h2>
      <h1
        className={clsx(
          "text-sm text-secondary-text ",
          messages.global.length === 0 ? "mb-6" : "mb-3",
        )}
      >
        Log in to your immersion tracker.
      </h1>

      {messages.global.length > 0 && (
        <KratosMessage
          className="mb-3"
          variant="full"
          message={messages.global?.[0]}
        />
      )}

      {/* Email input & label */}
      <div className="mb-4">
        <label
          htmlFor="email-input"
          className="text-[12px] text-muted-text font-semibold block mb-1"
        >
          EMAIL
        </label>
        <Input
          name="email"
          required
          placeholder="you@example.com"
          aria-invalid={emailMessages?.hasError}
          className="mt-1 w-full"
          autoComplete="email"
          id="email-input"
        />
        {emailMessages?.messages?.length > 0 && (
          <KratosMessage
            variant="text"
            message={emailMessages?.messages?.[0]}
          />
        )}
      </div>

      {/* Password input & label */}
      <div className="mb-5">
        <div className="mb-1 flex justify-between text-[12px]">
          <label
            htmlFor="password-input"
            className="text-muted-text font-semibold block"
          >
            PASSWORD
          </label>

          <Link
            className="text-primary-light font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          name="password"
          required
          aria-invalid={passwordMessages?.hasError}
          autoComplete="current-password"
          type="password"
          placeholder="••••••••"
          className="mt-1 w-full"
          id="email-input"
        />
        {passwordMessages?.messages?.length > 0 && (
          <KratosMessage
            variant="text"
            message={passwordMessages?.messages?.[0]}
          />
        )}
      </div>

      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Spinner data-icon="inline-start" />}
        Sign in
      </Button>

      <div className="text-center mt-6 text-[12px]">
        <span className="text-muted-text mr-1">
          Don&apos;t have an account?
        </span>
        <Link href="/auth/sign-up" className="text-primary-light font-semibold">
          Sign up
        </Link>
      </div>
    </form>
  );
}
