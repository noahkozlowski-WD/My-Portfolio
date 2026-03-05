import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LogOut, User, Briefcase, MessageSquare, Settings } from 'lucide-react';
import AboutManager from '../components/admin/AboutManager';
import SkillsManager from '../components/admin/SkillsManager';
import ServicesManager from '../components/admin/ServicesManager';
import ContactManager from '../components/admin/ContactManager';
import MessagesViewer from '../components/admin/MessagesViewer';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-purple-100 text-sm">Manage your portfolio content</p>
            </div>
            <Button
              data-testid="logout-btn"
              onClick={handleLogout}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger data-testid="tab-about" value="about">
              <User size={18} className="mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger data-testid="tab-skills" value="skills">
              <Settings size={18} className="mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger data-testid="tab-services" value="services">
              <Briefcase size={18} className="mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger data-testid="tab-contact" value="contact">
              <MessageSquare size={18} className="mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger data-testid="tab-messages" value="messages">
              <MessageSquare size={18} className="mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AboutManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
