<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\Models\CancellationPolicy;
use App\Models\DeletionPolicy;
use App\Models\PrivacyPolicy;
use App\Models\ReturnAndRefund;
use App\Models\TermAndCondition;
use App\Models\WhoWeAre;
use Illuminate\Http\Request;

class CompanyPolicyController extends BaseController
{
    public function whoweare()
    {
        $data = WhoWeAre::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }

    public function termcondition()
    {
        $data = TermAndCondition::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }
    public function privacypolicy()
    {
        $data = PrivacyPolicy::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }

    public function delationpolicy()
    {
        $data = DeletionPolicy::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }

    public function cancellationpolicy()
    {
        $data = CancellationPolicy::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }

    public function returnrefund()
    {
        $data = ReturnAndRefund::get()->first();
        $success = $data ;


        return $this->sendResponse($success, 'Data retrieved successfully..');
    }
}
