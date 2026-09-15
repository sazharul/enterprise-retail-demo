const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT brands.id, brands.name, brands.slug, COUNT(products.id) AS products_count
            FROM brands
                     LEFT JOIN products ON brands.id = products.brand_id
                AND products.deleted_at IS NULL
            WHERE brands.status = 1
            GROUP BY brands.id
            ORDER BY brands.name;
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Initialize the formattedData array
        const formattedData = [];

        // Iterate over each brand and group by the first letter of the brand name
        rows.forEach(brand => {
            const firstLetter = brand.name.charAt(0).toUpperCase();

            // Check if a group with the same caption already exists
            let groupKey = formattedData.findIndex(group => group.caption === firstLetter);

            if (groupKey === -1) {
                // If the group does not exist, create a new group
                groupKey = formattedData.length;
                formattedData.push({
                    id: groupKey + 1,
                    caption: firstLetter,
                    list: []
                });
            }

            // Add the brand to the corresponding group
            formattedData[groupKey].list.push({
                id: brand.id,
                title: brand.name,
                slug: brand.slug,
                product_count: brand.products_count
            });
        });

        // Return the formatted data as JSON
        res.status(200).json({
            status: true,
            data: formattedData,
            message: 'Brands retrieved and grouped successfully.',
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