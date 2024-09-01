import { useState } from 'react';
import { PublicOutlined } from '@mui/icons-material';
import { getGeoData, isValid, locations } from '../../../../server';
import { Button, CircularProgress, Grid, Stack, Theme, useMediaQuery, useTheme } from '@mui/material';
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
    formType = GeoDataFormTypes.Locations,
    initialZoomLevel = GoogleMapZoomLevels.Region,
}) {
    const theme = useTheme<Theme>();
    let [error, setError] = useState(``);
    let [loading, setLoading] = useState(false);

    // const xlScreenSize = useMediaQuery(theme.breakpoints.up(`lg`));
    // const lgScreenSize = useMediaQuery(theme.breakpoints.down(`lg`));
    const medScreenSize = useMediaQuery(theme.breakpoints.down(`md`));
    const smallScreenSize = useMediaQuery(theme.breakpoints.down(`sm`));
    const extraSmallScreenSize = useMediaQuery(theme.breakpoints.down(`xs`));

    // const desktop = lgScreenSize || xlScreenSize;
    const tablet = medScreenSize;
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

    const onGeoDataFormSubmit = async (onSubmitEvent?: any) => {
        onSubmitEvent.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 3500);
        // let loc = onSubmitEvent.target.location.value;
        // let locationsData = await getGeoData(loc);
        // if (locationsData) {
        //     console.log(`Locations`, locationsData);
        //     setLoading(false);
        // }
    }

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
                <form id={`geoDataForm`} className={`geoDataForm`} onSubmit={(e) => onGeoDataFormSubmit(e)}>
                    <Stack spacing={2.5} direction={mobile ? `column` : `row`} alignItems={`center`} className={`geoDataRow mb20`}>
                        {formType == GeoDataFormTypes.Locations ? (
                            <CustomTextField 
                                fullWidth 
                                type={`text`} 
                                name={`location`}
                                label={`Location`} 
                                id={`locationField`}
                                variant={`outlined`} 
                                className={`formField`} 
                                defaultValue={locations.atlanta.name} 
                                error={error != `` && error.includes(`Loc`)} 
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
                            <Button disabled={loading} type={`submit`} size={`large`} className={`mainButton w100`} style={{paddingLeft: 6}} startIcon={loading ? <CircularProgress size={20} color={`success`} /> : <PublicOutlined />}>
                                {loading ? `Getting ` : ``}GeoData
                            </Button>
                        </Grid>
                    </Stack>
                </form>
            )}
            <div className={`mapContainer`}>
                <iframe 
                    allowFullScreen 
                    loading={`lazy`}
                    className={`map`} 
                    src={googleMapsIframeURL}
                    referrerPolicy={`no-referrer-when-downgrade`}
                />
            </div>
        </>
    )
}