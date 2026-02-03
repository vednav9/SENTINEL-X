# SENTINEL-X Dashboard - UI/UX Style Guide

## 🎨 Design Philosophy

**SENTINEL-X** employs a **cybersecurity-inspired dark theme** with neon accents, providing a professional yet visually engaging interface for security operations. The design balances technical sophistication with user accessibility.

### Core Principles
- **Dark First**: Reduces eye strain during extended monitoring
- **Clear Hierarchy**: Visual importance through size, color, and spacing
- **Interactive Feedback**: Immediate visual response to user actions
- **Professional Aesthetic**: Monospace fonts and technical styling
- **Accessibility**: High contrast ratios and readable labels

---

## 🎯 Color System

### Primary Colors
| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| Neon Green | `#00ff00` | Primary accent, buttons, borders | Main brand color |
| Dark Green | `#00cc00` | Hover states, highlights | Slightly darker for depth |
| Background Black | `#050505` | Main background | 99% opacity black |
| Deep Black | `#000000` | Darkest elements | Used sparingly |

### Secondary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Magenta | `#ff0080` | Alternative accents |
| Alert Red | `#ff0000` | Danger actions, critical alerts |
| Warning Orange | `#ffaa00` | Warning states, caution indicators |
| Safe Green | `#00ff00` | Success states, active indicators |

### Status Colors
```
Active/Safe:     #00ff00 (Green)
Warning:         #ffaa00 (Orange)
Critical/Danger: #ff0000 (Red)
Neutral:         #808080 (Gray)
Info:            #0088ff (Blue)
```

---

## 🔤 Typography

### Font Family
```css
font-family: 'Courier New', Courier, monospace;
```
Professional monospace font conveys technical authority and system-level control.

### Font Sizes
| Size | Class | Usage |
|------|-------|-------|
| 32px | text-4xl | Page title |
| 24px | text-2xl | Section headers |
| 18px | text-lg | Card titles |
| 16px | text-base | Body text |
| 14px | text-sm | Secondary text, labels |
| 12px | text-xs | Tertiary text, badges |

### Font Weights
- **Bold (700)**: Headers, labels, important data
- **Normal (400)**: Body text, descriptions
- **Monospace**: All text uses monospace

### Line Height
- **Tight (1.2)**: Headers
- **Normal (1.5)**: Body text
- **Loose (1.8)**: Readable content

---

## 🔲 Component Styles

### Cards/Panels
```css
/* Base Card */
.card-base {
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.card-base:hover {
  border-color: #00ff00;
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.2);
}
```

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #00ff00, #00cc00);
  color: #000;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-primary:hover {
  box-shadow: 0 0 15px #00ff00;
  transform: translateY(-2px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #00ff00;
  border: 1px solid #00ff00;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-secondary:hover {
  background: #00ff00;
  color: #000;
}
```

#### Danger Button
```css
.btn-danger {
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-danger:hover {
  box-shadow: 0 0 15px #ff0000;
}
```

### Badges/Status Indicators
```css
/* Active Status */
.badge-active {
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* Warning Status */
.badge-warning {
  background: rgba(255, 170, 0, 0.2);
  border: 1px solid #ffaa00;
  color: #ffaa00;
}

/* Critical Status */
.badge-critical {
  background: rgba(255, 0, 0, 0.2);
  border: 1px solid #ff0000;
  color: #ff0000;
}
```

---

## 📐 Spacing & Layout

### Spacing Scale
```
4px:  gap-1,  p-1
8px:  gap-2,  p-2
12px: gap-3,  p-3
16px: gap-4,  p-4
24px: gap-6,  p-6  (Most common)
32px: gap-8,  p-8
48px: gap-12, p-12
```

### Grid System
```css
/* Main Dashboard Grid */
grid-cols-12    /* Flexible 12-column layout */
gap-6           /* 24px spacing between sections */

/* Component Grids */
grid-cols-2     /* 2-column layout (2-item sections) */
grid-cols-3     /* 3-column layout (3-item sections) */
grid-cols-4     /* 4-column layout (4-item sections) */
```

### Common Layouts
```
Dashboard Layout:
┌─────────────────────────────────────────┐
│         HEADER (64px)                   │
├──────────────┬──────────────────────────┤
│              │                          │
│   SIDEBAR    │     MAIN CONTENT        │
│  (256px)     │                          │
│              │                          │
└──────────────┴──────────────────────────┘

Content Sections:
┌─ Primary Content (2/3 width) ─┬─ Secondary (1/3) ─┐
│ Large visualization/graph      │ Control panel      │
│                                │ Status indicators  │
├─────────────────────────────────┴────────────────────┤
│ Secondary Content (full width)                       │
│ Multiple cards in responsive grid                    │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Effects & Animations

### Neon Glow Effect
```css
.cyber-neoneffect {
  box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
  transition: box-shadow 0.3s ease;
}

.cyber-neoneffect:hover {
  box-shadow: 0 0 15px #00ff00, 0 0 30px #00ff00;
}
```

### Text Glow
```css
.text-glow {
  text-shadow: 0 0 5px currentColor;
}
```

### Pulse Animation
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px #00ff00; }
  50% { box-shadow: 0 0 20px #00ff00; }
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### Scan Line Effect
```css
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.scan-effect {
  animation: scan-line 3s linear infinite;
  height: 2px;
  background: linear-gradient(to bottom, transparent, #00ff00, transparent);
}
```

### Component Entrance
```tsx
// Standard component animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, delay: 0.1 }}

// Staggered group animation
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
  />
))}
```

### Interactive Animations
```tsx
// Button hover/tap
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Card hover
whileHover={{ borderColor: "rgba(0, 255, 0, 0.5)" }}
```

---

## 🎯 Visual Hierarchy

### Size & Importance
1. **Primary Heading** (text-4xl, bold) - Page title
2. **Secondary Heading** (text-2xl, bold) - Section title
3. **Card Title** (text-lg, bold) - Component title
4. **Body Text** (text-base) - Main content
5. **Secondary Text** (text-sm) - Descriptions
6. **Tertiary Text** (text-xs) - Metadata, timestamps

### Color & Importance
1. **Green (#00ff00)** - Primary actions, important data
2. **White/Light Gray** - Primary text content
3. **Green-700** - Secondary text, less important
4. **Red (#ff0000)** - Critical alerts, dangers
5. **Orange (#ffaa00)** - Warnings, caution

### Weight & Importance
- **Bold + Large + Bright** - Most important
- **Normal + Medium + Medium Color** - Standard content
- **Light + Small + Dark Color** - Supporting information

---

## 🎨 Dark Mode Specifications

### Background Palette
```
Level 0: #000000 - Pure black (accents only)
Level 1: #050505 - Main background
Level 2: #0a0a0a - Slightly lighter
Level 3: #1a1a1a - Cards, panels
Level 4: rgba(0,0,0,0.8) - Overlays
Level 5: rgba(0,0,0,0.5) - Lighter overlays
```

### Contrast Ratios (WCAG AA)
- Green text on black: 5.5:1 ✅
- White text on black: 21:1 ✅
- Green accent borders: 4.5:1 ✅

---

## 📊 Data Visualization

### Network Map
- **Nodes**: Color by status (green/yellow/red)
- **Connections**: Line style by type (solid/dashed/dotted)
- **Labels**: Small text below nodes
- **Animation**: Continuous subtle movement

### Threat Levels
- **Low (1-3)**: Green (#00ff00)
- **Medium (4-6)**: Orange (#ffaa00)
- **High (7-9)**: Red (#ff0000)
- **Critical (10)**: Red with glow

### Trend Indicators
- **Up Trend**: Red text (increase in threats is bad)
- **Down Trend**: Green text (decrease is good)
- **Neutral**: Gray text

---

## 🎯 Button Style Reference

### Primary Buttons
**Location**: Main actions, emphasis needed
**Style**: Green gradient background
**Text**: White/Black, UPPERCASE, bold
**Size**: 8px 16px padding

### Secondary Buttons
**Location**: Less critical actions
**Style**: Transparent + green border
**Text**: Green, UPPERCASE, bold
**Size**: 8px 16px padding

### Danger Buttons
**Location**: Destructive actions, danger zone
**Style**: Red gradient background
**Text**: White, UPPERCASE, bold
**Size**: 8px 16px padding
**Warning**: Requires visual distinction

---

## 🔧 Implementation Checklist

When creating new UI elements:
- [ ] Use monospace fonts
- [ ] Apply dark background
- [ ] Add green/red accents appropriately
- [ ] Include border (1px #1a1a1a)
- [ ] Add hover effects
- [ ] Ensure 4.5:1 contrast ratio
- [ ] Use Tailwind utility classes
- [ ] Include smooth transitions (0.3s)
- [ ] Add micro-interactions where possible
- [ ] Test on dark monitors

---

## 📱 Responsive Breakpoints

Currently optimized for **1024px+ desktop**.

Recommended additions for mobile:
```tsx
className="
  grid-cols-1           // Mobile: 1 column
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  xl:grid-cols-4        // Wide: 4 columns
"
```

---

## 🎓 Best Practices

1. **Consistency**: Always use the defined color palette
2. **Spacing**: Maintain gap-6 between major sections
3. **Borders**: Use 1px green borders, avoid thick borders
4. **Text**: Keep all text monospace
5. **Icons**: Pair all icons with text labels
6. **Feedback**: Provide visual feedback on all interactions
7. **Performance**: Minimize number of animated elements
8. **Accessibility**: Ensure keyboard navigation works
9. **Contrast**: Check all text has 4.5:1 ratio
10. **Typography**: Use UPPERCASE for labels/headers

---

**Last Updated**: January 25, 2026
**Version**: 2.0
**Status**: Production Ready
