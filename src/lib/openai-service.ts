
import { Skill } from './types';

// Types for LinkedIn profile and resume parsing
interface ParsedSkills {
  skills: {
    name: string;
    level: number; // 0-100
    category: string;
  }[];
  currentRole?: string;
  experience?: number;
  education?: string;
}

// LinkedIn profile scraper function (simplified mock)
const scrapeLinkedInProfile = async (url: string): Promise<string> => {
  // In a real implementation, you would use a scraping service or LinkedIn API
  // For now, we'll just return the URL to be processed by GPT-4o
  return `LinkedIn Profile URL: ${url}`;
};

// Function to extract text content from a PDF/DOC file
const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      if (!event.target) return reject("Error reading file");
      
      // For PDF files, you'd use a PDF parser library
      // For simplicity, we're just returning text for demonstration
      // In a production app, use a proper parser like pdf.js or mammoth.js
      resolve(`Resume content extracted from: ${file.name}`);
    };
    
    reader.onerror = () => reject(reader.error);
    
    // Read the file as text
    if (file.type === "application/pdf") {
      // For PDF files, read as array buffer (in production)
      reader.readAsText(file);
    } else {
      // For DOC/DOCX/TXT, read as text
      reader.readAsText(file);
    }
  });
};

// Main function to parse skills using OpenAI
export const parseSkillsWithAI = async (
  input: { type: 'linkedin'; url: string } | { type: 'resume'; file: File }
): Promise<ParsedSkills> => {
  try {
    // Step 1: Extract content based on input type
    let content = "";
    
    if (input.type === 'linkedin') {
      content = await scrapeLinkedInProfile(input.url);
    } else {
      content = await extractTextFromFile(input.file);
    }
    
    // Step 2: Use OpenAI API to extract skills
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured. Please check your environment variables.');
    }
    
    console.log('Using API key:', apiKey ? 'Key is present (hidden for security)' : 'Key is missing');
    
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
            content: `You are a skilled AI specialized in extracting professional skills from LinkedIn profiles and resumes. 
            Extract all skills and categorize them. For each skill, estimate proficiency level on a scale of 0-100 based on the context.
            Also extract current role, years of experience, and highest education.
            Return the data in JSON format with fields: skills (array of objects with name, level, category), currentRole, experience, education.`
          },
          {
            role: 'user',
            content
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    const aiResponse = result.choices[0].message.content;
    
    // Step 3: Parse the JSON response from GPT-4o
    try {
      // Parse the JSON response, handling any irregularities in the AI's output
      const parsedResponse = JSON.parse(aiResponse.trim());
      
      // Return the parsed skills data with proper structure
      return {
        skills: parsedResponse.skills.map((skill: any) => ({
          name: skill.name,
          level: skill.level || 50, // Default to 50 if not provided
          category: skill.category || 'General',
        })),
        currentRole: parsedResponse.currentRole,
        experience: parsedResponse.experience,
        education: parsedResponse.education,
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback with empty skills array if parsing fails
      return { skills: [] };
    }
  } catch (error) {
    console.error('Skill parsing error:', error);
    throw new Error('Failed to extract skills. Please try again.');
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
