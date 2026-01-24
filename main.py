import os
import asyncio
from dotenv import load_dotenv
from termcolor import cprint

# Import Agents
from agents.detection_agent.agent import ThreatDetectionAgent
from agents.intel_agent.agent import ThreatIntelAgent
from agents.root_cause_agent.agent import RootCauseAgent
from agents.response_agent.agent import ResponseAgent
from agents.learning_agent.agent import LearningAgent

# Import Simulator
from simulator.attack_scenarios import AttackSimulator

# Import Event Bus
from memory.event_bus import bus

# Load environment variables
load_dotenv()

async def main():
    cprint("\n" + "="*80, "cyan", attrs=["bold"])
    cprint("🔐 SENTINEL-X: Autonomous AI Security System", "cyan", attrs=["bold"])
    cprint("="*80 + "\n", "cyan", attrs=["bold"])
    
    # Check for API key
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key or api_key.strip() == "":
        cprint("❌ ERROR: GOOGLE_API_KEY not found in .env file!", "red", attrs=["bold"])
        cprint("Please add your Google API key to the .env file and try again.\n", "yellow")
        return
    
    # 1. Initialize Agents
    cprint("[*] Initializing Multi-Agent System...", "white", attrs=["bold"])
    try:
        detect_agent = ThreatDetectionAgent()
        intel_agent = ThreatIntelAgent()
        root_agent = RootCauseAgent()
        resp_agent = ResponseAgent()
        learn_agent = LearningAgent()
        cprint("    ✓ Threat Detection Agent [ONLINE]", "green")
        cprint("    ✓ Threat Intel Agent [ONLINE]", "green")
        cprint("    ✓ Root Cause Agent [ONLINE]", "green")
        cprint("    ✓ Response Agent [ONLINE]", "green")
        cprint("    ✓ Learning Agent [ONLINE]", "green")
    except Exception as e:
        cprint(f"❌ Failed to initialize agents: {e}", "red")
        return

    # 2. Run Attack Simulation
    cprint("\n" + "="*80, "red", attrs=["bold"])
    cprint("⚠️  ATTACK SIMULATION STARTING", "red", attrs=["bold"])
    cprint("="*80, "red", attrs=["bold"])
    simulator = AttackSimulator()
    # Scenario 1: Brute Force
    simulator.run_scenario_brute_force()
    
    # 3. Agentic Loop Start
    cprint("\n" + "="*80, "cyan", attrs=["bold"])
    cprint("🛡️  DEFENSE GRID ACTIVATED", "cyan", attrs=["bold"])
    cprint("="*80, "cyan", attrs=["bold"])
    
    # Trigger Detection
    # In a real system, this would be a continuous loop
    try:
        await detect_agent.monitor()
    except Exception as e:
        cprint(f"❌ Error during detection: {e}", "red")
    
    # Allow time for async event bus to propagate through all agents
    # Detection -> Intel -> RootCause -> Response -> Learning
    cprint("\n[*] Waiting for agent communication chain to complete...", "yellow")
    await asyncio.sleep(15)
    
    # 4. Display Event History
    cprint("\n" + "="*80, "cyan", attrs=["bold"])
    cprint("📊 SIMULATION COMPLETE - Event Chain Summary", "cyan", attrs=["bold"])
    cprint("="*80, "cyan", attrs=["bold"])
    bus.print_history()
    
    cprint("\n" + "="*80, "green", attrs=["bold"])
    cprint("✅ SENTINEL-X Simulation Ended Successfully", "green", attrs=["bold"])
    cprint("="*80 + "\n", "green", attrs=["bold"])

if __name__ == "__main__":
    asyncio.run(main())
