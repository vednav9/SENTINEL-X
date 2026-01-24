from typing import Dict

# Mock Threat Intelligence Database
THREAT_DB = {
    "192.168.1.105": {
        "risk_score": 95,
        "category": "Botnet",
        "known_associated_groups": ["APT-29", "Fancy Bear"],
        "geo_location": "Unknown"
    },
    "10.0.0.5": {
        "risk_score": 0,
        "category": "Internal Safe",
        "known_associated_groups": [],
        "geo_location": "Local Network"
    }
}

def lookup_ip_reputation(ip_address: str) -> Dict:
    """
    Checks the reputation of an IP address against the Threat Intelligence Database.
    
    Args:
        ip_address: The IP to check (e.g., '192.168.1.1').
        
    Returns:
        Dictionary containing risk score, category, and threat actor data.
    """
    result = THREAT_DB.get(ip_address)
    if result:
        return {"ip": ip_address, "found": True, **result}
    else:
        return {"ip": ip_address, "found": False, "risk_score": 10, "message": "No specific threat intelligence found."}
