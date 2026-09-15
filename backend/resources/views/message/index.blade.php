@extends('layouts.app')
@section('title', 'Message')
@push('css')
    <link href="{{ asset('admin/assets/css/message.css') }}" rel="stylesheet">
@endpush
@section('content')
    <div class="container">
        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <div id="plist" class="people-list">

                        <div class="search-bar flex-grow-1">
                            <div class="position-relative">
                                <input id="search-input"
                                    class="form-control rounded-5 px-5 search-control d-lg-block d-none" type="text"
                                    placeholder="Search">
                                <span
                                    class="material-icons-outlined position-absolute d-lg-block d-none ms-3 translate-middle-y start-0 top-50">search</span>
                            </div>
                            <ul id="search-suggestions" class="list-unstyled mt-2 mb-0"></ul>
                        </div>
                        <ul class="list-unstyled chat-list mt-2 mb-0">
                            @foreach ($tusers as $items)
                                @php
                                    $item = $items->user;
                                @endphp

                                <li class="clearfix">
                                    <a href="{{ route('message.profile', $item->id) }}">
                                        <img src="{{ !empty($item->avatar) ? asset($item->avatar) : 'https://bootdey.com/img/Content/avatar/avatar1.png' }}"
                                            alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ $item->name }}</div>
                                        </div>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="chat">
                        <div class="chat-header clearfix">
                            <div class="row">
                                <div class="col-lg-12 navbar navbar-expand-lg">
                                        <span class="material-icons-outlined d-flex float-right">
                                        <button class="navbar-toggler" type="button" data-bs-toggle="modal"
                                            data-bs-target="#popupModal">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                    </span>

                                </div>

                            </div>
                        </div>
                        <div class="chat-history d-flex justify-content-center align-items-center bg-light ">
                            <div class="text-center p-4 rounded">
                                <p class="text-muted mb-0 fs-3">No conversation selected</p>
                            </div>
                        </div>

                        <div class="chat-message clearfix">

                        </div>
                        <div class="modal fade" id="popupModal" tabindex="-1" aria-labelledby="popupModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg"> <!-- Adjust modal size if needed -->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="popupModalLabel">Chat Contacts</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="search-bar flex-grow-1">
                                        <div class="position-relative">
                                            <input id="modal-search-input"
                                                class="form-control rounded-5 px-5 search-control" type="text"
                                                placeholder="Search">
                                            <span
                                                class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50">
                                                search</span>
                                        </div>
                                        <ul id="modal-search-suggestions" class="list-unstyled mt-2 mb-0"></ul>
                                    </div>
                                    <ul class="list-unstyled chat-list mt-2 mb-0">
                                        @foreach ($tusers as $items)
                                            @php
                                                $item = $items->user;
                                            @endphp
                                            <a href="{{ route('message.profile', $item->id) }}">
                                                <li
                                                    class="clearfix p-2">

                                                    <img src="{{ !empty($item->avatar) ? asset($item->avatar) : 'https://bootdey.com/img/Content/avatar/avatar1.png' }}"
                                                        alt="avatar">
                                                    <div class="user-details">
                                                        <div class="name">{{ $item->name }}</div>
                                                    </div>

                                                </li>
                                            </a>
                                        @endforeach
                                    </ul>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        $(document).ready(function() {
            var activeChatItem = $('.chat-list .active');
            if (activeChatItem.length > 0) {
                var chatListContainer = $('.chat-list');
                var containerHeight = chatListContainer.height();
                var scrollTop = chatListContainer.scrollTop();
                var itemOffsetTop = activeChatItem.offset().top - chatListContainer.offset().top + scrollTop;
                var itemHeight = activeChatItem.outerHeight(true);

                if (itemOffsetTop + itemHeight > containerHeight) {
                    chatListContainer.scrollTop(itemOffsetTop + itemHeight - containerHeight);
                }
            }
            $('#search-input').on('input', function() {
                var query = $(this).val();
                if (query.length >= 1) { // Adjust the minimum character limit as needed
                    $.ajax({
                        url: '{{ route('message.search') }}', // Replace with your Laravel controller endpoint
                        method: 'GET',
                        data: {
                            query: query
                        },
                        success: function(response) {
                            $('#search-suggestions').empty();
                            $.each(response, function(key, value) {
                                var avatarUrl = value.avatar ? value.avatar :
                                    'backend/assets/images/avatars/01.png';
                                var userId = value
                                    .id; // Assuming user ID is required for the route
                                var userRoute =
                                    '{{ route('message.profile', ':id') }}';
                                userRoute = userRoute.replace(':id', userId);
                                var liElement = '<li class="clearfix mt-2">';
                                liElement += '<a href="' + userRoute +
                                    '" class="btn btn-link">';
                                liElement +=
                                    '<img width=30px src="http://127.0.0.1:8000/' +
                                    avatarUrl + '" alt="avatar">';
                                liElement += '<div class="about"><div class="name">' +
                                    value.name + '</div></div>';
                                liElement += '</a></li>';
                                $('#search-suggestions').append(liElement);
                                console.log(value);
                            });
                        }
                    });
                } else {
                    $('#search-suggestions').empty();
                }
            });
        });
        $('#modal-search-input').on('input', function() {
                var query = $(this).val();
                if (query.length >= 1) {
                    $.ajax({
                        url: '{{ route('message.search') }}',
                        method: 'GET',
                        data: {
                            query: query
                        },
                        success: function(response) {
                            $('#modal-search-suggestions').empty();
                            $.each(response, function(key, value) {
                                var avatarUrl = value.avatar ? value.avatar :
                                    '{{ asset('backend/assets/images/avatars/01.png') }}';
                                var userId = value.id;
                                var userRoute =
                                    '{{ route('message.profile', ':id') }}';
                                userRoute = userRoute.replace(':id', userId);

                                var liElement = `
                                    <li class="clearfix mt-2">
                                        <a href="${userRoute}" class="btn btn-link">
                                            <img width="30px" src="${avatarUrl}" alt="avatar">
                                            <div class="about">
                                                <div class="name">${value.name}</div>
                                            </div>
                                        </a>
                                    </li>
                                `;

                                $('#modal-search-suggestions').append(liElement);
                            });
                        }
                    });
                } else {
                    $('#modal-search-suggestions').empty();
                }
            });

    </script>
@endpush
