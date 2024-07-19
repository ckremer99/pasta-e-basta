const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: String, 
        required: true
    },

    category: {
        type: String,
        enum: ['Pizza', 'Pasta', 'Dessert']
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },

    password: {
        type: String, 
        required: true
    },

    menuItems: [menuItemSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User; 