const express = require('express');
const router = express.Router();
const db = require('../db/connection');
// get generatePaginationLinks form generatePaginationLinks.js
const generatePaginationLinks = require('./generatePaginationLinks');

// Function to fetch IDs based on slugs
// Function to fetch IDs based on slugs
const getIdsFromSlugs = async (table, slugs) => {
    // Ensure slugs is always an array and parse it if it's a stringified JSON
    slugs = typeof slugs === 'string' ? JSON.parse(slugs) : slugs;

    if (!Array.isArray(slugs) || slugs.length === 0) return [];  // If no valid slugs, return empty array

    const placeholders = slugs.map(() => '?').join(',');
    const query = `SELECT id
                   FROM ${table}
                   WHERE slug IN (${placeholders})`;

    const [result] = await db.query(query, slugs);

    // If no results found, return an empty array
    return result.length > 0 ? result.map(row => row.id) : [];
};

// Route to get filtered products with the custom query
router.post('/', async (req, res) => {
    try {
        // Parse pagination and page number from the request body
        const {
            benefit = [],
            brand = [],
            category = [],
            subcategory = [],
            child_category = [],
            color = [],
            concern = [],
            country = [],
            coverage = [],
            finish = [],
            formulation = [],
            gender = [],
            ingredient = [],
            max_min = [],
            pack_size = [],
            pageNumber = 1,
            pagination = 12,
            preference = [],
            search = '',
            size = [],
            skin_type = []
        } = req.body;

        // Convert slugs to IDs for the relevant fields
        const brandIds = await getIdsFromSlugs('brands', brand);
        const categoryIds = await getIdsFromSlugs('categories', category);
        const subcategoryIds = await getIdsFromSlugs('categories', subcategory);
        const childCategoryIds = await getIdsFromSlugs('categories', child_category);

        // page assign pageNumber
        const page = pageNumber;
        const perPage = parseInt(pagination) || 15;
        const pageNum = parseInt(page) || 1; // Default to page 1
        const offset = (pageNum - 1) * perPage;

        // 0. Get all products where there is stock
        const productStockQuery = `
            SELECT p.id
            FROM products p
                     JOIN stocks s ON p.id = s.product_id
            WHERE p.status = 1
              AND s.quantity > 0
        `;
        const [productStockData] = await db.query(productStockQuery);
        const stockIdsString = productStockData.map(row => row.id).join(',');

        // 1. Get all featured products where stock is available
        const featuredQuery = `
            SELECT p.id
            FROM products p
            WHERE p.status = 1
              AND p.is_featured = 1
              AND p.id IN (${stockIdsString})
        `;
        const [featuredData] = await db.query(featuredQuery);
        const featuredIdsString = featuredData.map(row => row.id).join(',');

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
        const mostSoldIdsString = mostSoldData.map(row => row.product_id).join(',');

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
        const otherProductIdsString = otherProductData.map(row => row.id).join(',');

        // 4. Get out-of-stock products that are not in any of the above lists
        const outOfStockProductQuery = `
            SELECT p.id
            FROM products p
            WHERE p.status = 1
              AND p.id NOT IN (${stockIdsString})    -- stockIds array
              AND p.id NOT IN (${featuredIdsString}) -- featuredProductIds array
              AND p.id NOT IN (${mostSoldIdsString}) -- getMostSoldProducts array
              AND p.id NOT IN (${otherProductIdsString}) -- otherProductIds array
        `;
        const [outOfStockProductData] = await db.query(outOfStockProductQuery);
        const outOfStockProductIdsString = outOfStockProductData.map(row => row.id).join(',');

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

        const cleanArray = (array) => {
            if (Array.isArray(array)) {
                return array.filter(item => item !== null && item !== 'null');
            }
            return []; // Return an empty array if it's not an array
        };

        const safeJsonParse = (str) => {
            try {
                return JSON.parse(str);
            } catch (e) {
                return [];  // Return an empty array if JSON is invalid
            }
        }


        // Filters mapping based on the new input format
        const filters = [
            {field: 'benefit_id', value: cleanArray(safeJsonParse(benefit))},
            {field: 'brand_id', value: cleanArray(brandIds)},
            {field: 'category_id', value: cleanArray(categoryIds)},
            {field: 'sub_category_id', value: cleanArray(subcategoryIds)},
            {field: 'sub_sub_category_id', value: cleanArray(childCategoryIds)},
            {field: 'shade_id', value: cleanArray(safeJsonParse(color))},
            {field: 'concern_id', value: cleanArray(safeJsonParse(concern))},
            {field: 'country_id', value: cleanArray(safeJsonParse(country))},
            {field: 'coverage_id', value: cleanArray(safeJsonParse(coverage))},
            {field: 'finish_id', value: cleanArray(safeJsonParse(finish))},
            {field: 'formulation_id', value: cleanArray(safeJsonParse(formulation))},
            {field: 'gender_id', value: cleanArray(safeJsonParse(gender))},
            {field: 'ingredient_id', value: cleanArray(safeJsonParse(ingredient))},
            {field: 'pack_id', value: cleanArray(safeJsonParse(pack_size))},
            {field: 'preference_id', value: cleanArray(safeJsonParse(preference))},
            {field: 'size_id', value: cleanArray(safeJsonParse(size))},
            {field: 'skin_type_id', value: cleanArray(safeJsonParse(skin_type))},
            {field: 'max_min', value: cleanArray(safeJsonParse(max_min))},

        ];

        // 1. Get the total count of matching products (no LIMIT or OFFSET here)
        let totalCountQuery = `
            SELECT COUNT(*) AS total
            FROM products p
            WHERE p.id IN (${appendIdsString})
              AND p.deleted_at IS NULL
        `;

        if (search !== null && search !== '') {
            const keywords = search.split(/\s+/); // Trim and split by whitespace
            const searchConditions = keywords.map(keyword => `p.name LIKE '%${keyword}%'`);

            const searchWhereClause = searchConditions.join(' AND ');
            productQuery += ` AND (${searchWhereClause})`;
            totalCountQuery += ` AND (${searchWhereClause})`;
        }

        // Loop through each filter and apply the conditions if the value is not empty
        filters.forEach(filter => {
            if (filter.value.length > 0) {
                // Use the `IN` clause to filter based on the provided values
                if (
                    filter.field === 'brand_id' ||
                    filter.field === 'formulation_id' ||
                    filter.field === 'country_id' ||
                    filter.field === 'coverage_id' ||
                    filter.field === 'skin_type_id'
                ) {
                    productQuery += ` AND p.${filter.field} IN (${filter.value.join(', ')})`;
                    totalCountQuery += ` AND p.${filter.field} IN (${filter.value.join(', ')})`;
                }

                // Special handling for 'finish_id'
                if (
                    filter.field === 'category_id' ||
                    filter.field === 'sub_category_id' ||
                    filter.field === 'sub_sub_category_id' ||
                    filter.field === 'shade_id' ||
                    filter.field === 'size_id' ||
                    filter.field === 'preference_id' ||
                    filter.field === 'gender_id' ||
                    filter.field === 'benefit_id' ||
                    filter.field === 'concern_id' ||
                    filter.field === 'pack_id' ||
                    filter.field === 'ingredient_id' ||
                    filter.field === 'finish_id'
                ) {
                    // Ensure filter.value is an array
                    const values = Array.isArray(filter.value) ? filter.value : [filter.value];

                    // Map each value to a JSON_CONTAINS condition
                    const conditions = values.map(value => {
                        // Ensure the value is a string and properly quoted
                        return `JSON_CONTAINS(p.${filter.field}, '"${parseInt(value)}"', '$')`;
                    });

                    // Join all conditions with ' AND ' to form the complete WHERE clause
                    const whereClause = conditions.join(' OR ');
                    // Append the WHERE clause to your queries
                    productQuery += ` AND (${whereClause})`;
                    totalCountQuery += ` AND (${whereClause})`;
                }

                if (filter.field === 'max_min') {

                    const maxMin = filter.value; // Assuming it's an array [min, max]

                    let priceCondition = '';

                    if (maxMin[1] > 1999) {
                        priceCondition = `( 
                            EXISTS (SELECT 1 FROM product_shades ps WHERE ps.product_id = p.id AND ps.shade_price > ${maxMin[0]}) 
                            OR 
                            EXISTS (SELECT 1 FROM product_sizes psz WHERE psz.product_id = p.id AND psz.size_price > ${maxMin[0]}) 
                        )`;
                    } else {
                        priceCondition = `( 
                            EXISTS (SELECT 1 FROM product_shades ps WHERE ps.product_id = p.id AND ps.discounted_price BETWEEN ${maxMin[0]} AND ${maxMin[1]}) 
                            OR 
                            EXISTS (SELECT 1 FROM product_sizes psz WHERE psz.product_id = p.id AND psz.discounted_price BETWEEN ${maxMin[0]} AND ${maxMin[1]}) 
                        )`;
                    }

                    productQuery += ` AND (${priceCondition})`;
                    totalCountQuery += ` AND (${priceCondition})`;
                }
            }
        });

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
            message: 'Products retrieved successfully.',
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
