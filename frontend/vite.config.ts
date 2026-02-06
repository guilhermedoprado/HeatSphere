import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_PROXY_TARGET ?? "http://localhost:8080";

  return {
    plugins: [react()],
    server: {
      host: true,          // equivalente a 0.0.0.0 no container
      port: 5173,
      strictPort: true,
      hmr: { host: "localhost" }, // evita tentar usar 0.0.0.0 no browser
      proxy: {
        "/api": {
          target,
          changeOrigin: true
        }
      }
    }
  };
});
