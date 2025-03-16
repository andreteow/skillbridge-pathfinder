
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle } from "lucide-react";
import { sampleCareerPaths } from "@/lib/data";

interface AssessmentStepTwoProps {
  selectedCareer: string;
  setSelectedCareer: (careerPath: string) => void;
}

const AssessmentStepTwo: React.FC<AssessmentStepTwoProps> = ({
  selectedCareer,
  setSelectedCareer,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 2: Select Your Target Career</h2>
      <p className="text-gray-600">
        Choose the career path you want to transition to. We'll analyze the skill gap and create a personalized learning plan.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleCareerPaths.map((career) => (
          <Card 
            key={career.id}
            className={`cursor-pointer transition-all border hover:shadow-md ${
              selectedCareer === career.id ? "border-2 border-skill-primary" : ""
            }`}
            onClick={() => setSelectedCareer(career.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                    <Target className="text-skill-primary w-5 h-5" />
                  </div>
                  <h3 className="font-bold">{career.title}</h3>
                </div>
                {selectedCareer === career.id && (
                  <CheckCircle className="text-skill-primary w-5 h-5" />
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {career.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Avg. Salary:</span>
                  <span className="font-medium">{career.avgSalary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Growth Rate:</span>
                  <span className="font-medium text-green-600">{career.growthRate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Job Openings:</span>
                  <span className="font-medium">{career.jobCount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssessmentStepTwo;
