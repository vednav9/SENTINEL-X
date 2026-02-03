"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  Network,
} from "lucide-react";

/**
 * DashboardHeader Component
 * Professional header with real-time system status indicators
 * 
 * Features:
 * - Live clock/time display
 * - System status monitoring
 * - Active threat counter
 * - Network status
 * - Protection mode indicator
 */

interface HeaderProps {
  title?: string;
  version?: string;
  isOnline?: boolean;
}

export default function DashboardHeader({
  title = "SENTINEL-X",
  version = "2.0",
  isOnline = true,
}: HeaderProps) {
  const [time, setTime] = useState<string>("");
  const [threatCount, setThreatCount] = useState(3);
  const [networkStatus, setNetworkStatus] = useState("CONNECTED");

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      className="w-full bg-gradient-to-r from-black via-black to-black border-b border-green-800 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between h-16">
        {/* Left: Title Section */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 255, 0, 0.3)",
                  "0 0 20px rgba(0, 255, 0, 0.6)",
                  "0 0 10px rgba(0, 255, 0, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 bg-red-900/20 border border-red-600 rounded-lg"
            >
              <Shield className="w-6 h-6 text-red-500" />
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold text-green-400 tracking-tighter">
                {title}
              </h1>
              <p className="text-xs text-green-700 uppercase tracking-widest">
                Autonomous Security Platform
              </p>
            </div>
          </div>

          <motion.div
            className="ml-4 px-3 py-1 bg-green-900/30 border border-green-600 rounded text-sm font-bold text-green-300"
            whileHover={{ scale: 1.05 }}
          >
            v{version}
          </motion.div>
        </motion.div>

        {/* Middle: Status Indicators */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Time */}
          <motion.div className="flex items-center gap-2 text-xs">
            <Clock size={14} className="text-blue-400" />
            <span className="font-mono font-bold text-green-400 w-16 text-right">
              {time}
            </span>
          </motion.div>

          {/* Network Status */}
          <motion.div
            className="flex items-center gap-2 text-xs px-2 py-1 rounded bg-blue-900/20 border border-blue-700"
            animate={{ borderColor: ["rgba(0, 100, 200, 0.5)", "rgba(0, 150, 255, 1)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Network size={14} className="text-blue-400" />
            <span className="text-blue-300 font-bold uppercase">{networkStatus}</span>
          </motion.div>

          {/* Threats */}
          <motion.div
            className="flex items-center gap-2 text-xs px-2 py-1 rounded bg-orange-900/20 border border-orange-600"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle size={14} className="text-orange-400" />
            <span className="text-orange-300 font-bold">{threatCount} ACTIVE</span>
          </motion.div>

          {/* System Status */}
          <motion.div
            className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
              isOnline
                ? "bg-green-900/20 border border-green-600"
                : "bg-red-900/20 border border-red-600"
            }`}
            animate={
              isOnline
                ? {
                    boxShadow: [
                      "0 0 0px rgba(0, 255, 0, 0)",
                      "0 0 8px rgba(0, 255, 0, 0.5)",
                      "0 0 0px rgba(0, 255, 0, 0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
              animate={isOnline ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className={`font-bold uppercase ${
                isOnline ? "text-green-300" : "text-red-300"
              }`}
            >
              {isOnline ? "ONLINE" : "OFFLINE"}
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          className="text-right text-xs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-end gap-2 mb-1">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-yellow-600">Protected by Autonomous Agents</span>
          </div>
          <div className="text-green-700">
            All systems operational
          </div>
        </motion.div>
      </div>

      {/* Bottom Info Bar */}
      <motion.div
        className="mt-4 pt-4 border-t border-green-900/30 flex justify-between items-center text-xs text-green-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex gap-6">
          <div className="flex items-center gap-1">
            <Activity size={12} />
            <span>System Health: NORMAL</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={12} />
            <span>Shield: ACTIVE</span>
          </div>
        </div>
        <div className="text-green-600">
          Last scan: 2 minutes ago
        </div>
      </motion.div>
    </motion.header>
  );
}
