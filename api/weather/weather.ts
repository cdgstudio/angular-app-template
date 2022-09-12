import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  const appid = process.env['openweathermapApiKey'];
  const city = event.queryStringParameters?.['city'];

  if (city === void 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'City param is required',
      }),
    };
  }

  if (appid === void 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `API key for openweathermap is not defined`,
      }),
    };
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid,
        units: 'metric',
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `${e instanceof Error ? e.message : e}`,
      }),
    };
  }
};
