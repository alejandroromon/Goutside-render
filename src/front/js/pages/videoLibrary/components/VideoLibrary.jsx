import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import VideoList from "./VideoList.jsx";
import VideoDetail from "./VideoDetail.jsx";
import Library from "../library/Library.jsx";
import "../style/VideoStyles.css";

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubmit = async (term) => {
    setSelectedVideo(null);

    if (term === "" || term === undefined) {
      setVideos([]);
    } else {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCtcQ6TPwXAYgZ1Mcl3M1vng&${new URLSearchParams(
          { q: term }
        )}&key=AIzaSyC9k0XugiaEnggAa09DRRFaZcKo3SuIYPI`
      )
        .then((response) => response.json())
        .then((data) => {
          setVideos(data.items);
        });
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="align-items-center justify-content-md-center text-center container-library">
      <div className="position-relative justify-content-start mt-3 p-5 library-card">
        <div className="row">
          <div className="mb-3 video-header">
            <h3 className="library-text-color">
              Pulsa en el ejercicio para verlo o busca el que necesites
            </h3>
          </div>
          <SearchBar handleFormSubmit={(term) => handleSubmit(term)} />
        </div>
        <div className="row">
          <div className="align-items-center justify-content-md-center text-center video-container">
            {videos.length === 0 ? (
              <div className="mt-5 align-items-center justify-content-md-center text-center default-video-library">
                <Library />
              </div>
            ) : (
              <div className="mt-5 video-player">
                {selectedVideo === null ? (
                  <VideoList
                    handleVideoSelect={(video) => handleVideoSelect(video)}
                    videos={[...videos]}
                  />
                ) : (
                  <VideoDetail video={selectedVideo} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;
