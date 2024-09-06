'use client';

import { useContext } from 'react';
import Spinner from '../../loading/spinner/spinner';
import { PublicOutlined } from '@mui/icons-material';
import { SharedDatabase } from '@/app/shared/shared';
import { States } from '@/app/shared/library/common/enums';
import { getGeoData, locations } from '@/app/shared/library/common/constants';
import { Button, Grid, Stack, Theme, useMediaQuery, useTheme } from '@mui/material';
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

export default function GeoDataForm({}: any) {
    const theme = useTheme<Theme>();
    let { setLocation, geoDataState, setGeoDataState } = useContext<any>(SharedDatabase);

    const smallScreenSize = useMediaQuery(theme.breakpoints.down(`sm`));
    const extraSmallScreenSize = useMediaQuery(theme.breakpoints.down(`xs`));

    const mobile = smallScreenSize || extraSmallScreenSize;

    const onGeoDataFormSubmit = async (onSubmitEvent?: any) => {
        onSubmitEvent.preventDefault();
        setGeoDataState(States.Loading);
        let loc = onSubmitEvent.target.location.value;
        let locationsData = await getGeoData(loc);
        if (locationsData) {
            console.log(`Locations`, locationsData);
            if (locationsData.length > 0) setLocation(locationsData[0]);
            setGeoDataState(States.Ready);
        }
    }

    return <>
        <form id={`geoDataForm`} className={`geoDataForm`} onSubmit={(e) => onGeoDataFormSubmit(e)}>
            <Stack spacing={2.5} direction={mobile ? `column` : `row`} alignItems={`center`} className={`geoDataRow mb20`}>
                <CustomTextField 
                    fullWidth 
                    type={`text`} 
                    name={`location`}
                    label={`Location`} 
                    id={`locationField`}
                    variant={`outlined`} 
                    className={`formField`} 
                    error={geoDataState == States.Error} 
                    defaultValue={locations.atlanta.name} 
                />
                <Grid className={`w100`} xs={12} sm={12} md={12} lg={12}>
                    <Button disabled={geoDataState == States.Loading} type={`submit`} size={`large`} className={`mainButton bgMain w100`} style={{paddingLeft: 6}} startIcon={geoDataState == States.Loading ? <Spinner /> : <PublicOutlined />}>
                        {geoDataState == States.Loading ? `Getting ` : ``}GeoData
                    </Button>
                </Grid>
            </Stack>
        </form>
    </>
}