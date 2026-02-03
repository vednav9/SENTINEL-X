"use client";

import { motion } from "framer-motion";
import { Cpu, CheckCircle, AlertCircle, Zap } from "lucide-react";

interface Agent {
    name: string;
    status: "active" | "idle" | "error";
    uptime: string;
    tasksProcessed: number;
    description: string;
    color: string;
}

const agents: Agent[] = [
    {
        name: "Detection Agent",
        status: "active",
        uptime: "24h 15m",
        tasksProcessed: 1247,
        description: "Analyzes incoming logs and security events to identify potential threats",
        color: "from-red-500 to-red-700"
    },
    {
        name: "Intelligence Agent",
        status: "active",
        uptime: "24h 15m",
        tasksProcessed: 856,
        description: "Correlates threat data with external intelligence sources",
        color: "from-orange-500 to-orange-700"
    },
    {
        name: "Root Cause Agent",
        status: "active",
        uptime: "24h 15m",
        tasksProcessed: 542,
        description: "Determines the root cause of security incidents",
        color: "from-yellow-500 to-yellow-700"
    },
    {
        name: "Response Agent",
        status: "active",
        uptime: "24h 15m",
        tasksProcessed: 734,
        description: "Executes automated response and mitigation actions",
        color: "from-green-500 to-green-700"
    },
    {
        name: "Learning Agent",
        status: "active",
        uptime: "24h 15m",
        tasksProcessed: 421,
        description: "Improves detection models and response strategies",
        color: "from-blue-500 to-blue-700"
    },
];

export default function AgentsPage() {
    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-blue-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Cpu className="w-8 h-8 text-blue-500 animate-pulse" />
                        AUTONOMOUS AGENTS
                    </h1>
                    <p className="text-blue-700 text-sm">Multi-Agent System Status & Performance</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6">
                {/* Overall Status */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 border border-blue-900 rounded-lg p-6 mb-6"
                >
                    <h2 className="text-xl font-bold text-blue-400 mb-4">SYSTEM OVERVIEW</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
                            <p className="text-xs text-blue-700 uppercase mb-2">Total Agents</p>
                            <p className="text-3xl font-bold text-blue-400">5</p>
                        </div>
                        <div className="bg-green-900/20 border border-green-700 rounded p-4">
                            <p className="text-xs text-green-700 uppercase mb-2">Active</p>
                            <p className="text-3xl font-bold text-green-400">5</p>
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4">
                            <p className="text-xs text-yellow-700 uppercase mb-2">Total Tasks</p>
                            <p className="text-3xl font-bold text-yellow-400">3800+</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700 rounded p-4">
                            <p className="text-xs text-purple-700 uppercase mb-2">System Health</p>
                            <p className="text-3xl font-bold text-purple-400">98%</p>
                        </div>
                    </div>
                </motion.div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={agent.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-br ${agent.color} bg-opacity-5 border border-opacity-30 border-current rounded-lg p-6 hover:border-opacity-60 transition-all`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
                                    <p className="text-gray-400 text-sm">{agent.description}</p>
                                </div>
                                {agent.status === "active" ? (
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                                ) : agent.status === "error" ? (
                                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" />
                                ) : (
                                    <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-4" />
                                )}
                            </div>

                            {/* Stats */}
                            <div className="space-y-3">
                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${agent.status === "active" ? "bg-green-900/50 text-green-400" : agent.status === "error" ? "bg-red-900/50 text-red-400" : "bg-yellow-900/50 text-yellow-400"}`}>
                                        {agent.status}
                                    </span>
                                </div>

                                {/* Uptime */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Uptime</span>
                                    <span className="text-white font-mono text-sm">{agent.uptime}</span>
                                </div>

                                {/* Tasks Processed */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">Tasks Processed</span>
                                        <span className="text-white font-mono text-sm">{agent.tasksProcessed}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((agent.tasksProcessed / 1500) * 100, 100)}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className={`h-full bg-gradient-to-r ${agent.color}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-xs text-white hover:bg-white/20 transition uppercase font-bold">
                                    Monitor
                                </button>
                                <button className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-xs text-white hover:bg-white/20 transition uppercase font-bold">
                                    Logs
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
