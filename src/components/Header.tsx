
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart3, BookOpen, Home, LogIn, Menu, X
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSignIn = () => {
    toast({
      title: "Sign In",
      description: "Sign in functionality will be implemented in a future update.",
    });
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-skill-primary to-skill-secondary p-2 rounded-md">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl hidden md:inline-block">SkillBridge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-skill-primary transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/assessment" className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-skill-primary transition-colors">
            <BarChart3 size={18} />
            <span>Skill Assessment</span>
          </Link>
          <Link to="/pathway" className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-skill-primary transition-colors">
            <BookOpen size={18} />
            <span>Learning Paths</span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" onClick={handleSignIn} className="flex items-center gap-1.5">
            <LogIn size={18} />
            <span>Sign In</span>
          </Button>
          <Avatar className="h-9 w-9 border cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback className="bg-skill-primary text-white">GB</AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-3 px-4 absolute w-full z-50">
          <nav className="flex flex-col gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/assessment" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 size={18} />
              <span>Skill Assessment</span>
            </Link>
            <Link 
              to="/pathway" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={18} />
              <span>Learning Paths</span>
            </Link>
            <Button 
              variant="outline" 
              className="mt-2 w-full justify-start"
              onClick={handleSignIn}
            >
              <LogIn size={18} className="mr-2" />
              <span>Sign In</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
