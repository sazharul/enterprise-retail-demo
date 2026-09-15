<!doctype html>
<html lang="en" data-bs-theme="light">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <!--favicon-->
    <link rel="icon" href="{{ asset('backend/assets/images/favicon-32x32.png') }}" type="image/png">

    <!--plugins-->
    <link href="{{ asset('backend/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend/assets/plugins/metismenu/metisMenu.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend/assets/plugins/metismenu/mm-vertical.css') }}">
    <!--bootstrap css-->
    <link href="{{ asset('backend/assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&amp;display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" rel="stylesheet">
    <!--main css-->
    <link href="{{ asset('backend/assets/css/bootstrap-extended.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/sass/main.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/sass/dark-theme.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/sass/responsive.css') }}" rel="stylesheet">

</head>

<body class="bg-login">


    <!--authentication-->
    <div class="container-fluid my-5">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                <div class="card rounded-4">
                    <div class="card-body p-5">
                        <img src="{{ asset('backend/assets/images/logo1.png') }}" class="mb-4" width="145"
                            alt="">
                        <h4 class="fw-bold">Get Started Now (User Login)</h4>
                        <p class="mb-0">Enter your credentials to login your account</p>

                        <div class="form-body my-4">
                            <form class="row g-3" method="POST" action="{{ route('admin.login_form') }}">
                                @csrf
                                <div class="col-12">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name="email"
                                        class="form-control @error('email') is-invalid @enderror" id="email"
                                        placeholder="jhon@example.com" value="{{ old('email') }}" required
                                        autocomplete="email" autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-12">
                                    <label for="inputChoosePassword" class="form-label">Password</label>
                                    <div class="input-group" id="show_hide_password">
                                        <input type="password"
                                            class="form-control border-end-0 @error('password') is-invalid @enderror"
                                            id="inputChoosePassword" placeholder="Enter Password" name="password"
                                            required autocomplete="current-password">

                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember"
                                            {{ old('remember') ? 'checked' : '' }}>
                                        <label class="form-check-label" for="remember">Remember Me</label>
                                    </div>
                                </div>
                                @if (Route::has('password.request'))
                                    <div class="col-md-6 text-end">
                                        <a href="{{ route('password.request') }}">Forgot Password ?</a>
                                    </div>
                                @endif

                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="submit" class="btn btn-primary">Login</button>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="text-start">
                                        <p class="mb-0">Don't have an account yet? <a
                                                href="auth-basic-register.html">Sign up here</a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="separator section-padding">
                            <div class="line"></div>
                            <p class="mb-0 fw-bold">OR</p>
                            <div class="line"></div>
                        </div>

                        <div class="d-flex gap-3 justify-content-center mt-4">
                            <a href="javascript:;"
                                class="wh-48 d-flex align-items-center justify-content-center rounded-circle border">
                                <img src="{{ asset('backend/assets/images/apps/05.png') }}" width="30"
                                    alt="">
                            </a>
                            <a href="javascript:;"
                                class="wh-48 d-flex align-items-center justify-content-center rounded-circle border">
                                <img src="{{ asset('backend/assets/images/apps/17.png') }}" width="30"
                                    alt="">
                            </a>
                            <a href="javascript:;"
                                class="wh-48 d-flex align-items-center justify-content-center rounded-circle border">
                                <img src="{{ asset('backend/assets/images/apps/18.png') }}" width="30"
                                    alt="">
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div><!--end row-->
    </div>
</body>
</html>
