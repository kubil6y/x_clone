import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import { MainLayout } from "@/components/main-layout";
import { getAuthSession } from "@/lib/nextauth";
import { BottomAuthNavbar } from "@/components/bottom-auth-navbar";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "X Clone",
    description:
        "Hi everyon i am Elon Ma. Money hah? Ohh! Not bad hah, not bad ah. Hey my birda!",
};

// NOTE: hover: bg-zinc-200 / bg-accent

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAuthSession();

    return (
        <html
            lang="en"
            className={font.className}
            suppressHydrationWarning
        >
            <body>
                <Providers>
                    <MainLayout>{children}</MainLayout>
                    {!session?.user && <BottomAuthNavbar />}
                </Providers>
            </body>
        </html>
    );
}
