const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const transformData = (rows) => {
    const formattedResponse = rows.map(row => ({
        id: row.id,
        section_id: row.section_id,
        name: row.name,
        description: row.description,
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
        offers: row.type === 'Offer' ? {id: row.offer_id, name: row.offer_name} : null,
        category: row.type === 'Category' ? {id: row.category_id, name: row.category_name, slug: row.category_slug} : null,
        brand: row.type === 'Brand' ? {id: row.brand_id, name: row.brand_name, slug: row.brand_slug} : null,
        sub_category: row.type === 'SubCategory' ? {id: row.sub_category_id, name: row.sub_category_name, slug: row.sub_category_slug} : null,
        child_category: row.type === 'ChildCategory' ? {id: row.child_category_id, name: row.child_category_name, slug: row.child_category_slug} : null,
    }));

    return formattedResponse;
}

async function getSectionData(sectionTable, formattedResponse) {
    const query = `
        SELECT ${sectionTable}.*,
               offers.id   AS offer_id,
               offers.name AS offer_name,
               
               brands.id   AS brand_id,
               brands.name AS brand_name,
               brands.slug AS brand_slug,
               
               categories.id   AS category_id,
               categories.name AS category_name,
               categories.slug AS category_slug,
        
               sub_category.id   AS sub_category_id,
               sub_category.name AS sub_category_name,
               sub_category.slug AS sub_category_slug,
               
               child_category.id   AS child_category_id,
               child_category.name AS child_category_name,
               child_category.slug AS child_category_slug
        FROM ${sectionTable}
                 LEFT JOIN offers ON ${sectionTable}.offer_id = offers.id
                 LEFT JOIN categories ON ${sectionTable}.category_id = categories.id
                 LEFT JOIN categories AS sub_category ON ${sectionTable}.sub_category_id = categories.id
                 LEFT JOIN categories AS child_category ON ${sectionTable}.child_category_id = categories.id
                 LEFT JOIN brands ON ${sectionTable}.brand_id = brands.id
        WHERE ${sectionTable}.status = 1
          AND (
            (
                ${sectionTable}.type = 'Offer'
                    AND offers.start_date <= NOW()
                    AND offers.expiry_date >= NOW()
                )
                OR ${sectionTable}.type IN ('Category', 'Brand', 'SubCategory', 'ChildCategory')
            );
    `;

    const [rows] = await db.query(query);
    return transformData(rows);
}

async function getSectionSixData() {
    const query = `
        SELECT products.id,
               products.name,
               products.slug,
               products.variation_type,
               products.image,
               products.tax,
               products.is_free_delivery,
               products.is_combo,
               products.is_featured,
               products.status,
               products.created_at,
               products.updated_at,
               IFNULL(
                       JSON_ARRAYAGG(
                               JSON_OBJECT(
                                       'id', product_shades.id,
                                       'product_id', product_shades.product_id,
                                       'sku', product_shades.sku,
                                       'shade_id', product_shades.shade_id,
                                       'shade_price', product_shades.shade_price,
                                       'discount_percent', product_shades.discount_percent,
                                       'discounted_price', product_shades.discounted_price,
                                       'flat_discount', product_shades.flat_discount,
                                       'low_stock', product_shades.low_stock,
                                       'max_order', product_shades.max_order
                               )
                       )
                   , JSON_ARRAY()
               ) AS product_shades,
               IFNULL(
                       (SELECT COUNT(*)
                        FROM order_details od
                        WHERE od.product_id = products.id),
                       0
               ) AS order_details_count

        FROM products
                 LEFT JOIN product_shades
                           ON products.id = product_shades.product_id
        WHERE products.status = 1
          AND products.deleted_at IS NULL
        GROUP BY products.id
        ORDER BY (SELECT COUNT(*)
                  FROM order_details od
                  WHERE od.product_id = products.id) DESC LIMIT 30;
    `;

    const [rows] = await db.query(query);
    return rows; // Ensure it returns the expected data
}

// GET API for fetching slider data
router.get('/', async (req, res) => {

    try {

        const formattedResponseOne = await getSectionData('section_ones');
        const formattedResponseTwo = await getSectionData('section_twos');
        const formattedResponseThree = await getSectionData('section_threes');
        const formattedResponseFive = await getSectionData('section_fives');
        const formattedResponseSeven = await getSectionData('section_sevens');
        const formattedResponseEight = await getSectionData('section_eights');
        const formattedResponseNine = await getSectionData('section_nines');
        const formattedResponseEightTeen = await getSectionData('section_eighteens');

        // Fetch home sections
        const queryHomeSection = `
            SELECT *
            FROM home_sections
            WHERE type IN (1, 3)
            ORDER BY position;
        `;
        const [rowsHomeSection] = await db.query(queryHomeSection);

        const querySectionNineteen = `
            SELECT *
            FROM section_nineteens
            ORDER BY id ASC LIMIT 1;
        `;
        const [formattedResponseNineteen] = await db.query(querySectionNineteen);

        // Fetch section twelve data
        const querySectionTwelve = `
            SELECT section_twelves.id,
                   section_twelves.section_id,
                   section_twelves.image,
                   section_twelves.category_id,
                   section_twelves.status,
                   section_twelves.created_at,
                   section_twelves.updated_at,
                   JSON_OBJECT(
                           'id', categories.id,
                           'name', categories.name,
                           'slug', categories.slug,
                           'image', categories.image,
                           'status', categories.status,
                           'parent_id', categories.parent_id,
                           'created_at', categories.created_at,
                           'updated_at', categories.updated_at,
                           'icon', categories.icon,
                           'position', categories.position,
                           'show_on_header', categories.show_on_header,
                           'best_sell_count', categories.best_sell_count
                   ) AS categories
            FROM section_twelves
                     LEFT JOIN categories ON section_twelves.category_id = categories.id
            WHERE section_twelves.status = 1;
        `;
        const [formattedResponseTwelve] = await db.query(querySectionTwelve);

        //const formattedResponseSix = await getSectionSixData();

        const allDataHomeSection = rowsHomeSection.map(item => ({
            ...item,
            section_data: item.id === 1 ? formattedResponseOne :
                item.id === 2 ? formattedResponseTwo :
                    item.id === 3 ? formattedResponseThree :
                        item.id === 5 ? formattedResponseFive :
                            //item.id === 6 ? formattedResponseSix :
                            item.id === 7 ? formattedResponseSeven :
                                item.id === 8 ? formattedResponseEight :
                                    item.id === 9 ? formattedResponseNine :
                                        item.id === 12 ? formattedResponseTwelve :
                                            // item.id === 15 ? formattedResponseFifteen :
                                            item.id === 18 ? formattedResponseEightTeen :
                                                item.id === 19 ? formattedResponseNineteen :
                                                    [] // Default value if id doesn't match
        }));

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: allDataHomeSection,
            message: 'Home data fetched successfully',
        });

    } catch (error) {
        console.error('Error fetching section one data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;