import { useMap } from "react-leaflet";

export function UpdateMapView({ coords }) {
    const map = useMap();
    map.setView([coords.lat, coords.lon], coords.zoom);
    return null;
  }