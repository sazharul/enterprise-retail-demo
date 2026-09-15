const express = require('express');
const multer = require('multer');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const sliderRoutes = require('./routes/slider');
const getWebHome = require('./routes/webHome');
const mobileHome = require('./routes/mobileHome');
const getGeneralSetting = require('./routes/getGeneralSetting');
const brandFormat = require('./routes/brandFormat');
const topBrand = require('./routes/topBrand');
const popularBrand = require('./routes/popularBrand');
const brand = require('./routes/brand');
const color = require('./routes/color');
const getAvailableOffers = require('./routes/getAvailableOffers');
const category = require('./routes/category');
const getRewardData = require('./routes/getRewardData');
const getShippingCharge = require('./routes/getShippingCharge');
const preference = require('./routes/preference');
const formulation = require('./routes/formulation');
const finish = require('./routes/finish');
const country = require('./routes/country');
const gender = require('./routes/gender');
const coverage = require('./routes/coverage');
const skinType = require('./routes/skinType');
const benefit = require('./routes/benefit');
const concern = require('./routes/concern');
const ingredient = require('./routes/ingredient');
const packSize = require('./routes/packSize');
const product = require('./routes/product');
const offerProducts = require('./routes/offerProducts');
const productDetails = require('./routes/productDetails');

// Load environment variables
require('dotenv').config();

const app = express();

// Set up multer
const upload = multer();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests
app.use(compression()); // Enable GZIP compression for faster response
app.use(helmet()); // Secure app with HTTP headers
app.use(morgan('dev')); // Logging HTTP requests (use 'combined' for detailed logs in production)
// Middleware to handle form-data
app.use(upload.none()); // For handling form-data without files

// Routes
app.use('/api/slider', sliderRoutes);
app.use('/api/node/get-home-web', getWebHome);
app.use('/api/node/get-home-mobile', mobileHome);
app.use('/api/node/get-general-setting', getGeneralSetting);
app.use('/api/node/brand-format', brandFormat);
app.use('/api/node/top-brand', topBrand);
app.use('/api/node/popular-brand', popularBrand);
app.use('/api/node/brand', brand);
app.use('/api/node/color', color);
app.use('/api/node/get-available-offers', getAvailableOffers);
app.use('/api/node/category', category);
app.use('/api/node/getRewardData', getRewardData);
app.use('/api/node/getShippingCharge', getShippingCharge);
app.use('/api/node/preference', preference);
app.use('/api/node/formulation', formulation);
app.use('/api/node/finish', finish);
app.use('/api/node/country', country);
app.use('/api/node/gender', gender);
app.use('/api/node/coverage', coverage);
app.use('/api/node/skin-type', skinType);
app.use('/api/node/benefit', benefit);
app.use('/api/node/concern', concern);
app.use('/api/node/ingredient', ingredient);
app.use('/api/node/pack-size', packSize);
app.use('/api/node/products', product);
app.use('/api/node/products-cat', product);
app.use('/api/node/offer-products', offerProducts);
app.use('/api/node/product-detail', productDetails);

// Health check route
app.post('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
