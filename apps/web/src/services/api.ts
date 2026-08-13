import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: `${apiBaseUrl}/api`,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as {
        auth: {
          token: string | null;
        };
      };

      const token = state.auth.token;

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  endpoints: () => ({}),
});