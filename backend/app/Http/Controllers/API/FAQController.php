<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends BaseController
{
    public function get_faq()
    {
        $faqs = FAQ::where('status',1)->get();

        return $this->sendResponse($faqs, 'FAQ retrieved successfully..');
    }
}
