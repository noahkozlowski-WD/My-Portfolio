#!/usr/bin/env python3
"""
Backend API Testing for Contact Form
Tests both POST /api/contact and GET /api/contact/messages endpoints
"""

import requests
import json
import time
from datetime import datetime

# Backend URL from frontend .env
BACKEND_URL = "https://noah-web-dev.preview.emergentagent.com"
BASE_API_URL = f"{BACKEND_URL}/api"

def test_post_contact_valid():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing POST /api/contact with valid data ===")
    
    url = f"{BASE_API_URL}/contact"
    valid_data = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "message": "Hello! I'm interested in your web development services. Could you please provide more information about your pricing and availability?"
    }
    
    try:
        response = requests.post(url, json=valid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and data.get('message') and data.get('id'):
                print("✅ PASS: Valid submission successful")
                return True, data.get('id')
            else:
                print("❌ FAIL: Response format incorrect")
                return False, None
        else:
            print(f"❌ FAIL: Expected 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False, None

def test_post_contact_missing_name():
    """Test POST /api/contact with missing name"""
    print("\n=== Testing POST /api/contact with missing name ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "email": "test@example.com",
        "message": "This message has no name field"
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Missing name properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_post_contact_missing_email():
    """Test POST /api/contact with missing email"""
    print("\n=== Testing POST /api/contact with missing email ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "name": "John Smith",
        "message": "This message has no email field"
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Missing email properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_post_contact_invalid_email():
    """Test POST /api/contact with invalid email format"""
    print("\n=== Testing POST /api/contact with invalid email format ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "name": "John Smith",
        "email": "invalid-email-format",
        "message": "This message has invalid email format"
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Invalid email format properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_post_contact_missing_message():
    """Test POST /api/contact with missing message"""
    print("\n=== Testing POST /api/contact with missing message ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "name": "John Smith",
        "email": "john@example.com"
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Missing message properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_post_contact_short_message():
    """Test POST /api/contact with message too short (< 10 chars)"""
    print("\n=== Testing POST /api/contact with short message ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "name": "John Smith",
        "email": "john@example.com",
        "message": "Short"  # Only 5 characters
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Short message properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_post_contact_empty_fields():
    """Test POST /api/contact with empty/whitespace-only fields"""
    print("\n=== Testing POST /api/contact with empty/whitespace fields ===")
    
    url = f"{BASE_API_URL}/contact"
    invalid_data = {
        "name": "   ",  # Only whitespace
        "email": "test@example.com",
        "message": "          "  # Only whitespace
    }
    
    try:
        response = requests.post(url, json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ PASS: Empty/whitespace fields properly rejected")
            return True
        else:
            print(f"❌ FAIL: Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_get_contact_messages():
    """Test GET /api/contact/messages"""
    print("\n=== Testing GET /api/contact/messages ===")
    
    url = f"{BASE_API_URL}/contact/messages"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'messages' in data and 'count' in data:
                messages = data.get('messages', [])
                print(f"✅ PASS: Retrieved {len(messages)} messages")
                
                # Check message format if any messages exist
                if messages:
                    first_msg = messages[0]
                    required_fields = ['id', 'name', 'email', 'message', 'status', 'created_at']
                    missing_fields = [field for field in required_fields if field not in first_msg]
                    
                    if missing_fields:
                        print(f"❌ FAIL: Missing fields in message: {missing_fields}")
                        return False
                    
                    # Check if messages are sorted by created_at descending
                    if len(messages) > 1:
                        first_time = datetime.fromisoformat(messages[0]['created_at'].replace('Z', '+00:00'))
                        second_time = datetime.fromisoformat(messages[1]['created_at'].replace('Z', '+00:00'))
                        if first_time < second_time:
                            print("❌ FAIL: Messages not sorted by created_at descending")
                            return False
                        else:
                            print("✅ PASS: Messages properly sorted by created_at descending")
                    
                    # Check default status
                    if first_msg.get('status') != 'new':
                        print(f"❌ FAIL: Expected status 'new', got '{first_msg.get('status')}'")
                        return False
                    else:
                        print("✅ PASS: Default status 'new' is correct")
                
                return True
            else:
                print("❌ FAIL: Response format incorrect")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def run_all_tests():
    """Run all contact API tests"""
    print("🚀 Starting Contact Form API Tests")
    print("=" * 50)
    
    test_results = []
    
    # Test valid submission first
    result, message_id = test_post_contact_valid()
    test_results.append(("POST /api/contact - Valid submission", result))
    
    # Test invalid submissions
    test_results.append(("POST /api/contact - Missing name", test_post_contact_missing_name()))
    test_results.append(("POST /api/contact - Missing email", test_post_contact_missing_email()))
    test_results.append(("POST /api/contact - Invalid email", test_post_contact_invalid_email()))
    test_results.append(("POST /api/contact - Missing message", test_post_contact_missing_message()))
    test_results.append(("POST /api/contact - Short message", test_post_contact_short_message()))
    test_results.append(("POST /api/contact - Empty fields", test_post_contact_empty_fields()))
    
    # Test message retrieval
    test_results.append(("GET /api/contact/messages", test_get_contact_messages()))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(test_results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed!")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)