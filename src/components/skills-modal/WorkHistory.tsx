
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkHistoryProps {
  workHistory: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    duration: number;
    skills: string[];
  }[];
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ workHistory }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Work History</h3>
      <div className="space-y-4">
        {workHistory.map((job, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {job.role} at {job.company}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {job.startDate} - {job.endDate} ({job.duration} {job.duration === 1 ? 'year' : 'years'})
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="bg-gray-100">
                    {/* Ensure skill is a string, not an object */}
                    {typeof skill === 'string' ? skill : (skill as any)?.name || 'Skill'}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
