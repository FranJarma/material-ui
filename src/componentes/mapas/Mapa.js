import { Typography } from "@material-ui/core";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import favicon from "./../../imagenes/favicon-32x32.png";
const Map = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker
        icon={favicon}
        position={{ lat: props.lat, lng: props.lng }}
    >
    <InfoWindow>
        <Typography style={{fontFamily: 'Roboto Condensed', fontSize: 16, textAlign: 'center',
        fontWeight: 'bold'}}>{props.nombre}
        <br/>
        <Typography style={{fontFamily: 'Roboto Condensed', fontSize: 14, textAlign: 'center'}}>
        {props.horario}</Typography>
        <Typography style={{fontFamily: 'Roboto Condensed', fontSize: 14, textAlign: 'center'}}>
        {props.tarifas}</Typography>
    </Typography>
    </InfoWindow>
    </Marker>
  </GoogleMap>
);
export default Map;