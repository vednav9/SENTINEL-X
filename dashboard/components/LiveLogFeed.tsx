"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Log {
    evt_type?: string;
    timestamp?: string;
    message?: string;
    status?: string;
    [key: string]: any;
}

export default function LiveLogFeed() {
    const [logs, setLogs] = useState<Log[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "LogEvent") {
                setLogs(prev => [...prev.slice(-50), data.data]);
            }
        };

        return () => ws.close();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="h-full overflow-y-auto font-mono text-xs scrollbar-hide">
            <AnimatePresence>
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-1 p-1 border-l-2 ${log.status === 'FAILURE' ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'} bg-green-900/10`}
                    >
                        <span className="text-gray-500">[{log.timestamp ? log.timestamp.split('T')[1].split('.')[0] : 'TIME'}]</span>
                        <span className="ml-2 font-bold">{log.event_type || 'SYS'}</span>: {log.message || JSON.stringify(log)}
                    </motion.div>
                ))}
            </AnimatePresence>
            <div ref={bottomRef} />
        </div>
    );
}
