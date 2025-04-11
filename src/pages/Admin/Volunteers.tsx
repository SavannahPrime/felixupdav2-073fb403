
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserPlus, Trash2, Mail, Phone, Users } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_id: string | null;
  project_title?: string;
  availability: string[] | null;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
}

const AdminVolunteers = () => {
  const location = useLocation();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all projects first
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('id, title');
        
      if (projectsError) throw projectsError;
      setProjects(projectsData || []);
      
      // Fetch all volunteers
      const { data: volunteersData, error: volunteersError } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (volunteersError) throw volunteersError;
      
      // Map project titles to volunteers
      const volunteersWithProjects = (volunteersData || []).map(volunteer => {
        const project = projectsData?.find(p => p.id === volunteer.project_id);
        return {
          ...volunteer,
          project_title: project ? project.title : undefined
        };
      });
      
      setVolunteers(volunteersWithProjects);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load volunteers data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this volunteer?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('volunteers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Volunteer deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      toast.error('Failed to delete volunteer');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <AdminLayout title="Volunteers Management" currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-fashion-champagne">Volunteers</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            Export Data
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
          <p className="mt-4 text-fashion-champagne/80">Loading volunteers...</p>
        </div>
      ) : volunteers.length === 0 ? (
        <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
          <UserPlus className="mx-auto h-12 w-12 text-fashion-champagne/40" />
          <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No volunteers yet</h3>
          <p className="mt-1 text-fashion-champagne/60">Volunteers who sign up will appear here</p>
        </div>
      ) : (
        <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-fashion-gold/20">
                <TableHead className="text-fashion-champagne/80">Name</TableHead>
                <TableHead className="text-fashion-champagne/80">Contact</TableHead>
                <TableHead className="text-fashion-champagne/80">Project</TableHead>
                <TableHead className="text-fashion-champagne/80">Availability</TableHead>
                <TableHead className="text-fashion-champagne/80">Joined</TableHead>
                <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map(volunteer => (
                <TableRow key={volunteer.id} className="border-fashion-gold/10">
                  <TableCell className="font-medium text-fashion-champagne">{volunteer.name}</TableCell>
                  <TableCell>
                    <div className="text-fashion-champagne/80 text-sm flex items-center">
                      <Mail size={14} className="mr-1" /> {volunteer.email}
                    </div>
                    {volunteer.phone && (
                      <div className="text-fashion-champagne/60 text-xs flex items-center mt-1">
                        <Phone size={12} className="mr-1" /> {volunteer.phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {volunteer.project_title ? (
                      <span className="text-xs px-2 py-1 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
                        {volunteer.project_title}
                      </span>
                    ) : (
                      <span className="text-xs text-fashion-champagne/40">None assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.availability?.map((time, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-black/40 text-fashion-champagne/80 rounded-full">
                          {time}
                        </span>
                      )) || (
                        <span className="text-xs text-fashion-champagne/40">Not specified</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-fashion-champagne/60 text-sm">
                    {formatDate(volunteer.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <a 
                        href={`mailto:${volunteer.email}`}
                        className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                      >
                        <Mail size={16} />
                      </a>
                      <button 
                        onClick={() => handleDelete(volunteer.id)}
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
    </AdminLayout>
  );
};

export default AdminVolunteers;
