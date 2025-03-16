
import React from "react";
import { Progress } from "@/components/ui/progress";

interface AssessmentHeaderProps {
  step: number;
  totalSteps?: number;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ 
  step, 
  totalSteps = 3 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Skill Assessment</h1>
        <div className="text-sm text-gray-500">
          Step {step} of {totalSteps}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
        <div 
          className="bg-skill-primary h-2 rounded-full transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
