import React from "react";

const VideoDetail = ({ video }) => {
  
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="container-fluid">
      <div className="ratio ratio-16x9 video-embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="video-info">
        <h2 className="p-3 border-bottom video-title">{video.snippet.title}</h2>
        <h4 className="mt-3 video-description">{video.snippet.description}</h4>
      </div>
    </div>
  );
};

export default VideoDetail;
