
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SkillExperience {
  name: string;
  category: string;
  yearsOfExperience?: number;
  level: number;
}

interface SkillsByExperienceProps {
  skillsByExperience: SkillExperience[];
}

const SkillsByExperience: React.FC<SkillsByExperienceProps> = ({ skillsByExperience }) => {
  if (!skillsByExperience || skillsByExperience.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Skills by Experience</h3>
      <div className="space-y-3">
        {skillsByExperience.slice(0, 6).map((skill, index) => (
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
  );
};

export default SkillsByExperience;
