import { Control, DomUtil } from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const LeafletCustomControl = () => {
  const mapContainer = useMap();

  const CustomControl = Control.extend({
    options: {
      position: "topright",
    },
    onAdd: function() {
      const el = DomUtil.create("div");

      el.className = "h-16 w-16 bg-pink-600 text-white font-bold pt-5 pl-1";
      el.innerText = "Click me!";

      el.onclick = function() {
        alert("Hello from a custom Leaflet control!");
      };

      return el;
    },
    onRemove: function() {
      return;
    },
  });

  const customControl = new CustomControl();

  useEffect(() => {
    mapContainer.addControl(customControl);
  }, []);

  return null;
};
