
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Skill } from "@/lib/types";

interface SkillsByCategoryProps {
  skills: Skill[];
  onEdit: (skillId: string, newLevel: number) => void;
}

const SkillsByCategory: React.FC<SkillsByCategoryProps> = ({ skills, onEdit }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
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
  );
};

export default SkillsByCategory;
