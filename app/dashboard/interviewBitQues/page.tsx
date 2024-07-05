"use client"
import React from 'react'
import DefaultInterviewList from './_component/DefaultInterviewList'
import { Button } from '@/components/ui/button'
import putComputerNetworkQuestions from '@/utils/ComputerNetworkQuestions'
import putDatabaseManagementQuestions from '@/utils/DatabaseManagementQuestions'
import putOperatingSystemQuestions from '@/utils/OperatingSystemQuestions'

function page() {

  return (
    <div className='m-10 mt-20'>
      <DefaultInterviewList/>
      {/* <Button onClick={putComputerNetworkQuestions}>Put the data</Button>  */}
      {/* <Button onClick={putOperatingSystemQuestions}></Button> */}
    </div>
  )
}

export default page
