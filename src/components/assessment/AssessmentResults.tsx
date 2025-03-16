
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Target, Users, CheckCircle } from "lucide-react";
import { CareerPath, Skill, UserProfile } from "@/lib/types";
import { Link } from "react-router-dom";

interface AssessmentResultsProps {
  userProfile: UserProfile;
  selectedCareer: string;
  careerPaths: CareerPath[];
  careerReadiness: number;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  userProfile,
  selectedCareer,
  careerPaths,
  careerReadiness,
}) => {
  const selectedCareerPath = careerPaths.find(cp => cp.id === selectedCareer);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Analysis Complete!</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          We've analyzed your skills and created a personalized career transition plan.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Career Readiness</h2>
                <div className="bg-skill-background text-skill-primary px-3 py-1 rounded-full text-sm font-medium">
                  {selectedCareerPath?.title}
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Overall Readiness</span>
                  <span className="font-semibold">{careerReadiness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-skill-primary h-2.5 rounded-full transition-all duration-1000 skill-bar" 
                    style={{ width: `${careerReadiness}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  You're {careerReadiness}% ready for a career as a {selectedCareerPath?.title}. 
                  Follow your personalized learning path to bridge the remaining gap.
                </p>
              </div>
              
              <h3 className="font-semibold mb-4">Skill Gap Analysis</h3>
              <div className="space-y-4">
                {selectedCareerPath?.requiredSkills.map(skill => {
                  const userSkill = userProfile.skills.find(s => s.id === skill.skillId);
                  const userLevel = userSkill ? userSkill.level : 0;
                  const gap = Math.max(0, skill.level - userLevel);
                  
                  return (
                    <div key={skill.skillId} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span>{skill.name}</span>
                        <span className="text-sm">
                          <span className="font-medium">{userLevel}%</span>
                          <span className="text-gray-400"> / {skill.level}% needed</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="flex h-full rounded-full">
                          <div 
                            className="bg-skill-primary h-2 transition-all duration-1000 skill-bar" 
                            style={{ width: `${userLevel}%` }}
                          ></div>
                          {gap > 0 && (
                            <div 
                              className="bg-gray-300 h-2" 
                              style={{ width: `${gap}%` }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Next Steps</h2>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                      <BookOpen className="text-skill-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Follow Your Learning Path</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        We've created a personalized learning path to help you bridge your skill gaps efficiently.
                      </p>
                    </div>
                  </div>
                  <Link to="/pathway">
                    <Button size="sm" className="bg-skill-primary hover:bg-skill-tertiary">
                      View Path
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                      <Target className="text-skill-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Track Your Progress</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Monitor your skill development and track your progress toward your career goals.
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Dashboard
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mt-1">
                      <Users className="text-skill-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Connect with Mentors</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Get guidance from professionals who have successfully made the same career transition.
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Find Mentors
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Career Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Salary</div>
                  <div className="font-semibold">
                    {selectedCareerPath?.avgSalary}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Job Growth</div>
                  <div className="font-semibold text-green-600">
                    {selectedCareerPath?.growthRate}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Time to Transition</div>
                  <div className="font-semibold">
                    {careerReadiness >= 70 ? "3-6 months" : careerReadiness >= 50 ? "6-9 months" : "9-12 months"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Learning Investment</div>
                  <div className="font-semibold">
                    {careerReadiness >= 70 ? "5-10 hrs/week" : careerReadiness >= 50 ? "10-15 hrs/week" : "15-20 hrs/week"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
