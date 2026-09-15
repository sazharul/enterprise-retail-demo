@extends('layouts.app')
@section('title', 'Create Combo Product')

@section('content')
    <div class="main-content">
        
         <!--begin::Validation Message-->
         @include('include.validation-message')
         <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h6 class="mb-0">Create New Combo Product</h6>
                    </div>
                    <div class="col-6">
                        <a href="{{ route('combo_product.index') }}" class="btn btn-sm btn-primary" style="float: right" title="Back"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a>
                    </div>
                </div>
            </div>

            <!--begin::Card Body-->
            <form action="{{ route('combo_product.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                
                <input type="hidden" id="size_shade_wise_price" value="{{route('product.size_shade_wise_price')}}">
                <input type="hidden" id="multiple_variant_wise_price_url" value="{{route('product.multiple_variant_wise_price')}}">
                <input type="hidden" id="get_products_by_id_url" value="{{ route('product.get_products_by_id') }}">
                <input type="hidden" id="get_products_url" value="{{ route('product.get_products')}}">
                
                
                
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="form-group mb-2">
                                <label for="name" class="">Combo Product Name<span class="text-danger">*</span></label>
                                <input type="text" class="form-control combo_product_name" name="name" required placeholder="Combo Product Name">
                                <input type="hidden" class="combo_product_slug" name="slug">
                                <input type="hidden" name="original_price" id="total_original_price">
                                <input type="hidden" name="discounted_price" id="total_discounted_price">
                            </div>
                            <div class="form-group mb-2">
                                <label class="form-label">Image<span class="text-danger">*</span></label>
                                <div class="product-image-upload" style="height: 130px;">
                                    <div class="product-image-edit">
                                        <input type='file' name="image" required id="product-image"
                                            accept=".png, .jpg, .jpeg" />
                                        <label for="product-image"></label>
                                    </div>
                                    <div class="product-image-preview" style="height: 130px;">
                                        <div id="product-image-preview" style="background-image: url({{ asset('backend/assets/images/image-preview.png') }});" class="img-fluid img-thumbnail">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="is_optional" value="1" id="is_optional" onclick="isOptional()">
                                    <label class="form-check-label" for="is_optional">Is Optional</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="form-group mb-2">
                                <label for="description" class="">Description</label>
                                <textarea class="form-control" name="description" id="description" rows="2" placeholder="Description">{{ old('description') }}</textarea>
                            </div>

                            <div class="form-group mb-2">
                                <label for="images" class="">Multiple Images</label>
                                <input type="file" name="images[]" multiple id="images" class="form-control"  onchange="previewImages(this)">
                                <div class="image-preview-container" id="image_preview"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive mt-4 table_customize">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>Product Name<span class="text-danger">*</span></th>
                                    <th width="20%">Variant</th>
                                    <th width="5%" class="showHide">Quantity</th>
                                    <th width="15%" class="showHide">Price</th>
                                    <th width="5%">Action</th>
                                </tr>
                            </thead>
                            <tbody id="addComboProductItem" data-count="1">
                                <tr data-row-index="1">
                                    <td rowspan="">
                                        <select name="product_id[]" id="product_id_1" onchange="productInfo(this, 1)" class="product_id form-control basic-select2 product_id_1">
                                            <option value="" selected>Select Product</option>
                                        </select>
                                        <input type="hidden" name="product_name[]" class="product_name_1"/>
                                        <input type="hidden" name="variant_type[]" class="variant_type_1">
                                        <div id="dynamic-rows-container-section-1">
                                            <!-- New rows will be appended here -->
                                        </div>
                                    </td>
                                    <td class="variant_td_1">

                                    </td>
                                    <td class="showHide">
                                        <input type="number" class="form-control text-end quantity_1 product_quantity" placeholder="0.00" value="1"/>
                                    </td>
                                    <td class="showHide">
                                        <input type="number" id="price_1" class="form-control discounted_price price_1 text-end" placeholder="0.00" on value="0.00" onkeyup="totalPrice(1);" onchange="totalPrice(1);"/>
                                        
                                        <input type="hidden" class="original_price original_price_1"/>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4" class="t_foot"></td>
                                    <td>
                                        <button type="button" class="btn btn-info btn-sm" onclick="add_new_row('addComboProductItem')">
                                            <i class="fa fa-plus text-white"></i>
                                        </button>
                                    </td>
                                </tr>
                                
                            </tfoot>
                        </table>
                    </div>
                </div>
                <!--begin::Card Footer-->
                <div class="card-footer">
                    <div class="col-sm-12 col-12">
                        <button type="submit" class="btn btn-success btn-sm">Submit</button>
                    </div>
                </div>
                <!--end::Card Footer-->
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')

<script>
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
    $(document).ready(function() {
        $('.combo_product_name').on('input', function() {
            var productName = $(this).val();
            var timestamp = Date.now();
            var slug = generateSlug(productName) + '-' + timestamp;
            $('.combo_product_slug').val(slug);
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

    function previewImages(input) {
        var fileInput = input;
        var previewContainer = $('#image_preview');

        if (fileInput.files && fileInput.files.length > 0) {
            for (var i = 0; i < fileInput.files.length; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    previewContainer.append('<div class="image-preview-item">' +
                        '<img src="' + e.target.result + '" alt="Image Preview" class="preview-image">' +
                        '<span class="remove-icon" onclick="removeImage(this)">&times;</span>' +
                        '</div>');
                }
                reader.readAsDataURL(fileInput.files[i]);
            }
        }
    }

    function removeImage(icon) {
        $(icon).parent().remove();
        var fileInput = $('#images');
        fileInput.val(null);
    }

    $(document).ready(function () {
        getProducts(1);
    });

    function getProducts(count) {
        var csrf_token = $('[name="csrf-token"]').attr("content");
        var url = $('#get_products_url').val();
        
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrf_token,
            },
            success: function (data) {
                var productSelect = $('.product_id_'+count);
                $.each(data, function (key, value) {
                    productSelect.append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            },
        });
    }

    function productInfo(input_ref, count){
        var $input = $(input_ref);
        var rowIndex = $input.closest('tr').length ? $input.closest('tr').attr('data-row-index') : null;

        var csrf_token = $('[name="csrf-token"]').attr("content");
        var product_id = $('#product_id_' + count).find(":selected").val();
        var isOptional = $('#is_optional').is(':checked');
        var url = $('#get_products_by_id_url').val();

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrf_token,
                id: product_id,
            },
            success: function (data) {
                $(`.product_id_${rowIndex}`).val(data.product.id);
                $(`.product_name_${rowIndex}`).val(data.product.name);
                
                var variantCell = $(`.variant_td_${rowIndex}`);
                if (data.size_names && data.size_names.length > 0) {
                    var selectElement = $('<select data-type="size" id="size_id_'+rowIndex+'" class="form-control basic-select2 variant_'+rowIndex+' size_id_'+rowIndex+'">');
                        
                    if (isOptional) {
                        selectElement.attr('multiple', 'multiple');
                        selectElement.attr('onchange', 'multipleVariant('+rowIndex+', '+data.product.id+')');
                        selectElement.append('<option value="" disabled>Select One</option>');
                    }else{
                        selectElement.attr('onchange', 'shadeSizeWisePrice('+rowIndex+', '+data.product.id+',  this.value)');
                        selectElement.append('<option value="" selected disabled>Select One</option>');
                    }
                    
                    $.each(data.size_names, function(index, option) {
                        selectElement.append($('<option>', {
                            value: option.id,
                            text: option.name
                        }));
                    });
                    
                    variantCell.html(selectElement);
                    selectElement.select2();
                    var variant_type = "size";
                    $(`.variant_type_${rowIndex}`).val(variant_type);
                } else {
                    var selectElement = $('<select data-type="shade" id="shade_id_'+rowIndex+'" class="form-control basic-select2 variant_'+rowIndex+' shade_id_'+rowIndex+'">');

                    if (isOptional) {
                        selectElement.attr('multiple', 'multiple');
                        selectElement.attr('onchange', 'multipleVariant('+rowIndex+', '+data.product.id+')');
                        selectElement.append('<option value="" disabled>Select One</option>');
                    }else{
                        selectElement.attr('onchange', 'shadeSizeWisePrice('+rowIndex+', '+data.product.id+',  this.value)');
                        selectElement.append('<option value="" selected disabled>Select One</option>');
                    }

                    $.each(data.shade_names, function(index, option) {
                        selectElement.append($('<option>', {
                            value: option.id,
                            text: option.name
                        }));
                    });

                    
                    variantCell.html(selectElement);
                    selectElement.select2();
                    var variant_type = "shade";
                    $(`.variant_type_${rowIndex}`).val(variant_type);
                }

                nameAttributeAdd(rowIndex)
            },
        });
    }
    
    function multipleVariant(sl, product_id){
        var variant_type = $('.variant_'+sl).data('type');
        var selectedValues = variant_type == 'shade' ? $('#shade_id_'+sl).val() : $('#size_id_'+sl).val();
        var url = $('#multiple_variant_wise_price_url').val();
        var csrf_token = $('[name="csrf-token"]').attr("content");

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrf_token,
                product_id: product_id,
                variant_ids: selectedValues,
                variant_type: variant_type,
            },
            success: function (data) {
                
                $('#dynamic-rows-container-section-'+sl).empty();
                $.each(selectedValues, function(index, value) {
                    var name = variant_type == 'shade' ? $('#shade_id_' + sl + ' option[value="' + value + '"]').text() : $('#size_id_' + sl + ' option[value="' + value + '"]').text();
                    
                    var defaultQuantity = 1;
                    
                    var defaultPrice = variant_type == 'shade' ? data[index].shade_price : data[index].size_price;

                    var rowHtml = '<div class="form-group row">' +
                        '<div class="col-md-5 col-6">' +
                            '<label for="quantity_' + value + '_' + sl + '" class="col-form-label">Quantity for ' + name + '</label>' +
                            '<input type="number" name="quantity['+ sl +'][]" id="quantity_' + value + '_' + sl + '" class="form-control quantity_opt_'+ sl +'" placeholder="Enter Quantity" value="' + defaultQuantity + '">' +
                        '</div>' +
                        '<div class="col-md-5 col-6">' +
                            '<label for="price_' + value + '_' + sl + '" class="col-form-label">Price for ' + name + '</label>' +
                            '<input type="number" name="price['+ sl +'][]" id="price_' + value + '_' + sl + '" class="form-control discounted_price price_opt_'+sl+'" onkeyup="totalPrice(' + sl + ');" onchange="totalPrice(' + sl + ');" placeholder="Enter price" value="' + defaultPrice + '">' +

                            '<input type="hidden" name="actual_price['+ sl +'][]" class="original_price original_price_'+sl+'" original_price_opt_'+sl+'" value="' + defaultPrice + '">' +

                        '</div>' +
                    '</div>';
                    $('#dynamic-rows-container-section-'+sl).append(rowHtml);
                    totalPrice(sl);
                });
            },
        });
    }

    function shadeSizeWisePrice(sl, product_id, variantID){

        var csrf_token = $('[name="csrf-token"]').attr("content");
        var url = $('#size_shade_wise_price').val();
        var variantType = $('.variant_'+sl).data('type');

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrf_token,
                product_id: product_id,
                variant_id: variantID,
                variant_type: variantType,
            },
            success: function (data) {
                
                if (variantType == 'shade') {
                    $('#price_'+sl).val(data.shade_price)
                    $('.original_price_'+sl).val(data.shade_price)
                    totalPrice(sl)
                }else{
                    $('#price_'+sl).val(data.size_price)
                    $('.original_price_'+sl).val(data.size_price)
                    totalPrice(sl)
                }

                nameAttributeAdd(sl);
                
            },
        });
    }

    function nameAttributeAdd(sl) {
        var isOptional = $('#is_optional').is(':checked');
        if (isOptional) {
            $('.quantity_opt_'+sl).attr('name', 'quantity['+sl+'][]');
            $('.price_opt_'+sl).attr('name', 'price['+sl+'][]');
            $('.original_price_opt_'+sl).attr('name', 'actual_price['+sl+'][]');
            $('.shade_id_'+sl).attr('name', 'variation_id['+sl+'][]');
            $('.size_id_'+sl).attr('name', 'variation_id['+sl+'][]');
        }else{
            $('.quantity_'+sl).attr('name', 'quantity[]');
            $('.price_'+sl).attr('name', 'price[]');
            $('.original_price_'+sl).attr('name', 'actual_price[]');
            $('.shade_id_'+sl).attr('name', 'variation_id[]');
            $('.size_id_'+sl).attr('name', 'variation_id[]');
        }
        
    }
    
    
    function isOptional() {
        resetProductList();
        var isOptional = $('#is_optional').is(':checked');
        if (isOptional) {
            $('.showHide').hide();
            $('.t_foot').attr('colspan', 2);
        } else {
            $('.showHide').show();
            $('.t_foot').attr('colspan', 4);
        }
    };

    // add new data to row or create new row
    function add_new_row(target) {
        var isOptional = $('#is_optional').is(':checked');
        if (isOptional) {
            $('.showHide').hide();
            $('.t_foot').attr('colspan', 2);
        } else {
            $('.showHide').show();
            $('.t_foot').attr('colspan', 4);
        }

        var row = $("#addComboProductItem tr").length;
        var rowIndex = row + 1;
        var a = "product_name_" + rowIndex,
            e = document.createElement("tr");
            

        e.setAttribute('data-row-index', rowIndex);
        e.innerHTML =
            // row: product name and id
            `<td>
                <select name="product_id[]" id="product_id_${rowIndex}" onchange="productInfo(this, ${rowIndex})" class="form-control basic-select2 product_id_${rowIndex}">
                    <option value="" selected>Select Product</option>
                </select>
                <input type="hidden" name="product_name[]" class="product_name_${rowIndex}"/>
                <input type="hidden" name="variant_type[]" class="variant_type_${rowIndex}">
                <div id="dynamic-rows-container-section-${rowIndex}">
                </div>
            </td>` +
            `<td class="variant_td_${rowIndex}">
    
            </td>` +
            `<td class="showHide">
                <input type="number" class="quantity_${rowIndex} product_quantity form-control form-number-input text-end" placeholder="0.00" value="1" min="0" required/>
            </td>`+

            // row: rate
            `<td class="showHide">
                <input type='number' class='price_${rowIndex} discounted_price form-control form-number-input text-end' placeholder='0.00' id="price_${rowIndex}" onkeyup="totalPrice(${rowIndex});" onchange="totalPrice(${rowIndex});" required min='0' value="0.00"/>
                <input type='hidden' class='original_price original_price_${rowIndex} original_price_opt_${rowIndex}' />
            </td>` +
 

            // row: action (delete row)
            `<td>
                <button type='button' class='btn btn-danger btn-sm text-end' value='Delete' onclick='deleteRow(this)'>
                    <i class='fa fa-close'></i>
                </button>
            </td>`;

        document.getElementById(target).appendChild(e);

        getProducts(rowIndex);
        totalPrice(rowIndex)

        $(".basic-select2").select2({
            placeholder: "Select Product"
        });
        
        // update new rowIndex
        $("#addComboProductItem").attr("data-count", rowIndex);
        
        if (isOptional) {
            $(".showHide").hide();
        } else {
            $(".showHide").show();
        }

        return rowIndex;
    }

    //reset product list
    function resetProductList() {
        $('#addComboProductItem').html('');

        // var html = `
        // <tr data-row-index="1">
        //                             <td rowspan="">
        //                                 <select name="product_id[]" id="product_id_1" onchange="productInfo(this, 1)" class="product_id form-control basic-select2 product_id_1">
        //                                     <option value="" selected>Select Product</option>
        //                                 </select>
        //                                 <input type="hidden" name="product_name[]" class="product_name_1"/>
        //                                 <input type="hidden" name="variant_type[]" class="variant_type_1">
        //                                 <div id="dynamic-rows-container-section-1">
        //                                     <!-- New rows will be appended here -->
        //                                 </div>
        //                             </td>
        //                             <td class="variant_td_1">

        //                             </td>
        //                             <td class="showHide">
        //                                 <input type="number" class="form-control text-end quantity_1 product_quantity" placeholder="0.00" value="1"/>
        //                             </td>
        //                             <td class="showHide">
        //                                 <input type="number" id="price_1" class="form-control discounted_price price_1 text-end" placeholder="0.00" on value="0.00" onkeyup="totalPrice(1);" onchange="totalPrice(1);"/>
                                        
        //                                 <input type="hidden" class="original_price original_price_1"/>
        //                             </td>
        //                             <td></td>
        //                         </tr>
        // `;

        // // Append the HTML with attributes
        // $('#addComboProductItem').append(html);

        // // Set attribute data-count to 1
        // $("#addComboProductItem").attr("data-count", 1);
    }

    //Delete row
    ("use strict");
    function deleteRow(e) {

        var t = $("#addComboProductItem > tr").length;

        if (1 == t) {
            Swal.fire({
                title: "Alert Information",
                text: "There only one row you can't delete.",
                icon: 'warning',
            })
            return
        }
        else {
            var a = e.parentNode.parentNode;
            a.parentNode.removeChild(a);
            totalPrice(sl)
        }
    }

    ("use strict");
    function totalPrice(sl) {

        var original_price = 0;
        var discounted_price = 0;
        
        $(".original_price").each(function () {
            isNaN(this.value) || 0 == this.value.length || (original_price += parseFloat(this.value));
        });
        $(".discounted_price").each(function () {
            isNaN(this.value) || 0 == this.value.length || (discounted_price += parseFloat(this.value));
        });

        $("#total_original_price").val(original_price.toFixed(2, 2));
        $("#total_discounted_price").val(discounted_price.toFixed(2, 2));
    }
   
</script>
@endpush