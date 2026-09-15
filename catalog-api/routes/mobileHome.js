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
        category: row.type === 'Category' ? {id: row.category_id, name: row.category_name} : null,
        brand: row.type === 'Brand' ? {id: row.brand_id, name: row.brand_name} : null,
        sub_category: row.type === 'SubCategory' ? {id: row.sub_category_id, name: row.sub_category_name} : null,
        child_category: row.type === 'ChildCategory' ? {id: row.child_category_id, name: row.child_category_name} : null,
    }));

    return formattedResponse;
}

async function getSectionData(sectionTable, formattedResponse) {
    const query = `
        SELECT ${sectionTable}.*,
               offers.id   AS offer_id,
               offers.name AS offer_name,
               brands.id   AS brand_id,
               brands.name AS brand_name
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

async function productDataIds(tableName) {
    const sectionSixteenQuery = `
        SELECT p.id,
               p.product_id
        FROM ${tableName} p
        WHERE p.status = 1
    `;
    const [sectionSixteenData] = await db.query(sectionSixteenQuery);

    const sectionSixteenProductIdsString = sectionSixteenData
        .map(row => row.product_id)
        .filter(id => id !== null && id !== undefined && id.toString().trim() !== '') // Filter out null, undefined, and empty/whitespace strings
        .join(',');

    console.log(sectionSixteenProductIdsString, 'product ids');

    return await getProductListData(sectionSixteenProductIdsString);
}

async function getProductListData(productIdsString) {

    // page assign pageNumber
    const page = 1;
    const perPage = 15;
    const pageNum = parseInt(page) || 1; // Default to page 1
    const offset = (pageNum - 1) * perPage;

    // Raw SQL query
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
        WHERE p.id IN (${productIdsString})
          AND p.deleted_at IS NULL
    `;

    productQuery += `
            ORDER BY FIELD(p.id, ${productIdsString})
            LIMIT ${perPage}
            OFFSET ${offset};
        `;
    const [productData] = await db.query(productQuery);

    return productData;
}

// GET API for fetching slider data
router.get('/', async (req, res) => {

    try {

        const formattedResponseOne = await getSectionData('section_ones');
        const formattedResponseTwo = await getSectionData('section_twos');
        const formattedResponseThree = await getSectionData('section_threes');
        const formattedResponseFour = await getSectionData('section_fours');
        const formattedResponseFive = await getSectionData('section_fives');
        const formattedResponseSeven = await getSectionData('section_sevens');
        const formattedResponseEight = await getSectionData('section_eights');
        const formattedResponseNine = await getSectionData('section_nines');
        const formattedResponseTen = await getSectionData('section_tens');
        const formattedResponseEightTeen = await getSectionData('section_eighteens');
        const formattedResponseSixTeens = await productDataIds('section_sixteens');
        const formattedResponseSevenTeens = await productDataIds('section_seven_teens');
        const formattedResponseThirteen = await productDataIds('section_thirteens');

        // Fetch home sections
        const queryHomeSection = `
            SELECT *
            FROM home_sections
            WHERE type IN (2, 3)
            ORDER BY position;
        `;
        const [rowsHomeSection] = await db.query(queryHomeSection);

        const querySectionNineteen = `
            SELECT *
            FROM section_nineteens
            ORDER BY id ASC LIMIT 1;
        `;
        const [formattedResponseNineteen] = await db.query(querySectionNineteen);

        // Fetch section eleven data
        const querySectionEleven = `
            SELECT section_elevens.id,
                   section_elevens.section_id,
                   section_elevens.name,
                   section_elevens.image,
                   section_elevens.link,
                   section_elevens.status,
                   section_elevens.created_at,
                   section_elevens.updated_at
            FROM section_elevens
        `;
        const [formattedResponseEleven] = await db.query(querySectionEleven);

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

        // Fetch section fourteen data
        const querySectionFourteen = `
            SELECT section_fourteens.id,
                   section_fourteens.section_id,
                   section_fourteens.image,
                   section_fourteens.concern_id,
                   section_fourteens.status,
                   section_fourteens.created_at,
                   section_fourteens.updated_at
            FROM section_fourteens
            WHERE section_fourteens.status = 1;
        `;
        const [formattedResponseFourteen] = await db.query(querySectionFourteen);


        const allDataHomeSection = rowsHomeSection.map(item => ({
            ...item,
            section_data: item.id === 1 ? formattedResponseOne :
                item.id === 2 ? formattedResponseTwo :
                    item.id === 3 ? formattedResponseThree :
                        item.id === 4 ? formattedResponseFour :
                            item.id === 5 ? formattedResponseFive :
                                //item.id === 6 ? formattedResponseSix :
                                item.id === 7 ? formattedResponseSeven :
                                    item.id === 8 ? formattedResponseEight :
                                        item.id === 9 ? formattedResponseNine :
                                            item.id === 10 ? formattedResponseTen :
                                                item.id === 12 ? formattedResponseTwelve :
                                                    item.id === 11 ? formattedResponseEleven :
                                                        item.id === 13 ? formattedResponseThirteen :
                                                            item.id === 14 ? formattedResponseFourteen :
                                                                // item.id === 15 ? formattedResponseFifteen :
                                                                item.id === 16 ? formattedResponseSixTeens :
                                                                    item.id === 17 ? formattedResponseSevenTeens :
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