"""Render the hero loop from periodic light fields and CRT texture."""

from pathlib import Path
import subprocess

import imageio_ffmpeg
import numpy as np

WIDTH, HEIGHT, FPS, SECONDS = 1280, 720, 24, 8
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "media"
x, y = np.meshgrid(
    np.linspace(-1.78, 1.78, WIDTH, dtype=np.float32),
    np.linspace(-1, 1, HEIGHT, dtype=np.float32),
)
rng = np.random.default_rng(2027)
grain = rng.normal(0, 1.2, (HEIGHT, WIDTH)).astype(np.float32)
scanlines = 0.85 + 0.15 * np.cos(np.arange(HEIGHT)[:, None] * np.pi * 0.5)
phosphor = 0.92 + 0.08 * np.cos(np.arange(WIDTH) * np.pi * 2 / 3)
vignette = 1 - 0.42 * np.clip((x / 2.1) ** 2 + (y / 1.5) ** 2, 0, 1)
base = np.array([13, 10, 20])
violet = np.array([102, 62, 174])
chartreuse = np.array([187, 223, 52])


def render(phase):
    bend = 0.14 * np.sin(x * 1.85 + phase) + 0.09 * np.sin(phase - 0.9)
    sweep = y + 0.43 * x - bend - 0.47
    purple = np.exp(-((sweep + 0.02) / 0.25) ** 2) * (0.53 + 0.17 * np.cos(x * 2.2 - phase))
    purple += 0.19 * np.exp(-((sweep + 0.24) / 0.56) ** 2)
    ray = y - 0.28 * x + 0.37 + 0.14 * np.cos(x * 2.6 - phase)
    falloff = np.exp(-((x - (0.99 + 0.5 * np.sin(phase))) / 1.03) ** 2)
    green = (0.23 * np.exp(-(ray / 0.21) ** 2) + 0.52 * np.exp(-(ray / 0.045) ** 2)) * falloff
    green += 0.13 * np.exp(-((ray - 0.14) / 0.064) ** 2) * falloff
    texture = (scanlines * phosphor * vignette) * (1 + 0.07 * np.sin(31 * y + 7 * x + phase))
    rgb = base + (purple[..., None] * violet + green[..., None] * chartreuse) * texture[..., None]
    return np.clip(rgb + grain[..., None], 0, 255).astype(np.uint8).tobytes()


ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video = OUTPUT / "hero-loop.mp4"
with subprocess.Popen([
    ffmpeg, "-y", "-loglevel", "error", "-f", "rawvideo", "-pixel_format", "rgb24",
    "-video_size", f"{WIDTH}x{HEIGHT}", "-framerate", str(FPS), "-i", "pipe:0", "-an",
    "-c:v", "libx264", "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(video),
], stdin=subprocess.PIPE) as encoder:
    assert encoder.stdin is not None
    for frame in range(FPS * SECONDS):
        encoder.stdin.write(render(2 * np.pi * frame / (FPS * SECONDS)))
    encoder.stdin.close()
    if encoder.wait():
        raise SystemExit("Hero video encoding failed")

subprocess.run([
    ffmpeg, "-y", "-loglevel", "error", "-ss", "1.4", "-i", str(video), "-frames:v", "1",
    "-c:v", "libwebp", "-quality", "86", str(OUTPUT / "hero-poster.webp"),
], check=True)
