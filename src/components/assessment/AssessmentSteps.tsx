
import { useState } from "react";
import AssessmentStepOne from "./steps/StepOne";
import AssessmentStepTwo from "./steps/StepTwo";
import AssessmentStepThree from "./steps/StepThree";

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

// Re-export the step components for direct use if needed
export { default as AssessmentStepOne } from './steps/StepOne';
export { default as AssessmentStepTwo } from './steps/StepTwo';
export { default as AssessmentStepThree } from './steps/StepThree';
