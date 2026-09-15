<?php

namespace App\Http\Controllers\API;

use App\Models\Size;
use App\Models\Color;
use App\Models\Shade;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class ProductAttributesController extends BaseController
{
    public function size()
    {
        $sizes = Size::where('status','1')->orderBy('name')->get();
        foreach ($sizes as $item) {
            $item->products_count = $item->products();
        }
        return $this->sendResponse($sizes, 'Units retrieved successfully.');
    }

    public function color()
    {
        $colors = Color::where('status','1')->orderBy('name')->get();
        foreach ($colors as $item) {
            $item->products_count = $item->products();
        }
        return $this->sendResponse($colors, 'Colors retrieved successfully.');
    }

    public function shade(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'color_id' => 'required|exists:colors,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $shades = Shade::where('color_id',$request->query('color_id'))->withCount('products')->where('status',1)->orderBy('name')->get();
        $success['Color'] = $request->query('color_id') ;
        $success['Shades'] = $shades ;

        return $this->sendResponse($success, 'Shades retrieved successfully..');
    }

}
