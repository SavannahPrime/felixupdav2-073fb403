
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ImagePlus, Plus, Edit, Trash2, Check, X, Calendar, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Types
type BioContent = {
  id: number;
  title: string;
  content: string;
};

type Milestone = {
  id: number;
  year: string;
  title: string;
  description: string;
  image_url?: string;
};

const AdminBio = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [bioContent, setBioContent] = useState<BioContent | null>(null);
  const [bioTitle, setBioTitle] = useState('');
  const [bioText, setBioText] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [submittingBio, setSubmittingBio] = useState(false);
  
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestone, setMilestone] = useState({
    id: 0,
    year: '',
    title: '',
    description: '',
    image_url: ''
  });
  const [editingMilestone, setEditingMilestone] = useState(false);
  const [submittingMilestone, setSubmittingMilestone] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [activeTab, setActiveTab] = useState("bio");

  useEffect(() => {
    fetchBioContent();
    fetchMilestones();
  }, []);

  const fetchBioContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bio_content')
        .select('*')
        .order('id')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setBioContent(data);
        setBioTitle(data.title);
        setBioText(data.content);
      }
    } catch (error) {
      console.error('Error fetching bio content:', error);
      toast.error('Failed to load bio content');
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setMilestones(data || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
      toast.error('Failed to load milestones');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBio = async () => {
    if (!bioTitle || !bioText) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmittingBio(true);
      
      if (bioContent) {
        // Update existing bio
        const { error } = await supabase
          .from('bio_content')
          .update({
            title: bioTitle,
            content: bioText
          })
          .eq('id', bioContent.id);
          
        if (error) throw error;
        
        setBioContent({
          ...bioContent,
          title: bioTitle,
          content: bioText
        });
        
        toast.success('Bio content updated successfully');
      } else {
        // Create new bio content
        const { data, error } = await supabase
          .from('bio_content')
          .insert([
            {
              title: bioTitle,
              content: bioText
            }
          ])
          .select();
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setBioContent(data[0]);
        }
        
        toast.success('Bio content created successfully');
      }
      
      setEditingBio(false);
    } catch (error) {
      console.error('Error saving bio content:', error);
      toast.error('Failed to save bio content');
    } finally {
      setSubmittingBio(false);
    }
  };

  const resetMilestoneForm = () => {
    setMilestone({
      id: 0,
      year: '',
      title: '',
      description: '',
      image_url: ''
    });
    setEditingMilestone(false);
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditMilestone = (item: Milestone) => {
    setMilestone({
      id: item.id,
      year: item.year,
      title: item.title,
      description: item.description,
      image_url: item.image_url || ''
    });
    setEditingMilestone(true);
    if (item.image_url) {
      setImagePreview(item.image_url);
    }
    setActiveTab("add-milestone");
  };

  const handleDeleteMilestone = async (id: number) => {
    if (!confirm('Are you sure you want to delete this milestone?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('milestones')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setMilestones(milestones.filter(m => m.id !== id));
      toast.success('Milestone deleted successfully');
    } catch (error) {
      console.error('Error deleting milestone:', error);
      toast.error('Failed to delete milestone');
    }
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!milestone.year || !milestone.title || !milestone.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmittingMilestone(true);
      
      let imageUrl = milestone.image_url;
      
      // Upload image if there's a new one
      if (imageFile) {
        const fileName = `milestone-${Date.now()}-${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media')
          .upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = await supabase.storage
          .from('media')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }
      
      if (editingMilestone) {
        // Update existing milestone
        const { error } = await supabase
          .from('milestones')
          .update({
            year: milestone.year,
            title: milestone.title,
            description: milestone.description,
            image_url: imageUrl
          })
          .eq('id', milestone.id);
          
        if (error) throw error;
        
        setMilestones(milestones.map(m => (
          m.id === milestone.id ? { ...m, year: milestone.year, title: milestone.title, description: milestone.description, image_url: imageUrl } : m
        )));
        
        toast.success('Milestone updated successfully');
      } else {
        // Create new milestone
        const { data, error } = await supabase
          .from('milestones')
          .insert([
            {
              year: milestone.year,
              title: milestone.title,
              description: milestone.description,
              image_url: imageUrl
            }
          ])
          .select();
          
        if (error) throw error;
        
        if (data) {
          setMilestones([...milestones, ...data]);
        }
        
        toast.success('Milestone created successfully');
      }
      
      resetMilestoneForm();
      setActiveTab("milestones");
    } catch (error) {
      console.error('Error saving milestone:', error);
      toast.error('Failed to save milestone');
    } finally {
      setSubmittingMilestone(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AdminLayout title="Biography Management" currentPath={location.pathname}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="bio">Bio Content</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="add-milestone">Add Milestone</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bio">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-fashion-champagne">Bio Content</h2>
              {!editingBio && (
                <Button 
                  variant="outline" 
                  onClick={() => setEditingBio(true)}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Content
                </Button>
              )}
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
                <p className="mt-4 text-fashion-champagne/80">Loading content...</p>
              </div>
            ) : editingBio ? (
              <div className="space-y-6 bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio-title" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Bio Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bio-title"
                      value={bioTitle}
                      onChange={(e) => setBioTitle(e.target.value)}
                      placeholder="Enter bio title"
                      required
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio-content" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                      Bio Content <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio-content"
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      placeholder="Write your biography content here..."
                      rows={10}
                      required
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                    />
                    <p className="mt-2 text-xs text-fashion-champagne/60">Use double line breaks (press Enter twice) to create paragraphs.</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (bioContent) {
                        setBioTitle(bioContent.title);
                        setBioText(bioContent.content);
                      } else {
                        setBioTitle('');
                        setBioText('');
                      }
                      setEditingBio(false);
                    }}
                    className="flex items-center"
                    disabled={submittingBio}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveBio}
                    disabled={submittingBio}
                    className="btn-luxury flex items-center"
                  >
                    {submittingBio ? (
                      <>
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : bioContent ? (
              <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                <h3 className="text-xl font-serif text-fashion-gold mb-4">{bioContent.title}</h3>
                {bioContent.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-fashion-champagne/80 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
                <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No bio content</h3>
                <p className="mt-1 text-fashion-champagne/60">Add your biography information to display on the website</p>
                <div className="mt-6">
                  <Button variant="outline" onClick={() => setEditingBio(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Bio Content
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="milestones">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-fashion-champagne">Career Milestones</h2>
            <div className="text-sm text-fashion-champagne/60">
              {milestones.length} milestone{milestones.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
              <p className="mt-4 text-fashion-champagne/80">Loading milestones...</p>
            </div>
          ) : milestones.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
              <Calendar className="mx-auto h-12 w-12 text-fashion-champagne/40" />
              <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No milestones</h3>
              <p className="mt-1 text-fashion-champagne/60">Showcase your career milestones to display on the website</p>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setActiveTab("add-milestone")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map(item => (
                <div 
                  key={item.id}
                  className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden transition-all hover:border-fashion-gold/40"
                >
                  {item.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-48 object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-fashion-gold font-serif text-xl mr-2">{item.year}</span>
                        <h4 className="text-fashion-champagne text-lg">{item.title}</h4>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditMilestone(item)}
                          className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteMilestone(item.id)}
                          className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-fashion-champagne/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Button onClick={() => setActiveTab("add-milestone")} className="btn-luxury">
              <Plus className="mr-2 h-4 w-4" />
              Add New Milestone
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="add-milestone">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-fashion-champagne">
                {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
              </h2>
              {editingMilestone && (
                <Button variant="outline" size="sm" onClick={resetMilestoneForm}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
            
            <form onSubmit={handleSaveMilestone} className="space-y-6 bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="year" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="year"
                    type="text"
                    value={milestone.year}
                    onChange={(e) => setMilestone({...milestone, year: e.target.value})}
                    placeholder="e.g., 2023"
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={milestone.title}
                    onChange={(e) => setMilestone({...milestone, title: e.target.value})}
                    placeholder="e.g., Major Runway Shows"
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={milestone.description}
                  onChange={(e) => setMilestone({...milestone, description: e.target.value})}
                  placeholder="Describe this career milestone..."
                  rows={4}
                  required
                  className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                  Image
                </Label>
                <div className="mt-1 flex flex-col space-y-4">
                  <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-fashion-gold/30 rounded-lg cursor-pointer hover:bg-fashion-gold/5 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-fashion-champagne/70" />
                      <p className="text-sm text-fashion-champagne">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-fashion-champagne/60 mt-1">
                        PNG, JPG or WEBP (max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  
                  {(imagePreview || milestone.image_url) && (
                    <div className="relative">
                      <div className="bg-black/20 border border-fashion-gold/20 rounded-lg p-2">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-md overflow-hidden">
                            <img 
                              src={imagePreview || milestone.image_url} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-fashion-champagne mb-1">Image Preview</p>
                            <p className="text-xs text-fashion-champagne/60">{imageFile ? imageFile.name : 'Current image'}</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview('');
                              if (editingMilestone) {
                                setMilestone({...milestone, image_url: ''});
                              }
                            }}
                            className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submittingMilestone}
                  className="btn-luxury flex items-center"
                >
                  {submittingMilestone ? (
                    <>
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                      {editingMilestone ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingMilestone ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update Milestone
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Milestone
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

export default AdminBio;
