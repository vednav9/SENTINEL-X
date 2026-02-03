"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, TrendingUp } from "lucide-react";
import AttackGraph from "@/components/AttackGraph";

export default function AttackMapPage() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const regions = [
        { name: "North America", threats: 12, color: "from-red-600 to-red-400" },
        { name: "Europe", threats: 8, color: "from-orange-600 to-orange-400" },
        { name: "Asia Pacific", threats: 15, color: "from-yellow-600 to-yellow-400" },
        { name: "South America", threats: 3, color: "from-green-600 to-green-400" },
        { name: "Africa", threats: 2, color: "from-blue-600 to-blue-400" },
        { name: "Middle East", threats: 5, color: "from-purple-600 to-purple-400" },
    ];

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-purple-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Globe className="w-8 h-8 text-purple-500 animate-pulse" />
                        ATTACK VECTOR MAP
                    </h1>
                    <p className="text-purple-700 text-sm">Geographic Threat Distribution & Attack Patterns</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Map Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 border border-purple-900 rounded-lg p-6"
                >
                    <h2 className="text-xl font-bold text-purple-400 mb-4">THREAT VISUALIZATION</h2>
                    <div className="h-96 bg-black/30 rounded border border-purple-900/30 overflow-hidden">
                        <AttackGraph />
                    </div>
                </motion.div>

                {/* Regional Stats */}
                <div>
                    <h2 className="text-xl font-bold text-purple-400 mb-4">REGIONAL THREAT ANALYSIS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {regions.map((region, index) => (
                            <motion.div
                                key={region.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedRegion(region.name)}
                                className={`bg-gradient-to-br ${region.color} bg-opacity-5 border border-opacity-30 border-current rounded-lg p-6 cursor-pointer hover:border-opacity-60 transition-all ${selectedRegion === region.name ? "border-opacity-60 shadow-lg" : ""}`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <MapPin className="w-5 h-5" />
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{region.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-white">{region.threats}</span>
                                    <span className="text-gray-400 text-sm">active threats</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <p className="text-xs text-gray-400">Click to view details</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Selected Region Details */}
                {selectedRegion && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/50 border border-purple-900 rounded-lg p-6"
                    >
                        <h2 className="text-xl font-bold text-purple-400 mb-4">{selectedRegion} - THREAT DETAILS</h2>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-black/30 border border-purple-900/30 rounded p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-white font-bold">Threat {i}</p>
                                            <p className="text-gray-400 text-sm">IP: 192.168.{i}.{Math.floor(Math.random() * 256)}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-red-900/50 text-red-400 rounded text-xs font-bold">HIGH</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Detected 5 minutes ago • Connection attempts: {Math.floor(Math.random() * 100) + 50}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
