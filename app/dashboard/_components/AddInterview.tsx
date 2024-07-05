"use client";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiMode";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddInterview() {

  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<string>("");
  const { user } = useUser(); // from clerk
  const router = useRouter();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    const InputPrompt = `Job Position:${jobPosition} ,Job Description: ${jobDesc}, Year of Experience:${jobExperience} , Depends on this information please give me 5 interview question with answered in json format , Give question and answer as field in JSON`;
    try {
      const response = await chatSession.sendMessage(InputPrompt); // ```json ,```
      setLoading(false);
      console.log(response.response.text());
      const responseText = response.response.text();
      const parseResponse = responseText.match(/```json\s*([\s\S]*?)\s*```/)[1];
      setJsonResponse(parseResponse);
      // store this in database
      console.log(JSON.parse(parseResponse));
      if (parseResponse) {
        const res = await db
          .insert(MockInterview)
          .values({
            jsonMockResp: parseResponse,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            mockId: uuidv4(),
            createdBy: user?.primaryEmailAddress?.emailAddress || "",
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("Inserted mockId", res);
        if (res) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${res[0].mockId}`);
        }
      } else {
        // some error ->
      }
    } catch (e) {
      console.log(e);
      // add a toast something went wrong
    }
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Tell us about your interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Enter the details</h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex: Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex: Angular,React,Nodejs,Sql etc"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Year of Experience</label>
                    <Input
                      placeholder="Ex:5"
                      type="number"
                      max={50}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center">
                        <ImSpinner2 className="animate-spin"></ImSpinner2>
                        Generating
                      </div>
                    ) : (
                      "Start"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default AddInterview;
