// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');


const validateItem = require('../validation/itemValidation');

const { requireAdminRole } = require('../middlewares/permissions');

// Protect the DELETE route with requireAdminRole
router.delete('/:id', requireAdminRole, async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a route for search and filter
router.get('/search', async (req, res) => {
  const { name, minQuantity, maxQuantity, sort } = req.query;

  const filter = {};
  if (name) filter.name = new RegExp(name, 'i');
  if (minQuantity) filter.quantity = { ...filter.quantity, $gte: parseInt(minQuantity) };
  if (maxQuantity) filter.quantity = { ...filter.quantity, $lte: parseInt(maxQuantity) };

  const sortOptions = {};
  if (sort) sortOptions[sort] = 1;

  try {
      const items = await Item.find(filter).sort(sortOptions);
      res.json(items);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
    // Validate incoming data using the `validateItem` function
    const { error } = validateItem(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Proceed with item creation if validation is successful
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Log the Item model to confirm it's imported correctly
console.log('Item model:', Item);

// Create a new item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const items = await Item.find().skip(skip).limit(limit);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get an item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an existing item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
