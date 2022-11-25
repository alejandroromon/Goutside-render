import React from "react";
import VideoDetail from "./VideoDetail.jsx";

const VideoList = ({ videos, handleVideoSelect }) => {

  const renderedVideos = videos.map((video, index) => {
    return (
      <div
        className={`carousel-item ${index === 0 ? "active" : ""}`}
        key={video.id.videoId}
      >
        <VideoDetail
          className={index === 0 ? "active" : ""}
          key={video.id.videoId}
          video={video}
          handleVideoSelect={handleVideoSelect}
        />
      </div>
    );
  });

  return (
    <div className="relaxed divided list">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="vh-100 align-items-center justify-content-md-center text-center carousel-inner">{renderedVideos}</div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default VideoList;
