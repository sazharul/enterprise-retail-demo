const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get finishes with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT finishes.id,
                   finishes.name,
                   finishes.image,
                   finishes.status,
                   COUNT(products.id) AS products_count
            FROM finishes
                     LEFT JOIN products ON finishes.id = products.finish_id
                AND products.deleted_at IS NULL
            WHERE finishes.status = 1
            GROUP BY finishes.id
            ORDER BY finishes.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the finishes data returned by the SQL query
            message: 'Finishes retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching finishes data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
