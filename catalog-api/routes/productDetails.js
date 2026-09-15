const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/:id', async (req, res) => {

    const {id} = req.params;
    const {
        user_id = null
    } = req.body;


    try {


        const viewHistoryQuery = `
            -- Check if the record exists
            SELECT * 
            FROM product_view_histories 
            WHERE user_id = ${user_id} 
              AND product_id = ${id}
            LIMIT 1;
        `;

        // Execute the query to check for the existing view history
        const [viewHistoryData] = await db.query(viewHistoryQuery);

        // If no record is found, insert a new record
        if (!viewHistoryData.length) {
            const insertQueryView = `
                INSERT INTO product_view_histories (user_id, product_id, view_count)
                VALUES (${user_id}, ${id}, 1);
            `;
            await db.query(insertQueryView);
        } else {
            // If a record is found, increment the view count
            const updateQueryView = `
                UPDATE product_view_histories
                SET view_count = view_count + 1
                WHERE user_id = ${user_id}
                  AND product_id = ${id};
            `;
            await db.query(updateQueryView);
        }


        const customerAlsoViewedQuery = `
            SELECT products.id
            FROM products
            WHERE products.id != ${id} -- Ensure the product's own ID is excluded
              AND products.id IN (
                SELECT product_id
                FROM product_view_histories
                GROUP BY product_id
                ORDER BY COUNT (*) DESC
                )
            ORDER BY RAND() -- Random order
                LIMIT 20; -- Limit to 20 products
        `;
        // Execute the query
        const [customerAlsoViewedData] = await db.query(customerAlsoViewedQuery);
        const appendIdsString = customerAlsoViewedData.map(row => row.id).join(',');

        let productQuery = `
            SELECT p.id,
                   p.name,
                   p.slug,
                   p.image,
                   p.variation_type,
                   p.is_featured,
                   p.all_shades_count,
                   p.all_sizes_count,
                   p.reviews_avg_star,
                   p.reviews_count,
                   p.total_order_quantity,
                   -- Counting related product shades
                   (SELECT JSON_ARRAYAGG(
                                   JSON_OBJECT(
                                           'id', ps.id,
                                           'shade_id', ps.shade_id,
                                           'product_id', ps.product_id,
                                           'shade_price', ps.shade_price,
                                           'discount_percent',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_discount_percent
                                               ELSE ps.discount_percent
                                               END,
                                           'discounted_price',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_discounted_price
                                               ELSE ps.discounted_price
                                               END,
                                           'flat_discount',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_flat_discount
                                               ELSE ps.flat_discount
                                               END,
                                           'low_stock', ps.low_stock,
                                           'max_order', ps.max_order,
                                           'sku', ps.sku,
                                           'stock', (SELECT IFNULL(SUM(st.quantity), 0)
                                                     FROM stocks st
                                                     WHERE st.product_id = ps.product_id
                                                       AND st.shade_id = ps.shade_id),
                                           'shade', (SELECT JSON_OBJECT(
                                                                    'id', sha.id,
                                                                    'name', sha.name,
                                                                    'image', sha.image,
                                                                    'status', sha.status,
                                                                    'color_id', sha.color_id,
                                                                    'position', sha.position
                                                            )
                                                     FROM shades sha
                                                     WHERE sha.id = ps.shade_id
                                                     ORDER BY sha.position),
                                           'product_shade_images', (SELECT JSON_ARRAYAGG(
                                                                                   JSON_OBJECT(
                                                                                           'id', psi.id,
                                                                                           'product_shade_id', psi.product_shade_id,
                                                                                           'shade_id', psi.shade_id,
                                                                                           'product_id', psi.product_id,
                                                                                           'product_shade_image', psi.product_shade_image
                                                                                   )
                                                                           )
                                                                    FROM product_shade_images psi
                                                                    WHERE psi.product_shade_id = ps.id)
                                   )
                           )
                    FROM product_shades ps
                    WHERE ps.product_id = p.id
                    ORDER BY (SELECT IFNULL(SUM(st.quantity), 0)
                              FROM stocks st
                              WHERE st.product_id = ps.product_id
                                AND st.shade_id = ps.shade_id) DESC)                                             AS product_shades,

                   -- Fetching all related product sizes and sorting by stock descending
                   (SELECT JSON_ARRAYAGG(
                                   JSON_OBJECT(
                                           'id', sz.id,
                                           'size_id', sz.size_id,
                                           'product_id', sz.product_id,
                                           'sku', sz.sku,
                                           'size_price', sz.size_price,
                                           'discount_percent',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_discount_percent
                                               ELSE sz.discount_percent
                                               END,
                                           'discounted_price',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_discounted_price
                                               ELSE sz.discounted_price
                                               END,
                                           'flat_discount',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_flat_discount
                                               ELSE sz.flat_discount
                                               END,
                                           'low_stock', sz.low_stock,
                                           'max_order', sz.max_order,
                                           'stock', (SELECT IFNULL(SUM(stk.quantity), 0)
                                                     FROM stocks stk
                                                     WHERE stk.product_id = sz.product_id
                                                       AND stk.size_id = sz.size_id),
                                           'size', (SELECT JSON_OBJECT(
                                                                   'id', siz.id,
                                                                   'name', siz.name,
                                                                   'status', siz.status
                                                           )
                                                    FROM sizes siz
                                                    WHERE siz.id = sz.size_id),
                                           'product_size_images', (SELECT JSON_ARRAYAGG(
                                                                                  JSON_OBJECT(
                                                                                          'id', psi.id,
                                                                                          'product_size_id', psi.product_size_id,
                                                                                          'product_id', psi.product_id,
                                                                                          'size_id', psi.size_id,
                                                                                          'product_size_image', psi.product_size_image
                                                                                  )
                                                                          )
                                                                   FROM product_size_images psi
                                                                   WHERE psi.product_size_id = sz.id)
                                   )
                           )
                    FROM product_sizes sz
                    WHERE sz.product_id = p.id
                    ORDER BY (SELECT IFNULL(SUM(stk.quantity), 0)
                              FROM stocks stk
                              WHERE stk.product_id = sz.product_id
                                AND stk.size_id = sz.size_id) DESC)                                              AS product_sizes,

                   -- Total stock for the product
                   CAST(IFNULL((SELECT SUM(s.quantity) FROM stocks s WHERE s.product_id = p.id), 0) AS UNSIGNED) AS total_stock

            FROM products p
            WHERE p.id IN (${appendIdsString})
              AND p.deleted_at IS NULL
        `;

        let totalCountQuery = `
            SELECT COUNT(*) AS total
            FROM products p
            WHERE p.id IN (${appendIdsString})
              AND p.deleted_at IS NULL
        `;

        productQuery += `
            ORDER BY FIELD(p.id, ${appendIdsString});
        `;
        const [productData] = await db.query(productQuery);


        const starCounts = {
            '1 Star & Above': 0,
            '2 Star & Above': 0,
            '3 Star & Above': 0,
            '4 Star & Above': 0,
        }


        const query = `
            SELECT p.id,
                   p.name,
                   p.slug,
                   p.description,
                   p.brand_id,
                   p.category_id,
                   p.color_id,
                   p.concern_id,
                   p.benefit_id,
                   p.finish_id,
                   p.country_id,
                   p.coverage_id,
                   p.preference_id,
                   p.finish_id,
                   p.how_to_use,
                   p.faq,
                   p.discount_type,
                   p.image,
                   p.ingredient_description,
                   p.is_combo,
                   p.is_featured,
                   p.is_free_delivery,
                   p.sub_category_id,
                   p.sub_sub_category_id,
                   p.short_description,
                   p.shade_id,
                   p.size_id,
                   p.variation_type,
                   p.tax,

                   p.reviews_count,
                   p.reviews_avg_star,
                   p.total_order_quantity,
                   p.best_sale,

                   p.status,
                   (SELECT JSON_OBJECT(
                                   'id', brnd.id,
                                   'name', brnd.name
                           )
                    FROM brands brnd
                    WHERE brnd.id = p.brand_id
                       LIMIT 1) AS brand,
                       
                   (SELECT JSON_OBJECT(
                               'id', coutry.id,
                               'name', coutry.name
                       )
                    FROM countries coutry
                    WHERE coutry.id = p.country_id
                       LIMIT 1) AS country,
                       
                   (SELECT JSON_OBJECT(
                               'id', coverage.id,
                               'name', coverage.name
                       )
                    FROM coverages coverage
                    WHERE coverage.id = p.coverage_id
                       LIMIT 1) AS coverage,
                       
                   (SELECT JSON_OBJECT(
                           'id', coverage.id,
                           'name', coverage.name
                   )
                    FROM coverages coverage
                    WHERE coverage.id = p.coverage_id
                       LIMIT 1) AS coverage,
                       
                   (SELECT JSON_OBJECT(
                           'id', formulation.id,
                           'name', formulation.name
                   )
                    FROM formulations formulation
                    WHERE formulation.id = p.formulation_id
                       LIMIT 1) AS formulation,
                       
                   (SELECT JSON_OBJECT(
                           'id', formulation.id,
                           'name', formulation.name
                   )
                    FROM formulations formulation
                    WHERE formulation.id = p.formulation_id
                       LIMIT 1) AS formulation,
                       
                   (SELECT JSON_OBJECT(
                           'id', skin_type.id,
                           'name', skin_type.name
                   )
                    FROM skin_types skin_type
                    WHERE skin_type.id = p.skin_type_id
                       LIMIT 1) AS skin_type,

                   (SELECT JSON_ARRAYAGG(
                                JSON_OBJECT( 
                                    'id', color.id,
                                    'name', color.name,
                                    'image', color.image,
                                    'status', color.status
                                )
                        )
                    FROM colors color
                    WHERE color.status = 1
                           AND color.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.color_id, '$[*]' COLUMNS (value INT PATH '$')) AS color_ids
                           )
                        ) AS colors,
            
            
                    (SELECT JSON_ARRAYAGG(
                                JSON_OBJECT( 
                                    'id', benefit.id,
                                    'name', benefit.name,
                                    'image', benefit.image,
                                    'status', benefit.status
                                )
                        )
                    FROM benefits benefit
                    WHERE benefit.status = 1
                           AND benefit.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.benefit_id, '$[*]' COLUMNS (value INT PATH '$')) AS benefit_ids
                           )
                        ) AS benefits,
                        
                    (SELECT JSON_ARRAYAGG(
                            JSON_OBJECT( 
                                'id', concern.id,
                                'name', concern.name,
                                'image', concern.image,
                                'status', concern.status
                            )
                    )
                    FROM concerns concern
                    WHERE concern.status = 1
                           AND concern.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.concern_id, '$[*]' COLUMNS (value INT PATH '$')) AS concern_ids
                           )
                        ) AS concerns,
            
                    (SELECT JSON_ARRAYAGG(
                            JSON_OBJECT( 
                                'id', preference.id,
                                'name', preference.name,
                                'image', preference.image,
                                'status', preference.status
                            )
                    )
                    FROM preferences preference
                    WHERE preference.status = 1
                           AND preference.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.preference_id, '$[*]' COLUMNS (value INT PATH '$')) AS preference_ids
                           )
                        ) AS preferences,
                        
                    (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT( 
                            'id', finishe.id,
                            'name', finishe.name,
                            'image', finishe.image,
                            'status', finishe.status
                        )
                    )
                    FROM finishes finishe
                    WHERE finishe.status = 1
                           AND finishe.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.finish_id, '$[*]' COLUMNS (value INT PATH '$')) AS finish_ids
                           )
                        ) AS finishes,
                        
                    (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT( 
                            'id', gender.id,
                            'name', gender.name,
                            'status', gender.status
                        )
                    )
                    FROM genders gender
                    WHERE gender.status = 1
                           AND gender.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.gender_id, '$[*]' COLUMNS (value INT PATH '$')) AS gender_ids
                           )
                        ) AS genders,
                        
                    (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT( 
                            'id', ingredient.id,
                            'name', ingredient.name,
                            'image', ingredient.image,
                            'status', ingredient.status
                        )
                    )
                    FROM ingredients ingredient
                    WHERE ingredient.status = 1
                           AND ingredient.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.ingredient_id, '$[*]' COLUMNS (value INT PATH '$')) AS ingredient_ids
                           )
                        ) AS ingredients,
                         
                    (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT( 
                            'id', pack.id,
                            'name', pack.name,
                            'image', pack.image,
                            'status', pack.status   
                        )
                    )
                    FROM packs pack
                    WHERE pack.status = 1
                           AND pack.id IN (
                               SELECT value
                               FROM JSON_TABLE(p.pack_id, '$[*]' COLUMNS (value INT PATH '$')) AS ingredient_ids
                           )
                        ) AS packs,
            
                    (SELECT JSON_ARRAYAGG(
                                   JSON_OBJECT(
                                           'id', ps.id,
                                           'shade_id', ps.shade_id,
                                           'product_id', ps.product_id,
                                           'shade_price', ps.shade_price,
                                           'discount_percent',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_discount_percent
                                               ELSE ps.discount_percent
                                               END,
                                           'discounted_price',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_discounted_price
                                               ELSE ps.discounted_price
                                               END,
                                           'flat_discount',
                                           CASE
                                               WHEN ps.flat_discount < ps.offer_flat_discount THEN ps.offer_flat_discount
                                               ELSE ps.flat_discount
                                               END,
                                           'low_stock', ps.low_stock,
                                           'max_order', ps.max_order,
                                           'sku', ps.sku,
                                           'stock', (SELECT IFNULL(SUM(st.quantity), 0)
                                                     FROM stocks st
                                                     WHERE st.product_id = ps.product_id
                                                       AND st.shade_id = ps.shade_id),
                                           'shade', (SELECT JSON_OBJECT(
                                                                    'id', sha.id,
                                                                    'name', sha.name,
                                                                    'image', sha.image,
                                                                    'status', sha.status,
                                                                    'color_id', sha.color_id,
                                                                    'position', sha.position
                                                            )
                                                     FROM shades sha
                                                     WHERE sha.id = ps.shade_id
                                                     ORDER BY sha.position),
                                           'product_shade_images', (SELECT JSON_ARRAYAGG(
                                                                                   JSON_OBJECT(
                                                                                           'id', psi.id,
                                                                                           'product_shade_id', psi.product_shade_id,
                                                                                           'shade_id', psi.shade_id,
                                                                                           'product_id', psi.product_id,
                                                                                           'product_shade_image', psi.product_shade_image
                                                                                   )
                                                                           )
                                                                    FROM product_shade_images psi
                                                                    WHERE psi.product_shade_id = ps.id)
                                   )
                           )
                    FROM product_shades ps
                    WHERE ps.product_id = p.id
                    ORDER BY (SELECT IFNULL(SUM(st.quantity), 0)
                              FROM stocks st
                              WHERE st.product_id = ps.product_id
                                AND st.shade_id = ps.shade_id) DESC)                                             AS product_shades,
                                
                    -- all shades count
                    (SELECT COUNT(*)
                    FROM product_shades ps
                    WHERE ps.product_id = p.id)                                                                  AS all_shades_count,

                   -- Fetching all related product sizes and sorting by stock descending
                   (SELECT JSON_ARRAYAGG(
                                   JSON_OBJECT(
                                           'id', sz.id,
                                           'size_id', sz.size_id,
                                           'product_id', sz.product_id,
                                           'sku', sz.sku,
                                           'size_price', sz.size_price,
                                           'discount_percent',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_discount_percent
                                               ELSE sz.discount_percent
                                               END,
                                           'discounted_price',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_discounted_price
                                               ELSE sz.discounted_price
                                               END,
                                           'flat_discount',
                                           CASE
                                               WHEN sz.flat_discount < sz.offer_flat_discount THEN sz.offer_flat_discount
                                               ELSE sz.flat_discount
                                               END,
                                           'low_stock', sz.low_stock,
                                           'max_order', sz.max_order,
                                           'stock', (SELECT IFNULL(SUM(stk.quantity), 0)
                                                     FROM stocks stk
                                                     WHERE stk.product_id = sz.product_id
                                                       AND stk.size_id = sz.size_id),
                                           'size', (SELECT JSON_OBJECT(
                                                                   'id', siz.id,
                                                                   'name', siz.name,
                                                                   'status', siz.status
                                                           )
                                                    FROM sizes siz
                                                    WHERE siz.id = sz.size_id),
                                           'product_size_images', (SELECT JSON_ARRAYAGG(
                                                                                  JSON_OBJECT(
                                                                                          'id', psi.id,
                                                                                          'product_size_id', psi.product_size_id,
                                                                                          'product_id', psi.product_id,
                                                                                          'size_id', psi.size_id,
                                                                                          'product_size_image', psi.product_size_image
                                                                                  )
                                                                          )
                                                                   FROM product_size_images psi
                                                                   WHERE psi.product_size_id = sz.id)
                                   )
                           )
                    FROM product_sizes sz
                    WHERE sz.product_id = p.id
                    ORDER BY (SELECT IFNULL(SUM(stk.quantity), 0)
                              FROM stocks stk
                              WHERE stk.product_id = sz.product_id
                                AND stk.size_id = sz.size_id) DESC)                                              AS product_sizes,
                                
                    -- all sizes count
                    (SELECT COUNT(*)
                    FROM product_sizes sz
                    WHERE sz.product_id = p.id)                                                                  AS all_sizes_count,

                   -- Total stock for the product
                   CAST(IFNULL((SELECT SUM(s.quantity) FROM stocks s WHERE s.product_id = p.id), 0) AS UNSIGNED) AS total_stock,
            
                (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT( 
                        'id', preview.id,
                        'title', preview.title,
                        'comment', preview.comment,
                        'star', preview.star,
                        'status', preview.status   
                    )
                )
                FROM product_reviews preview
                WHERE preview.status = 2
                       AND preview.id = p.id
                       AND  preview.user_id = ${user_id} ) AS my_reviews, (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', preview.id, 'title', preview.title, 'comment', preview.comment, 'star', preview.star, 'status', preview.status
                )
                )
                FROM product_reviews preview
                WHERE preview.status = 2
                AND preview.id = p.id
                ) AS reviews
            FROM products p
            WHERE p.id = ${id}
            ORDER BY p.name
                LIMIT 1;
        `;


        // Execute the query
        const [rows] = await db.query(query);

        let upToSaleQuery = `
            SELECT *
            FROM offer_up_to_sales
                     LEFT JOIN offers ON offer_up_to_sales.offer_id = offers.id
            WHERE offer_up_to_sales.product_id = ?
              AND offers.expiry_date > NOW();
        `;
        const [upToSaleData] = await db.query(upToSaleQuery, [id]);

        let normalOfferQuery = `
            SELECT *
            FROM normal_offers
                     LEFT JOIN offers ON normal_offers.offer_id = offers.id
            WHERE normal_offers.product_id = ?
              AND offers.expiry_date > NOW();
        `;
        const [normalOfferData] = await db.query(normalOfferQuery, [id]);

        let offerBuyGetQuery = `
            SELECT *
            FROM offer_buy_gets
                     LEFT JOIN offers ON offer_buy_gets.offer_id = offers.id
            WHERE offer_buy_gets.buy_product_id = ?
              AND offers.expiry_date > NOW();
        `;
        const [offerBuyGetData] = await db.query(offerBuyGetQuery, [id]);


        let offerComboQuery = `
            SELECT *
            FROM offer_combos
                     LEFT JOIN offers ON offer_combos.offer_id = offers.id
                     LEFT JOIN combo_products ON offer_combos.combo_product_id = combo_products.id
            WHERE offer_combos.combo_product_id IN (SELECT combo_product_id
                                                    FROM combo_product_infos
                                                    WHERE product_id = ?)
              AND offer_combos.status = 1;
        `;
        const [offerComboData] = await db.query(offerComboQuery, [id]);


        // Current date (for comparison)
        const currentDate = new Date();
        // Initialize an empty array to hold the filtered offers
        let offers = [];

        // Filter offers from each category (Up to Sale, Normal Offers, Offer Buy Get, Combo Offers)
        const filterOffers = (offerDataArray) => {
            offerDataArray.forEach((data) => {
                if (data && data.expiry_date && new Date(data.expiry_date) > currentDate) {
                    let offerData = {
                        title: data.name,
                        product_details: data
                    };

                    // Check if the offer has already been added (based on offer_id)
                    const offerExists = offers.some(offer => offer.product_details.offer_id === data.offer_id);

                    if (!offerExists) {
                        offers.push(offerData);  // Only push if the offer is not already in the array
                    }
                }
            });
        };

        filterOffers(upToSaleData);
        filterOffers(normalOfferData);
        filterOffers(offerBuyGetData);
        filterOffers(offerComboData);


        // Add the "offer" property with its value to each row
        if (rows.length > 0) {
            rows[0].offers = {
                count : offers.length,
                offer_details : offers
            };  // Add the "offer" property to rows[0]
        }

        // Return the result as JSON
        res.status(200).json({
            status: true,
            data: {
                customer_also_viewed: productData,
                product: rows[0],
                starCounts: starCounts,
            },
            message: 'Product detail retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;