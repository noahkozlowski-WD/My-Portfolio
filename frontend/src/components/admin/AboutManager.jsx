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

const AboutManager = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    title: '',
    story: '',
    history: '',
    image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/admin/content/about`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load about content',
        variant: 'destructive'
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/admin/content/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setData({ ...data, image: response.data.url });
      toast({
        title: 'Success',
        description: 'Image uploaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive'
      });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/admin/content/about`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'About section updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update about section',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Update your personal story and profile image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title
          </label>
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="About Me"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Story
          </label>
          <Textarea
            value={data.story}
            onChange={(e) => setData({ ...data, story: e.target.value })}
            placeholder="Tell your story..."
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your History
          </label>
          <Textarea
            value={data.history}
            onChange={(e) => setData({ ...data, history: e.target.value })}
            placeholder="Your professional history..."
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          {data.image && (
            <img src={BACKEND_URL + data.image} alt="Profile" className="w-32 h-32 rounded-lg object-cover mb-4" />
          )}
          <div className="flex gap-2">
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="flex-1"
            />
            {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
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

export default AboutManager;
