const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get pack sizes with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT packs.id,
                   packs.name,
                   packs.image,
                   packs.status,
                   COUNT(products.id) AS products_count
            FROM packs
                     LEFT JOIN products ON packs.id = products.pack_id
                AND products.deleted_at IS NULL
            WHERE packs.status = 1
            GROUP BY packs.id
            ORDER BY packs.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the packs data returned by the SQL query
            message: 'packs retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching packs data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
