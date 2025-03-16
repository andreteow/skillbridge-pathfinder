
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Skill } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Clock } from "lucide-react";

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
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Skills Analysis</DialogTitle>
        </DialogHeader>

        {/* Career Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Career Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-skill-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Current Role</p>
                    <p className="font-semibold">{currentRole || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-skill-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Total Experience</p>
                    <p className="font-semibold">
                      {experienceMetrics?.totalYearsExperience 
                        ? `${experienceMetrics.totalYearsExperience} years` 
                        : "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-skill-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="font-semibold">{education || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills by Experience */}
        {experienceMetrics && experienceMetrics.skillsByExperience?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Skills by Experience</h3>
            <div className="space-y-3">
              {experienceMetrics.skillsByExperience.slice(0, 6).map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline">{skill.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-skill-primary h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 min-w-[80px] text-right">
                      {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work History */}
        {workHistory && workHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Work History</h3>
            <div className="space-y-4">
              {workHistory.map((job, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">{job.role}</h4>
                      <span className="text-sm text-gray-500">{job.duration} {job.duration === 1 ? 'year' : 'years'}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{job.company} | {job.startDate} - {job.endDate}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills by Category */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Adjust Your Skills</h3>
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-medium text-gray-700">{category}</h4>
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <Slider
                      value={[skill.level]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => onEdit(skill.id, value[0])}
                      className="py-1"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

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
