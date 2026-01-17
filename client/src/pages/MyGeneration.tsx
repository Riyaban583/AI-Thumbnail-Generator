import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import type { IThumbnail } from "../assets/assets";
import {
  DownloadIcon,
  TrashIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../configs/api";
import { toast } from "react-hot-toast";

const MyGeneration = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // ✅ FETCH ALL GENERATIONS
  // =========================
  const fetchThumbnails = async () => {
    try {
      setLoading(true);

      // 🔥 CORRECT ENDPOINT
      const { data } = await api.get(
        "/api/thumbnail/my-generations"
      );

      // 🔥 BACKEND RETURNS ARRAY DIRECTLY
      setThumbnails(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔥 DOWNLOAD IMAGE
  // =========================
  const handleDownload = async (image_url: string) => {
    try {
      const response = await fetch(image_url);
      const blob = await response.blob();

      const ext = blob.type.split("/")[1] || "jpg";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `thumbnail.${ext}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(link.href);
    } catch {
      toast.error("Download failed");
    }
  };

  // =========================
  // 🗑 DELETE THUMBNAIL
  // =========================
  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this thumbnail?"
      );
      if (!confirmDelete) return;

      const { data } = await api.delete(
        `/api/thumbnail/${id}`
      );

      toast.success(data.message);

      // 🔥 REMOVE FROM UI
      setThumbnails((prev) =>
        prev.filter((t) => t._id !== id)
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  // =========================
  // EFFECT
  // =========================
  useEffect(() => {
    if (isLoggedIn) {
      fetchThumbnails();
    }
  }, [isLoggedIn]);

  // =========================
  // UI
  // =========================
  return (
    <>
      <SoftBackdrop />

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* HEADER */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-zinc-200">
            My Generations
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View all your generated thumbnails
          </p>
        </div>

        {/* GRID */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8 mt-8">
            {thumbnails.map((thumb) => {
              const aspectClass =
                aspectRatioClassMap[thumb.aspect_ratio!] ||
                "aspect-video";

              return (
                <div
                  key={thumb._id}
                  onClick={() =>
                    navigate(`/generate/${thumb._id}`)
                  }
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 shadow-xl break-inside-avoid"
                >
                  {/* IMAGE */}
                  <div
                    className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                  >
                    <img
                      src={thumb.image_url}
                      alt={thumb.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                      {thumb.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.style}
                      </span>
                      {thumb.color_scheme && (
                        <span className="px-2 py-0.5 rounded bg-white/8">
                          {thumb.color_scheme}
                        </span>
                      )}
                      {thumb.aspect_ratio && (
                        <span className="px-2 py-0.5 rounded bg-white/8">
                          {thumb.aspect_ratio}
                        </span>
                      )}
                    </div>

                    {/* DATE + ACTIONS */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-zinc-500">
                        {new Date(
                          thumb.createdAt!
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <div className="flex gap-2">
                        <TrashIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(thumb._id);
                          }}
                          className="size-6 bg-black/40 p-1 rounded hover:bg-pink-600 cursor-pointer"
                        />

                        <DownloadIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(
                              thumb.image_url!
                            );
                          }}
                          className="size-6 bg-black/40 p-1 rounded hover:bg-pink-600 cursor-pointer"
                        />

                        <Link
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          target="_blank"
                          to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                        >
                          <ArrowUpRightIcon className="size-6 bg-black/40 p-1 rounded hover:bg-pink-600 cursor-pointer" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              No thumbnails yet
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              Generate your first thumbnail to see it here
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
