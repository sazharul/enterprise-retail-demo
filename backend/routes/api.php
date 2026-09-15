<?php

use App\Http\Controllers\PathaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\RegisterController;

use App\Http\Controllers\API\WishlistController;


use App\Http\Controllers\API\AddToCartController;
use App\Http\Controllers\API\AttributeController;
use App\Http\Controllers\API\WareHouseController;
use App\Http\Controllers\API\HomeSectionController;
use App\Http\Controllers\API\SocialLoginController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\ComboProductController;
use App\Http\Controllers\API\CompanyPolicyController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\CouponController;
use App\Http\Controllers\API\FAQController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\OfferController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductReviewController;
use App\Http\Controllers\API\ProductAttributesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();


});
Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AddToCartController::class)->prefix('user')->group(function () {
        Route::post('/add-to-cart', 'store');
        Route::post('/update-cart/{id}', 'update');
        Route::post('/remove-form-cart/{id}', 'destroy');
    });

    Route::get('logout', [RegisterController::class, 'logout']);
    Route::post('change_password', [RegisterController::class, 'change_password']);

    Route::post('/store-token', [NotificationController::class, 'updateDeviceToken'])->name('store.token');
    Route::post('/send-notification', [NotificationController::class, 'sendNotification'])->name('send.notification');
    Route::get('/get-notification', [NotificationController::class, 'get_notification'])->name('get.notification');

});

Route::controller(RegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('otp_login', 'otp_login');
    Route::post('verify_otp', 'verify_otp');
    Route::post('forgot_password', 'forgot_password');
    Route::post('verify_email', 'verify_email');
});

Route::controller(SocialLoginController::class)->group(function () {
    Route::post('/login/facebook', 'facebookLogin');
    Route::post('/login/google', 'googleLogin');
});

Route::controller(SocialLoginController::class)->group(function () {
    Route::post('/login/facebook', 'facebookLogin');
    Route::post('/login/google', 'googleLogin');
});
Route::controller(ContactController::class)->group(function () {
    Route::post('/contact-store', 'store');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('get-review', [ProductReviewController::class, 'getReview']);
    Route::post('get-review-all-images', [ProductReviewController::class, 'getReviewAllImages']);
    Route::post('product-review', [ProductReviewController::class, 'storeReview']);
    Route::post('store-review-helpful', [ProductReviewController::class, 'storeReviewHelpful']);

});

// Route::resource('brands', AttributeController::class);

Route::controller(AttributeController::class)->group(function () {
    Route::get('brand', 'brand');
    Route::get('category', 'category');
    Route::get('preference', 'preference');
    Route::get('formulation', 'formulation');
    Route::get('finish', 'finish');
    Route::get('country', 'country');
    Route::get('gender', 'gender');

});

Route::controller(ProductController::class)->group(function () {
    Route::post('/products', 'index')->name('index');
    Route::get('/product-detail/{id:id}', 'show')->name('show');

    Route::post('/trending-search', 'trendingSearch');
    Route::post('/products-name', 'search_name')->name('search.name');
    Route::post('/products-cat', 'search_cat')->name('search.cat');
    Route::post('/offer-check-shade-size-wise', 'checkOffersShadeSizeWise');
});
Route::controller(ComboProductController::class)->group(function () {
    Route::get('/offers', 'offerList');
    Route::post('/combo-products', 'index');
    Route::get('/combo-product-detail/{id}', 'show');
});

Route::controller(OfferController::class)->group(function () {
    Route::get('/offers', 'offerList');
    Route::post('/offer-products', 'index');
});

Route::get('coverage', [AttributeController::class, 'coverage']);
Route::get('skin-type', [AttributeController::class, 'skin']);
Route::get('benefit', [AttributeController::class, 'benefit']);
Route::get('concern', [AttributeController::class, 'concern']);
Route::get('ingredient', [AttributeController::class, 'ingredient']);
Route::get('pack-size', [AttributeController::class, 'pack']);
Route::get('/blogs', [BlogController::class, 'allPosts']);
Route::get('/blogs/{id}', [BlogController::class, 'showPost']);


Route::controller(CompanyPolicyController::class)->group(function () {
    Route::get('whoweare', 'whoweare');
    Route::get('termcondition', 'termcondition');
    Route::get('privacypolicy', 'privacypolicy');
    Route::get('delationpolicy', 'delationpolicy');
    Route::get('cancellationpolicy', 'cancellationpolicy');
    Route::get('returnrefund', 'returnrefund');
});

Route::post('/coupon', [CouponController::class, 'coupon'])->name('coupon.details');
Route::get('faqs', [FAQController::class, 'get_faq']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/wishlist', [WishlistController::class, 'addToWishlist'])->name('wishlist.add');
    Route::get('/getwishlist', [WishlistController::class, 'get_wishlist'])->name('wishlist.get');
    Route::post('/blogs/{id}/add-comment', [BlogController::class, 'addcomment']);

    Route::controller(ProfileController::class)->group(function () {
        Route::get('profile', 'profile_info');
        Route::post('edit', 'edit');
        Route::post('edit_pass', 'edit_pass');
        Route::get('reward-history', 'rewardHistory');
    });

    Route::controller(AddressController::class)->group(function () {
        Route::get('district', 'district');
        Route::get('city', 'city');
        Route::get('get_address', 'get_address');
        Route::post('add_address', 'add_address');
        Route::post('edit_address/{id}', 'edit_address');
        Route::delete('delete_address/{id}', 'delete_address');

    });


    Route::controller(ProductAttributesController::class)->group(function () {
        Route::get('product/unit', 'size');
        Route::get('product/color', 'color');
        Route::get('product/shade', 'shade');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::post('/order-store', 'orderStore');
        Route::post('/order-destroy/{id:id}', 'destroy');
        Route::get('/order-details/{id:id}', 'details');
    });

    Route::controller(AddToCartController::class)->prefix('user')->group(function () {
        Route::get('/add-to-cart/list', 'index');
        Route::post('/add-to-cart', 'store');
        Route::post('/update-cart/{id}', 'update');
        Route::post('/remove-form-cart/{id}', 'destroy');
    });

    Route::controller(MessageController::class)->group(function () {
        Route::get('get-message', 'get_message');
        Route::post('send-message', 'store');
        Route::get('read-message', 'read_message');
    });

});


Route::controller(CompanyPolicyController::class)->group(function () {
    Route::get('whoweare', 'whoweare');
    Route::get('termcondition', 'termcondition');
    Route::get('privacypolicy', 'privacypolicy');
    Route::get('delationpolicy', 'delationpolicy');
    Route::get('cancellationpolicy', 'cancellationpolicy');

});

Route::controller(ProductAttributesController::class)->group(function () {
    Route::get('product/unit', 'size');
    Route::get('product/color', 'color');
    Route::get('product/shade', 'shade');

});


Route::get('get-outlet', [WareHouseController::class, 'getoutlet']);
Route::get('get-home-web', [HomeSectionController::class, 'get_web']);
Route::get('get-home-mobile', [HomeSectionController::class, 'get_mobile']);


Route::get('/get-city-list', [PathaoController::class, 'get_city_list'])->name('get_city_list');
Route::get('/get-zone-list/{city_id}', [PathaoController::class, 'get_zone_list'])->name('get_zone_list');
Route::get('/get-area-list/{zone_id}', [PathaoController::class, 'get_area_list'])->name('get_area_list');
