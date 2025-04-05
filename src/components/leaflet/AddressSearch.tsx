import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { Control, DomUtil } from "leaflet";
import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";

export const AddressSearch = () => {
  const mapContainer = useMap();

  const searchControl = useMemo(() => {
    const SearchControl = Control.extend({
      options: {
        position: "topright",
      },
      onAdd: function() {
        const el = DomUtil.create("div");

        el.className = "relative";

        el.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        el.addEventListener("dblclick", (e) => {
          e.stopPropagation();
        });

        const autocomplete = new GeocoderAutocomplete(el, import.meta.env.PUBLIC_GEOAPIFY_API_KEY, {
          placeholder: "Enter an address",
        });

        autocomplete.on("select", (location) => {
          if (!location) {
            return;
          }
          const { lat, lon } = location.properties;
          mapContainer.setView({ lat, lng: lon }, mapContainer.getZoom());
        });

        autocomplete.on("suggestions", () => {
          return;
        });

        return el;
      },
      onRemove: function() {
        return;
      },
    });

    return new SearchControl();
  }, []);

  useEffect(() => {
    mapContainer.addControl(searchControl);
  }, [mapContainer, searchControl]);

  return null;
};
