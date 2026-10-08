import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ base: "/color-contrast-checker/", build: { sourcemap: false }, plugins: [react()] });
