// validation/itemValidation.js

const Joi = require('joi');

// Define the validation schema for an item
const itemSchema = Joi.object({
    name: Joi.string().min(2).required(),
    quantity: Joi.number().min(0).required()
});

// Validation function to be used in routes
function validateItem(data) {
    return itemSchema.validate(data);
}

module.exports = validateItem;
