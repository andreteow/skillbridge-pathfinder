
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
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
import { FileUp, Linkedin, Upload } from "lucide-react";

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

const AssessmentStepOne: React.FC<AssessmentStepOneProps> = ({
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 1: Share Your Background</h2>
      <p className="text-gray-600">
        Let us analyze your skills and experience to create a personalized career pathway.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="linkedin">LinkedIn Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume Upload</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="linkedin" className="space-y-6">
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
                  className="flex-1"
                />
                <Button className="bg-[#0077B5] hover:bg-[#005e8b]">
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Make sure your profile is public or we won't be able to access it.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Upload Your Resume (PDF, DOCX)
              </label>
              <div 
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors
                  ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                onClick={triggerFileUpload}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.doc"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <FileUp className="h-8 w-8 mx-auto text-green-500" />
                    <p className="font-medium text-green-700">{file.name}</p>
                    <p className="text-sm text-green-600">File uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="font-medium">Drag and drop or click to upload</p>
                    <p className="text-sm text-gray-500">
                      We'll extract your skills and experience automatically
                    </p>
                  </div>
                )}
              </div>
            </div>
            {file && (
              <Button 
                variant="outline" 
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Remove resume
              </Button>
            )}
            <p className="text-xs text-gray-500">
              We support PDF and Word documents (.docx, .doc) up to 5MB.
            </p>
          </div>
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

export default AssessmentStepOne;
