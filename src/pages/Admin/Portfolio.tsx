import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Plus, Upload, Trash2, Edit, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TooltipWrapper from '@/components/ui/TooltipWrapper';

// Item type definition
interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
}

const AdminPortfolio = () => {
  const location = useLocation();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState("gallery");

  // Fetch portfolio items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setFile(null);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = editingItem?.image_url || null;
      
      // Upload image if a new file is selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('portfolio')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }
      
      // Update or create portfolio item
      if (editingItem) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({
            title,
            description,
            category,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);
          
        if (error) throw error;
        toast.success('Portfolio item updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([
            {
              title,
              description,
              category,
              image_url: imageUrl
            }
          ]);
          
        if (error) throw error;
        toast.success('Portfolio item added successfully');
      }
      
      // Refresh the list and reset the form
      resetForm();
      fetchItems();
      
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      toast.error('Failed to save portfolio item');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || '');
    setCategory(item.category || '');
    setActiveTab("upload");
  };

  const handleDelete = async (id: string, imageUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) {
      return;
    }
    
    try {
      // Delete the item from the database
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // If there's an image, delete it from storage
      if (imageUrl) {
        // Extract the filename from the URL
        const filename = imageUrl.split('/').pop();
        if (filename) {
          const { error: storageError } = await supabase.storage
            .from('portfolio')
            .remove([filename]);
            
          if (storageError) {
            console.error('Error deleting image:', storageError);
          }
        }
      }
      
      toast.success('Portfolio item deleted successfully');
      fetchItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item');
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToUploadTab = () => {
    setActiveTab("upload");
  };

  return (
    <AdminLayout title="Portfolio Management" currentPath={location.pathname}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-fashion-champagne">Portfolio Gallery</h2>
            {items.length > 0 && (
              <div className="text-sm text-fashion-champagne/60">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
              <p className="mt-4 text-fashion-champagne/80">Loading portfolio items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
              <Image className="mx-auto h-12 w-12 text-fashion-champagne/40" />
              <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No portfolio items</h3>
              <p className="mt-1 text-fashion-champagne/60">Get started by uploading your first portfolio item</p>
              <div className="mt-6">
                <Button variant="outline" onClick={navigateToUploadTab}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="group relative bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
                  <div className="relative pb-[100%]">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/50">
                        <Image className="h-16 w-16 text-fashion-champagne/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="w-full">
                        <h3 className="text-lg font-medium text-white truncate">{item.title}</h3>
                        {item.category && (
                          <span className="inline-block mt-1 text-xs text-fashion-gold px-2 py-0.5 rounded-full bg-fashion-gold/10">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-fashion-gold/10 flex justify-between items-center">
                    <div>
                      <h4 className="text-fashion-champagne truncate">{item.title}</h4>
                      {item.category && (
                        <span className="text-xs text-fashion-champagne/60">{item.category}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-fashion-champagne/60 hover:text-fashion-gold transition-colors rounded-full hover:bg-fashion-gold/10"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, item.image_url)}
                        className="p-1.5 text-fashion-champagne/60 hover:text-red-500 transition-colors rounded-full hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-fashion-champagne">
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </h2>
              {editingItem && (
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
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Category
                  </label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Select or type category"
                    list="categoryOptions"
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                  <datalist id="categoryOptions">
                    <option value="Editorial" />
                    <option value="Runway" />
                    <option value="Campaign" />
                    <option value="Beauty" />
                    <option value="Lifestyle" />
                    <option value="Commercial" />
                  </datalist>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    rows={3}
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-fashion-gold/20 rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-fashion-champagne/40" />
                      <div className="flex text-sm text-fashion-champagne/60">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-fashion-gold hover:text-fashion-gold/80 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-fashion-champagne/60">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {file && (
                        <p className="text-sm text-fashion-gold mt-2">
                          Selected: {file.name}
                        </p>
                      )}
                      {editingItem?.image_url && !file && (
                        <div className="mt-2">
                          <p className="text-sm text-fashion-champagne/60 mb-2">Current image:</p>
                          <img 
                            src={editingItem.image_url} 
                            alt={editingItem.title} 
                            className="h-20 mx-auto object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={uploading}
                  className="btn-luxury flex items-center"
                >
                  {uploading ? (
                    <>
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                      {editingItem ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      {editingItem ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update Item
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
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

export default AdminPortfolio;
