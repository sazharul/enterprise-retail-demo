const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT colors.id,
                   colors.name,
                   colors.image,
                   colors.status,
                   COUNT(products.id) AS products_count
            FROM colors
                     LEFT JOIN products ON colors.id = products.color_id
                AND products.deleted_at IS NULL
            WHERE colors.status = 1
            GROUP BY colors.id
            ORDER BY colors.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the colors data returned by the SQL query
            message: 'Colors retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching color data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;