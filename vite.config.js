import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

function mountChatApi(server) {
  server.middlewares.use('/api/chat', async (req, res) => {
    try {
      const { default: chatHandler } = await import('./api/chat.js');
      await chatHandler(req, res);
    } catch (error) {
      console.error('[chat-dev] unexpected error', {
        name: error?.name,
      });

      if (!res.writableEnded) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(
          JSON.stringify({
            error: {
              code: 'DEV_SERVER_ERROR',
              message:
                'No se pudo procesar la solicitud del asistente en el servidor local.',
            },
          }),
        );
      }
    }
  });
}

const chatApiPlugin = {
  name: 'nexobyte-chat-api',
  configureServer: mountChatApi,
  configurePreviewServer: mountChatApi,
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GEMINI_');

  if (!process.env.GEMINI_API_KEY && env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }
  if (!process.env.GEMINI_MODEL && env.GEMINI_MODEL) {
    process.env.GEMINI_MODEL = env.GEMINI_MODEL;
  }

  return {
    plugins: [react(), chatApiPlugin],
  };
});
