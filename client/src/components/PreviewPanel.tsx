import type { AspectRatio, IThumbnail } from "../assets/assets";
import {
  Loader2Icon,
  DownloadIcon,
  ImageIcon,
} from "lucide-react";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses: Record<AspectRatio, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  // 🔽 DOWNLOAD IMAGE (SIMPLE & RELIABLE)
  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        className={`relative overflow-hidden rounded-xl bg-black ${aspectClasses[aspectRatio]}`}
      >
        {/* =====================
            LOADING STATE
           ===================== */}
        {isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/40">
            <Loader2Icon className="size-8 animate-spin text-zinc-300" />
            <p className="text-sm font-medium text-zinc-200">
              AI is creating your thumbnail...
            </p>
            <p className="text-xs text-zinc-400">
              This may take a few seconds
            </p>
          </div>
        )}

        {/* =====================
            IMAGE PREVIEW
           ===================== */}
        {thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title || "Thumbnail preview"}
              className="h-full w-full object-cover"
            />

            {/* DOWNLOAD BUTTON */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
              <button
                onClick={onDownload}
                type="button"
                className="flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium
                           bg-white/40 ring-2 ring-white/50 backdrop-blur
                           hover:scale-105 active:scale-95 transition"
              >
                <DownloadIcon className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* =====================
            EMPTY STATE
           ===================== */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 m-3 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/30">
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10">
              <ImageIcon className="size-10 text-white opacity-50" />
            </div>
            <div className="px-4 text-center">
              <p className="text-zinc-200 font-medium">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
