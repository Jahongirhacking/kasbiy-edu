import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { PUBLIC_API_URL } from "./utils/config";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const publicApi = createApi({
  reducerPath: "public-api",
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});
