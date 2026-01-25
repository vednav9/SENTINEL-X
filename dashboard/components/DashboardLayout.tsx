"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

/**
 * DashboardLayout Component
 * Provides a professional dark-themed layout structure for the SENTINEL-X dashboard
 *
 * Features:
 * - Responsive grid system
 * - Dark theme with neon accents
 * - Smooth animations
 * - Flexible sidebar and header sections
 */
export default function DashboardLayout({
  children,
  sidebar,
  header,
  footer,
}: LayoutProps) {
  return (
    <motion.div
      className="w-full h-screen flex flex-col bg-black text-green-500 overflow-hidden font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      {header && (
        <motion.header
          className="w-full border-b border-green-800 bg-black/50"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {header}
        </motion.header>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <motion.aside
            className="w-64 border-r border-green-800 bg-black/50 overflow-y-auto"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {sidebar}
          </motion.aside>
        )}

        {/* Main Content */}
        <motion.main
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>

      {/* Footer Section */}
      {footer && (
        <motion.footer
          className="w-full border-t border-green-800 bg-black/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {footer}
        </motion.footer>
      )}
    </motion.div>
  );
}

/**
 * Card Component
 * Reusable card container for dashboard sections
 */
export function Card({
  children,
  title,
  icon,
  className = "",
}: {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`card-base ${className}`}
      whileHover={{ borderColor: "rgba(0, 255, 0, 0.5)" }}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <div className="flex items-center gap-2 mb-4 text-green-300 border-b border-green-900 pb-3">
          {icon && <span>{icon}</span>}
          <span className="font-bold text-sm uppercase tracking-widest">{title}</span>
        </div>
      )}
      {children}
    </motion.div>
  );
}

/**
 * Grid Component
 * Flexible grid layout for dashboard sections
 */
export function DashboardGrid({
  children,
  cols = 3,
  gap = 6,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  gap?: 4 | 6 | 8;
}) {
  const colsClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const gapClass = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div className={`grid ${colsClass[cols]} ${gapClass[gap]} w-full`}>
      {children}
    </div>
  );
}

/**
 * Section Component
 * Full-width section with optional background styling
 */
export function Section({
  children,
  title,
  className = "",
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <motion.section
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <h2 className="text-2xl font-bold text-green-300 mb-6 tracking-widest">
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  );
}
