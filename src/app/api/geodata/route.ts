import moment from 'moment-timezone';
import { NextRequest, NextResponse } from 'next/server';
import { 
  isValid, 
  defaultTimezone, 
  openWeatherAPIKey,
  momentTimezoneFormats, 
  convertTemperatureFromKelvinToCelsius, 
  convertTemperatureFromKelvinToFahrenheit, 
  convertWindSpeedFromMetersPerSecondToMilesPerHour,
} from '../../../../server';

export async function GET(request: NextRequest, { params }: { params: { location: string } }) {
  const { location } = params || request;
  let browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timezone = moment.tz.guess() || browserTimezone || defaultTimezone;
  let browserTimezoneCityOrRegion = timezone.split(`/`)[1].replace(/_/g, ` `);
  let error = { error: `Error getting GeoData`, message: `Error getting GeoData` };

  const resolvedLocation = location || browserTimezoneCityOrRegion;

  const generateNewLocation = (loc: any) => {
    let { 
      name,
      type,
      importance,
      place_id: id,
      lat: latitude,
      lon: longitude,
      place_rank: rank,
      boundingbox: bounds ,
      namedetails: nameDetails,
      addressType: locationType,
    } = loc;

    let population = loc.extratags && loc.extratags.population ? parseFloat(loc.extratags.population) : 0;
    
    let coordinates = {
      latitude,
      longitude,
    };

    let newLocation: any = {

      id,
      type,
      name,
      rank,
      bounds,
      location,
      latitude,
      longitude,
      importance,
      population,
      coordinates,
      nameDetails,
      locationType,
      
      class: loc.class,
      people: population.toLocaleString(),
      
      address: {
        latitude,
        longitude,
        coordinates,
        ...loc.address,
        name: loc.display_name
      },

    }
    
    if (loc.extratags) {
      let { place, capital, website, wikidata, wikipedia, importance: scale, start_date: founded, state_capital: isStateCapital } = loc.extratags;
      newLocation = {
        ...newLocation,
        scale,
        place,
        capital,
        founded,
        website,
        wikidata,
        wikipedia,
        isStateCapital,
        sourceName: loc.extratags[`source:name:oc`],
        populationSource: loc.extratags[`source:population`],
      }
    }
    
    return newLocation;
  }

  const getWeatherAndTimeData = async (coordinates: any) => {
    try {
      let { latitude, longitude } = coordinates;
      let openWeatherAPIURL = `https://api.openweathermap.org/data/2.5`;
      let openWeatherOneCallForLatLonURL = `${openWeatherAPIURL}/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}`;
      let openWeatherOneCallForLatLonResponse = await fetch(openWeatherOneCallForLatLonURL);

      if (openWeatherOneCallForLatLonResponse.ok == true) {
        let openWeatherOneCallForLatLonData = await openWeatherOneCallForLatLonResponse.json();

        if (isValid(openWeatherOneCallForLatLonData)) {

          let { daily, hourly, minutely, lat: latitude, lon: longitude, timezone, timezone_offset: timezoneOffset } = openWeatherOneCallForLatLonData;

          let { uvi: uvIndex, clouds, sunrise: sunriseInUnix, sunset: sunsetInUnix, pressure, humidity, dt: dateTimeInUnix, temp: temperatureInKelvin, dew_point: dewPointInKelvin, wind_speed: windSpeedInMetersPerSecond } = openWeatherOneCallForLatLonData.current;
          
          let { icon, description, main: condition } = openWeatherOneCallForLatLonData.current.weather[0];

          let weatherAndTime = {

            uvIndex,
            latitude,
            longitude,
            condition,
            description,

            coordinates: {
              latitude,
              longitude,
            },
            
            humidity,
            humidityLabel: `${humidity}%`,
            
            clouds,
            cloudsLabel: `${clouds}%`,
            
            pressure,
            pressureLabel: `${pressure} psi`,
            
            iconEmbedURL: `https://openweathermap.org/img/wn/${icon}@2x.png`,
            
            timezone,
            timezoneOffset,
            continent: timezone.split(`/`)[0].replace(/_/g, ` `),
            cityOrRegion: timezone.split(`/`)[1].replace(/_/g, ` `),

            daily: daily.map((day: any) => ({ ...day, dateTime: moment.unix(day.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
            hourly: hourly.map((hour: any) => ({ ...hour, dateTime: moment.unix(hour.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
            minutely: minutely.map((minute: any) => ({ ...minute, dateTime: moment.unix(minute.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
            
            sunsetInUnix,
            sunriseInUnix,
            dateTimeInUnix,
            sunset: moment.unix(sunsetInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
            sunrise: moment.unix(sunriseInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
            dateTime: moment.unix(dateTimeInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
            currently: moment.unix(dateTimeInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),

            dewPointInKelvin,
            temperatureInKelvin,
            windSpeedInMetersPerSecond,
            dewPointInKelvinLabel: `${dewPointInKelvin} K`,
            temperatureInKelvinLabel: `${temperatureInKelvin} K`,
            windSpeedInMetersPerSecondLabel: `${windSpeedInMetersPerSecond} m/s`,
            dewPointInCelsius: convertTemperatureFromKelvinToCelsius(dewPointInKelvin),
            dewPointInFahrenheit: convertTemperatureFromKelvinToFahrenheit(dewPointInKelvin),
            temperatureInCelsius: convertTemperatureFromKelvinToCelsius(temperatureInKelvin),
            temperatureInFahrenheit: convertTemperatureFromKelvinToFahrenheit(temperatureInKelvin),
            dewPointInCelsiusLabel: `${convertTemperatureFromKelvinToCelsius(dewPointInKelvin)} °C`,
            dewPointInFahrenheitLabel: `${convertTemperatureFromKelvinToFahrenheit(dewPointInKelvin)} °F`,
            temperatureInCelsiusLabel: `${convertTemperatureFromKelvinToCelsius(temperatureInKelvin)} °C`,
            temperatureInFahrenheitLabel: `${convertTemperatureFromKelvinToFahrenheit(temperatureInKelvin)} °F`,
            windSpeedInMilesPerHour: convertWindSpeedFromMetersPerSecondToMilesPerHour(windSpeedInMetersPerSecond),
            windSpeedInMilesPerHourLabel: `${convertWindSpeedFromMetersPerSecondToMilesPerHour(windSpeedInMetersPerSecond)} mph`,
          }

          return weatherAndTime;
        }
      }
    } catch (getWeatherAndTimeDataError) {
      return { error: `Couldn't get Weather for ${location}`, messsage: `Couldn't get Weather for ${location}` };
    }
  }

  const generateNewLocations = async (locations: any) => {
    locations = locations.map((loc: any) => {
      return generateNewLocation(loc);
    }).sort((location1: any, location2: any) => {
      let rank1 = parseFloat(location1.rank);
      let rank2 = parseFloat(location2.rank);
      let importance1 = parseFloat(location1.importance);
      let importance2 = parseFloat(location2.importance);
      let population1 = parseFloat(location1.population);
      let population2 = parseFloat(location2.population);
      if (population1 !== population2) { return population2 - population1 };
      if (rank1 !== rank2) { return rank1 - rank2 };
      if (importance1 !== importance2) { return importance2 - importance1 };
    });

    let locationWithHighestPopulation = locations[0];
    let { coordinates } = locationWithHighestPopulation;
    let totalPopulation = locations.reduce((sum: any, locn: any) => sum + locn.population, 0);
    locationWithHighestPopulation.population = totalPopulation;
    locationWithHighestPopulation.people = totalPopulation.toLocaleString();
    let weatherAndTime: any = await getWeatherAndTimeData(coordinates);
    locationWithHighestPopulation.weatherAndTime = weatherAndTime;
    locationWithHighestPopulation.timezone = weatherAndTime.timezone;

    return locations;
  }

  const getLocations = async (location: any) => {
    try {
      let openStreetMapsNominatimAPIURL = `https://nominatim.openstreetmap.org/search`;
      let openStreetMapsNominatimLocationQuery = `${openStreetMapsNominatimAPIURL}?addressdetails=1&extratags=1&namedetails=1&q=${location}&format=json`;
      let openStreetMapsNominatimLocationResponse = await fetch(openStreetMapsNominatimLocationQuery);
    
      if (openStreetMapsNominatimLocationResponse.ok == true) {
          
        let openStreetMapsNominatimLocationData = await openStreetMapsNominatimLocationResponse.json();
        let locations = openStreetMapsNominatimLocationData;
    
        if (Array.isArray(locations) && locations.length > 0) {
          locations = await generateNewLocations(locations);
        }
    
        return locations;
      } else {
        return openStreetMapsNominatimLocationResponse;
      }
    } catch (locationError) {
      return { location, error, locationError };
    }
  }

  try {
    let locations = [];
    locations = await getLocations(resolvedLocation);
    locations = await locations.map((locat: any, locatIndex: any) => {
      return {
        index: locatIndex + 1,
        ...locat,
      }
    })

    if (locations && isValid(locations)) {
      if (locations.length > 0) timezone = locations[0].timezone;
      return NextResponse.json({
        message: `Based on Timezone and Region: ${timezone}`,
        location: resolvedLocation,
        timezone,
        locations,
      });
    } else {
      return NextResponse.json({
        error,
        message: `No Location(s) Found`,
      });
    }
  } catch (APIError) {
    return NextResponse.json({ APIError, error });
  }
}