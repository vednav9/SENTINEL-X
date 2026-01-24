"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LiveLogFeed from "@/components/LiveLogFeed";
import ThreatMonitor from "@/components/ThreatMonitor";
import AgentBrain from "@/components/AgentBrain";
import AttackGraph from "@/components/AttackGraph";
import { Copy, Terminal, ShieldAlert, Cpu, Activity } from "lucide-react";

export default function Dashboard() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Check connection status logic can be added here
        setIsConnected(true);
    }, []);

    return (
        <main className="min-h-screen p-6 bg-black text-green-500 overflow-hidden font-mono bg-[url('/grid.png')] bg-repeat opacity-90">
            {/* Header */}
            <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-4">
                <h1 className="text-4xl font-bold flex items-center gap-3 tracking-tighter shadow-green-500 text-glow">
                    <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
                    SENTINEL-X <span className="text-sm border border-green-600 px-2 py-0.5 rounded text-green-300">v2.0</span>
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-ping" : "bg-red-500"}`}></span>
                        <span className="text-sm">{isConnected ? "SYSTEM ONLINE" : "OFFLINE"}</span>
                    </div>
                    <div className="text-xs text-green-700">Protected by Autonomous Agents</div>
                </div>
            </header>

            {/* Grid Layout */}
            <div className="grid grid-cols-12 gap-6 h-[85vh]">

                {/* Left Column: Logs & Intel */}
                <div className="col-span-3 flex flex-col gap-6 h-full">
                    <div className="bg-black/50 border border-green-800 p-4 rounded-lg flex-1 overflow-hidden cyber-neoneffect relative">
                        <div className="flex items-center gap-2 mb-2 text-green-300 border-b border-green-900 pb-2">
                            <Terminal size={16} /> REACTIVE LOGS
                        </div>
                        <LiveLogFeed />
                    </div>
                    <div className="bg-black/50 border border-green-800 p-4 rounded-lg h-1/3 cyber-neoneffect">
                        <div className="flex items-center gap-2 mb-2 text-green-300 border-b border-green-900 pb-2">
                            <Activity size={16} /> SYSTEM METRICS
                        </div>
                        {/* Placeholder for metrics */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="border border-green-900 p-2">CPU: 12%</div>
                            <div className="border border-green-900 p-2">MEM: 4.2GB</div>
                            <div className="border border-green-900 p-2">NET: 1.2 Gbps</div>
                            <div className="border border-green-900 p-2">AGENTS: 5 Active</div>
                        </div>
                    </div>
                </div>

                {/* Center: Graph & Threats */}
                <div className="col-span-6 flex flex-col gap-6 h-full">
                    <div className="bg-black/80 border border-green-700 p-4 rounded-lg flex-1 cyber-neoneffect relative overflow-hidden">
                        <div className="absolute top-2 left-2 px-2 py-1 bg-green-900/50 text-xs">ATTACK VECTOR GRAPH</div>
                        <AttackGraph />
                    </div>

                    {/* Threat Monitor below graph */}
                    <div className="h-1/3">
                        <ThreatMonitor />
                    </div>
                </div>

                {/* Right: Agent Brain */}
                <div className="col-span-3 h-full">
                    <div className="bg-black/50 border border-purple-800 p-4 rounded-lg h-full cyber-neoneffect flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-purple-400 border-b border-purple-900 pb-2">
                            <Cpu size={18} /> AGENT REASONING
                        </div>
                        <AgentBrain />
                    </div>
                </div>

            </div>
        </main>
    );
}
