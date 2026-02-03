# SENTINEL-X Dashboard - Quick Start Guide

## 🚀 Accessing the Dashboard

### URLs
- **Dashboard**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (if Swagger enabled)
- **WebSocket**: ws://localhost:8000/events

---

## 📊 Dashboard Pages Overview

### 1. **Overview (Home)**
**URL**: http://localhost:3000
- **What you see**: Complete system overview with all key metrics
- **Key Components**:
  - Real-time system status
  - 4 metric cards (Threats, Events, Agents, Uptime)
  - Attack Vector Graph
  - Agent Reasoning panel
  - Threat Monitor
  - Live Log Feed
  - System Status dashboard

**Best For**: Getting a complete picture of system health

---

### 2. **Threats**
**URL**: http://localhost:3000/threats
- **What you see**: List of all detected threats with detailed information
- **Features**:
  - Threat severity indicators (Critical, High, Medium, Low)
  - Source IP tracking
  - Detection timestamp
  - Current status (Active, Mitigated, Investigating)
  - Quick actions (Investigate, Mitigate, Details)

**Best For**: Threat investigation and incident response

---

### 3. **Live Events**
**URL**: http://localhost:3000/events
- **What you see**: Real-time event stream
- **Features**:
  - Event filtering (Critical, Error, Warning, Info)
  - Real-time updates via WebSocket
  - Timestamp tracking
  - Color-coded by severity

**Best For**: Monitoring system activity in real-time

---

### 4. **Autonomous Agents**
**URL**: http://localhost:3000/agents
- **What you see**: Status of all 5 autonomous agents
- **Agents**:
  1. **Detection Agent** (Red) - Analyzes logs for threats
  2. **Intelligence Agent** (Orange) - Correlates threat data
  3. **Root Cause Agent** (Yellow) - Determines incident cause
  4. **Response Agent** (Green) - Executes mitigation
  5. **Learning Agent** (Blue) - Improves detection models

**Features**:
- Agent status (Active/Idle/Error)
- Uptime tracking
- Task processing metrics
- Performance overview

**Best For**: Understanding agent system performance

---

### 5. **Attack Map**
**URL**: http://localhost:3000/attackmap
- **What you see**: Geographic distribution of threats
- **Regions**:
  - North America
  - Europe
  - Asia Pacific
  - South America
  - Africa
  - Middle East

**Features**:
- Regional threat count
- Interactive region selection
- Detailed threat breakdown per region
- Visual attack vector graph

**Best For**: Understanding global threat landscape

---

### 6. **Analytics**
**URL**: http://localhost:3000/analytics
- **What you see**: System metrics and statistics
- **Visualizations**:
  - **Threat Detection Trend**: 24-hour threat detection chart
  - **Agent Performance**: Accuracy metrics for each agent
  - **Threat Type Distribution**: Breakdown by attack type
    - Brute Force Attacks
    - SQL Injections
    - DDoS Attacks
    - Malware
    - Other threats

**Best For**: Analyzing system performance and trends

---

### 7. **Reports**
**URL**: http://localhost:3000/reports
- **What you see**: Generated security reports
- **Report Types**:
  - Daily Security Summary
  - Weekly Threat Analysis
  - Monthly Incident Report
  - Quarterly Review

**Features**:
- Report generation
- Download reports as files
- Report metadata (Date, Type, Threat Count)

**Best For**: Compliance and documentation

---

### 8. **Settings**
**URL**: http://localhost:3000/settings
- **What you see**: System configuration options
- **Settings Sections**:
  1. **Notifications**
     - Enable/Disable notifications
     - Email alerts
     - Auto-response
  
  2. **Security**
     - Two-Factor Authentication
     - IP Whitelisting
     - Session Timeout
  
  3. **Data Management**
     - Data retention period
     - Auto-backup
     - Export logs
  
  4. **API Configuration**
     - API key management
     - Custom endpoint
     - Connection testing

**Best For**: Customizing system behavior

---

## 🎨 Navigation Menu (Sidebar)

Located on the left side of all pages:

```
┌─────────────────────────┐
│  SENTINEL-X             │
│  Security Dashboard     │
│  ● SYSTEM ONLINE        │
├─────────────────────────┤
│                         │
│  🛡️  Overview           │
│  ⚠️  Threats            │
│  ⚡ Live Events         │
│  📍 Attack Map          │
│  💻 Agents              │
│  📊 Analytics           │
│  📚 Reports             │
│  ⚙️  Settings           │
│                         │
├─────────────────────────┤
│  Status                 │
│  5 Agents Active        │
│  0 Critical Threats     │
│                         │
│  [Exit System]          │
└─────────────────────────┘
```

**Features**:
- Click any item to navigate
- Active page is highlighted
- Mobile-responsive (tap hamburger menu)
- System status at bottom

---

## 🔴 Color Coding Guide

### Severity Levels
- **🔴 Critical**: Highest priority, immediate action needed
- **🟠 High**: Significant threat, requires investigation
- **🟡 Medium**: Potential threat, monitor closely
- **🟢 Low**: Minor issue, can wait

### Agent Colors
- **Red**: Detection Agent
- **Orange**: Intelligence Agent
- **Yellow**: Root Cause Agent
- **Green**: Response Agent
- **Blue**: Learning Agent

### Component Borders
- **Green**: Normal/Info sections
- **Red**: Critical/Threat sections
- **Purple**: Agent reasoning
- **Cyan**: System metrics
- **Blue**: API/Configuration
- **Amber**: Reports

---

## ⚡ Quick Tips

1. **Real-time Updates**
   - Dashboard updates automatically via WebSocket
   - No need to refresh manually
   - Watch threat counts update in real-time

2. **Navigation Shortcuts**
   - Use sidebar to jump between pages instantly
   - Each page has dedicated purpose
   - Breadcrumbs show current location

3. **Filtering Data**
   - Events page: Filter by severity
   - Threats page: View by status
   - Agents page: Check individual performance

4. **Exporting**
   - Reports page: Download security reports
   - Analytics page: View detailed metrics
   - Settings: Configure auto-backup

5. **Mobile Access**
   - Dashboard is responsive
   - Click menu icon (☰) on mobile
   - Touch-friendly buttons
   - Optimized layouts

---

## 🔧 System Requirements

- **Browser**: Chrome, Firefox, Safari, Edge (modern versions)
- **Internet**: Local network or localhost access
- **Port**: 3000 (Dashboard), 8000 (API)
- **WebSocket**: Enabled (for real-time updates)

---

## 📞 Support

- **API Issues**: Check http://localhost:8000
- **Dashboard Issues**: Clear browser cache and refresh
- **WebSocket Issues**: Check console for errors
- **System Status**: Check Overview page for system health

---

## 🎯 Common Tasks

### Check Current Threats
1. Click **Threats** in sidebar
2. View threat list sorted by severity
3. Click **Details** on any threat

### Monitor System Health
1. Go to **Overview** (default page)
2. Check metric cards at top
3. View system status panel

### View Agent Performance
1. Click **Agents** in sidebar
2. See all 5 agents and their stats
3. Check accuracy and uptime metrics

### Download Security Report
1. Click **Reports** in sidebar
2. Choose report type
3. Click **Download** button

### Configure System
1. Click **Settings** in sidebar
2. Toggle options as needed
3. Test API connection
4. Save settings

---

## 📈 Next Steps

1. **Monitor System**: Use Overview page regularly
2. **Investigate Threats**: Go to Threats page
3. **Analyze Data**: Check Analytics for insights
4. **Generate Reports**: Use Reports page for compliance
5. **Customize**: Configure Settings as needed

---

**Dashboard Status**: ✅ Running
**Last Updated**: February 3, 2026
**Version**: 2.0
