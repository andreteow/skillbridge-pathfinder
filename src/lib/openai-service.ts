
import { Skill } from './types';

// Types for LinkedIn profile parsing
interface ParsedSkills {
  skills: {
    name: string;
    level: number; // 0-100
    category: string;
    yearsOfExperience?: number;
  }[];
  currentRole?: string;
  experience?: number;
  education?: string;
  graduationYear?: number;
  workHistory?: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    duration: number; // in years
    skills: string[];
  }[];
}

// LinkedIn profile scraper function (simplified mock)
const scrapeLinkedInProfile = async (url: string): Promise<string> => {
  // In a real implementation, you would use a scraping service or LinkedIn API
  // For now, we'll just return the URL to be processed by GPT-4o
  return `LinkedIn Profile URL: ${url}`;
};

// Helper function to calculate skill level based on years of experience
const calculateSkillLevel = (yearsOfExperience: number): number => {
  // Cap at 10 years for 100% level
  const cappedYears = Math.min(yearsOfExperience, 10);
  // Convert to percentage (0-100)
  return Math.round((cappedYears / 10) * 100);
};

// Main function to parse skills using OpenAI
export const parseSkillsWithAI = async (
  input: { type: 'linkedin'; url: string }
): Promise<ParsedSkills> => {
  try {
    // Extract LinkedIn profile URL
    const content = await scrapeLinkedInProfile(input.url);
    
    // Use OpenAI API to extract skills
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured. Please check your environment variables.');
    }
    
    console.log('Using API key:', apiKey ? 'Key is present (hidden for security)' : 'Key is missing');
    
    // Create a mock response for now until the accuracy issues are addressed
    // This is temporary and should be replaced with actual API integration later
    return {
      skills: [
        { name: "Project Management", level: 80, category: "Management", yearsOfExperience: 4 },
        { name: "Strategic Planning", level: 75, category: "Management", yearsOfExperience: 3 },
        { name: "Team Leadership", level: 85, category: "Management", yearsOfExperience: 5 },
        { name: "Business Analysis", level: 70, category: "Business", yearsOfExperience: 3 },
        { name: "Data Analysis", level: 65, category: "Technical", yearsOfExperience: 2 },
        { name: "Stakeholder Management", level: 80, category: "Soft Skills", yearsOfExperience: 4 },
        { name: "Communication", level: 90, category: "Soft Skills", yearsOfExperience: 5 },
        { name: "Problem Solving", level: 85, category: "Soft Skills", yearsOfExperience: 5 },
      ],
      currentRole: "Project Manager",
      experience: 5,
      education: "Bachelor's in Business Administration",
      graduationYear: 2016,
      workHistory: [
        {
          company: "Sample Company",
          role: "Project Manager",
          startDate: "2020-01",
          endDate: "Present",
          duration: 3,
          skills: ["Project Management", "Team Leadership", "Stakeholder Management"]
        },
        {
          company: "Previous Company",
          role: "Project Coordinator",
          startDate: "2017-03",
          endDate: "2019-12",
          duration: 2.8,
          skills: ["Project Coordination", "Data Analysis", "Communication"]
        }
      ]
    };
    
    /* 
    // This is the code to call the OpenAI API with GPT-4o
    // It's commented out until the accuracy issues are addressed
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an AI specialized in detailed professional skills analysis from LinkedIn profiles.
            
            Extract the following information in a structured format:
            
            1. Work History: Extract each job position with company name, role, start date, end date, and approximate duration in years.
            2. Skills by Job: For each job, identify the top 5 skills utilized, categorized by type (e.g., Technical, Management, Soft Skills).
            3. Education: Extract education details including graduation year.
            4. Total Experience: Calculate the total years of professional experience.
            5. Skill Duration: For each unique skill identified, calculate the total years of experience with that skill across all positions.
            
            Return the data in JSON format with fields:
            - workHistory (array of objects with company, role, startDate, endDate, duration, skills)
            - skills (array of objects with name, category, yearsOfExperience)
            - currentRole (string)
            - graduationYear (number or null)
            - experience (total years)
            - education (string)
            
            Be thorough and precise. If the document doesn't contain certain information, make reasonable estimates based on context but indicate uncertainty.`
          },
          {
            role: 'user',
            content
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: "json_object" }, // Force JSON response
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    const aiResponse = result.choices[0].message.content;
    
    // Parse the JSON response from GPT-4o
    const parsedResponse = JSON.parse(aiResponse.trim());
    
    // Process the skills with calculated levels based on years of experience
    const processedSkills = (parsedResponse.skills || []).map((skill: any) => {
      const yearsOfExperience = skill.yearsOfExperience || 0;
      return {
        name: skill.name,
        category: skill.category || 'General',
        yearsOfExperience,
        // Calculate level based on years of experience, capped at 10 years = 100%
        level: skill.level || calculateSkillLevel(yearsOfExperience),
      };
    });
    
    // Calculate total years of experience if not provided
    let totalExperience = parsedResponse.experience;
    if (!totalExperience && parsedResponse.workHistory && parsedResponse.workHistory.length > 0) {
      totalExperience = parsedResponse.workHistory.reduce(
        (total: number, job: any) => total + (job.duration || 0), 
        0
      );
    }
    
    // Calculate experience based on graduation year if no work history is available
    if (!totalExperience && parsedResponse.graduationYear) {
      const currentYear = new Date().getFullYear();
      totalExperience = currentYear - parsedResponse.graduationYear;
    }
    
    // Return the parsed skills data with proper structure
    return {
      skills: processedSkills,
      currentRole: parsedResponse.currentRole,
      experience: totalExperience,
      education: parsedResponse.education,
      graduationYear: parsedResponse.graduationYear,
      workHistory: parsedResponse.workHistory,
    };
    */
    
  } catch (error) {
    console.error('Skill parsing error:', error);
    throw new Error('Failed to extract skills from LinkedIn profile. Please try again.');
  }
};

// Function to convert parsed skills to the app's skill format
export const convertToAppSkills = (parsedSkills: ParsedSkills): Skill[] => {
  return parsedSkills.skills.map((skill, index) => ({
    id: `skill-${index}`,
    name: skill.name,
    level: skill.level,
    category: skill.category,
  }));
};

// Function to get detailed work history from parsed skills
export const getWorkHistory = (parsedSkills: ParsedSkills) => {
  return parsedSkills.workHistory || [];
};

// Function to calculate experience metrics
export const calculateExperienceMetrics = (parsedSkills: ParsedSkills) => {
  const totalYearsExperience = parsedSkills.experience || 0;
  const graduationYear = parsedSkills.graduationYear;
  const currentYear = new Date().getFullYear();
  
  // Infer years since graduation if not directly provided
  const yearsSinceGraduation = graduationYear 
    ? currentYear - graduationYear 
    : totalYearsExperience + 2; // Rough estimate adding typical education time
  
  return {
    totalYearsExperience,
    yearsSinceGraduation,
    skillsByExperience: parsedSkills.skills
      .filter(skill => skill.yearsOfExperience)
      .sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0))
  };
};
