import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
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
function InterviewCard({interview}:{interview:resultType}) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-700'>{interview?.jobExperience} Year of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-4'>
            <Link href={`/dashboard/interview/${interview.mockId}/feedback`}  className='w-full'>
                <Button size={"sm"} variant={"outline"} className='w-full'>FeedBack</Button>
            </Link>
            <Link href={`/dashboard/interview/${interview.mockId}`} className='w-full'>
                <Button size={"sm"} className='w-full'>Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewCard
