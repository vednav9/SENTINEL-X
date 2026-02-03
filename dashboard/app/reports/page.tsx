"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Calendar } from "lucide-react";

interface Report {
    title: string;
    date: string;
    type: string;
    threats: number;
}

const reports: Report[] = [
    { title: "Daily Security Summary", date: "Feb 3, 2026", type: "Daily", threats: 15 },
    { title: "Weekly Threat Analysis", date: "Jan 28, 2026", type: "Weekly", threats: 92 },
    { title: "Monthly Incident Report", date: "Jan 31, 2026", type: "Monthly", threats: 342 },
    { title: "Quarterly Review", date: "Dec 31, 2025", type: "Quarterly", threats: 1024 },
];

export default function ReportsPage() {
    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-amber-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <BookOpen className="w-8 h-8 text-amber-500 animate-pulse" />
                        SECURITY REPORTS
                    </h1>
                    <p className="text-amber-700 text-sm">Generated Reports & Documentation</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Generate Report Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                    <FileText className="w-5 h-5" />
                    GENERATE NEW REPORT
                </motion.button>

                {/* Reports List */}
                <div className="space-y-4">
                    {reports.map((report, index) => (
                        <motion.div
                            key={report.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/50 border border-amber-900 rounded-lg p-6 hover:border-amber-700 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-500" />
                                            {report.date}
                                        </div>
                                        <span className="px-2 py-1 bg-amber-900/30 border border-amber-700 rounded text-amber-400 text-xs font-bold">
                                            {report.type}
                                        </span>
                                        <span className="text-red-400">{report.threats} Threats Analyzed</span>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-amber-900/30 border border-amber-700 text-amber-400 rounded hover:bg-amber-900/50 transition font-bold text-sm">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
