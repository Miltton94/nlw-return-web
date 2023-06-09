import { FeedbackType, feedbackTypes } from "..";
import CloseButton from "../../CloseButton";
interface FeedbackTypeStepProps {
  onFeedbackTypeChange: (type: FeedbackType) => void;
}

const FeedbackTypeStep = ({ onFeedbackTypeChange }: FeedbackTypeStepProps) => {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              type="button"
              className="w-24  flex flex-1 flex-col items-center px-2 py-5 gap-2 bg-zinc-800 rounded-lg border-2 border-transparent hover:border-violet-500 transition-all focus:border-violet-500 focus:outline-none"
              onClick={() => onFeedbackTypeChange(key as FeedbackType)}>
              <img
                src={value.image.source}
                alt={value.image.alt}
                sizes="40"
              />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default FeedbackTypeStep;
