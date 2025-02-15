import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddInterview from './_components/AddInterview'
import InterviewList from './_components/InterviewList'

function DashBoard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddInterview/>
      </div>
      <div className='mt-10'>
        <InterviewList/>
      </div>
    </div>
  )
}

export default DashBoard
