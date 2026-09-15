const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: [
            {
                id: 1,
                offer_id: 1,
                offer: {
                    id: 1,
                    name: '10% Off Skincare',
                    title1: 'Save 10%',
                    title2: 'On selected items',
                    color: '#E91E63',
                    percentage: 10,
                    min_amount: 500,
                    status: 1,
                },
            },
            {
                id: 2,
                offer_id: 2,
                offer: {
                    id: 2,
                    name: 'Free Delivery',
                    title1: 'Free Shipping',
                    title2: 'Orders over 2000 BDT',
                    color: '#4CAF50',
                    is_free_delivery: 1,
                    min_amount: 2000,
                    status: 1,
                },
            },
        ],
        message: 'Demo offers retrieved successfully.',
    });
});

module.exports = router;
