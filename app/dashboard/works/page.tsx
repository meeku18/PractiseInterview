import React from 'react';

export default function works() {
  return (
    <div className="m-6 pb-24">
      <div className="bg-secondary p-6 rounded-md shadow-lg space-y-6">
        <h1 className="font-bold text-2xl text-center mb-4 text-primary">Interviewer</h1>
        <p className="text-justify leading-relaxed text-gray-700">
          Interviewer is a project developed using Next.js that facilitates the interview process by leveraging advanced technologies.
          Users provide their job position, job description, and experience, and the application uses the Gemini API to generate customized
          interview questions. It then utilizes the same API to provide user answer feedback, displaying ratings and necessary feedback
          for improvement.
        </p>

        <h2 className="font-bold text-xl mt-6 text-primary">Workflow Overview</h2>
        <p className="text-justify leading-relaxed text-gray-700">
          The workflow of Interviewer involves several key steps:
        </p>

        <div className="space-y-2">
          <h3 className="font-bold text-lg ">1. User Input</h3>
          <p className="text-justify leading-relaxed text-gray-700">
            Users input their job position, job description, and experience into the application.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg ">2. Gemini API Integration</h3>
          <p className="text-justify leading-relaxed text-gray-700">
            Interviewer uses the Gemini API to dynamically generate interview questions based on the user&apos; input. It retrieves
            5 questions tailored to the specific job details provided.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg ">3. User Answer Feedback</h3>
          <p className="text-justify leading-relaxed text-gray-700">
            After answering the generated questions, the application utilizes the Gemini API again to provide feedback on user
            answers. This includes ratings and feedback needed for improvement in interview performance.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-xl text-primary">Data Management</h2>
          <p className="text-justify leading-relaxed text-gray-700">
            Interviewer utilizes Drizzle ORM and PostgreSQL for efficient data management. This ensures robust storage and retrieval
            of user inputs, generated questions, and feedback data.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="font-bold text-xl text-primary">Future Enhancements</h2>
          <p className="text-justify leading-relaxed text-gray-700">
            Future enhancements for Interviewer may include:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>Enhanced analytics for interview performance.</li>
            <li>Integration with additional APIs for broader functionality.</li>
            <li>User profile management and customization.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
