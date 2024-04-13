import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

// Endpoints for Example API - Example Endpoints.
const exampleApi = apiBuilder({
  method: 'get',
  path: '/example',
  alias: 'getExample',
  description: 'Get example',
  response: z.object({
    text: z.string(),
  }),
  parameters: [
    {
      type: 'Query',
      name: 'name',
      description: 'User name',
      schema: z.string().optional(),
    },
  ],
  errors: [{ status: 'default', schema: z.object({ message: z.string() }) }],
})
  .addEndpoint({
    method: 'post',
    path: '/example/:exampleId',
    description: 'Add example',
    alias: 'addExample',
    response: z.object({}),
    parameters: [
      {
        name: 'exampleId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          name: z.string(),
        }),
      },
    ],
    errors: [{ status: 'default', schema: z.object({ message: z.string() }) }],
  })
  .build();

export default exampleApi;
