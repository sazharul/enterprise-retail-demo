const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: {
            id: 1,
            charge: 60,
            min_order: 0,
            note: 'Demo fixed shipping — 60 BDT nationwide',
        },
        message: 'Demo shipping charge retrieved successfully.',
    });
});

module.exports = router;
