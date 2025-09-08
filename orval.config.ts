import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'split',
      target: 'api/generated/endpoints.ts',
      schemas: 'api/generated/model',
      client: 'react-query',
      clean: true,
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './api/axios-instance.ts',
          name: 'customAxios',
        },
      },
    },
    input: {
      // This will get overridden by /scripts/generate-api.ts
      target: './placeholder.yaml',
    },
  },
  apiZod: {
    output: {
      mode: 'split',
      client: 'zod',
      prettier: true,
      target: 'api/generated/types.ts',
    },
    input: {
      // This will get overridden by /scripts/generate-api.ts
      target: './placeholder.yaml',
    },
  },
});
