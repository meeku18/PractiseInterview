import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from '@/utils/geminiMode';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

interface quesAnsType{
    question:string,
    answer:string
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
function RecordAns({mockResp,activeIndex,interviewData}:{mockResp:quesAnsType[],activeIndex:number,interviewData:ResponseType|undefined}) {
    const [userAnswer,setUserAnswer] = useState<string>("");
    const {user} = useUser();
    const [loading,setLoading] = useState(false);

    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
    });

    useEffect(() => {
        results.forEach((result:any) => {
            setUserAnswer(prev => prev + result.transcript);
        });
    }, [results]);

// the asynchronous nature of setUserAnswer is creating problem -> PROBLEM??
    useEffect(()=>{
        if(!isRecording && userAnswer && userAnswer.length>10){
            UpdateUserAnswer();
        }
    },[userAnswer])

    const StartStopRecording = async()=>{
        if(isRecording){
            stopSpeechToText();
            // now i want to feedback from the user
        }else{
            startSpeechToText();
        }
    }
    const UpdateUserAnswer = async()=>{
        setLoading(true);
        const feedbackPrompt = `Question: ${mockResp[activeIndex]?.question} ,UserAnswer: ${userAnswer} ,Depends on question ans user answer for give
        interview question please give us rating for answer and feedback as area of improvement if any in 3-5 lines to improve it in JSON format with rating field and feedback field`
        
        const result = await chatSession.sendMessage(feedbackPrompt);
        const responseText = result.response.text();
        //console.log(responseText);
        const parseResponse = JSON.parse(responseText.match(/```json\s*([\s\S]*?)\s*```/)[1]);
        //console.log(parseResponse);
        console.log(userAnswer);
        // change this to update and insert , so that for same question i dont have multiple answers in my db
        const resp = await db.insert(UserAnswer).values({
            mockIdRef:interviewData?.mockId||"",
            question:mockResp[activeIndex].question,
            correctAnswer:mockResp[activeIndex].answer,
            userAns:userAnswer,
            feedback:parseResponse.feedback,
            rating:parseResponse.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        })
        if(resp){
            setResults([]);
            setUserAnswer('');
            console.log("recorded answer successfully");
            // we can use toast for this
        }
        setResults([]);
        setUserAnswer('');
        setLoading(false);
    }


  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center bg-secondary items-center rounded-lg p-5 mt-20'>
            <div className='flex flex-col justify-center items-center absolute'>
                <WebcamIcon className="h-48 w-full"/>
                <strong className='text-lg'>Turn on the camera</strong>
            </div>
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zIndex:10,
            }}
            />
        </div>
        <Button variant={"outline"} className='my-10' onClick={StartStopRecording}>
            {isRecording?<h2 className='flex gap-2'> <Mic/> Stop Recording</h2>:"Record Answer"}
        </Button>


        {/* <h1>Recording: {isRecording.toString()}</h1>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <ul>
            {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
            ))}
            {interimResult && <li>{interimResult}</li>}
        </ul> */}


    </div>
  )
}

export default RecordAns
