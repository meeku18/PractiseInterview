"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
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
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}
interface quesAnsType {
  question: string;
  answer: string;
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
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interview_id));
    console.log(result);
    setMockInterviewQue(JSON.parse(result[0].jsonMockResp));
    //console.log(JSON.parse(result[0].jsonMockResp));
    setInterviewData(result[0]);
  };
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
