"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ParamsType {
  interview_id: string
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

function Interview({ params }: { params: ParamsType }) {
  const [interviewData, setInterviewData] = useState<ResponseType | null>(null)
  const [webCamEnabled, setWebCamEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    GetInterviewDetails()
  }, [params.interview_id]) // Only run when interview_id changes

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interview_id))

      setInterviewData(result[0])
    } catch (error) {
      console.error("Error fetching interview details:", error)
      setError("Failed to fetch interview details.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>
  }

  return (
    <div className='my-10 p-4'>
      <h2 className='font-bold text-2xl'>Let&apos; Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-8 gap-5'>
          <div className='border flex flex-col p-4 py-10 rounded-md gap-4'>
            <h2><strong>Job Role:</strong> {interviewData?.jobPosition}</h2>
            <h2><strong>Job Description:</strong> {interviewData?.jobDesc}</h2>
            <h2><strong>Job Experience:</strong> {interviewData?.jobExperience}</h2>
          </div>
          <div className='p-5 border bg-secondary rounded-md'>
            <h2 className='flex gap-2 items-center text-zinc-800'><Lightbulb /><strong>Information</strong></h2>
            <div className='mt-3'>Here I will add info</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          {webCamEnabled ? 
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: "100%"
              }} 
            /> : 
            <WebcamIcon className='w-full my-7 h-80 p-20 rounded-lg border bg-secondary' />
          }
          <Button variant={"ghost"} onClick={() => setWebCamEnabled(true)}>Enable Cam and Mic</Button>
        </div>
      </div>
      <div className='flex justify-end mt-8'>
        <Link href={`/dashboard/interview/${params.interview_id}/start`}>
          <Button>START</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
