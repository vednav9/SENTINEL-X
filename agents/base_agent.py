import os
import google.generativeai as genai
from typing import List, Any
from termcolor import cprint
from memory.event_bus import bus
import asyncio

class BaseAgent:
    def __init__(self, name: str, model_name: str = "gemini-2.0-flash-exp", tools: List[Any] = None):
        self.name = name
        self.model_name = model_name
        self.tools = tools or []
        
        # Configure Gemini
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
             # Fallback or error - for now allow initialization without key for safety, but warn
             cprint(f"[{name}] WARNING: GOOGLE_API_KEY not found.", "yellow")
        else:
             genai.configure(api_key=api_key)

        self.model = genai.GenerativeModel(
            model_name=self.model_name,
            tools=self.tools,
            system_instruction=f"You are the {name} of the SENTINEL-X security system. Act as an expert security analyst."
        )
        self.chat = self.model.start_chat(enable_automatic_function_calling=True)

    async def process(self, input_data: Any) -> str:
        """
        Process an input message and return a response.
        """
        cprint(f"[{self.name}] 🤔 Reasoning...", "blue")
        await bus.publish("AgentReasoning", {"agent": self.name, "message": f"Thinking about: {input_data}..."})
        
        try:
            # Simulate thinking time for effect if too fast
            # await asyncio.sleep(1) 
            response = await self.chat.send_message_async(str(input_data))
            
            summary = response.text[:100] + "..." if len(response.text) > 100 else response.text
            cprint(f"[{self.name}] 💡 Output: {summary}", "green")
            await bus.publish("AgentReasoning", {"agent": self.name, "message": f"Conclusion: {summary}"})
            
            return response.text
        except Exception as e:
            cprint(f"[{self.name}] ❌ Error: {e}", "red")
            await bus.publish("AgentReasoning", {"agent": self.name, "message": f"Error: {e}"})
            return f"Error processing request: {e}"
