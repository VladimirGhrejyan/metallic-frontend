/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_TITLE: string;
    readonly APP_PORT: number;
    readonly APP_API_URL: string;
    readonly APP_OPENAPI_SCHEMA_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
