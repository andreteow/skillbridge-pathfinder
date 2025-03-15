
import { useState } from "react";
import Layout from "@/components/Layout";
import { useSignIn, useWaitlist } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Mail, Users } from "lucide-react";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { join } = useWaitlist();
  const { signIn } = useSignIn();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await join({ emailAddress: email });
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when you're invited!",
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem adding you to the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-skill-primary to-skill-secondary p-3 rounded-xl inline-flex">
              <BarChart3 size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Join the SkillBridge Waitlist</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building the ultimate platform for career transitions. Be among the first to access our AI-powered skill gap analysis and personalized learning pathways.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Reserve Your Spot</h2>
              <p className="text-gray-600 mb-6">
                Get early access to our platform and exclusive features as we roll out to our waitlist members.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Processing...</span>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </form>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-skill-primary" />
                Why Join Our Waitlist?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-skill-primary/10 p-1 rounded mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-skill-primary rounded-full"></div>
                  </div>
                  <span>Personalized skill gap analysis based on your experience</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-skill-primary/10 p-1 rounded mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-skill-primary rounded-full"></div>
                  </div>
                  <span>Custom learning paths tailored to your career goals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-skill-primary/10 p-1 rounded mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-skill-primary rounded-full"></div>
                  </div>
                  <span>Priority access to new features and updates</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-skill-primary/10 p-1 rounded mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-skill-primary rounded-full"></div>
                  </div>
                  <span>Connect with mentors in your target industry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Waitlist;
