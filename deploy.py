#!/usr/bin/env python3
"""Deployment script for SENTINEL-X"""
import subprocess
import time
import sys
import os
from pathlib import Path

def main():
    root_dir = Path(__file__).parent
    
    print("=" * 80)
    print("🔐 SENTINEL-X Deployment Script")
    print("=" * 80)
    
    # Start API Server
    print("\n[1/2] Starting FastAPI Backend Server...")
    api_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", "8000"],
        cwd=root_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    print("✓ API Server started (PID: {})".format(api_process.pid))
    
    # Give API time to start
    time.sleep(3)
    
    # Start Dashboard
    print("\n[2/2] Starting Next.js Dashboard...")
    dashboard_dir = root_dir / "dashboard"
    dashboard_process = subprocess.Popen(
        "npm run dev",
        cwd=dashboard_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True
    )
    print("✓ Dashboard started (PID: {})".format(dashboard_process.pid))
    
    print("\n" + "=" * 80)
    print("✅ SENTINEL-X DEPLOYMENT COMPLETE!")
    print("=" * 80)
    print("\n📊 Services Running:")
    print("   • API Server:  http://localhost:8000")
    print("   • Dashboard:   http://localhost:3000")
    print("   • WebSocket:   ws://localhost:8000/events")
    print("\n[Press Ctrl+C to stop all services]\n")
    
    try:
        # Keep the processes running
        api_process.wait()
        dashboard_process.wait()
    except KeyboardInterrupt:
        print("\n\nShutting down services...")
        api_process.terminate()
        dashboard_process.terminate()
        api_process.wait()
        dashboard_process.wait()
        print("✓ All services stopped")
        sys.exit(0)

if __name__ == "__main__":
    main()
