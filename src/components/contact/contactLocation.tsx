import React, {useState} from "react";
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import {GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';
import RoomIcon from '@mui/icons-material/Room';
import {useTheme} from "@mui/material/styles";

const API_KEY = 'AIzaSyBOmjy3tE8f5sIRxAo3CJMNbffLpBrI9sg';

const initialCenter : google.maps.LatLngLiteral = {
    lat: 40.712776,
    lng: -74.005974,
};

const initialZoom = 12;

const locations = [
    {
        name: 'Branch 1',
        phone: '+1 (555) 123-4567',
        position: {
            lat: 40.712776,
            lng: -74.005974,
        },
    },
    {
        name: 'Branch 2',
        phone: '+1 (555) 987-6543',
        position: {
            lat: 40.730610,
            lng: -73.935242,
        },
    },
];

const containerStyle = {
    width: '100%',
    height: '300px',
};

/* The code defines a functional component called `ContactLocation`. Inside the component, it uses the `useTheme` hook from
Material-UI to access the current theme. */
const ContactLocation = () => {
    const theme = useTheme();
    const [mapOptions, setMapOptions] = useState({
        center: initialCenter,
        zoom: initialZoom,
    });

    const handleMarkerClick = (position : google.maps.LatLngLiteral) => {
        setMapOptions({
            center: position,
            zoom: initialZoom,
        });
    };

    return (
        <Box id="contact us" sx={{textAlign: "center", minHeight: '44vh', height: {md:'44vh'}, backgroundColor: theme.palette.background.paper,
            pt: "3rem", pb: {md:"10rem",xs:"2rem"}}}>
            <Box mb={4}>
                <Typography textAlign="center" variant="h1" component="h1" >Here we are for you</Typography>
                <Typography variant="subtitle2" component="p">If you want to join us come here!</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-around", alignItems: "center", height: '90%', width: "100%", minHeight: "50vh"}}>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-evenly', alignItems: 'center', width: {xs: "100%", md: "50%"}, height: '100%'}}>
                    {locations.map((location, index) => (
                        <Card key={index} sx={{ minWidth: 275, maxWidth: 350, mb: { xs: 4, md: 0 }, backgroundColor: "#3A3A3C", color: "white" }}>
                            <CardContent>
                                <Typography variant="h5" component="div" fontWeight="bold">{location.name}</Typography>
                                <Typography variant="body1" component="p">{location.phone}</Typography>
                                <IconButton color="primary" onClick={() => handleMarkerClick(location.position)}>
                                    <RoomIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: {xs: "100%", md: "40%"}, margin: '0 auto' }}>
                    <LoadScript googleMapsApiKey={API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={mapOptions.center}
                            zoom={mapOptions.zoom}
                        >
                            {locations.map((location, index) => (
                                <MarkerF key={index}
                                    position={location.position}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </Box>
            </Box>
        </Box>
    );
};
export default ContactLocation;