from typing import Dict

def block_ip_address(ip_address: str, reason: str) -> Dict:
    """
    Executes a firewall block action against a specific IP address.
    
    Args:
        ip_address: The IP to block.
        reason: The justification for the block (used for audit trails).
        
    Returns:
        Status of the action.
    """
    # In a real system, this would call the Firewall API (Palo Alto, AWS WAF, etc.)
    print(f"\n[NETWORK CONTROL] 🛡️ BLOCKING IP: {ip_address}")
    print(f"[NETWORK CONTROL] 📝 REASON: {reason}")
    print(f"[NETWORK CONTROL] ⚙️  Status: Rule Applied Successfully.\n")
    
    return {
        "status": "success",
        "action": "block_ip",
        "target": ip_address,
        "timestamp": "now"
    }
