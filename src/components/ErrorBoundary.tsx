import { Button } from "@base-ui/react/button";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type ErrorBoundryProps = PropsWithChildren;

export default function ErrorBoundry({ children }: ErrorBoundryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="flex flex-col gap-4">
              <p className="text-sm">Something went wrong</p>
              <code>{JSON.stringify(error)}</code>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
