import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderPlus, Calendar, Users, Globe, Plus, Edit, Trash2, Check, X, Upload, Video, Image } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Project {
  id: string;
  title: string;
  description: string;
  duration: string | null;
  status: string;
  location: string | null;
  volunteers_count: number;
  created_at: string;
  media_url: string | null;
  media_type: string | null;
  accepts_volunteers: boolean | null;
}

const AdminProjects = () => {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [projectStatus, setProjectStatus] = useState('planning');
  const [projectLocation, setProjectLocation] = useState('');
  const [volunteersCount, setVolunteersCount] = useState<number>(0);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [acceptsVolunteers, setAcceptsVolunteers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDuration('');
    setProjectStatus('planning');
    setProjectLocation('');
    setVolunteersCount(0);
    setMediaFile(null);
    setMediaType(null);
    setMediaPreview(null);
    setAcceptsVolunteers(false);
    setEditingProject(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    if (fileType !== 'image' && fileType !== 'video') {
      toast.error('Only image or video files are allowed');
      return;
    }

    setMediaFile(file);
    setMediaType(fileType);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadMedia = async (): Promise<string | null> => {
    if (!mediaFile) return null;
    
    try {
      const fileExt = mediaFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, mediaFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error('Failed to upload media');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      let mediaUrl = null;
      if (mediaFile) {
        mediaUrl = await uploadMedia();
      } else if (editingProject?.media_url) {
        mediaUrl = editingProject.media_url;
      }
      
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            title,
            description,
            duration,
            status: projectStatus,
            location: projectLocation,
            volunteers_count: volunteersCount,
            media_url: mediaUrl,
            media_type: mediaFile ? mediaType : editingProject.media_type,
            accepts_volunteers: acceptsVolunteers
          })
          .eq('id', editingProject.id);
          
        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([
            {
              title,
              description,
              duration,
              status: projectStatus,
              location: projectLocation,
              volunteers_count: volunteersCount,
              media_url: mediaUrl,
              media_type: mediaType,
              accepts_volunteers: acceptsVolunteers
            }
          ]);
          
        if (error) throw error;
        toast.success('Project created successfully');
      }
      
      resetForm();
      fetchProjects();
      
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setDuration(project.duration || '');
    setProjectStatus(project.status);
    setProjectLocation(project.location || '');
    setVolunteersCount(project.volunteers_count);
    setMediaType(project.media_type);
    setMediaPreview(project.media_url);
    setAcceptsVolunteers(project.accepts_volunteers || false);
    setActiveTab("create");
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('media_url')
        .eq('id', id)
        .single();
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;

      if (project?.media_url) {
        const url = new URL(project.media_url);
        const filePath = url.pathname.split('/').slice(-2).join('/');
        
        if (filePath) {
          await supabase.storage
            .from('media')
            .remove([filePath]);
        }
      }
      
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToCreateTab = () => {
    setActiveTab("create");
  };

  const renderMediaPreview = (url: string | null, type: string | null) => {
    if (!url) return null;
    
    if (type === 'image') {
      return <img src={url} alt="Project media" className="w-full h-40 object-cover rounded" />;
    } else if (type === 'video') {
      return (
        <video className="w-full h-40 object-cover rounded" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    
    return null;
  };

  return (
    <AdminLayout title="Projects Management" currentPath={location.pathname}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="list">All Projects</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-fashion-champagne">Projects</h2>
            {projects.length > 0 && (
              <div className="text-sm text-fashion-champagne/60">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
              <p className="mt-4 text-fashion-champagne/80">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
              <FolderPlus className="mx-auto h-12 w-12 text-fashion-champagne/40" />
              <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No projects</h3>
              <p className="mt-1 text-fashion-champagne/60">Get started by creating your first project</p>
              <div className="mt-6">
                <Button variant="outline" onClick={navigateToCreateTab}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-fashion-gold/20">
                    <TableHead className="text-fashion-champagne/80">Project</TableHead>
                    <TableHead className="text-fashion-champagne/80">Media</TableHead>
                    <TableHead className="text-fashion-champagne/80">Duration</TableHead>
                    <TableHead className="text-fashion-champagne/80">Status</TableHead>
                    <TableHead className="text-fashion-champagne/80">Location</TableHead>
                    <TableHead className="text-fashion-champagne/80">Volunteers</TableHead>
                    <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map(project => (
                    <TableRow key={project.id} className="border-fashion-gold/10">
                      <TableCell className="font-medium text-fashion-champagne">
                        {project.title}
                        {project.accepts_volunteers && (
                          <div className="mt-1 text-xs text-green-400">
                            <Users size={12} className="inline mr-1" />
                            Accepting volunteers
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {project.media_url ? (
                          <div className="w-16 h-16 relative">
                            {project.media_type === 'image' ? (
                              <Image size={16} className="absolute top-1 left-1 text-fashion-gold" />
                            ) : project.media_type === 'video' ? (
                              <Video size={16} className="absolute top-1 left-1 text-fashion-gold" />
                            ) : null}
                            <img 
                              src={project.media_type === 'image' ? project.media_url : '/lovable-uploads/8e031a32-a817-4e19-b4fa-43bd23721f2e.png'}
                              alt={project.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-fashion-champagne/40">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-fashion-champagne/80">{project.duration || '—'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'ongoing' ? 'bg-green-500/10 text-green-400' : 
                          project.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400' : 
                          project.status === 'completed' ? 'bg-gray-500/10 text-gray-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-fashion-champagne/80">{project.location || '—'}</TableCell>
                      <TableCell className="text-fashion-champagne/80">{project.volunteers_count}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(project)}
                            className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-fashion-champagne">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              {editingProject && (
                <Button variant="outline" size="sm" onClick={resetForm}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter project description"
                    rows={5}
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Duration
                    </label>
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="E.g., Jan - Dec 2025"
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Location
                    </label>
                    <Input
                      id="location"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder="E.g., Nairobi & Paris"
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      value={projectStatus}
                      onChange={(e) => setProjectStatus(e.target.value)}
                      className="w-full bg-black/40 border border-fashion-gold/30 rounded px-3 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
                    >
                      <option value="planning">Planning</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="volunteers_count" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Number of Volunteers
                    </label>
                    <Input
                      id="volunteers_count"
                      type="number"
                      min="0"
                      value={volunteersCount}
                      onChange={(e) => setVolunteersCount(parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-fashion-champagne/80">
                    Project Media (Image or Video)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label 
                        htmlFor="media-upload" 
                        className="flex items-center justify-center w-full h-32 px-4 transition bg-black/40 border-2 border-fashion-gold/20 border-dashed rounded-md appearance-none cursor-pointer hover:border-fashion-gold/40"
                      >
                        <span className="flex flex-col items-center space-y-2">
                          <Upload className="w-6 h-6 text-fashion-gold/70" />
                          <span className="text-sm text-fashion-champagne/60">
                            Click to upload image or video
                          </span>
                        </span>
                        <input
                          id="media-upload"
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    {mediaPreview && (
                      <div className="w-32 h-32 relative border border-fashion-gold/20 rounded-md overflow-hidden">
                        {mediaType === 'image' ? (
                          <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : mediaType === 'video' ? (
                          <video className="w-full h-full object-cover" controls>
                            <source src={mediaPreview} />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          renderMediaPreview(mediaPreview, editingProject?.media_type || null)
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setMediaFile(null);
                            setMediaPreview(null);
                            setMediaType(null);
                          }}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-black/80"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-black/40 rounded-full h-2.5 mt-2">
                      <div className="bg-fashion-gold h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="accepts-volunteers"
                    checked={acceptsVolunteers}
                    onCheckedChange={setAcceptsVolunteers}
                  />
                  <Label htmlFor="accepts-volunteers" className="text-fashion-champagne/80">
                    This project accepts volunteers
                  </Label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="btn-luxury flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                      {editingProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingProject ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update Project
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Project
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminProjects;
