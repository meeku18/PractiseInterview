"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

function Feedback({ params }: { params: ParamType }) {
  const [feedback, setFeedback] = useState<ResultType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetFeedback();
    }
  }, [user]);

  const GetFeedback = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email is not available.");
      setLoading(false);
      return;
    }

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(
          and(
            eq(UserAnswer.mockIdRef, params.interview_id),
            eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress)
          )
        )
        .orderBy(UserAnswer.id);

      setFeedback(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 md:p-10">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-lg md:text-2xl font-semibold lg:text-3xl font-bold text-primary">
        Congratulations
      </h2>
      {feedback?.length === 0 ? (
        <h2 className="font-bold text-lg md:text-xl">No feedback has been recorded</h2>
      ) : (
        <>
          <h2 className="font-bold text-xl md:text-2xl">Here is your interview feedback</h2>
          <h2 className="text-md md:text-lg my-2 md:my-3">
            Your overall INTERVIEW RATING: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm md:text-base">
            Find below the interview question with the correct answer, your answer, and feedback for improvement
          </h2>
          {feedback &&
            feedback.map((item, index) => (
              <Collapsible key={index} className="mt-4 md:mt-6">
                <CollapsibleTrigger className="p-2 md:p-4 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7">
                  {item.question} <ChevronsUpDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="border p-2 md:p-4 rounded-lg">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 md:p-4 border text-red-600 rounded-lg bg-secondary">
                      <strong>Your answer: </strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 md:p-4 border text-green-600 rounded-lg bg-secondary">
                      <strong>Correct answer: </strong> {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 md:p-4 border text-blue-600 rounded-lg bg-secondary">
                      <strong>Feedback: </strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-4 md:mt-6">
        Go to Dashboard
      </Button>
    </div>
  );
}

export default Feedback;
