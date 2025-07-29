import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',

  client: {
    // API URL for the backend service
    // This is used for generating the API client with the "gen-api" command
    EXPO_PUBLIC_API_URL: z.string().url('API_URL must be a valid URL'),
  },

  /**
   * What object holds the environment variables at runtime. Map these manually like below.
   */
  runtimeEnv: {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  },
});

export default env;
