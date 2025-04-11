
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserPlus, Trash2, Mail, Phone, Users, CheckCircle, XCircle, Clock, BadgeCheck, Badge } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_id: string | null;
  project_title?: string;
  availability: string[] | null;
  skills: string[] | null;
  interests: string[] | null;
  status: string | null;
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
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

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

  const updateVolunteerStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('volunteers')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success(`Volunteer ${status === 'approved' ? 'approved' : 'rejected'}`);
      fetchData();
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      toast.error('Failed to update volunteer status');
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

  const getFilteredVolunteers = () => {
    return volunteers.filter(volunteer => {
      const statusMatch = statusFilter ? volunteer.status === statusFilter : true;
      const projectMatch = projectFilter ? volunteer.project_id === projectFilter : true;
      return statusMatch && projectMatch;
    });
  };

  const filteredVolunteers = getFilteredVolunteers();

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
        <>
          <div className="bg-black/20 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
            <div>
              <label className="block text-xs text-fashion-champagne/60 mb-1">Status Filter</label>
              <select
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value || null)}
                className="bg-black/40 border border-fashion-gold/30 rounded px-3 py-1.5 text-sm text-fashion-champagne"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-fashion-champagne/60 mb-1">Project Filter</label>
              <select
                value={projectFilter || ''}
                onChange={(e) => setProjectFilter(e.target.value || null)}
                className="bg-black/40 border border-fashion-gold/30 rounded px-3 py-1.5 text-sm text-fashion-champagne"
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))}
              </select>
            </div>
            
            <div className="ml-auto self-end">
              <div className="text-sm text-fashion-champagne/60">
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </div>
            </div>
          </div>
        
          <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-fashion-gold/20">
                  <TableHead className="text-fashion-champagne/80">Name</TableHead>
                  <TableHead className="text-fashion-champagne/80">Contact</TableHead>
                  <TableHead className="text-fashion-champagne/80">Project</TableHead>
                  <TableHead className="text-fashion-champagne/80">Skills & Interests</TableHead>
                  <TableHead className="text-fashion-champagne/80">Status</TableHead>
                  <TableHead className="text-fashion-champagne/80">Joined</TableHead>
                  <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map(volunteer => (
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
                      <button 
                        onClick={() => setSelectedVolunteer(volunteer)}
                        className="text-xs text-fashion-gold underline hover:text-fashion-champagne"
                      >
                        View details
                      </button>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        volunteer.status === 'approved' ? 'bg-green-500/10 text-green-400' : 
                        volunteer.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {volunteer.status === 'approved' ? <CheckCircle size={12} className="mr-1" /> : 
                         volunteer.status === 'rejected' ? <XCircle size={12} className="mr-1" /> : 
                         <Clock size={12} className="mr-1" />}
                        {volunteer.status?.charAt(0).toUpperCase() + volunteer.status?.slice(1) || 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-fashion-champagne/60 text-sm">
                      {formatDate(volunteer.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {volunteer.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateVolunteerStatus(volunteer.id, 'approved')}
                              title="Approve"
                              className="p-1 text-fashion-champagne/60 hover:text-green-500 transition-colors"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => updateVolunteerStatus(volunteer.id, 'rejected')}
                              title="Reject"
                              className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
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
          
          <Dialog open={!!selectedVolunteer} onOpenChange={(open) => !open && setSelectedVolunteer(null)}>
            <DialogContent className="bg-black/80 border-fashion-gold/30 text-fashion-champagne max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-serif text-fashion-gold">Volunteer Details</DialogTitle>
                <DialogDescription className="text-fashion-champagne/70">
                  Complete information about {selectedVolunteer?.name}
                </DialogDescription>
              </DialogHeader>
              
              {selectedVolunteer && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-fashion-champagne/60 mb-1">Full Name</h4>
                      <p className="text-fashion-champagne">{selectedVolunteer.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-fashion-champagne/60 mb-1">Status</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        selectedVolunteer.status === 'approved' ? 'bg-green-500/10 text-green-400' : 
                        selectedVolunteer.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {selectedVolunteer.status === 'approved' ? <CheckCircle size={12} className="mr-1" /> : 
                         selectedVolunteer.status === 'rejected' ? <XCircle size={12} className="mr-1" /> : 
                         <Clock size={12} className="mr-1" />}
                        {selectedVolunteer.status?.charAt(0).toUpperCase() + selectedVolunteer.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-fashion-champagne/60 mb-1">Email</h4>
                      <p className="text-fashion-champagne">{selectedVolunteer.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-fashion-champagne/60 mb-1">Phone</h4>
                      <p className="text-fashion-champagne">{selectedVolunteer.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-fashion-champagne/60 mb-1">Project</h4>
                    <p className="text-fashion-champagne">{selectedVolunteer.project_title || 'None assigned'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-fashion-champagne/60 mb-1">Availability</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.availability?.map((time, i) => (
                        <span key={i} className="px-2 py-0.5 bg-black/40 text-fashion-champagne/80 text-xs rounded-full">
                          {time}
                        </span>
                      )) || <span className="text-fashion-champagne/60">Not specified</span>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-fashion-champagne/60 mb-1">Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.skills?.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-fashion-gold/10 text-fashion-gold/80 text-xs rounded-full flex items-center">
                          <BadgeCheck size={12} className="mr-1" /> {skill}
                        </span>
                      )) || <span className="text-fashion-champagne/60">No skills specified</span>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-fashion-champagne/60 mb-1">Interests</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.interests?.map((interest, i) => (
                        <span key={i} className="px-2 py-0.5 bg-fashion-gold/5 text-fashion-champagne/80 text-xs rounded-full flex items-center">
                          <Badge size={12} className="mr-1" /> {interest}
                        </span>
                      )) || <span className="text-fashion-champagne/60">No interests specified</span>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-fashion-champagne/60 mb-1">Joined</h4>
                    <p className="text-fashion-champagne">
                      {new Date(selectedVolunteer.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              )}
              
              <DialogFooter className="flex gap-2 justify-between">
                {selectedVolunteer?.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'approved')}
                      className="border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-950/20"
                    >
                      <CheckCircle size={16} className="mr-2" /> 
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'rejected')}
                      className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-950/20"
                    >
                      <XCircle size={16} className="mr-2" /> 
                      Reject
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2 ml-auto">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(`mailto:${selectedVolunteer?.email}`)}
                  >
                    <Mail size={16} className="mr-2" /> 
                    Email
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminVolunteers;
