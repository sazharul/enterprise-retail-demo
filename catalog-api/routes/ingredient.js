const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get ingredients with product count
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT ingredients.id,
                   ingredients.name,
                   ingredients.image,
                   ingredients.status,
                   COUNT(products.id) AS products_count
            FROM ingredients
                     LEFT JOIN products ON ingredients.id = products.ingredient_id
                AND products.deleted_at IS NULL
            WHERE ingredients.status = 1
            GROUP BY ingredients.id
            ORDER BY ingredients.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: rows,  // The rows are the ingredients data returned by the SQL query
            message: 'ingredients retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching ingredients data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;
