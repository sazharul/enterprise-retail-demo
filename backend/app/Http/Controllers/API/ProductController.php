<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Benefit;
use App\Models\ComboProduct;
use App\Models\ComboProductDetail;
use App\Models\ComboProductInfo;
use App\Models\Concern;
use App\Models\Finish;
use App\Models\Gender;
use App\Models\Ingredient;
use App\Models\Offer;
use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use App\Models\Pack;
use App\Models\Preference;
use App\Models\Product;
use App\Models\ProductViewHistory;
use App\Models\Shade;
use App\Models\Size;
use App\Models\Stock;
use App\Models\TrendingSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;

class ProductController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int)$request->pagination ?? 15;
        $keyword = $request->search;
        $category = json_decode($request->category);
        $subcategory = json_decode($request->subcategory);
        $child_category = json_decode($request->child_category);
        $brand = json_decode($request->brand);

        $colors = json_decode($request->color) ?? [];
        $colors = array_map('strval', $colors);

        $sizes = json_decode($request->size) ?? [];
        $sizes = array_map('strval', $sizes);

        $preferences = json_decode($request->preference) ?? [];
        $preferences = array_map('strval', $preferences);

        $finishes = json_decode($request->finish) ?? [];
        $finishes = array_map('strval', $finishes);

        $genders = json_decode($request->gender) ?? [];
        $genders = array_map('strval', $genders);

        $ingredients = json_decode($request->ingredient) ?? [];
        $ingredients = array_map('strval', $ingredients);

        $benefits = json_decode($request->benefit) ?? [];
        $benefits = array_map('strval', $benefits);

        $concerns = json_decode($request->concern) ?? [];
        $concerns = array_map('strval', $concerns);

        $packSizes = json_decode($request->pack_size) ?? [];
        $packSizes = array_map('strval', $packSizes);

        $formulation = json_decode($request->formulation);
        $country = json_decode($request->country);
        $skinType = json_decode($request->skin_type);
        $coverage = json_decode($request->coverage);
        $averageRating = (int)$request->average_rating;

        $max_min = json_decode($request->max_min);
        $sort_by_name = $request->sort_by_name ?? 'asc';
        $sort_by_price = $request->sort_by_price ?? 'asc';

        if ($sort_by_name === 'asc' || $sort_by_name === 'desc') {
            $orderByField = 'name';
            $orderByDirection = $sort_by_name;
        } elseif ($sort_by_price === 'asc' || $sort_by_price === 'desc') {
            $orderByField = 'price';
            $orderByDirection = $sort_by_price;
        } else {
            $orderByField = 'created_at';
            $orderByDirection = 'asc';
        }
        // $products = Product::orderBy($orderByField, $orderByDirection)
        // ->paginate($perPage);


        $products = Product::with(['productShades.productShadeImages','productSizes.productSizeImages','reviews'])
            ->where('status', 1)
            ->when($keyword, function ($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%');
            })
            ->when($category, fn($query) => $query->whereIn('category_id', $category))
            ->when($subcategory, fn($query) => $query->whereIn('sub_category_id', $subcategory))
            ->when($child_category, fn($query) => $query->whereIn('sub_sub_category_id', $child_category))
            ->when($brand, fn($query) => $query->whereIn('brand_id', $brand))
            ->when($formulation, fn($query) => $query->whereIn('formulation_id', $formulation))
            ->when($country, fn($query) => $query->whereIn('country_id', $country))
            ->when($skinType, fn($query) => $query->whereIn('skin_type_id', $skinType))
            ->when($coverage, fn($query) => $query->whereIn('coverage_id', $coverage))
            ->when($max_min, fn($query) => $query->whereBetween('price', $max_min))


            ->where(function ($query) use ($colors, $sizes, $preferences, $finishes, $genders, $benefits, $concerns, $packSizes, $ingredients) {
                $query->where(function ($query) use ($colors) {
                    foreach ($colors as $color) {
                        $query->orWhereJsonContains('shade_id', $color);
                    }
                });
                $query->where(function ($query) use ($sizes) {
                    foreach ($sizes as $size) {
                        $query->orWhereJsonContains('size_id', $size);
                    }
                });
                $query->where(function ($query) use ($preferences) {
                    foreach ($preferences as $preference) {
                        $query->orWhereJsonContains('preference_id', $preference);
                    }
                });
                $query->where(function ($query) use ($finishes) {
                    foreach ($finishes as $finish) {
                        $query->orWhereJsonContains('finish_id', $finish);
                    }
                });
                $query->where(function ($query) use ($genders) {
                    foreach ($genders as $gender) {
                        $query->orWhereJsonContains('gender_id', $gender);
                    }
                });
                $query->where(function ($query) use ($benefits) {
                    foreach ($benefits as $benefit) {
                        $query->orWhereJsonContains('benefit_id', $benefit);
                    }
                });
                $query->where(function ($query) use ($concerns) {
                    foreach ($concerns as $concern) {
                        $query->orWhereJsonContains('concern_id', $concern);
                    }
                });
                $query->where(function ($query) use ($packSizes) {
                    foreach ($packSizes as $packSize) {
                        $query->orWhereJsonContains('pack_id', $packSize);
                    }
                });
                $query->where(function ($query) use ($ingredients) {
                    foreach ($ingredients as $ingredient) {
                        $query->orWhereJsonContains('ingredient_id', $ingredient);
                    }
                });

            })
            ->withCount('reviews')
            ->withAvg('reviews', 'star')
            // ->having('reviews_avg_star', '>', $averageRating)
            ->orderBy($orderByField, $orderByDirection)
            ->paginate($perPage);


        if ($averageRating) {
            $products = $products->filter(function ($product) use ($averageRating) {
                return $product->reviews_count > 0 && $product->reviews_avg_star >= $averageRating;
            });
        }

        $starCounts = [
            '4 Stars & Above' => $products->where('reviews_avg_star', '>=', 4)->count(),
            '3 Stars & Above' => $products->where('reviews_avg_star', '>=', 3)->count(),
            '2 Stars & Above' => $products->where('reviews_avg_star', '>=', 2)->count(),
            '1 Star & Above' => $products->where('reviews_avg_star', '>=', 1)->count(),
        ];

        foreach ($products as $key => $product) {
            $shades = [];
            $sizes = [];
            $totalStock = 0;

            if (!empty($product->productShades)) {
                foreach ($product->productShades as $productShade) {
                    $shades[] = $productShade->shade;
                    $shades[] = $productShade->productShadeImages;

                    $stockQuantity = Stock::where('product_id', $productShade->product_id)
                        ->where('shade_id', $productShade->shade_id)
                        ->value('quantity');

                    $productShade->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
                }
            }
            if (!empty($product->productSizes)) {
                foreach ($product->productSizes as $productSize) {
                    $sizes[] = $productSize->size;
                    $sizes[] = $productSize->productSizeImages;

                    $stockQuantity = Stock::where('product_id', $productSize->product_id)
                        ->where('size_id', $productSize->size_id)
                        ->value('quantity');

                    $productSize->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
                }
            }

            $offersInfo = $this->checkOffers($product->id);
            $product->setAttribute('offers_count', $offersInfo['count']);
            $product->setAttribute('offers_names', $offersInfo['names']);


            $product->setAttribute('all_shades_count', count($shades));
            $product->setAttribute('all_sizes_count', count($sizes));
            $product->setAttribute('total_stock', $totalStock);
        }
        return $this->sendResponse(['products' => $products, 'starCounts' => $starCounts], 'Products retrieved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        // $section_six = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->withCount('order_details')->where('status', 1)->orderByDesc('order_details_count')->withCount('reviews')
        //     ->withAvg('reviews', 'star')
        //     ->take($product_count)
        //     ->get();

        $product = Product::with(['productShades.productShadeImages', 'productSizes',
        'reviews' => function ($query) {
            $query->with(['reviewHelpful', 'shade', 'size'])
                  ->withCount('reviewHelpful')
                  ->orderByDesc('review_helpful_count');
        },
        'brand' => function ($query) {
            $query->select('id', 'name');
        },
        'category' => function ($query) {
            $query->select('id', 'name');
        },
        'subCategory' => function ($query) {
            $query->select('id', 'name');
        },
        'subSubCategory' => function ($query) {
            $query->select('id', 'name');
        },
        'formulation' => function ($query) {
            $query->select('id', 'name');
        },
        'country' => function ($query) {
            $query->select('id', 'name');
        },
        'coverage' => function ($query) {
            $query->select('id', 'name');
        },
        'skin_type' => function ($query) {
            $query->select('id', 'name');
        },
        ])
        ->withCount('reviews')
        ->withAvg('reviews', 'star')
        ->find($id);

        if (!$product) {
            return $this->sendError('Product not found.', [], 404);
        }

        // Increment view count
        $userId = Auth::id() ? Auth::id() : null;
        if ($product) {
            // Find existing record or create a new one
            $viewHistory = ProductViewHistory::firstOrNew([
                'user_id' => $userId,
                'product_id' => $product->id,
                'category_id' => $product->category_id,
            ]);

            // Increment view count
            $viewHistory->view_count++;
            $viewHistory->save();
        }


         // Retrieve products that were also viewed by other customers in the same category
        if ($product !== null) {
            $customerAlsoViewed = Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id) // Exclude the current product
                ->whereIn('id', function ($query) {
                    $query->select('product_id')
                        ->from('product_view_histories')
                        ->groupBy('product_id')
                        ->orderByRaw('COUNT(*) DESC');
                })
                ->take(20)
                ->get();
        } 


        $preferences = $product->preferences ? Preference::whereIn('id', $product->preferences->pluck('id'))->get() : [];
        $product->setAttribute('preferences', $preferences);

        $finishes = $product->finishes ? Finish::whereIn('id', $product->finishes->pluck('id'))->get() : [];
        $product->setAttribute('finishes', $finishes);

        $genders = $product->genders ? Gender::whereIn('id', $product->genders->pluck('id'))->get() : [];
        $product->setAttribute('genders', $genders);

        $ingredients = $product->ingredients ? Ingredient::whereIn('id', $product->ingredients->pluck('id'))->get() : [];
        $product->setAttribute('ingredients', $ingredients);

        $benefits = $product->benefits ? Benefit::whereIn('id', $product->benefits->pluck('id'))->get() : [];
        $product->setAttribute('benefits', $benefits);

        $concerns = $product->concerns ? Concern::whereIn('id', $product->concerns->pluck('id'))->get() : [];
        $product->setAttribute('concerns', $concerns);

        $packs = $product->packs ? Pack::whereIn('id', $product->packs->pluck('id'))->get() : [];
        $product->setAttribute('packs', $packs);


        $perPage = $request->review_pagination ?? 15;
        $reviews = $product->reviews()->latest()->paginate($perPage);

        $shades = [];
        $sizes = [];
        $totalStock = 0;

        //check empty
        if (!empty($product->productShades)) {
            foreach ($product->productShades as $productShade) {
                $shades[] = $productShade->shade;
                $shades[] = $productShade->productShadeImages;
                $stockQuantity = Stock::where('product_id', $productShade->product_id)
                        ->where('shade_id', $productShade->shade_id)
                        ->value('quantity');

                    $productShade->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
            }
        }
        if (!empty($product->productSizes)) {
            foreach ($product->productSizes as $productSize) {
                $sizes[] = $productSize->size;
                $sizes[] = $productSize->productSizeImages;
                $stockQuantity = Stock::where('product_id', $productSize->product_id)
                        ->where('size_id', $productSize->size_id)
                        ->value('quantity');

                    $productSize->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
            }
        }

        $offersInfo = $this->checkOffers($product->id);
        $product->setAttribute('offers_count', $offersInfo['count']);
        $product->setAttribute('offers_names', $offersInfo['names']);

        $product->setAttribute('all_shades_count', count($shades));
        $product->setAttribute('all_sizes_count', count($sizes));
        $product->setAttribute('total_stock', $totalStock);

        $data = [
            'product' => $product,
            'reviews' => $reviews ?? null,
            'customer_also_viewed' => $customerAlsoViewed ?? null,
        ];
        return $this->sendResponse($data, 'Product detail retrieved successfully.');
    }

    public function trendingSearch(Request $request){
        $perPage = (int)$request->pagination ?? 15;
        $trendingSearches = TrendingSearch::with('user')->orderBy('count', 'desc')->paginate($perPage);
        return $this->sendResponse($trendingSearches, 'Trending searches retrieved successfully.');
    }

    public function search_name(Request $request)
    {
        $perPage = (int)$request->pagination ?? 15;
        $keyword = $request->search;

        //Keyword store for trending search in Trending Table
        $ip = request()->ip();
        // $location = Location::get($ip);
        // $countryName =  $location->countryName ?? null;
        // $deviceName = Location::device()->get($ip);
        // $deviceType = $deviceName->type;
        // $browserName = Location::browser()->get($ip);
        // $browserType = $browserName->type;

        // dd($countryName);
        $keyword_store = TrendingSearch::where('keyword', $keyword)->first();
        if ($keyword_store) {
            $keyword_store->increment('count');
        }else {
            $trending_search = new TrendingSearch();
            $trending_search->user_id = auth()->user()->id ?? null;
            $trending_search->keyword = $keyword;
            $trending_search->ip_address = $ip;
            $trending_search->country = $countryName ?? null;
            $trending_search->device = $deviceName ?? null;
            $trending_search->count = 1;
            $trending_search->save();
        }

        $sort_by_name = $request->sort_by_name ?? '';
        $sort_by_price = $request->sort_by_price ?? '';

        if ($sort_by_name === 'asc' || $sort_by_name === 'desc') {
            $orderByField = 'name';
            $orderByDirection = $sort_by_name;
        } elseif ($sort_by_price === 'asc' || $sort_by_price === 'desc') {
            $orderByField = 'price';
            $orderByDirection = $sort_by_price;
        } else {
            $orderByField = 'created_at';
            $orderByDirection = 'asc';
        }

        $products = Product::with(['productShades.productShadeImages', 'productSizes', 'reviews'])->where('status', 1)
            ->when($keyword, function ($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%');
            })
            ->withCount('reviews')
            ->withAvg('reviews', 'star')
            // ->having('reviews_avg_star', '>', $averageRating)
            ->orderBy($orderByField, $orderByDirection)
            ->paginate($perPage);


            

        $starCounts = [
            '4 Stars & Above' => $products->where('reviews_avg_star', '>=', 4)->count(),
            '3 Stars & Above' => $products->where('reviews_avg_star', '>=', 3)->count(),
            '2 Stars & Above' => $products->where('reviews_avg_star', '>=', 2)->count(),
            '1 Star & Above' => $products->where('reviews_avg_star', '>=', 1)->count(),
        ];

        foreach ($products as $key => $product) {
            $shades = [];
            $sizes = [];
            $totalStock = 0;

           if (!empty($product->productShades)) {
                foreach ($product->productShades as $productShade) {
                    $shades[] = $productShade->shade;
                    $shades[] = $productShade->productShadeImages;

                    $stockQuantity = Stock::where('product_id', $productShade->product_id)
                        ->where('shade_id', $productShade->shade_id)
                        ->value('quantity');

                    $productShade->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;

                }
            }
            if (!empty($product->productSizes)) {
                foreach ($product->productSizes as $productSize) {
                    $sizes[] = $productSize->size;
                    $sizes[] = $productSize->productSizeImages;
                    $stockQuantity = Stock::where('product_id', $productSize->product_id)
                        ->where('size_id', $productSize->size_id)
                        ->value('quantity');

                    $productSize->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
                }
            }

            $offersInfo = $this->checkOffers($product->id);
            $product->setAttribute('offers_count', $offersInfo['count']);
            $product->setAttribute('offers_names', $offersInfo['names']);
            $product->setAttribute('all_shades_count', count($shades));
            $product->setAttribute('all_sizes_count', count($sizes));

        }
        return $this->sendResponse(['products' => $products, 'starCounts' => $starCounts], 'Products retrieved successfully.');
    }

    public function search_cat(Request $request)
    {
        $perPage = (int)$request->pagination ?? 15;
        // $keyword = $request->search;
        $category = json_decode($request->category);
        $subcategory = json_decode($request->subcategory);
        $child_category = json_decode($request->child_category);
        $brand = json_decode($request->brand);


        $sort_by_name = $request->sort_by_name ?? 'asc';
        $sort_by_price = $request->sort_by_price ?? 'asc';

        if ($sort_by_name === 'asc' || $sort_by_name === 'desc') {
            $orderByField = 'name';
            $orderByDirection = $sort_by_name;
        } elseif ($sort_by_price === 'asc' || $sort_by_price === 'desc') {
            $orderByField = 'price';
            $orderByDirection = $sort_by_price;
        } else {
            $orderByField = 'created_at';
            $orderByDirection = 'asc';
        }

        $products = Product::with(['productShades.productShadeImages', 'productSizes', 'reviews'])->where('status', 1)
            ->when($category, fn($query) => $query->whereIn('category_id', $category))
            ->when($subcategory, fn($query) => $query->whereIn('sub_category_id', $subcategory))
            ->when($child_category, fn($query) => $query->whereIn('sub_sub_category_id', $child_category))
            ->when($brand, fn($query) => $query->whereIn('brand_id', $brand))
            ->withCount('reviews')
            ->withAvg('reviews', 'star')
            // ->having('reviews_avg_star', '>', $averageRating)
            ->orderBy($orderByField, $orderByDirection)
            ->paginate($perPage);


        $starCounts = [
            '4 Stars & Above' => $products->where('reviews_avg_star', '>=', 4)->count(),
            '3 Stars & Above' => $products->where('reviews_avg_star', '>=', 3)->count(),
            '2 Stars & Above' => $products->where('reviews_avg_star', '>=', 2)->count(),
            '1 Star & Above' => $products->where('reviews_avg_star', '>=', 1)->count(),
        ];

        foreach ($products as $key => $product) {
            $shades = [];
            $sizes = [];
            $totalStock = 0;

            
            if (!empty($product->productShades)) {
                foreach ($product->productShades as $productShade) {
                    $shades[] = $productShade->shade;
                    $shades[] = $productShade->productShadeImages;
                    $stockQuantity = Stock::where('product_id', $productShade->product_id)
                        ->where('shade_id', $productShade->shade_id)
                        ->value('quantity');

                    $productShade->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
                }
            }
            if (!empty($product->productSizes)) {
                foreach ($product->productSizes as $productSize) {
                    $sizes[] = $productSize->size;
                    $sizes[] = $productSize->productSizeImages;
                    $stockQuantity = Stock::where('product_id', $productSize->product_id)
                        ->where('size_id', $productSize->size_id)
                        ->value('quantity');

                    $productSize->setAttribute('stock', $stockQuantity);
                    $totalStock += $stockQuantity;
                }
            }

            $offersInfo = $this->checkOffers($product->id);
            $product->setAttribute('offers_count', $offersInfo['count']);
            $product->setAttribute('offers_names', $offersInfo['names']);
            $product->setAttribute('all_shades_count', count($shades));
            $product->setAttribute('all_sizes_count', count($sizes));

        }
        return $this->sendResponse(['products' => $products, 'starCounts' => $starCounts], 'Products retrieved successfully.');
    }

    // public function checkOffersShadeSizeWise(Request $request)
    // {
    //     $product_id = $request->product_id;
    //     $shade_id = $request->shade_id;
    //     $size_id = $request->size_id;

    //     $currentDate = now();
    //     $offers = [];


    //     $offersUpToSaleQuery = OfferUpToSale::with(['offer'])
    //         ->where('product_id', $product_id);

    //     if ($shade_id !== null) {
    //         $offersUpToSaleQuery->whereHas('productShades', function ($query) use ($shade_id) {
    //             $query->where('shade_id', $shade_id);
    //         });
    //     }

    //     if ($size_id !== null) {
    //         $offersUpToSaleQuery->whereHas('productSizes', function ($query) use ($size_id) {
    //             $query->where('size_id', $size_id);
    //         });
    //     }

    //     $offersUpToSale = $offersUpToSaleQuery->get();

    //     foreach ($offersUpToSale as $offerUpToSale) {
    //         $offer = $offerUpToSale->offer;

    //         if ($offer && $offer->expiry_date && $offer->expiry_date > $currentDate) {

    //             $offers[] = [
    //                 'name' => $offer->name,
    //                 'old_price' => $offerUpToSale->current_price,
    //                 'discounted_price' => $offerUpToSale->discounted_price,
    //                 'flat_discount' => $offerUpToSale->flat_discount,
    //                 'percent_discount' => $offerUpToSale->percent_discount,
    //             ];
    //         }
    //     }

    //     $comboProductInfo = ComboProductInfo::where('product_id', $product_id)
    //     ->when($shade_id !== null, function ($query) use ($shade_id) {
    //         $query->where('shade_id', $shade_id);
    //     })
    //     ->when($size_id !== null, function ($query) use ($size_id) {
    //         $query->where('size_id', $size_id);
    //     });

    //     $comboProductInfo->get();

    //     $comboProductDetailsID = $comboProductInfo->select('combo_product_detail_id')->distinct()->pluck('combo_product_detail_id')->toArray();

    //     $comboProductID= ComboProductDetail::whereIn('id', $comboProductDetailsID)->select('combo_product_id')
    //     ->distinct()->pluck('combo_product_id')->toArray();

    //     $offerID = OfferCombo::whereIn('combo_product_id', $comboProductID)->select('offer_id')
    //     ->distinct()->pluck('offer_id')->toArray();

    //     $offerList = Offer::whereIn('id', $offerID)->get();

    //     foreach ($offerList as $key => $value) {
    //         if ($value && $value->expiry_date && $value->expiry_date > $currentDate) {
    //             $offers[] = [
    //                 'name' => $value->name,
    //             ];
    //         }

    //     }
    //     return $offers;
    // }
    public function checkOffersShadeSizeWise(Request $request)
    {
        $product_id = $request->product_id;
        $shade_id = $request->shade_id;
        $size_id = $request->size_id;

        $currentDate = now();
        $offers = [];

        // Retrieve offers directly related to the product
        $offersUpToSaleQuery = OfferUpToSale::with('offer')
            ->where('product_id', $product_id);

        // Filter by shade_id if provided
        if ($shade_id !== null) {
            $offersUpToSaleQuery->whereHas('productShades', function ($query) use ($shade_id) {
                $query->where('shade_id', $shade_id);
            });
        }

        // Filter by size_id if provided
        if ($size_id !== null) {
            $offersUpToSaleQuery->whereHas('productSizes', function ($query) use ($size_id) {
                $query->where('size_id', $size_id);
            });
        }

        // Retrieve offers
        $offersUpToSale = $offersUpToSaleQuery->get();

        // Collect offers from offersUpToSale
        foreach ($offersUpToSale as $offerUpToSale) {
            $offer = $offerUpToSale->offer;
            if ($offer && $offer->expiry_date && $offer->expiry_date > $currentDate) {
                $offers[] = [
                    'name' => $offer->name,
                    'old_price' => $offerUpToSale->current_price,
                    'discounted_price' => $offerUpToSale->discounted_price,
                    'flat_discount' => $offerUpToSale->flat_discount,
                    'percent_discount' => $offerUpToSale->percent_discount,
                ];
            }
        }

        // Retrieve offers associated with combo products
        $comboProductDetails = ComboProductDetail::whereIn(
            'id',
            ComboProductInfo::where('product_id', $product_id)
                ->when($shade_id !== null, function ($query) use ($shade_id) {
                    $query->where('shade_id', $shade_id);
                })
                ->when($size_id !== null, function ($query) use ($size_id) {
                    $query->where('size_id', $size_id);
                })
                ->pluck('combo_product_detail_id')
        )->pluck('combo_product_id');

        $offerIDs = OfferCombo::whereIn('combo_product_id', $comboProductDetails)
            ->distinct()->pluck('offer_id');

        // Retrieve offers associated with combo products
        $comboProductOffers = Offer::whereIn('id', $offerIDs)
            ->where('expiry_date', '>', $currentDate)
            ->get();

        // Collect offers from comboProductOffers
        foreach ($comboProductOffers as $offer) {
            $offers[] = [
                'name' => $offer->name,
            ];
        }

        return $offers;
    }

    private function checkOffers($product_id)
    {
        $currentDate = now();
        $offersUpToSale = OfferUpToSale::with(['offer'])->where('product_id', $product_id)->get();
        $comboProductInfos = ComboProductInfo::with(['comboProductDetails'])->where('product_id', $product_id)->get();

        $offerNames = [];

        foreach ($offersUpToSale as $offerUpToSale) {
            $offer = $offerUpToSale->offer;
            if ($offer && $offer->expiry_date && $offer->expiry_date > $currentDate) {
                $offerNames[] = $offer->name;
            }
        }

        foreach ($comboProductInfos as $comboProductInfo) {
            foreach ($comboProductInfo->comboProductDetails as $item) {
                $comboProduct = ComboProduct::find($item->combo_product_id);
                if ($comboProduct) {
                    $offerCombo = OfferCombo::where('combo_product_id', $comboProduct->id)->first();
                    if ($offerCombo) {
                        $offer = Offer::find($offerCombo->offer_id);
                        if ($offer && $offer->expiry_date && $offer->expiry_date > $currentDate) {
                            $offerNames[] = $offer->name;
                        }
                    }
                }
            }
        }

        $offerNames = array_values(array_unique($offerNames));

        return [
            'count' => count($offerNames),
            'names' => $offerNames,
        ];
    }

    // private function checkOffers($product_id)
    // {
    //     $currentDate = now();

    //     // Eager load related offers with expiry dates greater than current date
    //     $offersUpToSale = OfferUpToSale::with(['offer' => function ($query) use ($currentDate) {
    //         $query->where('expiry_date', '>', $currentDate);
    //     }])->where('product_id', $product_id)->get();

    //     // Eager load related combo product details and their offers
    //     $comboProductInfos = ComboProductInfo::with(['comboProductDetails.comboProduct.offerCombo.offer'])
    //         ->where('product_id', $product_id)->get();

    //     $offerNames = [];

    //     // Collect offer names from offers associated directly with the product
    //     foreach ($offersUpToSale as $offerUpToSale) {
    //         if ($offer = $offerUpToSale->offer) {
    //             $offerNames[] = $offer->name;
    //         }
    //     }

    //     // Collect offer names from offers associated with combo products
    //     foreach ($comboProductInfos as $comboProductInfo) {
    //         foreach ($comboProductInfo->comboProductDetails as $item) {
    //             if ($comboProduct = $item->comboProduct) {
    //                 if ($offerCombo = $comboProduct->offerCombo) {
    //                     if ($offer = $offerCombo->offer) {
    //                         $offerNames[] = $offer->name;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     // Remove duplicate offer names
    //     $offerNames = array_values(array_unique($offerNames));

    //     return [
    //         'count' => count($offerNames),
    //         'names' => $offerNames,
    //     ];
    // }
}
