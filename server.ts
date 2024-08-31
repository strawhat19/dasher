export const logo = `dark-logo.svg`;
export const brandName = `Dasher`;
export const icon = `modernize-icon.svg`;
export const defaultTimezone = `America/New_York`;
export const iconPNG = `Modernize-Icon-Small.png`;

export const year = new Date().getFullYear();

export const { OPENWEATHERAPIKEY, NEXT_PUBLIC_OPENWEATHERAPIKEY } = process.env;
export const openWeatherAPIKey = OPENWEATHERAPIKEY || NEXT_PUBLIC_OPENWEATHERAPIKEY;

export const convertWindSpeedFromMetersPerSecondToMilesPerHour = (speedInMS: any) => Math.floor(speedInMS * 2.237);
export const convertTemperatureFromKelvinToCelsius = (tempInKelvin: any) => parseFloat(removeTrailingZeroDecimal(5, (tempInKelvin - 273.15)));
export const convertTemperatureFromKelvinToFahrenheit = (tempInKelvin: any) => parseFloat(removeTrailingZeroDecimal(5, ((tempInKelvin - 273.15) * (9/5) + 32)));

export const dataSize = (data?: any) => {
  let stringData = JSON.stringify(data);
  let dataInfo = new Blob([stringData]);
  return dataInfo.size;
}

export const getGeoDataFromAPI = async (location: string = ``) => {
  if (location != ``) location = `/` + location;
  let geoDataResponse = await fetch(`/api/geodata${location}`);
  if (geoDataResponse.status === 200) {
    let geoData = await geoDataResponse.json();
    if (geoData) {
      return geoData;
    }
  }
}

export const getGeoData = async (location: string = ``) => {
  await getGeoDataFromAPI(location).then(data => {
    return data;
  }).catch(error => {
    return error;
  });
}

export const locations = {
  atlanta: {
    lon: -84.0911,
    lat: 34.063485,
    name: `Atlanta`,
    timezone: defaultTimezone,
  }
}

export const momentTimezoneFormats = {
  smallDateTime: `ddd, M/D, h:mm a`,
  extraSmallDateTime: `M/D, h:mm:ss a`,
  mediumDateTime: `ddd, MMM Do, h:mm a`,
  fullDateTime: `dddd, MMMM Do, h:mm:ss a`,
}

export const removeTrailingZeroDecimal = (limit: any, number: any) => {
  let num = typeof number == `string` ? parseFloat(number) : number;
  const wholeNumber = Math.trunc(num);
  const decimalPart = num - wholeNumber;
  if (decimalPart === 0) {
    return wholeNumber;
  } else {
    return num.toFixed(limit);
  }
}

export const isValid = (item: any) => {
  if (typeof item == `string`) {
    if (!item || item == `` || item.trim() == `` || item == undefined || item == null) {
      return false;
    } else {
      return true;
    }
  } else if (typeof item == `number`) {
    if (isNaN(item) || item == undefined || item == null) {
      return false;
    } else {
      return true;
    }
  } else if (typeof item == `object` && item != undefined && item != null) {
    if (Object.keys(item).length == 0 || item == undefined || item == null) {
      return false;
    } else {
      return true;
    }
  } else if (Array.isArray(item) && item != undefined && item != null) {
    return item.length > 0;
  } else {
    if (item == undefined || item == null) {
      return false;
    } else {
      return true;
    }
  }
}