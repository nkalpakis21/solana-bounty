import React from 'react';
import TaskList from './TaskList';

interface ProjectOverviewProps {
  projectId: string;
}

const ProjectOverview = ({ projectId }: ProjectOverviewProps) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Title {/* TODO: Fetch project title based on projectId */}</h1>
      <p>Description: {/* TODO: Fetch project description */}</p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Open Tasks</h2>
        <TaskList projectId={projectId} />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Top Contributors</h2>
        <ul>
          <li>Contributor 1 - Earned: {/* TODO: Insert earnings */}</li>
          <li>Contributor 2 - Earned: {/* TODO: Insert earnings */}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectOverview;
