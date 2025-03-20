import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './controllers/orderRoutes.js';
import * as OpenApiValidator from 'express-openapi-validator';
import path  from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


import consumeOrders  from './consumer/orderconsumer.js'

const app = express();
const PORT = 8081;

app.use(
    OpenApiValidator.middleware({
        apiSpec: path.join(__dirname, '_config.yaml'),
        validateRequests: true,
    })
);

app.use(bodyParser.json());
app.use('/api/v1/products', orderRoutes);


app.listen(PORT, () => {
    consumeOrders()
    console.log(`Product microservice running on http://localhost:${PORT}/api/v1`);
});
