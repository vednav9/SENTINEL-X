import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SENTINEL-X DASHBOARD",
    description: "Autonomous AI Security Visualization",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-black text-green-500 selection:bg-green-900 selection:text-white">
                {children}
            </body>
        </html>
    );
}
