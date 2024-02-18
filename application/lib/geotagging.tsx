interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export function myLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not available in your browser."));
    }
  });
}
