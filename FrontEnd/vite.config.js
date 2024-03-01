import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    TokenEndpoint: `http://localhost:5000/api/v1/clintToken`,
  },
});
