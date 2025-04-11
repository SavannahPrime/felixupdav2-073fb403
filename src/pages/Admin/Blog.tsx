
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

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
    setImageUrl('');
    setEditingPost(null);
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
      
      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            content,
            image_url: imageUrl || null,
            tags: tags.length > 0 ? tags : null,
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPost.id);
          
        if (error) throw error;
        toast.success('Blog post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([
            {
              title,
              content,
              image_url: imageUrl || null,
              tags: tags.length > 0 ? tags : null,
              status
            }
          ]);
          
        if (error) throw error;
        toast.success('Blog post created successfully');
      }
      
      resetForm();
      fetchPosts();
      
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
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
    setImageUrl(post.image_url || '');
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

  return (
    <AdminLayout title="Blog Management" currentPath={location.pathname}>
      <Tabs defaultValue="posts" className="w-full">
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
                <Button variant="outline" onClick={() => document.querySelector('[data-state="inactive"][value="create"]')?.click()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-fashion-gold/20">
                    <TableHead className="text-fashion-champagne/80">Title</TableHead>
                    <TableHead className="text-fashion-champagne/80">Date</TableHead>
                    <TableHead className="text-fashion-champagne/80">Status</TableHead>
                    <TableHead className="text-fashion-champagne/80">Tags</TableHead>
                    <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map(post => (
                    <TableRow key={post.id} className="border-fashion-gold/10">
                      <TableCell className="font-medium text-fashion-champagne">{post.title}</TableCell>
                      <TableCell className="text-fashion-champagne/80">{formatDate(post.created_at)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
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
                  <label htmlFor="title" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
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
                  <label htmlFor="content" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
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
                  <label htmlFor="image_url" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Featured Image URL
                  </label>
                  <Input
                    id="image_url"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (optional)"
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                  {imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-fashion-champagne/60 mb-1">Preview:</p>
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="h-24 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          toast.error('Invalid image URL');
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="E.g., Fashion, Paris, Runway"
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-fashion-champagne/80 mb-1">
                    Status
                  </label>
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
