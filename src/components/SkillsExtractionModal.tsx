
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skill } from "@/lib/types";
import { CheckCircle, Edit } from "lucide-react";

interface SkillsExtractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: Skill[];
  onConfirm: () => void;
  onEdit: (skillId: string, newLevel: number) => void;
}

const SkillsExtractionModal = ({
  open,
  onOpenChange,
  skills,
  onConfirm,
  onEdit,
}: SkillsExtractionModalProps) => {
  const [editingSkill, setEditingSkill] = React.useState<string | null>(null);
  const [tempSkillLevel, setTempSkillLevel] = React.useState<number>(0);

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill.id);
    setTempSkillLevel(skill.level);
  };

  const handleSaveEdit = (skillId: string) => {
    onEdit(skillId, tempSkillLevel);
    setEditingSkill(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Extracted Skills</DialogTitle>
          <DialogDescription>
            We've extracted these skills from your profile. Adjust if needed, then confirm to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto">
          {skills.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No skills extracted. Please try again or enter skills manually.
            </div>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{skill.category}</span>
                  </div>
                  
                  {editingSkill === skill.id ? (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleSaveEdit(skill.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditClick(skill)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {editingSkill === skill.id ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tempSkillLevel}
                      onChange={(e) => setTempSkillLevel(parseInt(e.target.value, 10))}
                      className="w-full"
                    />
                    <div className="text-center text-sm">
                      Proficiency: {tempSkillLevel}%
                    </div>
                  </div>
                ) : (
                  <div>
                    <Progress value={skill.level} className="h-2" />
                    <div className="text-right text-xs mt-1">{skill.level}%</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onConfirm}>
            Confirm Skills
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsExtractionModal;
