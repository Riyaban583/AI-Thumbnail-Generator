import { useState } from "react";
import type { IThumbnail, ThumbnailStyle } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../context/AuthContext";
import api from "../configs/api";
import { toast } from "react-hot-toast";

const Generate = () => {
  const { isLoggedIn } = useAuth();

  // FORM STATE
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  // RESULT
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  // OPTIONS
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [styleId, setStyle] =
    useState<ThumbnailStyle>("Bold & Graphic");
  const [colorSchemeId, setColorSchemeId] = useState("vibrant");

  const [styleDropdownOpen, setStyleDropdownOpen] =
    useState(false);

  // =========================
  // GENERATE THUMBNAIL
  // =========================
  const handleGenerate = async () => {
    if (!isLoggedIn) {
      return toast.error("Please login first");
    }

    if (!title.trim()) {
      return toast.error("Title is required");
    }

    setLoading(true);

    try {
      const { data } = await api.post(
        "/api/thumbnail/generate",
        {
          title,
          style: styleId,
          aspect_ratio: aspectRatio,
          color_scheme: colorSchemeId,
          text_overlay: true,
          prompt: additionalDetails,
        }
      );

      // 🔥 DIRECT SET (NO FETCH, NO POLLING)
      setThumbnail(data.thumbnail);
      setLoading(false);
      toast.success("Thumbnail generated");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err.message
      );
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[420px_1fr] gap-8">

            {/* LEFT PANEL */}
            <div className="p-6 rounded-2xl bg-white/8 border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  Create Your Thumbnail
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Describe your vision and let AI bring it to life
                </p>
              </div>

              {/* TITLE */}
              <div>
                <label className="text-sm text-zinc-300">
                  Title or Topic
                </label>
                <input
                  value={title}
                  maxLength={100}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. 10 Tips for Better Sleep"
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10 text-zinc-100"
                />
                <p className="text-right text-xs text-zinc-500 mt-1">
                  {title.length}/100
                </p>
              </div>

              {/* ASPECT RATIO */}
              <AspectRatioSelector
                value={aspectRatio}
                onChange={setAspectRatio}
              />

              {/* STYLE */}
              <StyleSelector
                value={styleId}
                onChange={setStyle}
                isOpen={styleDropdownOpen}
                setIsOpen={setStyleDropdownOpen}
              />

              {/* COLOR */}
              <ColorSchemeSelector
                value={colorSchemeId}
                onChange={setColorSchemeId}
              />

              {/* DETAILS */}
              <div>
                <label className="text-sm text-zinc-300">
                  Additional Details (optional)
                </label>
                <textarea
                  rows={3}
                  value={additionalDetails}
                  onChange={(e) =>
                    setAdditionalDetails(e.target.value)
                  }
                  placeholder="Add any specific elements, mood, or style preferences..."
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10 text-zinc-100"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading
                  ? "Generating..."
                  : "Generate Thumbnail"}
              </button>
            </div>

            {/* RIGHT PANEL */}
            <PreviewPanel
              thumbnail={thumbnail}
              isLoading={loading}
              aspectRatio={aspectRatio}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
