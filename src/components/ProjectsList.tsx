
import { useState, useEffect } from 'react';
import { CalendarCheck, Users, Globe, ArrowUpRight, Video, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  status: string;
  duration: string | null;
  location: string | null;
  volunteers_count: number;
  created_at: string;
  media_url: string | null;
  media_type: string | null;
  accepts_volunteers: boolean | null;
}

const ProjectsList = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch projects from Supabase
  useEffect(() => {
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
    
    fetchProjects();
  }, []);
  
  // Filter projects when filter or data changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.status === statusFilter));
    }
  }, [statusFilter, projects]);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 rounded-full border-4 border-fashion-gold border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => setStatusFilter('all')} 
            className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'all' ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setStatusFilter('ongoing')} 
            className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'ongoing' ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
          >
            Ongoing
          </button>
          <button 
            onClick={() => setStatusFilter('upcoming')} 
            className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'upcoming' ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setStatusFilter('completed')} 
            className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'completed' ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-fashion-champagne/60">No projects found matching your criteria.</p>
          </div>
        ) : (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  // Default image if none is provided
  const mediaUrl = project.media_url || project.image_url || "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png";
  const isVideo = project.media_type === 'video';
  
  return (
    <div className={`bg-black/30 backdrop-blur-md border border-fashion-gold/10 rounded-lg overflow-hidden`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="h-full relative">
            {isVideo ? (
              <div className="h-full">
                <video 
                  src={mediaUrl} 
                  className="w-full h-full object-cover"
                  controls
                />
                <div className="absolute top-2 left-2 bg-black/60 p-1 rounded-md">
                  <Video size={16} className="text-fashion-gold" />
                </div>
              </div>
            ) : (
              <div className="h-full relative">
                <img 
                  src={mediaUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                {project.media_type === 'image' && (
                  <div className="absolute top-2 left-2 bg-black/60 p-1 rounded-md">
                    <Image size={16} className="text-fashion-gold" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-serif text-fashion-champagne">{project.title}</h3>
            <span className={`text-xs px-3 py-1 rounded-full ${
              project.status === 'ongoing' ? 'bg-green-500/10 text-green-400' : 
              project.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400' : 
              'bg-gray-500/10 text-gray-400'
            }`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          
          <p className="text-fashion-champagne/80 mb-6">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <CalendarCheck size={16} className="text-fashion-gold mr-2" />
              <div>
                <p className="text-xs text-fashion-champagne/60">Duration</p>
                <p className="text-sm">{project.duration || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={16} className="text-fashion-gold mr-2" />
              <div>
                <p className="text-xs text-fashion-champagne/60">Participants</p>
                <p className="text-sm">{project.volunteers_count} people</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Globe size={16} className="text-fashion-gold mr-2" />
              <div>
                <p className="text-xs text-fashion-champagne/60">Location</p>
                <p className="text-sm">{project.location || 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            {project.accepts_volunteers && (project.status === 'upcoming' || project.status === 'ongoing') ? (
              <a href="/volunteer" className="btn-luxury py-2 px-4 inline-flex items-center">
                <Users size={16} className="mr-2" />
                Volunteer for this project
              </a>
            ) : project.status === 'completed' ? (
              <span className="text-fashion-champagne/60 text-sm">This project has been completed</span>
            ) : (
              <span className="text-fashion-champagne/60 text-sm">This project is not accepting volunteers</span>
            )}
            
            <a href="#" className="flex items-center text-fashion-gold hover:text-fashion-champagne transition-colors text-sm">
              Learn More <ArrowUpRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
