"use client";
import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import { Copy } from "lucide-react";

export default function AttackGraph() {
    const [graphDefinition, setGraphDefinition] = useState<string>(`
    graph LR
        A[INTERNET] -->|Traffic| B(Firewall)
        B -->|Allowed| C{Load Balancer}
        C -->|HTTP| D[Web Server]
        style A fill:#000,stroke:#333,color:#fff
        style B fill:#000,stroke:#0f0,color:#0f0
        style C fill:#000,stroke:#0f0,color:#0f0
        style D fill:#000,stroke:#0f0,color:#0f0
    `);

    const [nodes, setNodes] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                primaryColor: '#000',
                primaryTextColor: '#0f0',
                primaryBorderColor: '#0f0',
                lineColor: '#0f0',
                secondaryColor: '#111',
                tertiaryColor: '#111'
            }
        });
    }, []);

    useEffect(() => {
        const renderGraph = async () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
                try {
                    const { svg } = await mermaid.render('mermaid-svg', graphDefinition);
                    containerRef.current.innerHTML = svg;
                } catch (e) {
                    console.error("Mermaid render error", e);
                }
            }
        };
        renderGraph();
    }, [graphDefinition]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/events");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "LogEvent") {
                // Dynamic graph update logic could go here
                // For now, let's just highlight nodes based on logs
                if (data.data.src_ip === "192.168.1.105") { // Attacker
                    setGraphDefinition(prev => {
                        if (prev.includes("Attacker")) return prev;
                        return `
                         graph LR
                            Attacker[Attacker IP] -->|Brute Force| B(Firewall)
                            B -->|Allowed| C{Load Balancer}
                            C -->|HTTP| D[Web Server]
                            D -.->|Lateral| E[(Database)]
                            style Attacker fill:#300,stroke:#f00,color:#f00
                            style B fill:#000,stroke:#f00,color:#f00
                            style C fill:#000,stroke:#f00,color:#f00
                            style D fill:#300,stroke:#f00,color:#f00
                            style E fill:#300,stroke:#f00,color:#f00
                            linkStyle 0 stroke:red,stroke-width:2px,fill:none
                         `;
                    });
                }
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center bg-black/50 p-4" ref={containerRef}>
            {/* Mermaid Graph Rendered Here */}
            Loading Graph...
        </div>
    );
}
