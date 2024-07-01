"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

interface resultType{
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string;
    mockId: string;
}

function InterviewList() {
    const [interviewList,setInterviewList] = useState<resultType[]>()
    const {user} = useUser();
    useEffect(()=>{
        user && GetInterviewList();
    },[user])
    const GetInterviewList = async()=>{
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress||""))
        .orderBy(desc(MockInterview.id))

        setInterviewList(result);
        console.log(result);
    }

  return (
    <div>
      <h2 className='text-xl font-semibold'>Preview Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList && interviewList.map((interview,index)=>(
            <InterviewCard interview={interview} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
