import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

const apiEndpointPlugin = () => ({
  name: 'api-endpoint',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      // Proxy /api/chat route
      if (req.url === '/api/chat' && req.method === 'POST') {
        try {
          // Parse the request body manually because it's a raw Node req
          let body = '';
          for await (const chunk of req) { body += chunk; }
          req.body = body ? JSON.parse(body) : {};

          // Add basic Express-like response helpers our handler expects
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          // Dynamically import the handler (Vite handles TS compilation in config)
          const handler = (await import('./api/chat.ts')).default;
          await handler(req, res);
        } catch (err) {
          console.error("Vite API Error:", err);
          if (!res.headersSent) {
             res.statusCode = 500;
             res.setHeader('Content-Type', 'application/json');
             res.end(JSON.stringify({ error: err.message || "Internal API Error" }));
          }
        }
      } else {
        next();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiEndpointPlugin()],
})
