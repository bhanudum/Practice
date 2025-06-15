

const express = require('express');
const router = express.Router();
const dbUtils = require('./common/dbUtility');

router.get('/', async (req, res) => {
  try {
    const { accountId } = req.query;
    if (!accountId) {
      return res.status(400).json({ msg: 'Missing accountId in query' });
    }

    const orders = await dbUtils.doDbCommunication({ "user.accountId": accountId }, 
      'find','orderlist');
      
    res.json({ msg: 'success', orders });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ msg: 'error', error: error.message });
  }
});
module.exports = router;