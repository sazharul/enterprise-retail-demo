const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get coverage with product count
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT coverages.id,
                   coverages.name,
                   coverages.image,
                   coverages.status,
                   COUNT(products.id) AS products_count
            FROM coverages
                     LEFT JOIN products ON coverages.id = products.coverage_id
                AND products.deleted_at IS NULL
            WHERE coverages.status = 1
            GROUP BY coverages.id
            ORDER BY coverages.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the coverages data returned by the SQL query
            message: 'coverages retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching coverages data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
