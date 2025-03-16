
import { Brain, CheckCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  progress: number;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress }) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full mb-4">
          <Brain className="h-12 w-12 text-skill-primary animate-pulse-subtle" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Skills</h2>
        <p className="text-gray-600 mb-6">
          Our AI is analyzing your background and comparing it with industry requirements.
        </p>
      </div>
      
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-sm text-gray-500">{progress}% Complete</p>
      </div>
      
      <div className="space-y-4 max-w-md mx-auto text-left">
        <div className="flex items-start gap-3">
          <div className={`mt-1 ${progress >= 30 ? "text-green-500" : "text-gray-300"}`}>
            {progress >= 30 ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
          </div>
          <div>
            <h3 className="font-medium">Extracting Your Skills</h3>
            <p className="text-sm text-gray-500">Identifying your current skills and experience</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className={`mt-1 ${progress >= 60 ? "text-green-500" : "text-gray-300"}`}>
            {progress >= 60 ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
          </div>
          <div>
            <h3 className="font-medium">Comparing to Career Requirements</h3>
            <p className="text-sm text-gray-500">Matching your skills to industry benchmarks</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className={`mt-1 ${progress >= 90 ? "text-green-500" : "text-gray-300"}`}>
            {progress >= 90 ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
          </div>
          <div>
            <h3 className="font-medium">Building Your Learning Path</h3>
            <p className="text-sm text-gray-500">Creating personalized recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
