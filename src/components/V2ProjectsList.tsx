
import { useState, useEffect } from 'react';
import { Calendar, Map } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

const V2ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
        
        setProjects(data as Project[] || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 rounded-full border-4 border-v2-teal border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-v2-lavender/60">No projects found matching your criteria.</p>
        </div>
      ) : (
        // Projects list arranged as a grid
        <div className="grid gap-6">
          {projects.map(project => (
            <div key={project.id}>
              <V2ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const V2ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="v2-card hover:border-v2-teal/50 transition-all duration-300 overflow-hidden rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-3/4">
          <div className="flex items-center mb-4">
            <span className={`
              px-3 py-1 text-xs uppercase tracking-wider rounded-md mr-4
              ${project.status === 'ongoing' ? 'bg-purple-900/30 text-purple-300 border border-purple-600/30'
                : project.status === 'upcoming' ? 'bg-blue-900/30 text-blue-300 border border-blue-600/30'
                : project.status === 'completed' ? 'bg-green-900/30 text-green-300 border border-green-600/30'
                : 'bg-gray-900/30 text-gray-300 border border-gray-600/30'}
            `}>
              {project.status}
            </span>
            <h3 className="text-2xl font-poppins text-v2-cream">{project.title}</h3>
          </div>
          
          <div className="flex flex-col md:flex-row mb-4">
            <div className="flex items-center md:w-1/2 mb-2 md:mb-0">
              <Calendar size={16} className="text-v2-teal mr-2" />
              <span className="text-v2-lavender">{project.duration || 'Not specified'}</span>
            </div>
            <div className="flex items-center md:w-1/2">
              <Map size={16} className="text-v2-teal mr-2" />
              <span className="text-v2-lavender">{project.location || 'Not specified'}</span>
            </div>
          </div>
          
          <p className="text-v2-lavender/80">{project.description}</p>
        </div>
        
        <div className="bg-gradient-to-r from-v2-navy/0 to-v2-teal/10 p-6 flex flex-col justify-between items-end md:w-1/4">
          <div className="mb-4 flex space-x-2">
            {/* Social media icons if needed */}
          </div>
          <button className="v2-btn mt-auto">Details</button>
        </div>
      </div>
    </div>
  );
};

export default V2ProjectsList;
