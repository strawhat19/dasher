import moment from 'moment-timezone';
import { useContext, useEffect } from 'react';
import { SharedDatabase } from '@/app/shared/shared';
import { momentTimezoneFormats } from '@/app/shared/library/common/constants';

export default function Time({updateTimeDynamically = false}: any) {
  let { time, location, setTime } = useContext<any>(SharedDatabase);
  
  useEffect(() => {
      let { mediumDateTime, fullDateTime } = momentTimezoneFormats;
      const updateTime = (timezone = location.timezone, format = fullDateTime) => {
        let currentTime = moment().tz(timezone).format(format);
        setTime(currentTime);
        console.log(`Time & Location`, {time: currentTime, location});
      }

      updateTime(undefined, mediumDateTime);

      if (updateTimeDynamically == true) {
        const intervalId = setInterval(() => {
          updateTime();
        }, 1000);
    
        return () => clearInterval(intervalId);
      }
    }, [updateTimeDynamically, location, setTime])
  
  return <>
    <div className={`currentTime fit cityNameCountryDateTime flex end gap10`}>
      <h2 className={`cityName textOverflow`}>{location.name}, {location.country}</h2>
      <span className={`hideOnMobileS`}>-</span>
      <span className={`currentTime`}>{time}</span>
    </div>
  </>
}