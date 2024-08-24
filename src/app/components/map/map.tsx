import { useState } from 'react';
import { isValid, locations } from '../../../../server';
import { PublicOutlined } from '@mui/icons-material';
import { Button, Grid, Stack, Theme, useMediaQuery, useTheme } from '@mui/material';
import { GeoDataFormTypes, GeoTypes, GoogleMapZoomLevels } from '../../../../enums';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

export const minsAndMaxes = {
    lat: {
        max: 90,
        min: -90,
    },
    lon: {
        max: 180,
        min: -180,
    }
}

export default function Map({
    showForm = false,
    latitude = locations.atlanta.lat, 
    longitude = locations.atlanta.lon, 
    location = locations.atlanta.name,
    formType = GeoDataFormTypes.Locations,
    initialZoomLevel = GoogleMapZoomLevels.Region,
}) {
    const theme = useTheme<Theme>();
    let [error, setError] = useState(``);

    // const extraLargeScreenSize = useMediaQuery(theme.breakpoints.up(`lg`));
    // const largeScreenSize = useMediaQuery(theme.breakpoints.down(`lg`));
    const mediumScreenSize = useMediaQuery(theme.breakpoints.down(`md`));
    const smallScreenSize = useMediaQuery(theme.breakpoints.down(`sm`));
    const extraSmallScreenSize = useMediaQuery(theme.breakpoints.down(`xs`));

    // const desktop = largeScreenSize || extraLargeScreenSize;
    const tablet = mediumScreenSize;
    const mobile = smallScreenSize || extraSmallScreenSize;
    
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
        let latError = false;
        let lonError = false;
        let newEmbedURL = ``;
        let val = e.target.value;
        if (type == GeoTypes.Lat) {
            latitude = parseFloat(val);
            if (latitude > minsAndMaxes.lat.max) {
                latError = true;
                setError(prevError => `${prevError} Latitude too high`);
            } else if (latitude < minsAndMaxes.lat.min) {
                latError = true;
                setError(prevError => `${prevError} Latitude too low`);
            } else {
                latError = false;
            }
        } else if (type == GeoTypes.Lon) {
            longitude = parseFloat(val);
            if (longitude > minsAndMaxes.lon.max) {
                lonError = true;
                setError(prevError => `${prevError} Longitude too high`);
            } else if (longitude < minsAndMaxes.lon.min) {
                lonError = true;
                setError(prevError => `${prevError} Longitude too low`);
            } else {
                lonError = false;
            }
        } else if (type == GeoTypes.Loc) {
            console.log(`onGeoChange Loc`, type);
        } else {
            if (isValid(val)) location = val;
            else location = locations.atlanta.name; 
            console.log(`location`, {val, type, location});
        }

        if (type != GeoTypes.Loc) {
            if (!latError && !lonError) {
                setError(``);
                if (type != `lat` && type != `lon`) {
                    newEmbedURL = getMapEmbedURL(latitude, longitude);
                    setGoogleMapsIframeURL(newEmbedURL);
                }
            }
        }
    }

    return (
        <>
            {showForm && (
                <Stack spacing={2.5} direction={mobile ? `column` : `row`} alignItems={`center`} className={`geoDataRow mb20`}>
                    {formType == GeoDataFormTypes.Locations ? (
                        <CustomTextField 
                            fullWidth 
                            type={`text`} 
                            label={`Location`} 
                            variant={`outlined`} 
                            className={`formField`} 
                            defaultValue={locations.atlanta.name} 
                            error={error != `` && error.includes(`Loc`)} 
                            onChange={(e: any) => onCoordChange(GeoTypes.Loc, e)} 
                        />
                    ) : (
                        <>
                            <CustomTextField 
                                type={`number`} 
                                label={`Latitude`} 
                                variant={`outlined`} 
                                defaultValue={latitude} 
                                min={minsAndMaxes.lat.min} 
                                max={minsAndMaxes.lat.max} 
                                error={error != `` && error.includes(`Lat`)} 
                                onChange={(e: any) => onCoordChange(GeoTypes.Lat, e)} 
                                className={`formField ${mobile ? `w100` : `fit`} ${tablet && !mobile ? `coordinateField` : ``}`} 
                            />
                            <CustomTextField 
                                type={`number`} 
                                label={`Longitude`} 
                                variant={`outlined`} 
                                defaultValue={longitude} 
                                min={minsAndMaxes.lon.min} 
                                max={minsAndMaxes.lon.max} 
                                error={error != `` && error.includes(`Lon`)} 
                                onChange={(e: any) => onCoordChange(GeoTypes.Lon, e)} 
                                className={`formField ${mobile ? `w100` : `fit`} ${tablet && !mobile ? `coordinateField` : ``}`} 
                            />
                        </>
                    )}
                    <Grid className={`w100`} xs={12} sm={12} md={12} lg={12}>
                        <Button size={`large`} className={`mainButton w100`} style={{paddingLeft: 6}} onClick={(e: any) => onCoordChange(``, e)} startIcon={<PublicOutlined />}>
                            GeoData
                        </Button>
                    </Grid>
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