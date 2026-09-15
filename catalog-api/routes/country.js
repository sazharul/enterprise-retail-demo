const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get countries with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT countries.id,
                   countries.name,
                   countries.image,
                   countries.status,
                   COUNT(products.id) AS products_count
            FROM countries
                     LEFT JOIN products ON countries.id = products.country_id
                AND products.deleted_at IS NULL
            WHERE countries.status = 1
            GROUP BY countries.id
            ORDER BY countries.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the countries data returned by the SQL query
            message: 'countries retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching countries data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }

});

module.exports = router;
