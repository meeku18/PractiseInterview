"use client";
import { db } from "@/utils/db";
import { DefaultTable, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionAns from "./_component/QuestionAns";
import RecordAns from "./_component/RecordAns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ParamType {
  interview_id: string;
}
interface ResponseType {
  id: number;
  createdAt: string;
  mockId: string;
  questionAnswer: string;
  topicName: string;
}
interface quesAnsType {
  question: string;
  answer: string;
}
function getRandomQuestions(questions:quesAnsType[], count:number){
  // Shuffle array using Fisher-Yates (Knuth) Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  // Return the first 'count' questions
  return questions.slice(0, count);
}

function StartInterview({ params }: { params: ParamType }) {
  const [interviewData, setInterviewData] = useState<ResponseType>();
  const [mockInterviewQues, setMockInterviewQue] = useState<quesAnsType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(DefaultTable)
      .where(eq(DefaultTable.mockId, params.interview_id));
    //console.log(result);
      const questions = JSON.parse(result[0].questionAnswer).questions;
      const randomQuestions = getRandomQuestions(questions, 5); // Get 5 random questions
      setMockInterviewQue(randomQuestions); // Set the selected questions
      setInterviewData(result[0]);

  };
  console.log(mockInterviewQues);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionAns mockResp={mockInterviewQues} activeIndex={activeIndex} />
        <RecordAns
          mockResp={mockInterviewQues}
          activeIndex={activeIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeIndex > 0 && (
          <Button onClick={() => setActiveIndex(activeIndex - 1)}>
            Preview Question
          </Button>
        )}
        {activeIndex < mockInterviewQues.length - 1 && (
          <Button onClick={() => setActiveIndex(activeIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeIndex == mockInterviewQues.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}><Button>End Interview</Button></Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
