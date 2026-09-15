const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT brands.id, brands.name, COUNT(products.id) AS products_count
            FROM brands
                     LEFT JOIN products ON brands.id = products.brand_id
                AND products.deleted_at IS NULL
            WHERE brands.status = 1
            GROUP BY brands.id
            ORDER BY brands.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the brands data returned by the SQL query
            message: 'Brand retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching brand data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;