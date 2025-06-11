
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
orderId: String,
orderDate: String,
cartItems: Array,
totalAmount: Number
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);


