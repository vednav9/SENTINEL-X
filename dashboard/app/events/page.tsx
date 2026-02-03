"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Filter } from "lucide-react";

interface LogEvent {
    id: string;
    type: string;
    message: string;
    timestamp: number;
    level: "info" | "warning" | "error" | "critical";
}

export default function EventsPage() {
    const [events, setEvents] = useState<LogEvent[]>([]);
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                
                let eventType = "info";
                let level: "info" | "warning" | "error" | "critical" = "info";

                if (data.type === "SuspiciousEvent") {
                    eventType = "Threat";
                    level = "critical";
                } else if (data.type === "AgentReasoning") {
                    eventType = "Agent";
                    level = "info";
                } else if (data.type === "LogEvent") {
                    eventType = "Log";
                    level = "warning";
                }

                const newEvent: LogEvent = {
                    id: Date.now().toString(),
                    type: eventType,
                    message: typeof data.data === "string" ? data.data : JSON.stringify(data.data),
                    timestamp: Date.now(),
                    level
                };

                setEvents(prev => [newEvent, ...prev].slice(0, 100));
            } catch (e) {
                console.error("Error processing event:", e);
            }
        };

        return () => ws.close();
    }, []);

    const filteredEvents = filter === "all" ? events : events.filter(e => e.level === filter);

    const getLevelColor = (level: string) => {
        switch (level) {
            case "critical": return "text-red-500 bg-red-900/20 border-red-700";
            case "error": return "text-orange-500 bg-orange-900/20 border-orange-700";
            case "warning": return "text-yellow-500 bg-yellow-900/20 border-yellow-700";
            default: return "text-green-500 bg-green-900/20 border-green-700";
        }
    };

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-green-900 backdrop-blur-sm p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                            <Activity className="w-8 h-8 text-green-500 animate-pulse" />
                            LIVE EVENTS
                        </h1>
                        <p className="text-green-700 text-sm">Real-time Event Stream ({filteredEvents.length} events)</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap">
                    {["all", "critical", "error", "warning", "info"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded border text-xs font-mono uppercase transition-all ${filter === f ? "bg-green-900/50 border-green-500 text-green-400" : "border-green-900 text-green-700 hover:border-green-700"}`}
                        >
                            {f === "all" ? "All Events" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-2">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 text-green-700">
                        <p>No events matching filter</p>
                    </div>
                ) : (
                    filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.01 }}
                            className={`p-4 rounded border ${getLevelColor(event.level)} bg-black/40 hover:bg-black/60 transition-colors`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white">{event.type}</span>
                                        <span className={`text-xs uppercase font-bold tracking-wider`}>{event.level}</span>
                                        <span className="text-xs text-gray-500 ml-auto">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-sm text-white break-words font-mono">{event.message.substring(0, 200)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </main>
    );
}
