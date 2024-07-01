import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
interface quesAnsType {
  question: string;
  answer: string;
}
function QuestionAns({
  mockResp,
  activeIndex,
}: {
  mockResp: quesAnsType[];
  activeIndex: number;
}) {
  const textToSpeech = ({ question }: { question: string }) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(question);
      window.speechSynthesis.speak(speech);
    } else {
      // todo -> add shadcn alert lib
      alert("Sorry your browser does not support text to speech");
    }
  };
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockResp &&
          mockResp.map((que, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                    ${
                      activeIndex == index
                        ? "bg-primary text-white"
                        : "bg-secondary"
                    }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="m-10 text-sm md:text-lg">
        {mockResp[activeIndex]?.question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech({ question: mockResp[activeIndex]?.question })
        }
      />
      <div className="border rounded-lg p-5 bg-secondary mt-20">
        <h2 className="flex gap-2 items-center">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm my-2">add a note here</h2>
      </div>
    </div>
  );
}

export default QuestionAns;
