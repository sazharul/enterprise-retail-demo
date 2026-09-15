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
                                {{-- @dd($user); --}}
                                <a href="{{ route('message.profile', $item->id) }}">
                                    <li class="clearfix {{ $item->id == $user->id ? 'active' : '' }}">

                                        <img src="{{ !empty($item->avatar) ? asset($item->avatar) : 'https://bootdey.com/img/Content/avatar/avatar1.png' }}"
                                            alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ $item->name }}</div>
                                        </div>

                                    </li>
                                </a>
                            @endforeach
                        </ul>
                    </div>
                    <div class="chat">
                        <div class="chat-header clearfix">
                            <div class="row">
                                <div class="col-lg-12 navbar navbar-expand-lg">
                                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                        {{-- @dd($user->avatar); --}}
                                        <img src="{{ !empty($user->avatar) ? asset($user->avatar) : 'https://bootdey.com/img/Content/avatar/avatar1.png' }}"
                                            alt="avatar">
                                    </a>
                                    <div class="chat-about">
                                        <h6 class="m-b-0">{{ $user->name }}</h6>
                                        {{-- <small>Last seen: 2 hours ago</small> --}}
                                    </div>
                                    <span class="material-icons-outlined d-flex float-right">
                                        <button class="navbar-toggler" type="button" data-bs-toggle="modal"
                                            data-bs-target="#popupModal">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                    </span>

                                </div>

                            </div>
                        </div>
                        <div class="chat-history">
                            <ul class="m-b-0">
                                {{-- @dd($messages->message_details); --}}
                                @foreach ($messages->message_details as $message)
                                    <li class="clearfix">
                                        <div class="message-data"
                                            style='{{ $message->receiver_id == 0 ? '' : 'text-align: right;' }}'>
                                            <span
                                                class="message-data-time">{{ date('M j, Y, g:i A', strtotime($message->created_at)) }}</span>
                                        </div>

                                        <div
                                            class="message {{ $message->receiver_id == 0 ? 'my-message' : 'other-message float-right' }} ">
                                            {{ !empty($message->message) ? $message->message : '' }}

                                            @if (!empty($message->image))
                                                <div class="image-container" style="height: 100px;">
                                                    <img src="{{ $message->image }}" alt="Image"
                                                        style="max-height: 100%; max-width: 100%;">
                                                </div>
                                            @endif
                                            @if ($loop->last && $message->sender_id == 0)
                                                @if ($messages->is_user_read)
                                                    <i class="fas fa-check-double text-success"></i>
                                                @else
                                                    <i class="fas fa-check text-muted"></i>
                                                @endif
                                            @endif

                                            {{-- <div>
                                                @if ($loop->last && $message->sender_id == 0)
                                                    @if ($messages->is_user_read)
                                                        <small>Seen</small>
                                                    @else
                                                        <small>Unseen</small>
                                                    @endif
                                                @endif
                                            </div> --}}


                                        </div>

                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <div class="chat-message clearfix">
                            <form action="{{ route('message.store') }}" id="SendMessage" method="POST"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="input-group mb-0">
                                    <input type="hidden" id="receiver_id" name="receiver_id" value="{{ $user->id }}">
                                    <input type="text" class="form-control" name="message" id="input"
                                        placeholder="Enter text here..">
                                    <div class="input-group-prepend">
                                        <span class="btn">
                                            <label for="image-upload"><i class="lni lni-files"></i></label>
                                            <input type="file" id="image-upload" name="image" style="display: none;">
                                        </span>
                                        <button type="submit" class="btn"><i class="fa fa-paper-plane"
                                                aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </form>
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
                                                        class="clearfix p-2 {{ $item->id == $user->id ? 'selected-chat' : '' }}">

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
    <script src="{{ asset('/socket.io.js') }}"></script>


    <script>
        function formatDate(dateString) {
            var date = new Date(dateString);
            var formattedDate = date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            return formattedDate;
        }
        $(document).ready(function() {
            $(".chat-history").animate({
                scrollTop: $('.chat-history').prop("scrollHeight")
            }, 500);

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


            const socket = io("{{ env('SOCKET_IO') }}");

            // send message to customer
            $("#SendMessage").submit(function(e) {
                e.preventDefault();

                var frm = $('#SendMessage');
                var formData = new FormData(this);
                // console.log(frm);
                if ($('#input').val().length > 0 || formData.get('image')) {
                    formData.delete('input');

                    $.ajax({
                        type: frm.attr('method'),
                        url: frm.attr('action'),
                        data: formData,
                        processData: false, // Prevent jQuery from automatically processing the data
                        contentType: false,
                        success: function(data) {
                            var formattedDate = formatDate(data.message.created_at);
                            console.log(data);
                            var imageUrl = data.message.image;
                            var messageText = data.message.message !== null ? data.message
                                .message : ' ';
                            $('#input').val('');

                            var html = '<li class="clearfix" style="list-style-type: none;">' +
                                '<div class="message-data" style="text-align: right;">' +
                                '<span class="message-data-time">' + formattedDate +
                                '</span></div>' +
                                '<div class="message other-message float-right">' +
                                messageText;


                            if (data.message.image) {
                                html +=
                                    '<div class="image-container" style="height: 100px;">' +
                                    '    <img src="' + imageUrl +
                                    '" alt="Image" style="max-height: 100%; max-width: 100%;">' +
                                    '</div>';
                            }



                            html += '    </div>' +
                                '</li>';

                            $('.chat-history').append(html);
                            $(".chat-history").animate({
                                scrollTop: $('.chat-history').prop("scrollHeight")
                            }, 500);

                            socket.emit('chat message', data.message);
                        },
                        error: function(data) {
                            console.log('An error occurred.');
                            console.log(data.message);
                        },
                    });

                }
                formData.delete('input');
            });

            // Receive message from customer
            socket.on('chat message', function(data) {

                // console.log(data);
                var formattedDate = formatDate(data.created_at);

                if (data.sender_id == {{ $user->id }}) {
                    var imageUrl = data.image;
                    var messageText = data.message !== null ? data.message : ' ';
                    var html = '<li class="clearfix" style="list-style-type: none;">' +
                        '<div class="message-data">' +
                        '<span class="message-data-time">' + formattedDate +
                        '</span>' + '</div>' + '' + '<div class="message ' +
                        'my-message' + '">' + messageText + '';

                    if (data.image) {
                        html +=
                            '<div class="image-container" style="height: 100px;">' +
                            '    <img src="' + imageUrl +
                            '" alt="Image" style="max-height: 100%; max-width: 100%;">' +
                            '</div>';
                    }

                    html += '    </div>' +
                        '</li>';

                    $('.chat-history').append(html);
                    $(".chat-history").animate({
                        scrollTop: $('.chat-history').prop("scrollHeight")
                    }, 500);
                }

            });

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
                if (query.length >= 1) {
                    $.ajax({
                        url: '{{ route('message.search') }}',
                        method: 'GET',
                        data: {
                            query: query
                        },
                        success: function(response) {
                            $('#search-suggestions').empty();
                            $.each(response, function(key, value) {
                                var avatarUrl = value.avatar ? value.avatar :
                                    '{{ asset('backend/assets/images/avatars/01.png') }}';
                                var userId = value
                                    .id; // Assuming user ID is required for the route
                                var userRoute =
                                    '{{ route('message.profile', ':id') }}';
                                userRoute = userRoute.replace(':id', userId);
                                var liElement = '<li class="clearfix mt-2">';
                                liElement += '<a href="' + userRoute +
                                    '" class="btn btn-link">';
                                liElement +=
                                    '<img width=30px src="' +
                                    avatarUrl + '" alt="avatar">';
                                liElement += '<div class="about"><div class="name">' +
                                    value.name + '</div></div>';
                                liElement += '</a></li>';
                                $('#search-suggestions').append(liElement);
                                // console.log(value);
                            });
                        }
                    });
                } else {
                    $('#search-suggestions').empty();
                }
            });
        });
    </script>
@endpush
