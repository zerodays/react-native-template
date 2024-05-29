import { ZodiosPlugin } from '@zodios/core';

/**
 * Custom plugin for Zodios to inject API key into request headers
 */
const apiTokenPlugin = (): ZodiosPlugin => {
  return {
    request: async (_, config) => {
      /**
       * You should implement your own logic to get the auth token
       * @example const { data } = await supabase.auth.getSession();
       * @example const authToken = data.session?.access_token;
       */
      const authToken = 'fake-token';

      return {
        ...config,
        headers: {
          ...config.headers,
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
      };
    },
  };
};

export default apiTokenPlugin;
