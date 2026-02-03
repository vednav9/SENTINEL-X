"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LiveLogFeed from "@/components/LiveLogFeed";
import ThreatMonitor from "@/components/ThreatMonitor";
import AgentBrain from "@/components/AgentBrain";
import AttackGraph from "@/components/AttackGraph";
import StatCard from "@/components/StatCard";
import { Copy, Terminal, ShieldAlert, Cpu, Activity, AlertTriangle, Zap, Clock } from "lucide-react";

export default function Dashboard() {
    const [isConnected, setIsConnected] = useState(false);
    const [stats, setStats] = useState({
        threatsDetected: 0,
        eventsProcessed: 0,
        agentsActive: 5,
        systemUptime: "24h 15m"
    });

    useEffect(() => {
        setIsConnected(true);
        // WebSocket for real-time updates can be added here
        const ws = new WebSocket("ws://localhost:8000/events");
        
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "SuspiciousEvent") {
                    setStats(prev => ({
                        ...prev,
                        threatsDetected: prev.threatsDetected + 1
                    }));
                }
            } catch (e) {
                // Handle parse errors
            }
        };

        return () => ws.close();
    }, []);

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-green-900 backdrop-blur-sm">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
                                SECURITY OPERATIONS CENTER
                            </h1>
                            <p className="text-green-700 text-sm">Real-time Threat Detection & Response</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end mb-2">
                                <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                                <span className="text-sm font-mono">{isConnected ? "● ONLINE" : "● OFFLINE"}</span>
                            </div>
                            <div className="text-xs text-green-700">{new Date().toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard 
                            icon={AlertTriangle}
                            label="THREATS DETECTED"
                            value={stats.threatsDetected}
                            color="red"
                        />
                        <StatCard 
                            icon={Activity}
                            label="EVENTS PROCESSED"
                            value={stats.eventsProcessed}
                            color="orange"
                        />
                        <StatCard 
                            icon={Cpu}
                            label="AGENTS ACTIVE"
                            value={stats.agentsActive}
                            color="blue"
                        />
                        <StatCard 
                            icon={Clock}
                            label="SYSTEM UPTIME"
                            value={stats.systemUptime}
                            color="cyan"
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Top Row: Attack Graph & Threat Monitor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Attack Graph - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-black/50 border border-green-900 rounded-lg p-6 hover:border-green-700 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <h2 className="text-lg font-bold text-green-400">ATTACK VECTOR GRAPH</h2>
                            <span className="text-xs bg-green-900/30 px-2 py-1 rounded ml-auto border border-green-900">REAL-TIME</span>
                        </div>
                        <div className="h-96 bg-black/30 rounded border border-green-900/30 overflow-hidden">
                            <AttackGraph />
                        </div>
                    </div>

                    {/* Agent Reasoning */}
                    <div className="bg-black/50 border border-purple-900 rounded-lg p-6 hover:border-purple-700 transition-colors flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                            <h2 className="text-lg font-bold text-purple-400">AGENT REASONING</h2>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <AgentBrain />
                        </div>
                    </div>
                </motion.div>

                {/* Middle Row: Threat Monitor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/50 border border-red-900 rounded-lg p-6 hover:border-red-700 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h2 className="text-lg font-bold text-red-400">THREAT MONITOR</h2>
                        <span className="text-xs bg-red-900/30 px-2 py-1 rounded ml-auto border border-red-900">CRITICAL ALERTS</span>
                    </div>
                    <div className="h-48 bg-black/30 rounded border border-red-900/30 overflow-auto">
                        <ThreatMonitor />
                    </div>
                </motion.div>

                {/* Bottom Row: Logs & System Info */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Live Logs */}
                    <div className="lg:col-span-2 bg-black/50 border border-green-900 rounded-lg p-6 hover:border-green-700 transition-colors flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <h2 className="text-lg font-bold text-green-400">LIVE LOG FEED</h2>
                            <span className="text-xs bg-green-900/30 px-2 py-1 rounded ml-auto border border-green-900">STREAMING</span>
                        </div>
                        <div className="flex-1 overflow-hidden bg-black/30 rounded border border-green-900/30 p-4">
                            <LiveLogFeed />
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-black/50 border border-cyan-900 rounded-lg p-6 hover:border-cyan-700 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                            <h2 className="text-lg font-bold text-cyan-400">SYSTEM STATUS</h2>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="bg-black/30 p-3 rounded border border-cyan-900/30">
                                <p className="text-cyan-700 text-xs mb-1">CPU USAGE</p>
                                <div className="flex items-center justify-between">
                                    <div className="w-full h-2 bg-cyan-900/20 rounded-full overflow-hidden mr-2">
                                        <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 w-1/3 rounded-full" />
                                    </div>
                                    <span className="text-cyan-400 font-mono">12%</span>
                                </div>
                            </div>

                            <div className="bg-black/30 p-3 rounded border border-cyan-900/30">
                                <p className="text-cyan-700 text-xs mb-1">MEMORY USAGE</p>
                                <div className="flex items-center justify-between">
                                    <div className="w-full h-2 bg-cyan-900/20 rounded-full overflow-hidden mr-2">
                                        <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 w-1/2 rounded-full" />
                                    </div>
                                    <span className="text-cyan-400 font-mono">4.2GB</span>
                                </div>
                            </div>

                            <div className="bg-black/30 p-3 rounded border border-cyan-900/30">
                                <p className="text-cyan-700 text-xs mb-1">NETWORK THROUGHPUT</p>
                                <div className="flex items-center justify-between">
                                    <div className="w-full h-2 bg-cyan-900/20 rounded-full overflow-hidden mr-2">
                                        <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 w-2/3 rounded-full" />
                                    </div>
                                    <span className="text-cyan-400 font-mono">1.2 Gbps</span>
                                </div>
                            </div>

                            <div className="bg-black/30 p-3 rounded border border-green-900/30">
                                <p className="text-green-700 text-xs mb-1">AGENTS RUNNING</p>
                                <div className="flex gap-2 flex-wrap">
                                    {["Detection", "Intel", "Response", "Learning", "RootCause"].map((agent, i) => (
                                        <span key={i} className="text-xs bg-green-900/30 px-2 py-1 rounded border border-green-700">
                                            {agent}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
