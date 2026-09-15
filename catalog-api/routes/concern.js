const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get concerns with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT concerns.id,
                   concerns.name,
                   concerns.image,
                   concerns.status,
                   COUNT(products.id) AS products_count
            FROM concerns
                     LEFT JOIN products ON concerns.id = products.concern_id
                AND products.deleted_at IS NULL
            WHERE concerns.status = 1
            GROUP BY concerns.id
            ORDER BY concerns.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the concerns data returned by the SQL query
            message: 'concerns retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching concerns data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }

});

module.exports = router;
