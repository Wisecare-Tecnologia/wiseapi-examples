/**
 * Configurações da aplicação
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "https://session-manager.homolog.v4h.cloud/api/v1",
    domain: import.meta.env.VITE_API_DOMAIN || "conf.homolog.v4h.cloud",
  },
} as const;

export default config;
