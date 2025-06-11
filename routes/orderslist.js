

const express = require('express');
const router = express.Router();
const dbUtils = require('./common/dbUtility');

router.get('/', async (req, res) => {
  try {
    // Fetch all orders from the 'orderlist' collection, latest first
    const orders = await dbUtils.doDbCommunication({}, 'find', 'orderlist');

    // Send back the orders
    res.json({ msg: 'success', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ msg: 'error', error: error.message });
  }
});
module.exports = router;