const express = require('express');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator'); 
const YAML = require('yamljs');

const app = express();
const port = 3000;

const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true,
    validateResponses: true,
    ignorePaths: /.*\/docs.*/,
  })
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Este es el home' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Holi, mundillo ;)' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${ port }`); 
}); 