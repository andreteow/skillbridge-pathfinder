
import Layout from "@/components/Layout";
import { RenderStep } from "@/components/assessment/AssessmentSteps";
import AnalysisProgress from "@/components/assessment/AnalysisProgress";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import AssessmentControls from "@/components/assessment/AssessmentControls";
import SkillsExtractionModal from "@/components/SkillsExtractionModal";
import { useAssessment } from "@/hooks/assessment";
import { sampleCareerPaths } from "@/lib/data";

const Assessment = () => {
  const {
    activeTab,
    setActiveTab,
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
    step,
    isAnalyzing,
    analysisComplete,
    analysisProgress,
    extractedSkills,
    userProfile,
    showSkillsModal,
    setShowSkillsModal,
    workHistory,
    experienceMetrics,
    careerReadiness,
    handleSkillEdit,
    handleConfirmSkills,
    runAnalysis,
    handleBack
  } = useAssessment();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!isAnalyzing && !analysisComplete ? (
          <div className="max-w-3xl mx-auto">
            <AssessmentHeader step={step} />
            
            <RenderStep
              step={step}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              uploadType=""
              setUploadType={() => {}}
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
              selectedCareer={selectedCareer}
              setSelectedCareer={setSelectedCareer}
            />
            
            <AssessmentControls
              step={step}
              onBack={handleBack}
              onContinue={runAnalysis}
              isLastStep={step === 3}
            />
          </div>
        ) : isAnalyzing ? (
          <AnalysisProgress progress={analysisProgress} />
        ) : (
          <AssessmentResults 
            userProfile={userProfile}
            selectedCareer={selectedCareer}
            careerPaths={sampleCareerPaths}
            careerReadiness={careerReadiness}
          />
        )}
      </div>
      
      {/* Skills Extraction Modal */}
      {showSkillsModal && (
        <SkillsExtractionModal
          open={showSkillsModal}
          onOpenChange={setShowSkillsModal}
          skills={extractedSkills}
          onEdit={handleSkillEdit}
          onConfirm={handleConfirmSkills}
          workHistory={workHistory}
          experienceMetrics={experienceMetrics}
          currentRole={userProfile?.currentRole}
          education={userProfile?.education}
        />
      )}
    </Layout>
  );
};

export default Assessment;
