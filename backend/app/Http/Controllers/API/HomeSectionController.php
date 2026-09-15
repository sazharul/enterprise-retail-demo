<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ComboProduct;
use App\Models\ComboProductInfo;
use App\Models\HomeSection;
use App\Models\Offer;
use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use App\Models\Product;
use App\Models\SectionEight;
use App\Models\SectionEighteen;
use App\Models\SectionEleven;
use App\Models\SectionFive;
use App\Models\SectionFour;
use App\Models\SectionFourteen;
use App\Models\SectionNine;
use App\Models\SectionNineteen;
use App\Models\SectionOne;
use App\Models\SectionSeven;
use App\Models\SectionSevenTeen;
use App\Models\SectionSixteen;
use App\Models\SectionTen;
use App\Models\SectionThree;
use App\Models\SectionTwelve;
use App\Models\SectionTwo;

class HomeSectionController extends BaseController
{

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
            'names' => $offerNames];
    }

    public function get_all()
    {
        $product_count = 10;
        $all_sections = [];
        $section_one = SectionOne::where('status', 1)->get();
        array_push($all_sections, $section_one);
        $section_two = SectionTwo::where('status', 1)->get();
        array_push($all_sections, $section_two);
        $section_three = SectionThree::where('status', 1)->get();
        array_push($all_sections, $section_three);
        $section_four = SectionFour::where('status', 1)->get();
        array_push($all_sections, $section_four);
        $section_five = SectionFive::where('status', 1)->get();
        array_push($all_sections, $section_five);

        $section_six = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->withCount('order_details')->where('status', 1)->orderByDesc('order_details_count')->withCount('reviews')
            ->withAvg('reviews', 'star')
            ->take($product_count)
            ->get();

        foreach ($section_six as $product) {
            $offers = $this->checkOffers($product->id);
            $product['offers'] = $offers;
        }
        // dd($section_six);
        array_push($all_sections, $section_six);
        $section_seven = SectionSeven::where('status', 1)->get();
        array_push($all_sections, $section_seven);
        $section_eight = SectionEight::where('status', 1)->get();
        array_push($all_sections, $section_eight);
        $section_nine = SectionNine::where('status', 1)->get();
        array_push($all_sections, $section_nine);
        $section_ten = SectionTen::where('status', 1)->get();
        array_push($all_sections, $section_ten);
        $section_eleven = SectionEleven::where('status', 1)->get();
        array_push($all_sections, $section_eleven);
        $section_twelve = SectionTwelve::with('categories')->where('status', 1)->get();
        array_push($all_sections, $section_twelve);

        //'Super Offer
        $section_thirteen_ids = SectionSixteen::pluck('product_id')->toArray();
        $section_thirteen = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->whereIn('id', $section_thirteen_ids)->where('status', 1)->withCount('reviews')
            ->withAvg('reviews', 'star')
            ->get();
        foreach ($section_thirteen as $product) {
            $offers = $this->checkOffers($product->id);
            $product['offers'] = $offers;
        }
        array_push($all_sections, $section_thirteen);
        $section_fourteen = SectionFourteen::with('concerns')->where('status', 1)->get();
        array_push($all_sections, $section_fourteen);

        //new at perfecto
        $section_fifteen = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->where('status', 1)->withCount('reviews')
            ->withAvg('reviews', 'star')
            ->latest()
            ->take($product_count)
            ->get();
        foreach ($section_fifteen as $product) {
            $offers = $this->checkOffers($product->id);
            $product['offers'] = $offers;
        }

        array_push($all_sections, $section_fifteen);

        //section 16 Mega Deals
        $section_sixteen_ids = SectionSixteen::pluck('product_id')->toArray();
        $section_sixteen = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->whereIn('id', $section_sixteen_ids)->where('status', 1)->withCount('reviews')
            ->withAvg('reviews', 'star')
            ->get();
        foreach ($section_sixteen as $product) {
            $offers = $this->checkOffers($product->id);
            $product['offers'] = $offers;
        }
        array_push($all_sections, $section_sixteen);

        //section 17 Personal Care
        $section_seventeen_ids = SectionSevenTeen::pluck('product_id')->toArray();
        $section_seventeen = Product::with(['productShades.productShadeImages', 'productSizes.productSizeImages', 'reviews'])->whereIn('id', $section_seventeen_ids)->where('status', 1)->withCount('reviews')
            ->withAvg('reviews', 'star')
            ->get();
        foreach ($section_seventeen as $product) {
            $offers = $this->checkOffers($product->id);
            $product['offers'] = $offers;
        }
        array_push($all_sections, $section_seventeen);

        $section_eighteen = SectionEighteen::where('status', 1)->get();
        array_push($all_sections, $section_eighteen);

        $section_nineteen = SectionNineteen::get();
        // dd($section_nineteen);
        array_push($all_sections, $section_nineteen);

        return ($all_sections);

    }
    public function get_web()
    {

        $home_sections = HomeSection::where('status', 1)->orderBy('position')->whereIn('type', [1, 3])->get();
        $all_sections = $this->get_all();
        // dd($home_sections);
        foreach ($home_sections as $section) {
            for ($i = 0; $i < 20; $i++) {
                if ($section->id == $i + 1) {
                    $section['section_data'] = $all_sections[$i];
                }
            }
        }
        // dd($all_sections);
        return $this->sendResponse($home_sections, "Homes Sections retrieved successfully.");
    }

    public function get_mobile()
    {

        $home_sections = HomeSection::where('status', 1)->orderBy('position')->whereIn('type', [2, 3])->get();
        $all_sections = $this->get_all();
        // dd($home_sections);
        foreach ($home_sections as $section) {
            for ($i = 0; $i < 17; $i++) {
                if ($section->id == $i + 1) {
                    $section['section_data'] = $all_sections[$i];
                }
            }
        }
        // dd($all_sections);
        return $this->sendResponse($home_sections, "Homes Sections retrieved successfully.");
    }
}
