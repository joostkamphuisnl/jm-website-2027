"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Close, Pause, Play } from "./icon";

type Track = { slug: string; title: string; artist: string; image: string; preview: string };
type Playback = "paused" | "loading" | "playing" | "error";
const PlayerContext = createContext<{
  track: Track | null;
  status: Playback;
  toggle: (track: Track, trigger?: HTMLButtonElement) => void;
} | null>(null);

function formatTime(seconds: number) {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function controlLabel(track: Track, status: Playback) {
  const action = { paused: "Play", loading: "Cancel", playing: "Pause", error: "Retry" }[status];
  return `${action} preview of ${track.title}`;
}

export function AudioPlayer({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const returnFocus = useRef<HTMLButtonElement>(null);
  const attempt = useRef(0);
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<Playback>("paused");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle(next: Track, trigger?: HTMLButtonElement) {
    const element = audio.current;
    if (!element) return;
    if (trigger) returnFocus.current = trigger;

    const request = ++attempt.current;
    const sameTrack = element.src === next.preview;
    if (sameTrack && (status === "loading" || !element.paused)) {
      element.pause();
      setStatus("paused");
      return;
    }

    if (!sameTrack || status === "error") {
      element.src = next.preview;
      element.load();
      setTrack(next);
      setTime(0);
      setDuration(0);
    }
    setStatus("loading");
    void element.play().then(() => {
      if (request === attempt.current) setStatus(element.paused ? "paused" : "playing");
    }).catch(() => {
      if (request === attempt.current) setStatus("error");
    });
  }

  function dismiss() {
    const element = audio.current;
    ++attempt.current;
    element?.pause();
    element?.removeAttribute("src");
    element?.load();
    setTrack(null);
    setStatus("paused");
    const target = returnFocus.current?.isConnected ? returnFocus.current : document.getElementById("main");
    target?.focus();
  }

  const active = status === "playing" || status === "loading";
  return (
    <PlayerContext.Provider value={{ track, status, toggle }}>
      {children}
      <audio
        ref={audio}
        preload="none"
        onDurationChange={({ currentTarget }) => setDuration(Number.isFinite(currentTarget.duration) ? currentTarget.duration : 0)}
        onTimeUpdate={({ currentTarget }) => setTime(currentTarget.currentTime)}
        onPause={() => setStatus(previous => previous === "playing" ? "paused" : previous)}
        onEnded={() => setStatus("paused")}
        onError={({ currentTarget }) => { if (currentTarget.getAttribute("src") && currentTarget.error) setStatus("error"); }}
      />
      {track && (
        <aside className="site-player" aria-label="Audio preview player">
          <div className="player-inner">
            <Link href={`/releases/${track.slug}`} className="player-track">
              <Image src={track.image} alt="" width={44} height={44} />
              <span><strong>{track.title}</strong><small>{track.artist}</small></span>
            </Link>
            <button type="button" className="player-control player-play" onClick={() => toggle(track)} aria-label={controlLabel(track, status)}>
              {active ? <Pause /> : <Play />}
            </button>
            <button type="button" className="player-control player-close" onClick={dismiss} aria-label="Close audio player"><Close /></button>
            <div className="player-progress">
              <span aria-hidden="true">{formatTime(time)}</span>
              <input
                type="range" min={0} max={duration || 1} step="any" value={Math.min(time, duration)} disabled={!duration || status === "error"}
                aria-label="Preview position" aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
                onChange={event => {
                  if (!audio.current) return;
                  audio.current.currentTime = event.currentTarget.valueAsNumber;
                  setTime(audio.current.currentTime);
                }}
              />
              <span aria-hidden="true">{duration ? formatTime(duration) : "0:00"}</span>
            </div>
            <small className="player-credit">Provided courtesy of iTunes</small>
            <p className="player-status" role="status">
              {status === "loading" && "Loading preview…"}
              {status === "error" && "Preview unavailable. Retry or open the release."}
            </p>
          </div>
        </aside>
      )}
    </PlayerContext.Provider>
  );
}

export function PreviewButton({ track }: { track: Track }) {
  const player = useContext(PlayerContext);
  const status = player?.track?.slug === track.slug ? player.status : "paused";
  return (
    <button type="button" className="button button-accent preview-button" aria-label={controlLabel(track, status)} onClick={event => player?.toggle(track, event.currentTarget)}>
      {status === "playing" || status === "loading" ? <Pause /> : <Play />}
      {{ paused: "Play preview", loading: "Cancel preview", playing: "Pause preview", error: "Retry preview" }[status]}
    </button>
  );
}
