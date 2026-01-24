import json
import random
import time
from datetime import datetime
from typing import List, Dict, Any

class LogGenerator:
    def __init__(self, log_file: str = "simulation_logs.jsonl"):
        self.log_file = log_file
        # Clear the log file on init
        with open(self.log_file, "w") as f:
            pass

    def _write_log(self, data: Dict[str, Any]):
        entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "log_id": f"evt_{int(time.time() * 1000)}_{random.randint(1000, 9999)}",
            **data
        }
        with open(self.log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")
        return entry

    def generate_ssh_login_success(self, user: str, ip: str):
        self._write_log({
            "event_type": "SSH_LOGIN",
            "status": "SUCCESS",
            "user": user,
            "src_ip": ip,
            "message": "Accepted publickey for user"
        })

    def generate_ssh_login_fail(self, user: str, ip: str):
        self._write_log({
            "event_type": "SSH_LOGIN",
            "status": "FAILURE",
            "user": user,
            "src_ip": ip,
            "message": "Failed password for invalid user"
        })

    def generate_firewall_deny(self, ip: str, port: int):
        self._write_log({
            "event_type": "FIREWALL_DENY",
            "src_ip": ip,
            "dst_port": port,
            "action": "BLOCK",
            "message": "Inbound traffic denied by rule default-deny"
        })

    def generate_api_request(self, endpoint: str, ip: str, status_code: int):
        self._write_log({
            "event_type": "API_REQUEST",
            "endpoint": endpoint,
            "src_ip": ip,
            "status_code": status_code,
            "user_agent": "Mozilla/5.0",
            "message": f"HTTP {status_code} {endpoint}"
        })
    
    def clear_logs(self):
        with open(self.log_file, "w") as f:
            pass
