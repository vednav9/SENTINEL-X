"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, AlertOctagon, MapPin, Clock, Zap } from "lucide-react";

interface Threat {
    id: string;
    severity: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
    source_ip: string;
    timestamp: number;
    status: "active" | "mitigated" | "investigating";
}

export default function ThreatsPage() {
    const [threats, setThreats] = useState<Threat[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "SuspiciousEvent") {
                    const newThreat: Threat = {
                        id: Date.now().toString(),
                        severity: "high",
                        title: "Suspicious Activity Detected",
                        description: data.data.details || "Unknown threat pattern",
                        source_ip: data.data.source_ip,
                        timestamp: Date.now(),
                        status: "investigating"
                    };
                    setThreats(prev => [newThreat, ...prev].slice(0, 50));
                }
            } catch (e) {
                console.error("Error processing threat data:", e);
            }
        };

        return () => ws.close();
    }, []);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical": return "border-red-600 bg-red-900/20";
            case "high": return "border-red-500 bg-red-800/20";
            case "medium": return "border-orange-500 bg-orange-800/20";
            case "low": return "border-yellow-500 bg-yellow-800/20";
            default: return "border-green-500 bg-green-800/20";
        }
    };

    const getSeverityIcon = (severity: string) => {
        return severity === "critical" ? <AlertOctagon className="w-5 h-5 text-red-500" /> : <AlertTriangle className="w-5 h-5 text-orange-500" />;
    };

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-red-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                        THREAT INTELLIGENCE
                    </h1>
                    <p className="text-red-700 text-sm">Active Threats & Detected Anomalies</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-4">
                {threats.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-black/50 border border-green-900 rounded-lg p-12 text-center"
                    >
                        <Zap className="w-16 h-16 mx-auto text-green-700 mb-4 opacity-50" />
                        <p className="text-green-700 text-lg font-mono">NO ACTIVE THREATS DETECTED</p>
                        <p className="text-green-800 text-sm mt-2">System operating at nominal security levels</p>
                    </motion.div>
                ) : (
                    threats.map((threat, index) => (
                        <motion.div
                            key={threat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`border rounded-lg p-6 hover:shadow-lg transition-all ${getSeverityColor(threat.severity)}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="mt-1">
                                        {getSeverityIcon(threat.severity)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-1">{threat.title}</h3>
                                        <p className="text-gray-300 text-sm mb-3">{threat.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-blue-400" />
                                                <span className="text-gray-400">Source IP:</span>
                                                <span className="text-white font-mono">{threat.source_ip}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-cyan-400" />
                                                <span className="text-gray-400">Detected:</span>
                                                <span className="text-white font-mono">{new Date(threat.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded text-xs font-mono ${threat.status === "active" ? "bg-red-900/50 text-red-400" : threat.status === "mitigated" ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-400"}`}>
                                                    {threat.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${threat.severity === "critical" ? "bg-red-900 text-red-300" : threat.severity === "high" ? "bg-red-800 text-red-300" : threat.severity === "medium" ? "bg-orange-800 text-orange-300" : "bg-yellow-800 text-yellow-300"}`}>
                                        {threat.severity}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 justify-end">
                                <button className="px-3 py-1 bg-blue-900/30 border border-blue-700 text-blue-300 rounded text-xs hover:bg-blue-900/50 transition">
                                    Investigate
                                </button>
                                <button className="px-3 py-1 bg-green-900/30 border border-green-700 text-green-300 rounded text-xs hover:bg-green-900/50 transition">
                                    Mitigate
                                </button>
                                <button className="px-3 py-1 bg-gray-900/30 border border-gray-700 text-gray-300 rounded text-xs hover:bg-gray-900/50 transition">
                                    Details
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </main>
    );
}
