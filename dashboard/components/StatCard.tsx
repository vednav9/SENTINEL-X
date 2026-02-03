"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: "red" | "orange" | "blue" | "cyan" | "green" | "purple";
}

const colorMap = {
    red: { border: "border-red-900", bg: "bg-red-900/10", text: "text-red-400", icon: "text-red-500" },
    orange: { border: "border-orange-900", bg: "bg-orange-900/10", text: "text-orange-400", icon: "text-orange-500" },
    blue: { border: "border-blue-900", bg: "bg-blue-900/10", text: "text-blue-400", icon: "text-blue-500" },
    cyan: { border: "border-cyan-900", bg: "bg-cyan-900/10", text: "text-cyan-400", icon: "text-cyan-500" },
    green: { border: "border-green-900", bg: "bg-green-900/10", text: "text-green-400", icon: "text-green-500" },
    purple: { border: "border-purple-900", bg: "bg-purple-900/10", text: "text-purple-400", icon: "text-purple-500" },
};

export default function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
    const colors = colorMap[color];

    return (
        <motion.div
            whileHover={{ y: -2, borderColor: "rgba(0, 255, 0, 0.5)" }}
            className={`${colors.bg} border ${colors.border} rounded-lg p-4 cursor-pointer transition-colors hover:border-opacity-100`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-mono text-green-700 uppercase tracking-wider mb-2">{label}</p>
                    <p className={`text-2xl font-bold font-mono ${colors.text}`}>{value}</p>
                </div>
                <Icon className={`${colors.icon} w-6 h-6 opacity-60`} />
            </div>
        </motion.div>
    );
}
