import json
from typing import List, Dict, Optional

def query_logs(filter_key: str, filter_value: str, limit: int = 10) -> List[Dict]:
    """
    Queries the SIEM logs for events matching a specific key-value pair.
    
    Args:
        filter_key: The field to filter by (e.g., 'src_ip', 'user', 'event_type').
        filter_value: The value to match.
        limit: Maximum number of logs to return (default 10).
    
    Returns:
        List of log entries matching the criteria.
    """
    results = []
    log_file = "simulation_logs.jsonl"
    
    try:
        with open(log_file, "r") as f:
            # Read lines in reverse to get latest logs first
            lines = f.readlines()[::-1]
            
            for line in lines:
                if len(results) >= limit:
                    break
                
                try:
                    log_entry = json.loads(line)
                    # Check if key exists and matches (simple exact match)
                    if log_entry.get(filter_key) == filter_value:
                        results.append(log_entry)
                except json.JSONDecodeError:
                    continue
                    
    except FileNotFoundError:
        return [{"error": "Log source not found. Run simulation first."}]

    return results

def get_recent_logs(limit: int = 50) -> List[Dict]:
    """
    Retrieves the most recent logs from the SIEM.
    
    Args:
        limit: Number of logs to retrieve.
    """
    results = []
    log_file = "simulation_logs.jsonl"
    try:
        with open(log_file, "r") as f:
            lines = f.readlines()[::-1]
            for line in lines[:limit]:
                 results.append(json.loads(line))
    except:
        return []
    return results
