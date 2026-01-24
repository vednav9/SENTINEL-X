from ..base_agent import BaseAgent
from memory.event_bus import bus
from tools.log_query import query_logs
import json

class RootCauseAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Root Cause Agent",
            tools=[query_logs]
        )
        self.model._system_instruction = """
        You are the Root Cause Analysis Agent.
        Your goal is to reconstruct the attack timeline and identify the entry point.
        
        PROCEDURE:
        1. Receive "ConfirmedThreat".
        2. Look at the attacker IP (from 'attacker_ip' field) and target user.
        3. Query logs to find the FIRST occurrence (Entry Point).
        4. Query logs to see what happened AFTER (Blast Radius).
        5. Generate a human-readable explanation.
        6. Output JSON: { "type": "IncidentReport", "severity": "High", "narrative": "...", "recommended_action": "Block IP and Disable User", "attacker_ip": "...", "target_user": "..." }
        
        IMPORTANT: Include 'attacker_ip' and 'target_user' in your output for the Response Agent.
        """
        
        bus.subscribe("ConfirmedThreat", self.handle_threat)

    async def handle_threat(self, data: dict):
        attacker_ip = data.get('attacker_ip', 'unknown')
        target_user = data.get('target_user', 'unknown')
        print(f"\n[Root Cause] Analyzing Threat from IP: {attacker_ip}, Target: {target_user}")
        response = await self.process(f"Investigate this confirmed threat and create an incident report: {data}")
        
        if "IncidentReport" in response:
            clean_text = response.replace("```json", "").replace("```", "").strip()
            try:
                start = clean_text.find("{")
                end = clean_text.rfind("}") + 1
                if start != -1 and end > start:
                    report = json.loads(clean_text[start:end])
                    # Ensure critical fields are present
                    if "attacker_ip" not in report:
                        report["attacker_ip"] = attacker_ip
                    if "target_user" not in report:
                        report["target_user"] = target_user
                    await bus.publish("IncidentReport", report)
            except json.JSONDecodeError as e:
                print(f"[Root Cause] JSON parsing error: {e}")
            except Exception as e:
                print(f"[Root Cause] Unexpected error: {e}")
