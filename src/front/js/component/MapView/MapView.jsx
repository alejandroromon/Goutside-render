import React, { useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../MapView/MapView.css";

const MapView = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleMapClick(event) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  return (
    <div>
      <Map
        center={[37.7797221, -3.7943167]}
        className="leaflet-container"
        zoom={15}
        onclick={handleMapClick}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker
          interactive={false}
          position={[position.latitude, position.longitude]}
        />
      </Map>
    </div>
  );
};

export default MapView;
