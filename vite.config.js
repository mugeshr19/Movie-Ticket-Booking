import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Movie-Ticket-Booking/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
