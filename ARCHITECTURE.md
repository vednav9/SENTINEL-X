# SENTINEL-X Dashboard Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SENTINEL-X v2.0 ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐                  ┌──────────────────────────┐
│    FRONTEND (Next.js/React)  │                  │    BACKEND (FastAPI)     │
│    Running on :3000          │                  │    Running on :8000      │
├──────────────────────────────┤                  ├──────────────────────────┤
│                              │                  │                          │
│  ┌──────────────────────┐    │                  │  ┌────────────────────┐  │
│  │   NAVIGATION (Sidebar)   │                  │  │   Agent System     │  │
│  ├──────────────────────┤    │                  │  ├────────────────────┤  │
│  │ • Overview           │    │                  │  │ • Detection Agent  │  │
│  │ • Threats            │    │                  │  │ • Intel Agent      │  │
│  │ • Live Events        │    │                  │  │ • RootCause Agent  │  │
│  │ • Attack Map         │    │                  │  │ • Response Agent   │  │
│  │ • Agents             │    │                  │  │ • Learning Agent   │  │
│  │ • Analytics          │    │                  │  └────────────────────┘  │
│  │ • Reports            │    │                  │                          │
│  │ • Settings           │    │                  │  ┌────────────────────┐  │
│  └──────────────────────┘    │                  │  │    Event Bus       │  │
│                              │ ◄────WebSocket────► │ (EventEmitter)    │  │
│  ┌──────────────────────┐    │                  │  └────────────────────┘  │
│  │    COMPONENTS        │    │                  │                          │
│  ├──────────────────────┤    │                  │  ┌────────────────────┐  │
│  │ • StatCard           │    │                  │  │   Simulators       │  │
│  │ • AttackGraph        │    │                  │  ├────────────────────┤  │
│  │ • ThreatMonitor      │    │                  │  │ • Attack Scenarios │  │
│  │ • AgentBrain         │    │                  │  │ • Log Generator    │  │
│  │ • LiveLogFeed        │    │                  │  └────────────────────┘  │
│  │ • Navigation         │    │                  │                          │
│  └──────────────────────┘    │                  │  ┌────────────────────┐  │
│                              │                  │  │   Tools/APIs       │  │
│                              │                  │  ├────────────────────┤  │
│  ┌──────────────────────┐    │                  │  │ • Log Query        │  │
│  │    PAGES (Routes)    │    │                  │  │ • Threat Intel     │  │
│  ├──────────────────────┤    │                  │  │ • Network Control  │  │
│  │ /                    │    │                  │  │ • Identity Control │  │
│  │ /threats             │    │                  │  └────────────────────┘  │
│  │ /events              │    │                  │                          │
│  │ /attackmap           │    │                  └──────────────────────────┘
│  │ /agents              │    │
│  │ /analytics           │    │
│  │ /reports             │    │
│  │ /settings            │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │    UI/UX FEATURES    │    │
│  ├──────────────────────┤    │
│  │ • Responsive Design  │    │
│  │ • Dark Theme         │    │
│  │ • Smooth Animations  │    │
│  │ • Real-time Updates  │    │
│  │ • Color Coding       │    │
│  │ • Progress Tracking  │    │
│  └──────────────────────┘    │
│                              │
└──────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW DIAGRAM                             │
└─────────────────────────────────────────────────────────────────────┘

ATTACK/EVENT DETECTION
        ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Detection Agent (Analyzes Logs & Events)                    │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Intel Agent (Correlates Data with External Sources)         │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Root Cause Agent (Determines Root Cause)                    │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Response Agent (Executes Mitigation)                        │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Learning Agent (Improves Models)                            │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Event Bus (Broadcasts Events via WebSocket)                 │
    └────────────────────────┬────────────────────────────────────┘
                             ↓
    ┌─────────────────────────────────────────────────────────────┐
    │ Dashboard Updates (Real-time visualization)                 │
    └─────────────────────────────────────────────────────────────┘
```

## Component Communication

```
┌──────────────────────────────────────────────────────────────────┐
│                   COMPONENT INTERACTION MODEL                    │
└──────────────────────────────────────────────────────────────────┘

Dashboard (Overview)
    ├─ Navigation
    │   └─ Routes to other pages
    │
    ├─ Header
    │   ├─ Status Indicator
    │   └─ Stat Cards (4 metrics)
    │
    ├─ Main Content
    │   ├─ AttackGraph Component
    │   │   └─ WebSocket ← Events from Backend
    │   │
    │   ├─ AgentBrain Component
    │   │   └─ WebSocket ← Agent Reasoning events
    │   │
    │   ├─ ThreatMonitor Component
    │   │   └─ WebSocket ← Suspicious Event alerts
    │   │
    │   ├─ LiveLogFeed Component
    │   │   └─ WebSocket ← Real-time logs
    │   │
    │   └─ System Status Panel
    │       ├─ CPU Progress
    │       ├─ Memory Progress
    │       ├─ Network Progress
    │       └─ Agent List

Other Pages (Threats, Events, etc.)
    ├─ Threat Intelligence
    ├─ Event Stream
    ├─ Agent Dashboard
    ├─ Geographic Map
    ├─ Analytics Charts
    ├─ Report Management
    └─ System Settings
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      TECHNOLOGY STACK                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FRONTEND (Dashboard)                                           │
│  ├─ Framework: Next.js 16.x (React 19.x)                       │
│  ├─ Language: TypeScript                                        │
│  ├─ Styling: Tailwind CSS                                      │
│  ├─ Animations: Framer Motion                                  │
│  ├─ Icons: Lucide React                                        │
│  ├─ State: React Hooks (useState, useEffect, useRef)          │
│  └─ Communication: WebSocket                                   │
│                                                                  │
│  BACKEND (API)                                                  │
│  ├─ Framework: FastAPI                                         │
│  ├─ Language: Python 3.13                                      │
│  ├─ Server: Uvicorn                                            │
│  ├─ WebSocket: Starlette WebSocket                             │
│  ├─ Event Bus: Custom EventBus class                           │
│  ├─ AI: Google Generative AI                                   │
│  └─ CORS: Enabled for all origins                              │
│                                                                  │
│  AGENTS (Multi-Agent System)                                    │
│  ├─ Detection Agent (Threat detection)                         │
│  ├─ Intelligence Agent (Data correlation)                      │
│  ├─ Root Cause Agent (Incident analysis)                       │
│  ├─ Response Agent (Automated response)                        │
│  └─ Learning Agent (Model improvement)                         │
│                                                                  │
│  UTILITIES                                                      │
│  ├─ Simulators (Attack scenarios, Log generation)              │
│  ├─ Tools (Network, Identity, Log Query, Threat Intel)         │
│  ├─ Memory (Event Bus)                                         │
│  └─ Terraform (Infrastructure as Code)                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Port Mapping

```
┌─────────────────────────────────────────────────────────┐
│              PORT CONFIGURATION                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Port 3000  ─── Dashboard (http://localhost:3000)      │
│             ├─ Next.js Dev Server                      │
│             └─ Hot reload enabled                      │
│                                                         │
│  Port 8000  ─── API Backend (http://localhost:8000)    │
│             ├─ FastAPI server                          │
│             ├─ Uvicorn running                         │
│             ├─ GET  /          (Status check)          │
│             ├─ WS   /events    (WebSocket stream)      │
│             └─ CORS Enabled                            │
│                                                         │
│  Port 5432  ─── PostgreSQL (if configured)             │
│  Port 6379  ─── Redis (if configured)                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│               DEPLOYMENT CONFIGURATION                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Local Development                                          │
│  ├─ Dashboard: npm run dev (Next.js dev server)            │
│  ├─ Backend: python -m uvicorn (FastAPI dev server)        │
│  └─ Both auto-reload on file changes                       │
│                                                              │
│  Production (with Deployment Script)                        │
│  ├─ Run: python deploy.py                                  │
│  ├─ Starts API server (Port 8000)                          │
│  ├─ Starts Dashboard (Port 3000)                           │
│  └─ Manages both processes simultaneously                   │
│                                                              │
│  Docker Deployment (Available)                             │
│  ├─ Frontend Dockerfile (dashboard/)                       │
│  └─ Backend runs in container (via docker-compose)         │
│                                                              │
│  Cloud Deployment (Terraform)                              │
│  ├─ Infrastructure files (terraform/)                      │
│  ├─ GCP deployment ready                                   │
│  └─ Scalable architecture                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## File Organization

```
SENTINEL-X/
├── dashboard/                    # Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx             # Overview page
│   │   ├── threats/page.tsx      # Threats page
│   │   ├── events/page.tsx       # Events page
│   │   ├── agents/page.tsx       # Agents page
│   │   ├── attackmap/page.tsx    # Attack Map page
│   │   ├── analytics/page.tsx    # Analytics page
│   │   ├── reports/page.tsx      # Reports page
│   │   ├── settings/page.tsx     # Settings page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── Navigation.tsx        # Sidebar menu
│       ├── StatCard.tsx          # Stat card component
│       ├── AgentBrain.tsx        # Agent reasoning
│       ├── AttackGraph.tsx       # Attack visualization
│       ├── LiveLogFeed.tsx       # Live logs
│       └── ThreatMonitor.tsx     # Threat alerts
│
├── api/                          # Backend (FastAPI)
│   └── server.py                 # API server
│
├── agents/                       # Multi-agent system
│   ├── base_agent.py
│   ├── detection_agent/
│   ├── intel_agent/
│   ├── learning_agent/
│   ├── response_agent/
│   └── root_cause_agent/
│
├── memory/                       # Event bus (New)
│   ├── __init__.py
│   └── event_bus.py
│
├── simulator/                    # Attack simulation
│   ├── attack_scenarios.py
│   └── log_generator.py
│
├── tools/                        # Utility tools
│   ├── identity_control.py
│   ├── log_query.py
│   ├── network_control.py
│   └── threat_intel.py
│
├── terraform/                    # Infrastructure
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── deploy.py                     # Deployment script (New)
├── main.py                       # Main entry point
├── .env                          # Environment config (New)
├── requirements.txt              # Python dependencies
├── UI_IMPROVEMENTS.md            # UI changelog (New)
└── DASHBOARD_GUIDE.md            # User guide (New)
```

---

**Architecture Version**: 2.0
**Last Updated**: February 3, 2026
**Status**: ✅ Fully Operational
