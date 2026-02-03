"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Power,
  Shield,
  AlertTriangle,
  RotateCcw,
  Zap,
  Lock,
  Wifi,
  Settings,
  Play,
  Square,
  Send,
} from "lucide-react";

/**
 * BUTTON VARIABLES REFERENCE:
 * 
 * Primary Buttons:
 * - BTN_ACTIVATE: Activate system components
 * - BTN_SHIELD: Enable protection mode
 * - BTN_ALERT: Send alert notifications
 * - BTN_RESET: Reset system parameters
 * 
 * Danger Buttons:
 * - BTN_EMERGENCY_STOP: Emergency shutdown
 * - BTN_LOCK_SYSTEM: Lock all access
 * 
 * Secondary Buttons:
 * - BTN_RESTART: Restart services
 * - BTN_CONNECT: Establish connections
 * - BTN_SETTINGS: Open settings
 * - BTN_DEPLOY: Deploy configurations
 * - BTN_STOP: Stop operations
 * - BTN_SUBMIT: Submit actions
 */

interface ControlPanelProps {
  onButtonClick?: (buttonId: string) => void;
}

export default function ControlPanel({ onButtonClick }: ControlPanelProps) {
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [systemStatus, setSystemStatus] = useState({
    shieldActive: false,
    monitoring: false,
    lockdown: false,
  });

  // Button Configuration
  const PRIMARY_BUTTONS = [
    {
      id: "BTN_ACTIVATE",
      label: "Activate System",
      icon: <Power size={16} />,
      color: "btn-primary",
      action: () => handlePrimaryAction("BTN_ACTIVATE"),
    },
    {
      id: "BTN_SHIELD",
      label: "Enable Shield",
      icon: <Shield size={16} />,
      color: "btn-primary",
      action: () => handlePrimaryAction("BTN_SHIELD"),
    },
    {
      id: "BTN_ALERT",
      label: "Send Alert",
      icon: <AlertTriangle size={16} />,
      color: "btn-primary",
      action: () => handlePrimaryAction("BTN_ALERT"),
    },
    {
      id: "BTN_RESET",
      label: "Reset System",
      icon: <RotateCcw size={16} />,
      color: "btn-primary",
      action: () => handlePrimaryAction("BTN_RESET"),
    },
  ];

  const SECONDARY_BUTTONS = [
    {
      id: "BTN_RESTART",
      label: "Restart Services",
      icon: <Zap size={16} />,
      color: "btn-secondary",
      action: () => handleSecondaryAction("BTN_RESTART"),
    },
    {
      id: "BTN_CONNECT",
      label: "Connect Network",
      icon: <Wifi size={16} />,
      color: "btn-secondary",
      action: () => handleSecondaryAction("BTN_CONNECT"),
    },
    {
      id: "BTN_SETTINGS",
      label: "Settings",
      icon: <Settings size={16} />,
      color: "btn-secondary",
      action: () => handleSecondaryAction("BTN_SETTINGS"),
    },
    {
      id: "BTN_DEPLOY",
      label: "Deploy",
      icon: <Send size={16} />,
      color: "btn-secondary",
      action: () => handleSecondaryAction("BTN_DEPLOY"),
    },
  ];

  const DANGER_BUTTONS = [
    {
      id: "BTN_EMERGENCY_STOP",
      label: "Emergency Stop",
      icon: <Square size={16} />,
      color: "btn-danger",
      action: () => handleDangerAction("BTN_EMERGENCY_STOP"),
    },
    {
      id: "BTN_LOCK_SYSTEM",
      label: "Lock System",
      icon: <Lock size={16} />,
      color: "btn-danger",
      action: () => handleDangerAction("BTN_LOCK_SYSTEM"),
    },
  ];

  const handlePrimaryAction = (buttonId: string) => {
    const newActive = new Set(activeButtons);
    if (newActive.has(buttonId)) {
      newActive.delete(buttonId);
    } else {
      newActive.add(buttonId);
    }
    setActiveButtons(newActive);

    if (buttonId === "BTN_SHIELD") {
      setSystemStatus((prev) => ({ ...prev, shieldActive: !prev.shieldActive }));
    }

    onButtonClick?.(buttonId);
  };

  const handleSecondaryAction = (buttonId: string) => {
    onButtonClick?.(buttonId);
  };

  const handleDangerAction = (buttonId: string) => {
    if (buttonId === "BTN_LOCK_SYSTEM") {
      setSystemStatus((prev) => ({ ...prev, lockdown: !prev.lockdown }));
    }
    onButtonClick?.(buttonId);
  };

  const ButtonComponent = ({
    button,
  }: {
    button: (typeof PRIMARY_BUTTONS)[0];
  }) => (
    <motion.button
      className={`${button.color} flex items-center gap-2 w-full justify-center`}
      onClick={button.action}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        activeButtons.has(button.id)
          ? {
              boxShadow: "0 0 20px rgba(0, 255, 0, 0.5)",
              backgroundColor:
                button.color === "btn-primary" ? "#00cc00" : undefined,
            }
          : {}
      }
    >
      {button.icon}
      <span className="text-xs font-bold">{button.label}</span>
    </motion.button>
  );

  return (
    <motion.div
      className="w-full card-base space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="border-b border-green-900 pb-4">
        <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
          <Zap size={20} />
          CONTROL PANEL
        </h2>
        <p className="text-xs text-green-700 mt-2">
          System Status: {systemStatus.shieldActive ? "PROTECTED" : "NORMAL"}
          {systemStatus.lockdown && " - LOCKDOWN ACTIVE"}
        </p>
      </div>

      {/* Primary Actions Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest">
          Primary Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {PRIMARY_BUTTONS.map((button) => (
            <ButtonComponent key={button.id} button={button} />
          ))}
        </div>
      </div>

      {/* Secondary Actions Section */}
      <div className="space-y-3 border-t border-green-900 pt-4">
        <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest">
          Secondary Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {SECONDARY_BUTTONS.map((button) => (
            <ButtonComponent key={button.id} button={button} />
          ))}
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="space-y-3 border-t border-green-900 pt-4 border-l-2 border-l-red-600 pl-4">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">
          ⚠️ Danger Zone
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {DANGER_BUTTONS.map((button) => (
            <ButtonComponent key={button.id} button={button} />
          ))}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="border-t border-green-900 pt-4 space-y-2">
        <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest">
          System Indicators
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 bg-black/30 rounded">
            <span>Shield Protection</span>
            <span
              className={`px-2 py-1 rounded ${
                systemStatus.shieldActive
                  ? "bg-green-900 text-green-300"
                  : "bg-gray-900 text-gray-500"
              }`}
            >
              {systemStatus.shieldActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-black/30 rounded">
            <span>Network Monitoring</span>
            <span className="px-2 py-1 rounded bg-blue-900 text-blue-300">
              ACTIVE
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-black/30 rounded">
            <span>Lockdown Status</span>
            <span
              className={`px-2 py-1 rounded ${
                systemStatus.lockdown
                  ? "bg-red-900 text-red-300"
                  : "bg-gray-900 text-gray-500"
              }`}
            >
              {systemStatus.lockdown ? "LOCKED" : "UNLOCKED"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
