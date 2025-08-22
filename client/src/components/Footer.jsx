import { Heart, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-theme mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-theme-muted">
          {/* Left Side */}
          <p>
            &copy; {new Date().getFullYear()} AI Content Summarizer
          </p>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <span className="font-semibold text-gradient">debjit</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.linkedin.com/in/debjit-ghosh007/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/debjit-stack" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-gray-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;