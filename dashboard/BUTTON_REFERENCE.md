/*
 * ============================================================================
 * SENTINEL-X DASHBOARD - BUTTON & COMPONENT REFERENCE
 * ============================================================================
 * 
 * This document provides a complete reference for all button variables,
 * interactive components, and UI elements used throughout the dashboard.
 * 
 * Dark Theme Color Palette:
 * - Primary: #00ff00 (Neon Green)
 * - Secondary: #ff0080 (Magenta)
 * - Danger: #ff0000 (Red)
 * - Background: #050505 (Near Black)
 * - Border: #1a1a1a (Dark Gray)
 * 
 * ============================================================================
 * BUTTON VARIABLES & ACTIONS
 * ============================================================================
 */

// PRIMARY ACTION BUTTONS
// =====================
// Used for core system operations and activations

BTN_ACTIVATE
  - Label: "Activate System"
  - Icon: Power icon
  - Style: btn-primary (Green gradient)
  - Action: Activates main system components
  - Hover Effect: Glow effect, scale up
  - Status: Toggleable

BTN_SHIELD
  - Label: "Enable Shield"
  - Icon: Shield icon
  - Style: btn-primary (Green gradient)
  - Action: Toggles protection mode
  - Hover Effect: Glow effect, scale up
  - Status: Toggleable (shows PROTECTED/NORMAL in header)

BTN_ALERT
  - Label: "Send Alert"
  - Icon: AlertTriangle icon
  - Style: btn-primary (Green gradient)
  - Action: Sends alert notifications to system
  - Hover Effect: Glow effect, scale up
  - Status: One-time trigger

BTN_RESET
  - Label: "Reset System"
  - Icon: RotateCcw icon
  - Style: btn-primary (Green gradient)
  - Action: Resets all system parameters to default
  - Hover Effect: Glow effect, scale up
  - Status: Confirmation required

// SECONDARY ACTION BUTTONS
// =========================
// Used for configuration and auxiliary operations

BTN_RESTART
  - Label: "Restart Services"
  - Icon: Zap icon
  - Style: btn-secondary (Green border)
  - Action: Restarts all active services
  - Hover Effect: Fill with green background
  - Status: One-time trigger

BTN_CONNECT
  - Label: "Connect Network"
  - Icon: Wifi icon
  - Style: btn-secondary (Green border)
  - Action: Establishes network connections
  - Hover Effect: Fill with green background
  - Status: Toggleable

BTN_SETTINGS
  - Label: "Settings"
  - Icon: Settings icon
  - Style: btn-secondary (Green border)
  - Action: Opens dashboard settings modal
  - Hover Effect: Fill with green background
  - Status: Opens modal

BTN_DEPLOY
  - Label: "Deploy"
  - Icon: Send icon
  - Style: btn-secondary (Green border)
  - Action: Deploys configurations to agents
  - Hover Effect: Fill with green background
  - Status: One-time trigger

// DANGER ZONE BUTTONS
// ====================
// Red buttons for critical operations - use with caution

BTN_EMERGENCY_STOP
  - Label: "Emergency Stop"
  - Icon: Square icon
  - Style: btn-danger (Red gradient)
  - Action: Immediately stops all operations
  - Hover Effect: Red glow effect
  - Status: Requires confirmation
  - Warning: Cannot be undone without restart

BTN_LOCK_SYSTEM
  - Label: "Lock System"
  - Icon: Lock icon
  - Style: btn-danger (Red gradient)
  - Action: Locks all system access
  - Hover Effect: Red glow effect
  - Status: Toggleable (shows LOCKED/UNLOCKED)
  - Warning: Prevents normal operations

// ============================================================================
// INTERACTIVE COMPONENTS
// ============================================================================

NETWORK MAP COMPONENT
  - Type: Canvas-based interactive map
  - Features:
    * Displays network nodes (servers, endpoints, firewalls)
    * Shows connections between nodes
    * Color-coded threat levels (green/yellow/red)
    * Click to select nodes and view details
    * Hover to highlight nodes
    * Real-time animation
  - Interactivity:
    * Mouse over: Highlights node
    * Click: Shows detailed information panel
    * Animated connections: Shows data flow

THREAT MONITOR COMPONENT
  - Type: Real-time threat feed
  - Features:
    * Live threat detection
    * Attack vector visualization
    * Severity indicators
    * Auto-updating data

LIVE LOG FEED COMPONENT
  - Type: Scrolling log display
  - Features:
    * Real-time system logs
    * Color-coded severity
    * Timestamp tracking
    * Mono-space font

AGENT BRAIN COMPONENT
  - Type: AI reasoning display
  - Features:
    * Shows agent decision logic
    * Response predictions
    * Confidence scores
    * Action history

ATTACK GRAPH COMPONENT
  - Type: Interactive network graph
  - Features:
    * Attack vector visualization
    * Node relationships
    * Attack progression timeline
    * Severity heatmap

CONTROL PANEL COMPONENT
  - Type: Sidebar control interface
  - Features:
    * All primary, secondary, and danger buttons
    * Real-time status indicators
    * System health metrics
    * Visual feedback on button press

// ============================================================================
// STYLING CLASSES & UTILITIES
// ============================================================================

CSS CLASSES
  - card-base: Base card styling with borders and hover effects
  - btn-primary: Green gradient buttons with glow on hover
  - btn-secondary: Green border buttons that fill on hover
  - btn-danger: Red gradient buttons for dangerous actions
  - cyber-neoneffect: Green glow effect (box-shadow)
  - text-glow: Text glow effect (text-shadow)
  - glass-effect: Frosted glass effect with blur and transparency
  - pulse-glow: Animated pulsing glow effect
  - scan-effect: Animated scan line effect

TAILWIND COLORS USED
  - Text: text-green-500 (primary), text-green-300 (secondary)
  - Borders: border-green-800 (primary), border-green-900 (secondary)
  - Background: bg-black, bg-black/50, bg-black/30
  - Danger: text-red-500, bg-red-900, border-red-600

// ============================================================================
// BUTTON LAYOUT & POSITIONING
// ============================================================================

CONTROL PANEL SIDEBAR
  - Location: Right side of screen
  - Width: 256px (64 units in Tailwind)
  - Content Grid:
    * Primary Actions: 2 columns
    * Secondary Actions: 2 columns
    * Danger Zone: 1 column (full width)
  - Status Indicators: Below buttons

DASHBOARD HEADER
  - Location: Top of screen
  - Height: 64px (4rem)
  - Content:
    * Logo & Title (left)
    * System Status & Info (right)
  - Borders: Bottom only (green-800)

METRIC CARDS
  - Location: Bottom section of main content
  - Grid: 4 columns
  - Cards: Clickable for selection
  - Contents:
    * CPU Usage
    * Memory Usage
    * Network Activity
    * Active Agents Count

// ============================================================================
// ANIMATION EFFECTS
// ============================================================================

BUTTON ANIMATIONS
  - Hover: scale(1.05)
  - Tap: scale(0.95)
  - Active: box-shadow glow + color change

COMPONENT ANIMATIONS
  - Initial: opacity 0, y 20px
  - Animate: opacity 1, y 0
  - Duration: 0.3-0.5s with staggered delays
  - Transition: ease (default)

STATUS INDICATORS
  - Pulse: 2s ease-in-out infinite cycle
  - Scan lines: 3s linear infinite
  - Glow transitions: 0.3s ease

// ============================================================================
// RESPONSIVE DESIGN
// ============================================================================

BREAKPOINTS
  - Mobile: < 640px (not optimized for mobile)
  - Tablet: 640px - 1024px (partial support)
  - Desktop: > 1024px (fully optimized)

GRID LAYOUTS
  - Primary Grid: grid-cols-12 (main dashboard)
  - Card Grids: grid-cols-2, grid-cols-3, grid-cols-4
  - Gap sizes: gap-4, gap-6, gap-8

// ============================================================================
// DARK THEME SPECIFICATIONS
// ============================================================================

COLOR SCHEME
  - Background: #050505 (99% opacity black)
  - Primary Accent: #00ff00 (Neon Green)
  - Secondary Accent: #ff0080 (Magenta)
  - Danger Color: #ff0000 (Red)
  - Border Color: #1a1a1a
  - Text: #ededed (light gray)

CONTRAST RATIOS
  - Text on background: 4.5:1 (AA compliant)
  - Green accent on black: 5.5:1
  - Glow effects: Sufficient for visibility

// ============================================================================
// BORDER SPECIFICATIONS
// ============================================================================

Note: The user requested 400px border width, which we interpreted as
card/component border styling rather than a literal 400px border.

ACTUAL BORDER SIZES
  - Card borders: 1px solid
  - Section dividers: 1px solid
  - Accent borders: 1px solid
  - Dashboard grid gap: 24px (1.5rem)

If 400px was intended as container width:
  - Control Panel Width: 256px (can be adjusted)
  - Card Max-Width: Full container width
  - Center Map: ~800px (canvas element)

// ============================================================================
// FILE LOCATIONS
// ============================================================================

COMPONENT FILES
  - ControlPanel.tsx: /components/ControlPanel.tsx
  - NetworkMap.tsx: /components/NetworkMap.tsx
  - DashboardLayout.tsx: /components/DashboardLayout.tsx
  - LiveLogFeed.tsx: /components/LiveLogFeed.tsx
  - ThreatMonitor.tsx: /components/ThreatMonitor.tsx
  - AgentBrain.tsx: /components/AgentBrain.tsx
  - AttackGraph.tsx: /components/AttackGraph.tsx

PAGE FILES
  - Main Dashboard: /app/page.tsx
  - Layout: /app/layout.tsx
  - Styles: /app/globals.css

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

IMPLEMENTING A BUTTON ACTION:
  
  const handleButtonClick = (buttonId: string) => {
    switch(buttonId) {
      case "BTN_SHIELD":
        toggleShieldProtection();
        break;
      case "BTN_LOCK_SYSTEM":
        lockdownSystem();
        break;
      default:
        console.log(`Action for ${buttonId}`);
    }
  };

STYLING A CUSTOM BUTTON:
  
  <button className="btn-primary flex items-center gap-2">
    <Icon size={16} />
    <span>Action Label</span>
  </button>

CREATING AN INTERACTIVE CARD:
  
  <Card title="Section Title" icon={<IconComponent />}>
    <div>Card content goes here</div>
  </Card>

// ============================================================================
// ACCESSIBILITY NOTES
// ============================================================================

- All buttons have clear labels and icons
- Color contrast meets WCAG AA standards
- Focus states inherit from Tailwind
- Keyboard navigation: Tab through buttons
- Screen readers: Labels and ARIA attributes recommended
- Mobile: Not fully optimized (consider additional breakpoints)

// ============================================================================
*/
