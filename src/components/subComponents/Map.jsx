import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { G_MAP_API_KEY } from '../../constants/constants';

const containerStyle = {
  width: '400px',
  height: '400px'
};


const Map = (props) => {
  const [latitude, longitude] = props.coordinates?.split(',').map(parseFloat);

  const center = {
    lat: latitude,
    lng: longitude
  };
  const [selectedLocation, setSelectedLocation] = useState({latitude, longitude});

  const handleMapClick = (event) => {
      const { latLng } = event;
      const latitude = latLng.lat();
      const longitude = latLng.lng();
      setSelectedLocation({ latitude, longitude });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: G_MAP_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude
          }}

        />
      </>
    </GoogleMap>
  ) : <></>
}

export default Map
