# SENTINEL-X Dashboard - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Navigate to Dashboard
```bash
cd dashboard
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

---

## 📊 Dashboard Overview

### Main Sections

#### 1. **Control Panel Sidebar** (Right Side)
- **Primary Buttons**: Activate System, Enable Shield, Send Alert, Reset System
- **Secondary Buttons**: Restart Services, Connect Network, Settings, Deploy
- **Danger Zone**: Emergency Stop, Lock System
- **Status Indicators**: Real-time system status display

#### 2. **Network Topology Map** (Top Center)
- Interactive canvas-based network visualization
- Click nodes to view details
- Hover for highlighting
- Color-coded threat levels

#### 3. **Threat Monitor** (Right Column)
- Real-time threat detection
- Live alerts and notifications
- Severity indicators

#### 4. **Live Logs** (Right Column)
- System log feed
- Real-time event tracking
- Timestamped entries

#### 5. **Attack Graph** (Bottom Left)
- Visual attack vector representation
- Node relationships
- Timeline progression

#### 6. **Agent Brain** (Bottom Right)
- AI reasoning display
- Decision logic
- Confidence scores

#### 7. **System Metrics** (Bottom Full Width)
- CPU Usage
- Memory Usage
- Network Activity
- Active Agents Count

#### 8. **Live Statistics** (Bottom Full Width)
- Real-time stats panel
- Detailed metrics breakdown
- Trend indicators

---

## 🔘 Button Quick Reference

### Primary Actions (Green)
| Button | Action | Location |
|--------|--------|----------|
| Activate System | Powers on system | Control Panel |
| Enable Shield | Toggles protection | Control Panel |
| Send Alert | Sends notification | Control Panel |
| Reset System | Resets to defaults | Control Panel |

### Secondary Actions (Green Border)
| Button | Action | Location |
|--------|--------|----------|
| Restart Services | Restarts processes | Control Panel |
| Connect Network | Connects networks | Control Panel |
| Settings | Opens config | Control Panel |
| Deploy | Deploys changes | Control Panel |

### Danger Actions (Red) ⚠️
| Button | Action | Location |
|--------|--------|----------|
| Emergency Stop | Stops everything | Control Panel |
| Lock System | Locks access | Control Panel |

---

## 🎨 Theme & Colors

### Color Scheme
- **Primary Accent**: Bright Green (#00ff00)
- **Background**: Deep Black (#050505)
- **Danger**: Red (#ff0000)
- **Warning**: Orange (#ffaa00)

### Apply Custom Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #00ff00;      /* Change primary color */
  --secondary: #ff0080;    /* Change secondary */
  --border-color: #1a1a1a; /* Change border */
}
```

---

## 🛠️ Common Tasks

### Add a New Button
1. Edit `components/ControlPanel.tsx`
2. Add button config to array:
```tsx
{
  id: "BTN_NEW",
  label: "New Action",
  icon: <NewIcon size={16} />,
  color: "btn-primary",
  action: () => handleNewAction(),
}
```
3. Add handler function
4. Save and refresh

### Change Button Colors
Edit the button className:
```tsx
// Primary (green)
className="btn-primary"

// Secondary (green border)
className="btn-secondary"

// Danger (red)
className="btn-danger"
```

### Add New Section
In `app/page.tsx`:
```tsx
<Section title="NEW SECTION">
  <YourComponent />
</Section>
```

### Customize Grid Layout
Change grid columns:
```tsx
<DashboardGrid cols={3} gap={6}>  {/* cols: 2/3/4 */}
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete documentation |
| `BUTTON_REFERENCE.md` | All button specifications |
| `STYLE_GUIDE.md` | Design system & guidelines |
| `IMPLEMENTATION_SUMMARY.md` | What was implemented |

---

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Run production build locally
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

---

## 🎯 Interactive Features

### Network Map
- **Hover**: Highlights nodes
- **Click**: Shows node details in panel
- **Animation**: Continuous real-time updates

### Buttons
- **Hover**: Scales up with glow
- **Click**: Scales down feedback
- **Active**: Visual state change

### Cards
- **Hover**: Border glows green
- **Click** (Metrics): Shows selection state

### Status Indicators
- **Pulse**: Animated live indicators
- **Color**: Green (active), Red (critical), Orange (warning)

---

## 🚨 Status Indicators Explained

### System Status (Top Right)
- 🟢 **Green**: System online and operational
- 🔴 **Red**: System offline or error

### Shield Status
- **PROTECTED**: Shield is active
- **NORMAL**: Shield is inactive

### Network Status
- **CONNECTED**: Network operational
- **DISCONNECTED**: Network down

### Threats
- Shows active threat count
- Updates in real-time

---

## 💡 Tips & Tricks

1. **Dark Monitor**: Best viewed on dark/OLED monitors
2. **Fullscreen**: Press F11 for immersive experience
3. **DevTools**: F12 to debug and modify styles
4. **Real-time**: Logs and metrics update continuously
5. **Animations**: All interactive elements have smooth transitions

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows (PowerShell):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Linux/Mac:
lsof -i :3000
kill -9 <PID>
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### Port Not Connecting
- Check firewall settings
- Try http://127.0.0.1:3000 instead
- Ensure no VPN blocking localhost

---

## 📖 File Navigation Guide

```
Key Files to Edit:
├── Buttons → components/ControlPanel.tsx
├── Layout → components/DashboardLayout.tsx
├── Styling → app/globals.css
├── Page → app/page.tsx
└── Header → components/DashboardHeader.tsx

Reference:
├── Buttons Info → BUTTON_REFERENCE.md
├── Styling Info → STYLE_GUIDE.md
└── Full Docs → README.md
```

---

## 🎓 Next Steps

1. **Customize buttons** - Add your own actions
2. **Connect backend** - Integrate with API
3. **Add authentication** - Secure the dashboard
4. **Real data** - Connect to live threat data
5. **Mobile support** - Add responsive design
6. **Export** - Add report generation

---

## 📞 Support

### Questions About...
- **Buttons**: See `BUTTON_REFERENCE.md`
- **Design**: See `STYLE_GUIDE.md`
- **Components**: See `README.md`
- **Setup**: Check this file

### Quick Links
- Dashboard: http://localhost:3000
- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

## ✅ Verification Checklist

Make sure you have:
- [ ] Node.js installed
- [ ] Opened dashboard folder
- [ ] Ran `npm install`
- [ ] Server running with `npm run dev`
- [ ] Browser opened to localhost:3000
- [ ] See dark theme with green accents
- [ ] All buttons visible in sidebar
- [ ] Network map displays
- [ ] Components animate smoothly

---

## 🎉 You're All Set!

Your professional SENTINEL-X dashboard is ready to use. Explore the interface, test the buttons, and customize as needed.

**Dashboard URL**: http://localhost:3000

**Version**: 2.0.0
**Last Updated**: January 25, 2026
