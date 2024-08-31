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
