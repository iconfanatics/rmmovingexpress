"use client"; // Ensures it's a Client Component

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 5,
      retryDelay: 3000,
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
