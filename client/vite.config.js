import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    // index.scss not required to be imported into main.jsx because
    //  vite adds it with the preprocessorOptions.scss.additionalData option
    // according to vite, the additionalData option will
    // "inject extra code for each style content"
    // This allows global variables to be used in all components
    preprocessorOptions: {
      scss: {
        // https://vitejs.dev/config/shared-options#css-preprocessoroptions
        additionalData: `@import "./src/index.scss";`, // Import your global variables
      },
    },
  },
});
