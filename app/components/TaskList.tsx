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
