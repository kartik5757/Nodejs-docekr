import express from 'express';
import logger  from '../utils/logger.js';

const router = express.Router();

let products = [];

router.get('/', (req, res) => {
    res.json(products);
});

router.post('/', (req, res) => {
    const product = { id: Date.now().toString(), ...req.body };
    logger.info(`Request for ${id} ${JSON.stringify(product)}`)
    products.push(product);
    res.status(201).json(product);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    logger.info(`Request for ${req.params.id}`)
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    logger.info(`Request for ${index}`)
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products.splice(index, 1);
    res.status(204).send();
});

export default router;
