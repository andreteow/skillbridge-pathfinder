
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  FileCheck,
  GraduationCap,
  LineChart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-skill-background via-white to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Bridge Your Skills Gap, <br />
                <span className="text-skill-primary">Transform Your Career</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                AI-powered skill assessment and personalized learning paths to 
                help you transition into your dream career.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-skill-primary hover:bg-skill-tertiary text-white">
                  <Link to="/assessment" className="flex items-center gap-2">
                    Start Your Assessment
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link to="/pathway" className="flex items-center gap-2">
                    Explore Pathways
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">Join <span className="font-semibold">5,000+</span> professionals</p>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl">Your Career Readiness</h3>
                  <span className="bg-skill-background text-skill-primary text-sm font-medium px-3 py-1 rounded-full">
                    Data Analyst
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Overall Readiness</span>
                    <span className="font-semibold">63%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-skill-primary h-2.5 rounded-full" style={{ width: "63%" }}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-skill-primary" />
                      </div>
                      <span>SQL</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-skill-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-skill-primary" />
                      </div>
                      <span>Python</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-skill-primary h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-skill-primary" />
                      </div>
                      <span>Data Analysis</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-skill-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
                <Link to="/assessment">
                  <Button className="w-full mt-6 bg-skill-primary hover:bg-skill-tertiary text-white">
                    Complete Assessment
                  </Button>
                </Link>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 rotate-6">
                <BarChart3 className="w-10 h-10 text-skill-primary" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 -rotate-6">
                <TrendingUp className="w-10 h-10 text-skill-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How SkillBridge Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your skills, identifies gaps, and creates a personalized learning path to help you transition into your dream career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-skill-background w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="text-skill-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Skill Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Upload your resume or LinkedIn profile to analyze your current skills and expertise.
                </p>
                <div className="flex items-center text-skill-primary">
                  <Link to="/assessment" className="flex items-center gap-1 font-medium">
                    Start Assessment
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-skill-background w-12 h-12 flex items-center justify-center mb-4">
                  <Target className="text-skill-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gap Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Our AI compares your skills to industry requirements and identifies specific gaps to address.
                </p>
                <div className="flex items-center text-skill-primary">
                  <Link to="/assessment" className="flex items-center gap-1 font-medium">
                    View Demo Analysis
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-skill-background w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="text-skill-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learning Pathway</h3>
                <p className="text-gray-600 mb-4">
                  Get a personalized learning plan with courses, projects, and resources tailored to your goals.
                </p>
                <div className="flex items-center text-skill-primary">
                  <Link to="/pathway" className="flex items-center gap-1 font-medium">
                    Explore Pathways
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Career Transitions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the most in-demand career paths and discover the skills you need to make a successful transition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border hover:border-skill-primary transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                    <BarChart3 className="text-skill-primary w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Data Analyst</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Turn raw data into actionable insights that drive business decisions.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">SQL & Python</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Data Visualization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Statistical Analysis</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>18% Growth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>105,700 Jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:border-skill-primary transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                    <LineChart className="text-skill-primary w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">UX Designer</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Design user experiences that are intuitive, accessible, and delightful.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">User Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Wireframing & Prototyping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">UI Design</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>13% Growth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>58,500 Jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:border-skill-primary transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                    <Target className="text-skill-primary w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Product Manager</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Lead product development from conception to launch and beyond.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Market Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Product Strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-sm">Stakeholder Management</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>10% Growth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>97,400 Jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button className="bg-skill-primary hover:bg-skill-tertiary text-white">
              <Link to="/pathway" className="flex items-center gap-2">
                Explore All Career Paths
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-skill-primary mb-2">5,000+</div>
              <p className="text-gray-600">Professionals Helped</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-skill-primary mb-2">150+</div>
              <p className="text-gray-600">Career Paths</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-skill-primary mb-2">1,200+</div>
              <p className="text-gray-600">Learning Resources</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-skill-primary mb-2">85%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who successfully transitioned to new careers with SkillBridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Marketing → Data Analyst</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "SkillBridge identified exactly what I needed to learn to transition from marketing to data analytics. The personalized learning path made all the difference."
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-yellow-400">★</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Michael Torres"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Torres</h4>
                    <p className="text-sm text-gray-500">Teacher → UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "After 10 years in education, I wanted a change. SkillBridge helped me leverage my existing skills and learn new ones to become a UX designer in just 8 months."
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-yellow-400">★</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Jennifer Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Jennifer Patel</h4>
                    <p className="text-sm text-gray-500">Sales → Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The skill gap analysis was eye-opening. It showed me exactly what I needed to focus on to become a product manager, and now I'm thriving in my new role."
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-yellow-400">★</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-skill-primary to-skill-tertiary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Take the first step towards your new career path with a personalized skill assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-skill-primary hover:bg-gray-100">
              <Link to="/assessment" className="flex items-center gap-2">
                Start Your Assessment
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/pathway" className="flex items-center gap-2">
                Explore Pathways
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
