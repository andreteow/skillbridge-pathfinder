
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileUp, Linkedin, CheckCircle, Target } from "lucide-react";
import { sampleCareerPaths } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface AssessmentStepOneProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uploadType: string;
  setUploadType: (type: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  linkedinUrl: string;
  setLinkedinUrl: (url: string) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  education: string;
  setEducation: (education: string) => void;
  about: string;
  setAbout: (about: string) => void;
}

export const AssessmentStepOne: React.FC<AssessmentStepOneProps> = ({
  activeTab,
  setActiveTab,
  uploadType,
  setUploadType,
  file,
  setFile,
  linkedinUrl,
  setLinkedinUrl,
  currentRole,
  setCurrentRole,
  experience,
  setExperience,
  education,
  setEducation,
  about,
  setAbout,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 1: Share Your Background</h2>
      <p className="text-gray-600">
        Let us analyze your skills and experience to create a personalized career pathway.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="upload">Upload Profile</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              variant={uploadType === "resume" ? "default" : "outline"}
              className={`flex-1 justify-start ${uploadType === "resume" ? "bg-skill-primary" : ""}`}
              onClick={() => setUploadType("resume")}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
            <Button
              variant={uploadType === "linkedin" ? "default" : "outline"}
              className={`flex-1 justify-start ${uploadType === "linkedin" ? "bg-skill-primary" : ""}`}
              onClick={() => setUploadType("linkedin")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn Profile
            </Button>
          </div>
          
          {uploadType === "resume" ? (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-4">
                  <FileUp className="mb-4 h-10 w-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    Drag and drop your resume or
                  </p>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <span className="relative inline-flex items-center justify-center rounded-md bg-skill-primary px-4 py-2 text-sm font-semibold text-white hover:bg-skill-tertiary focus:outline-none focus:ring-2 focus:ring-skill-primary focus:ring-offset-2">
                      Browse Files
                    </span>
                    <Input
                      id="resume-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  {file && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{file.name}</span>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="linkedin-url" className="text-sm font-medium">
                  LinkedIn Profile URL
                </label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin-url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Make sure your profile is public or we won't be able to access it.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="current-role" className="text-sm font-medium">
                Current Role
              </label>
              <Input
                id="current-role"
                placeholder="e.g. Marketing Manager"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium">
                Years of Experience
              </label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year === 0 ? "Less than 1 year" : `${year} years`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="education" className="text-sm font-medium">
              Highest Education
            </label>
            <Input
              id="education"
              placeholder="e.g. MBA, Marketing"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="about" className="text-sm font-medium">
              Skills & Experience
            </label>
            <Textarea
              id="about"
              placeholder="Describe your skills, experience, and any relevant projects..."
              rows={6}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AssessmentStepTwoProps {
  selectedCareer: string;
  setSelectedCareer: (careerPath: string) => void;
}

export const AssessmentStepTwo: React.FC<AssessmentStepTwoProps> = ({
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

interface AssessmentStepThreeProps {}

export const AssessmentStepThree: React.FC<AssessmentStepThreeProps> = () => {
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

interface RenderStepProps {
  step: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uploadType: string;
  setUploadType: (type: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  linkedinUrl: string;
  setLinkedinUrl: (url: string) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  education: string;
  setEducation: (education: string) => void;
  about: string;
  setAbout: (about: string) => void;
  selectedCareer: string;
  setSelectedCareer: (careerPath: string) => void;
}

export const RenderStep: React.FC<RenderStepProps> = ({
  step,
  activeTab,
  setActiveTab,
  uploadType,
  setUploadType,
  file,
  setFile,
  linkedinUrl,
  setLinkedinUrl,
  currentRole,
  setCurrentRole,
  experience,
  setExperience,
  education,
  setEducation,
  about,
  setAbout,
  selectedCareer,
  setSelectedCareer,
}) => {
  switch (step) {
    case 1:
      return (
        <AssessmentStepOne
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          uploadType={uploadType}
          setUploadType={setUploadType}
          file={file}
          setFile={setFile}
          linkedinUrl={linkedinUrl}
          setLinkedinUrl={setLinkedinUrl}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          experience={experience}
          setExperience={setExperience}
          education={education}
          setEducation={setEducation}
          about={about}
          setAbout={setAbout}
        />
      );
    
    case 2:
      return (
        <AssessmentStepTwo
          selectedCareer={selectedCareer}
          setSelectedCareer={setSelectedCareer}
        />
      );
    
    case 3:
      return <AssessmentStepThree />;
    
    default:
      return null;
  }
};
