import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  const key = process.env['youtubeapikey'];

  if (key === void 0) {
    return {
      statusCode: 500,
      body: 'No key provided',
    };
  }

  const channel = event.queryStringParameters?.['channel'];

  if (typeof channel !== 'string') {
    return {
      statusCode: 400,
      body: 'No channel provided',
    };
  }

  const params = {
    key,
    id: channel,
    part: 'snippet,statistics',
  };
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params,
      headers: {
        Referer: event.headers['host'] ?? '',
      },
    });

    if ('items' in response.data === false) {
      return {
        statusCode: 404,
        body: 'Channel not found',
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...response.data.items[0].statistics,
        channel: response.data.items[0].snippet.title,
      }),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: 500,
        body: JSON.stringify(error.response?.data),
      };
    }
    return {
      statusCode: 500,
      body: 'Something really bad happened',
    };
  }
};
