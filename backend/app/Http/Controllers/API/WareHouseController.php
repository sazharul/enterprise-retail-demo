<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;

class WareHouseController extends BaseController
{
    public function getoutlet()
    {

        $warehouse = Warehouse::where('status',1)->get();
        return $this->sendResponse($warehouse, 'Outlet Retrived');
    }
}
