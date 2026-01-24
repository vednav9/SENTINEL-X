from ..base_agent import BaseAgent
from memory.event_bus import bus
from tools.network_control import block_ip_address
from tools.identity_control import disable_user_account
import json

class ResponseAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Response Agent",
            tools=[block_ip_address, disable_user_account]
        )
        self.model._system_instruction = """
        You are the Response & Prevention Agent.
        Your goal is to execute SAFE mitigation actions based on the Incident Report.
        
        PROCEDURE:
        1. Receive "IncidentReport".
        2. Extract 'attacker_ip' and 'target_user' from the report.
        3. Decide which tools to use based on severity.
        4. EXECUTE the tools (block_ip_address, disable_user_account).
        5. Output JSON: { "type": "ActionTaken", "details": "Blocked IP X and Disabled User Y", "actions": ["block_ip", "disable_user"] }
        
        SAFETY:
        - Only block if severity is High or Critical.
        
        IMPORTANT: You MUST call the actual tools, not just describe what to do.
        """
        
        bus.subscribe("IncidentReport", self.handle_incident)

    async def handle_incident(self, data: dict):
        narrative = data.get('narrative', 'No narrative provided')[:80]
        severity = data.get('severity', 'Unknown')
        attacker_ip = data.get('attacker_ip', None)
        target_user = data.get('target_user', None)
        
        print(f"\n[Response Agent] Received Incident Report (Severity: {severity})")
        print(f"[Response Agent] Narrative: {narrative}...")
        
        # We explicitly ask it to USE the tools in the prompt
        prompt = f"""Take action on this incident report:
        
Severity: {severity}
Attacker IP: {attacker_ip}
Target User: {target_user}
Narrative: {narrative}

You MUST call the block_ip_address and disable_user_account tools if severity is High or Critical.
Then output a JSON with type 'ActionTaken' describing what you did."""

        response = await self.process(prompt)
        
        if "ActionTaken" in response:
            await bus.publish("ActionTaken", {"status": "MITIGATED", "details": response})
