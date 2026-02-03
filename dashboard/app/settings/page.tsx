"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Users, Database, Globe } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        autoResponse: true,
        dataRetention: 90,
        theme: "dark",
        language: "english"
    });

    const handleToggle = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const settingsSections = [
        {
            title: "Notifications",
            icon: Bell,
            items: [
                { label: "Enable Notifications", key: "notifications" },
                { label: "Email Alerts", key: "emailAlerts" },
                { label: "Auto Response", key: "autoResponse" }
            ]
        },
        {
            title: "Security",
            icon: Shield,
            items: [
                { label: "Two-Factor Authentication", key: "twoFactor" },
                { label: "IP Whitelisting", key: "ipWhitelist" },
                { label: "Session Timeout", key: "sessionTimeout" }
            ]
        },
        {
            title: "Data Management",
            icon: Database,
            items: [
                { label: "Data Retention (days)", key: "dataRetention", type: "number" },
                { label: "Auto Backup", key: "autoBackup" },
                { label: "Export Logs", key: "exportLogs" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-black text-green-500 overflow-auto font-mono">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-black/95 border-b border-slate-900 backdrop-blur-sm p-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Settings className="w-8 h-8 text-slate-400 animate-pulse" />
                        SYSTEM SETTINGS
                    </h1>
                    <p className="text-slate-700 text-sm">Configure SENTINEL-X Behavior & Preferences</p>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6 max-w-4xl">
                {/* Settings Sections */}
                {settingsSections.map((section, sectionIndex) => {
                    const Icon = section.icon;
                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="bg-black/50 border border-slate-900 rounded-lg p-6 hover:border-slate-700 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Icon className="w-6 h-6 text-slate-400" />
                                <h2 className="text-xl font-bold text-slate-400">{section.title}</h2>
                            </div>

                            <div className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item.key}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                                        className="flex items-center justify-between p-4 bg-black/30 rounded border border-slate-900/30 hover:border-slate-800 transition"
                                    >
                                        <label className="text-white font-mono text-sm cursor-pointer flex-1">
                                            {item.label}
                                        </label>
                                        {item.type === "number" ? (
                                            <input
                                                type="number"
                                                defaultValue={90}
                                                className="bg-black/50 border border-slate-700 rounded px-3 py-2 text-white text-sm font-mono w-20"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => handleToggle(item.key)}
                                                className={`relative w-12 h-6 rounded-full transition-all ${settings[item.key as keyof typeof settings] ? "bg-green-600" : "bg-slate-700"}`}
                                            >
                                                <motion.div
                                                    layout
                                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings[item.key as keyof typeof settings] ? "right-0.5" : "left-0.5"}`}
                                                />
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                {/* API Configuration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/50 border border-blue-900 rounded-lg p-6 hover:border-blue-700 transition-all"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-6 h-6 text-blue-400" />
                        <h2 className="text-xl font-bold text-blue-400">API Configuration</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-white text-sm font-bold mb-2 block">API Key</label>
                            <input
                                type="password"
                                placeholder="••••••••••••••••"
                                className="w-full bg-black/50 border border-blue-700 rounded px-4 py-2 text-white font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-white text-sm font-bold mb-2 block">API Endpoint</label>
                            <input
                                type="text"
                                defaultValue="http://localhost:8000"
                                className="w-full bg-black/50 border border-blue-700 rounded px-4 py-2 text-white font-mono text-sm"
                            />
                        </div>
                        <button className="w-full bg-blue-900/30 border border-blue-700 text-blue-400 py-2 rounded hover:bg-blue-900/50 transition font-bold">
                            Test Connection
                        </button>
                    </div>
                </motion.div>

                {/* Save Settings */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-all"
                >
                    SAVE SETTINGS
                </motion.button>
            </div>
        </main>
    );
}
