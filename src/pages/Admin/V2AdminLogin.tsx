
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js'; // Import crypto-js for hashing

const V2AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Pre-hashed password for "Oloo431" using CryptoJS
  const hashedPassword = CryptoJS.SHA256('Oloo431').toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === 'felix') {
        // Hash the entered password and compare it with the stored hash
        const enteredPasswordHash = CryptoJS.SHA256(password).toString();
        console.log('Entered Password Hash:', enteredPasswordHash);
        console.log('Stored Hashed Password:', hashedPassword);

        if (enteredPasswordHash === hashedPassword) {
          sessionStorage.setItem('isAuthenticated', 'true');
          toast.success('Welcome to your admin dashboard');
          navigate('/admin/dashboard');
        } else {
          toast.error('Invalid password');
        }
      } else {
        toast.error('Invalid username');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-v2-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-4xl text-v2-teal mb-2">FELIX OLOO</h1>
          <p className="text-v2-lavender/80">Admin Portal</p>
        </div>

        <div className="v2-card rounded-lg border border-white/10 p-8 shadow-xl">
          <h2 className="text-2xl font-poppins text-v2-cream mb-6">Secure Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm text-v2-lavender">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-v2-teal/70" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md pl-10 py-2 text-v2-cream focus:outline-none focus:border-v2-teal/50 transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm text-v2-lavender">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-v2-teal/70" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-10 py-2 text-v2-cream focus:outline-none focus:border-v2-teal/50 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-v2-teal/70" />
                  ) : (
                    <Eye size={16} className="text-v2-teal/70" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full v2-btn-solid flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Authenticating</span>
                  <div className="h-4 w-4 rounded-full border-2 border-v2-navy border-t-transparent animate-spin"></div>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-v2-lavender/60">ADMIN</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-v2-teal/70 hover:text-v2-teal transition-colors">
            ← Return to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default V2AdminLogin;
