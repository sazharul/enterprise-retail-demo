<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;

use App\Models\Address;
use App\Models\District;
use App\Models\City;
use App\Models\User;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AddressController extends BaseController
{
    public function district()
    {
        $districts = District::where('status', 1)->get();
        $success['districts'] = $districts;


        return $this->sendResponse($success, 'Districts retrieved successfully..');
    }

    public function city(Request $request)
    {

        $cities = City::where('district_id', $request->query('district_id'))->where('status', 1)->get();
        $success['district'] = $request->query('district_id');
        $success['cities'] = $cities;

        return $this->sendResponse($success, 'Cities retrieved successfully..');
    }

    public function get_address()
    {
        $addresses = Address::where('user_id', Auth::user()->id)->get();
        // dd($addresses);
        $success = [];
        if (isset($addresses)) {
            foreach ($addresses as $address) {

                $city_id = $address->city_id;
                $city = City::findOrFail($city_id);

                $addressData = [
                    'id' => $address->id,
                    'name' => $address->name,
                    'phone' => $address->phone,
                    'email' => $address->email,
                    'address' => $address->address,
                    'district_id' => $address->district_id,
                    'district_name' => $city->district->name,
                    'city_id' => $address->city_id,
                    'city_name' => $city->name,
                    'status' => $address->status,
                ];

                $success[] = $addressData;
            }
        }




        return $this->sendResponse($success, 'Address Retreived successfully.');
    }

    public function add_address(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|digits:11',
            'address' => 'required',
            'district_id' => 'required|integer|exists:districts,id',
            'city_id' => 'required|integer|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['user_id'] = Auth::user()->id;
        $address = Address::Create($input);

        if ($input['status'] == 1) {
            Address::where('id', '<>', $address->id)->update(['status' => 0]);
        }
        $success['name'] = Auth::user()->name;

        return $this->sendResponse($success, 'Address Added successfully.');
    }

    public function edit_address(Request $request, $id)
    {
        // dd($request->all());

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|digits:11',
            'address' => 'required',
            'district_id' => 'required|integer|exists:districts,id',
            'city_id' => 'required|integer|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $address = Address::where('user_id', Auth::user()->id)->find($id);

        if (isset($address)) {
            $address->update($input);

            if ($input['status'] == 1) {
                Address::where('id', '<>', $address->id)->update(['status' => 0]);
            }
            $success['name'] = Auth::user()->name;

            return $this->sendResponse($success, 'Address Updated successfully.');
        } else {
            return $this->sendError('Address Not Found', ['error' => 'Address not found or unauthorized.'], 404);
        }
    }

    public function delete_address($id)
    {
        $address = Address::where('id', $id)
            ->where('user_id', Auth::user()->id)
            ->first();

        if (!$address) {
            return $this->sendError('Address Not Found', ['error' => 'Address not found or unauthorized.'], 404);
        }

        Address::destroy($id);

        return $this->sendResponse('', 'Address Deleted successfully.');
    }
}
