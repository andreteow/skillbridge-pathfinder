
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skill } from "@/lib/types";
import CareerSummary from "@/components/skills-modal/CareerSummary";
import SkillsByExperience from "@/components/skills-modal/SkillsByExperience";
import WorkHistory from "@/components/skills-modal/WorkHistory";
import SkillsByCategory from "@/components/skills-modal/SkillsByCategory";

interface SkillsExtractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: Skill[];
  onConfirm: () => void;
  onEdit: (skillId: string, newLevel: number) => void;
  workHistory?: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    duration: number;
    skills: string[];
  }[];
  experienceMetrics?: {
    totalYearsExperience: number;
    yearsSinceGraduation: number;
    skillsByExperience: {
      name: string;
      category: string;
      yearsOfExperience?: number;
      level: number;
    }[];
  };
  currentRole?: string;
  education?: string;
}

const SkillsExtractionModal: React.FC<SkillsExtractionModalProps> = ({
  open,
  onOpenChange,
  skills,
  onConfirm,
  onEdit,
  workHistory = [],
  experienceMetrics,
  currentRole,
  education,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Skills Analysis</DialogTitle>
        </DialogHeader>

        {/* Career Summary */}
        <CareerSummary 
          currentRole={currentRole}
          totalYearsExperience={experienceMetrics?.totalYearsExperience}
          education={education}
        />

        {/* Skills by Experience */}
        {experienceMetrics && experienceMetrics.skillsByExperience?.length > 0 && (
          <SkillsByExperience skillsByExperience={experienceMetrics.skillsByExperience} />
        )}

        {/* Work History */}
        {workHistory && workHistory.length > 0 && (
          <WorkHistory workHistory={workHistory} />
        )}
        
        {/* Skills by Category */}
        <SkillsByCategory skills={skills} onEdit={onEdit} />

        <DialogFooter className="mt-6">
          <Button 
            onClick={onConfirm}
            className="w-full md:w-auto bg-skill-primary hover:bg-skill-tertiary"
          >
            Confirm Skills
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsExtractionModal;
