const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const port = 3000;

const swaggerDocuments = YAML.load('./openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello world'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${ port }`); 
}); 