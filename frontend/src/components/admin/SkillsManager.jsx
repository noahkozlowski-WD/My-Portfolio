import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';
import { Plus, Trash2, Save } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SkillsManager = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState({
    category: '',
    technologies: [],
    icon: 'Code2'
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API}/admin/content/skills`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load skills',
        variant: 'destructive'
      });
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setEditingSkill({
        ...editingSkill,
        technologies: [...editingSkill.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    const newTechs = editingSkill.technologies.filter((_, i) => i !== index);
    setEditingSkill({ ...editingSkill, technologies: newTechs });
  };

  const saveSkill = async () => {
    if (!editingSkill.category || editingSkill.technologies.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in category and add at least one technology',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/admin/content/skills`, editingSkill, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Skill added successfully'
      });
      setEditingSkill({ category: '', technologies: [], icon: 'Code2' });
      fetchSkills();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  const deleteSkill = async (category) => {
    if (!window.confirm(`Delete skill: ${category}?`)) return;

    try {
      await axios.delete(`${API}/admin/content/skills/${encodeURIComponent(category)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Skill deleted'
      });
      fetchSkills();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>Add a new skill category to your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <Input
              value={editingSkill.category}
              onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
              placeholder="e.g., Frontend Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Name
            </label>
            <select
              value={editingSkill.icon}
              onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Code2">Code2</option>
              <option value="Database">Database</option>
              <option value="Settings">Settings</option>
              <option value="Palette">Palette</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                placeholder="e.g., React, Node.js"
              />
              <Button onClick={addTechnology} type="button">
                <Plus size={18} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editingSkill.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md flex items-center gap-2"
                >
                  {tech}
                  <button onClick={() => removeTechnology(index)}>
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={saveSkill}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save size={18} className="mr-2" />
            {loading ? 'Saving...' : 'Add Skill'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Current Skills ({skills.length})</CardTitle>
          <CardDescription>Manage your existing skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No skills added yet</p>
            ) : (
              skills.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{skill.category}</h3>
                    <Button
                      onClick={() => deleteSkill(skill.category)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
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

export default SkillsManager;
