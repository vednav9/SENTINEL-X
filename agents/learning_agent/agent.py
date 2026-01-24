from ..base_agent import BaseAgent
from memory.event_bus import bus
import json

class LearningAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Learning Agent",
            tools=[] # Mostly internal reasoning
        )
        self.model._system_instruction = """
        You are the Learning & Policy Agent.
        Your goal is to update security policies based on resolved incidents.
        
        PROCEDURE:
        1. Receive "ActionTaken" event.
        2. Reflect on the incident and the actions taken.
        3. Suggest a new policy rule to prevent this in the future.
        4. Be specific: mention the attack type, indicators, and recommended automated response.
        5. Output a clear policy recommendation.
        
        Example: "Policy Update: Auto-block IPs with >5 failed SSH attempts in 60 seconds."
        """
        
        bus.subscribe("ActionTaken", self.handle_action)

    async def handle_action(self, data: dict):
        print(f"\n[Learning Agent] Reviewing Incident Response...")
        response = await self.process(f"""The incident has been mitigated: {data}

Based on this incident, what policy should we implement to prevent similar attacks in the future?
Be specific about:
1. What pattern to detect
2. What threshold to use
3. What automated action to take

Output a clear policy recommendation.""")
        
        # Save policy to file
        try:
            with open("learned_policies.txt", "a") as f:
                from datetime import datetime
                f.write(f"\n[{datetime.utcnow().isoformat()}Z]\n{response}\n")
                print(f"[Learning Agent] ✅ Policy saved to learned_policies.txt")
        except Exception as e:
            print(f"[Learning Agent] Warning: Could not save policy: {e}")
