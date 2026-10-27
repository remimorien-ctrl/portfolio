import type { Video } from "@/lib/projects";

const embedUrl: Record<Video["provider"], (id: string) => string> = {
  youtube: (id) => `https://www.youtube-nocookie.com/embed/${id}`,
  vimeo: (id) => `https://player.vimeo.com/video/${id}?dnt=1`,
};

export function VideoEmbed({ video, title }: { video: Video; title: string }) {
  return (
    <div className="video-embed">
      <iframe
        src={embedUrl[video.provider](video.id)}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
