import express from 'express';
import logger  from '../utils/logger.js';


const router = express.Router();

let order = [];

router.get('/', (req, res) => {
    res.json(order);
});

router.post('/', (req, res) => {
    const order = { id: Date.now().toString(), ...req.body };
    logger.info(`Request for ${id} ${JSON.stringify(order)}`)
    order.push(order);
    res.status(201).json(order);
});

router.get('/:id', (req, res) => {
    const order = order.find(p => p.id === req.params.id);
    logger.info(`Request for ${req.params.id}`)
    if (!order) return res.status(404).json({ message: 'order not found' });
    produceOrder()
    res.json(order);
});

router.put('/:id', (req, res) => {
    const index = order.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'order not found' });
    order[index] = { ...order[index], ...req.body };
    res.json(order[index]);
});

router.delete('/:id', (req, res) => {
    const index = order.findIndex(p => p.id === req.params.id);
    logger.info(`Request for ${index}`)
    if (index === -1) return res.status(404).json({ message: 'order not found' });
    order.splice(index, 1);
    res.status(204).send();
});

export default router;
