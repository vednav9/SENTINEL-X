# SENTINEL-X Dashboard - Component Index & Reference

## 📑 Complete Component Library

### 🎯 Layout Components

#### `DashboardLayout`
**File**: `components/DashboardLayout.tsx`
**Purpose**: Main layout wrapper with header, sidebar, content
**Props**:
- `children`: Main content
- `sidebar`: Sidebar component
- `header`: Header component
- `footer`: Footer component (optional)

**Usage**:
```tsx
<DashboardLayout header={header} sidebar={sidebar}>
  <MainContent />
</DashboardLayout>
```

#### `Card`
**File**: `components/DashboardLayout.tsx`
**Purpose**: Reusable card container
**Props**:
- `children`: Card content
- `title`: Card title (optional)
- `icon`: Icon component (optional)
- `className`: Additional classes (optional)

**Usage**:
```tsx
<Card title="Section" icon={<Icon />}>
  Content here
</Card>
```

#### `DashboardGrid`
**File**: `components/DashboardLayout.tsx`
**Purpose**: Flexible grid layout
**Props**:
- `children`: Grid items
- `cols`: 2 | 3 | 4 columns
- `gap`: 4 | 6 | 8 spacing

**Usage**:
```tsx
<DashboardGrid cols={3} gap={6}>
  {items}
</DashboardGrid>
```

#### `Section`
**File**: `components/DashboardLayout.tsx`
**Purpose**: Full-width section with title
**Props**:
- `children`: Section content
- `title`: Section title (optional)
- `className`: Additional classes (optional)

**Usage**:
```tsx
<Section title="Title">
  Content here
</Section>
```

---

### 🔌 Functional Components

#### `DashboardHeader`
**File**: `components/DashboardHeader.tsx`
**Purpose**: Professional header with system status
**Features**:
- Live clock display
- Network status
- Threat counter
- System status indicator
- Protection mode display

**Props**:
- `title`: Header title
- `version`: Version number
- `isOnline`: Online status

**Usage**:
```tsx
<DashboardHeader 
  title="SENTINEL-X" 
  version="2.0"
  isOnline={true}
/>
```

#### `ControlPanel`
**File**: `components/ControlPanel.tsx`
**Purpose**: Button control interface
**Features**:
- 4 primary buttons
- 4 secondary buttons
- 2 danger buttons
- System status indicators
- Real-time updates

**Props**:
- `onButtonClick`: Callback for button clicks

**Buttons**:
| ID | Label | Color |
|----|-------|-------|
| BTN_ACTIVATE | Activate System | Primary |
| BTN_SHIELD | Enable Shield | Primary |
| BTN_ALERT | Send Alert | Primary |
| BTN_RESET | Reset System | Primary |
| BTN_RESTART | Restart Services | Secondary |
| BTN_CONNECT | Connect Network | Secondary |
| BTN_SETTINGS | Settings | Secondary |
| BTN_DEPLOY | Deploy | Secondary |
| BTN_EMERGENCY_STOP | Emergency Stop | Danger |
| BTN_LOCK_SYSTEM | Lock System | Danger |

**Usage**:
```tsx
<ControlPanel onButtonClick={(id) => console.log(id)} />
```

#### `NetworkMap`
**File**: `components/NetworkMap.tsx`
**Purpose**: Interactive canvas-based network visualization
**Features**:
- 5 network nodes
- Animated connections
- Click to select
- Hover highlighting
- Threat level indicators
- Grid background

**Props**: None (self-contained)

**Nodes**:
- `core-1`: Core Server
- `firewall-1`: Firewall Primary
- `endpoint-1`: Endpoint Alpha
- `endpoint-2`: Endpoint Beta
- `threat-1`: Anomaly Detected

**Usage**:
```tsx
<NetworkMap />
```

#### `ControlPanel`
**File**: `components/ControlPanel.tsx`
**Purpose**: Comprehensive control panel
**Features**:
- Organized button sections
- System indicators
- Real-time status
- Interactive feedback

**Usage**:
```tsx
<ControlPanel onButtonClick={handleClick} />
```

#### `StatsPanel`
**File**: `components/StatsPanel.tsx`
**Purpose**: Live statistics dashboard
**Features**:
- 4-column stats grid
- Trend indicators
- Percentage changes
- Detailed metrics table
- Hover animations

**Stats Displayed**:
- Threats Detected
- Active Agents
- System Uptime
- Average Response Time

**Usage**:
```tsx
<StatsPanel />
```

---

### 📊 Existing Components (Pre-integrated)

#### `ThreatMonitor`
**File**: `components/ThreatMonitor.tsx`
**Purpose**: Real-time threat monitoring
**Integration**: Main dashboard page

#### `LiveLogFeed`
**File**: `components/LiveLogFeed.tsx`
**Purpose**: System log display
**Integration**: Main dashboard page

#### `AgentBrain`
**File**: `components/AgentBrain.tsx`
**Purpose**: AI reasoning display
**Integration**: Main dashboard page

#### `AttackGraph`
**File**: `components/AttackGraph.tsx`
**Purpose**: Attack vector visualization
**Integration**: Main dashboard page

---

## 🎨 Styling Reference

### Color Utilities
```css
/* Primary Colors */
text-green-500     /* Main text */
text-green-300     /* Secondary text */
text-green-700     /* Tertiary text */

/* Danger Colors */
text-red-500
text-red-400
bg-red-900

/* Warning Colors */
text-orange-400
bg-orange-900

/* Borders */
border-green-800   /* Primary */
border-green-900   /* Secondary */

/* Background */
bg-black
bg-black/50        /* 50% opacity */
bg-black/30        /* 30% opacity */
```

### Utility Classes
```css
.card-base         /* Card styling */
.btn-primary       /* Green button */
.btn-secondary     /* Green border button */
.btn-danger        /* Red danger button */
.cyber-neoneffect  /* Neon glow */
.text-glow         /* Text shadow */
.glass-effect      /* Frosted glass */
.pulse-glow        /* Pulsing animation */
.scan-effect       /* Scan line effect */
```

---

## 📱 Responsive Grid System

### Grid Columns
```tsx
cols={2}  /* 2-column layout */
cols={3}  /* 3-column layout (most common) */
cols={4}  /* 4-column layout */
```

### Gap Sizes
```tsx
gap={4}   /* 16px spacing */
gap={6}   /* 24px spacing (default) */
gap={8}   /* 32px spacing */
```

---

## 🔄 Component Flow

```
App
└── DashboardLayout
    ├── header: DashboardHeader
    ├── sidebar: ControlPanel
    └── children:
        ├── Section: Network & Threats
        │   ├── Card: NetworkMap
        │   ├── Card: ThreatMonitor
        │   └── Card: LiveLogFeed
        ├── Section: Analysis
        │   ├── Card: AttackGraph
        │   └── Card: AgentBrain
        ├── Section: Metrics
        │   └── DashboardGrid (4 cols)
        │       └── 4× Card: Metric
        └── Section: Statistics
            └── StatsPanel
```

---

## 🚀 Adding New Components

### Step 1: Create Component File
```tsx
// components/NewComponent.tsx
"use client";

import { motion } from "framer-motion";

export default function NewComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### Step 2: Import in Main Page
```tsx
import NewComponent from "@/components/NewComponent";
```

### Step 3: Add to Layout
```tsx
<Section title="New Section">
  <Card title="New Card">
    <NewComponent />
  </Card>
</Section>
```

---

## 🎭 Animation Patterns

### Entrance Animation
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

### Staggered Group
```tsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
  />
))}
```

### Hover Effect
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Pulsing Animation
```tsx
animate={{
  boxShadow: [
    "0 0 10px rgba(0, 255, 0, 0.3)",
    "0 0 20px rgba(0, 255, 0, 0.6)",
    "0 0 10px rgba(0, 255, 0, 0.3)",
  ]
}}
transition={{ duration: 2, repeat: Infinity }}
```

---

## 📦 Icon Library (Lucide React)

### Available Icons
```tsx
import {
  Power,           // BTN_ACTIVATE
  Shield,          // BTN_SHIELD
  AlertTriangle,   // BTN_ALERT
  RotateCcw,       // BTN_RESET
  Zap,             // BTN_RESTART
  Wifi,            // BTN_CONNECT
  Settings,        // BTN_SETTINGS
  Send,            // BTN_DEPLOY
  Square,          // BTN_EMERGENCY_STOP
  Lock,            // BTN_LOCK_SYSTEM
  MapPin,          // Map header
  Terminal,        // Logs header
  ShieldAlert,     // Main alert
  Cpu,             // Agent brain
  Activity,        // Metrics
  TrendingUp,      // Stats trend
  TrendingDown,    // Stats trend
  Users,           // Agent count
  Clock,           // Time
  Network,         // Network status
} from "lucide-react";
```

---

## 🧪 Testing Components

### Test Button Clicks
```tsx
<ControlPanel 
  onButtonClick={(id) => {
    console.log(`Clicked: ${id}`);
  }} 
/>
```

### Test Network Map
Click nodes to see details in bottom panel

### Test Status Indicators
Monitor real-time updates in header

---

## 📝 Component Props Guide

### Common Props Pattern
```tsx
interface ComponentProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  onClick?: () => void;
  animate?: boolean;
}
```

### Framer Motion Props
```tsx
// Animation states
initial={{ ... }}
animate={{ ... }}
exit={{ ... }}

// Events
whileHover={{ ... }}
whileTap={{ ... }}
whileFocus={{ ... }}

// Timing
transition={{ 
  duration: 0.3,
  delay: 0.1,
  repeat: Infinity,
}}
```

---

## 🔗 Component Dependencies

### External Libraries
- **Next.js**: React framework
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

### Internal Dependencies
```
DashboardLayout (shared)
├── Used by: Main page
├── Provides: Card, DashboardGrid, Section

ControlPanel (control)
├── Imports: Lucide icons
├── Props: onButtonClick callback

NetworkMap (visualization)
├── Imports: Lucide icons, Framer Motion
├── Features: Canvas drawing

StatsPanel (data)
├── Imports: Lucide icons
├── Features: Trending, animations
```

---

## 💾 File Structure

```
components/
├── DashboardLayout.tsx      (Layout wrapper, Card, Grid, Section)
├── DashboardHeader.tsx      (Header with status)
├── ControlPanel.tsx         (10 buttons + indicators)
├── NetworkMap.tsx           (Canvas network viz)
├── StatsPanel.tsx           (Statistics display)
├── ThreatMonitor.tsx        (Pre-existing)
├── LiveLogFeed.tsx          (Pre-existing)
├── AgentBrain.tsx           (Pre-existing)
└── AttackGraph.tsx          (Pre-existing)

app/
├── page.tsx                 (Main dashboard)
├── layout.tsx               (Root layout)
└── globals.css              (Global styles)
```

---

## 🎓 Best Practices

1. **Always use `"use client"`** at top of components
2. **Wrap with motion.div** for animations
3. **Use Tailwind** for styling consistency
4. **Follow naming** conventions (PascalCase)
5. **Add JSDoc** comments for complex props
6. **Test interactivity** in browser
7. **Keep components** modular and reusable
8. **Use icons** consistently

---

**Last Updated**: January 25, 2026
**Version**: 2.0.0
**Total Components**: 11 (4 new + 7 existing)
