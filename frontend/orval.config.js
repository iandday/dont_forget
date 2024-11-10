module.exports = {
  plant_tracker_api: {
    input: 'http://localhost/api/openapi.json',
    output: {
      mode: 'tags-split',
      workspace: './src/lib/api',
      target: '.dont_forget_api.ts',
      schemas: './model/',
      client: 'react-query',
      allParamsOptional: true,
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
  plant_tracker_zod: {
    input: { target: 'http://localhost/api/openapi.json' },
    output: {
      workspace: './src/lib/api',
      target: './dont_forget_zod.ts',
      client: 'zod',
      mode: 'single',
    },
  },
}
