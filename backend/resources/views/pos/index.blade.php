<!doctype html>
<html lang="en" data-bs-theme="light">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>POS Sale | Dashboard</title>
    <!--favicon-->
    <link rel="icon" href="{{ asset('backend/assets/images/favicon-32x32.png') }}" type="image/png">
    <link href="{{ asset('backend/assets/css/bootstrap.min.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('backend/assets/plugins/fontawesome-free/css/all.min.css') }}">
    <link href="{{ asset('/') }}backend/assets/pos/pos_style.css" rel="stylesheet" type="text/css" />
    <link href="{{ asset('/') }}admin/assets/api/pace/pace-theme-flat-top.css" rel="stylesheet" type="text/css" />
    <link href="{{ asset('/') }}admin/assets/api/mcustomscrollbar/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
    <script src="{{ asset('backend/assets/js/jquery.min.js') }}"></script>
</head>

<body id="tc_body" class="header-fixed header-mobile-fixed subheader-enabled aside-enabled aside-fixed">
    <div class="se-pre-con">
        <div class="pre-loader">
            <img class="img-fluid" src="{{ asset('/') }}admin/assets/images/loadergif.gif" alt="loading">
        </div>
    </div>

    <!--begin::Validation Message-->
    @include('include.validation-message')
    <!--end::Validation Message-->

    <div class="contentPOS">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-5 order-xl-first order-last">
                    <div class="card card-custom gutter-b bg-white border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between colorfull-select">
                                <div class="input-group w-150px bag-primary">
                                    <input type="text" id="searchInput" class="form-control " name="search"
                                        placeholder="Search..." data-route="{{route('pos.search')}}">

                                </div>
                                <div class="selectmain ml-2">
                                    <select id="categorySelect" class="w-150px bag-primary" data-route="{{route('pos.filter_products')}}" onchange="filterProducts()">
                                        <option value="">All Categories</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="selectmain ml-2">
                                    <select id="brandSelect" class="w-150px bag-secondary" data-route="{{route('pos.filter_products')}}" onchange="filterProducts()">
                                        <option value="">All Brands</option>
                                        @foreach ($brands as $brand)
                                            <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                                        @endforeach
                                    </select>
                                </div>

                            </div>

                            <div id="productItemsContainer" class="mt-3">
                                <div class="row">
                                    @foreach ($products as $product)
                                        <div class="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-6">
                                            <div class="productCard" data-product_id="{{$product->id}}" data-route="{{route('product.get_products_by_id')}}" onclick="showModalData('{{route('product.get_products_by_id')}}', '{{$product->id}}')">
                                                <div class="productThumb" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                                                    <img class="img-fluid w-100 h-100" src="{{ $product->image && file_exists(public_path($product->image)) ? asset($product->image) : asset('admin/assets/images/carousel/element-banner2-right.jpg') }}" alt="Product Name">
                                                </div>
                                                <div class="productContent" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                                                    <a href="javascript:void(0)">{{ $product->name }}</a>
                                                </div>
                                                <span class="productPrice">{{ $product->price }}</span>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-xl-7 col-lg-8 col-md-8">
                    <form action="{{route('pos.store')}}" method="POST" class="">
                        @csrf
                        <div class="card card-custom mb-2 bg-white border-0 table-contentpos">
                            <div class="card-body row">
                                <div class="col-7">
                                    <div class="form-group">
                                        <label class="text-dark d-flex">Choose a Customer
                                            <span class="badge badge-secondary white rounded-circle"
                                                data-bs-toggle="modal" data-bs-target="#choosecustomer">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="svg-sm"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                                    id="Layer_122" x="0px" y="0px" width="512px" height="512px"
                                                    viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                                                    xml:space="preserve">
                                                    <g>
                                                        <rect x="234.362" y="128" width="43.263" height="256"></rect>
                                                        <rect x="128" y="234.375" width="256" height="43.25"></rect>
                                                    </g>
                                                </svg>
                                            </span>
    
                                        </label>
                                        <select class="w-100" required name="user_id">
                                            <option value="" selected disabled>Select Customer</option>
                                            @foreach ($allUsers as $user)
                                            <option value="{{$user->id}}">{{ucwords($user->name)}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-5">
                                    <div class="text-end">
                                        <h5 class="font-weight-bold text-uppercase">GlowCart Shop</h5>
                                        <a href="{{route('admin.dashboard')}}" class="btn btn-primary">Back To Dashboard</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-custom gutter-b bg-white border-0 table-contentpos">
                            <div class="card-body">
                                <div class="table-responsive" id="printableTable">
                                    <table id="orderTable" class="display" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th width="30%">Name</th>
                                                <th width="5%">Quantity</th>
                                                <th width="5%">Variant</th>
                                                <th width="5%">Price</th>
                                                <th width="5%">Discount</th>
                                                <th width="5%">Subtotal</th>
                                                <th width="5%"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="productListBody" data-count="1">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer bg-white">
                                <div class="row justify-content-end">
                                    <div class="col-md-6">
                                        <div class="form-group row mb-1">
                                            <label class="col-5 text-end">Total Price</label>
                                            <div class="col-7">
                                                <input type="text" class="form-control" name="sub_total" id="total_amount" readonly value="0.00">
                                            </div>
                                        </div>

                                        <input type="hidden" name="total_quantity" class="total_quantity"/>


                                        <div class="form-group row mb-1">
                                            <label class="col-5 text-end">Discount Amount</label>
                                            <div class="col-7">
                                                <input type="text" class="form-control" name="total_discount_amount" id="total_discount" value="0.00" readonly onkeyup="calculate_store(1);" onchange="calculate_store(1);">
                                            </div>
                                        </div>
                                        <div class="form-group row mb-1">
                                            <label class="col-5 text-end">Tax</label>
                                            <div class="col-7">
                                                <input type="text" class="form-control" name="tax_amount" id="tax_amount" value="0.00" onkeyup="calculate_store(1);" onchange="calculate_store(1);">
                                            </div>
                                        </div>
                                        <div class="form-group row mb-1">
                                            <label class="col-5 text-end">Grand Total</label>
                                            <div class="col-7">
                                                <input type="text" class="form-control" name="grand_total" id="grandTotal" readonly value="0.00">
                                            </div>
                                        </div>

                                        <button class="btn btn-primary white mt-3" style="float:right" type="submit">Submit</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>



    <div class="modal fade text-left" id="choosecustomer" tabindex="-1" role="dialog"
        aria-labelledby="myModalLabel13" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="myModalLabel13">Add Customer</h3>
                    <button type="button"
                        class="close rounded-pill btn btn-sm btn-icon btn-light btn-hover-primary m-0"
                        data-bs-dismiss="modal" aria-label="Close">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="text-body">Customer Group</label>
                                <fieldset class="form-group mb-3">
                                    <select
                                        class="js-example-basic-single js-states form-control bg-transparent p-0 border-0"
                                        name="state">
                                        <option value="AL">General</option>

                                        <option value="WY">Partial</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label class="text-body">Customer Name</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control"
                                        placeholder="Enter Customer Name">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="text-body">Company Name</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control"
                                        placeholder="Enter Company Name">
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label class="text-body">Tax Number</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control"
                                        placeholder="Enter Tax">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="text-body">Email</label>
                                <fieldset class="form-group mb-3">
                                    <input type="email" name="text" class="form-control"
                                        placeholder="Enter Mail">
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label class="text-body">Phone Number</label>
                                <fieldset class="form-group mb-3">
                                    <input type="email" name="text" class="form-control"
                                        placeholder="Enter Phone Number">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="text-body">Country</label>
                                <fieldset class="form-group mb-3">
                                    <select
                                        class="js-example-basic-single js-states form-control bg-transparent p-0 border-0"
                                        name="state">
                                        <option value="AL">USA</option>

                                        <option value="WY">UK</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label class="text-body">State</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control"
                                        placeholder="Enter State">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="text-body">City</label>
                                <fieldset class="form-group mb-3">
                                    <select
                                        class="js-example-basic-single js-states form-control bg-transparent p-0 border-0"
                                        name="state">
                                        <option value="AL">Dubai</option>

                                        <option value="WY">Bahreen</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label class="text-body">Postal Code</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control"
                                        placeholder="Enter Postal Code">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <div class="col-md-6">
                                <label class="text-body">Address</label>
                                <fieldset class="form-group mb-3">
                                    <input type="text" name="text" class="form-control "
                                        placeholder="Enter Address">
                                </fieldset>
                            </div>
                        </div>
                        <div class="form-group row justify-content-end mb-0">
                            <div class="col-md-6  text-end">
                                <a href="javascript:void(0)" class="btn btn-primary">Add Customer</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    
    <div class="modal fade" id="addProductInfo" data-bs-backdrop="static" role="dialog" aria-labelledby="myModalLabel1444" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel1444">Product Variation</h4>
                </div>
                <div class="modal-body">
                    <form id="productForm">
                        @csrf
                        <input type="hidden" id="product_id_modal">
                        <input type="hidden" id="product_name_modal">
                        <input type="hidden" id="product_variant_modal">
                        <input type="hidden" id="size_name_modal">
                        <input type="hidden" id="shade_name_modal">
                        <input type="hidden" id="size_id_modal">
                        <input type="hidden" id="shade_id_modal">
                        

                        <div class="form-group row">
                            <div class="col-md-12" id="modal_size" style="display: none">
                                <div class="form-group">
                                    <label for="">Select Product Size</label>
                                    <select id="sizeSelect" data-route="{{route('pos.size_wise_price_stock')}}" class="form-control">
                                    <option value="">All Product Size</option>
                                </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Size Wise Price</label>
                                    <input type="text" class="form-control size_price">
                                </div>
                            </div>

                            <div class="col-md-12 mt-4" id="modal_shade" style="display: none">
                                <div class="form-group">
                                    <label for="">Select Product Shade</label>
                                    <select id="shadeSelect" data-route="{{route('pos.shade_wise_price_stock')}}" class="form-control">
                                    <option value="">All Product Shade</option>
                                </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Shade Wise Price</label>
                                    <input type="text" class="form-control shade_price">
                                </div>
                                <div class="form-group">
                                    <label for="">Stock Available</label>
                                    <input type="text" class="form-control shade_price" readonly id="stock" value="0">
                                </div>
                                <h5 class="text-danger stock_message"></h5>

                                <div class="mt-2 p-3 border">
                                    <label class="text-decoration-underline">Included Offers</label>
                                    <div class="offers_show">
                                    </div>
                                </div>
                            </div>

                            <div id="loading">Loading ...</div>

                        </div>

                        <div class="form-group row justify-content-end mb-0">
                            <div class="col-md-6 text-end footer-button">
                                <a href="javascript:void(0)" data-bs-dismiss="modal" class="btn btn-primary" id="closeBtn">Close</a>
                                <a href="javascript:void(0)" data-bs-dismiss="modal" id="addToCartBtn" class="btn btn-primary disabled">Add To Cart</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="baseURL" data-url="{{ url('/') }}"></div>

    <script src="{{ asset('/') }}admin/assets/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('backend/assets/plugins/select2/select2.min.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/sweetalert2/sweetalert2@11.js') }}"></script>
    <script src="{{ asset('/') }}backend/assets/pos/pos_sale.js"></script>
    <script>
        jQuery(window).on('load', function(){ 
            jQuery('.se-pre-con').fadeOut("slow");
        });

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    </script>
</body>
</html>
