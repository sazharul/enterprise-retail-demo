const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get benefits with product count
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT benefits.id,
                   benefits.name,
                   benefits.image,
                   benefits.status,
                   COUNT(products.id) AS products_count
            FROM benefits
                     LEFT JOIN products ON benefits.id = products.benefit_id
                AND products.deleted_at IS NULL
            WHERE benefits.status = 1
            GROUP BY benefits.id
            ORDER BY benefits.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the benefits data returned by the SQL query
            message: 'Benefits retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching benefits data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
