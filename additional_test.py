#!/usr/bin/env python3
"""
Additional tests for data persistence and sorting
"""

import requests
import json
import time
from datetime import datetime

BACKEND_URL = "https://noah-web-dev.preview.emergentagent.com"
BASE_API_URL = f"{BACKEND_URL}/api"

def test_multiple_submissions_and_sorting():
    """Test multiple submissions and verify sorting"""
    print("\n=== Testing multiple submissions and sorting ===")
    
    url = f"{BASE_API_URL}/contact"
    
    # Submit first message
    message1 = {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "message": "First message for testing sorting functionality"
    }
    
    response1 = requests.post(url, json=message1, timeout=10)
    print(f"Message 1 - Status: {response1.status_code}")
    
    # Wait a moment to ensure different timestamps
    time.sleep(1)
    
    # Submit second message
    message2 = {
        "name": "Bob Wilson",
        "email": "bob@example.com", 
        "message": "Second message submitted after the first one"
    }
    
    response2 = requests.post(url, json=message2, timeout=10)
    print(f"Message 2 - Status: {response2.status_code}")
    
    # Now get all messages and verify sorting
    messages_url = f"{BASE_API_URL}/contact/messages"
    response = requests.get(messages_url, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        messages = data.get('messages', [])
        print(f"Retrieved {len(messages)} total messages")
        
        if len(messages) >= 2:
            # Check if the most recent message (Bob's) is first
            first_msg = messages[0]
            if first_msg['name'] == 'Bob Wilson':
                print("✅ PASS: Messages are sorted by created_at descending (newest first)")
                return True
            else:
                print(f"❌ FAIL: Expected newest message first, got: {first_msg['name']}")
                return False
        else:
            print("❌ FAIL: Not enough messages to test sorting")
            return False
    else:
        print(f"❌ FAIL: Failed to retrieve messages: {response.status_code}")
        return False

if __name__ == "__main__":
    test_multiple_submissions_and_sorting()