export const env = {
  API_ENDPOINT:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://ksp-api.digisole.in",
  MAIN_URL:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://ksp-client.digisole.in",
} as const;
