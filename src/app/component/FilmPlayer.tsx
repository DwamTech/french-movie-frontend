"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type Hls from "hls.js";
import { getFilmSources } from "../../lib/film";

export function FilmPlayer({ label, language }: { label: string; language: "ar" | "fr" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const { mp4Url, hlsUrl } = getFilmSources(language);

  const playFilm = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => setShowPlayButton(true));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.autoplay = false;
    setShowPlayButton(true);

    let disposed = false;
    let hls: Hls | undefined;
    let attemptingHls = false;
    let usingFallback = false;
    let startupTimer: ReturnType<typeof setTimeout> | undefined;
    let resumeTime = 0;
    let resumePlayback = false;
    let playbackRequested = false;

    const clearStartupTimer = () => clearTimeout(startupTimer);
    const restorePlayback = () => {
      if (resumeTime > 0) video.currentTime = resumeTime;
      if (resumePlayback) void video.play().catch(() => setShowPlayButton(true));
    };

    const useMp4 = () => {
      if (disposed || usingFallback) return;
      usingFallback = true;
      attemptingHls = false;
      clearStartupTimer();
      resumeTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
      resumePlayback = playbackRequested;
      video.removeEventListener("error", useMp4);
      hls?.destroy();
      hls = undefined;
      video.addEventListener("loadedmetadata", restorePlayback, { once: true });
      video.src = mp4Url;
      video.load();
    };

    const watchStartup = () => {
      if (!playbackRequested || !attemptingHls || usingFallback || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return;
      clearStartupTimer();
      startupTimer = setTimeout(useMp4, 8000);
    };
    const onPlay = () => {
      playbackRequested = true;
      setShowPlayButton(false);
      if (hls?.levels.length) hls.startLoad();
      watchStartup();
    };
    const onPause = () => {
      playbackRequested = false;
      clearStartupTimer();
      setShowPlayButton(true);
    };

    const setup = async () => {
      if (!hlsUrl || video.canPlayType("application/vnd.apple.mpegurl")) {
        // Keep full resolution when HLS is unavailable or browser-controlled.
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
          // Select 720p now, but wait for Play before downloading video fragments.
          const highestLevel = hls.levels.reduce((best, level, index, levels) => (
            level.height > levels[best].height ||
            (level.height === levels[best].height && level.bitrate > levels[best].bitrate)
              ? index : best
          ), 0);
          hls.loadLevel = highestLevel;
          if (playbackRequested) hls.startLoad();
        });
        hls.on(HlsPlayer.Events.ERROR, (_event, data) => {
          if (data.fatal) useMp4();
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        video.addEventListener("error", useMp4);
        watchStartup();
      } catch {
        useMp4();
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onPause);
    video.addEventListener("playing", clearStartupTimer);
    void setup();

    return () => {
      disposed = true;
      clearStartupTimer();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onPause);
      video.removeEventListener("playing", clearStartupTimer);
      video.removeEventListener("error", useMp4);
      video.removeEventListener("loadedmetadata", restorePlayback);
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [mp4Url, hlsUrl]);

  return (
    <div className="film-player">
      <video
        ref={videoRef}
        controls
        preload="metadata"
        playsInline
        poster="/video-cover.jpg"
        aria-label={label}
      >
        <a href={mp4Url}>{label}</a>
      </video>
      {showPlayButton && <div className="film-play-overlay">
        <button className="film-play-button" type="button" onClick={playFilm} aria-label={language === "ar" ? "تشغيل الفيلم" : "Lancer le film"}>
          <Play aria-hidden="true" fill="currentColor" />
        </button>
        <span className="film-play-label" aria-hidden="true">{language === "ar" ? "اضغط للتشغيل" : "Cliquer pour lire"}</span>
      </div>}
    </div>
  );
}
