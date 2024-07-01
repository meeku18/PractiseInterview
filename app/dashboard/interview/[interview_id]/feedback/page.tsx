"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
interface ParamType {
  interview_id: string;
}
interface ResultType {
  id: number;
  createdAt: string | null;
  mockIdRef: string;
  question: string;
  correctAnswer: string | null;
  userAns: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
}
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }: { params: ParamType }) {
  const [feedback, setFeeback] = useState<ResultType[]>();
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interview_id))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeeback(result);
  };
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-primary">Congratulation</h2>
      {feedback?.length == 0 ? (
        <h2 className="font-bold text-xl">No Feeback has been recorded</h2>
      ) : (
        <>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-lg my-3">
            Your overall INTERVIEW RATING:<strong>7/10</strong>
          </h2>

          <h2 className="text-sm">
            Find below interview question with correct answer,your answer and
            feedback for improvement
          </h2>
          {feedback &&
            feedback.map((item, index) => (
              <Collapsible key={index} className="mt-6">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7">
                  {item.question} <ChevronsUpDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="border p-2 rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border text-red-600 rounded-lg bg-secondary">
                      <strong>Your answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border text-green-600 rounded-lg bg-secondary">
                      <strong>Correct answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 border text-blue-600 rounded-lg bg-secondary">
                      <strong>Feedback : </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-4">
        Go to DashBoard
      </Button>
    </div>
  );
}

export default Feedback;
