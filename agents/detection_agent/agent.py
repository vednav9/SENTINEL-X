from ..base_agent import BaseAgent
from memory.event_bus import bus
from tools.log_query import get_recent_logs, query_logs
import json

class ThreatDetectionAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Threat Detection Agent",
            tools=[get_recent_logs, query_logs],
        )
        # System instruction update
        self.model._system_instruction = """
        You are the Threat Detection Agent.
        Your goal is to monitor SIEM logs and identify suspicious patterns.
        
        PROCEDURE:
        1. Query recent logs.
        2. Analyze them for anomalies (like repeated login failures, unusual API calls).
        3. If suspicious, output a JSON object with:
           { "type": "SuspiciousEvent", "details": "...", "source_ip": "...", "target_user": "..." }
        4. If normal, just say "No threats detected."
        
        IMPORTANT: Always use 'source_ip' as the field name for IP addresses.
        """

    async def monitor(self):
        """
        Active monitoring loop triggered by main orchestration
        """
        # In a real loop we might query every X seconds. 
        # Here we just check once per 'tick'
        response = await self.process("Check the most recent logs for any security anomalies. Be meticulous. If you find suspicious activity, output a JSON object with 'type', 'details', 'source_ip', and 'target_user' fields.")
        
        # Heuristic to parse JSON from response if the model outputs it
        if "SuspiciousEvent" in response:
            # Clean up potential markdown
            clean_text = response.replace("```json", "").replace("```", "").strip()
            try:
                # Find the JSON part roughly
                start = clean_text.find("{")
                end = clean_text.rfind("}") + 1
                if start != -1 and end > start:
                    data = json.loads(clean_text[start:end])
                    # Ensure required fields exist
                    if "source_ip" in data:
                        await bus.publish("SuspiciousEvent", data)
                    else:
                        print(f"[Detection Agent] Warning: Missing 'source_ip' in event data")
            except json.JSONDecodeError as e:
                print(f"[Detection Agent] JSON parsing error: {e}")
            except Exception as e:
                print(f"[Detection Agent] Unexpected error: {e}")
