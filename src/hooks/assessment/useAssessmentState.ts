
import { useState } from "react";
import { Skill, UserProfile } from "@/lib/types";

export const useAssessmentState = () => {
  // Input form states
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [uploadType, setUploadType] = useState<string>("resume");
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [education, setEducation] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  
  // Process states
  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  
  // Data states
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showSkillsModal, setShowSkillsModal] = useState<boolean>(false);
  const [workHistory, setWorkHistory] = useState<any[]>([]);
  const [experienceMetrics, setExperienceMetrics] = useState<any>(null);

  return {
    // Input form states
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
    
    // Process states
    step,
    setStep,
    isAnalyzing,
    setIsAnalyzing,
    analysisComplete,
    setAnalysisComplete,
    analysisProgress,
    setAnalysisProgress,
    
    // Data states
    extractedSkills,
    setExtractedSkills,
    userProfile,
    setUserProfile,
    showSkillsModal,
    setShowSkillsModal,
    workHistory,
    setWorkHistory,
    experienceMetrics,
    setExperienceMetrics
  };
};
