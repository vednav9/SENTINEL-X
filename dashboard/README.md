# SENTINEL-X Dashboard - Professional Frontend Guide

## 🎯 Overview

A professional, user-friendly dark-themed security dashboard built with Next.js, featuring an interactive network map, real-time threat monitoring, and comprehensive control panel with fully documented button variables.

## 🎨 Design Features

### Dark Theme
- **Background**: Deep black (#050505)
- **Primary Accent**: Neon Green (#00ff00) with glow effects
- **Secondary Accent**: Magenta (#ff0080)
- **Danger Zone**: Red (#ff0000)
- **Professional fonts**: Monospace (Courier New) for technical appearance

### Interactive UI Elements
- Canvas-based network topology map
- Real-time threat visualization
- Live system metrics with hover effects
- Smooth animations and transitions
- Responsive grid layouts
- Status indicators and badges

### Border & Spacing
- **Borders**: 1px green borders with glow on hover
- **Border Radius**: 8px for cards and components
- **Grid Gap**: 24px (6 units) between sections
- **Card Padding**: 16px for comfortable spacing

## 📁 Project Structure

```
dashboard/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & dark theme
├── components/
│   ├── DashboardLayout.tsx   # Layout components
│   ├── ControlPanel.tsx      # Button control panel
│   ├── NetworkMap.tsx        # Interactive network map
│   ├── StatsPanel.tsx        # Live statistics display
│   ├── ThreatMonitor.tsx     # Threat monitoring
│   ├── LiveLogFeed.tsx       # Real-time logs
│   ├── AgentBrain.tsx        # AI reasoning display
│   └── AttackGraph.tsx       # Attack visualization
├── BUTTON_REFERENCE.md       # Complete button documentation
├── package.json
└── tailwind.config.js
```

## 🔘 Button Variables & Actions

### Primary Actions (Green Gradient)
All primary buttons are located in the **Control Panel Sidebar**.

| Button ID | Label | Icon | Function | State |
|-----------|-------|------|----------|-------|
| `BTN_ACTIVATE` | Activate System | Power | Activates main system | Toggleable |
| `BTN_SHIELD` | Enable Shield | Shield | Toggles protection mode | Toggleable |
| `BTN_ALERT` | Send Alert | AlertTriangle | Sends notifications | One-time |
| `BTN_RESET` | Reset System | RotateCcw | Resets parameters | Confirmable |

### Secondary Actions (Green Border)
| Button ID | Label | Icon | Function |
|-----------|-------|------|----------|
| `BTN_RESTART` | Restart Services | Zap | Restarts services |
| `BTN_CONNECT` | Connect Network | Wifi | Establishes connections |
| `BTN_SETTINGS` | Settings | Settings | Opens settings modal |
| `BTN_DEPLOY` | Deploy | Send | Deploys configurations |

### Danger Zone (Red Gradient) ⚠️
| Button ID | Label | Icon | Function | Warning |
|-----------|-------|------|----------|---------|
| `BTN_EMERGENCY_STOP` | Emergency Stop | Square | Stops all operations | Cannot undo without restart |
| `BTN_LOCK_SYSTEM` | Lock System | Lock | Locks system access | Prevents normal operations |

## 🎮 Components

### DashboardLayout
Main layout component providing:
- Header section
- Sidebar navigation
- Main content area
- Footer (optional)
- Smooth animations on mount

**Usage:**
```tsx
<DashboardLayout
  header={<HeaderComponent />}
  sidebar={<SidebarComponent />}
>
  <MainContent />
</DashboardLayout>
```

### ControlPanel
Complete control interface with:
- Primary, secondary, and danger buttons
- Real-time system indicators
- Shield protection status
- Network monitoring status
- Lockdown status indicator

### NetworkMap
Interactive canvas-based network visualization:
- **Features**:
  - Displays network nodes (servers, endpoints, firewalls, threats)
  - Shows connections with different types (normal, suspicious, attack)
  - Color-coded threat levels (green/yellow/red)
  - Click to select and view node details
  - Hover highlighting
  - Real-time animation

- **Interactivity**:
  - Mouse over nodes: Highlights and shows pointer
  - Click nodes: Displays detailed information
  - Animated grid background
  - Pulsing glow effects

### StatsPanel
Live statistics dashboard with:
- 4-column grid layout
- Trending indicators (up/down)
- Percentage changes
- Detailed metrics table
- Hover animations

### Card Component
Reusable card container:
```tsx
<Card 
  title="Section Title" 
  icon={<IconComponent />}
>
  Card content here
</Card>
```

### DashboardGrid
Flexible grid layout:
```tsx
<DashboardGrid cols={3} gap={6}>
  {/* Grid items */}
</DashboardGrid>
```

### Section
Full-width section with title:
```tsx
<Section title="Section Title">
  {/* Section content */}
</Section>
```

## 🎨 Styling Classes

### CSS Utility Classes

| Class | Purpose | Effect |
|-------|---------|--------|
| `card-base` | Base card styling | Border, hover effects, rounded corners |
| `btn-primary` | Primary buttons | Green gradient, glow on hover |
| `btn-secondary` | Secondary buttons | Green border, fills on hover |
| `btn-danger` | Danger buttons | Red gradient, intense glow |
| `cyber-neoneffect` | Neon glow | Green box-shadow glow |
| `text-glow` | Text effect | Text shadow glow |
| `glass-effect` | Frosted glass | Blur + transparency |
| `pulse-glow` | Animated pulse | 2s pulsing glow animation |
| `scan-effect` | Scan line | 3s animated scan line |

### Tailwind Color Palette

**Text Colors:**
- `text-green-500`: Primary text
- `text-green-300`: Secondary text
- `text-green-700`: Muted text

**Border Colors:**
- `border-green-800`: Primary borders
- `border-green-900`: Secondary borders

**Background Colors:**
- `bg-black`: Full black
- `bg-black/50`: 50% opacity black
- `bg-black/30`: 30% opacity black

## 🚀 Getting Started

### Installation
```bash
cd dashboard
npm install
```

### Development Server
```bash
npm run dev
```
The dashboard will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📊 Dashboard Sections

### 1. Header
- System name and version
- Online/Offline status indicator
- Protection information

### 2. Sidebar (Control Panel)
- Primary action buttons
- Secondary action buttons
- Danger zone buttons
- System status indicators

### 3. Main Content Area

#### Network Topology & Threats
- Interactive network map
- Real-time threat monitor
- Live log feed

#### Analysis & Intelligence
- Attack vector graph
- AI agent reasoning display

#### System Metrics
- CPU Usage
- Memory Usage
- Network Activity
- Active Agents Count

#### Live Statistics
- Threats detected with trend
- Active agents count
- System uptime
- Average response time
- Detailed metrics table

## 🔄 Animations

### Component Animations
- **Entrance**: opacity 0→1, y: 20px→0, duration: 0.3-0.5s
- **Stagger**: Sequential delays for group animations
- **Interactive**: Scale and glow on hover

### Status Indicators
- **Pulse**: 2s infinite cycle
- **Scan lines**: 3s linear infinite
- **Glow**: 0.3s ease transitions

## 🎯 Interactive Features

### Button Interactions
1. **Hover**: Scale up (1.05), glow effect
2. **Click**: Scale down (0.95) feedback
3. **Active**: Visual state change, glow intensifies

### Map Interactions
1. **Hover**: Node highlights, cursor changes
2. **Click**: Selects node, shows details panel
3. **Animation**: Continuous real-time updates

### Card Interactions
1. **Hover**: Border color change, glow effect
2. **Click**: Selection state for metrics
3. **Hover**: Smooth animations and transitions

## 🛠️ Customization

### Changing Colors
Edit CSS variables in `globals.css`:
```css
:root {
  --primary: #00ff00;        /* Change green accent */
  --secondary: #ff0080;      /* Change magenta accent */
  --border-color: #1a1a1a;   /* Change border color */
}
```

### Adjusting Spacing
Modify grid gaps and padding in Tailwind:
```tsx
<DashboardGrid cols={3} gap={6}>  {/* gap: 4 | 6 | 8 */}
```

### Animation Timing
Update animation durations in component transitions:
```tsx
transition={{ duration: 0.3, delay: 0.1 }}
```

## 📱 Responsive Design

Currently optimized for **desktop displays (1024px+)**. 

For mobile support, add breakpoints in Tailwind:
```tsx
className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
```

## 🔐 Professional Standards

✅ **WCAG AA Compliant** - Text contrast meets standards
✅ **Monospace Fonts** - Professional technical appearance
✅ **Consistent Spacing** - Follows grid system
✅ **Clear Hierarchy** - Visual importance through size and color
✅ **Logical Flow** - Intuitive section organization
✅ **Accessible Icons** - Paired with text labels

## 🚨 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)

## 📚 Dependencies

- **Next.js**: React framework
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## 🎓 Examples

### Creating a New Button
```tsx
<button className="btn-primary flex items-center gap-2">
  <Icon size={16} />
  <span>Action</span>
</button>
```

### Adding to Control Panel
```tsx
const NEW_BUTTON = {
  id: "BTN_NEW",
  label: "New Action",
  icon: <NewIcon size={16} />,
  color: "btn-primary",
  action: () => handleNewAction(),
};
```

### Creating a Metric Card
```tsx
<Card className="text-center">
  <div className="text-2xl font-bold">42</div>
  <div className="text-xs text-green-700">METRIC LABEL</div>
</Card>
```

## 📞 Support

For button variable reference, see `BUTTON_REFERENCE.md` in the dashboard folder.

For component usage examples, check individual component files with JSDoc comments.

## 🎓 Professional Tips

1. **Consistency**: Always use defined color palette
2. **Spacing**: Maintain gap-6 between major sections
3. **Typography**: Use uppercase for labels, mono fonts
4. **Interaction**: Provide visual feedback on all actions
5. **Performance**: Use lazy loading for heavy components

---

**Last Updated**: January 25, 2026
**Version**: 2.0
**Theme**: Dark (Cybersecurity Theme)
