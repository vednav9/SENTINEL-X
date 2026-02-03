import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
            <body className="antialiased bg-black text-green-500 selection:bg-green-900 selection:text-white overflow-hidden">
                <div className="flex h-screen">
                    <Navigation />
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
