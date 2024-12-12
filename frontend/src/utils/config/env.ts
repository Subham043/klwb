export const env = {
  API_ENDPOINT:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://labourwelfarebackend.digisole.in",
  MAIN_URL:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://labourwelfarefrontend.digisole.in",
} as const;
