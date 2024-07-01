"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import {Lightbulb, WebcamIcon} from "lucide-react";
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ParamsType{
    interview_id:string
}
interface ResponseType{
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string;
    mockId: string;
}
function Interview({params}:{params:ParamsType}) {
    
  const [interviewData,setInterviewData] = useState<ResponseType>();
  const [webCamEnabled,setWebCamEnabled] = useState(false);

  useEffect(()=>{
    console.log(params);
    GetInterviewDetails();
  })
  // using mockId fetching the details from db
  const GetInterviewDetails = async ()=>{
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interview_id));
    console.log(result);
    setInterviewData(result[0]);
  }
  return (
    <div className='my-10 '>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
            <div className='flex flex-col my-8 gap-5'>
                <div className='border flex flex-col p-4 py-10 rounded-md gap-4'>
                    <h2><strong>Job Role:</strong>{interviewData?.jobPosition}</h2>
                    <h2><strong>Job Description:</strong>{interviewData?.jobDesc}</h2>
                    <h2><strong>Job Experience:</strong>{interviewData?.jobExperience}</h2>
                </div>
                <div className='p-5 border bg-secondary rounded-md'>
                    <h2 className='flex gap-2 items-center text-zin'><Lightbulb/><strong>Information</strong></h2>
                    <div className='mt-3'> here i will add info</div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {webCamEnabled? <Webcam
                onUserMedia={()=>setWebCamEnabled(true)}
                onUserMediaError={()=>setWebCamEnabled(false)} 
                mirrored={true}
                style={{
                    height:300,
                    width:"100%"
                }}/>: 
                <WebcamIcon className='w-full my-7 h-80 p-20 rounded-lg border bg-secondary'/>}
                <Button variant={"ghost"} onClick={()=> setWebCamEnabled(true)}>Enable Cam and Mic</Button>
            </div>
        </div>
        <div className='flex justify-end mt-8'>
            <Link href={`/dashboard/interview/${params.interview_id}/start `}>
                <Button>START</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview
