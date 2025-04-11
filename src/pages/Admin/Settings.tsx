
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface SettingsState {
  siteTitle: string;
  contactEmail: string;
  enableBlog: boolean;
  enableVolunteers: boolean;
  autoApproveComments: boolean;
  maintenance: boolean;
}

const AdminSettings = () => {
  const location = useLocation();
  const [settings, setSettings] = useState<SettingsState>({
    siteTitle: 'Felix Oloo',
    contactEmail: 'contact@felixoloo.com',
    enableBlog: true,
    enableVolunteers: true,
    autoApproveComments: false,
    maintenance: false
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (field: keyof SettingsState, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully');
      setLoading(false);
    }, 800);
  };
  
  return (
    <AdminLayout title="Settings" currentPath={location.pathname}>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
            <h3 className="text-xl font-serif text-fashion-champagne mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => handleChange('siteTitle', e.target.value)}
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="bg-black/40 border-fashion-gold/30 text-fashion-champagne mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
            <h3 className="text-xl font-serif text-fashion-champagne mb-4">Feature Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableBlog" className="text-fashion-champagne">Enable Blog</Label>
                  <p className="text-sm text-fashion-champagne/60">Show blog section on the website</p>
                </div>
                <Switch
                  id="enableBlog"
                  checked={settings.enableBlog}
                  onCheckedChange={(checked) => handleChange('enableBlog', checked)}
                />
              </div>
              
              <Separator className="border-fashion-gold/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableVolunteers" className="text-fashion-champagne">Enable Volunteers</Label>
                  <p className="text-sm text-fashion-champagne/60">Allow visitors to sign up as volunteers</p>
                </div>
                <Switch
                  id="enableVolunteers"
                  checked={settings.enableVolunteers}
                  onCheckedChange={(checked) => handleChange('enableVolunteers', checked)}
                />
              </div>
              
              <Separator className="border-fashion-gold/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApproveComments" className="text-fashion-champagne">Auto-approve Comments</Label>
                  <p className="text-sm text-fashion-champagne/60">Automatically approve blog comments</p>
                </div>
                <Switch
                  id="autoApproveComments"
                  checked={settings.autoApproveComments}
                  onCheckedChange={(checked) => handleChange('autoApproveComments', checked)}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
            <h3 className="text-xl font-serif text-fashion-champagne mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance" className="text-fashion-champagne">Maintenance Mode</Label>
                  <p className="text-sm text-fashion-champagne/60">Disable public access to the website</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.maintenance}
                  onCheckedChange={(checked) => handleChange('maintenance', checked)}
                />
              </div>
              
              {settings.maintenance && (
                <div className="mt-4 p-4 border border-amber-500/20 bg-amber-500/5 rounded-md flex items-start">
                  <AlertTriangle className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">
                    When maintenance mode is enabled, only administrators will be able to access the website. All other visitors will see a maintenance page.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className="btn-luxury flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
