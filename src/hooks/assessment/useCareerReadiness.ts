
import { Skill } from "@/lib/types";
import { sampleCareerPaths, calculateSkillGap } from "@/lib/data";

export interface CareerReadinessProps {
  userSkills: Skill[];
  selectedCareer: string;
}

export const useCareerReadiness = ({ 
  userSkills, 
  selectedCareer 
}: CareerReadinessProps) => {
  const careerReadiness = selectedCareer 
    ? calculateSkillGap(
        userSkills, 
        sampleCareerPaths.find(cp => cp.id === selectedCareer)?.requiredSkills || []
      )
    : 0;

  return { careerReadiness };
};
