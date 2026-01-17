import React from "react";
import {
  ChevronDown,
  CpuIcon,
  ImageIcon,
  PenToolIcon,
  SquareIcon,
  SparklesIcon,
} from "lucide-react";
import { thumbnailStyles, type ThumbnailStyle } from "../assets/assets";

type Props = {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const DEFAULT_STYLE: ThumbnailStyle = "Bold & Graphic";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: Props) => {
  const safeValue = value || DEFAULT_STYLE;

  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold & Graphic": "High contrast, bold typography, striking visuals",
    "Minimalist": "Clean, simple, lots of white space",
    "Photorealistic": "Photo-based, natural looking",
    "Illustrated": "Hand-drawn, artistic, creative",
    "Tech/Futuristic": "Modern, sleek, tech-inspired",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <SparklesIcon className="h-4 w-4 text-zinc-300" />,
    "Minimalist": <SquareIcon className="h-4 w-4 text-zinc-300" />,
    "Photorealistic": <ImageIcon className="h-4 w-4 text-zinc-300" />,
    "Illustrated": <PenToolIcon className="h-4 w-4 text-zinc-300" />,
    "Tech/Futuristic": <CpuIcon className="h-4 w-4 text-zinc-300" />,
  };

  return (
    <div className="relative space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Thumbnail Style
      </label>

      {/* 🔥 CLOSED BOX (TITLE + DESCRIPTION ADDED) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border px-4 py-3 bg-white/8 border-white/10 text-left"
      >
        <div className="flex gap-3">
          {styleIcons[safeValue]}
          <div>
            <p className="text-zinc-200 font-medium leading-tight">
              {safeValue}
            </p>
            <p className="text-xs text-zinc-400">
              {styleDescriptions[safeValue]}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 text-zinc-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/12 bg-black/30 backdrop-blur-xl shadow-lg">
          {thumbnailStyles.map((style) => {
            const selected = style === safeValue;

            return (
              <button
                key={style}
                type="button"
                onClick={() => {
                  onChange(style);
                  setIsOpen(false);
                }}
                className={`flex w-full gap-3 px-4 py-3 text-left transition ${
                  selected
                    ? "bg-pink-500/15 border-l-4 border-pink-500"
                    : "hover:bg-white/10"
                }`}
              >
                {styleIcons[style]}
                <div>
                  <p className="font-medium text-zinc-200">{style}</p>
                  <p className="text-xs text-zinc-400">
                    {styleDescriptions[style]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
