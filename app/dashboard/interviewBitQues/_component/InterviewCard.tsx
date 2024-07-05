import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
interface resultType {
    id: number;
    createdAt: string;
    mockId: string;
    questionAnswer: string;
    topicName: string;
}
function InterviewCard({interview}:{interview:resultType}) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.topicName}</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-4'>
            <Link href={`/dashboard/interviewBitQues/preview/${interview.topicName}`}  className='w-full'>
                <Button size={"sm"} variant={"outline"} className='w-full'>Preview</Button>
            </Link>
            <Link href={`/dashboard/interviewBitQues/${interview.mockId}/practice`} className='w-full'>
                <Button size={"sm"} className='w-full'>Practice</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewCard
