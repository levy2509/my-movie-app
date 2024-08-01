"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
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
            Please Refresh the page or try again later. If the problem persists,
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
