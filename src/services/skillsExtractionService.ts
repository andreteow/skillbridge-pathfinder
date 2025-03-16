
import { parseSkillsWithAI, convertToAppSkills, getWorkHistory, calculateExperienceMetrics } from "@/lib/openai-service";
import { Skill, UserProfile } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

export interface SkillsExtractionParams {
  activeTab: string;
  linkedinUrl: string;
  currentRole: string;
  experience: string;
  education: string;
  about: string;
  file?: File | null;
  setAnalysisProgress: (progress: number) => void;
}

export const extractSkillsFromInput = async ({
  activeTab,
  linkedinUrl,
  currentRole,
  experience,
  education,
  about,
  file,
  setAnalysisProgress,
}: SkillsExtractionParams): Promise<{
  success: boolean;
  skills?: Skill[];
  workHistory?: any[];
  experienceMetrics?: any;
  userProfile?: UserProfile;
}> => {
  try {
    setAnalysisProgress(10);
    
    let parsedSkills;
    
    if (activeTab === "linkedin" && linkedinUrl) {
      setAnalysisProgress(30);
      parsedSkills = await parseSkillsWithAI({ type: "linkedin", url: linkedinUrl });
      setAnalysisProgress(60);
    } else if (activeTab === "resume" && file) {
      setAnalysisProgress(30);
      // Convert file to base64
      const base64 = await fileToBase64(file);
      parsedSkills = await parseSkillsWithAI({ 
        type: "resume", 
        fileContent: base64,
        fileName: file.name
      });
      setAnalysisProgress(60);
    } else if (activeTab === "manual") {
      // For manual entry, we'll create skills based on user input
      parsedSkills = {
        skills: about.split('.').map((skill, index) => ({
          name: skill.trim(),
          level: 50,
          category: 'General',
          yearsOfExperience: parseInt(experience, 10) || 1
        })).filter(skill => skill.name.length > 0),
        currentRole,
        experience: parseInt(experience, 10),
        education,
        graduationYear: new Date().getFullYear() - parseInt(experience, 10) - 4 // Rough estimate of graduation year
      };
      setAnalysisProgress(60);
    } else {
      throw new Error("No input provided for skills analysis");
    }
    
    // Get work history from parsed skills
    const extractedWorkHistory = getWorkHistory(parsedSkills);
    
    // Ensure work history skills are strings, not objects
    const processedWorkHistory = extractedWorkHistory.map(job => ({
      ...job,
      skills: job.skills.map((skill: any) => {
        // If skill is an object with a name property, extract the name
        if (typeof skill === 'object' && skill !== null && 'name' in skill) {
          return skill.name;
        }
        return String(skill); // Ensure it's a string
      })
    }));
    
    // Calculate experience metrics
    const metrics = calculateExperienceMetrics(parsedSkills);
    
    // Convert parsed skills to app format
    const skills = convertToAppSkills(parsedSkills);
    
    // Create a user profile with extracted data
    const profile: UserProfile = {
      id: "user-profile",
      name: "You",
      currentRole: parsedSkills.currentRole || currentRole,
      experience: parsedSkills.experience || parseInt(experience, 10) || 0,
      education: parsedSkills.education || education,
      skills: skills,
    };
    
    setAnalysisProgress(90);
    
    return {
      success: true,
      skills,
      workHistory: processedWorkHistory, // Use the processed work history
      experienceMetrics: metrics,
      userProfile: profile
    };
  } catch (error) {
    console.error("Error extracting skills:", error);
    toast({
      title: "Error analyzing skills",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive",
    });
    return { success: false };
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};
