import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';
import { Save } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactManager = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    social: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/admin/content/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load contact info',
        variant: 'destructive'
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/admin/content/contact`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Contact information updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update contact info',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update your contact details and social media links</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title
          </label>
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Let's Work Together"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Contact section description..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Input
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <Input
                value={data.social?.github || ''}
                onChange={(e) => setData({
                  ...data,
                  social: { ...data.social, github: e.target.value }
                })}
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <Input
                value={data.social?.linkedin || ''}
                onChange={(e) => setData({
                  ...data,
                  social: { ...data.social, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter URL
              </label>
              <Input
                value={data.social?.twitter || ''}
                onChange={(e) => setData({
                  ...data,
                  social: { ...data.social, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/yourusername"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Save size={18} className="mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactManager;
