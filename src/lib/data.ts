
import { CareerPath, LearningResource, Skill, UserProfile } from "./types";

export const sampleSkills: Skill[] = [
  { id: "s1", name: "Project Management", level: 85, category: "Management" },
  { id: "s2", name: "Communication", level: 90, category: "Soft Skills" },
  { id: "s3", name: "Leadership", level: 75, category: "Management" },
  { id: "s4", name: "Microsoft Excel", level: 80, category: "Tools" },
  { id: "s5", name: "Problem Solving", level: 85, category: "Soft Skills" },
  { id: "s6", name: "Data Analysis", level: 45, category: "Analytics" },
  { id: "s7", name: "SQL", level: 30, category: "Technical" },
  { id: "s8", name: "Presentation", level: 80, category: "Soft Skills" },
  { id: "s9", name: "Python", level: 20, category: "Programming" },
  { id: "s10", name: "R Programming", level: 10, category: "Programming" },
  { id: "s11", name: "Tableau", level: 40, category: "Tools" },
  { id: "s12", name: "Power BI", level: 30, category: "Tools" },
  { id: "s13", name: "Critical Thinking", level: 75, category: "Soft Skills" },
  { id: "s14", name: "Statistics", level: 50, category: "Analytics" },
];

export const sampleUserProfile: UserProfile = {
  id: "u1",
  name: "Jane Smith",
  currentRole: "Marketing Manager",
  experience: 8,
  education: "MBA, Marketing",
  skills: sampleSkills,
};

export const sampleCareerPaths: CareerPath[] = [
  {
    id: "c1",
    title: "Data Analyst",
    description: "Transform raw data into actionable insights that drive business decisions.",
    requiredSkills: [
      { skillId: "s6", name: "Data Analysis", importance: 95, level: 90 },
      { skillId: "s7", name: "SQL", importance: 90, level: 85 },
      { skillId: "s9", name: "Python", importance: 85, level: 80 },
      { skillId: "s11", name: "Tableau", importance: 80, level: 75 },
      { skillId: "s12", name: "Power BI", importance: 70, level: 70 },
      { skillId: "s14", name: "Statistics", importance: 85, level: 80 },
      { skillId: "s4", name: "Microsoft Excel", importance: 75, level: 80 },
      { skillId: "s5", name: "Problem Solving", importance: 80, level: 85 },
      { skillId: "s13", name: "Critical Thinking", importance: 85, level: 85 },
    ],
    avgSalary: "$85,000",
    growthRate: "18% (Much faster than average)",
    jobCount: 105700,
  },
  {
    id: "c2",
    title: "UX Designer",
    description: "Design user experiences that are intuitive, accessible, and delightful.",
    requiredSkills: [
      { skillId: "s15", name: "User Research", importance: 90, level: 85 },
      { skillId: "s16", name: "Wireframing", importance: 95, level: 90 },
      { skillId: "s17", name: "Prototyping", importance: 90, level: 85 },
      { skillId: "s18", name: "UI Design", importance: 85, level: 80 },
      { skillId: "s19", name: "Usability Testing", importance: 85, level: 80 },
      { skillId: "s2", name: "Communication", importance: 80, level: 85 },
      { skillId: "s5", name: "Problem Solving", importance: 85, level: 85 },
    ],
    avgSalary: "$95,000",
    growthRate: "13% (Faster than average)",
    jobCount: 58500,
  },
  {
    id: "c3",
    title: "Product Manager",
    description: "Lead the development of products from conception to launch and beyond.",
    requiredSkills: [
      { skillId: "s1", name: "Project Management", importance: 90, level: 85 },
      { skillId: "s2", name: "Communication", importance: 95, level: 90 },
      { skillId: "s3", name: "Leadership", importance: 90, level: 85 },
      { skillId: "s5", name: "Problem Solving", importance: 90, level: 90 },
      { skillId: "s13", name: "Critical Thinking", importance: 90, level: 85 },
      { skillId: "s20", name: "Market Research", importance: 85, level: 80 },
      { skillId: "s21", name: "Product Strategy", importance: 90, level: 85 },
    ],
    avgSalary: "$110,000",
    growthRate: "10% (Faster than average)",
    jobCount: 97400,
  },
];

export const sampleLearningResources: LearningResource[] = [
  {
    id: "lr1",
    title: "SQL for Data Analysis",
    provider: "Udacity",
    type: "course",
    duration: "4 weeks",
    level: "beginner",
    url: "https://www.udacity.com/course/sql-for-data-analysis--ud198",
    skillIds: ["s7"],
    imageUrl: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr2",
    title: "Introduction to Python Programming",
    provider: "Coursera",
    type: "course",
    duration: "8 weeks",
    level: "beginner",
    url: "https://www.coursera.org/learn/python",
    skillIds: ["s9"],
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr3",
    title: "Data Visualization with Tableau",
    provider: "Udemy",
    type: "course",
    duration: "6 weeks",
    level: "intermediate",
    url: "https://www.udemy.com/course/tableau-for-beginners/",
    skillIds: ["s11"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr4",
    title: "Statistics for Data Science",
    provider: "edX",
    type: "course",
    duration: "8 weeks",
    level: "intermediate",
    url: "https://www.edx.org/learn/statistics",
    skillIds: ["s14"],
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr5",
    title: "Build a Data Dashboard with Python",
    provider: "DataCamp",
    type: "project",
    duration: "2 weeks",
    level: "intermediate",
    url: "https://www.datacamp.com/projects",
    skillIds: ["s9", "s6"],
    imageUrl: "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr6",
    title: "Microsoft Excel for Data Analysis",
    provider: "LinkedIn Learning",
    type: "course",
    duration: "3 weeks",
    level: "beginner",
    url: "https://www.linkedin.com/learning/excel-for-data-analysis",
    skillIds: ["s4", "s6"],
    imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr7",
    title: "Data Analyst Certification",
    provider: "Microsoft",
    type: "certification",
    duration: "12 weeks",
    level: "advanced",
    url: "https://learn.microsoft.com/en-us/certifications/data-analyst-associate/",
    skillIds: ["s6", "s7", "s12"],
    imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lr8",
    title: "Power BI Desktop for Business Intelligence",
    provider: "Udemy",
    type: "course",
    duration: "5 weeks",
    level: "intermediate",
    url: "https://www.udemy.com/course/microsoft-power-bi-desktop-for-business-intelligence/",
    skillIds: ["s12"],
    imageUrl: "https://images.unsplash.com/photo-1638839587384-3a0845e0f9a3?q=80&w=300&auto=format&fit=crop",
  },
];

export const calculateSkillGap = (
  userSkills: Skill[], 
  requiredSkills: CareerPath["requiredSkills"]
): number => {
  let totalGap = 0;
  let maxPossibleScore = 0;
  
  // For each required skill
  requiredSkills.forEach(requiredSkill => {
    // Find the user's corresponding skill
    const userSkill = userSkills.find(s => s.id === requiredSkill.skillId);
    
    // Calculate the skill gap (if user has the skill, otherwise it's the full requirement)
    const skillGap = userSkill ? 
      Math.max(0, requiredSkill.level - userSkill.level) : 
      requiredSkill.level;
    
    // Weight the gap by the importance of the skill
    totalGap += skillGap * (requiredSkill.importance / 100);
    
    // Calculate the maximum possible score (if all skills were at 0)
    maxPossibleScore += requiredSkill.level * (requiredSkill.importance / 100);
  });
  
  // Calculate the gap percentage
  const gapPercentage = (totalGap / maxPossibleScore) * 100;
  
  // Return the readiness percentage (inverse of gap)
  return Math.round(100 - gapPercentage);
};

export const generateLearningPath = (
  userId: string,
  careerPath: CareerPath, 
  userSkills: Skill[]
): LearningResource[] => {
  const resources: LearningResource[] = [];
  const skillGaps: { skillId: string; gap: number }[] = [];
  
  // Calculate skill gaps
  careerPath.requiredSkills.forEach(requiredSkill => {
    const userSkill = userSkills.find(s => s.id === requiredSkill.skillId);
    const currentLevel = userSkill ? userSkill.level : 0;
    const gap = Math.max(0, requiredSkill.level - currentLevel);
    
    if (gap > 0) {
      skillGaps.push({
        skillId: requiredSkill.skillId,
        gap: gap,
      });
    }
  });
  
  // Sort skills by gap size (largest first)
  skillGaps.sort((a, b) => b.gap - a.gap);
  
  // For each skill gap, find appropriate resources
  skillGaps.forEach(skillGap => {
    const skillResources = sampleLearningResources.filter(resource => 
      resource.skillIds.includes(skillGap.skillId)
    );
    
    // Add resources if found and not already included
    skillResources.forEach(resource => {
      if (!resources.some(r => r.id === resource.id)) {
        resources.push(resource);
      }
    });
  });
  
  return resources;
};
