
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
orderId: Number,
orderDate: Date,
cartItems: Array,
totalAmount: Number,
 user: {
    userId: String,
    accountId: String,
    dob: String,
    email: String,
    mobile: String,
    address: String
  }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);


