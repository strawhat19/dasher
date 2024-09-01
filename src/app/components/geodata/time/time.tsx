import moment from 'moment-timezone';
import { useContext, useEffect } from 'react';
import { GlobalDataContext } from '@/app/globaldata';
import { momentTimezoneFormats } from '../../../../../server';

export default function Time({updater = false}: any) {
    let { time, location, setTime } = useContext<any>(GlobalDataContext);
  
    useEffect(() => {
        if (updater == true) {
            console.log(`Time & Location`, location);
            let currentTime = moment().tz(location.timezone).format(momentTimezoneFormats.fullDateTime);
            setTime(currentTime);
            const intervalId = setInterval(() => {
                currentTime = moment().tz(location.timezone).format(momentTimezoneFormats.fullDateTime);
                setTime(currentTime);
            }, 1000);
        
            return () => clearInterval(intervalId);
        }
    }, [updater, location, setTime])
  
    return <>
      <div className={`currentTime fit cityNameCountryDateTime flex end gap10`}>
        <h2 className={`cityName textOverflow`}>{location.name}, {location.country}</h2>
        -
        <span className={`currentTime`}>{time}</span>
      </div>
    </>
}