$(document).ready(function() {
    $('#searchInput').on('keyup', function() {
        var value = $(this).val();
        var url = $(this).data('route');
        var productCardURL = $('.productCard').data('route');
        var csrf_token = $('[name="csrf-token"]').attr("content");
        
        $.ajax({
            type: "get",
            url: url,
            data: {
                _token: csrf_token,
                search: value,
            },
            success: function(data) {
                resetModalFormValue();
                $('#productItemsContainer .row').empty();

                if (Array.isArray(data)) {
                    data.forEach(function(product) {
                        appendProductItem(product, productCardURL);
                    });
                } else if (typeof data === 'object') {
                    Object.values(data).forEach(function(product) {
                        appendProductItem(product, productCardURL);
                    });
                }
            }
        });

    });
});

$(document).ready(function() {
    $('#categorySelect, #brandSelect').change(filterProducts);
});

function filterProducts() {
    var categoryId = $('#categorySelect').val();
    var brandId = $('#brandSelect').val();
    var productCardURL = $('.productCard').data('route');
    var url = $(this).data('route');

    var csrf_token = $('[name="csrf-token"]').attr("content");

    $.ajax({
        type: 'get',
        url: url,
        data: {
            category_id: categoryId,
            brand_id: brandId,
            _token: csrf_token,
        },
        success: function(data) {
            resetModalFormValue();
            $('#productItemsContainer .row').empty();

            if (Array.isArray(data)) {
                data.forEach(function(product) {
                    appendProductItem(product, productCardURL);
                });
            } else if (typeof data === 'object') {
                Object.values(data).forEach(function(product) {
                    appendProductItem(product, productCardURL);
                });
            }
        }
    });
}

function appendProductItem(product, productCardURL) {
    var baseURL = $('#baseURL').data('url');

    function fileExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    var productImage = product.image && fileExists(`${baseURL}/${product.image}`) ? `${baseURL}/${product.image}` : `${baseURL}/admin/assets/images/carousel/element-banner2-right.jpg`;


    var productItem = `
        <div class="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-6">
            <div class="productCard" data-product_id="${product.id}" data-route="${productCardURL}" onclick="showModalData('${productCardURL}', '${product.id}')">
                <div class="productThumb" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                    <img class="img-fluid w-100 h-100" src="${productImage}" alt="Product Image">
                </div>
                <div class="productContent" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                    <a href="javascript:void(0)">${product.name}</a>
                </div>
                <span class="productPrice">${product.price}</span>
            </div>
        </div>
    `;
    $('#productItemsContainer .row').append(productItem);
}

function showModalData(url, id){
    resetModalFormValue();
    var csrf_token = $('[name="csrf-token"]').attr("content");
    $.ajax({
        type: "get",
        url: url,
        data: {
            _token: csrf_token,
            id: id,
        },
        success: function(data) {
            resetModalFormValue();
            $('#loading').hide();

            $('#product_id_modal').val(data.product.id);
            $('#product_name_modal').text(data.product.name);
            $('#product_variant_modal').text(data.product.variation_type);
            $('#stock').val(0);

            if (data.product.variation_type == 'shade') {
                $('#modal_shade').show();
                var shadeSelect = $('#shadeSelect');
                shadeSelect.empty();
                shadeSelect.append('<option value="" selected disabled>Select One</option>');
                $.each(data.shade_names, function (key, value) {
                    shadeSelect.append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            }
            if (data.product.variation_type == 'size') {
                $('#modal_size').show();
                var sizeSelect = $('#sizeSelect');
                sizeSelect.empty();
                sizeSelect.append('<option value="" selected disabled>Select One</option>');
                $.each(data.size_names, function (key, value) {
                    sizeSelect.append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            }
        }
    });
}

$('#shadeSelect').change(function(){
    var product_id = $('#product_id_modal').val();
    var shadeId = $(this).val();
    var url = $(this).data('route');
    var csrf_token = $('[name="csrf-token"]').attr("content");

    $.ajax({
        type: "get",
        url: url,
        data: {
            _token: csrf_token,
            product_id: product_id,
            shade_id: shadeId,
        },
        success: function(data) {
            console.log(data);
            $('.shade_price').val(data.shade_price);
            $('#shade_id_modal').val(data.shade.id);
            $('#shade_name_modal').text(data.shade.name);
            $('#stock').val(data.stock ?? 0);
            
            let offerBadgeHtml = '';

            if (data.upto_sale && data.upto_sale.offer && data.upto_sale.offer.name) {
                offerBadgeHtml += '<span class="text-light me-2 px-2 py-1 rounded-1" style="background: '+data.upto_sale.offer.color+'">' + data.upto_sale.offer.name + ' (Dis: '+data.upto_sale.flat_discount+'TK)' +'</span>';
            }

            if (data.free_delivery && data.free_delivery.offer && data.free_delivery.offer.name) {
                offerBadgeHtml += '<span class="text-light me-2 px-2 py-1 rounded-1" style="background: '+data.free_delivery.offer.color+'">' + data.free_delivery.offer.name + ' (Dis: '+data.free_delivery.flat_discount+'TK)' +'</span>';
            }

            if (offerBadgeHtml) {
                $('.offers_show').empty().append(offerBadgeHtml);
            } else {
                $('.offers_show').empty();
            }
            

            updateAddToCartButton(data.stock);
        }
    });
});

$('#sizeSelect').change(function(){
    var product_id = $('#product_id_modal').val();
    var sizeId = $(this).val();
    var url = $(this).data('route');
    var csrf_token = $('[name="csrf-token"]').attr("content");

    $.ajax({
        type: "get",
        url: url,
        data: {
            _token: csrf_token,
            product_id: product_id,
            shade_id: sizeId,
        },
        success: function(data) {
            $('.size_price').val(data.size_price);
            $('#size_id_modal').val(data.size.id);
            $('#size_name_modal').text(data.size.name);
            $('#stock').val(data.stock ?? 0);
            updateAddToCartButton(data.stock);
        }
    });
});

function updateAddToCartButton(stock) {
    var addToCartBtn = $('#addToCartBtn');
    if (stock > 0) {
        $('.stock_message').html('');
        addToCartBtn.removeClass('disabled').prop('disabled', false);
    } else {
        $('.stock_message').html('Stock Not Available..!!')
        addToCartBtn.addClass('disabled').prop('disabled', true);
    }
}

$(document).ready(function() {

    $('#addToCartBtn').on('click', function(event) {
        event.preventDefault();

            let itemCount = parseInt($(".productListBody").attr("data-count"));
            var productID = parseInt($('#product_id_modal').val());
            var productName = $('#product_name_modal').text();
            var variant_type = $('#product_variant_modal').text();
            var stock = parseInt($('#stock').val());

            var quantity = 1;
            var discount = 0.00;

            var price = 0;
            var variant = '';

            if (variant_type == 'shade') {
                price = parseFloat($('.shade_price').val());
                variant = $('#shade_name_modal').text();
            } else {
                price = parseFloat($('.size_price').val());
                variant = $('#size_name_modal').text();
            }

            var sizeID = $('#size_id_modal').val();
            var shadeID = $('#shade_id_modal').val();

            var existingRow = $('.productListBody tr').filter(function() {
                return $(this).find('.productID').val() == productID &&
                    ($(this).find('.sizeID').val() == sizeID || $(this).find('.shadeID').val() == shadeID);
            });

            if (existingRow.length > 0) {
                
                var existingQuantity = parseInt(existingRow.find('.product_quantity').val());
                existingRow.find('.product_quantity').val(existingQuantity + 1);

                setTimeout(function() {
                    stock_quantity_calculate(existingRow.find('.productID').attr('data-itemCount'));
                },0) ;

                
                existingRow.addClass('flash');
                calculate_store(existingRow.find('.productID').attr('data-itemCount'));

                Toast.fire({
                    icon: "success",
                    title: 'Quantity Updated..!!',
                });

                setTimeout(function() {
                    existingRow.removeClass('flash');
                }, 5000);
            } else {
                var newRow = '<tr>' +
                    '<td>' + productName + '<input type="hidden" name="product_name[]" value="' + productName + '" class=" product_name_' + itemCount + ' "><input type="hidden" name="product_id[]" value="' + productID + '" data-itemCount="' + itemCount + '" class="productID product_' + itemCount + ' "><input type="hidden" name="size[]" value="' + variant + '" class="size_name_' + itemCount + ' "><input type="hidden" name="size_id[]" value="' + sizeID + '" class="sizeID size_id_' + itemCount + ' "><input type="hidden" name="shade[]" value="' + variant + '" class="shade_name_' + itemCount + ' "><input type="hidden" name="shade_id[]" value="' + shadeID + '" class="shadeID shade_id_' + itemCount + ' "></td>' +
                    '<td>' + '<input type="number" name="quantity[]" value="' + quantity + '" class="form-control border-dark w-100px product_quantity quantity_' + itemCount + '" onkeyup="calculate_store(' + itemCount + ');stock_quantity_calculate(' + itemCount + ')" onchange="calculate_store(' + itemCount + ');stock_quantity_calculate(' + itemCount + ')"><input type="hidden" value="' + stock + '" class="stock_' + itemCount + '">' + '</td>' +
                    '<td>' + '<input type="text" value="' + variant + '" class="form-control border-dark w-100px variant_' + itemCount + ' readonly">' + '</td>' +
                    '<td>' + '<input type="number" name="price[]" value="' + price + '" class="form-control border-dark w-100px price_' + itemCount + '" onkeyup="calculate_store(' + itemCount + ');" onchange="calculate_store(' + itemCount + ');">' + '</td>' +
                    '<td>' + '<input type="number" name="discount[]" value="' + discount + '" class="form-control border-dark w-100px total_discount_amount discount_' + itemCount + '" onkeyup="calculate_store(' + itemCount + ');" onchange="calculate_store(' + itemCount + ');">' + '</td>' +
                    '<td>' + '<input type="number" value="' + price + '" class="form-control border-dark w-100px readonly total_price sub_total_' + itemCount + '" id="total_price_' + itemCount + '">' + '</td>' +
                    '<td><div class="card-toolbar text-end"><a href="javascript:void(0)" class="confirm-delete" title="Delete"><i class="fas fa-trash-alt"></i></a></div></td>' +
                    '</tr>';

                $('.productListBody').append(newRow);
                calculate_store(itemCount);
                itemCount++;

                $(".productListBody").attr("data-count", itemCount);
            }
    });

    $(document).on('click', '.confirm-delete', function(event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        calculate_store();
    });
});

function resetModalFormValue(){
    $('.shade_price').val('');
    $('.size_price').val('');
    $('#size_id_modal').val('');
    $('#size_name_modal').val('');
    $('#shade_id_modal').val('');
    $('#shade_name_modal').val('');
    $('.stock_message').html('');
    $('.offers_show').empty();
}

("use strict");
function calculate_store(sl) {

    var gr_tot = 0;
    var dis = 0;
    var qty = 0;

    var quantity = parseInt($(".quantity_" + sl).val()) ;
    var discount =  parseFloat($(".discount_" + sl).val()) ;
    var price_item =  parseFloat($(".price_" + sl).val());

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

    $("#total_discount").val(dis.toFixed(2, 2));
    $(".total_quantity").val(parseInt(qty));
    $("#grandTotal").val(grandtotal.toFixed(2, 2));
}

function stock_quantity_calculate(count) {
    var quantity = parseInt($('.quantity_' + count).val());
    var stock_quantity = parseInt($('.stock_' + count).val());

    if (parseInt(quantity) > parseInt(stock_quantity)) {
        Toast.fire({
                    icon: "error",
                    title: "You can add maximum " + stock_quantity + " Items",
                });
        $(".quantity_" + count).val(parseInt(stock_quantity));
        calculate_store(count, stock_quantity);
        return;
    }
}