@extends('layouts.app')

@php
    $firebaseEnabled = filled(config('firebase.api_key'));
    $firebaseConfig = array_filter([
        'apiKey' => config('firebase.api_key'),
        'authDomain' => config('firebase.auth_domain'),
        'projectId' => config('firebase.project_id'),
        'storageBucket' => config('firebase.storage_bucket'),
        'messagingSenderId' => config('firebase.messaging_sender_id'),
        'appId' => config('firebase.app_id'),
        'measurementId' => config('firebase.measurement_id'),
    ]);
@endphp

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <center>
                <button id="btn-nft-enable" onclick="initFirebaseMessagingRegistration()" class="btn btn-danger btn-xs btn-flat">Allow for Notification</button>
            </center>
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @unless ($firebaseEnabled)
                        <div class="alert alert-warning" role="alert">
                            Push notifications are disabled in demo mode. Configure <code>FIREBASE_*</code> environment variables in production.
                        </div>
                    @endunless

                    <form action="{{ route('send.notification') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text"  class="form-control" name="title">
                        </div>
                        <div class="form-group">
                            <label>Body</label>
                            <textarea class="form-control" name="body"></textarea>
                          </div>
                        <button type="submit" class="btn btn-primary">Send Notification</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>

@if ($firebaseEnabled)
<script src="https://www.gstatic.com/firebasejs/7.23.0/firebase.js"></script>
<script>
    const firebaseConfig = @json($firebaseConfig);

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    function initFirebaseMessagingRegistration() {
        messaging
            .requestPermission()
            .then(function () {
                return messaging.getToken();
            })
            .then(function(token) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    url: '{{ route("save-token") }}',
                    type: 'POST',
                    data: { token: token },
                    dataType: 'JSON',
                    success: function () {
                        alert('Token saved successfully.');
                    },
                    error: function (err) {
                        console.log('User Chat Token Error' + err);
                    },
                });
            }).catch(function (err) {
                console.log('User Chat Token Error' + err);
            });
    }

    messaging.onMessage(function(payload) {
        const noteTitle = payload.notification.title;
        const noteOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        };
        new Notification(noteTitle, noteOptions);
    });
</script>
@else
<script>
    function initFirebaseMessagingRegistration() {
        alert('Push notifications are disabled in demo mode.');
    }
</script>
@endif
@endsection
