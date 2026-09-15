<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\BaseController;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class PathaoController extends BaseController
{
    private $base_url;

    public function __construct()
    {
        $this->base_url = 'https://courier-api-sandbox.pathao.com';
        //$this->base_url = 'https://api-hermes.pathao.com';
    }

    public function authHeaders()
    {
        return array(
            'Authorization: Bearer ' . Session::get('access_token'),
            'Content-Type:application/json',
            'Accept:application/json',
        );
    }

    public function curlWithBody($url, $header, $method, $body_data_json = null)
    {
        $curl = curl_init($this->base_url . $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $body_data_json);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function grant()
    {
        Session::forget('access_token');
        $header = array(
            'accept:application/json',
            'content-type:application/json',
        );

        $body_data = array(
            'client_id' => env('pathao_client_id'),
            'client_secret' => env('pathao_client_secret'),
            'username' => env('pathao_client_email'),
            'password' => env('pathao_client_password'),
            'grant_type' => env('pathao_grant_type'),
        );

        $body_data_json = json_encode($body_data);
        $response = $this->curlWithBody('/aladdin/api/v1/issue-token', $header, 'POST', $body_data_json);
        $token = json_decode($response)->access_token;
        Session::put('access_token', $token);
    }

    public function getStoreId()
    {
        $header = $this->authHeaders();
        $response = $this->curlWithBody('/aladdin/api/v1/stores', $header, 'GET');
        return json_decode($response)->data->data[0];
    }

    public function get_city_list()
    {
        if (env('DEMO_MODE', false)) {
            return $this->sendResponse([
                ['city_id' => 1, 'city_name' => 'Dhaka'],
                ['city_id' => 2, 'city_name' => 'Chittagong'],
            ], 'City retrieve successfully.');
        }

        $this->grant();
        $header = $this->authHeaders();
        $response = $this->curlWithBody('/aladdin/api/v1/countries/1/city-list', $header, 'GET');
        $data = json_decode($response)->data->data;
        return $this->sendResponse($data, 'City retrieve successfully.');
    }

    public function get_zone_list($city_id)
    {
        if (env('DEMO_MODE', false)) {
            return $this->sendResponse([
                ['zone_id' => 1, 'zone_name' => 'Demo Zone A'],
                ['zone_id' => 2, 'zone_name' => 'Demo Zone B'],
            ], 'Zone retrieve successfully.');
        }

        $this->grant();
        $header = $this->authHeaders();
        $response = $this->curlWithBody('/aladdin/api/v1/cities/' . $city_id . '/zone-list', $header, 'GET');
        $data = json_decode($response)->data->data;
        return $this->sendResponse($data, 'Zone retrieve successfully.');
    }

    public function get_area_list($zone_id)
    {
        if (env('DEMO_MODE', false)) {
            return $this->sendResponse([
                ['area_id' => 1, 'area_name' => 'Demo Area 1'],
                ['area_id' => 2, 'area_name' => 'Demo Area 2'],
            ], 'Zone retrieve successfully.');
        }

        $this->grant();
        $header = $this->authHeaders();
        $response = $this->curlWithBody('/aladdin/api/v1/zones/' . $zone_id . '/area-list', $header, 'GET');
        $data = json_decode($response)->data->data;
        return $this->sendResponse($data, 'Zone retrieve successfully.');
    }

    public function delivery_now($id)
    {
        $data['order'] = $order = Order::where('id', $id)->first();

        if (!isset($order)) {
            return redirect()->back()->with('toast_success', 'Order Not Found');
        }
        try {
            DB::beginTransaction();
            $billing_info = $order->billingInfo;

            $this->grant();
            $header = $this->authHeaders();

            $body_data = array(
                'store_id' => $this->getStoreId()->store_id,
                'merchant_order_id' => Str::random(10),
                'sender_name' => "Angorag",
                'sender_phone' => "01736498519",
                'recipient_name' => $billing_info->s_first_name,
                'recipient_phone' => $billing_info->s_phone,
                'recipient_address' => $billing_info->s_address,
                'recipient_city' => $billing_info->s_city_id,
                'recipient_zone' => $billing_info->s_zone_id,
                'recipient_area' => $billing_info->s_area_id,
                'delivery_type' => 48, //  48 for Normal Delivery, 12 for On Demand Delivery
                'item_type' => 2, // 1 for Document, 2 for Parcel
                'special_instruction' => $order->order_notes, // Giving by angorag
                'item_quantity' => $order->item_quantity,
                'item_weight' => $order->total_weight,
                'amount_to_collect' => (int)$order->grand_total,
                'item_description' => 'Cosmetics Items',

            );

            $body_data_json = json_encode($body_data);


            $response = $this->curlWithBody('/aladdin/api/v1/orders', $header, 'POST', $body_data_json);

            $data = json_decode($response);

            if ($data->type == 'success') {
                $order->update([
                    'order_status' => 'Order Shipped',
                    'pathao_status' => 'Pickup_Requested',
                    'consignment_id' => $data->data->consignment_id,
                    'merchant_order_id' => $data->data->merchant_order_id,
                    'pathao_delivery_fee' => $data->data->delivery_fee
                ]);
            } else {
                return redirect()->back()->with('toast_error', "User shipping address is not correct");
            }

            DB::commit();
            return redirect()->back()->with('toast_success', 'Delivered Place in pathao successfully');


        } catch (\Exception $e) {
            // An error occurred, rollback the transaction
            DB::rollBack();

            // Handle the exception or log the error
            return $this->sendError('Order Placement Failed.', $e->getMessage(), 500);
        }
    }
}
