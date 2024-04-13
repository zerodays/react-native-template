import { ZodiosPlugin } from '@zodios/core';
import { AxiosError } from 'axios';

const SKIP_ERROR_HANDLING_URLS = ['/example/skip-error-handling'];

const errorErrorPlugin: ZodiosPlugin = {
  name: 'errorErrorPlugin',
  error: async (api, config, err) => {
    if (SKIP_ERROR_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping error handling for', config.url);
      throw err;
    }

    if (err instanceof AxiosError) {
      console.error('AxiosError', err);
    }

    throw err;
  },
};

export default errorErrorPlugin;
