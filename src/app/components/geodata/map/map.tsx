'use client';

import './map.scss';
import { useContext } from 'react';
import { locations } from '../../../../../server';
import { GlobalDataContext } from '@/app/globaldata';
import { Skeleton } from '../../loading/skeleton/skeleton';
import { GoogleMapZoomLevels, States } from '../../../../../enums';

type MapOptions = {
    height?: number;
    shadow?: boolean;
    rounded?: boolean;
    latitude?: number;
    longitude?: number;
    borderRadius?: any;
    initialZoomLevel?: string;
}

export default function Map({
    height = 333,
    shadow = true,
    rounded = true,
    latitude = locations.default().latitude, 
    longitude = locations.default().longitude, 
    initialZoomLevel = GoogleMapZoomLevels.Region,
}: MapOptions) {    
    let { geoDataState } = useContext<any>(GlobalDataContext);
    const googleMapsEmbedURLDomain = `https://www.google.com/maps`;
    const googleMapsEmbedURLMapDefaultOptions = `2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0`;
    return <>
        <div className={`mapContainer`}>
            {geoDataState == States.Loading ? (
                <Skeleton 
                    width={`100%`} 
                    height={height + 5.35} 
                />
            ) : <iframe 
                    allowFullScreen 
                    loading={`lazy`}
                    style={{ height }}
                    referrerPolicy={`no-referrer-when-downgrade`}
                    className={`map ${shadow ? `hasShadow` : ``} ${rounded ? `borderRadius` : ``}`} 
                    src={`${googleMapsEmbedURLDomain}` 
                        + `/embed?pb=${initialZoomLevel}` 
                        + `!2d${longitude}` 
                        + `!3d${latitude}` 
                        + `!${googleMapsEmbedURLMapDefaultOptions}
                    `}
                />
            }
        </div>
    </>
}