import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import express from 'express';
import contactHandler from './api/contact.js';

// Load .env variables for local development
dotenv.config();

function apiPlugin(): Plugin {
  return {
    name: 'vercel-api-simulator',
    configureServer(server) {
      server.middlewares.use(express.json());
      server.middlewares.use('/api/contact', async (req: any, res: any) => {
        // Polyfill Vercel/Express response methods for Connect
        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        
        try {
          await contactHandler(req, res);
        } catch (error) {
          console.error("Local API Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
