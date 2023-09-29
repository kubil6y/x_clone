"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "./modal-prodiver";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster />
                    <ModalProvider />
                    {children}
                </ThemeProvider>
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
