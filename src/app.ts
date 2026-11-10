
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createConfig, attachRouting, type Routing } from 'express-zod-api';
import { Documentation } from 'express-zod-api/documentation';
import { userRoutes } from './modules/users/user.route.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routing: Routing = {
  ...userRoutes,
};

const config = createConfig({
  app,
  cors: false,
});

const documentation = new Documentation({
  routing,
  config,
  info: {
    title: 'User CRUD API',
    version: '1.0.0',
  },
  server: `http://localhost:${PORT}`,
});

const swaggerDocument = JSON.parse(documentation.getSpecAsJson());

app.get('/openapi.json', (_req, res) => {
  res.json(swaggerDocument);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { notFoundHandler } = attachRouting(config, routing);

app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/docs`);
});
