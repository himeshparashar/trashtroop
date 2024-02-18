"use client";

import React from "react";
import { Button } from "../ui/button";
import { myLocation } from "@/lib/geotagging";

const Getlocation = ({ setCoords }: { setCoords: any }) => {
  return (
    <Button
      onClick={async () => {
        const position = await myLocation();
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }}
    >
      Get My Location
    </Button>
  );
};

export default Getlocation;
