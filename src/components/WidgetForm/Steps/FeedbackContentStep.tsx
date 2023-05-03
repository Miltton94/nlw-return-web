import { useState, FormEvent } from "react";

import { api } from "../../../lib/api";

import { FeedbackType, feedbackTypes } from "..";
import CloseButton from "../../CloseButton";

import { ArrowLeft } from "phosphor-react";
import ScreenShotButton from "../ScreenShotButton";
import Loading from "../../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: (feedbackSent: boolean) => void;
}

const FeedbackContentStep = ({
  feedbackType,
  onFeedbackRestartRequest,
  onFeedbackSent,
}: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSedendFeedback, setIsSedendFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function feedbackTypeSend(e: FormEvent) {
    e.preventDefault();
    setIsSedendFeedback(true);

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot,
      });

      onFeedbackSent(true);
    } catch (error) {
      console.log(error);
      alert("Não foi possível estabelecer conexão");
    } finally {
      setComment("");
      setScreenshot(null);
      setIsSedendFeedback(false);
    }
  }

  return (
    <>
      <header className="flex items-center gap-2">
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={onFeedbackRestartRequest}>
          <ArrowLeft
            weight="bold"
            className="w-4 h-4"
          />
        </button>

        <img
          src={feedbackTypeInfo.image.source}
          alt={feedbackTypeInfo.image.alt}
          className="w-6 h-6"
        />

        <span className="text-xl leading-6">{feedbackTypeInfo.title}</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        <form
          onSubmit={feedbackTypeSend}
          className="my-4 w-full">
          <textarea
            name="feedback"
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-violet-500 focus:ring-violet-500 focus:ring-1 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent "
            placeholder={feedbackTypeInfo.placeholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <footer className="flex mt-2 gap-2">
            <ScreenShotButton
              onScreenshotTook={setScreenshot}
              screenshot={screenshot}
            />

            <button
              type="submit"
              disabled={comment.length === 0 || isSedendFeedback}
              className="p-2 bg-violet-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-violet-300 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500 disabled:opacity-50 disabled:hover:bg-violet-500">
              {isSedendFeedback ? <Loading /> : "Enviar feedback"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default FeedbackContentStep;
