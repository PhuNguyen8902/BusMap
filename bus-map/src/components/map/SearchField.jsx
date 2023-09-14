import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import React, { useEffect } from "react";
import L from "leaflet";

const SearchField = (props) => {
  const map = useMap();


  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      position: "topright",
      marker: {
        icon: new L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
        })
      },
      ...props
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, props]);

  return null;
};
export default SearchField;
