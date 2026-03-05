import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';
import { Plus, Trash2, Save, Upload } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ServicesManager = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingService, setEditingService] = useState({
    id: Date.now(),
    title: '',
    description: '',
    image: '',
    features: []
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/admin/content/services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load services',
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
      setEditingService({ ...editingService, image: response.data.url });
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

  const addFeature = () => {
    if (featureInput.trim()) {
      setEditingService({
        ...editingService,
        features: [...editingService.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    const newFeatures = editingService.features.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features: newFeatures });
  };

  const saveService = async () => {
    if (!editingService.title || !editingService.description || editingService.features.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields and add at least one feature',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/admin/content/services`, editingService, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Service added successfully'
      });
      setEditingService({
        id: Date.now(),
        title: '',
        description: '',
        image: '',
        features: []
      });
      fetchServices();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add service',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Delete this service?')) return;

    try {
      await axios.delete(`${API}/admin/content/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Service deleted'
      });
      fetchServices();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Service */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Add a service you offer to potential clients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Title
            </label>
            <Input
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              placeholder="e.g., Web Application Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              placeholder="Describe what this service includes..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image
            </label>
            {editingService.image && (
              <img src={BACKEND_URL + editingService.image} alt="Preview" className="w-32 h-32 rounded-lg object-cover mb-4" />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                placeholder="e.g., Responsive Design"
              />
              <Button onClick={addFeature} type="button">
                <Plus size={18} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editingService.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md flex items-center gap-2"
                >
                  {feature}
                  <button onClick={() => removeFeature(index)}>
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={saveService}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save size={18} className="mr-2" />
            {loading ? 'Saving...' : 'Add Service'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Services */}
      <Card>
        <CardHeader>
          <CardTitle>Current Services ({services.length})</CardTitle>
          <CardDescription>Manage your service offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No services added yet</p>
            ) : (
              services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex gap-4">
                    {service.image && (
                      <img
                        src={BACKEND_URL + service.image}
                        alt={service.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        <Button
                          onClick={() => deleteService(service.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features?.map((feature, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesManager;
