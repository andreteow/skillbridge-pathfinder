
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";

interface AssessmentControlsProps {
  step: number;
  onBack: () => void;
  onContinue: () => void;
  isLastStep: boolean;
}

const AssessmentControls: React.FC<AssessmentControlsProps> = ({
  step,
  onBack,
  onContinue,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <Button 
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
      )}
      <div className="flex-1"></div>
      <Button 
        onClick={onContinue}
        className="bg-skill-primary hover:bg-skill-tertiary"
      >
        {isLastStep ? (
          <>
            Run Analysis
            <BarChart3 className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default AssessmentControls;
