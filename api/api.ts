import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import apiErrorPlugin from './api-error-plugin';
import exampleApi from './example';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

// Zodios API client
const apiClient = new Zodios(API_URL, [...exampleApi]);

apiClient.use(apiErrorPlugin);
const api = new ZodiosHooks('exampleApi', apiClient);

export { api, apiClient };
