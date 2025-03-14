
import { Link } from "react-router-dom";
import { BarChart3, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-skill-primary to-skill-secondary p-2 rounded-md">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">SkillBridge</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Helping professionals bridge skill gaps and transition to new careers with personalized learning paths.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-skill-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-skill-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-skill-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-skill-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-skill-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-skill-primary transition-colors">Home</Link></li>
              <li><Link to="/assessment" className="text-gray-600 hover:text-skill-primary transition-colors">Skill Assessment</Link></li>
              <li><Link to="/pathway" className="text-gray-600 hover:text-skill-primary transition-colors">Learning Paths</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-skill-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-skill-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-skill-primary transition-colors">Career Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-skill-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-600 hover:text-skill-primary transition-colors">Industry Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@skillbridge.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Career Street, San Francisco, CA 94107</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 text-sm hover:text-skill-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-skill-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 text-sm hover:text-skill-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
