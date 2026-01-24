from ..base_agent import BaseAgent
from memory.event_bus import bus
from tools.threat_intel import lookup_ip_reputation
import json

class ThreatIntelAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Threat Intel Agent",
            tools=[lookup_ip_reputation]
        )
        self.model._system_instruction = """
        You are the Threat Intelligence Agent.
        Your goal is to enrich suspicious events with external threat data.
        
        PROCEDURE:
        1. You receive a "SuspiciousEvent".
        2. Extract the Source IP from the 'source_ip' field.
        3. Use 'lookup_ip_reputation' to check it.
        4. If it's a known threat or high risk, confirm it.
        5. Output JSON: { "type": "ConfirmedThreat", "risk_score": 95, "details": "...", "attacker_ip": "...", "target_user": "..." }
        
        IMPORTANT: Use 'attacker_ip' in your output (rename from 'source_ip').
        """
        
        # Subscribe to detection events
        bus.subscribe("SuspiciousEvent", self.handle_suspicious_event)

    async def handle_suspicious_event(self, data: dict):
        source_ip = data.get('source_ip', 'unknown')
        print(f"\n[Intel Agent] Received Suspicious Event from IP: {source_ip}")
        response = await self.process(f"Analyze this suspicious event and lookup the IP reputation: {data}")
        
        if "ConfirmedThreat" in response:
            clean_text = response.replace("```json", "").replace("```", "").strip()
            try:
                start = clean_text.find("{")
                end = clean_text.rfind("}") + 1
                if start != -1 and end > start:
                    threat_data = json.loads(clean_text[start:end])
                    # Ensure attacker_ip is present (fallback to source_ip from original event)
                    if "attacker_ip" not in threat_data and "source_ip" in data:
                        threat_data["attacker_ip"] = data["source_ip"]
                    if "target_user" not in threat_data and "target_user" in data:
                        threat_data["target_user"] = data["target_user"]
                    await bus.publish("ConfirmedThreat", threat_data)
            except json.JSONDecodeError as e:
                print(f"[Intel Agent] JSON parsing error: {e}")
            except Exception as e:
                print(f"[Intel Agent] Unexpected error: {e}")
