
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Clock } from "lucide-react";

interface CareerSummaryProps {
  currentRole?: string;
  totalYearsExperience?: number;
  education?: string;
}

const CareerSummary: React.FC<CareerSummaryProps> = ({
  currentRole,
  totalYearsExperience,
  education,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Career Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-skill-primary" />
              <div>
                <p className="text-sm text-gray-500">Current Role</p>
                <p className="font-semibold">{currentRole || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-skill-primary" />
              <div>
                <p className="text-sm text-gray-500">Total Experience</p>
                <p className="font-semibold">
                  {totalYearsExperience 
                    ? `${totalYearsExperience} years` 
                    : "Not specified"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-skill-primary" />
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="font-semibold">{education || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerSummary;
