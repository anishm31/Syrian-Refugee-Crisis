import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';

function CountryMap(props) {
  // Currently, the API key is restricted based on IP address.
  // In production, this key will be restricted based on the domain of the website. 
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyALEIcs3cRRGwkkH5HOsvEUYSbW_AseqNQ"
  });

  const centerPoint = {lat: props.mapInfo.geometry.location.lat, lng: props.mapInfo.geometry.location.lng}

  return (
    <div style={{height: "75vh", width: "100%"}}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{height: "100%", width: "100%"}}
          center={centerPoint}
          zoom={5}
        >
          <MarkerF position={centerPoint}/>
        </GoogleMap>
      ) : <h1>Loading Map...</h1>}
    </div>
  );
}

export default CountryMap;