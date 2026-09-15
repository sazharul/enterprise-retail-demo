<?php
namespace App\Helpers;

use App\Models\User;
use App\Models\Notification;
use Kreait\Firebase\Factory;

use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use Spatie\Permission\Models\Permission;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;


if (!function_exists('getPermissionMenus')) {
    /**
     *
     * @param  string  $path
     * @return string
     */
    function getPermissionMenus()
    {
        $permissionMenus = Permission::select('menu_name as name')->groupBy('menu_name')->get();
        return $permissionMenus;
    }
}

if (!function_exists('getPermissionsByMenuName')) {
    /**
     *
     * @param  string  $path
     * @return string
     */
    function getPermissionsByMenuName($menu_name)
    {
        $permissions = Permission::select('name', 'id')->where('menu_name', $menu_name)->get();
        return $permissions;
    }
}

if (!function_exists('roleHasPermissions')) {
    /**
     *
     * @param  string  $path
     * @return string
     */
    function roleHasPermissions($role, $permissions)
    {
        $hasPermission = true;
        foreach ($permissions as $permission) {
            if (!$role->hasPermissionTo($permission->name)) {
                $hasPermission = false;
                return $hasPermission;
            }
        }

        return $hasPermission;
    }
}

class Helper
{
    public static function createNotification($receiverId, $title, $description)
    {
        return Notification::create([
            'sender_id' => 1,
            'receiver_id' => $receiverId,
            'title' => $title,
            'description' => $description
        ]);
    }

    public static function deleteNotification($notificationId)
    {
        $notification = Notification::find($notificationId);

        if (!$notification) {
            return false; // Or throw an exception, depending on your needs
        }

        $notification->delete();

        return true;
    }

    public static function send_notification($senderId, $title = null, $description = null)
    {
        $url = 'https://fcm.googleapis.com/fcm/send';

        $FcmToken = User::whereIn('id', $senderId)->pluck('device_token')->all();

        
        $serverKey = env('SERVER_KEY');
        // dd($serverKey);

        $data = [
            "registration_ids" => $FcmToken,
            "notification" => [
                "title" => $title,
                "body" => $description,
            ]
        ];
        $encodedData = json_encode($data);

        $headers = [
            'Authorization:key=' . $serverKey,
            'Content-Type: application/json',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        // Disabling SSL Certificate support temporarly
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);
        // Execute post
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        // Close connection
        curl_close($ch);
        // dd($result);
        // store notification in database
        foreach($senderId as $userId)
        {
            $result = Helper::createNotification($userId, $title, $description);
            // dd($result);
        }

        return  response()->json([
            'status' => true,
            'message'=> 'Notifications sent successfully.'
        ],200);


    }
}


if (!function_exists('checkOffers')) {
    /**
     *
     * @param  string  $path
     * @return string
     */
    function checkOffers($product_id, $shade_id = null, $size_id = null)
    {
         // Check if there are any offers associated with the given product_id in OfferUpToSale
         $offersUpToSaleQuery = OfferUpToSale::where('product_id', $product_id);

         if ($shade_id !== null) {
             $offersUpToSaleQuery->where('product_shade_id', $shade_id);
         }

         if ($size_id !== null) {
             $offersUpToSaleQuery->where('product_size_id', $size_id);
         }

         $offersUpToSaleCount = $offersUpToSaleQuery->count();

         // Check if there are any offers associated with the given product_id in OfferCombo
         $offersComboQuery = OfferCombo::whereHas('comboProducts', function ($query) use ($product_id, $shade_id, $size_id) {
             $query->where('combo_product_id', $product_id);

             if ($shade_id !== null) {
                 $query->where('shade_id', $shade_id);
             }

             if ($size_id !== null) {
                 $query->where('size_id', $size_id);
             }
         });

         $offersComboCount = $offersComboQuery->count();

         // Extract offer names
         $offerNames = [];
         foreach ($offersUpToSaleQuery->get() as $offer) {
             $offerNames[] = $offer->offer->name;
         }

         foreach ($offersComboQuery->get() as $offer) {
             $offerNames[] = $offer->offer->name;
         }

         // Return count and offer names
         return [
             'count' => $offersUpToSaleCount + $offersComboCount,
             'names' => $offerNames,
         ];
     }

}
