/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_NODE_ENV: "development" | "production";
  readonly VITE_USER_GOOGLE_CAPTCHA_SITE_KEY: string;
  readonly VITE_USER_GOOGLE_CAPTCHA_SECRET_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
