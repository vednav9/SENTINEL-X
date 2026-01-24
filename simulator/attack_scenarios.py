import asyncio
import random
from .log_generator import LogGenerator
from memory.event_bus import bus

class AttackSimulator:
    def __init__(self):
        self.generator = LogGenerator()

    async def run_scenario_brute_force(self):
        """
        Scenario 1: Brute Force Attack
        - Multiple failed SSH logins from single IP
        - Followed by one success (optional, to simulate breach)
        """
        attacker_ip = "192.168.1.105"
        target_user = "admin"
        
        await bus.publish("SimulationInfo", {"message": f"[*] Simulating Brute Force Attack from {attacker_ip}..."})
        print(f"[*] Simulating Brute Force Attack from {attacker_ip}...")
        
        # 1. Normal noise
        log = self.generator.generate_api_request("/health", "10.0.0.5", 200)
        await bus.publish("LogEvent", log)
        
        # 2. Attack start
        for _ in range(5):
            log = self.generator.generate_ssh_login_fail(target_user, attacker_ip)
            await bus.publish("LogEvent", log)
            await asyncio.sleep(0.5) # Slowed down slightly for visualization
        
        # 3. Successful breach (Lateral movement start)
        log = self.generator.generate_ssh_login_success(target_user, attacker_ip)
        await bus.publish("LogEvent", log)
        await bus.publish("SimulationInfo", {"message": "[!] Attack Simulation Complete: Brute Force + Initial Breach"})
        print("[!] Attack Simulation Complete: Brute Force + Initial Breach")

    async def run_scenario_lateral_movement(self):
        """
        Scenario 2: Suspicious API usage after login
        """
        attacker_ip = "192.168.1.105"
        
        await bus.publish("SimulationInfo", {"message": f"[*] Simulating Lateral Movement / Data Exfil..."})
        print(f"[*] Simulating Lateral Movement / Data Exfil...")
        endpoints = ["/api/v1/users", "/api/v1/config/secrets", "/api/v1/db/dump"]
        
        for ep in endpoints:
            log = self.generator.generate_api_request(ep, attacker_ip, 200)
            await bus.publish("LogEvent", log)
            await asyncio.sleep(0.5)
            
        await bus.publish("SimulationInfo", {"message": "[!] Attack Simulation Complete: Suspicious API Usage"})
        print("[!] Attack Simulation Complete: Suspicious API Usage")
