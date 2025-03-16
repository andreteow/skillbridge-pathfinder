
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserProfile, Skill } from "@/lib/types";
import { extractSkillsFromInput } from "@/services/skillsExtractionService";

export interface AnalysisFlowProps {
  activeTab: string;
  linkedinUrl: string;
  currentRole: string;
  experience: string;
  education: string;
  about: string;
  selectedCareer: string;
  step: number;
  setStep: (step: number) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  setAnalysisProgress: (progress: number) => void;
  setAnalysisComplete: (complete: boolean) => void;
  setExtractedSkills: (skills: Skill[]) => void;
  setWorkHistory: (history: any[]) => void;
  setExperienceMetrics: (metrics: any) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setShowSkillsModal: (show: boolean) => void;
  userProfile: UserProfile | null;
}

export const useAnalysisFlow = ({
  activeTab,
  linkedinUrl,
  currentRole,
  experience,
  education,
  about,
  selectedCareer,
  step,
  setStep,
  isAnalyzing,
  setIsAnalyzing,
  setAnalysisProgress,
  setAnalysisComplete,
  setExtractedSkills,
  setWorkHistory,
  setExperienceMetrics,
  setUserProfile,
  setShowSkillsModal,
  userProfile
}: AnalysisFlowProps) => {
  const { toast } = useToast();

  const runAnalysis = async () => {
    if (step === 1) {
      if (activeTab === "linkedin") {
        if (!linkedinUrl) {
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
      
      // Fix: Use a local variable to track progress instead of a function
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          setAnalysisProgress(100);
        } else {
          setAnalysisProgress(currentProgress);
        }
      }, 150);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    runAnalysis,
    handleBack
  };
};
