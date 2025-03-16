
import { useAssessmentState } from './useAssessmentState';
import { useSkillsManagement } from './useSkillsManagement';
import { useAnalysisFlow } from './useAnalysisFlow';
import { useCareerReadiness } from './useCareerReadiness';
import { sampleUserProfile } from '@/lib/data';

export const useAssessment = () => {
  // Get all state from the state hook
  const state = useAssessmentState();
  
  // Get skills management functions
  const skillsManagement = useSkillsManagement({
    extractedSkills: state.extractedSkills,
    setExtractedSkills: state.setExtractedSkills,
    userProfile: state.userProfile,
    setUserProfile: state.setUserProfile,
    setShowSkillsModal: state.setShowSkillsModal,
    step: state.step
  });
  
  // Get analysis flow functions
  const analysisFlow = useAnalysisFlow({
    ...state,
    userProfile: state.userProfile
  });
  
  // Get career readiness calculation
  const { careerReadiness } = useCareerReadiness({
    userSkills: state.userProfile?.skills || sampleUserProfile.skills,
    selectedCareer: state.selectedCareer
  });
  
  return {
    // States from useAssessmentState
    ...state,
    
    // Methods from useSkillsManagement
    ...skillsManagement,
    
    // Methods from useAnalysisFlow
    ...analysisFlow,
    
    // Data from useCareerReadiness
    careerReadiness
  };
};

export * from './useAssessmentState';
export * from './useSkillsManagement';
export * from './useAnalysisFlow';
export * from './useCareerReadiness';
