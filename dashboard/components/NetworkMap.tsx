"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Shield, Zap } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "server" | "threat" | "endpoint" | "firewall";
  status: "active" | "warning" | "critical";
  threatLevel: number;
}

interface Connection {
  from: string;
  to: string;
  type: "normal" | "suspicious" | "attack";
  strength: number;
}

export default function NetworkMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "core-1",
      label: "Core Server",
      x: 400,
      y: 300,
      type: "server",
      status: "active",
      threatLevel: 2,
    },
    {
      id: "firewall-1",
      label: "Firewall Primary",
      x: 250,
      y: 200,
      type: "firewall",
      status: "active",
      threatLevel: 1,
    },
    {
      id: "endpoint-1",
      label: "Endpoint Alpha",
      x: 550,
      y: 150,
      type: "endpoint",
      status: "active",
      threatLevel: 3,
    },
    {
      id: "endpoint-2",
      label: "Endpoint Beta",
      x: 300,
      y: 450,
      type: "endpoint",
      status: "warning",
      threatLevel: 5,
    },
    {
      id: "threat-1",
      label: "Anomaly Detected",
      x: 600,
      y: 400,
      type: "threat",
      status: "critical",
      threatLevel: 9,
    },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: "firewall-1", to: "core-1", type: "normal", strength: 1 },
    { from: "core-1", to: "endpoint-1", type: "normal", strength: 0.8 },
    { from: "core-1", to: "endpoint-2", type: "suspicious", strength: 0.6 },
    { from: "endpoint-2", to: "threat-1", type: "attack", strength: 0.9 },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);

  const getNodeColor = (node: Node) => {
    if (node.type === "threat") return "#ff0080";
    if (node.status === "critical") return "#ff4444";
    if (node.status === "warning") return "#ffaa00";
    return "#00ff00";
  };

  const getConnectionColor = (conn: Connection) => {
    if (conn.type === "attack") return "#ff0000";
    if (conn.type === "suspicious") return "#ffaa00";
    return "#00ff00";
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(0, 255, 0, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);

        if (fromNode && toNode) {
          ctx.strokeStyle = getConnectionColor(conn);
          ctx.globalAlpha = conn.strength;
          ctx.lineWidth = 2;
          ctx.setLineDash(
            conn.type === "attack" ? [5, 5] : conn.type === "suspicious" ? [3, 3] : []
          );

          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode === node.id;

        const baseRadius = isSelected ? 20 : isHovered ? 16 : 12;
        const color = getNodeColor(node);

        // Draw glow
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, baseRadius + 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw node
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw border
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = color;
        ctx.font = "10px 'Courier New'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y + baseRadius + 18);

        // Draw threat indicator
        if (node.threatLevel > 5) {
          ctx.fillStyle = "#ff0000";
          ctx.font = "bold 12px 'Courier New'";
          ctx.fillText(`${node.threatLevel}/10`, node.x, node.y - baseRadius - 15);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let foundNode = null;
      for (const node of nodes) {
        const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
        if (distance < 20) {
          foundNode = node.id;
          break;
        }
      }

      setHoveredNode(foundNode || null);
      canvas.style.cursor = foundNode ? "pointer" : "default";
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (const node of nodes) {
        const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
        if (distance < 20) {
          setSelectedNode(node);
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, connections, selectedNode, hoveredNode]);

  return (
    <motion.div
      className="w-full h-full flex flex-col bg-black/50 border border-green-800 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-green-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-green-300">
          <MapPin size={18} />
          <span className="font-bold">NETWORK TOPOLOGY MAP</span>
        </div>
        <div className="text-xs text-green-700">
          Nodes: {nodes.length} | Threats: {nodes.filter((n) => n.status === "critical").length}
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full h-full"
        />
      </div>

      {/* Legend & Selected Node Info */}
      <div className="p-4 border-t border-green-800 grid grid-cols-2 gap-4">
        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <motion.div
            className="card-base col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-sm font-bold text-green-300 mb-2">{selectedNode.label}</div>
            <div className="text-xs text-green-700 space-y-1">
              <div>Type: {selectedNode.type.toUpperCase()}</div>
              <div>Status: {selectedNode.status.toUpperCase()}</div>
              <div>Threat Level: {selectedNode.threatLevel}/10</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
