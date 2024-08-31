#!/bin/bash

# Remove existing components and pages
rm -rf app/components app/dashboard app/project app/wallet app/submission app/governance app/profile styles public

# Create directories
mkdir -p app/components app/dashboard app/project app/wallet app/submission app/governance app/profile styles public

# Create TypeScript component files with Tailwind CSS
cat > app/components/Dashboard.tsx <<EOL
import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Contribution Summary</h2>
        <p>Total Contributions: {/* TODO: Insert total contributions */}</p>
        <p>Total Earned: {/* TODO: Insert total earnings */}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <ul>
          <li>Activity Item 1</li>
          <li>Activity Item 2</li>
          <li>Activity Item 3</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p>Balance: {/* TODO: Insert wallet balance */}</p>
      </div>
    </div>
  );
};

export default Dashboard;
EOL

cat > app/components/ProjectOverview.tsx <<EOL
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
EOL

cat > app/components/TaskList.tsx <<EOL
import React from 'react';

interface TaskListProps {
  projectId: string;
}

const TaskList = ({ projectId }: TaskListProps) => {
  return (
    <div>
      <ul>
        <li className="mb-4">
          Task 1 - Reward: {/* TODO: Insert reward amount */}
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Claim</button>
        </li>
        <li>
          Task 2 - Reward: {/* TODO: Insert reward amount */}
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Claim</button>
        </li>
      </ul>
    </div>
  );
};

export default TaskList;
EOL

cat > app/components/Wallet.tsx <<EOL
import React from 'react';

const Wallet = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Balance</h2>
        <p>{/* TODO: Fetch and display wallet balance */}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <ul>
          <li>Transaction 1 - Amount: {/* TODO: Insert amount */}</li>
          <li>Transaction 2 - Amount: {/* TODO: Insert amount */}</li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
EOL

cat > app/components/SubmissionForm.tsx <<EOL
import React from 'react';

interface SubmissionFormProps {
  projectId: string;
}

const SubmissionForm = ({ projectId }: SubmissionFormProps) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submit Contribution</h2>
      <form>
        <label className="block mb-2">Title</label>
        <input className="border p-2 w-full mb-4" type="text" name="title" />
        <label className="block mb-2">Description</label>
        <textarea className="border p-2 w-full mb-4" name="description"></textarea>
        <label className="block mb-2">File Upload</label>
        <input className="border p-2 w-full mb-4" type="file" name="file" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
EOL

cat > app/components/GovernanceDashboard.tsx <<EOL
import React from 'react';

const GovernanceDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Governance</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Active Proposals</h2>
        <ul>
          <li className="mb-4">
            Proposal 1 - Status: {/* TODO: Insert status */}
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Vote</button>
          </li>
          <li>
            Proposal 2 - Status: {/* TODO: Insert status */}
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Vote</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
EOL

cat > app/components/UserProfile.tsx <<EOL
import React from 'react';

const UserProfile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p>Name: {/* TODO: Fetch user name */}</p>
        <p>Reputation Score: {/* TODO: Fetch reputation score */}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Contributions</h2>
        <ul>
          <li>Contribution 1 - Status: {/* TODO: Insert status */}</li>
          <li>Contribution 2 - Status: {/* TODO: Insert status */}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
EOL

# Create page files with TypeScript
cat > app/page.tsx <<EOL
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Blockchain Incentive Platform</h1>
      <p className="mb-4">Contribute to open-source projects and earn rewards!</p>
      <Link href="/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
EOL

cat > app/dashboard/page.tsx <<EOL
import React from 'react';
import Dashboard from '../../components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="p-6">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
EOL

cat > app/project/[id]/page.tsx <<EOL
import React from 'react';
import ProjectOverview from '../../../components/ProjectOverview';

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="p-6">
      <ProjectOverview projectId={id} />
    </div>
  );
};

export default ProjectPage;
EOL

# Update global styles for Tailwind CSS
cat > styles/globals.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Remove existing styles if any
rm -rf public/*

echo "Project structure and files created successfully."
