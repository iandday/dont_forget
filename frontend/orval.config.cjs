module.exports = {
  plant_tracker_api: {
    input: "http://localhost:8000/api/openapi.json",
    output: {
      mode: "tags-split",
      target: "./lib/dont_forget/endpoints/dont_forget_api.ts",
      schemas: "./lib/dont_forget/model/",
      client: "react-query",
      allParamsOptional: true,
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: "./lib/dont_forget/mutator/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
  plant_tracker_zod: {
    input: { target: "http://localhost:8000/api/openapi.json" },
    output: {
      target: "./lib/dont_forget/dont_forget_zod.ts",
      client: "zod",
      mode: "single",
    },
  },
};
