const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get formulations with product count
router.get('/', async (req, res) => {

    try {
        const query = `
            SELECT formulations.id,
                   formulations.name,
                   formulations.image,
                   formulations.status,
                   COUNT(products.id) AS products_count
            FROM formulations
                     LEFT JOIN products ON formulations.id = products.formulation_id
                AND products.deleted_at IS NULL
            WHERE formulations.status = 1
            GROUP BY formulations.id
            ORDER BY formulations.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the formulations data returned by the SQL query
            message: 'Formulations retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching formulations data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
