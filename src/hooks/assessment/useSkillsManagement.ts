
import { Skill, UserProfile } from "@/lib/types";

export interface SkillsManagementProps {
  extractedSkills: Skill[];
  setExtractedSkills: (skills: Skill[]) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  setShowSkillsModal: (show: boolean) => void;
  step: number;
}

export const useSkillsManagement = ({
  extractedSkills,
  setExtractedSkills,
  userProfile,
  setUserProfile,
  setShowSkillsModal,
  step
}: SkillsManagementProps) => {
  
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    handleSkillEdit,
    handleConfirmSkills
  };
};
