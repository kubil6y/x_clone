import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import { MainLayout } from "@/components/main-layout";
import { getAuthSession } from "@/lib/nextauth";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "X Clone",
    description:
        "Hi everyon i am Elon Ma. Money hah? Ohh! Not bad hah, not bad ah. Hey my birda!",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAuthSession();

    return (
        <html lang="en">
            <body className={font.className}>
                <Providers>
                    <MainLayout>{children}</MainLayout>
                    {!session?.user && <h1 className="absolute bottom-0 right-0 bg-rose-500 text-white">not logged in</h1>}
                </Providers>
            </body>
        </html>
    );
}
