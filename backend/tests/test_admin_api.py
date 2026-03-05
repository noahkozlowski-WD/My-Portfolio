"""
Backend API Tests for Noah Kozlowski Portfolio Admin Panel
Tests: Admin Auth, Content CRUD (About, Skills, Services, Contact, Messages)
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_USERNAME = "noahkoz"
ADMIN_PASSWORD = "#thebest1035379"


class TestAdminAuth:
    """Admin Authentication Tests"""
    
    def test_login_success(self):
        """Test successful admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "token" in data, "Token not in response"
        assert "expires_at" in data, "expires_at not in response"
        assert "username" in data, "username not in response"
        assert data["username"] == ADMIN_USERNAME
        assert len(data["token"]) > 20  # Token should be a substantial string
        print(f"Login successful, token length: {len(data['token'])}")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wronguser",
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Invalid credentials correctly rejected")
    
    def test_login_empty_credentials(self):
        """Test login with empty credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "",
            "password": ""
        })
        # Should fail validation or return 401
        assert response.status_code in [401, 422], f"Expected 401 or 422, got {response.status_code}"
        print("Empty credentials correctly rejected")


class TestTokenVerification:
    """Token verification tests"""
    
    @pytest.fixture
    def auth_token(self):
        """Get a valid auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        return response.json()["token"]
    
    def test_verify_valid_token(self, auth_token):
        """Test that valid token passes verification"""
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200, f"Token verification failed: {response.text}"
        data = response.json()
        assert data.get("valid") == True
        print("Token verification passed")
    
    def test_verify_invalid_token(self):
        """Test that invalid token fails verification"""
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": "Bearer invalid_token_here"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Invalid token correctly rejected")
    
    def test_verify_no_token(self):
        """Test that missing token fails verification"""
        response = requests.get(f"{BASE_URL}/api/admin/verify")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Missing token correctly rejected")


class TestAboutContent:
    """About section CRUD tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_about_content(self, auth_headers):
        """Test retrieving about section content"""
        response = requests.get(f"{BASE_URL}/api/admin/content/about", headers=auth_headers)
        assert response.status_code == 200, f"Get about failed: {response.text}"
        data = response.json()
        # Should have expected fields
        assert "title" in data
        print(f"About content retrieved: title={data.get('title', 'N/A')}")
    
    def test_update_about_content(self, auth_headers):
        """Test updating about section content"""
        test_data = {
            "title": "TEST_About Me",
            "story": "TEST_This is my story as a developer.",
            "history": "TEST_My professional history starts here.",
            "image": ""
        }
        response = requests.put(f"{BASE_URL}/api/admin/content/about", 
                               json=test_data, 
                               headers=auth_headers)
        assert response.status_code == 200, f"Update about failed: {response.text}"
        
        # Verify data was saved by re-fetching
        get_response = requests.get(f"{BASE_URL}/api/admin/content/about", headers=auth_headers)
        assert get_response.status_code == 200
        saved_data = get_response.json()
        assert saved_data["title"] == test_data["title"], "Title not persisted"
        assert saved_data["story"] == test_data["story"], "Story not persisted"
        print("About content updated and verified")
    
    def test_about_unauthenticated(self):
        """Test that about endpoints require authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/content/about")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Unauthenticated request correctly rejected")


class TestSkillsContent:
    """Skills section CRUD tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_skills(self, auth_headers):
        """Test retrieving skills list"""
        response = requests.get(f"{BASE_URL}/api/admin/content/skills", headers=auth_headers)
        assert response.status_code == 200, f"Get skills failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Skills should be a list"
        print(f"Skills retrieved: {len(data)} skills found")
    
    def test_add_skill(self, auth_headers):
        """Test adding a new skill"""
        test_skill = {
            "category": "TEST_Skill_Category",
            "technologies": ["Tech1", "Tech2", "Tech3"],
            "icon": "Code2"
        }
        response = requests.post(f"{BASE_URL}/api/admin/content/skills", 
                                json=test_skill, 
                                headers=auth_headers)
        assert response.status_code == 200, f"Add skill failed: {response.text}"
        
        # Verify skill was added
        get_response = requests.get(f"{BASE_URL}/api/admin/content/skills", headers=auth_headers)
        skills = get_response.json()
        skill_categories = [s["category"] for s in skills]
        assert test_skill["category"] in skill_categories, "Skill not found after adding"
        print(f"Skill added and verified: {test_skill['category']}")
    
    def test_delete_skill(self, auth_headers):
        """Test deleting a skill"""
        # First add a skill to delete
        test_skill = {
            "category": "TEST_Delete_Skill",
            "technologies": ["DeleteTech"],
            "icon": "Database"
        }
        requests.post(f"{BASE_URL}/api/admin/content/skills", json=test_skill, headers=auth_headers)
        
        # Now delete it
        response = requests.delete(f"{BASE_URL}/api/admin/content/skills/TEST_Delete_Skill", 
                                  headers=auth_headers)
        assert response.status_code == 200, f"Delete skill failed: {response.text}"
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/content/skills", headers=auth_headers)
        skills = get_response.json()
        skill_categories = [s["category"] for s in skills]
        assert "TEST_Delete_Skill" not in skill_categories, "Skill not deleted"
        print("Skill deleted and verified")


class TestServicesContent:
    """Services section CRUD tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_services(self, auth_headers):
        """Test retrieving services list"""
        response = requests.get(f"{BASE_URL}/api/admin/content/services", headers=auth_headers)
        assert response.status_code == 200, f"Get services failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Services should be a list"
        print(f"Services retrieved: {len(data)} services found")
    
    def test_add_service(self, auth_headers):
        """Test adding a new service"""
        test_service = {
            "id": 99999,
            "title": "TEST_Service",
            "description": "TEST_Service description for testing",
            "image": "",
            "features": ["Feature1", "Feature2"]
        }
        response = requests.post(f"{BASE_URL}/api/admin/content/services", 
                                json=test_service, 
                                headers=auth_headers)
        assert response.status_code == 200, f"Add service failed: {response.text}"
        
        # Verify service was added
        get_response = requests.get(f"{BASE_URL}/api/admin/content/services", headers=auth_headers)
        services = get_response.json()
        service_ids = [s["id"] for s in services]
        assert test_service["id"] in service_ids, "Service not found after adding"
        print(f"Service added and verified: {test_service['title']}")
    
    def test_delete_service(self, auth_headers):
        """Test deleting a service"""
        # First add a service to delete
        test_service = {
            "id": 88888,
            "title": "TEST_Delete_Service",
            "description": "Service to delete",
            "image": "",
            "features": ["DeleteFeature"]
        }
        requests.post(f"{BASE_URL}/api/admin/content/services", json=test_service, headers=auth_headers)
        
        # Now delete it
        response = requests.delete(f"{BASE_URL}/api/admin/content/services/88888", 
                                  headers=auth_headers)
        assert response.status_code == 200, f"Delete service failed: {response.text}"
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/content/services", headers=auth_headers)
        services = get_response.json()
        service_ids = [s["id"] for s in services]
        assert 88888 not in service_ids, "Service not deleted"
        print("Service deleted and verified")


class TestContactContent:
    """Contact section tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_contact_info(self, auth_headers):
        """Test retrieving contact info"""
        response = requests.get(f"{BASE_URL}/api/admin/content/contact", headers=auth_headers)
        assert response.status_code == 200, f"Get contact failed: {response.text}"
        data = response.json()
        assert "email" in data or "title" in data, "Contact should have email or title field"
        print(f"Contact info retrieved")
    
    def test_update_contact_info(self, auth_headers):
        """Test updating contact info"""
        test_data = {
            "title": "TEST_Contact Title",
            "description": "TEST_Contact description",
            "email": "test@example.com",
            "phone": "+1-555-1234",
            "location": "TEST_Location",
            "social": {
                "github": "https://github.com/test",
                "linkedin": "https://linkedin.com/in/test",
                "twitter": "https://twitter.com/test"
            }
        }
        response = requests.put(f"{BASE_URL}/api/admin/content/contact", 
                               json=test_data, 
                               headers=auth_headers)
        assert response.status_code == 200, f"Update contact failed: {response.text}"
        
        # Verify data was saved
        get_response = requests.get(f"{BASE_URL}/api/admin/content/contact", headers=auth_headers)
        saved_data = get_response.json()
        assert saved_data["title"] == test_data["title"], "Title not persisted"
        assert saved_data["email"] == test_data["email"], "Email not persisted"
        print("Contact info updated and verified")


class TestMessages:
    """Contact form messages tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_messages(self, auth_headers):
        """Test retrieving contact form messages"""
        response = requests.get(f"{BASE_URL}/api/admin/content/messages", headers=auth_headers)
        assert response.status_code == 200, f"Get messages failed: {response.text}"
        data = response.json()
        assert "messages" in data, "Response should have 'messages' field"
        assert isinstance(data["messages"], list), "Messages should be a list"
        print(f"Messages retrieved: {len(data['messages'])} messages found")
    
    def test_submit_contact_form(self):
        """Test submitting a contact form message (public endpoint)"""
        test_message = {
            "name": "TEST_Contact User",
            "email": "testcontact@example.com",
            "message": "This is a test contact form message for testing purposes."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=test_message)
        assert response.status_code == 201, f"Submit contact failed: {response.text}"
        data = response.json()
        assert data.get("success") == True, "Contact submission should succeed"
        assert "id" in data, "Response should include message ID"
        print(f"Contact form submitted, ID: {data['id']}")


class TestLogout:
    """Logout functionality tests"""
    
    def test_logout(self):
        """Test logout invalidates session"""
        # First login
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["token"]
        
        # Logout
        logout_response = requests.post(f"{BASE_URL}/api/admin/logout", headers={
            "Authorization": f"Bearer {token}"
        })
        assert logout_response.status_code == 200, f"Logout failed: {logout_response.text}"
        
        # Verify token no longer works
        verify_response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": f"Bearer {token}"
        })
        assert verify_response.status_code == 401, "Token should be invalid after logout"
        print("Logout successful, token invalidated")


class TestCleanup:
    """Cleanup test data created during tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get auth headers with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_cleanup_test_skills(self, auth_headers):
        """Remove TEST_ prefixed skills"""
        get_response = requests.get(f"{BASE_URL}/api/admin/content/skills", headers=auth_headers)
        skills = get_response.json()
        for skill in skills:
            if skill["category"].startswith("TEST_"):
                requests.delete(f"{BASE_URL}/api/admin/content/skills/{skill['category']}", 
                               headers=auth_headers)
        print("Test skills cleaned up")
    
    def test_cleanup_test_services(self, auth_headers):
        """Remove test services"""
        get_response = requests.get(f"{BASE_URL}/api/admin/content/services", headers=auth_headers)
        services = get_response.json()
        for service in services:
            if service.get("title", "").startswith("TEST_"):
                requests.delete(f"{BASE_URL}/api/admin/content/services/{service['id']}", 
                               headers=auth_headers)
        print("Test services cleaned up")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
