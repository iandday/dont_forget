import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      SECURE_LOCAL_STORAGE_HASH_KEY: "dsfsfsdfsdfsf21312312231231!@#@#!@!asdasd",
    },
  },
});
