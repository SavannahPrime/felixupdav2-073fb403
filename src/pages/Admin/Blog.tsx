import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Plus, Edit, Trash2, Check, X, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  tags: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminBlog = () => {
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTagsInput('');
    setStatus('draft');
    setImageFile(null);
    setImagePreview('');
    setEditingPost(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Convert comma-separated tags to array
      const tags = tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Upload image if provided using the portfolio concept
      let imageUrl = editingPost?.image_url || null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${Date.now()}.${fileExt}`;
        // Use the "blog" storage bucket (ensure that it exists and is configured properly)
        const { error: uploadError } = await supabase.storage
          .from('blog')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error('Image upload error:', uploadError.message);
          toast.error(`Failed to upload image: ${uploadError.message}`);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('blog')
          .getPublicUrl(filePath);

        if (!publicUrl) {
          console.error('No public URL returned for the uploaded image');
          toast.error('Failed to retrieve image URL. Please try again.');
          return;
        }

        imageUrl = publicUrl;
      }

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            content,
            image_url: imageUrl,
            tags: tags.length > 0 ? tags : null,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPost.id);

        if (error) {
          console.error('Error updating blog post:', error.message);
          toast.error(`Failed to update blog post: ${error.message}`);
          return;
        }

        toast.success('Blog post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([
            {
              title,
              content,
              image_url: imageUrl,
              tags: tags.length > 0 ? tags : null,
              status,
            },
          ]);

        if (error) {
          console.error('Error creating blog post:', error.message);
          toast.error(`Failed to create blog post: ${error.message}`);
          return;
        }

        toast.success('Blog post created successfully');
      }

      resetForm();
      fetchPosts();
      setActiveTab("posts");

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setStatus(post.status);
    
    if (post.image_url) {
      setImagePreview(post.image_url);
    }
    
    setActiveTab("create");
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Blog post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToCreateTab = () => {
    setActiveTab("create");
  };

  return (
    <AdminLayout title="Blog Management" currentPath={location.pathname}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-fashion-champagne">Blog Posts</h2>
            {posts.length > 0 && (
              <div className="text-sm text-fashion-champagne/60">
                {posts.length} post{posts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
              <p className="mt-4 text-fashion-champagne/80">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
              <BookOpen className="mx-auto h-12 w-12 text-fashion-champagne/40" />
              <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No blog posts</h3>
              <p className="mt-1 text-fashion-champagne/60">Get started by creating your first blog post</p>
              <div className="mt-6">
                <Button variant="outline" onClick={navigateToCreateTab}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div 
                  key={post.id}
                  className="group bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden hover:border-fashion-gold/40 transition-all duration-300"
                >
                  {post.image_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-xs text-fashion-champagne/60">{formatDate(post.created_at)}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-fashion-champagne mb-3 truncate group-hover:text-fashion-gold transition-colors">{post.title}</h3>
                    
                    <p className="text-fashion-champagne/80 text-sm mb-4 line-clamp-3">
                      {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags?.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Button onClick={navigateToCreateTab} className="btn-luxury">
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-fashion-champagne">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              {editingPost && (
                <Button variant="outline" size="sm" onClick={resetForm}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content here..."
                    rows={10}
                    required
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Featured Image
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
                    
                    {(imagePreview || editingPost?.image_url) && (
                      <div className="relative">
                        <div className="bg-black/20 border border-fashion-gold/20 rounded-lg p-2">
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden">
                              <img 
                                src={imagePreview || editingPost?.image_url || ''} 
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
                                if (editingPost) {
                                  setEditingPost({...editingPost, image_url: null});
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
                
                <div>
                  <Label htmlFor="tags" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="E.g., Fashion, Paris, Runway"
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <Label htmlFor="status" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Status
                  </Label>
                  <div className="flex space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={status === 'draft'}
                        onChange={() => setStatus('draft')}
                        className="text-fashion-gold focus:ring-fashion-gold"
                      />
                      <span className="ml-2 text-fashion-champagne">Draft</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Published"
                        checked={status === 'Published'}
                        onChange={() => setStatus('Published')}
                        className="text-fashion-gold focus:ring-fashion-gold"
                      />
                      <span className="ml-2 text-fashion-champagne">Published</span>
                    </label>
                  </div>
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
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingPost ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update Post
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Post
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

export default AdminBlog;
