const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get skin types with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT skin_types.id,
                   skin_types.name,
                   skin_types.image,
                   skin_types.status,
                   COUNT(products.id) AS products_count
            FROM skin_types
                     LEFT JOIN products ON skin_types.id = products.skin_type_id
            AND products.deleted_at IS NULL
            WHERE skin_types.status = 1
            GROUP BY skin_types.id
            ORDER BY skin_types.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the skin_types data returned by the SQL query
            message: 'skin_types retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching skin_types data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
