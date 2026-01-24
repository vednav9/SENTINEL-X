from typing import Dict

def disable_user_account(username: str, reason: str) -> Dict:
    """
    Disables a user account in the identity provider (e.g., Active Directory).
    
    Args:
        username: The username to disable.
        reason: Justification for disabling.
        
    Returns:
        Status of the action.
    """
    print(f"\n[IAM CONTROL] 🚫 DISABLING USER: {username}")
    print(f"[IAM CONTROL] 📝 REASON: {reason}")
    print(f"[IAM CONTROL] ⚙️  Status: Account Locked.\n")
    
    return {
        "status": "success",
        "action": "disable_user",
        "target": username
    }
