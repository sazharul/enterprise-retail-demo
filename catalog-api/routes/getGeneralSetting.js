const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: {
            id: 1,
            site_name: 'GlowCart',
            email: 'contact@glowcart.demo',
            phone: '02-00000000',
            mobile: '01700-000000',
            address: 'Demo Business District, Dhaka, Bangladesh',
            top_image: 'images/HomeSections/170750745496950.png',
        },
        message: 'Demo general settings retrieved successfully.',
    });
});

module.exports = router;
