"use client";
import { db } from "@/utils/db";
import { DefaultTable } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

interface ResultType {
  id: number;
  createdAt: string;
  mockId: string;
  questionAnswer: string;
  topicName: string;
}

function DefaultInterviewList() {
  const [interviewList, setInterviewList] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db.select().from(DefaultTable);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
      setError("Failed to fetch interview list.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
        InterviewBit Practice Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.length > 0 ? (
          interviewList.map((interview) => (
            <InterviewCard interview={interview} key={interview.id} />
          ))
        ) : (
          <p>No interviews found.</p>
        )}
      </div>
    </div>
  );
}

export default DefaultInterviewList;
