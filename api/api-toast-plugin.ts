import useToastStore from '@utils/stores/toast-store';
import { ZodiosPlugin } from '@zodios/core';
import { AxiosError } from 'axios';
import i18n from 'i18next';

const SKIP_ERROR_HANDLING_URLS = [''];
const SKIP_SUCCESS_HANDLING_URLS = [''];

const apiToastPlugin: ZodiosPlugin = {
  name: 'apiToastPlugin',
  error: async (api, config, err) => {
    if (SKIP_ERROR_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping error handling for', config.url);
      throw err;
    }

    if (err instanceof AxiosError) {
      useToastStore.getState().setToast({
        type: 'error',
        message:
          err.response?.data?.message || i18n.t('common:apiErrorDescription'),
      });
    }

    throw err;
  },
  response: async (api, config, response) => {
    if (SKIP_SUCCESS_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping success handling for', config.url);
      return response;
    }

    // Skip handling GET requests
    if (config.method?.toUpperCase() === 'GET') {
      return response;
    }

    const getMessage = () => {
      let message = '';
      switch (config.method?.toUpperCase()) {
        case 'POST':
          message = i18n.t('common:createSuccess');
          break;
        case 'PUT':
          message = i18n.t('common:updateSuccess');
          break;
        case 'DELETE':
          message = i18n.t('common:deleteSuccess');
          break;
      }

      return message;
    };

    if (response.status >= 200 && response.status < 300) {
      useToastStore.getState().setToast({
        type: 'success',
        message: getMessage(),
      });
    }

    return response;
  },
};

export default apiToastPlugin;
