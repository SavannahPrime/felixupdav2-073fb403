
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarRange, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Sample projects data (in a real app, this would come from the same source as ProjectsList)
const PROJECTS = [
  {
    id: 1,
    title: "African Fashion Initiative",
    startDate: "January 2025",
    endDate: "December 2025",
    location: "Nairobi & Paris",
  },
  {
    id: 2,
    title: "Sustainable Fashion Showcase",
    startDate: "June 2025",
    endDate: "July 2025",
    location: "London",
  }
];

const volunteerFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  projectId: z.number({ required_error: "Please select a project." }),
  experience: z.string().optional(),
  skills: z.string().min(10, { message: "Please describe your relevant skills and experience." }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability option." }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions." }),
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const VolunteerForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectId: 0,
      experience: "",
      skills: "",
      availability: [],
      agreeTerms: false,
    },
  });

  const onSubmit = (data: VolunteerFormValues) => {
    setSubmitting(true);
    
    // In a real app, this would be an API call to your backend
    console.log("Volunteer data:", data);
    
    // Simulate API delay
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
      toast.success("Thank you for volunteering! We'll be in touch soon.");
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-fashion-gold/20 rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-fashion-gold" />
          </div>
          <h3 className="text-2xl font-serif text-fashion-champagne">Thank You for Volunteering!</h3>
          <p className="text-fashion-champagne/80">
            Your application has been received and will be reviewed by our team. 
            We'll reach out to you soon with more information about the next steps.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="btn-luxury py-2 px-6 inline-block mt-4"
          >
            Register for Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fashion-champagne/80">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John" 
                      {...field} 
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fashion-champagne/80">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Doe" 
                      {...field} 
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fashion-champagne/80">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      {...field} 
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fashion-champagne/80">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+1 (123) 456-7890" 
                      {...field} 
                      className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fashion-champagne/80">Select Project</FormLabel>
                <div className="space-y-4">
                  {PROJECTS.map((project) => (
                    <div 
                      key={project.id}
                      className={`flex p-4 border rounded-md cursor-pointer transition-all ${
                        field.value === project.id 
                          ? 'border-fashion-gold bg-fashion-gold/10' 
                          : 'border-fashion-gold/20 bg-black/20 hover:bg-black/40'
                      }`}
                      onClick={() => form.setValue('projectId', project.id)}
                    >
                      <div className="flex-grow">
                        <h4 className="text-fashion-champagne font-medium">{project.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-fashion-champagne/60">
                          <CalendarRange size={14} className="mr-1" />
                          {project.startDate} - {project.endDate} • {project.location}
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className={`w-5 h-5 rounded-full border ${
                          field.value === project.id 
                            ? 'border-fashion-gold' 
                            : 'border-fashion-gold/30'
                        }`}>
                          {field.value === project.id && (
                            <div className="w-3 h-3 rounded-full bg-fashion-gold m-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fashion-champagne/80">Previous Volunteer Experience (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about any previous volunteer work you've done..." 
                    {...field} 
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50 min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fashion-champagne/80">Relevant Skills & Experience</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your skills and how they could contribute to the project..." 
                    {...field} 
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne placeholder:text-fashion-champagne/50 focus:border-fashion-gold/50 min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="availability"
            render={() => (
              <FormItem>
                <FormLabel className="text-fashion-champagne/80">Availability</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {['Weekdays', 'Evenings', 'Weekends', 'Full-time'].map((option) => (
                    <FormField
                      key={option}
                      control={form.control}
                      name="availability"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  checked
                                    ? field.onChange([...field.value, option])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-fashion-champagne/80">
                              {option}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-fashion-gold/20 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal text-fashion-champagne/80">
                    I agree to the volunteer terms and conditions and understand my information will be stored securely.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="btn-luxury py-2 px-8 flex items-center"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="mr-2">Submitting</span>
                  <div className="h-4 w-4 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VolunteerForm;
