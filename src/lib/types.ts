export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  currentRole: string;
  experience: number; // years
  education: string;
  skills: Skill[];
  email?: string;
  clerkId?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: {
    skillId: string;
    name: string;
    importance: number; // 0-100
    level: number; // 0-100
  }[];
  avgSalary: string;
  growthRate: string;
  jobCount: number;
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'project' | 'certification' | 'book';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  skillIds: string[];
  imageUrl: string;
}

export interface LearningPath {
  id: string;
  careerPathId: string;
  userId: string;
  resources: LearningResource[];
  progress: number; // 0-100
  estimatedTimeToComplete: string;
  skillGapPercentage: number;
}
