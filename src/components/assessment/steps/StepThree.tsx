
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AssessmentStepThree: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 3: Additional Information</h2>
      <p className="text-gray-600">
        Help us refine your career path by answering a few more questions.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            What interests you most about this career?
          </label>
          <Textarea 
            placeholder="E.g., I enjoy working with data and finding insights..."
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Do you prefer analytical or creative work?
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="analytical">Strongly Analytical</SelectItem>
              <SelectItem value="mostly-analytical">Mostly Analytical</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="mostly-creative">Mostly Creative</SelectItem>
              <SelectItem value="creative">Strongly Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            How much time can you dedicate to learning per week?
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select hours per week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5">0-5 hours</SelectItem>
              <SelectItem value="5-10">5-10 hours</SelectItem>
              <SelectItem value="10-15">10-15 hours</SelectItem>
              <SelectItem value="15-20">15-20 hours</SelectItem>
              <SelectItem value="20+">20+ hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            When do you hope to transition to your new career?
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="1-year">Within 1 year</SelectItem>
              <SelectItem value="1-2-years">1-2 years</SelectItem>
              <SelectItem value="2+-years">2+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStepThree;
