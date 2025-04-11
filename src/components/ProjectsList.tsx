
import { useState } from 'react';
import { CalendarCheck, Users, Globe, ArrowUpRight } from 'lucide-react';

// Sample projects data (in a real app, this would come from a database)
const PROJECTS = [
  {
    id: 1,
    title: "African Fashion Initiative",
    description: "A mentorship program aimed at supporting emerging African designers and models to gain international exposure.",
    image: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    status: "ongoing",
    startDate: "January 2025",
    endDate: "December 2025",
    participants: 24,
    location: "Nairobi & Paris",
    website: "#",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Fashion Showcase",
    description: "An exhibition featuring sustainable and eco-friendly fashion designs from around the world.",
    image: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    status: "upcoming",
    startDate: "June 2025",
    endDate: "July 2025",
    participants: 15,
    location: "London",
    website: "#"
  },
  {
    id: 3,
    title: "Youth Model Development Workshop",
    description: "A series of workshops teaching young aspiring models the fundamentals of the modeling industry.",
    image: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    status: "completed",
    startDate: "October 2024",
    endDate: "December 2024",
    participants: 50,
    location: "Virtual & New York",
    website: "#"
  }
];

const ProjectsList = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter projects by status
  const filteredProjects = PROJECTS.filter(project => {
    return statusFilter === 'all' || project.status === statusFilter;
  });

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
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-fashion-champagne/60">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: typeof PROJECTS[number] }) => {
  return (
    <div className={`bg-black/30 backdrop-blur-md border ${project.featured ? 'border-fashion-gold/30' : 'border-fashion-gold/10'} rounded-lg overflow-hidden`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="h-full">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
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
                <p className="text-sm">{project.startDate} - {project.endDate}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={16} className="text-fashion-gold mr-2" />
              <div>
                <p className="text-xs text-fashion-champagne/60">Participants</p>
                <p className="text-sm">{project.participants} people</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Globe size={16} className="text-fashion-gold mr-2" />
              <div>
                <p className="text-xs text-fashion-champagne/60">Location</p>
                <p className="text-sm">{project.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            {project.status === 'upcoming' || project.status === 'ongoing' ? (
              <a href="/volunteer" className="btn-luxury py-2 px-4 inline-flex items-center">
                <Users size={16} className="mr-2" />
                Volunteer for this project
              </a>
            ) : (
              <span className="text-fashion-champagne/60 text-sm">This project has been completed</span>
            )}
            
            <a href={project.website} className="flex items-center text-fashion-gold hover:text-fashion-champagne transition-colors text-sm">
              Visit Website <ArrowUpRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
