<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Backend\FAQController;
use App\Http\Controllers\Backend\PosController;
use App\Http\Controllers\Backend\BlogController;
use App\Http\Controllers\Backend\CityController;
use App\Http\Controllers\Backend\PackController;
use App\Http\Controllers\Backend\RoleController;
use App\Http\Controllers\Backend\SizeController;
use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\ColorController;
use App\Http\Controllers\Backend\OrderController;
use App\Http\Controllers\Backend\ShadeController;
use App\Http\Controllers\Backend\StaffController;
use App\Http\Controllers\Backend\CouponController;
use App\Http\Controllers\Backend\FinishController;
use App\Http\Controllers\Backend\GenderController;
use App\Http\Controllers\Backend\BenefitController;
use App\Http\Controllers\Backend\CommentController;
use App\Http\Controllers\Backend\ConcernController;
use App\Http\Controllers\Backend\CountryController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\CoverageController;
use App\Http\Controllers\Backend\DistrictController;
use App\Http\Controllers\Backend\PurchaseController;
use App\Http\Controllers\Backend\SkinTypeController;
use App\Http\Controllers\Backend\WhoWeAreController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\WareHouseController;
use App\Http\Controllers\Backend\IngredientController;
use App\Http\Controllers\Backend\PreferenceController;
use App\Http\Controllers\Backend\SectionOneController;
use App\Http\Controllers\Backend\SectionTenController;
use App\Http\Controllers\Backend\SectionTwoController;
use App\Http\Controllers\Backend\FormulationController;
use App\Http\Controllers\Backend\HomeSectionController;
use App\Http\Controllers\Backend\Offer\ComboOfferController;
use App\Http\Controllers\Backend\Offer\ComboProductController;
use App\Http\Controllers\Backend\Offer\OfferController;
use App\Http\Controllers\Backend\SectionFiveController;
use App\Http\Controllers\Backend\SectionFourController;
use App\Http\Controllers\Backend\SectionNineController;
use App\Http\Controllers\Backend\SectionEightController;
use App\Http\Controllers\Backend\SectionSevenController;
use App\Http\Controllers\Backend\SectionThreeController;
use App\Http\Controllers\Backend\PrivacyPolicyController;
use App\Http\Controllers\Backend\SectionElevenController;
use App\Http\Controllers\Backend\SectionTwelveController;
use \App\Http\Controllers\Backend\ProductReviewController;
use App\Http\Controllers\Backend\DeletionPolicyController;
use App\Http\Controllers\Backend\Offer\UptoSaleController;
use App\Http\Controllers\Backend\SectionSixteenController;
use App\Http\Controllers\Backend\Auth\AdminLoginController;
use App\Http\Controllers\Backend\ReturnAndRefundController;
use App\Http\Controllers\Backend\SectionFourteenController;
use App\Http\Controllers\Backend\SectionThirteenController;
use \App\Http\Controllers\Backend\ProductBulkEditController;
use App\Http\Controllers\Backend\SectionSeventeenController;
use App\Http\Controllers\Backend\TermAndConditionController;
use App\Http\Controllers\Backend\CancellationPolicyController;
use App\Http\Controllers\Backend\MessageController;
use App\Http\Controllers\Backend\SectionEighteenController;
use App\Http\Controllers\Backend\RewardSetupController;
use App\Http\Controllers\Backend\SectionNineteenController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

// Auth::routes();
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Frontend Routes

// Rating and review controller
Route::get('product-review/all-pending-review', [ProductReviewController::class, 'pendingReview'])->name('product-review.pending');
Route::get('product-review/all-approve-review', [ProductReviewController::class, 'approveReview'])->name('product-review.approve-review');
Route::get('product-review/all-cancel-review', [ProductReviewController::class, 'cancelReview'])->name('product-review.cancel-review');

Route::resource('product-review', ProductReviewController::class);
Route::get('product-review/{id}/approve', [ProductReviewController::class, 'approve'])->name('product-review.approve');
Route::get('product-review/{id}/cancel', [ProductReviewController::class, 'cancel'])->name('product-review.cancel');

// Admin routes
Route::get('/', [AdminLoginController::class, 'showLoginForm'])->name('admin.login_form');
Route::post('/', [AdminLoginController::class, 'login'])->name('admin.login');

// Route::get('/notification', [HomeController::class, 'notification'])->name('notification');



Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::post('/logout', [AdminLoginController::class, 'logout'])->name('logout');
    Route::resource('brand', BrandController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('preference', PreferenceController::class);
    Route::resource('finish', FinishController::class);
    Route::resource('country', CountryController::class);
    Route::resource('gender', GenderController::class);
    Route::resource('formulation', FormulationController::class);
    Route::resource('coverage', CoverageController::class);
    Route::resource('skin', SkinTypeController::class);
    Route::resource('benefit', BenefitController::class);
    Route::resource('concern', ConcernController::class);
    Route::resource('ingredient', IngredientController::class);
    Route::resource('pack', PackController::class);
    Route::resource('district', DistrictController::class);
    Route::resource('city', CityController::class);
    Route::resource('color', ColorController::class);
    Route::resource('shade', ShadeController::class);
    Route::resource('size', SizeController::class);
    Route::resource('blog', BlogController::class);
    Route::resource('comment', CommentController::class);
    Route::resource('faq', FAQController::class);

    Route::resource('coupon', CouponController::class);

    Route::controller(ProductBulkEditController::class)->group(function () {
        Route::get('product-bulk-edit', 'productBulkEdit')->name('product-bulk.edit');
        Route::post('/update-price/{id}', 'updatePrice')->name('product-bulk.update');
        Route::get('/get-sizes/{product}', 'getSizes');
        Route::get('/get-colors/{product}', 'getColors');
        Route::get('/get-shades/{color}', 'getShades');
        Route::get('/get-table-content', 'getTableContent')->name('gettable');
    });

    Route::controller(WhoWeAreController::class)->prefix('whoweare/')->group(function () {

        Route::get('index', 'index')->name('whoweare.index');
        Route::get('{id}/edit', 'edit')->name('whoweare.edit');
        Route::patch('{id}', 'update')->name('whoweare.update');
    });

    Route::controller(TermAndConditionController::class)->prefix('termcondition/')->group(function () {

        Route::get('index', 'index')->name('termcondition.index');
        Route::get('{id}/edit', 'edit')->name('termcondition.edit');
        Route::patch('{id}', 'update')->name('termcondition.update');
    });

    Route::controller(PrivacyPolicyController::class)->prefix('privacypolicy/')->group(function () {

        Route::get('index', 'index')->name('privacypolicy.index');
        Route::get('{id}/edit', 'edit')->name('privacypolicy.edit');
        Route::patch('{id}', 'update')->name('privacypolicy.update');
    });

    Route::controller(DeletionPolicyController::class)->prefix('deletionpolicy/')->group(function () {

        Route::get('index', 'index')->name('deletionpolicy.index');
        Route::get('{id}/edit', 'edit')->name('deletionpolicy.edit');
        Route::patch('{id}', 'update')->name('deletionpolicy.update');
    });

    Route::controller(CancellationPolicyController::class)->prefix('cancellationpolicy/')->group(function () {

        Route::get('index', 'index')->name('cancellationpolicy.index');
        Route::get('{id}/edit', 'edit')->name('cancellationpolicy.edit');
        Route::patch('{id}', 'update')->name('cancellationpolicy.update');
    });

    Route::controller(ReturnAndRefundController::class)->prefix('returnrefund/')->group(function () {

        Route::get('index', 'index')->name('returnrefund.index');
        Route::get('{id}/edit', 'edit')->name('returnrefund.edit');
        Route::patch('{id}', 'update')->name('returnrefund.update');
    });

    Route::name('role.')->prefix('role')->controller(RoleController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id:id}', 'edit')->name('edit');
        Route::post('/update/{id:id}', 'update')->name('update');
        Route::delete('/destroy/{id:id}', 'destroy')->name('destroy');
    });

    Route::name('staff.')->prefix('staff')->controller(StaffController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id:id}', 'edit')->name('edit');
        Route::post('/update/{id:id}', 'update')->name('update');
        Route::delete('/destroy/{id:id}', 'destroy')->name('destroy');
    });

    Route::name('product.')->prefix('product')->controller(ProductController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id:id}', 'edit')->name('edit');
        Route::post('/update/{id:id}', 'update')->name('update');
        Route::delete('/destroy/{id:id}', 'destroy')->name('destroy');
        Route::post('/delete-shade-image', 'deleteShadeImage')->name('delete_shade_image');
        Route::post('/delete-size-image', 'deleteSizeImage')->name('delete_size_image');

        Route::get('/get-products', 'getProducts')->name('get_products');
        Route::get('/get-product-by-id', 'getProductsByID')->name('get_products_by_id');
        Route::get('/size-shade-wise-price', 'sizeShadeWisePrice')->name('size_shade_wise_price');
        Route::get('/multiple-variant-wise-price', 'multipleVariantWisePrice')->name('multiple_variant_wise_price');
    });

    Route::name('warehouse.')->prefix('warehouse')->controller(WareHouseController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id:id}', 'edit')->name('edit');
        Route::post('/update/{id:id}', 'update')->name('update');
        Route::delete('/destroy/{id:id}', 'destroy')->name('destroy');
    });

    Route::name('purchase.')->prefix('purchase')->controller(PurchaseController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id:id}', 'edit')->name('edit');
        Route::post('/update/{id:id}', 'update')->name('update');
        Route::delete('/destroy/{id:id}', 'destroy')->name('destroy');
        Route::post('/delete-purchase-document', 'deletePurchaseDocument')->name('delete_purchase_document');
    });

    Route::prefix('offer')->group(function () {
        Route::resource('offer', OfferController::class);

        Route::name('combo_product.')->prefix('combo-product')->controller(ComboProductController::class)->group(function () {
            Route::get('/list', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
        });
        Route::name('combo_offer.')->prefix('combo-offer')->controller(ComboOfferController::class)->group(function () {
            Route::get('/list', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
            Route::get('/edit/{id}', 'edit')->name('edit');
            Route::post('/update/{id}', 'update')->name('update');
        });
        Route::resource('uptosale', UptoSaleController::class)->only([
            'index', 'create', 'store', 'edit', 'destroy',
        ]);
        Route::post('uptosale/update', [UptoSaleController::class,'update'])->name('uptosale.update');
    });
    Route::prefix('Homepage')->group(function () {
        Route::resource('home_section', HomeSectionController::class)->only([
            'index','edit', 'update']);
        Route::resource('section_one', SectionOneController::class);
        Route::resource('section_two', SectionTwoController::class);
        Route::resource('section_three', SectionThreeController::class);
        Route::resource('section_four', SectionFourController::class);
        Route::resource('section_five', SectionFiveController::class);
        // Route::resource('section_six', SectionTwoController::class);
        // Route::get('/section_six', function () {
        //     return view('section_six.index');
        // })->name('section_six.index');
        Route::resource('section_seven', SectionSevenController::class);
        Route::resource('section_eight', SectionEightController::class);
        Route::resource('section_nine', SectionNineController::class);
        Route::resource('section_ten', SectionTenController::class);
        Route::resource('section_eleven', SectionElevenController::class);
        Route::resource('section_twelve', SectionTwelveController::class);
        Route::resource('section_thirteen', SectionThirteenController::class);
        Route::resource('section_fourteen', SectionFourteenController::class);
        Route::resource('section_sixteen', SectionSixteenController::class);
        Route::resource('section_seventeen', SectionSeventeenController::class);
        Route::resource('section_eighteen', SectionEighteenController::class);
        Route::name('section_nineteen.')->controller(SectionNineteenController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('{id}/edit', 'edit')->name('edit');
            Route::patch('{id}', 'update')->name('update');
        });


    });

    Route::name('pos.')->prefix('pos')->controller(PosController::class)->group(function () {
        Route::get('/points-of-sales', 'index')->name('point_of_sales');
        Route::get('/search', 'search')->name('search');
        Route::get('/filter-products', 'filterProducts')->name('filter_products');
        Route::get('/size-wise-price', 'sizeWisePriceStock')->name('size_wise_price_stock');
        Route::get('/shade-wise-price', 'shadeWisePriceStock')->name('shade_wise_price_stock');
        Route::post('/store', 'store')->name('store');
    });

    Route::name('setting.')->prefix('setting')->group(function () {
        Route::name('reward.')->controller(RewardSetupController::class)->group(function () {
            Route::get('/reward', 'index')->name('index');
            Route::post('/store', 'store')->name('store');
        });
    });

    Route::name('order.')->prefix('order')->controller(OrderController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
    });

    Route::name('message.')->prefix('message')->controller(MessageController::class)->group(function () {
        Route::get('/list', 'index')->name('index');
        Route::get('/search','search')->name('search');
        Route::get('/profile/{id}','profile')->name('profile');
        Route::post('/store', 'store')->name('store');
    });

    //For Ajax requests
    Route::get('/get-color-list', [ColorController::class, 'getColorList'])->name('get_color_list');
    Route::get('/get-color-by-id', [ColorController::class, 'getColorByID'])->name('get_color_by_id');
    Route::get('/get-sub-category-list', [CategoryController::class, 'getSubCategory'])->name('get_sub_category');
    Route::get('/get-sub-sub-category-list', [CategoryController::class, 'getSubSubCategory'])->name('get_sub_sub_category');

});