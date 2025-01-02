export const env = {
  API_ENDPOINT:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://klwbapps.karnataka.gov.in/backend/public",
  MAIN_URL:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://klwb-app.digisole.in",
} as const;
