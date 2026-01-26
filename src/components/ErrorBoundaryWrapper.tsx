"use client";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
import ErrorDisplay from "./error/ErrorDisplay";

function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <ErrorBoundary
      fallback={
        <ErrorDisplay
          reset={() => {
            router.refresh();
          }}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;
