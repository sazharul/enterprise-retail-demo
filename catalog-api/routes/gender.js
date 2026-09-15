const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get genders with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT genders.id,
                   genders.name,
                   genders.status,
                   COUNT(products.id) AS products_count
            FROM genders
                     LEFT JOIN products ON genders.id = products.gender_id
                AND products.deleted_at IS NULL
            WHERE genders.status = 1
            GROUP BY genders.id
            ORDER BY genders.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the genders data returned by the SQL query
            message: 'genders retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching genders data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
