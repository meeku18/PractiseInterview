"use client";
import { db } from '@/utils/db';
import { DefaultTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';

interface ParamsType {
  topicName: string;
}

interface QuestionsType {
  question: string;
  answer: string;
}

function Preview({ params }: { params: ParamsType }) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  useEffect(() => {
    const getQuestionAnswer = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await db
          .select()
          .from(DefaultTable)
          .where(eq(DefaultTable.topicName, params.topicName));

        if (response && response.length > 0) {
          const questionAnswer = JSON.parse(response[0].questionAnswer).questions;
          setQuestions(questionAnswer);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error state or logging as necessary
      } finally {
        setLoading(false); // Set loading to false when done fetching data (success or error)
      }
    };

    getQuestionAnswer();

  }, [params.topicName]); // Add params.topicName to dependency array if necessary

  return (
    <div className="m-6 pb-24">
      <div className="bg-secondary p-6 rounded-md shadow-lg space-y-6">
        <h1 className="font-bold text-2xl text-center mb-4 text-primary">{params.topicName}</h1>
        {loading && <p className="text-center text-lg text-gray-700">Loading...</p>}
        {!loading && questions.length === 0 && <p className="text-center text-lg text-gray-700">No questions found.</p>}
        {!loading && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div className="p-4 bg-white rounded-md shadow-md" key={index}>
                <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}: {q.question}</h3>
                <p className="mt-2 text-base text-gray-600"><strong>Answer:</strong> {q.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
