

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

const YouTubeEmbed = ({ videoId, title, className = '' }: YouTubeEmbedProps) => {
  return (
    <div className={`youtube-embed ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
};

export default YouTubeEmbed;