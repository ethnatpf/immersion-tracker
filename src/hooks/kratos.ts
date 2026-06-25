import { GenericError } from "@ory/kratos-client";
import { isAxiosError } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useKratosError() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const refreshFlow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("flow");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleKratosError = (error: unknown) => {
    // TODO: Handle other known kratos errors
    if (isAxiosError(error) && "error" in error.response?.data) {
      const typedError = error.response!.data.error as GenericError;

      switch (typedError.id) {
        case "security_csrf_violation":
        case "self_service_flow_expired":
          refreshFlow();
          return;
        case "session_already_available":
          // User is already signed in, redirect him to the home page (dashboard)
          return router.push("/dashboard");
      }
    }

    // If we cannot handle the error, show a toast
    toast.error(
      "Unexpected authentication error. Please try again later or contact support.",
    );
  };

  return { handleKratosError };
}
