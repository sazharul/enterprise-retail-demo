const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const generatePaginationLinks = require("./generatePaginationLinks");

router.post('/', async (req, res) => {
    try {
        // Parse pagination and page number from the request body
        const {
            offer_id = null,
            pageNumber = 1,
            pagination = 12,
        } = req.body;

        // page assign pageNumber
        const page = pageNumber;
        const perPage = parseInt(pagination) || 15;
        const pageNum = parseInt(page) || 1; // Default to page 1
        const offset = (pageNum - 1) * perPage;

        const offerQuery = `
            SELECT offers.id, offers.name, offers.offer_type_id, offers.banner_web, offers.banner_mobile
            FROM offers
            WHERE status = 1
              AND expiry_date IS NOT NULL
              AND expiry_date >= NOW()
              AND start_date <= NOW()
              AND id = ${offer_id} LIMIT 1
        `;

        const [offerInfoData] = await db.query(offerQuery);

        // if offerInfoData is empty, return an error message
        if (offerInfoData.length === 0) {
            return res.status(200).json({
                status: false,
                message: 'Offer not found.',
            });
        }

        let offerProductIdString;
        if (offerInfoData.length > 0) {
            const offer = offerInfoData[0]; // Get the first result
            if (offer.offer_type_id === 1) {

                const offerProductQuery = `
                    SELECT nofer.product_id, nofer.id
                    FROM normal_offers nofer
                    WHERE nofer.offer_id = ${offer_id}
                `;

                const [offerProductIds] = await db.query(offerProductQuery);

                // Ensure offerProductIds is not empty before mapping
                offerProductIdString = offerProductIds.length > 0 ? offerProductIds.map(row => row.product_id).join(',') : 0;
                //console.log(offerProductIdString);

            } else if (offer.offer_type_id === 2) {
                console.log("Offer Type 2: Discount Offer", offer);
            } else if (offer.offer_type_id === 3) {
                const offerProductQuery = `
                    SELECT obg.buy_product_id
                    FROM offer_buy_gets obg
                    WHERE obg.offer_id = ${offer_id}
                `;

                const [offerProductIds] = await db.query(offerProductQuery);

                // Ensure offerProductIds is not empty before mapping
                offerProductIdString = offerProductIds.length > 0 ? offerProductIds.map(row => row.product_id).join(',') : 0;


            } else if (offer.offer_type_id === 4) {

                const offerProductQuery = `
                    SELECT outs.product_id
                    FROM offer_up_to_sales outs
                    WHERE outs.offer_id = ${offer_id}
                `;

                const [offerProductIds] = await db.query(offerProductQuery);

                // Ensure offerProductIds is not empty before mapping
                offerProductIdString = offerProductIds.length > 0 ? offerProductIds.map(row => row.product_id).join(',') : 0;


            } else {
                console.log("Other Offer Type", offer);
            }
        } else {
            console.log("No offer found.");
        }

        // 0. Get all products where there is stock
        const productStockQuery = `
            SELECT p.id
            FROM products p
                     JOIN stocks s ON p.id = s.product_id
            WHERE p.status = 1
              AND s.quantity > 0
              AND p.id IN (${offerProductIdString})
        `;
        const [productStockData] = await db.query(productStockQuery);
        const stockIdsString = productStockData.length > 0 ? productStockData.map(row => row.id).join(',') : 0;

        // 1. Get all featured products where stock is available
        const featuredQuery = `
            SELECT p.id
            FROM products p
            WHERE p.status = 1
              AND p.is_featured = 1
              AND p.id IN (${stockIdsString})
        `;
        const [featuredData] = await db.query(featuredQuery);
        const featuredIdsString = featuredData.length > 0 ? featuredData.map(row => row.id).join(',') : 0;


        // 2. Get most sold products (not featured) that are in stock
        const mostSoldQuery = `
            SELECT od.product_id
            FROM order_details od
                     JOIN \`orders\` o ON od.order_id = o.id
            WHERE od.product_id IN (${stockIdsString})
              AND od.product_id NOT IN (${featuredIdsString})
              AND o.status = 4
            GROUP BY od.product_id
            ORDER BY SUM(od.quantity) DESC;
        `;
        const [mostSoldData] = await db.query(mostSoldQuery);
        const mostSoldIdsString = mostSoldData.length > 0 ? mostSoldData.map(row => row.product_id).join(',') : 0;

        // 3. Get other products in stock that are not featured or most sold
        const otherProductQuery = `
            SELECT p.id
            FROM products p
            WHERE p.status = 1
              AND p.id IN (${stockIdsString})        -- stockIds array
              AND p.id NOT IN (${featuredIdsString}) -- featuredProductIds array
              AND p.id NOT IN (${mostSoldIdsString}) -- getMostSoldProducts array
        `;

        const [otherProductData] = await db.query(otherProductQuery);
        const otherProductIdsString = otherProductData.length > 0 ? otherProductData.map(row => row.id).join(',') : 0;


        // 4. Get out-of-stock products that are not in any of the above lists
        const outOfStockProductQuery = `
            SELECT p.id
            FROM products p
            WHERE p.status = 1
              AND p.id IN (${offerProductIdString})
              AND p.id NOT IN (${stockIdsString})    -- stockIds array
              AND p.id NOT IN (${featuredIdsString}) -- featuredProductIds array
              AND p.id NOT IN (${mostSoldIdsString}) -- getMostSoldProducts array
              AND p.id NOT IN (${otherProductIdsString}) -- otherProductIds array
        `;
        const [outOfStockProductData] = await db.query(outOfStockProductQuery);
        const outOfStockProductIdsString = outOfStockProductData.length > 0 ? outOfStockProductData.map(row => row.id).join(',') : 0;

        // 5. Append all ids in one array and remove duplicates while maintaining order
        const featuredProductIds = featuredData.map(row => row.id);
        const mostSoldProductIds = mostSoldData.map(row => row.product_id);
        const otherProductIds = otherProductData.map(row => row.id);
        const outOfStockProductIds = outOfStockProductData.map(row => row.id);

        // Merge all arrays (maintain order)
        const allProductIds = [
            ...featuredProductIds,
            ...mostSoldProductIds,
            ...otherProductIds,
            ...outOfStockProductIds
        ];

        // Remove duplicates while preserving the order
        const uniqueProductIds = [...new Set(allProductIds)];
        const appendIdsString = uniqueProductIds.join(',');


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
            WHERE p.id IN (${appendIdsString})
              AND p.deleted_at IS NULL
        `;

        // 1. Get the total count of matching products (no LIMIT or OFFSET here)
        let totalCountQuery = `
            SELECT COUNT(*) AS total
            FROM products p
            WHERE p.id IN (${appendIdsString})
              AND p.deleted_at IS NULL
        `;

        productQuery += `
            ORDER BY FIELD(p.id, ${appendIdsString})
            LIMIT ${perPage}
            OFFSET ${offset};
        `;
        const [productData] = await db.query(productQuery);


        const [totalResult] = await db.query(totalCountQuery);
        const total = totalResult[0].total; // Get the total count of products

        // Calculate the last page
        const lastPage = Math.ceil(total / perPage);

        // Pagination URLs
        const baseUrl = '/api/node/products'; // Your base URL
        const prevPageUrl = pageNum > 1 ? `${baseUrl}?page=${pageNum - 1}` : null;
        const nextPageUrl = pageNum < lastPage ? `${baseUrl}?page=${pageNum + 1}` : null;


        // Generate the pagination links
        const links = generatePaginationLinks(baseUrl, pageNum, lastPage, perPage, total, nextPageUrl, prevPageUrl);

        // Return the result as JSON
        res.status(200).json({
            status: true,
            "data": {
                "offerInfoData": offerInfoData[0],
                "products": {
                    "data": productData,
                    "current_page": pageNum,
                    "first_page_url": `${baseUrl}?page=1`,
                    "from": offset + 1,
                    "last_page": lastPage,
                    "last_page_url": `${baseUrl}?page=${lastPage}`,
                    "links": links,
                    "next_page_url": nextPageUrl,
                    "path": baseUrl,
                    "per_page": perPage,
                    "prev_page_url": prevPageUrl,
                    "to": Math.min(offset + perPage, total),
                    "total": total
                },
            },
            message: 'Offer Products retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching products data:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
        });
    }
});

module.exports = router;