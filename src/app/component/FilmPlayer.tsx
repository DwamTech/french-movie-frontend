"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";
import { filmHlsUrl, filmMp4Url } from "../../lib/film";

export function FilmPlayer({ label }: { label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let disposed = false;
    let hls: Hls | undefined;
    let attemptingHls = false;
    let usingFallback = false;
    let startupTimer: ReturnType<typeof setTimeout> | undefined;
    let resumeTime = 0;
    let resumePlayback = false;

    const clearStartupTimer = () => clearTimeout(startupTimer);
    const restorePlayback = () => {
      if (resumeTime > 0) video.currentTime = resumeTime;
      if (resumePlayback) void video.play().catch(() => undefined);
    };

    const useMp4 = () => {
      if (disposed || usingFallback) return;
      usingFallback = true;
      attemptingHls = false;
      clearStartupTimer();
      resumeTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
      resumePlayback = !video.paused;
      video.removeEventListener("error", useMp4);
      hls?.destroy();
      hls = undefined;
      video.addEventListener("loadedmetadata", restorePlayback, { once: true });
      video.src = filmMp4Url;
      video.load();
    };

    const watchStartup = () => {
      if (!attemptingHls || usingFallback || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return;
      clearStartupTimer();
      startupTimer = setTimeout(useMp4, 8000);
    };

    // Choose the source before autoplay starts so MP4 cannot race HLS setup.
    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS controls its own quality; the original MP4 keeps full resolution.
        useMp4();
        return;
      }

      try {
        const { default: HlsPlayer } = await import("hls.js");
        if (disposed) return;
        if (!HlsPlayer.isSupported()) {
          useMp4();
          return;
        }
        attemptingHls = true;
        hls = new HlsPlayer({
          capLevelToPlayerSize: false,
          autoStartLoad: false,
          maxBufferLength: 15,
          maxMaxBufferLength: 30,
          backBufferLength: 15,
          manifestLoadingTimeOut: 5000,
          manifestLoadingMaxRetry: 0,
          levelLoadingTimeOut: 5000,
          levelLoadingMaxRetry: 0,
          fragLoadingMaxRetry: 1,
        });
        hls.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
          if (disposed || !hls) return;
          // Lock the highest resolution before loading any video fragments.
          const highestLevel = hls.levels.reduce((best, level, index, levels) => (
            level.height > levels[best].height ||
            (level.height === levels[best].height && level.bitrate > levels[best].bitrate)
              ? index : best
          ), 0);
          hls.loadLevel = highestLevel;
          hls.startLoad();
        });
        hls.on(HlsPlayer.Events.ERROR, (_event, data) => {
          if (data.fatal) useMp4();
        });
        hls.loadSource(filmHlsUrl);
        hls.attachMedia(video);
        video.addEventListener("error", useMp4);
      } catch {
        useMp4();
      }
    };

    video.addEventListener("play", watchStartup);
    video.addEventListener("playing", clearStartupTimer);
    void setup();

    return () => {
      disposed = true;
      clearStartupTimer();
      video.removeEventListener("play", watchStartup);
      video.removeEventListener("playing", clearStartupTimer);
      video.removeEventListener("error", useMp4);
      video.removeEventListener("loadedmetadata", restorePlayback);
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      preload="metadata"
      playsInline
      poster="/video-cover.jpg"
      aria-label={label}
    >
      <a href={filmMp4Url}>{label}</a>
    </video>
  );
}
