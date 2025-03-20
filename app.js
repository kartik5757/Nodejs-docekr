import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './controllers/productRoutes.js';
import * as OpenApiValidator from 'express-openapi-validator';
import path  from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
const PORT = 8080;

app.use(
    OpenApiValidator.middleware({
        apiSpec: path.join(__dirname, '_config.yaml'),
        validateRequests: true,
    })
);

app.use(bodyParser.json());
app.use('/api/v1/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Product microservice running on http://localhost:${PORT}/api/v1`);
});
