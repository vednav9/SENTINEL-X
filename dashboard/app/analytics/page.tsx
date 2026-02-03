"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

export default function AnalyticsPage() {
    const threatTrend = [
        { hour: "00:00", threats: 3 },
        { hour: "04:00", threats: 5 },
        { hour: "08:00", threats: 8 },
        { hour: "12:00", threats: 12 },
        { hour: "16:00", threats: 15 },
        { hour: "20:00", threats: 10 },
        { hour: "23:59", threats: 6 },
    ];

    const agentPerformance = [
        { name: "Detection Agent", accuracy: 98.5, color: "bg-red-600" },
        { name: "Intel Agent", accuracy: 95.2, color: "bg-orange-600" },
        { name: "Root Cause Agent", accuracy: 92.8, color: "bg-yellow-600" },
        { name: "Response Agent", accuracy: 99.1, color: "bg-green-600" },
        { name: "Learning Agent", accuracy: 87.6, color: "bg-blue-600" },
    ];

    const threatTypes = [
        { type: "Brute Force", count: 34, percentage: 32 },
        { type: "SQL Injection", count: 28, percentage: 26 },
        { type: "DDoS", count: 22, percentage: 21 },
        { type: "Malware", count: 16, percentage: 15 },
        { type: "Other", count: 6, percentage: 6 },
    ];

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-cyan-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <BarChart3 className="w-8 h-8 text-cyan-500 animate-pulse" />
                        ANALYTICS & REPORTING
                    </h1>
                    <p className="text-cyan-700 text-sm">System Performance & Threat Statistics</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Threat Trend Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 border border-cyan-900 rounded-lg p-6"
                >
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">THREAT DETECTION TREND</h2>
                    <div className="bg-black/30 rounded p-6 border border-cyan-900/30">
                        <div className="flex items-end justify-between h-40 gap-2">
                            {threatTrend.map((data, i) => {
                                const maxValue = Math.max(...threatTrend.map(d => d.threats));
                                const height = (data.threats / maxValue) * 100;
                                return (
                                    <motion.div
                                        key={data.hour}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t hover:from-cyan-600 hover:to-cyan-500 transition-all group relative"
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-cyan-400 transition opacity-0 group-hover:opacity-100">
                                            {data.threats}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                            {threatTrend.map(data => (
                                <span key={data.hour}>{data.hour}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Agent Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/50 border border-green-900 rounded-lg p-6"
                >
                    <h2 className="text-xl font-bold text-green-400 mb-4">AGENT PERFORMANCE METRICS</h2>
                    <div className="space-y-4">
                        {agentPerformance.map((agent, i) => (
                            <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-mono text-sm">{agent.name}</span>
                                    <span className="text-green-400 font-bold">{agent.accuracy}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${agent.accuracy}%` }}
                                        transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                                        className={`h-full ${agent.color} rounded-full`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Threat Types Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Pie Chart Representation */}
                    <div className="bg-black/50 border border-purple-900 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-purple-400 mb-4">THREAT TYPE DISTRIBUTION</h2>
                        <div className="flex items-center justify-center h-64">
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    {threatTypes.reduce((acc, type, i) => {
                                        const prevPercentage = threatTypes.slice(0, i).reduce((sum, t) => sum + t.percentage, 0);
                                        const startAngle = (prevPercentage / 100) * 360;
                                        const endAngle = ((prevPercentage + type.percentage) / 100) * 360;
                                        const colors = ["#dc2626", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

                                        return acc;
                                    }, [])}
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <p className="text-3xl font-bold text-white">106</p>
                                    <p className="text-xs text-gray-400">Total Threats</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Threat List */}
                    <div className="bg-black/50 border border-purple-900 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-purple-400 mb-4">BREAKDOWN</h2>
                        <div className="space-y-3">
                            {threatTypes.map((threat, i) => (
                                <motion.div
                                    key={threat.type}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    className="flex items-center justify-between p-3 bg-black/30 rounded border border-purple-900/30 hover:border-purple-700 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${["bg-red-600", "bg-orange-600", "bg-yellow-600", "bg-green-600", "bg-blue-600"][i]}`} />
                                        <span className="text-white font-mono">{threat.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">{threat.count}</p>
                                        <p className="text-gray-400 text-xs">{threat.percentage}%</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
