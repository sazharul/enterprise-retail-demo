const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: {
            id: 1,
            point_per_bdt: 1,
            bdt_per_point: 1,
            min_redeem_points: 100,
            note: 'Demo reward display only — no production reward rules',
        },
        message: 'Demo reward data retrieved successfully.',
    });
});

module.exports = router;
