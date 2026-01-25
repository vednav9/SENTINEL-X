"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Zap, Users, Shield } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendPercent?: number;
  icon: React.ReactNode;
  color: "green" | "blue" | "red" | "yellow";
}

export default function StatsPanel() {
  const [stats, setStats] = useState<StatItem[]>([
    {
      id: "threats-detected",
      label: "Threats Detected",
      value: 12,
      trend: "up",
      trendPercent: 15,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "red",
    },
    {
      id: "agents-active",
      label: "Active Agents",
      value: 5,
      unit: "of 5",
      trend: "neutral",
      icon: <Users className="w-6 h-6" />,
      color: "blue",
    },
    {
      id: "uptime",
      label: "System Uptime",
      value: "99.9",
      unit: "%",
      trend: "up",
      trendPercent: 2,
      icon: <Activity className="w-6 h-6" />,
      color: "green",
    },
    {
      id: "response-time",
      label: "Avg Response",
      value: "42",
      unit: "ms",
      trend: "down",
      trendPercent: 8,
      icon: <Zap className="w-6 h-6" />,
      color: "green",
    },
  ]);

  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return { bg: "bg-red-900/20", border: "border-red-700", text: "text-red-400" };
      case "blue":
        return { bg: "bg-blue-900/20", border: "border-blue-700", text: "text-blue-400" };
      case "yellow":
        return { bg: "bg-yellow-900/20", border: "border-yellow-700", text: "text-yellow-400" };
      case "green":
      default:
        return { bg: "bg-green-900/20", border: "border-green-700", text: "text-green-400" };
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold text-green-300 uppercase tracking-widest flex items-center gap-2">
        <Shield size={20} />
        System Status
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          const isHovered = hoveredStat === stat.id;

          return (
            <motion.div
              key={stat.id}
              className={`card-base cursor-pointer relative overflow-hidden transition-all ${colors.bg} ${colors.border}`}
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 15px rgba(0, 255, 0, 0.3)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {/* Background glow */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <div className="relative z-10">
                {/* Icon & Label */}
                <div className="flex justify-between items-start mb-3">
                  <div className={colors.text}>{stat.icon}</div>
                  <div className="text-xs text-green-700 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-3">
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                    {stat.unit && (
                      <span className="text-sm text-green-600 ml-1">{stat.unit}</span>
                    )}
                  </div>
                </div>

                {/* Trend */}
                {stat.trend && stat.trendPercent !== undefined && (
                  <div className="flex items-center gap-1">
                    <span
                      className={`${
                        stat.trend === "up"
                          ? "text-red-400"
                          : stat.trend === "down"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {getTrendIcon(stat.trend)}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        stat.trend === "up"
                          ? "text-red-400"
                          : stat.trend === "down"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {stat.trendPercent}%
                    </span>
                  </div>
                )}
              </div>

              {/* Animated border on hover */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 border border-green-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ pointerEvents: "none" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Metrics Section */}
      <motion.div
        className="card-base mt-6 border-green-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-sm font-bold text-green-300 mb-4 uppercase tracking-widest">
          Detailed Metrics
        </h4>

        <div className="space-y-2">
          {[
            { label: "Packets Processed", value: "2.4M", change: "+5.2%" },
            { label: "Blocked Attacks", value: "847", change: "+12.3%" },
            { label: "Network Load", value: "45%", change: "-3.1%" },
            { label: "AI Confidence", value: "94.2%", change: "+2.0%" },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              className="flex justify-between items-center p-2 bg-black/30 rounded border border-green-900 hover:border-green-700 transition-colors"
              whileHover={{ paddingLeft: 12 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.05 }}
            >
              <span className="text-xs text-green-700">{metric.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">{metric.value}</span>
                <span className="text-xs text-green-500 font-bold">{metric.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Import the icon we used
import { AlertTriangle } from "lucide-react";
