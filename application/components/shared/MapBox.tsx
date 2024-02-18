"use client";

// // Importing necessary types from react-mapbox-gl
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";

// import Map, {
//   Marker,
//   Popup,
//   NavigationControl,
//   GeolocateControl,
// } from "react-map-gl";

// interface MapboxProps {
//   coordinates: {
//     position: { coords: { latitude: number; longitude: number } };
//   }[];
// }

// const Mapbox = () => {
//   const [data, setData] = useState();

//   useEffect(async () => {
//     let r = await fetch("/api/data");
//     r = await r.json();
//     setData(r);

//     console.log(r, "MAPDATA");
//     return () => {
//       // Perform any cleanup operations here
//       console.log("Component unmounted");
//     };
//   }, []);
//   // console.log(coordinates);

//   const Map = ReactMapboxGl({
//     accessToken:
//       "pk.eyJ1IjoiZGV2YmtuIiwiYSI6ImNsajA0bWV2YzB0NjIzbHF1ZjB1dHJ4aGIifQ.ChDvRkVX9cysBqfmkez0DQ",
//   });

//   return (
//     <Map
//       style="mapbox://styles/mapbox/streets-v9"
//       center={[
//         77.10249, // Longitude of Bikaner, India
//         28.03706, // Latitude of Bikaner, India
//       ]}
//       containerStyle={{
//         height: "100vh",
//         width: "100%",
//       }}
//     >
//       <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
//         <Feature
//           coordinates={[
//             77.10249, // Longitude of Bikaner, India
//             28.03706, // Latitude of Bikaner, India
//           ]}
//         />

//         {data &&
//           data.map((p) => (
//             <Feature
//               key={p._id}
//               coordinates={[
//                 p.position.coords.longitude,
//                 p.position.coords.latitude,
//               ]}
//             />
//           ))}
//       </Layer>
//     </Map>
//   );
// };

// export default Mapbox;

// page.js
"use client";

import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";

export default function Mapbox() {
  const [data, setData] = useState();

  useEffect(async () => {
    let r = await fetch("/api/data");
    r = await r.json();
    setData(r);

    console.log(r, "MAPDATA");
    return () => {
      // Perform any cleanup operations here
      console.log("Component unmounted");
    };
  }, []);

  // console.log(coordinates);

  const mapboxToken =
    "pk.eyJ1IjoiZGV2YmtuIiwiYSI6ImNsajA0bWV2YzB0NjIzbHF1ZjB1dHJ4aGIifQ.ChDvRkVX9cysBqfmkez0DQ";

  return (
    <main style={{ height: "100vh", width: "100%" }}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          longitude: 72.95972,
          latitude: 26.0376,
          zoom: 5,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {data &&
          data.map((d) => {
            return (
              <Marker
                key={d._id}
                longitude={d.position.coords.longitude}
                latitude={d.position.coords.latitude}
              >
                <button type="button" className="cursor-pointer">
                  <img
                    src="https://i.ibb.co/ZS6T71s/3d-PNG-PSD-removebg-preview.png"
                    alt="marker"
                    width="50px"
                  />
                </button>
              </Marker>
            );
          })}
      </Map>
    </main>
  );
}
