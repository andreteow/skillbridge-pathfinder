
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkHistoryItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  duration: number;
  skills: string[];
}

interface WorkHistoryProps {
  workHistory: WorkHistoryItem[];
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ workHistory }) => {
  if (!workHistory || workHistory.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Work History</h3>
      <div className="space-y-4">
        {workHistory.map((job, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">{job.role}</h4>
                <span className="text-sm text-gray-500">{job.duration} {job.duration === 1 ? 'year' : 'years'}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{job.company} | {job.startDate} - {job.endDate}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary">{skill}</Badge>
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
