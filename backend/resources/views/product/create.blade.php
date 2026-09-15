@extends('layouts.app')
@section('title', 'Create Product')
@push('css')
  <style>
    
  </style>
  
@endpush

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
    @include('include.validation-message')
    <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Create New Product</h5>
                <div class="card-tools">
                    <a href="{{ route('product.index') }}" class="btn btn-warning btn-sm" title="Back">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </a>
                </div>
            </div>
            <div class="card-body p-0">
                <!--begin::Form-->
                <form class="validate-form" action="{{ route('product.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <!--begin::Card Body-->
                    <div class="card-body">
                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="category_id" class="col-form-label">Select Category<span class="text-danger">*</span></label>
                                    <select name="category_id" id="category_id" required class="form-control basic-select2">
                                        <option value="0">Select One</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="sub_category_id" class="col-form-label">Select Sub Category</label>
                                    <select name="sub_category_id" id="sub_category_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="sub_sub_category_id" class="col-form-label">Select Sub Sub Category</label>
                                    <select name="sub_sub_category_id" id="sub_sub_category_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="brand_id" class="col-form-label">Select Brand</label>
                                    <select name="brand_id" id="brand_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                        @foreach ($brands as $brand)
                                            <option value="{{$brand->id}}">{{ucwords($brand->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="coverage_id" class="col-form-label">Select Coverage</label>
                                    <select name="coverage_id" id="coverage_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                        @foreach ($coverages as $coverage)
                                            <option value="{{$coverage->id}}">{{ucwords($coverage->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="formulation_id" class="col-form-label">Select Formulation</label>
                                    <select name="formulation_id" id="formulation_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                        @foreach ($formulations as $formulation)
                                            <option value="{{$formulation->id}}">{{ucwords($formulation->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="country_id" class="col-form-label">Select Country</label>
                                    <select name="country_id" id="country_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                        @foreach ($countries as $country)
                                            <option value="{{$country->id}}">{{ucwords($country->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="skin_type_id" class="col-form-label">Select Skin Type</label>
                                    <select name="skin_type_id" id="skin_type_id" class="form-control basic-select2">
                                        <option value="">Select One</option>
                                        @foreach ($skinTypes as $skinType)
                                            <option value="{{$skinType->id}}">{{ucwords($skinType->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>


                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="preference_id" class="col-form-label">Select Preference</label>
                                    <select name="preference_id[]" id="preference_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($preferences as $preference)
                                            <option value="{{ $preference->id }}">{{ $preference->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="finish_id" class="col-form-label">Select Finish</label>
                                    <select name="finish_id[]" id="finish_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($finishes as $finish)
                                            <option value="{{ $finish->id }}">{{ $finish->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="gender_id" class="col-form-label">Select Gender</label>
                                    <select name="gender_id[]" id="gender_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($genders as $gender)
                                            <option value="{{ $gender->id }}">{{ $gender->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="ingredient_id" class="col-form-label">Select Ingredient</label>
                                    <select name="ingredient_id[]" id="ingredient_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($ingredients as $ingredient)
                                            <option value="{{ $ingredient->id }}">{{ $ingredient->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="benefit_id" class="col-form-label">Select Benefit</label>
                                    <select name="benefit_id[]" id="benefit_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($benefits as $benefit)
                                        <option value="{{ $benefit->id }}">{{ $benefit->name }}</option>
                                    @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="concern_id" class="col-form-label">Select Concern</label>
                                    <select name="concern_id[]" id="concern_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($concerns as $concern)
                                            <option value="{{$concern->id}}">{{ucwords($concern->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-12 mb-3">
                                <div class="form-group">
                                    <label for="pack_id" class="col-form-label">Select Pack</label>
                                    <select name="pack_id[]" id="pack_id" multiple="multiple" class="form-control basic-select2">
                                        <option value="" disabled>Select One</option>
                                        @foreach ($packs as $pack)
                                            <option value="{{$pack->id}}">{{ucwords($pack->name)}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">Product<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control product_name" required placeholder="Enter name" name="name"/>
                                    <input type="hidden" class="form-control" id="slug" name="slug"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <div class="form-group">
                                        <label class="form-label">Product Image<span class="text-danger">*</span></label>
                                        <div class="product-image-upload">
                                            <div class="product-image-edit">
                                                <input type='file' name="image" required id="product-image"
                                                    accept=".png, .jpg, .jpeg" />
                                                <label for="product-image"></label>
                                            </div>
                                            <div class="product-image-preview">
                                                <div id="product-image-preview" style="background-image: url({{ asset('backend/assets/images/image-preview.png') }});" class="img-fluid img-thumbnail">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="form-label">Price<span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" required placeholder="Price"
                                               name="price" id="price"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Discount(%)</label>
                                        <input type="number" class="form-control" placeholder="Discount" name="discount_percent" id="discount" value="0"/>
                                        
                                        <input type="hidden" class="form-control" name="discount_amount" id="discount_amount" value="0"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Discounted Price</label>
                                        <input type="number" class="form-control" readonly placeholder="Discounted Price" name="discount_price" id="discounted_price" value="0"/>
                                    </div>
                                   
                                </div>
                            </div>
                            
                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">Short Description</label>
                                    <textarea name="short_description" class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="is_free_delivery" value="1" id="is_free_delivery">
                                        <label class="form-check-label" for="is_free_delivery">Is Free Delivery</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Select Variation Type</label>
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="variation_type" value="size" id="size" checked>
                                            <label class="form-check-label" for="size">Size</label>
                                        </div>
                                        <div class="form-check form-check-success">
                                            <input class="form-check-input" type="radio" name="variation_type" value="shade" id="shade">
                                            <label class="form-check-label" for="shade">Shade</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="card product-size-section">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="size_id" class="col-form-label">Select Size</label>
                                            <select name="size_id[]" id="size_id" multiple="multiple" class="form-control basic-select2" onchange="changeSize()">
                                                <option value="" disabled>Select One</option>
                                                @foreach ($sizes as $size)
                                                    <option value="{{ $size->id }}">{{ $size->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div id="dynamic-rows-container-size-section">
                                            <!-- New rows will be appended here -->
                                        </div>
                                    </div>
                                </div>

                                <div class="card product-image-section">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="shade_id" class="col-form-label">Select Shade</label>
                                            <select name="shade_id[]" id="shade_id" multiple="multiple" class="form-control basic-select2" onchange="changeShade()">
                                                <option value="" disabled>Select One</option>
                                                @foreach ($shades as $shade)
                                                    <option value="{{ $shade->id }}">{{ $shade->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div id="dynamic-rows-container-shade-section">
                                            <!-- New rows will be appended here -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea name="description" id="editor" class="ck_ed_tor"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">Ingredient Description</label>
                                    <textarea name="ingredient_description" id="editor3" class="ck_ed_tor"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">FAQ</label>
                                    <textarea name="faq" class="ck_ed_tor" id="editor1"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group">
                                    <label class="form-label">How to Use</label>
                                    <textarea name="how_to_use" class="ck_ed_tor" id="editor2"></textarea>
                                </div>
                            </div>
                            <!--end::Col-->
                        </div>
                    </div>
                    <!--end::Card Body-->

                    <!--begin::Card Footer-->
                    <div class="card-footer">
                        <div class="col-sm-12 col-12">
                            <button type="submit" class="btn btn-success btn-sm">Submit</button>
                        </div>
                    </div>
                    <!--end::Card Footer-->
                </form>
                <!--end::Form-->
            </div>
        </div>
    </div>
@endsection

@push('scripts')

<script>
    $(document).ready(function() {
        $('.product_name').on('input', function() {
            var productName = $(this).val();
            var timestamp = Date.now();
            var slug = generateSlug(productName) + '-' + timestamp;
            $('#slug').val(slug);
        });
    });

    function generateSlug(text) {
        return text.toLowerCase().trim()
            .replace(/\s+/g, '-')
            .replace(/&/g, '-and-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
    $(document).ready(function () {
        $('.product-image-section').hide();

        $('input[name="variation_type"]').change(function () {
            var selectedValue = $('input[name="variation_type"]:checked').attr('id');

            if (selectedValue === 'size') {
                $('.product-size-section').show();
                $('.product-image-section').hide();
                $('#shade_id').val(0).trigger('change');
                
            } else if (selectedValue === 'shade') {
                $('.product-size-section').hide();
                $('.product-image-section').show();
                $('#size_id').val(0).trigger('change');
            }
        });
    });

    function changeSize() {
        var selectedSizes = $('#size_id').val();
        $('#dynamic-rows-container-size-section').empty();

        $.each(selectedSizes, function(index, sizeId) {
            var sizeName = $('#size_id option[value="' + sizeId + '"]').text();
            var defaultPrice = $('#price').val();

            var rowHtml = '<div class="form-group">' +
                '<label for="price_' + sizeId + '" class="col-form-label">Price for ' + sizeName + '</label>' +
                '<input type="number" name="size_price[]" id="price_' + sizeId + '" class="form-control" placeholder="Enter price" value="'+defaultPrice+'">' +
                '<label for="size_image_' + sizeId + '" class="col-form-label">Image(s) for ' + sizeName + '</label>' +
                '<input type="file" name="product_size_image[' + sizeId + '][]" id="size_image_' + sizeId + '" class="form-control" multiple onchange="previewSizeImages(this, ' + sizeId + ')">' +
                '<div class="image-preview-container" id="image_preview_' + sizeId + '"></div>' +
                '</div>';

            $('#dynamic-rows-container-size-section').append(rowHtml);
        });
    }

    function previewSizeImages(input, sizeId) {
        var fileInput = input;
        var previewContainer = $('#image_preview_' + sizeId);

        if (fileInput.files && fileInput.files.length > 0) {
            for (var i = 0; i < fileInput.files.length; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    previewContainer.append('<div class="image-preview-item">' +
                        '<img src="' + e.target.result + '" alt="Image Preview" class="preview-image">' +
                        '<span class="remove-icon" onclick="removeSizeImage(' + sizeId + ', this)">&times;</span>' +
                        '</div>');
                }
                reader.readAsDataURL(fileInput.files[i]);
            }
        }
    }

    function removeSizeImage(sizeId, icon) {
        $(icon).parent().remove();
        var fileInput = $('#size_image_' + sizeId);
        fileInput.val(null);
    }

    function changeShade() {
        var selectedShades = $('#shade_id').val();
        $('#dynamic-rows-container-shade-section').empty();

        $.each(selectedShades, function(index, shadeId) {
            var shadeName = $('#shade_id option[value="' + shadeId + '"]').text();

            var defaultPrice = $('#price').val();

            var rowHtml = '<div class="form-group">' +
                '<label for="price_' + shadeId + '" class="col-form-label">Price for ' + shadeName + '</label>' +
                '<input type="number" name="shade_price[]" id="price_' + shadeId + '" class="form-control" placeholder="Enter price" value="'+defaultPrice+'">' +
                '<label for="shade_image_' + shadeId + '" class="col-form-label">Image(s) for ' + shadeName + '</label>' +
                '<input type="file" name="product_shade_image[' + shadeId + '][]" id="shade_image_' + shadeId + '" class="form-control" multiple onchange="previewShadeImages(this, ' + shadeId + ')">' +
                '<div class="image-preview-container" id="shade_image_preview_' + shadeId + '"></div>' +
                '</div>';

            $('#dynamic-rows-container-shade-section').append(rowHtml);
        });
    }

    function previewShadeImages(input, shadeId) {
        var fileInput = input;
        var previewContainer = $('#shade_image_preview_' + shadeId);

        if (fileInput.files && fileInput.files.length > 0) {
            for (var i = 0; i < fileInput.files.length; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    previewContainer.append('<div class="image-preview-item">' +
                        '<img src="' + e.target.result + '" alt="Image Preview" class="preview-image">' +
                        '<span class="remove-icon" onclick="removeShadeImage(' + shadeId + ', this)">&times;</span>' +
                        '</div>');
                }
                reader.readAsDataURL(fileInput.files[i]);
            }
        }
    }

    function removeShadeImage(shadeId, icon) {
        $(icon).parent().remove();
        var fileInput = $('#shade_image_' + shadeId);
        fileInput.val(null);
    }

    $(document).ready(function () {
        $("#product-image").change(function () {
            var input = this;

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#product-image-preview").css(
                        "background-image",
                        "url(" + e.target.result + ")"
                    );
                    $("#product-image-preview").hide();
                    $("#product-image-preview").fadeIn(650);
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    });

    function productImage(sl) {
        var input = $('.product_image_' + sl);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#product-image-preview-" + sl).css(
                    "background-image",
                    "url(" + e.target.result + ")"
                );
                $("#product-image-preview-" + sl).hide();
                $("#product-image-preview-" + sl).fadeIn(650);
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    };
        

    //submenu dependency
    $(document).ready(function () {
        $('select[name="category_id"]').on('change', function () {
            var category_id = $(this).val();
            var csrf_token = $('[name="csrf-token"]').attr("content");
            
            if (category_id) {
                $.ajax({
                    url: "{{ route('get_sub_category')}}",
                    type: "GET",
                    dataType: "json",
                    data: {
                        category_id: category_id,
                        _token: csrf_token,
                    },
                    success: function (data) {
                        var d = $('select[name="sub_category_id"]').empty();
                        var f = $('select[name="sub_sub_category_id"]').empty();
                        $('select[name="sub_category_id"]').append('<option value="" selected>==Select==</option>');
                        $('select[name="sub_sub_category_id"]').append('<option value="" selected>==Select==</option>');

                        $.each(data, function (key, value) {
                            $('select[name="sub_category_id"]').append(
                                '<option value="' +
                                value.id + '">' + value
                                    .name + '</option>');
                        });
                    },
                });
            } else {
                alert('danger');
            }
        });
    });

    $(document).ready(function () {
        var category_id = $(this).val();
        $('select[name="sub_category_id"]').on('change', function () {
            var sub_category_id = $(this).val();
            var csrf_token = $('[name="csrf-token"]').attr("content");

            if (sub_category_id) {
                $.ajax({
                    url: "{{ route('get_sub_sub_category')}}",
                    type: "GET",
                    dataType: "json",
                    data: {
                        sub_category_id: sub_category_id,
                        _token: csrf_token,
                    },
                    success: function (data) {
                        var d = $('select[name="sub_sub_category_id"]').empty();
                        $('select[name="sub_sub_category_id"]').append(
                            '<option value="" selected>==Select==</option>');
                        $.each(data, function (key, value) {
                            $('select[name="sub_sub_category_id"]').append(
                                '<option value="' +
                                value.id + '">' + value
                                    .name + '</option>');
                        });
                    },
                });
            } else {
                alert('danger');
            }
        });
    });

    //for discount price
    $(function () {
        $("#price, #discount").on("keydown keyup", sum);

        function sum() {
            var price = Number($("#price").val());
            var discount = Number($("#discount").val());
            var discounted_price = (price * discount) / 100;
            if (discount > 0) {
                $("#discount_amount").val(Number(discounted_price));
                $("#discounted_price").val(Number(price - discounted_price));
            }
        }
    });
</script>
<script>
    ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } );
    ClassicEditor
        .create( document.querySelector( '#editor1' ) )
        .catch( error => {
            console.error( error );
        } );
    ClassicEditor
        .create( document.querySelector( '#editor2' ) )
        .catch( error => {
            console.error( error );
        } );
    ClassicEditor
        .create( document.querySelector( '#editor3' ) )
        .catch( error => {
            console.error( error );
        } );
</script>

@endpush
