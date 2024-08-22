import { useState } from 'react';
import { locations } from '../../../../server';
import { Box, Button, Stack, Typography } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

export enum GoogleMapZoomLevels {
    EnableCustomZoom = `!1m14!1m12!1m3!1d132`,
    Street = `!1m14!1m12!1m3!1d132` + ``,
    Neighborhood  = `!1m14!1m12!1m3!1d132` + `4`,
    City = `!1m14!1m12!1m3!1d132` + `44`,
    Region = `!1m14!1m12!1m3!1d132` + `444`,
    State = `!1m14!1m12!1m3!1d132` + `4444`,
    Coast = `!1m14!1m12!1m3!1d132` + `44444`,
    World = ``,
    x300 = `!1m14!1m12!1m3!1d132` + `444444`,
}

export default function Map({
    showForm = false,
    latitude = locations.marietta.lat, 
    longitude = locations.marietta.lon, 
    initialZoomLevel = GoogleMapZoomLevels.Region,
}) {
    const googleMapsEmbedURLDomain = `https://www.google.com/maps`;
    const googleMapsEmbedURLMapDefaultOptions = `2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0`;
    const getMapEmbedURL = (lat: number = latitude, lon: number = longitude) => `${googleMapsEmbedURLDomain}` 
        + `/embed?pb=${initialZoomLevel}` 
        + `!2d${lon}` 
        + `!3d${lat}` 
        + `!${googleMapsEmbedURLMapDefaultOptions}
    `;

    const [googleMapsIframeURL, setGoogleMapsIframeURL] = useState(getMapEmbedURL(latitude, longitude));

    const onCoordChange = (type: string, e: any) => {
        let newEmbedURL = ``;
        if (type == `lat`) {
            latitude = parseFloat(e.target.value);
        } else if (type == `lon`) {
            longitude = parseFloat(e.target.value);
        } else {
            newEmbedURL = getMapEmbedURL(latitude, longitude);
            setGoogleMapsIframeURL(newEmbedURL);
        }
    }

    return (
        <>
            {showForm && (
                <Stack spacing={3} direction={`row`} alignItems={`flex-end`} className={`mb25`}>
                    <Box mt={`25px`}>
                        <Typography
                            mb={`5px`}
                            fontWeight={600}
                            component={`label`}
                            htmlFor={`latitude`}
                            variant={`subtitle1`}
                        >
                            Latitude
                        </Typography>
                        <CustomTextField onChange={(e: any) => onCoordChange(`lat`, e)} type={`number`} defaultValue={latitude} variant={`outlined`} fullWidth />
                    </Box>
                    <Box mt={`25px`}>
                        <Typography
                            mb={`5px`}
                            fontWeight={600}
                            component={`label`}
                            htmlFor={`longitude`}
                            variant={`subtitle1`}
                        >
                            Longitude
                        </Typography>
                        <CustomTextField onChange={(e: any) => onCoordChange(`lon`, e)} type={`number`} defaultValue={longitude} variant={`outlined`} fullWidth />
                    </Box>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={`actionBtn`}
                        onClick={(e: any) => onCoordChange(``, e)}
                    >
                        GeoData
                    </Button>
                </Stack>    
            )}
            <div className={`mapContainer`}>
                <iframe 
                    allowFullScreen 
                    loading={`lazy`}
                    className={`map`} 
                    src={googleMapsIframeURL}
                    referrerPolicy={`no-referrer-when-downgrade`}
                >
                </iframe>
            </div>
        </>
    )
}