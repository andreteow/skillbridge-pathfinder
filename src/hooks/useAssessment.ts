
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserProfile, Skill } from "@/lib/types";
import { sampleCareerPaths, sampleUserProfile, calculateSkillGap } from "@/lib/data";
import { extractSkillsFromInput } from "@/services/skillsExtractionService";

export const useAssessment = () => {
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
  
  // State for skills extraction modal
  const [showSkillsModal, setShowSkillsModal] = useState<boolean>(false);
  
  // State for work history and experience metrics
  const [workHistory, setWorkHistory] = useState<any[]>([]);
  const [experienceMetrics, setExperienceMetrics] = useState<any>(null);
  
  const { toast } = useToast();

  const careerReadiness = selectedCareer 
    ? calculateSkillGap(
        userProfile?.skills || sampleUserProfile.skills, 
        sampleCareerPaths.find(cp => cp.id === selectedCareer)?.requiredSkills || []
      )
    : 0;

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
        setIsAnalyzing(true);
        
        const result = await extractSkillsFromInput({
          activeTab,
          uploadType,
          file,
          linkedinUrl,
          currentRole,
          experience,
          education,
          about,
          setAnalysisProgress
        });
        
        setIsAnalyzing(false);
        
        if (!result.success) {
          return; // Stop if skills extraction failed
        }
        
        if (result.skills) setExtractedSkills(result.skills);
        if (result.workHistory) setWorkHistory(result.workHistory);
        if (result.experienceMetrics) setExperienceMetrics(result.experienceMetrics);
        if (result.userProfile) setUserProfile(result.userProfile);
        
        // Show the skills extraction modal
        setShowSkillsModal(true);
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

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    // State
    activeTab,
    setActiveTab,
    uploadType,
    setUploadType,
    file,
    setFile,
    linkedinUrl,
    setLinkedinUrl,
    currentRole,
    setCurrentRole,
    experience,
    setExperience,
    education,
    setEducation,
    about,
    setAbout,
    selectedCareer,
    setSelectedCareer,
    step,
    setStep,
    isAnalyzing,
    analysisComplete,
    analysisProgress,
    extractedSkills,
    userProfile,
    showSkillsModal,
    setShowSkillsModal,
    workHistory,
    experienceMetrics,
    careerReadiness,
    
    // Methods
    handleSkillEdit,
    handleConfirmSkills,
    runAnalysis,
    handleBack
  };
};
