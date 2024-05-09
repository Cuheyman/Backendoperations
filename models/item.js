// models/Item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required'],
        minlength: [2, 'Item name must be at least 2 characters long']
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be greater than or equal to 0']
    }
});

module.exports = mongoose.model('Item', itemSchema);
