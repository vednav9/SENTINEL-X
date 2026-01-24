"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThreatMonitor() {
    const [threats, setThreats] = useState<any[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "SuspiciousEvent") {
                setThreats(prev => [...prev, data.data]);
            }
            if (data.type === "SimulationInfo" && data.data.message.includes("Run")) {
                // Reset on new run maybe?
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div className="h-full flex gap-4 overflow-x-auto pb-2">
            {threats.map((threat, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="min-w-[250px] bg-red-950/30 border border-red-600 p-4 rounded text-red-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-1 opacity-20"><AlertTriangle size={64} /></div>
                    <h3 className="font-bold flex items-center gap-2 mb-2"><AlertOctagon size={16} /> THREAT DETECTED</h3>
                    <div className="text-sm text-red-300">{threat.details || "Suspicious Activity Detected"}</div>
                    <div className="text-xs mt-2 text-red-700 font-mono">{threat.source_ip}</div>
                </motion.div>
            ))}
            {threats.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-green-700/50 text-sm font-mono border border-green-900 border-dashed rounded">
                    NO ACTIVE THREATS
                </div>
            )}
        </div>
    );
}
