import { useState } from "react";
import html2canvas from "html2canvas";

import { Camera, Trash } from "phosphor-react";
import Loading from "../Loading";

interface ScreenShotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
}

const ScreenShotButton = ({
  onScreenshotTook,
  screenshot,
}: ScreenShotButtonProps) => {
  const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);

  async function handleTakenScreenshot() {
    setIsTakingScreenShot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);
    setIsTakingScreenShot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}>
        <Trash onClick={() => onScreenshotTook(null)} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakenScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500">
      {isTakingScreenShot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
};

export default ScreenShotButton;
