import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';
import { Mail, User, MessageSquare } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MessagesViewer = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/admin/content/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Messages</CardTitle>
          <CardDescription>View messages from your contact form ({messages.length} total)</CardDescription>
        </CardHeader>
      </Card>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500 text-center">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span className="font-semibold">{message.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} />
                    <span>{message.email}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <MessageSquare size={16} className="text-gray-500 mt-1" />
                <p className="text-gray-700">{message.message}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default MessagesViewer;
