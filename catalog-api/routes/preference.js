const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get preferences with product count
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT preferences.id,
                   preferences.name,
                   preferences.image,
                   preferences.status,
                   COUNT(products.id) AS products_count
            FROM preferences
                     LEFT JOIN products ON preferences.id = products.preference_id
                AND products.deleted_at IS NULL
            WHERE preferences.status = 1
            GROUP BY preferences.id
            ORDER BY preferences.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the preferences data returned by the SQL query
            message: 'preferences retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching preferences data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
