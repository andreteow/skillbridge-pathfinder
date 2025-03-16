import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  CheckCircle, 
  FileUp, 
  Linkedin, 
  Loader2, 
  Target,
  BookOpen,
  Users
} from "lucide-react";
import { sampleCareerPaths, sampleUserProfile, calculateSkillGap } from "@/lib/data";
import { Link } from "react-router-dom";
import { parseSkillsWithAI, convertToAppSkills, getWorkHistory, calculateExperienceMetrics } from "@/lib/openai-service";
import { UserProfile, Skill } from "@/lib/types";
import SkillsExtractionModal from "@/components/SkillsExtractionModal";

const Assessment = () => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [uploadType, setUploadType] = useState<string>("resume");
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [education, setEducation] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  
  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // New state for skills extraction modal
  const [showSkillsModal, setShowSkillsModal] = useState<boolean>(false);
  
  const { toast } = useToast();

  const careerReadiness = selectedCareer 
    ? calculateSkillGap(
        userProfile?.skills || sampleUserProfile.skills, 
        sampleCareerPaths.find(cp => cp.id === selectedCareer)?.requiredSkills || []
      )
    : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const [workHistory, setWorkHistory] = useState<any[]>([]);
  const [experienceMetrics, setExperienceMetrics] = useState<any>(null);

  const extractSkillsFromInput = async () => {
    try {
      setIsAnalyzing(true);
      setAnalysisProgress(10);
      
      let parsedSkills;
      
      if (activeTab === "upload") {
        if (uploadType === "resume" && file) {
          setAnalysisProgress(30);
          parsedSkills = await parseSkillsWithAI({ type: "resume", file });
          setAnalysisProgress(60);
        } else if (uploadType === "linkedin" && linkedinUrl) {
          setAnalysisProgress(30);
          parsedSkills = await parseSkillsWithAI({ type: "linkedin", url: linkedinUrl });
          setAnalysisProgress(60);
        } else {
          throw new Error("No file or LinkedIn URL provided");
        }
      } else {
        // For manual entry, we'll create skills based on user input
        parsedSkills = {
          skills: about.split('.').map((skill, index) => ({
            name: skill.trim(),
            level: 50,
            category: 'General',
            yearsOfExperience: parseInt(experience, 10) || 1
          })).filter(skill => skill.name.length > 0),
          currentRole,
          experience: parseInt(experience, 10),
          education,
          graduationYear: new Date().getFullYear() - parseInt(experience, 10) - 4 // Rough estimate of graduation year
        };
        setAnalysisProgress(60);
      }
      
      // Get work history from parsed skills
      const extractedWorkHistory = getWorkHistory(parsedSkills);
      setWorkHistory(extractedWorkHistory);
      
      // Calculate experience metrics
      const metrics = calculateExperienceMetrics(parsedSkills);
      setExperienceMetrics(metrics);
      
      // Convert parsed skills to app format
      const skills = convertToAppSkills(parsedSkills);
      setExtractedSkills(skills);
      
      // Create a user profile with extracted data
      const profile: UserProfile = {
        id: "user-profile",
        name: "You",
        currentRole: parsedSkills.currentRole || currentRole,
        experience: parsedSkills.experience || parseInt(experience, 10) || 0,
        education: parsedSkills.education || education,
        skills: skills,
      };
      
      setUserProfile(profile);
      setAnalysisProgress(90);
      
      // Show the skills extraction modal
      setIsAnalyzing(false);
      setShowSkillsModal(true);
      
      return true;
    } catch (error) {
      console.error("Error extracting skills:", error);
      toast({
        title: "Error analyzing skills",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsAnalyzing(false);
      return false;
    }
  };

  const handleSkillEdit = (skillId: string, newLevel: number) => {
    const updatedSkills = extractedSkills.map(skill => 
      skill.id === skillId ? { ...skill, level: newLevel } : skill
    );
    
    setExtractedSkills(updatedSkills);
    
    // Also update the skills in the user profile
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        skills: updatedSkills,
      });
    }
  };

  const handleConfirmSkills = () => {
    setShowSkillsModal(false);
    
    // Move to step 2 after confirming skills
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const runAnalysis = async () => {
    if (step === 1) {
      if (activeTab === "upload") {
        if (uploadType === "resume" && !file) {
          toast({
            title: "No file selected",
            description: "Please upload your resume to continue.",
            variant: "destructive",
          });
          return;
        }
        if (uploadType === "linkedin" && !linkedinUrl) {
          toast({
            title: "LinkedIn URL missing",
            description: "Please enter your LinkedIn profile URL to continue.",
            variant: "destructive",
          });
          return;
        }
      } else if (activeTab === "manual") {
        if (!currentRole || !experience || !education || !about) {
          toast({
            title: "Missing information",
            description: "Please fill in all fields to continue.",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Extract skills first (if not already done)
      if (!userProfile) {
        const success = await extractSkillsFromInput();
        if (!success) {
          return; // Stop if skills extraction failed
        }
        // The modal will be shown and the function will return here
        return;
      }
      
      // If skills were already extracted, just go to step 2
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 2 && !selectedCareer) {
      toast({
        title: "Career path not selected",
        description: "Please select a target career path to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Start final analysis
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      
      // Simulate analysis progress
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 1: Share Your Background</h2>
            <p className="text-gray-600">
              Let us analyze your skills and experience to create a personalized career pathway.
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upload">Upload Profile</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant={uploadType === "resume" ? "default" : "outline"}
                    className={`flex-1 justify-start ${uploadType === "resume" ? "bg-skill-primary" : ""}`}
                    onClick={() => setUploadType("resume")}
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Resume
                  </Button>
                  <Button
                    variant={uploadType === "linkedin" ? "default" : "outline"}
                    className={`flex-1 justify-start ${uploadType === "linkedin" ? "bg-skill-primary" : ""}`}
                    onClick={() => setUploadType("linkedin")}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn Profile
                  </Button>
                </div>
                
                {uploadType === "resume" ? (
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center justify-center py-4">
                        <FileUp className="mb-4 h-10 w-10 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          Drag and drop your resume or
                        </p>
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <span className="relative inline-flex items-center justify-center rounded-md bg-skill-primary px-4 py-2 text-sm font-semibold text-white hover:bg-skill-tertiary focus:outline-none focus:ring-2 focus:ring-skill-primary focus:ring-offset-2">
                            Browse Files
                          </span>
                          <Input
                            id="resume-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </label>
                        {file && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{file.name}</span>
                          </div>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="linkedin-url" className="text-sm font-medium">
                        LinkedIn Profile URL
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="linkedin-url"
                          placeholder="https://www.linkedin.com/in/yourprofile"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Make sure your profile is public or we won't be able to access it.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="current-role" className="text-sm font-medium">
                      Current Role
                    </label>
                    <Input
                      id="current-role"
                      placeholder="e.g. Marketing Manager"
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">
                      Years of Experience
                    </label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year === 0 ? "Less than 1 year" : `${year} years`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="education" className="text-sm font-medium">
                    Highest Education
                  </label>
                  <Input
                    id="education"
                    placeholder="e.g. MBA, Marketing"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="about" className="text-sm font-medium">
                    Skills & Experience
                  </label>
                  <Textarea
                    id="about"
                    placeholder="Describe your skills, experience, and any relevant projects..."
                    rows={6}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 2: Select Your Target Career</h2>
            <p className="text-gray-600">
              Choose the career path you want to transition to. We'll analyze the skill gap and create a personalized learning plan.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleCareerPaths.map((career) => (
                <Card 
                  key={career.id}
                  className={`cursor-pointer transition-all border hover:shadow-md ${
                    selectedCareer === career.id ? "border-2 border-skill-primary" : ""
                  }`}
                  onClick={() => setSelectedCareer(career.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                          <Target className="text-skill-primary w-5 h-5" />
                        </div>
                        <h3 className="font-bold">{career.title}</h3>
                      </div>
                      {selectedCareer === career.id && (
                        <CheckCircle className="text-skill-primary w-5 h-5" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {career.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Avg. Salary:</span>
                        <span className="font-medium">{career.avgSalary}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Growth Rate:</span>
                        <span className="font-medium text-green-600">{career.growthRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Job Openings:</span>
                        <span className="font-medium">{career.jobCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 3: Additional Information</h2>
            <p className="text-gray-600">
              Help us refine your career path by answering a few more questions.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  What interests you most about {
                    sampleCareerPaths.find(cp => cp.id === selectedCareer)?.title || "this career"
                  }?
                </label>
                <Textarea 
                  placeholder="E.g., I enjoy working with data and finding insights..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Do you prefer analytical or creative work?
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analytical">Strongly Analytical</SelectItem>
                    <SelectItem value="mostly-analytical">Mostly Analytical</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="mostly-creative">Mostly Creative</SelectItem>
                    <SelectItem value="creative">Strongly Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  How much time can you dedicate to learning per week?
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours per week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5">0-5 hours</SelectItem>
                    <SelectItem value="5-10">5-10 hours</SelectItem>
                    <SelectItem value="10-15">10-15 hours</SelectItem>
                    <SelectItem value="15-20">15-20 hours</SelectItem>
                    <SelectItem value="20+">20+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  When do you hope to transition to your new career?
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="1-2-years">1-2 years</SelectItem>
                    <SelectItem value="2+-years">2+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!isAnalyzing && !analysisComplete ? (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Skill Assessment</h1>
                <div className="text-sm text-gray-500">
                  Step {step} of 3
                </div>
              </div>
              
              <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                <div 
                  className="bg-skill-primary h-2 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
              
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setStep(step - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Back
                  </Button>
                )}
                <div className="flex-1"></div>
                <Button 
                  onClick={runAnalysis}
                  className="bg-skill-primary hover:bg-skill-tertiary"
                >
                  {step === 3 ? (
                    <>
                      Run Analysis
                      <BarChart3 className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : isAnalyzing ? (
          <div className="max-w-3xl mx-auto text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full mb-4">
                <Brain className="h-12 w-12 text-skill-primary animate-pulse-subtle" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analyzing Your Skills</h2>
              <p className="text-gray-600 mb-6">
                Our AI is analyzing your background and comparing it with industry requirements.
              </p>
            </div>
            
            <div className="mb-8">
              <Progress value={analysisProgress} className="h-2 mb-2" />
              <p className="text-sm text-gray-500">{analysisProgress}% Complete</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto text-left">
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${analysisProgress >= 30 ? "text-green-500" : "text-gray-300"}`}>
                  {analysisProgress >= 30 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Extracting Your Skills</h3>
                  <p className="text-sm text-gray-500">Identifying your current skills and experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${analysisProgress >= 60 ? "text-green-500" : "text-gray-300"}`}>
                  {analysisProgress >= 60 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Comparing to Career Requirements</h3>
                  <p className="text-sm text-gray-500">Matching your skills to industry benchmarks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${analysisProgress >= 90 ? "text-green-500" : "text-gray-300"}`}>
                  {analysisProgress >= 90 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Building Your Learning Path</h3>
                  <p className="text-sm text-gray-500">Creating personalized recommendations</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Analysis Complete!</h1>
              <p className="text-gray-600 max-w-lg mx-auto">
                We've analyzed your skills and created a personalized career transition plan.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Career Readiness</h2>
                      <div className="bg-skill-background text-skill-primary px-3 py-1 rounded-full text-sm font-medium">
                        {sampleCareerPaths.find(cp => cp.id === selectedCareer)?.title}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Overall Readiness</span>
                        <span className="font-semibold">{careerReadiness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div 
                          className="bg-skill-primary h-2.5 rounded-full transition-all duration-1000 skill-bar" 
                          style={{ width: `${careerReadiness}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">
                        You're {careerReadiness}% ready for a career as a {
                          sampleCareerPaths.find(cp => cp.id === selectedCareer)?.title
                        }. Follow your personalized learning path to bridge the remaining gap.
                      </p>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Skill Gap Analysis</h3>
                    <div className="space-y-4">
                      {selectedCareer && sampleCareerPaths.find(cp => cp.id === selectedCareer)?.requiredSkills.map(skill => {
                        const userSkill = sampleUserProfile.skills.find(s => s.id === skill.skillId);
                        const userLevel = userSkill ? userSkill.level : 0;
                        const gap = Math.max(0, skill.level - userLevel);
                        
                        return (
                          <div key={skill.skillId} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span>{skill.name}</span>
                              <span className="text-sm">
                                <span className="font-medium">{userLevel}%</span>
                                <span className="text-gray-400"> / {skill.level}% needed</span>
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="flex h-full rounded-full">
                                <div 
                                  className="bg-skill-primary h-2 transition-all duration-1000 skill-bar" 
                                  style={{ width: `${userLevel}%` }}
                                ></div>
                                {gap > 0 && (
                                  <div 
                                    className="bg-gray-300 h-2" 
                                    style={{ width: `${gap}%` }}
                                  ></div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Your Next Steps</h2>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                            <BookOpen className="text-skill-primary w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold">Follow Your Learning Path</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              We've created a personalized learning path to help you bridge your skill gaps efficiently.
                            </p>
                          </div>
                        </div>
                        <Link to="/pathway">
                          <Button size="sm" className="bg-skill-primary hover:bg-skill-tertiary">
                            View Path
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                            <Target className="text-skill-primary w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold">Track Your Progress</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Monitor your skill development and track your progress toward your career goals.
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Dashboard
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                            <Users className="text-skill-primary w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold">Connect with Mentors</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Get guidance from professionals who have successfully made the same career transition.
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Find Mentors
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <Card className="sticky top-24">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-4">Career Insights</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Average Salary</div>
                        <div className="font-semibold">
                          {sampleCareerPaths.find(cp => cp.id === selectedCareer)?.avgSalary}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Job Growth</div>
                        <div className="font-semibold text-green-600">
                          {sampleCareerPaths.find(cp => cp.id === selectedCareer)?.growthRate}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Time to Transition</div>
                        <div className="font-semibold">
                          {careerReadiness >= 70 ? "3-6 months" : careerReadiness >= 50 ? "6-9 months" : "9-12 months"}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Learning Investment</div>
                        <div className="font-semibold">
                          {careerReadiness >= 70 ? "5-10 hrs/week" : careerReadiness >=
