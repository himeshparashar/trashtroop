import { useState, useEffect } from "react";

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const MyLocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setPosition({ coords: { latitude, longitude } });
        },
        (error) => {
          // Handle geolocation errors
          console.error("Error:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div>
      {position?.coords?.latitude && (
        <p>Latitude: {position.coords.latitude}</p>
      )}
      {position?.coords?.longitude && (
        <p>Longitude: {position.coords.longitude}</p>
      )}
    </div>
  );
};

export default MyLocation;
