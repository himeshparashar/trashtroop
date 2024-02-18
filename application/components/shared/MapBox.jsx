// Importing necessary types from react-mapbox-gl
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";

interface MapboxProps {
  coordinates: { position: { coords: { latitude: number; longitude: number } } }[];
}

const Mapbox: React.FC<MapboxProps> = ({ coordinates }) => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiZGV2YmtuIiwiYSI6ImNsajA0bWV2YzB0NjIzbHF1ZjB1dHJ4aGIifQ.ChDvRkVX9cysBqfmkez0DQ",
  });

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        {coordinates.map((p, c) => (
          <Feature
            key={c.toString()}
            coordinates={[
              p.position.coords.latitude,
              p.position.coords.longitude,
            ]}
          />
        ))}
      </Layer>
    </Map>
  );
};

export default Mapbox;
