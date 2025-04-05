import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { AddressSearch } from "./LeafletAddressSearch";
import { LeafletCustomControl } from "./LeafletCustomControl";

type LeafletMapProps = {
  showStaticMarker: boolean;
  showBasicControl: boolean;
  showAddressSearch: boolean;
};

const Map: React.FC<LeafletMapProps> = ({
  showStaticMarker = false,
  showBasicControl = false,
  showAddressSearch = false,
}) => {
  return (
    <MapContainer className="h-80" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showStaticMarker && (
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      {showBasicControl && <LeafletCustomControl />}
      {/* {showAddressSearch && <AddressSearch />} */}
    </MapContainer>
  );
};
export default Map;
