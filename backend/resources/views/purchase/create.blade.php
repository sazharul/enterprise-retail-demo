@extends('layouts.app')
@section('title', 'Create Purchase')

@section('content')
    <div class="main-content">
        
         <!--begin::Validation Message-->
         @include('include.validation-message')
         <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h6 class="mb-0">Create New Purchase</h6>
                    </div>
                    <div class="col-6">
                        <a href="{{ route('purchase.index') }}" style="float: right" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                    </div>
                </div>
            </div>
            <!--begin::Card Body-->
            <form action="{{ route('purchase.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="hidden" id="size_shade_wise_price" value="{{route('product.size_shade_wise_price')}}">

                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="form-group mb-2">
                                <label for="purchase_no" class="">Purchase No.<span class="text-danger">*</span></label>
                                <input type="text" class="form-control purchase_no" name="purchase_no" readonly required placeholder="Purchase No" value="">
                            </div>
                            <div class="form-group mb-2">
                                <label for="note" class="">Note</label>
                                <textarea class="form-control" name="note" id="note" rows="2" placeholder="Note">{{ old('note') }}</textarea>
                            </div>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="form-group mb-2">
                                <label for="documents" class="">Documents</label>
                                <input type="file" name="documents[]" multiple id="documents" class="form-control"  onchange="previewImages(this)">
                                <div class="image-preview-container" id="image_preview"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive mt-4 table_customize">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>Product Name<span class="text-danger">*</span></th>
                                    <th width="13%">Variant Type</th>
                                    <th width="10%">Rate</th>
                                    <th width="5%">Quantity</th>
                                    {{-- <th width="12%">Size</th> --}}
                                    <th width="10%">Dis. Amnt</th>
                                    <th width="12%">Total</th>
                                    <th width="5%">Action</th>
                                </tr>
                            </thead>
                            <tbody id="addPurchaseItem" data-count="1">
                                <tr data-row-index="1">
                                    <td>
                                        <select name="product_id[]" id="product_id_1" onchange="productInfo(this, 1)" class="product_id form-control basic-select2 product_id_1">
                                            <option value="" selected>Select Product</option>
                                        </select>
                                        <input type="hidden" name="variant_type[]" class="variant_type_1">
                                        <input type="hidden" name="product_name[]" class="product_name_1"/>
                                    </td>
                                    <td class="variant_td_1">
                                    </td>
                                    <td>
                                        <input type="number" name="rate[]" required onkeyup="calculate_store(1);" onchange="calculate_store(1);" id="product_rate_1" class="form-control product_rate_1 text-end" placeholder="0.00" value="0.00" />
                                    </td>

                                    <td class="text-end">
                                        <input type="number" name="quantity[]" class="form-control text-end quantity_1 product_quantity" onkeyup="calculate_store(1);" onchange="calculate_store(1);" placeholder="0.00" value="1" required/>
                                    </td>
                                    
                                        {{-- <select name="shade_id[]" id="shade_id_1" class="form-control basic-select2 shade_id_1">
                                        </select> --}}
                                    
                                    {{-- <td>
                                        <select name="size_id[]" id="size_id_1" class="form-control basic-select2 size_id_1">
                                        </select>
                                    </td> --}}
                                    
                                    <td>
                                        <input type="number" step="0.01" name="discount_amount[]" id="discount_1"  onkeyup="calculate_store(1);" onchange="calculate_store(1);" class="form-control text-end total_discount_amount" min="0" value="0.00">
                                    </td>

                                    <td class="text-end">
                                        <input class="form-control total_price text-end" type="number" name="total_price[]" id="total_price_1" placeholder="0.00" value="0.00" readonly="readonly" />
                                    </td>

                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6"></td>
                                    <td>
                                        <button type="button" class="btn btn-info btn-sm" onclick="add_new_row('addPurchaseItem')">
                                            <i class="fa fa-plus text-white"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end"><b>Total Amount:</b></td>
                                    <td colspan="2" class="text-end">
                                        <input type="number" name="total_amount" id="total_amount" class="text-end form-control" placeholder="0.00" value="0.00" readonly/>

                                        <input type="hidden" name="total_discount" class="set_total_discount"/>
                                        <input type="hidden" name="total_quantity" class="set_total_quantity"/>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end"><b>Vat Amount:</b></td>
                                    <td colspan="2" class="text-end">
                                        <input type="number" id="vat_amount" onkeyup="calculate_store(1);" onchange="calculate_store(1);" class="text-end form-control" name="vat" value="0.00"/>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end"><b>Tax Amount:</b></td>
                                    <td colspan="2" class="text-end">
                                        <input type="number" id="tax_amount" onkeyup="calculate_store(1);" onchange="calculate_store(1);" class="text-end form-control" name="tax"
                                            value="0.00"/>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end"><b>Grand Total:</b></td>
                                    <td colspan="2" class="text-end">
                                        <input type="number" id="grandTotal" class="text-end form-control grandTotalamnt" name="grand_total_amount" value="0.00" readonly/>
                                    </td>
                                    <td></td>
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
        getProducts(1);
    });

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
        var fileInput = $('#documents');
        fileInput.val(null);
    }
    
    // Generate unique number For Purchase COde
    $(document).ready(function () {
        var timestamp = new Date().getTime();
        var randomNumber = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        var uniqueNumber = timestamp.toString() + randomNumber.toString();
        uniqueNumber = uniqueNumber.substring(0, 12);
        $('.purchase_no').val(uniqueNumber);
    });
    

    function getProducts(count) {
        var csrf_token = $('[name="csrf-token"]').attr("content");
        
        $.ajax({
            url: "{{ route('product.get_products')}}",
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

    ("use strict");
    function calculate_store(sl) {

        var gr_tot = 0;
        var dis = 0;
        var qty = 0;

        var quantity =  $(".quantity_" + sl).val();
        var discount = $("#discount_" + sl).val();
        var price_item =  $("#product_rate_" + sl).val();

        var vat =  $("#vat_amount").val() ?? 0;
        var tax =  $("#tax_amount").val() ?? 0;

        if (quantity > 0) {
            var price = quantity * price_item;
            var discountPrice = (price - discount);
            $("#total_price_" + sl).val(parseFloat(discountPrice).toFixed(2, 2));
        }

        //Total Price
        $(".total_price").each(function () {
            isNaN(this.value) || 0 == this.value.length || (gr_tot += parseFloat(this.value));
        });

        //Total Discount
        $(".total_discount_amount").each(function () {
            isNaN(this.value) || 0 == this.value.length || (dis += parseFloat(this.value));
        }),

        //Total Quantity
        $(".product_quantity").each(function () {
            isNaN(this.value) || 0 == this.value.length || (qty += parseFloat(this.value));
        }),
        
        $("#total_amount").val(gr_tot.toFixed(2, 2));

        var grandtotal = parseFloat(gr_tot) + (parseFloat(vat) + parseFloat(tax));

        $(".set_total_discount").val(dis.toFixed(2, 2));
        $(".set_total_quantity").val(qty.toFixed(2, 2));
        $("#grandTotal").val(grandtotal.toFixed(2, 2));

       
    }

    function productInfo(input_ref, count){
        var $input = $(input_ref);
        var rowIndex = $input.closest('tr').length ? $input.closest('tr').attr('data-row-index') : null;

        var csrf_token = $('[name="csrf-token"]').attr("content");
        var product_id = $('#product_id_' + count).find(":selected").val();
        $.ajax({
            url: "{{ route('product.get_products_by_id') }}",
            type: "GET",
            dataType: "json",
            data: {
                _token: csrf_token,
                id: product_id,
            },
            success: function (data) {
                $(`.product_id_${rowIndex}`).val(data.product.id);
                $(`.product_rate_${rowIndex}`).val(0);
                $(`.product_name_${rowIndex}`).val(data.product.name);
                
                // if (data.size_names) {
                //     var sizeDropdown = $(`.size_id_${rowIndex}`);
                //     sizeDropdown.empty();
                //     sizeDropdown.append('<option value="" selected>Select Size</option>');
                //     $.each(data.size_names, function (index, size) {
                //         sizeDropdown.append($('<option>', {
                //             value: size.id,
                //             text: size.name
                //         }));
                //     });
                // }

                // if (data.shade_names) {
                //     var productShade = $(`.shade_id_${rowIndex}`);
                //     productShade.empty();
                //     productShade.append('<option value="" selected>Select Shade</option>');
                //     $.each(data.shade_names, function (index, shade) {
                //         productShade.append($('<option>', {
                //             value: shade.id,
                //             text: shade.name
                //         }));
                //     });
                // }
                
                var variantCell = $(`.variant_td_${rowIndex}`);
                if (data.size_names && data.size_names.length > 0) {
                    var selectElement = $('<select data-type="size" name="variant_id[]" id="size_id_'+rowIndex+'" class="form-control basic-select2 variant_'+rowIndex+' size_id_'+rowIndex+'">');
                        
                    selectElement.attr('onchange', 'shadeSizeWisePrice('+rowIndex+', '+data.product.id+',  this.value)');
                    selectElement.append('<option value="" selected disabled>Select One</option>');
                    
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
                    var selectElement = $('<select data-type="shade" name="variant_id[]" id="shade_id_'+rowIndex+'" class="form-control basic-select2 variant_'+rowIndex+' shade_id_'+rowIndex+'">');

                    selectElement.attr('onchange', 'shadeSizeWisePrice('+rowIndex+', '+data.product.id+',  this.value)');
                    selectElement.append('<option value="" selected disabled>Select One</option>');
                    

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
                calculate_store(rowIndex);
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
                    $('#product_rate_'+sl).val(data.shade_price)
                    calculate_store(sl)
                }else{
                    $('#product_rate_'+sl).val(data.size_price)
                    calculate_store(sl)
                }
            },
        });
    }
    // add new data to row or create new row
    function add_new_row(target) {
        var row = $("#addPurchaseItem tr").length;
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
                <input type="hidden" name="variant_type[]" class="variant_type_${rowIndex}">
                <input type="hidden" name="product_name[]" class="product_name_${rowIndex}"/>
            </td>` +

            `<td class="variant_td_${rowIndex}">
            </td>` +
            
            // row: rate
            `<td>
                <input type='number' name='rate[]' onkeyup='calculate_store(${rowIndex});' onchange='calculate_store(${rowIndex});' id='product_rate_${rowIndex}' class='product_rate_${rowIndex} form-control form-number-input text-end' placeholder='0.00' required min='0' value="0.00"/>
            </td>` +

            `<td>
                <input type="number" name="quantity[]" onkeyup="calculate_store(${rowIndex})" onchange="calculate_store(${rowIndex})" class="quantity_${rowIndex} product_quantity form-control form-number-input text-end" placeholder="0.00" value="1" min="0" required/>
            </td>`+

            // `<td>
            //     <select name="shade_id[]" id="shade_id_${rowIndex}" class="form-control basic-select2 shade_id_${rowIndex}">
            //     </select>
            // </td>` +
            
            // `<td>
            //     <select name="size_id[]" id="size_id_${rowIndex}" class="form-control basic-select2 size_id_${rowIndex}">
            //     </select>
            // </td>` +
                
            `<td>
                <input type="number" step="0.01" id="discount_${rowIndex}" class="form-control text-end total_discount_amount" name="discount_amount[]" onkeyup="calculate_store(${rowIndex});" onchange="calculate_store(${rowIndex});" placeholder="0.00" min="0" value="0.00">
            </td>` +

            // row: total price
            `<td class='text-end'>
                <input type='number' step='0.01' class='form-control text-end total_price total_price_${rowIndex}' name='total_price[]' id='total_price_${rowIndex}' value='0.00' readonly='readonly'/>
            </td>` +

            // row: action (delete row)
            `<td>
                <button type='button' class='btn btn-danger btn-sm text-end' value='Delete' onclick='deleteRow(this)'>
                    <i class='fa fa-close'></i>
                </button>
            </td>`;

        document.getElementById(target).appendChild(e);
        getProducts(rowIndex);

        $(".basic-select2").select2({
            placeholder: "Select Product"
        });
        
        // update new rowIndex
        $("#addPurchaseItem").attr("data-count", rowIndex);

        calculate_store(rowIndex);
        return rowIndex;
    }
    
    //Delete row
    ("use strict");
    function deleteRow(e) {

        var t = $("#addPurchaseItem > tr").length;

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
        }

        calculate_store();
    }
   
</script>
@endpush