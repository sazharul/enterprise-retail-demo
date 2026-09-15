<!--start header-->
<header class="top-header">
    <nav class="navbar navbar-expand align-items-center gap-4">
        <div class="btn-toggle">
            <a href="javascript:;"><i class="material-icons-outlined">menu</i></a>
        </div>

        <div class="search-bar flex-grow-1"></div>

        <ul class="navbar-nav gap-1 nav-right-links align-items-center">
            <li class="nav-item d-lg-none mobile-search-btn">
                {{-- <a class="nav-link" href="javascript:;"><i class="material-icons-outlined">search</i></a> --}}
                <span class="position-relative">
                    <i class="fas fa-envelope"></i>
                    @php $messageCount = App\Models\Message::where('is_admin_read', 0)->count(); @endphp

                    {{-- @endphp --}}
                    @if ($messageCount > 0)

                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{ $messageCount }}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    @endif
                </span>
            </li>

            <li class="nav-item ">
                <a class="nav-link" href="{{ route('message.index') }}"><i class="lni lni-facebook-messenger"></i></a>
            </li>

            <li class="nav-item dropdown">
                <a href="javascrpt:;" class="dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                    <img src="{{ Auth::guard('admin')->user()->avatar ? asset('upload/staffs/'.Auth::guard('admin')->user()->avatar) : asset('backend/assets/images/avatars/01.png') }}" class="rounded-circle" width="40" height="40">
                </a>
                <div class="dropdown-menu dropdown-user dropdown-menu-end shadow">
                    <a class="dropdown-item  gap-2 py-2" href="javascript:;">
                        <div class="text-center">
                            <img src="{{ Auth::guard('admin')->user()->avatar ? asset('upload/staffs/'.Auth::guard('admin')->user()->avatar) : asset('backend/assets/images/avatars/01.png') }}" class="rounded-circle p-1 shadow mb-3" width="90" height="90"
                                 alt="">
                            <h5 class="user-name mb-0 fw-bold">{{ucwords(Auth::guard('admin')->user()->name)}}</h5>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                            class="material-icons-outlined">person_outline</i>Profile</a>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                            class="material-icons-outlined">local_bar</i>Setting</a>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                            class="material-icons-outlined">dashboard</i>Dashboard</a>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                            class="material-icons-outlined">account_balance</i>Earning</a>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                            class="material-icons-outlined">cloud_download</i>Downloads</a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="{{ route('logout') }}"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="material-icons-outlined">power_settings_new</i>Logout</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </li>
        </ul>

    </nav>
</header>
<!--end top header-->
