const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET API for fetching slider data
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT section_ones.*,
                   offers.id            AS offer_id,
                   offers.name          AS offer_name,
                   brands.id            AS brand_id,
                   brands.name          AS brand_name
            FROM section_ones
                     LEFT JOIN offers ON section_ones.offer_id = offers.id
                     LEFT JOIN categories ON section_ones.category_id = categories.id
                     LEFT JOIN categories AS sub_category ON section_ones.sub_category_id = categories.id
                     LEFT JOIN categories AS child_category ON section_ones.child_category_id = categories.id
                     LEFT JOIN brands ON section_ones.brand_id = brands.id
            WHERE section_ones.status = 1
              AND (
                (
                    section_ones.type = 'Offer'
                        AND offers.start_date <= NOW()
                        AND offers.expiry_date >= NOW()
                    )
                    OR section_ones.type IN ('Category', 'Brand', 'SubCategory', 'ChildCategory')
                );
        `;

        // Execute the query
        const [rows] = await db.query(query);

        const formattedResponse = rows.map(row => ({
            id: row.id,
            section_id: row.section_id,
            name: row.name,
            image: row.image,
            mobile_image: row.mobile_image,
            link: row.link,
            offer_id: row.offer_id,
            type: row.type,
            category_id: row.category_id,
            sub_category_id: row.sub_category_id,
            child_category_id: row.child_category_id,
            brand_id: row.brand_id,
            status: row.status,
            created_at: row.created_at,
            updated_at: row.updated_at,
            offers: row.type === 'Offer' ? { id: row.offer_id, name: row.offer_name } : null,
            category: row.type === 'Category' ? { id: row.category_id, name: row.category_name } : null,
            brand: row.type === 'Brand' ? { id: row.brand_id, name: row.brand_name } : null,
            sub_category: row.type === 'SubCategory' ? { id: row.sub_category_id, name: row.sub_category_name } : null,
            child_category: row.type === 'ChildCategory' ? { id: row.child_category_id, name: row.child_category_name } : null,
        }));

        // Return the result as JSON
        res.status(200).json({
            success: true,
            data: formattedResponse,
        });

    } catch (error) {
        console.error('Error fetching section one data:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
});


module.exports = router;
