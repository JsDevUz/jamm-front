import React, { useEffect, useRef, useState } from "react";
import { getHomeworkSubmissionPlaybackToken } from "../../../api/coursesApi";
import { API_BASE_URL } from "../../../config/env";

/**
 * Mirror of CoursePlayerHomeworkSection's HomeworkHlsVideoPreview but extracted
 * for reuse in the in-meet teacher panel. Streams the student's homework video
 * (HLS-segmented) using the same playback-token endpoint as the course player.
 */
export default function HomeworkSubmissionPlayer({
  courseId,
  lessonId,
  assignmentId,
  submissionUserId,
  streamType,
  fallbackUrl,
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [playbackUrl, setPlaybackUrl] = useState("");
  const [error, setError] = useState("");

  const isHls = streamType === "hls";

  useEffect(() => {
    if (!isHls) {
      setPlaybackUrl(fallbackUrl || "");
      return undefined;
    }
    if (!courseId || !lessonId || !assignmentId || !submissionUserId) {
      return undefined;
    }
    let mounted = true;
    setError("");
    setPlaybackUrl("");
    (async () => {
      try {
        const data = await getHomeworkSubmissionPlaybackToken({
          courseId,
          lessonId,
          assignmentId,
          userId: submissionUserId,
        });
        if (!mounted) return;
        const next = data?.streamUrl || "";
        const absolute = next.startsWith("http")
          ? next
          : `${API_BASE_URL}${next}`;
        setPlaybackUrl(absolute);
      } catch (err) {
        if (mounted) setError("Video yuklanmadi");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [assignmentId, courseId, fallbackUrl, isHls, lessonId, submissionUserId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackUrl) return undefined;

    if (!isHls) {
      video.src = playbackUrl;
      return undefined;
    }

    let cancelled = false;
    (async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = playbackUrl;
        return;
      }
      const module = await import("hls.js");
      if (cancelled) return;
      const Hls = module.default;
      if (!Hls.isSupported()) {
        setError("Bu brauzer HLS qo'llab-quvvatlamaydi");
        return;
      }
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
        fetchSetup: (context, initParams) => {
          const url = String(context?.url || "");
          const isCdn = /^https?:\/\/files\.jamm\.uz\//i.test(url);
          return new Request(url, {
            ...initParams,
            credentials: isCdn ? "omit" : "include",
            headers: initParams?.headers,
          });
        },
      });
      hlsRef.current = hls;
      hls.loadSource(playbackUrl);
      hls.attachMedia(video);
    })();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playbackUrl, isHls]);

  if (error) {
    return (
      <div style={{ color: "var(--lesson-danger, #ef4444)", fontSize: 12 }}>
        {error}
      </div>
    );
  }
  if (!playbackUrl) {
    return (
      <div style={{ color: "var(--lesson-muted, #6b7280)", fontSize: 12 }}>
        Yuklanmoqda...
      </div>
    );
  }
  return (
    <video
      ref={videoRef}
      controls
      preload="metadata"
      style={{
        width: "100%",
        maxHeight: 360,
        borderRadius: 10,
        background: "#000",
        marginTop: 6,
      }}
    />
  );
}
