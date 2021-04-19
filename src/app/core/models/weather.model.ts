export interface Weather {
  message: string;
  cod: number;
  count: number;
  list: [
    {
      id: number;
      name: string;
      coord: {
        lat: any;
        lon: any;
      },
      main: {
        temp: number;
        pressure: number;
        humidity: number;
        feels_like: any;
        temp_min: any;
        temp_max: any;
      }
    }
  ];
}

export interface WeatherDetails {
  temp: number;
  pressure: number;
  humidity: number;
  feels_like: any;
  temp_min: any;
  temp_max: any;
}

export interface PeriodofDay {
  isDay: boolean;
  sunsetTime: string;
  sys: {
    country: string;
    sunset: number;
  };
}
