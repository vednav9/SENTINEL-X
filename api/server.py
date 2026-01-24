from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from memory.event_bus import bus
from main import run_simulation
from termcolor import cprint
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Sentinel-X Active"}

@app.websocket("/events")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    # Define a callback that sends data to this specific websocket
    async def event_handler(data):
        try:
            await websocket.send_json(data)
        except Exception as e:
            print(f"Error sending to websocket: {e}")

    # Subscribe to all relevant events
    # Note: This is a simplistic implementation. 
    # In a prod system, we would need proper unsubscription on disconnect.
    bus.subscribe("LogEvent", event_handler)
    bus.subscribe("AgentReasoning", event_handler)
    bus.subscribe("SuspiciousEvent", event_handler)
    bus.subscribe("SimulationInfo", event_handler)

    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except Exception:
        pass

@app.on_event("startup")
async def startup_event():
    # Run simulation in background
    asyncio.create_task(run_simulation_loop())

async def run_simulation_loop():
    cprint("[API] Starting Background Simulation Loop...", "magenta")
    while True:
        await run_simulation()
        await asyncio.sleep(10) # Pause between runs
        cprint("[API] Restarting Simulation Sequence...", "magenta")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
