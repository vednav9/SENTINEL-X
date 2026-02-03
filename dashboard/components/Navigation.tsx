"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    ShieldAlert, 
    BarChart3, 
    Activity, 
    Cpu, 
    Settings, 
    LogOut,
    Menu,
    X,
    AlertTriangle,
    MapPin,
    BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { 
            icon: ShieldAlert, 
            label: "Overview", 
            href: "/", 
            color: "text-red-500" 
        },
        { 
            icon: AlertTriangle, 
            label: "Threats", 
            href: "/threats", 
            color: "text-orange-500" 
        },
        { 
            icon: Activity, 
            label: "Live Events", 
            href: "/events", 
            color: "text-green-500" 
        },
        { 
            icon: MapPin, 
            label: "Attack Map", 
            href: "/attackmap", 
            color: "text-purple-500" 
        },
        { 
            icon: Cpu, 
            label: "Agents", 
            href: "/agents", 
            color: "text-blue-500" 
        },
        { 
            icon: BarChart3, 
            label: "Analytics", 
            href: "/analytics", 
            color: "text-cyan-500" 
        },
        { 
            icon: BookOpen, 
            label: "Reports", 
            href: "/reports", 
            color: "text-amber-500" 
        },
        { 
            icon: Settings, 
            label: "Settings", 
            href: "/settings", 
            color: "text-slate-400" 
        },
    ];

    const isActive = (href: string) => {
        return pathname === href;
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-green-900/50 border border-green-700 p-2 rounded-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isOpen ? 0 : -300 }}
                transition={{ duration: 0.3 }}
                className="w-64 bg-black/80 border-r border-green-900 h-screen overflow-y-auto flex flex-col backdrop-blur-sm fixed md:static z-40"
            >
                {/* Logo Section */}
                <div className="p-6 border-b border-green-900 sticky top-0 bg-black/90">
                    <div className="flex items-center gap-3 mb-2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <ShieldAlert className="w-8 h-8 text-red-500" />
                        </motion.div>
                        <div>
                            <h2 className="text-xl font-bold text-green-500">SENTINEL-X</h2>
                            <p className="text-xs text-green-700">Security Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-3 px-2 py-1 bg-green-900/20 rounded border border-green-900">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>SYSTEM ONLINE</span>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative group";
                        const activeClass = active ? "bg-green-900/30 border-l-4 border-green-500 text-green-400" : "text-green-700 hover:bg-green-900/10 hover:border-l-4 hover:border-green-700/50";

                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={`${baseClass} ${activeClass}`}
                                >
                                    <Icon className={`w-5 h-5 ${item.color}`} />
                                    <span className="font-mono text-sm font-semibold">{item.label}</span>
                                    {active && (
                                        <div className="absolute right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-green-900 space-y-2">
                    <div className="text-xs text-green-700 px-4 py-2 bg-green-900/10 rounded border border-green-900/30">
                        <p className="font-mono mb-1">Status</p>
                        <p>5 Agents Active</p>
                        <p>0 Critical Threats</p>
                    </div>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-900/10 rounded-lg border border-red-900/30 transition-colors text-sm font-mono">
                        <LogOut size={16} />
                        Exit System
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                />
            )}
        </>
    );
}
