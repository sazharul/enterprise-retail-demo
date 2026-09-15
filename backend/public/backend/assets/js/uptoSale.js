var table = $("#uptosale").DataTable();
var checkedData = [];
$(document).ready(function () {
    $(".percent_discount").on("onchange", function () {
        let existing_price = $(this).closest("tr").find(".price").html();
        let percentDiscount = $(this).val();
        let exact_discount = (parseInt(existing_price) * percentDiscount) / 100;
        $(this)
            .closest("tr")
            .find(".flat_discount")
            .val(exact_discount.toFixed(2));
        let current_price = parseInt(existing_price) - exact_discount;
        $(this)
            .closest("tr")
            .find(".current_price_input")
            .val(current_price.toFixed(2));
    });

    $(".flat_discount").on("onchange", function () {
        let existing_price = $(this).closest("tr").find(".price").html();
        let exactDiscount = $(this).val();
        let percentDiscount = (exactDiscount * 100) / parseInt(existing_price);
        $(this)
            .closest("tr")
            .find(".percent_discount")
            .val(percentDiscount.toFixed(2));
        let current_price = parseInt(existing_price) - exactDiscount;
        $(this)
            .closest("tr")
            .find(".current_price_input")
            .val(current_price.toFixed(2));
    });

    // Handle discount type change
    $('input[name="is_percentage"]').on("change", function () {
        updateCurrentAmount();
    });

    // Handle discount amount change
    $("#discountAmount").on("input", function () {

        updateCurrentAmount();
    });

    $(document).on("change", ".percent_discount, .flat_discount, .current_price_input", function () {
        updateRow(this);

    });


    $("#offerform").submit(function (e) {
        e.preventDefault();
        // Convert the checkedData array to JSON
        var checkedDataJson = JSON.stringify(checkedData);

        // Add a hidden input field to the form and set its value to the JSON data
        $("<input>")
            .attr({
                type: "hidden",
                name: "checked_data",
                value: checkedDataJson,
            })
            .appendTo("#offerform");

        // Now submit the form
        this.submit();
    });
});


function selectAllCheckboxes() {
    var selectAllCheckbox = document.getElementById('selectAll');
    var isChecked = selectAllCheckbox.checked;


    table.rows({
        page: "all",
    }).nodes().to$().find('input[type="checkbox"]').each(function () {
        var checkbox = this;
        var row = $(checkbox).closest('tr');

        var rowData = {
            product_id: row.find(".checkbox").val(),
            percent_discount: row.find(".percent_discount").val(),
            flat_discount: row.find(".flat_discount").val(),
            discounted_price: row.find(".current_price_input").val(),
            product_size_id: row.find(".size_id").val(),
            product_shade_id: row.find(".shade_id").val(),
        };

        // If "Select All" is checked, add rowData to checkedData
        if (isChecked) {
            if (rowData.product_shade_id) {
                checkedData = checkedData.filter(function (item) {
                    return item.product_shade_id !== rowData.product_shade_id;
                });
            } else {
                checkedData = checkedData.filter(function (item) {
                    return item.product_size_id !== rowData.product_size_id;
                });
            }
            checkedData.push(rowData);
        } else {
            // Remove rowData from checkedData if "Select All" is unchecked
            if (rowData.product_shade_id) {
                checkedData = checkedData.filter(function (item) {
                    return item.product_shade_id !== rowData.product_shade_id;
                });
            } else {
                checkedData = checkedData.filter(function (item) {
                    return item.product_size_id !== rowData.product_size_id;
                });
            }
        }

        // Update the checked state of the checkbox
        checkbox.checked = isChecked;
    });
    console.log(checkedData);


}

function updateSelectAll(input) {
    var row = $(input).closest("tr");
    var selectAllCheckbox = document.getElementById('selectAll');
    var checkboxes = document.getElementsByClassName('checkbox');
    var allChecked = true;

    var rowData = {
        product_id: row.find(".checkbox").val(),
        percent_discount: row.find(".percent_discount").val(),
        flat_discount: row.find(".flat_discount").val(),
        discounted_price: row.find(".current_price_input").val(),
        product_size_id: row.find(".size_id").val(),
        product_shade_id: row.find(".shade_id").val(),
    }
    // checkedData.push(rowData);
    if ($(input).prop("checked")) {
        checkedData.push(rowData);
    } else {
        if (rowData.product_shade_id) {
            checkedData = checkedData.filter(function (item) {
                return item.product_shade_id !== rowData.product_shade_id;
            });
        } else {
            checkedData = checkedData.filter(function (item) {
                return item.product_size_id !== rowData.product_size_id;
            });
        }

    }

    // console.log(checkedData);
    for (var i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            allChecked = false;
            break;
        }
    }

    selectAllCheckbox.checked = allChecked;
}


// Update the updateCurrentAmount function
function updateCurrentAmount() {
    var discountAmount = parseFloat($("#discountAmount").val()) || 0;
    var discountType = $('input[name="is_percentage"]:checked').val();

    // Iterate through all rows in the DataTable
    table.rows({
        page: "all"
    }).nodes().each(function (row) {
        var productPrice = parseFloat($(row).find(".price").text()) || 0;
        var currentValue = 0;
        var percentDiscount = 0;
        var exactValue = 0;

        if (discountType === "1") {
            // Percentage discount
            percentDiscount = discountAmount;
            exactValue = (productPrice * percentDiscount) / 100;
            currentValue = productPrice - exactValue;
        } else {
            // Flat discount
            exactValue = discountAmount;
            percentDiscount = (exactValue * 100) / productPrice;
            currentValue = productPrice - exactValue;
        }

        // Update the input fields in the current row with the calculated values
        $(row).find(".percent_discount").val(percentDiscount.toFixed(2));
        $(row).find(".flat_discount").val(exactValue.toFixed(2));
        $(row).find(".current_price_input").val(currentValue.toFixed(2));

        var isChecked = $(row).find(".checkbox").prop("checked");
        // console.log(isChecked);
        var rowData = {
            product_id: $(row).find(".checkbox").val(),
            percent_discount: $(row).find(".percent_discount").val(),
            flat_discount: $(row).find(".flat_discount").val(),
            discounted_price: $(row).find(".current_price_input").val(),
            product_size_id: $(row).find(".size_id").val(),
            product_shade_id: $(row).find(".shade_id").val(),
        };

        // If "Select All" is checked, add rowData to checkedData
        if (isChecked) {
            if (rowData.product_shade_id) {
                checkedData = checkedData.filter(function (item) {
                    return item.product_shade_id !== rowData.product_shade_id;
                });
            } else {
                checkedData = checkedData.filter(function (item) {
                    return item.product_size_id !== rowData.product_size_id;
                });
            }
            checkedData.push(rowData);
        }
    });
}



function updateRow(input) {
    // console.log(input);
    var row = $(input).closest("tr");
    var inputValue = parseFloat($(input).val());
    var inputClassName = $(input).attr('class');

    var productPrice = parseFloat(row.find(".price").text()) || 0;
    // console.log(inputValue, inputClassName, productPrice);
    var percentDiscount = 0;
    var flatDiscount = 0;
    var currentValue = 0;

    if (inputClassName === "form-control percent_discount") {
        percentDiscount = inputValue;
        flatDiscount = (productPrice * percentDiscount) / 100;
        currentValue = productPrice - flatDiscount;

    } else if (inputClassName === "form-control flat_discount") {
        flatDiscount = inputValue;
        percentDiscount = (flatDiscount * 100) / productPrice;
        currentValue = productPrice - flatDiscount;
    } else {

        currentValue = inputValue;
        percentDiscount = 100.00 - ((currentValue / productPrice) * 100);
        flatDiscount = (productPrice - currentValue);
    }
    // console.log(percentDiscount, flatDiscount, currentValue);
    row.find(".percent_discount").val(percentDiscount.toFixed(2));
    row.find(".flat_discount").val(flatDiscount.toFixed(2));
    row.find(".current_price_input").val(currentValue.toFixed(2));

    var isChecked = row.find(".checkbox").prop("checked");
    // console.log(isChecked);
    var rowData = {
        product_id: row.find(".checkbox").val(),
        percent_discount: row.find(".percent_discount").val(),
        flat_discount: row.find(".flat_discount").val(),
        discounted_price: row.find(".current_price_input").val(),
        product_size_id: row.find(".size_id").val(),
        product_shade_id: row.find(".shade_id").val(),
    };

    // If "Select All" is checked, add rowData to checkedData
    if (isChecked) {
        if (rowData.product_shade_id) {
            checkedData = checkedData.filter(function (item) {
                return item.product_shade_id !== rowData.product_shade_id;
            });
        } else {
            checkedData = checkedData.filter(function (item) {
                return item.product_size_id !== rowData.product_size_id;
            });
        }
        console.log(checkedData);
        console.log(rowData);

        checkedData.push(rowData);
        console.log(checkedData);
    }

}

function uptoupdateproduct(e, url) {
    return new Promise((resolve, reject) => {
        var category_id = $("#category_id").val();
        var brand_id = $("#brand_id").val();
        var offer_id = $("#offer_id").val();
        // console.log(url);
        $.ajax({
            url: url,
            type: "GET",
            data: {
                category_id: category_id,
                brand_id: brand_id,
                offer_id: offer_id,
            },
            success: function (data) {
                // Clear existing rows in the table body
                // table.clear();
                table.clear().draw()


                //Check if any products are returned
                if (data.products.length > 0) {
                    // Iterate through the products and add rows to the DataTable
                    $.each(data.products, function (index, product) {
                        if (product.product_shades.length > 0) {
                            $.each(
                                product.product_shades,
                                function (shadeIndex, productShade) {
                                    var isChecked = checkedData.some(function (
                                        item) {
                                        return item.product_shade_id ==
                                            productShade.id;
                                    });
                                    // console.log(isChecked);
                                    var checkedItem = checkedData.find(function (item) {
                                        return item.product_shade_id == productShade.id;
                                    });
                                    var percentDiscount = isChecked && checkedItem ? parseFloat(checkedItem.percent_discount).toFixed(2) : "0.00";
                                    var flatDiscount = isChecked && checkedItem ? parseFloat(checkedItem.flat_discount).toFixed(2) : "0.00";
                                    var currentValue = isChecked && checkedItem ? parseFloat(checkedItem.discounted_price).toFixed(2) : productShade.shade_price.toFixed(2);
                                    if (!data.p_shade_ids.includes(productShade
                                            .id)) {
                                                var row = table.row
                                                .add([
                                                    '<input class="checkbox" type="checkbox" name="product_id[]" value="' + product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                                    product.id,
                                                    product.name,
                                                    productShade.shade.name + '<input type="hidden" class="shade_id" value="' + productShade.id + '"/>' + '<input type="hidden" class="size_id"/>',
                                                    '<span class="price">' + productShade.shade_price + '</span>',
                                                    product.discount_amount,
                                                    '<input type="text" name="percent_discount[]" class="form-control percent_discount" value="' + percentDiscount + '">',
                                                    '<input type="text" name="flat_discount[]" class="form-control flat_discount" value="' + flatDiscount + '">',
                                                    '<input type="text" name="current_price[]" class="form-control current_price_input" value="' + currentValue + '">',
                                                ])
                                                .draw(false)
                                                .node();
                                    }
                                }
                            );
                        } else {
                            // console.log(product.size_id);
                            if (product.product_sizes.length > 0) {
                                $.each(
                                    product.product_sizes,
                                    function (sizeIndex, productSize) {
                                        var isChecked = checkedData.some(function (
                                            item) {
                                            return item.product_size_id ==
                                                productSize.id;
                                        });
                                        var checkedItem = checkedData.find(function (item) {
                                            return item.product_size_id == productSize.id;
                                        });
                                        var percentDiscount = isChecked && checkedItem ? parseFloat(checkedItem.percent_discount).toFixed(2) : "0.00";
                                        var flatDiscount = isChecked && checkedItem ? parseFloat(checkedItem.flat_discount).toFixed(2) : "0.00";
                                        var currentValue = isChecked && checkedItem ? parseFloat(checkedItem.discounted_price).toFixed(2) : productSize.size_price.toFixed(2);

                                        if (!data.p_size_ids.includes(productSize
                                                .id)) {
                                                    var row = table.row
                                                    .add([
                                                        '<input class="checkbox" type="checkbox" name="product_id[]" value="' + product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                                        product.id,
                                                        product.name,
                                                        productSize.size.name + '<input type="hidden" class="size_id" value="' + productSize.id + '"/>' + '<input type="hidden" class="shade_id"/>',
                                                        '<span class="price">' + productSize.size_price + '</span>',
                                                        product.discount_amount,
                                                        '<input type="text" name="percent_discount[]" class="form-control percent_discount" value="' + percentDiscount + '">',
                                                        '<input type="text" name="flat_discount[]" class="form-control flat_discount" value="' + flatDiscount + '">',
                                                        '<input type="text" name="current_price[]" class="form-control current_price_input" value="' + currentValue + '">',
                                                    ])
                                                    .draw(false)
                                                    .node();
                                        }
                                    }
                                );
                            }

                        }
                    });

                } else {
                    //table.clear();
                    console.log("No products found for the selected category.");
                    // $('#uptosale tbody').html('<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>');
                }

                resolve();
            },
            error: function (xhr, status, error) {
                table.clear();
                console.error(xhr.responseText);
                // Handle errors if any

                reject(error);
            },
        });
    });
}

function editupdateproduct(e, url) {
    return new Promise((resolve, reject) => {
        var category_id = $("#category_id").val();
        var brand_id = $("#brand_id").val();
        var offer_id = $("#offer_id").val();
        // console.log(url);
        $.ajax({
            url: url,
            type: "GET",
            data: {
                category_id: category_id,
                brand_id: brand_id,
                offer_id: offer_id,
            },
            success: function (data) {
                // Clear existing rows in the table body
                // table.clear();
                table.clear().draw()


                //Check if any products are returned
                if (data.products.length > 0) {
                    // Iterate through the products and add rows to the DataTable
                    $.each(data.products, function (index, product) {
                        if (product.product_shades.length > 0) {
                            $.each(
                                product.product_shades,
                                function (shadeIndex, productShade) {
                                    var isChecked = checkedData.some(function (
                                        item) {
                                        return item.product_shade_id ==
                                            productShade.id;
                                    });
                                    var checkedItem = checkedData.find(function (item) {
                                        return item.product_shade_id == productShade.id;
                                    });
                                    var percentDiscount = isChecked && checkedItem ? parseFloat(checkedItem.percent_discount).toFixed(2) : "0.00";
                                    var flatDiscount = isChecked && checkedItem ? parseFloat(checkedItem.flat_discount).toFixed(2) : "0.00";
                                    var currentValue = isChecked && checkedItem ? parseFloat(checkedItem.discounted_price).toFixed(2) : productShade.shade_price.toFixed(2);
                                    console.log(currentValue);
                                    var row = table.row
                                        .add([
                                            '<input class="checkbox" type="checkbox" name="product_id[]" value="' + product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                            product.id,
                                            product.name,
                                            productShade.shade.name + '<input type="hidden" class="shade_id" value="' + productShade.id + '"/>' + '<input type="hidden" class="size_id"/>',
                                            '<span class="price">' + productShade.shade_price + '</span>',
                                            product.discount_amount,
                                            '<input type="text" name="percent_discount[]" class="form-control percent_discount" value="' + percentDiscount + '">',
                                            '<input type="text" name="flat_discount[]" class="form-control flat_discount" value="' + flatDiscount + '">',
                                            '<input type="text" name="current_price[]" class="form-control current_price_input" value="' + currentValue + '">',
                                        ])
                                        .draw(false)
                                        .node();

                                }
                            );
                        } else {
                            // console.log(product.size_id);
                            if (product.product_sizes.length > 0) {
                                $.each(
                                    product.product_sizes,
                                    function (sizeIndex, productSize) {
                                        var isChecked = checkedData.some(function (
                                            item) {
                                            return item.product_size_id ==
                                                productSize.id;
                                        });
                                        var checkedItem = checkedData.find(function (item) {
                                            return item.product_size_id == productSize.id;
                                        });
                                        var percentDiscount = isChecked && checkedItem ? parseFloat(checkedItem.percent_discount).toFixed(2) : "0.00";
                                        var flatDiscount = isChecked && checkedItem ? parseFloat(checkedItem.flat_discount).toFixed(2) : "0.00";
                                        var currentValue = isChecked && checkedItem ? parseFloat(checkedItem.discounted_price).toFixed(2) : productSize.size_price.toFixed(2);

                                        var row = table.row
                                        .add([
                                            '<input class="checkbox" type="checkbox" name="product_id[]" value="' + product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                            product.id,
                                            product.name,
                                            productSize.size.name + '<input type="hidden" class="size_id" value="' + productSize.id + '"/>' + '<input type="hidden" class="shade_id"/>',
                                            '<span class="price">' + productSize.size_price + '</span>',
                                            product.discount_amount,
                                            '<input type="text" name="percent_discount[]" class="form-control percent_discount" value="' + percentDiscount + '">',
                                            '<input type="text" name="flat_discount[]" class="form-control flat_discount" value="' + flatDiscount + '">',
                                            '<input type="text" name="current_price[]" class="form-control current_price_input" value="' + currentValue + '">',
                                        ])
                                        .draw(false)
                                        .node();

                                    }
                                );
                            }

                        }
                    });

                } else {
                    //table.clear();
                    console.log("No products found for the selected category.");
                    // $('#uptosale tbody').html('<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>');
                }

                resolve();
            },
            error: function (xhr, status, error) {
                table.clear();
                console.error(xhr.responseText);
                // Handle errors if any

                reject(error);
            },
        });
    });
}
