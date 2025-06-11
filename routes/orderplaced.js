
const express = require('express');
const router = express.Router();
const dbUtils = require('./common/dbUtility'); // Adjust path if needed

// Generate Order ID (001, 002, ...)
async function generateOrderId() {
  const orders = await dbUtils.doDbCommunication({}, 'find', 'orderlist');
  const nextId = orders.length + 1;
  return String(nextId).padStart(3, '0');
}

// POST /api/orders/create-order
router.post('/', async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;

    const orderId = await generateOrderId();
    const orderDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const orderDetails = {
      orderId,
      orderDate,
      cartItems,
      totalAmount
    };

    const result = await dbUtils.doDbCommunication(orderDetails, 'insertOne', 'orderlist');

    if (result && result.insertedId) {
      res.json({ msg: 'success', orderId });
    } else {
      res.status(500).json({ msg: 'error', error: 'Insert failed' });
    }
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ msg: 'error', error: err.message });
  }
});

module.exports = router;





