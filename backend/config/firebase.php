<?php

return [
    'api_key' => env('FIREBASE_API_KEY'),
    'auth_domain' => env('FIREBASE_AUTH_DOMAIN', 'glowcart-demo.firebaseapp.com'),
    'project_id' => env('FIREBASE_PROJECT_ID', 'glowcart-demo'),
    'storage_bucket' => env('FIREBASE_STORAGE_BUCKET', 'glowcart-demo.appspot.com'),
    'messaging_sender_id' => env('FIREBASE_MESSAGING_SENDER_ID'),
    'app_id' => env('FIREBASE_APP_ID'),
    'measurement_id' => env('FIREBASE_MEASUREMENT_ID'),
];
