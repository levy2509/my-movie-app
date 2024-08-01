"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="text-white font-bold">
          <h1>Oops! Something went wrong.</h1>
          <p>
            Please try again later or contact support if the problem persists.
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
