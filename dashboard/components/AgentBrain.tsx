"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Thought {
    agent: string;
    message: string;
    timestamp: number;
}

export default function AgentBrain() {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "AgentReasoning") {
                setThoughts(prev => [...prev, { ...data.data, timestamp: Date.now() }]);
            }
        };
        return () => ws.close();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [thoughts]);

    return (
        <div className="flex-1 overflow-y-auto font-mono text-sm space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-900">
            {thoughts.map((t, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-purple-900/10 border-l-4 border-purple-500 rounded-r"
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-purple-400 text-xs uppercase tracking-wider">{t.agent}</span>
                        <span className="text-[10px] text-purple-700">{new Date(t.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-purple-200 leading-relaxed typewriter">
                        {t.message}
                    </p>
                </motion.div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}
