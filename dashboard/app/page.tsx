"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LiveLogFeed from "@/components/LiveLogFeed";
import ThreatMonitor from "@/components/ThreatMonitor";
import AgentBrain from "@/components/AgentBrain";
import AttackGraph from "@/components/AttackGraph";
import NetworkMap from "@/components/NetworkMap";
import ControlPanel from "@/components/ControlPanel";
import StatsPanel from "@/components/StatsPanel";
import DashboardLayout, { Card, DashboardGrid, Section } from "@/components/DashboardLayout";
import { Copy, Terminal, ShieldAlert, Cpu, Activity, Zap } from "lucide-react";

export default function Dashboard() {
    const [isConnected, setIsConnected] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

    useEffect(() => {
        // Check connection status logic can be added here
        setIsConnected(true);
    }, []);

    const handleControlPanelClick = (buttonId: string) => {
        console.log(`Button pressed: ${buttonId}`);
    };

    // Header Component
    const DashboardHeader = (
        <div className="flex justify-between items-center px-6 py-4">
            <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
                <h1 className="text-4xl font-bold tracking-tighter text-glow text-green-400">
                    SENTINEL-X
                </h1>
                <span className="text-sm border border-green-600 px-3 py-1 rounded text-green-300 font-bold">
                    v2.0
                </span>
            </motion.div>

            <div className="flex items-center gap-6">
                <motion.div 
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className="text-sm font-bold">{isConnected ? "SYSTEM ONLINE" : "OFFLINE"}</span>
                </motion.div>
                <div className="text-xs text-green-700 border-l border-green-800 pl-6">
                    Protected by Autonomous Agents
                </div>
            </div>
        </div>
    );

    // Sidebar Component
    const DashboardSidebar = (
        <div className="p-6 space-y-6 h-full overflow-y-auto">
            <ControlPanel onButtonClick={handleControlPanelClick} />
        </div>
    );

    return (
        <DashboardLayout
            header={DashboardHeader}
            sidebar={DashboardSidebar}
        >
            {/* Main Content Grid */}
            <div className="space-y-8 pb-8">
                {/* Primary Section: Network Map & Threat Monitor */}
                <Section title="NETWORK TOPOLOGY & THREATS">
                    <DashboardGrid cols={2} gap={6}>
                        {/* Network Map */}
                        <motion.div 
                            className="h-[500px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <NetworkMap />
                        </motion.div>

                        {/* Threat Monitor & Live Logs */}
                        <div className="flex flex-col gap-4 h-[500px]">
                            <motion.div 
                                className="flex-1 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card title="THREAT MONITOR" icon={<ShieldAlert size={18} />}>
                                    <ThreatMonitor />
                                </Card>
                            </motion.div>
                            
                            <motion.div 
                                className="flex-1 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card title="LIVE LOGS" icon={<Terminal size={18} />}>
                                    <LiveLogFeed />
                                </Card>
                            </motion.div>
                        </div>
                    </DashboardGrid>
                </Section>

                {/* Secondary Section: Attack Graph & Agent Brain */}
                <Section title="ANALYSIS & INTELLIGENCE">
                    <DashboardGrid cols={2} gap={6}>
                        {/* Attack Graph */}
                        <motion.div 
                            className="h-80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card title="ATTACK VECTOR GRAPH" icon={<Zap size={18} />}>
                                <AttackGraph />
                            </Card>
                        </motion.div>

                        {/* Agent Brain */}
                        <motion.div 
                            className="h-80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card title="AGENT REASONING" icon={<Cpu size={18} />}>
                                <AgentBrain />
                            </Card>
                        </motion.div>
                    </DashboardGrid>
                </Section>

                {/* Tertiary Section: System Metrics */}
                <Section title="SYSTEM METRICS">
                    <DashboardGrid cols={4} gap={4}>
                        {[
                            { label: "CPU Usage", value: "12%", status: "normal" },
                            { label: "Memory", value: "4.2GB", status: "normal" },
                            { label: "Network", value: "1.2Gbps", status: "normal" },
                            { label: "Agents Active", value: "5", status: "active" },
                        ].map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedMetric(metric.label)}
                            >
                                <Card className={`text-center p-4 cursor-pointer transition-all ${
                                    selectedMetric === metric.label ? "ring-2 ring-green-500" : ""
                                }`}>
                                    <div className="text-2xl font-bold text-green-400 mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="text-xs text-green-700 uppercase tracking-widest">
                                        {metric.label}
                                    </div>
                                    <div className={`text-xs mt-2 px-2 py-1 rounded inline-block ${
                                        metric.status === "active" 
                                            ? "bg-blue-900 text-blue-300" 
                                            : "bg-green-900 text-green-300"
                                    }`}>
                                        {metric.status.toUpperCase()}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </DashboardGrid>
                </Section>

                {/* Stats Panel Section */}
                <Section title="LIVE STATISTICS">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <StatsPanel />
                    </motion.div>
                </Section>
            </div>
        </DashboardLayout>
    );
}
