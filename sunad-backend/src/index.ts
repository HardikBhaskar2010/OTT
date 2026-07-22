import app from './app';
import { config } from './config/env';

const server = app.listen(config.port, () => {
  console.log(`[Sunad Backend] Service listening on port ${config.port} in ${config.nodeEnv} mode`);
  console.log(`[Sunad Backend] Swagger docs available at http://localhost:${config.port}/docs`);
});

export default server;
