"""Event Bus for SENTINEL-X - Pub/Sub messaging system for inter-agent communication"""

class EventBus:
    def __init__(self):
        self.subscribers = {}
    
    def subscribe(self, event_type: str, callback):
        """Subscribe a callback to an event type"""
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(callback)
    
    def unsubscribe(self, event_type: str, callback):
        """Unsubscribe a callback from an event type"""
        if event_type in self.subscribers:
            self.subscribers[event_type].remove(callback)
    
    async def publish(self, event_type: str, data):
        """Publish an event to all subscribers"""
        if event_type in self.subscribers:
            for callback in self.subscribers[event_type]:
                if callable(callback):
                    try:
                        # Check if callback is async
                        import asyncio
                        if asyncio.iscoroutinefunction(callback):
                            await callback(data)
                        else:
                            callback(data)
                    except Exception as e:
                        print(f"Error in event callback for {event_type}: {e}")

# Global event bus instance
bus = EventBus()
