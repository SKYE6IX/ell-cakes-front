"use client";
import ErrorDisplay from "@/components/error/ErrorDisplay";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorDisplay reset={reset} />;
}
